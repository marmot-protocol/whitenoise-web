import type { NostrEvent } from "applesauce-core/helpers/event";
import { describe, expect, it } from "vitest";
import { BLOG_PUBKEY, decodeNaddr, eventToBlogPost, KIND_LONG_FORM, RELAYS } from "./nostr";

describe("nostr utilities", () => {
    describe("constants", () => {
        it("should have valid KIND_LONG_FORM", () => {
            expect(KIND_LONG_FORM).toBe(30023);
        });

        it("should have a valid BLOG_PUBKEY (64 character hex)", () => {
            expect(BLOG_PUBKEY).toMatch(/^[0-9a-f]{64}$/);
        });

        it("should have at least one relay configured", () => {
            expect(RELAYS.length).toBeGreaterThan(0);
            for (const relay of RELAYS) {
                expect(relay).toMatch(/^wss?:\/\//);
            }
        });
    });

    describe("eventToBlogPost", () => {
        const createMockEvent = (overrides: Partial<NostrEvent> = {}): NostrEvent => ({
            id: "abc123",
            pubkey: "def456",
            created_at: 1704067200, // 2024-01-01 00:00:00 UTC
            kind: KIND_LONG_FORM,
            content: "# Hello World\n\nThis is a test post.",
            tags: [
                ["d", "test-post"],
                ["title", "Test Post Title"],
                ["summary", "A summary of the test post"],
                ["image", "https://example.com/image.png"],
                ["published_at", "1704067200"],
            ],
            sig: "signature",
            ...overrides,
        });

        it("should convert a full event to a BlogPost", () => {
            const event = createMockEvent();
            const post = eventToBlogPost(event);

            expect(post.id).toBe("abc123");
            expect(post.pubkey).toBe("def456");
            expect(post.content).toBe("# Hello World\n\nThis is a test post.");
            expect(post.createdAt).toBe(1704067200);
            expect(post.title).toBe("Test Post Title");
            expect(post.summary).toBe("A summary of the test post");
            expect(post.image).toBe("https://example.com/image.png");
            expect(post.publishedAt).toBe(1704067200);
            expect(post.dTag).toBe("test-post");
            expect(post.tags).toEqual(event.tags);
        });

        it("should handle missing title with 'Untitled' default", () => {
            const event = createMockEvent({
                tags: [["d", "no-title-post"]],
            });
            const post = eventToBlogPost(event);

            expect(post.title).toBe("Untitled");
        });

        it("should handle missing optional fields with null", () => {
            const event = createMockEvent({
                tags: [
                    ["d", "minimal-post"],
                    ["title", "Minimal Post"],
                ],
            });
            const post = eventToBlogPost(event);

            expect(post.summary).toBeNull();
            expect(post.image).toBeNull();
            expect(post.publishedAt).toBeNull();
        });

        it("should handle empty d-tag", () => {
            const event = createMockEvent({
                tags: [["title", "No D-Tag Post"]],
            });
            const post = eventToBlogPost(event);

            expect(post.dTag).toBe("");
        });

        it("should generate an naddr for the post", () => {
            const event = createMockEvent();
            const post = eventToBlogPost(event);

            // naddr should be a non-empty string starting with "naddr1"
            expect(post.naddr).toMatch(/^naddr1/);
        });
    });

    describe("decodeNaddr", () => {
        it("should decode a valid naddr", () => {
            // This is a real naddr encoding for kind 30023
            const naddr =
                "naddr1qvzqqqr4gupzq9eemymaerqvwdc25f6ctyuvzx0zt3qld3zp5hf5cmfc2qlrzdh0qyt8wumn8ghj7un9d3shjtnswf5k6ctv9ehx2aqpz3mhxue69uhhyetvv9ujuerpd46hxtnfduqs6amnwvaz7tmwdaejumr0dsqq6vfhxsmrqv3nxymnsvej8y0xmj8g";
            const result = decodeNaddr(naddr);

            expect(result).not.toBeNull();
            expect(result?.kind).toBe(KIND_LONG_FORM);
            expect(result?.pubkey).toMatch(/^[0-9a-f]{64}$/);
            expect(typeof result?.dTag).toBe("string");
        });

        it("should return null for invalid naddr", () => {
            const result = decodeNaddr("invalid-naddr");
            expect(result).toBeNull();
        });

        it("should return null for empty string", () => {
            const result = decodeNaddr("");
            expect(result).toBeNull();
        });

        it("should return null for npub (wrong type)", () => {
            // This is an npub, not an naddr
            const npub = "npub1zuuajd7u3sx8xu92yav9jwxpr839cs0kc3q6t56vd5u9q033xmhsk6c2uc";
            const result = decodeNaddr(npub);
            expect(result).toBeNull();
        });
    });
});
