import adapter from "@sveltejs/adapter-vercel";
import { sveltekit } from "@sveltejs/kit/vite";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
    plugins: [
        tailwindcss(),
        sveltekit({
            preprocess: vitePreprocess(),
            csp: {
                mode: "auto",
                directives: {
                    "default-src": ["self"],
                    "script-src": ["self", "https://analytics.ipf.dev"],
                    "style-src": ["self", "unsafe-inline"],
                    "img-src": ["self", "https:", "http:", "data:"],
                    "font-src": ["self"],
                    "connect-src": ["self", "https://analytics.ipf.dev"],
                    "object-src": ["none"],
                    "base-uri": ["self"],
                    "form-action": ["self"],
                    "frame-ancestors": ["none"],
                },
            },
            adapter: adapter({
                runtime: "nodejs22.x",
            }),
        }),
        {
            name: "marmot-html-preview",
            configurePreviewServer(server) {
                // SvelteKit preview infers MIME from the URL rather than the generated .html file.
                // Preserve the public .md URL while serving its prerendered page as HTML.
                server.middlewares.use((request, _response, next) => {
                    const url = new URL(request.url ?? "/", "http://preview.local");
                    if (url.pathname === "/docs/marmot/README.md") {
                        request.url = `${url.pathname}.html${url.search}`;
                    }
                    next();
                });
            },
        },
    ],
    ssr: {
        // Bundle the sanitizer's full dependency tree: Vercel disables require(ESM),
        // and its file tracer cannot follow Rolldown's generated __require calls.
        // Vite development executes external CommonJS through Node. Only production
        // needs the full dependency tree bundled for Vercel's file tracer.
        noExternal:
            command === "build"
                ? [
                      "dayjs",
                      "dom-serializer",
                      "domelementtype",
                      "domhandler",
                      "domutils",
                      "entities",
                      "escape-string-regexp",
                      "htmlparser2",
                      "is-plain-object",
                      "launder",
                      "nanoid",
                      "parse-srcset",
                      "picocolors",
                      "postcss",
                      "sanitize-html",
                      "source-map-js",
                  ]
                : [],
    },
}));
