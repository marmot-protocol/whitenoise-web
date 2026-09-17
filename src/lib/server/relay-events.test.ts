import type { GroupReqMessage } from "applesauce-relay";
import { finalizeEvent, generateSecretKey } from "nostr-tools/pure";
import { Subject } from "rxjs";
import { afterEach, describe, expect, it, vi } from "vitest";
import { collectRelayEvents, latestReplacements, matchesVerifiedEvent } from "./relay-events";

const key = generateSecretKey();
const event = finalizeEvent(
    { kind: 30023, created_at: 1_700_000_000, tags: [["d", "post"]], content: "Verified post" },
    key
);
const filter = { kinds: [30023], authors: [event.pubkey], "#d": ["post"] };
const message = (type: "EVENT" | "EOSE", from = "relay") =>
    ({ type, from, id: "request", event }) as GroupReqMessage;
afterEach(() => vi.useRealTimers());

describe("relay content boundary", () => {
    it("rejects tampering and responses outside the requested author, kind and identifier", () => {
        expect(matchesVerifiedEvent(event, filter)).toBe(true);
        expect(
            matchesVerifiedEvent(
                JSON.parse(JSON.stringify({ ...event, content: "Tampered" })),
                filter
            )
        ).toBe(false);
        expect(matchesVerifiedEvent(event, { ...filter, authors: ["0".repeat(64)] })).toBe(false);
        expect(matchesVerifiedEvent(event, { ...filter, kinds: [303] })).toBe(false);
        expect(matchesVerifiedEvent(event, { ...filter, "#d": ["other"] })).toBe(false);
        expect(matchesVerifiedEvent(null as never, filter)).toBe(false);
    });
    it("keeps verified partial results at the fixed deadline and tears down the source", async () => {
        vi.useFakeTimers();
        const source = new Subject<GroupReqMessage>();
        const result = collectRelayEvents(source, filter, 2, 100);
        source.next(message("EVENT"));
        await vi.advanceTimersByTimeAsync(90);
        source.next(message("EVENT"));
        await vi.advanceTimersByTimeAsync(10);
        await expect(result).resolves.toEqual([event]);
        expect(source.observed).toBe(false);
    });
    it("distinguishes a confirmed empty response from an outage", async () => {
        const source = new Subject<GroupReqMessage>();
        const result = collectRelayEvents(source, filter, 1);
        source.next(message("EOSE"));
        await expect(result).resolves.toEqual([]);
        const offline = new Subject<GroupReqMessage>();
        const failure = collectRelayEvents(offline, filter, 1);
        offline.error(new Error("Disconnected"));
        await expect(failure).rejects.toThrow("No relay completed");
        expect(offline.observed).toBe(false);
    });
    it("selects the newest replacement regardless of response order, breaking ties by lowest id", () => {
        const newer = { ...event, created_at: event.created_at + 1, id: "b" };
        const tie = { ...newer, id: "a" };
        expect(latestReplacements([newer, event, tie])).toEqual([tie]);
        expect(latestReplacements([tie, event, newer])).toEqual([tie]);
    });
});
