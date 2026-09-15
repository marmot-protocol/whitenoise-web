import { RelayPool } from "applesauce-relay";
import type { Filter } from "nostr-tools/filter";
import {
    BLOG_PUBKEY,
    CANARY_RELAYS,
    eventToBlogPost,
    eventToCanaryAttestation,
    KIND_CANARY_ATTESTATION,
    KIND_LONG_FORM,
    RELAYS,
    WHITE_NOISE_PUBKEY,
} from "$lib/nostr";
import { createAsyncCache } from "./async-cache";
import { createBlogPostCache } from "./blog-post-cache";
import { collectRelayEvents, latestReplacements } from "./relay-events";

async function requestEvents(relays: string[], filter: Filter) {
    const pool = new RelayPool();
    try {
        return await collectRelayEvents(
            pool.req(relays, filter, { reconnect: false }),
            filter,
            relays.length
        );
    } finally {
        pool.close();
    }
}

const blogCache = createBlogPostCache({
    async fetchBlogPosts() {
        const events = await requestEvents(RELAYS, {
            kinds: [KIND_LONG_FORM],
            authors: [BLOG_PUBKEY],
            limit: 500,
        });
        return latestReplacements(events)
            .map(eventToBlogPost)
            .sort((a, b) => (b.publishedAt ?? b.createdAt) - (a.publishedAt ?? a.createdAt));
    },
    async fetchBlogPostByDTag(dTag) {
        const events = await requestEvents(RELAYS, {
            kinds: [KIND_LONG_FORM],
            authors: [BLOG_PUBKEY],
            "#d": [dTag],
            limit: 1,
        });
        const event = latestReplacements(events)[0];
        return event ? eventToBlogPost(event) : null;
    },
});

export const fetchBlogPostsCached = blogCache.fetchBlogPostsCached;
export const fetchBlogPostCached = blogCache.fetchBlogPostCached;

// Canary failures stay visible; stale attestations are never used as an outage fallback.
const canaryCache = createAsyncCache<ReturnType<typeof eventToCanaryAttestation>[]>({
    ttlMs: 60_000,
    maxEntries: 1,
});
export function fetchCanaryAttestations() {
    return canaryCache.get("canary", async () => {
        const events = await requestEvents(CANARY_RELAYS, {
            kinds: [KIND_CANARY_ATTESTATION],
            authors: [WHITE_NOISE_PUBKEY],
            limit: 100,
        });
        return events
            .map(eventToCanaryAttestation)
            .sort((a, b) => (b.publishedAt ?? b.createdAt) - (a.publishedAt ?? a.createdAt));
    });
}
