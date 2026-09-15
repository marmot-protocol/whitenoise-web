import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [
        tailwindcss(),
        sveltekit(),
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
        noExternal: [
            "dayjs",
            "deepmerge",
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
        ],
    },
});
