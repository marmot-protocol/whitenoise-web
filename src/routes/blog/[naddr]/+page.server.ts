import { error } from "@sveltejs/kit";
import { BLOG_PUBKEY, decodeNaddr, KIND_LONG_FORM } from "#lib/nostr.js";
import { renderBlogHtml } from "#lib/server/blog-markdown.js";
import { blogMetadata, formatBlogPresentation } from "#lib/server/blog-presentation.js";
import { fetchBlogPostCached } from "#lib/server/nostr.js";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const { naddr } = params;

    // Malformed or foreign addresses name no post on this site; a 404 lets crawlers drop them.
    const decoded = decodeNaddr(naddr);

    if (!decoded) {
        error(404, "Blog post not found");
    }

    // Verify it's for the right pubkey and kind
    if (decoded.pubkey !== BLOG_PUBKEY) {
        error(404, "Blog post not found");
    }

    if (decoded.kind !== KIND_LONG_FORM) {
        error(404, "Blog post not found");
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
