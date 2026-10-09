import { fileURLToPath } from "node:url";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type ViteDevServer } from "vite";

const root = fileURLToPath(new URL("../../", import.meta.url));
let developmentServer: ViteDevServer;

export default defineConfig({
    root: `${root}src/relay`,
    publicDir: false,
    resolve: { alias: { $lib: `${root}src/lib` } },
    plugins: [
        tailwindcss(),
        svelte({ configFile: false }),
        {
            name: "relay-development-page",
            configureServer(server) {
                developmentServer = server;
                server.middlewares.use((request, response, next) => {
                    const path = new URL(request.url ?? "/", "http://localhost").pathname;
                    const assets: Record<string, string> = {
                        "/theme.js": "theme.js",
                        "/favicon-light.svg": "favicon-light.svg",
                        "/favicon-dark.svg": "favicon-dark.svg",
                        "/images/logomark.svg": "images/logomark.svg",
                        "/images/theme-toggle-icon.svg": "images/theme-toggle-icon.svg",
                    };
                    if (assets[path]) {
                        response.setHeader("Cache-Control", "no-cache");
                        request.url = `/@fs/${root}static/${assets[path]}`;
                    }
                    next();
                });
            },
            async transformIndexHtml(html, context) {
                if (!context.server) return html;
                const { renderPage } = await developmentServer.ssrLoadModule(
                    `${root}src/relay/render.ts`
                );
                const url = new URL(context.originalUrl ?? "/", "http://localhost");
                return renderPage(html, url.searchParams.get("region") === "eu" ? "eu" : "us");
            },
        },
    ],
    build: {
        outDir: `${root}output/relays/client`,
        emptyOutDir: true,
        assetsInlineLimit: 0,
    },
    server: { host: "127.0.0.1", port: 4174, fs: { allow: [root] } },
});
