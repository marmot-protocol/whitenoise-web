import { error } from "@sveltejs/kit";
import { BLOG_PUBKEY, decodeNaddr, KIND_LONG_FORM } from "$lib/nostr";
import { renderBlogHtml } from "$lib/server/blog-markdown";
import { blogMetadata, formatBlogPresentation } from "$lib/server/blog-presentation";
import { fetchBlogPostCached } from "$lib/server/nostr";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const { naddr } = params;

    // Decode the naddr to get the d-tag
    const decoded = decodeNaddr(naddr);

    if (!decoded) {
        error(400, "Invalid blog post address");
    }

    // Verify it's for the right pubkey and kind
    if (decoded.pubkey !== BLOG_PUBKEY) {
        error(404, "Blog post not found");
    }

    if (decoded.kind !== KIND_LONG_FORM) {
        error(400, "Invalid blog post type");
    }

    const post = await fetchBlogPostCached(decoded.dTag).catch((cause: unknown) => {
        console.error("[content] Content request failed", cause);
        error(503, "Content is temporarily unavailable. Please try again shortly.");
    });

    if (!post) {
        error(404, "Blog post not found");
    }

    return {
        post: blogMetadata(post),
        safeHtml: formatBlogPresentation(post.dTag, renderBlogHtml(post.content)),
    };
};

export const prerender = false;
