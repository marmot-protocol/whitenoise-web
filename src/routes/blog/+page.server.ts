import { fetchBlogPostsCached } from "$lib/nostr";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const posts = await fetchBlogPostsCached();

    return {
        posts,
    };
};
