import privacyPolicyMarkdown from "$lib/content/privacy-policy.md?raw";
import { renderBlogHtml } from "$lib/server/blog-markdown";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    return {
        safeHtml: renderBlogHtml(privacyPolicyMarkdown),
    };
};
