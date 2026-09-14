import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [tailwindcss(), sveltekit()],
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
