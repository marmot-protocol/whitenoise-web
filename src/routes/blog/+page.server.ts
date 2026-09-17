import { error } from "@sveltejs/kit";
import { blogMetadata } from "$lib/server/blog-presentation";
import { fetchBlogPostsCached } from "$lib/server/nostr";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const posts = await fetchBlogPostsCached().catch((cause: unknown) => {
        console.error("[content] Content request failed", cause);
        error(503, "Content is temporarily unavailable. Please try again shortly.");
    });

    return {
        posts: posts.map(blogMetadata),
    };
};

export const prerender = false;
