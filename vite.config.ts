import adapter from "@sveltejs/adapter-vercel";
import { sveltekit } from "@sveltejs/kit/vite";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// Vercel sets this for the project, and the adapter then adds a deployment cookie that
// requires split entry chunks, so the build fails with one bundle. One bundle already
// keeps every page consistent across deploys, which is what the cookie was for.
delete process.env.VERCEL_SKEW_PROTECTION_ENABLED;

export default defineConfig(({ command }) => ({
    plugins: [
        tailwindcss(),
        sveltekit({
            preprocess: vitePreprocess(),
            // One client bundle per deploy: a crawler rendering older HTML either hydrates the
            // whole page or keeps the prerendered HTML, never a missing chunk's error page.
            output: { bundleStrategy: "single" },
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
    build: {
        // Keep every Manrope subset an external file. Vite inlines small fonts as
        // data: URIs, which the font-src 'self' policy below blocks, so an inlined
        // subset silently fails to load. Other asset types keep Vite's default.
        assetsInlineLimit: (filePath: string) =>
            /\.(woff2?|ttf|otf|eot)$/i.test(filePath) ? false : undefined,
    },
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
