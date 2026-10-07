import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { cp, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { withMarkdownRouting } from "./markdown-routing.mjs";

// Keep the function outside the checkout so missing dependencies cannot resolve
// from the project's node_modules. Run with require(ESM) disabled, as on Vercel.
const isolatedBundle = await mkdtemp(join(tmpdir(), "whitenoise-vercel-smoke-"));
const originalCwd = process.cwd();
try {
    await cp(
        fileURLToPath(new URL("../.vercel/output/functions/![-]/catchall.func", import.meta.url)),
        isolatedBundle,
        { recursive: true }
    );
    process.chdir(isolatedBundle);
    const { default: handler } = await import(
        pathToFileURL(join(isolatedBundle, ".svelte-kit/vercel-tmp/index.js")).href
    );
    const response = await handler.fetch(
        new Request("https://www.whitenoise.chat/docs/marmot/README.md")
    );
    assert.equal(response.status, 200, "The deployed Markdown route must return HTTP 200");
    const guideHtml = await response.text();
    assert.ok(
        guideHtml.includes('<h2 id="getting-started">Getting started</h2>'),
        "The isolated function must render Markdown with the bundled sanitizer"
    );

    // Privacy is prerendered and served directly from Vercel's static output.
    const html = await readFile(
        new URL("../.vercel/output/static/privacy.html", import.meta.url),
        "utf8"
    );
    assert.ok(
        html.includes("<h1>Privacy Policy</h1>"),
        "The policy must be prerendered in the deployment output"
    );
    assert.ok(html.includes("privacy@ipf.dev"), "The policy must include its contact details");

    const outputConfig = JSON.parse(
        await readFile(new URL("../.vercel/output/config.json", import.meta.url), "utf8")
    );
    const filesystem = outputConfig.routes.findIndex((route) => route.handle === "filesystem");
    const markdownRoute = outputConfig.routes.findIndex((route) =>
        route.has?.some((condition) => condition.key === "accept")
    );
    assert.ok(
        markdownRoute >= 0 && markdownRoute < filesystem,
        "Markdown negotiation must run before static files"
    );
    const route = outputConfig.routes[markdownRoute];
    assert.equal(route.dest, "/![-]/catchall", "Negotiation must use the existing SSR function");
    for (const path of [
        "/",
        "/download",
        "/agents",
        "/privacy",
        "/terms",
        "/build",
        "/faq",
        "/contribute",
        "/privacy-matters",
        "/docs/marmot/README.md",
    ]) {
        assert.ok(new RegExp(route.src).test(path), `${path} must negotiate before CDN serving`);
        const markdown = await handler.fetch(
            new Request(`https://www.whitenoise.chat${path}`, {
                headers: { Accept: "text/markdown" },
            })
        );
        assert.equal(
            markdown.status,
            200,
            `${path} must support Markdown from the deployed bundle`
        );
        assert.equal(markdown.headers.get("Content-Type"), "text/markdown; charset=utf-8");
        assert.match(markdown.headers.get("Vary"), /Accept/i);
        assert.equal(markdown.headers.get("X-Content-Type-Options"), "nosniff");
        const body = await markdown.text();
        assert.ok(body.startsWith("# "), `${path} must retain the page heading`);
        assert.ok(!body.includes("<script"), "Markdown must exclude executable markup");
    }
    assert.ok(
        !new RegExp(route.src).test("/_app/example.js"),
        "Asset requests must stay on the CDN"
    );
    assert.ok(
        !new RegExp(route.src).test("/agents/__data.json"),
        "Client navigation data must not be rewritten"
    );
    const protocolOverride = Object.entries(outputConfig.overrides).find(
        ([, override]) => override.path === "docs/marmot/README.md"
    );
    assert.equal(
        protocolOverride?.[1].contentType,
        "text/html; charset=utf-8",
        "The static legacy .md URL must retain its HTML type"
    );
    const snapshots = JSON.parse(await readFile(join(isolatedBundle, "agent-pages.json"), "utf8"));
    for (const [path, snapshot] of Object.entries(snapshots)) {
        const entry = Object.entries(outputConfig.overrides).find(
            ([file, override]) => file.endsWith(".html") && `/${override.path}` === path
        );
        assert.ok(entry);
        assert.equal(
            snapshot,
            await readFile(
                new URL(`../.vercel/output/static/${entry[0]}`, import.meta.url),
                "utf8"
            ),
            "Markdown input must match the exact static HTML output"
        );
    }
    const preferredHtml = await handler.fetch(
        new Request("https://www.whitenoise.chat/download", {
            headers: { Accept: "text/html, text/markdown;q=0.2" },
        })
    );
    assert.match(preferredHtml.headers.get("Content-Type"), /text\/html/);
    const excludedMarkdown = await handler.fetch(
        new Request("https://www.whitenoise.chat/download", {
            headers: { Accept: "text/markdown;q=0" },
        })
    );
    assert.match(excludedMarkdown.headers.get("Content-Type"), /text\/html/);
    const head = await handler.fetch(
        new Request("https://www.whitenoise.chat/download", {
            method: "HEAD",
            headers: { Accept: "text/markdown" },
        })
    );
    assert.equal(head.headers.get("Content-Type"), "text/markdown; charset=utf-8");
    assert.equal(await head.text(), "");

    for (const method of ["GET", "POST"]) {
        const missing = await handler.fetch(
            new Request("https://www.whitenoise.chat/unknown-agent-page", {
                method,
                headers: { Accept: "text/html" },
            })
        );
        assert.equal(missing.status, 404, "Unknown paths must retain their 404 status");
        assert.match(missing.headers.get("Content-Type"), /text\/html/);
        const missingHtml = await missing.text();
        assert.ok(missingHtml.includes("Page not found."), "Unknown paths retain the styled error");
        assert.ok(missingHtml.includes("<main"), "The error keeps the existing page shell");
    }

    const index = JSON.parse(
        await readFile(
            new URL(
                "../.vercel/output/static/.well-known/agent-skills/index.json",
                import.meta.url
            ),
            "utf8"
        )
    );
    const skill = await readFile(
        new URL(
            "../.vercel/output/static/.well-known/agent-skills/connect-white-noise/SKILL.md",
            import.meta.url
        )
    );
    assert.equal(
        index.skills[0].digest,
        `sha256:${createHash("sha256").update(skill).digest("hex")}`
    );
    const catalog = JSON.parse(
        await readFile(
            new URL("../.vercel/output/static/.well-known/ai-catalog.json", import.meta.url),
            "utf8"
        )
    );
    assert.equal(catalog.entries[0].url, index.skills[0].url);
    assert.equal(catalog.entries[0].type, "text/markdown");
    assert.ok(skill.toString().includes("Ask for my approval before making changes"));
    assert.throws(
        () => withMarkdownRouting({ routes: [{ handle: "filesystem" }] }),
        /Vercel adapter/
    );
    console.log(
        "Vercel HTML, Markdown negotiation, static privacy and discovery smoke tests passed"
    );
} finally {
    process.chdir(originalCwd);
    await rm(isolatedBundle, { recursive: true, force: true });
}
