import assert from "node:assert/strict";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import publicStaticPages from "../src/lib/content/agent-pages.json" with { type: "json" };

export { publicStaticPages };

export function withMarkdownRouting(config) {
    const routes = [...config.routes];
    assert.ok(
        routes.some((route) => route.handle === "filesystem"),
        "Vercel adapter must supply filesystem routing"
    );
    const catchall = routes.find((route) => route.src === "/.*" && route.dest);
    assert.ok(catchall, "Vercel adapter must supply its existing server function");
    const src =
        "^(?:" + publicStaticPages.map((path) => path.replaceAll(".", "\\.")).join("|") + ")$";
    // Before the adapter's static path aliases, which otherwise bypass the hook.
    routes.splice(
        1,
        0,
        { src, headers: { Vary: "Accept" }, continue: true },
        {
            src,
            methods: ["GET", "HEAD"],
            has: [
                {
                    type: "header",
                    key: "accept",
                    value: ".*[Tt][Ee][Xx][Tt]/[Mm][Aa][Rr][Kk][Dd][Oo][Ww][Nn].*",
                },
            ],
            dest: catchall.dest,
        }
    );
    return { ...config, routes };
}

export async function buildMarkdownRouting(output) {
    const path = join(output, "config.json");
    const config = JSON.parse(await readFile(path, "utf8"));
    const snapshots = {};
    for (const page of publicStaticPages) {
        const entry = Object.entries(config.overrides).find(
            ([file, override]) => file.endsWith(".html") && `/${override.path}` === page
        );
        assert.ok(entry, `${page} must have pre-rendered HTML in the deployment`);
        const [file, override] = entry;
        snapshots[page] = await readFile(join(output, "static", file), "utf8");
        // File-specific MIME metadata preserves the legacy .md page's HTML
        // without overwriting negotiated function responses.
        override.contentType = "text/html; charset=utf-8";
    }
    const functions = join(output, "functions", "![-]");
    for (const name of await readdir(functions)) {
        if (name.endsWith(".func")) {
            await writeFile(join(functions, name, "agent-pages.json"), JSON.stringify(snapshots));
        }
    }
    await writeFile(path, `${JSON.stringify(withMarkdownRouting(config), null, 4)}\n`);
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
    await buildMarkdownRouting(new URL("../.vercel/output/", import.meta.url).pathname);
}
