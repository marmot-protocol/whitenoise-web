import type { BlogPost } from "./nostr";

const BLOG_POSTS_CACHE_KEY = "blog_posts";
const DEFAULT_CACHE_TTL = 5 * 60 * 1000;

interface CacheEntry {
    data: BlogPost[];
    timestamp: number;
}

interface CreateBlogPostCacheOptions {
    fetchBlogPostByDTag: (dTag: string) => Promise<BlogPost | null>;
    fetchBlogPosts: () => Promise<BlogPost[]>;
    now?: () => number;
    ttlMs?: number;
}

export function createBlogPostCache({
    fetchBlogPostByDTag,
    fetchBlogPosts,
    now = () => Date.now(),
    ttlMs = DEFAULT_CACHE_TTL,
}: CreateBlogPostCacheOptions) {
    const cache = new Map<string, CacheEntry>();

    function getCachedPosts(): BlogPost[] | null {
        const cached = cache.get(BLOG_POSTS_CACHE_KEY);

        if (!cached) {
            return null;
        }

        if (now() - cached.timestamp >= ttlMs) {
            cache.delete(BLOG_POSTS_CACHE_KEY);
            return null;
        }

        return cached.data;
    }

    function setCachedPosts(posts: BlogPost[]) {
        cache.set(BLOG_POSTS_CACHE_KEY, {
            data: posts,
            timestamp: now(),
        });
    }

    return {
        clear() {
            cache.clear();
        },

        async fetchBlogPostCached(dTag: string): Promise<BlogPost | null> {
            const cachedPosts = getCachedPosts();

            if (cachedPosts) {
                const post = cachedPosts.find((entry) => entry.dTag === dTag);
                if (post) {
                    return post;
                }
            }

            return fetchBlogPostByDTag(dTag);
        },

        async fetchBlogPostsCached(): Promise<BlogPost[]> {
            const cachedPosts = getCachedPosts();

            if (cachedPosts) {
                return cachedPosts;
            }

            const posts = await fetchBlogPosts();
            setCachedPosts(posts);
            return posts;
        },
    };
}
