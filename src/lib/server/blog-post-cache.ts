import type { BlogPost } from "$lib/nostr";
import { createAsyncCache } from "./async-cache";

export function createBlogPostCache({
    fetchBlogPosts,
    fetchBlogPostByDTag,
    now = Date.now,
    ttlMs = 5 * 60_000,
}: {
    fetchBlogPosts: () => Promise<BlogPost[]>;
    fetchBlogPostByDTag: (dTag: string) => Promise<BlogPost | null>;
    now?: () => number;
    ttlMs?: number;
}) {
    const options = { ttlMs, staleMs: 60 * 60_000, now };
    const listCache = createAsyncCache<BlogPost[]>({ ...options, maxEntries: 1 });
    const postCache = createAsyncCache<BlogPost | null>({
        ...options,
        // A stale absence cannot establish a 404 while relays are unavailable.
        canServeStale: (post) => post !== null,
    });
    let list: { posts: BlogPost[]; expires: number } | undefined;
    return {
        async fetchBlogPostsCached() {
            return listCache.get("posts", async () => {
                const posts = await fetchBlogPosts();
                list = { posts, expires: now() + ttlMs };
                return posts;
            });
        },
        async fetchBlogPostCached(dTag: string) {
            if (list && now() < list.expires) {
                const post = list.posts.find((post) => post.dTag === dTag);
                if (post) return post;
            }
            return postCache.get(dTag, () => fetchBlogPostByDTag(dTag));
        },
    };
}
