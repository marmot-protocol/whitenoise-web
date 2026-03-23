import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { decodeNaddrMock, fetchBlogPostCachedMock, renderBlogHtmlMock } = vi.hoisted(() => ({
    decodeNaddrMock: vi.fn(),
    fetchBlogPostCachedMock: vi.fn(),
    renderBlogHtmlMock: vi.fn(),
}));

vi.mock("$lib/nostr", () => ({
    BLOG_PUBKEY: "expected-pubkey",
    KIND_LONG_FORM: 30023,
    decodeNaddr: decodeNaddrMock,
    fetchBlogPostCached: fetchBlogPostCachedMock,
}));

vi.mock("$lib/server/blog-markdown", () => ({
    renderBlogHtml: renderBlogHtmlMock,
}));

import { load } from "./+page.server";

function createLoadEvent(naddr = "naddr1test"): Parameters<typeof load>[0] {
    return {
        params: { naddr },
    } as Parameters<typeof load>[0];
}

describe("blog post page load", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it("rejects invalid naddr values", async () => {
        decodeNaddrMock.mockReturnValue(null);

        await expect(load(createLoadEvent())).rejects.toMatchObject({
            status: 400,
        });
    });

    it("rejects posts for a different pubkey", async () => {
        decodeNaddrMock.mockReturnValue({
            dTag: "post",
            kind: 30023,
            pubkey: "someone-else",
        });

        await expect(load(createLoadEvent())).rejects.toMatchObject({
            status: 404,
        });
    });

    it("rejects the wrong event kind", async () => {
        decodeNaddrMock.mockReturnValue({
            dTag: "post",
            kind: 1,
            pubkey: "expected-pubkey",
        });

        await expect(load(createLoadEvent())).rejects.toMatchObject({
            status: 400,
        });
    });

    it("rejects missing posts after validation", async () => {
        decodeNaddrMock.mockReturnValue({
            dTag: "post",
            kind: 30023,
            pubkey: "expected-pubkey",
        });
        fetchBlogPostCachedMock.mockResolvedValue(null);

        await expect(load(createLoadEvent())).rejects.toMatchObject({
            status: 404,
        });
        expect(fetchBlogPostCachedMock).toHaveBeenCalledWith("post");
    });

    it("returns the post and sanitized html for valid requests", async () => {
        const post = {
            content: "# Hello",
            createdAt: 1_700_000_000,
            dTag: "post",
            id: "1",
            image: null,
            naddr: "naddr1test",
            pubkey: "expected-pubkey",
            publishedAt: null,
            summary: null,
            tags: [],
            title: "Hello",
        };

        decodeNaddrMock.mockReturnValue({
            dTag: "post",
            kind: 30023,
            pubkey: "expected-pubkey",
        });
        fetchBlogPostCachedMock.mockResolvedValue(post);
        renderBlogHtmlMock.mockReturnValue("<h1>Hello</h1>");

        await expect(load(createLoadEvent())).resolves.toEqual({
            post,
            safeHtml: "<h1>Hello</h1>",
        });
        expect(renderBlogHtmlMock).toHaveBeenCalledWith("# Hello");
    });
});
