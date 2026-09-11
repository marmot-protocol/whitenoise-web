import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
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
    },
};

export default config;
