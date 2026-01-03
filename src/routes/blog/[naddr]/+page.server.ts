import { BLOG_PUBKEY, decodeNaddr, fetchBlogPostCached, KIND_LONG_FORM } from "$lib/nostr";
import { error } from "@sveltejs/kit";
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

    const post = await fetchBlogPostCached(decoded.dTag);

    if (!post) {
        error(404, "Blog post not found");
    }

    return {
        post,
    };
};
