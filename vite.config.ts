import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [tailwindcss(), sveltekit()],
    ssr: {
        // Transform sanitize-html's require() of ESM dependencies for Vercel's Node runtime.
        noExternal: ["sanitize-html"],
    },
});
