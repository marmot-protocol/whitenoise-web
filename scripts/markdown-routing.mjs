import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";

// SvelteKit hooks do not run for CDN-served prerendered pages. The build output
// route sends explicit Markdown requests to the same handler as dynamic pages.
// The handler, not this routing hint, evaluates weighted Accept preferences.
export function withMarkdownRouting(config) {
    const routes = [...config.routes];
    const filesystem = routes.findIndex((route) => route.handle === "filesystem");
    const catchall = routes.find((route) => route.src === "/.*" && route.dest);
    assert.ok(
        filesystem >= 0 && catchall,
        "Vercel adapter must supply filesystem and server routes"
    );
    routes.splice(filesystem, 0, {
        src: "^/(?:|download|privacy-matters|contribute|build|agents|faq|privacy|terms)$",
        methods: ["GET", "HEAD"],
        has: [
            {
                type: "header",
                key: "accept",
                value: ".*[Tt][Ee][Xx][Tt]/[Mm][Aa][Rr][Kk][Dd][Oo][Ww][Nn].*",
            },
        ],
        dest: catchall.dest,
    });
    return { ...config, routes };
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
    const path = new URL("../.vercel/output/config.json", import.meta.url);
    await writeFile(
        path,
        `${JSON.stringify(withMarkdownRouting(JSON.parse(await readFile(path, "utf8"))), null, 4)}\n`
    );
}
