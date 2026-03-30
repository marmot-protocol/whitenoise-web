import { readFile } from "node:fs/promises";
import { renderBlogHtml } from "$lib/server/blog-markdown";
import type { PageServerLoad } from "./$types";

const privacyPolicyUrl = new URL("../../lib/content/privacy-policy.md", import.meta.url);

export const load: PageServerLoad = async () => {
    const markdown = await readFile(privacyPolicyUrl, "utf8");

    return {
        safeHtml: renderBlogHtml(markdown),
    };
};
