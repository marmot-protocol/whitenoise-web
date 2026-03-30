import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { fetchBlogPostsCachedMock } = vi.hoisted(() => ({
    fetchBlogPostsCachedMock: vi.fn(),
}));

vi.mock("$lib/nostr", () => ({
    fetchBlogPostsCached: fetchBlogPostsCachedMock,
}));

import { GET } from "./+server";

function createRequestEvent(): Parameters<typeof GET>[0] {
    return {} as Parameters<typeof GET>[0];
}

describe("sitemap GET", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-03-23T12:00:00Z"));
        vi.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it("includes static pages and dynamic blog entries", async () => {
        fetchBlogPostsCachedMock.mockResolvedValue([
            {
                content: "hello",
                createdAt: 1_700_000_000,
                dTag: "blog-post",
                id: "1",
                image: null,
                naddr: "naddr1blog",
                pubkey: "pubkey",
                publishedAt: 1_700_100_000,
                summary: null,
                tags: [],
                title: "Blog",
            },
        ]);

        const response = await GET(createRequestEvent());
        const xml = await response.text();

        expect(response.headers.get("Content-Type")).toBe("application/xml");
        expect(response.headers.get("Cache-Control")).toBe("max-age=86400");
        expect(xml).toContain("<loc>https://www.whitenoise.chat/build</loc>");
        expect(xml).toContain("<loc>https://www.whitenoise.chat/blog/naddr1blog</loc>");
        expect(xml).toContain("<lastmod>2023-11-16</lastmod>");
    });

    it("escapes blog urls in the generated xml", async () => {
        fetchBlogPostsCachedMock.mockResolvedValue([
            {
                content: "hello",
                createdAt: 1_700_000_000,
                dTag: "blog-post",
                id: "1",
                image: null,
                naddr: "naddr&<>\"'",
                pubkey: "pubkey",
                publishedAt: null,
                summary: null,
                tags: [],
                title: "Blog",
            },
        ]);

        const response = await GET(createRequestEvent());
        const xml = await response.text();

        expect(xml).toContain(
            "<loc>https://www.whitenoise.chat/blog/naddr&amp;&lt;&gt;&quot;&apos;</loc>"
        );
    });

    it("still returns a sitemap when fetching blog posts fails", async () => {
        fetchBlogPostsCachedMock.mockRejectedValue(new Error("relay down"));

        const response = await GET(createRequestEvent());
        const xml = await response.text();

        expect(response.status).toBe(200);
        expect(xml).toContain("<loc>https://www.whitenoise.chat/</loc>");
        expect(xml).not.toContain("<loc>https://www.whitenoise.chat/blog/naddr");
    });
});
