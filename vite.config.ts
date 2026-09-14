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
});
