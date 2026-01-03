import { EventStore, Helpers } from "applesauce-core";
import type { NostrEvent } from "applesauce-core/helpers/event";
import {
    decodeAddressPointer,
    getAddressPointerForEvent,
    naddrEncode,
} from "applesauce-core/helpers/pointers";
import { RelayPool } from "applesauce-relay";
import { catchError, firstValueFrom, of, timeout, toArray } from "rxjs";

const { getTagValue } = Helpers;

// Polyfill WebSocket for SSR (Node.js environment)
async function ensureWebSocket() {
    if (typeof globalThis.WebSocket === "undefined") {
        const ws = await import("ws");
        (globalThis as unknown as { WebSocket: typeof ws.default }).WebSocket = ws.default;
    }
}

// The pubkey for blog posts from the White Noise account
export const BLOG_PUBKEY = "1739d937dc8c0c7370aa27585938c119e25c41f6c441a5d34c6d38503e3136ef"; // Jeff for testing
// "75d737c3472471029c44876b330d2284288a42779b591a2ed4daa1c6c07efaf7"; // White Noise account

// Relays to fetch from (including relays that specialize in long-form content)
export const RELAYS = ["wss://relay.primal.net", "wss://relay.damus.io", "wss://nos.lol"];

// Long-form content kind (NIP-23)
export const KIND_LONG_FORM = 30023;

export interface BlogPost {
    id: string;
    pubkey: string;
    content: string;
    createdAt: number;
    title: string;
    image: string | null;
    summary: string | null;
    publishedAt: number | null;
    dTag: string;
    naddr: string;
    tags: string[][];
}

/**
 * Convert a nostr event to a BlogPost
 */
export function eventToBlogPost(event: NostrEvent): BlogPost {
    const dTag = getTagValue(event, "d") || "";
    const publishedAtStr = getTagValue(event, "published_at");

    const addressPointer = getAddressPointerForEvent(event, RELAYS);

    return {
        id: event.id,
        pubkey: event.pubkey,
        content: event.content,
        createdAt: event.created_at,
        title: getTagValue(event, "title") || "Untitled",
        image: getTagValue(event, "image") || null,
        summary: getTagValue(event, "summary") || null,
        publishedAt: publishedAtStr ? Number.parseInt(publishedAtStr, 10) : null,
        dTag,
        naddr: addressPointer ? naddrEncode(addressPointer) : "",
        tags: event.tags,
    };
}

// Create a shared relay pool and event store
let pool: RelayPool | null = null;
let eventStore: EventStore | null = null;

function getPool(): RelayPool {
    if (!pool) {
        pool = new RelayPool();
    }
    return pool;
}

function getEventStore(): EventStore {
    if (!eventStore) {
        eventStore = new EventStore();
    }
    return eventStore;
}

/**
 * Fetch all blog posts for the configured pubkey
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
    console.log("[nostr] Starting fetchBlogPosts...");
    await ensureWebSocket();
    console.log("[nostr] WebSocket ensured");
    const relayPool = getPool();
    const store = getEventStore();

    try {
        console.log("[nostr] Requesting from relays:", RELAYS);

        const filter = {
            kinds: [KIND_LONG_FORM],
            authors: [BLOG_PUBKEY],
        };

        // Use request() which completes after EOSE (end of stored events)
        const events = await firstValueFrom(
            relayPool.request(RELAYS, filter).pipe(
                timeout(15000), // 15 second timeout for the entire request
                toArray(),
                catchError((err) => {
                    console.error("[nostr] Error fetching blog posts:", err);
                    return of([]);
                })
            )
        );

        console.log("[nostr] Received events from relays:", events.length);

        // Add events to the store - it handles deduplication for replaceable events
        for (const event of events) {
            store.add(event);
        }

        // Query the store for deduplicated events (store handles replaceable event logic)
        const dedupedEvents = store.getTimeline(filter);
        console.log("[nostr] Deduplicated events from store:", dedupedEvents.length);

        const posts = dedupedEvents.map(eventToBlogPost);

        // Sort by published_at or created_at, newest first
        posts.sort((a, b) => {
            const aTime = a.publishedAt || a.createdAt;
            const bTime = b.publishedAt || b.createdAt;
            return bTime - aTime;
        });

        console.log("[nostr] Returning posts:", posts.length);
        return posts;
    } catch (err) {
        console.error("[nostr] Error fetching blog posts:", err);
        return [];
    }
}

/**
 * Fetch a single blog post by its d-tag
 */
export async function fetchBlogPostByDTag(dTag: string): Promise<BlogPost | null> {
    await ensureWebSocket();
    const relayPool = getPool();
    const store = getEventStore();

    // First check the event store cache
    const cached = store.getReplaceable(KIND_LONG_FORM, BLOG_PUBKEY, dTag);
    if (cached) {
        return eventToBlogPost(cached);
    }

    try {
        const events = await firstValueFrom(
            relayPool
                .request(RELAYS, {
                    kinds: [KIND_LONG_FORM],
                    authors: [BLOG_PUBKEY],
                    "#d": [dTag],
                    limit: 1,
                })
                .pipe(
                    timeout(10000),
                    toArray(),
                    catchError((err) => {
                        console.error("Error fetching blog post:", err);
                        return of([]);
                    })
                )
        );

        if (events.length === 0) {
            return null;
        }

        // Add to store for caching
        store.add(events[0]);

        return eventToBlogPost(events[0]);
    } catch (err) {
        console.error("Error fetching blog post:", err);
        return null;
    }
}

// Simple in-memory cache for SSR
const cache = new Map<string, { data: BlogPost[]; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch blog posts with caching
 */
export async function fetchBlogPostsCached(): Promise<BlogPost[]> {
    const cacheKey = "blog_posts";
    const cached = cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return cached.data;
    }

    const posts = await fetchBlogPosts();
    cache.set(cacheKey, { data: posts, timestamp: Date.now() });

    return posts;
}

/**
 * Fetch a single blog post with caching
 */
export async function fetchBlogPostCached(dTag: string): Promise<BlogPost | null> {
    // First check if it's in the posts cache
    const cached = cache.get("blog_posts");
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        const post = cached.data.find((p) => p.dTag === dTag);
        if (post) {
            return post;
        }
    }

    // Otherwise fetch it directly
    return fetchBlogPostByDTag(dTag);
}

/**
 * Decode an naddr to get the d-tag
 */
export function decodeNaddr(naddr: string): {
    dTag: string;
    pubkey: string;
    kind: number;
} | null {
    try {
        const pointer = decodeAddressPointer(naddr);
        if (!pointer) {
            return null;
        }

        return {
            dTag: pointer.identifier,
            pubkey: pointer.pubkey,
            kind: pointer.kind,
        };
    } catch {
        return null;
    }
}
