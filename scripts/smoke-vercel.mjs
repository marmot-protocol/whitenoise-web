import assert from "node:assert/strict";
import { cp, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Keep the function outside the checkout so missing dependencies cannot resolve
// from the project's node_modules. Run with require(ESM) disabled, as on Vercel.
const isolatedBundle = await mkdtemp(join(tmpdir(), "whitenoise-vercel-smoke-"));
try {
    await cp(
        fileURLToPath(new URL("../.vercel/output/functions/![-]/catchall.func", import.meta.url)),
        isolatedBundle,
        { recursive: true }
    );
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
    console.log("Vercel Markdown function and static privacy smoke tests passed");
} finally {
    await rm(isolatedBundle, { recursive: true, force: true });
}
