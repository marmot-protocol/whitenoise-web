import type { NostrEvent } from "applesauce-core/helpers/event";
import { getTagValue } from "applesauce-core/helpers/event";
import {
    decodeAddressPointer,
    getAddressPointerForEvent,
    naddrEncode,
} from "applesauce-core/helpers/pointers";

// The pubkey for blog posts and canary attestations from the White Noise account
export const WHITE_NOISE_PUBKEY =
    "75d737c3472471029c44876b330d2284288a42779b591a2ed4daa1c6c07efaf7";
export const BLOG_PUBKEY = WHITE_NOISE_PUBKEY;

// Relays to fetch from (including relays that specialize in long-form content)
export const RELAYS = ["wss://relay.primal.net", "wss://relay.damus.io", "wss://nos.lol"];
export const CANARY_RELAYS = [
    "wss://relay.primal.net",
    "wss://relay.damus.io",
    "wss://nos.lol",
    "wss://relay.ditto.pub",
];

// Long-form content kind (NIP-23)
export const KIND_LONG_FORM = 30023;
export const KIND_CANARY_ATTESTATION = 303;

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

export interface CanaryAttestation {
    id: string;
    pubkey: string;
    content: string;
    createdAt: number;
    publishedAt: number | null;
    title: string;
    tags: string[][];
}

/**
 * Safely parse a timestamp string to a number, returning null if invalid
 */
function parseTimestamp(value: string | undefined): number | null {
    if (!value) {
        return null;
    }
    const parsed = /^\d+$/.test(value) ? Number(value) : Number.NaN;
    return Number.isSafeInteger(parsed) && parsed <= 8_640_000_000_000 ? parsed : null;
}

function imageUrl(value: string | undefined): string | null {
    if (!value) return null;
    try {
        const url = new URL(value);
        return ["https:", "http:"].includes(url.protocol) ? url.href : null;
    } catch {
        return null;
    }
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
        image: imageUrl(getTagValue(event, "image")),
        summary: getTagValue(event, "summary") || null,
        publishedAt: parseTimestamp(publishedAtStr),
        dTag,
        naddr: addressPointer ? naddrEncode(addressPointer) : "",
        tags: event.tags,
    };
}

export function eventToCanaryAttestation(event: NostrEvent): CanaryAttestation {
    return {
        id: event.id,
        pubkey: event.pubkey,
        content: event.content,
        createdAt: event.created_at,
        publishedAt: parseTimestamp(getTagValue(event, "published_at")),
        title: getTagValue(event, "title") || "White Noise Canary",
        tags: event.tags,
    };
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
