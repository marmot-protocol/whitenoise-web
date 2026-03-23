import { describe, expect, it, vi } from "vitest";
import { createBlogPostCache } from "./blog-post-cache";
import type { BlogPost } from "./nostr";

function createPost(overrides: Partial<BlogPost> = {}): BlogPost {
    return {
        id: "post-1",
        pubkey: "pubkey",
        content: "# Hello",
        createdAt: 1_700_000_000,
        title: "Hello",
        image: null,
        summary: null,
        publishedAt: null,
        dTag: "hello",
        naddr: "naddr1hello",
        tags: [],
        ...overrides,
    };
}

describe("createBlogPostCache", () => {
    it("reuses cached blog posts within the ttl", async () => {
        const fetchBlogPosts = vi
            .fn<() => Promise<BlogPost[]>>()
            .mockResolvedValue([createPost({ dTag: "first" })]);
        const fetchBlogPostByDTag = vi.fn<(dTag: string) => Promise<BlogPost | null>>();
        let now = 10_000;

        const cache = createBlogPostCache({
            fetchBlogPostByDTag,
            fetchBlogPosts,
            now: () => now,
            ttlMs: 1_000,
        });

        const first = await cache.fetchBlogPostsCached();
        now += 500;
        const second = await cache.fetchBlogPostsCached();

        expect(first).toEqual(second);
        expect(fetchBlogPosts).toHaveBeenCalledTimes(1);
        expect(fetchBlogPostByDTag).not.toHaveBeenCalled();
    });

    it("refreshes cached blog posts after the ttl expires", async () => {
        const fetchBlogPosts = vi
            .fn<() => Promise<BlogPost[]>>()
            .mockResolvedValueOnce([createPost({ dTag: "first" })])
            .mockResolvedValueOnce([createPost({ dTag: "second" })]);
        const fetchBlogPostByDTag = vi.fn<(dTag: string) => Promise<BlogPost | null>>();
        let now = 10_000;

        const cache = createBlogPostCache({
            fetchBlogPostByDTag,
            fetchBlogPosts,
            now: () => now,
            ttlMs: 1_000,
        });

        const first = await cache.fetchBlogPostsCached();
        now += 1_000;
        const second = await cache.fetchBlogPostsCached();

        expect(first[0]?.dTag).toBe("first");
        expect(second[0]?.dTag).toBe("second");
        expect(fetchBlogPosts).toHaveBeenCalledTimes(2);
    });

    it("serves a single post from the cached posts list when available", async () => {
        const fetchBlogPosts = vi
            .fn<() => Promise<BlogPost[]>>()
            .mockResolvedValue([
                createPost({ dTag: "first" }),
                createPost({ dTag: "second", id: "post-2", naddr: "naddr1second" }),
            ]);
        const fetchBlogPostByDTag = vi.fn<(dTag: string) => Promise<BlogPost | null>>();

        const cache = createBlogPostCache({
            fetchBlogPostByDTag,
            fetchBlogPosts,
        });

        await cache.fetchBlogPostsCached();
        const post = await cache.fetchBlogPostCached("second");

        expect(post?.dTag).toBe("second");
        expect(fetchBlogPostByDTag).not.toHaveBeenCalled();
    });

    it("falls back to direct post fetching when a post is not in cache", async () => {
        const fetchedPost = createPost({ dTag: "missing", id: "post-2", naddr: "naddr1missing" });
        const fetchBlogPosts = vi
            .fn<() => Promise<BlogPost[]>>()
            .mockResolvedValue([createPost({ dTag: "first" })]);
        const fetchBlogPostByDTag = vi
            .fn<(dTag: string) => Promise<BlogPost | null>>()
            .mockResolvedValue(fetchedPost);

        const cache = createBlogPostCache({
            fetchBlogPostByDTag,
            fetchBlogPosts,
        });

        await cache.fetchBlogPostsCached();
        const post = await cache.fetchBlogPostCached("missing");

        expect(post).toEqual(fetchedPost);
        expect(fetchBlogPostByDTag).toHaveBeenCalledWith("missing");
    });
});
