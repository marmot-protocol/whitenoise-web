import type { GroupReqMessage } from "applesauce-relay";
import { type Event, finalizeEvent, generateSecretKey } from "nostr-tools/pure";
import { Subject } from "rxjs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
    collectRelayEvents,
    latestReplacements,
    matchesVerifiedEvent,
    requestRelayEvents,
} from "./relay-events";

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

// Exercises the real applesauce RelayPool; only the network socket is simulated.
type RelayScript = { unreachable?: boolean; onReq?: (socket: FakeSocket, id: string) => void };

class FakeSocket {
    readyState = 0;
    readonly received: unknown[][] = [];
    onopen?: (event: unknown) => void;
    onerror?: (event: unknown) => void;
    onclose?: (event: { wasClean: boolean; code: number }) => void;
    onmessage?: (event: { data: string }) => void;
    constructor(readonly script: RelayScript) {
        setTimeout(() => {
            if (script.unreachable) return this.drop();
            this.readyState = 1;
            this.onopen?.({});
        });
    }
    send(data: string) {
        const frame = JSON.parse(data);
        this.received.push(frame);
        if (frame[0] === "REQ") this.script.onReq?.(this, frame[1]);
    }
    reply(...frame: unknown[]) {
        this.onmessage?.({ data: JSON.stringify(frame) });
    }
    close() {
        if (this.readyState === 3) return;
        this.readyState = 3;
        this.onclose?.({ wasClean: true, code: 1000 });
    }
    drop() {
        this.readyState = 3;
        this.onerror?.({ type: "error" });
        this.onclose?.({ wasClean: false, code: 1006 });
    }
}

function fakeRelays(scripts: Record<string, RelayScript>) {
    const sockets: FakeSocket[] = [];
    class WebSocket extends FakeSocket {
        constructor(url: string) {
            super(scripts[new URL(url).host]);
            sockets.push(this);
        }
    }
    return {
        sockets,
        request: () =>
            requestRelayEvents(
                Object.keys(scripts).map((host) => `wss://${host}`),
                filter,
                { WebSocket: WebSocket as never }
            ),
    };
}

const later = (send: (socket: FakeSocket, id: string) => void) => ({
    onReq: (socket: FakeSocket, id: string) => setTimeout(() => send(socket, id)),
});
const answers = (...events: Event[]) =>
    later((socket, id) => {
        for (const event of events) socket.reply("EVENT", id, event);
        socket.reply("EOSE", id);
    });
const refuses = (reason: string) => later((socket, id) => socket.reply("CLOSED", id, reason));

const outsider = finalizeEvent(
    { kind: 30023, created_at: 1_700_000_000, tags: [["d", "post"]], content: "Other author" },
    generateSecretKey()
);

const ids = (events: Event[]) => events.map((event) => event.id);

function watch(promise: Promise<unknown>) {
    const state = { settled: false };
    promise.then(
        () => (state.settled = true),
        () => (state.settled = true)
    );
    return state;
}

/** Every socket is closed after at most one REQ, and no reconnect or keep-alive timer remains. */
function expectReleased(sockets: FakeSocket[]) {
    for (const socket of sockets) {
        expect(socket.readyState).toBe(3);
        expect(socket.received.filter(([verb]) => verb === "REQ").length).toBeLessThanOrEqual(1);
    }
    expect(vi.getTimerCount()).toBe(0);
}

describe("relay request lifecycle", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.stubGlobal(
            "fetch",
            vi.fn(() => Promise.reject(new Error("No HTTP requests expected")))
        );
    });
    afterEach(() => {
        expect(fetch).not.toHaveBeenCalled();
        vi.unstubAllGlobals();
        vi.useRealTimers();
    });
    it("returns only verified, requested events and releases every connection", async () => {
        const tampered = { ...event, content: "Tampered" };
        const relays = fakeRelays({
            "a.test": answers(event, tampered),
            "b.test": answers(event, outsider),
        });
        const result = relays.request();
        await vi.advanceTimersByTimeAsync(10);
        expect(ids(await result)).toEqual([event.id]);
        expectReleased(relays.sockets);
        for (const socket of relays.sockets) {
            const id = socket.received[0][1];
            expect(socket.received).toEqual([
                ["REQ", id, filter],
                ["CLOSE", id],
            ]);
        }
    });
    it("keeps verified partial results when another relay is silent until the ten-second deadline", async () => {
        const relays = fakeRelays({ "a.test": answers(event), "silent.test": {} });
        const result = relays.request();
        const state = watch(result);
        await vi.advanceTimersByTimeAsync(9_999);
        expect(state.settled).toBe(false);
        await vi.advanceTimersByTimeAsync(1);
        expect(ids(await result)).toEqual([event.id]);
        expectReleased(relays.sockets);
    });
    it("rejects at the deadline when every relay is silent instead of reporting no content", async () => {
        const relays = fakeRelays({ "a.test": {}, "b.test": {} });
        const result = relays.request();
        const rejection = expect(result).rejects.toThrow("No relay completed");
        await vi.advanceTimersByTimeAsync(10_000);
        await rejection;
        expectReleased(relays.sockets);
    });
    it("reports an outage promptly, without retrying, when no relay can be reached", async () => {
        const relays = fakeRelays({
            "a.test": { unreachable: true },
            "b.test": { unreachable: true },
        });
        const result = relays.request();
        const rejection = expect(result).rejects.toThrow("No relay completed");
        await vi.advanceTimersByTimeAsync(10);
        await rejection;
        expect(relays.sockets).toHaveLength(2);
        expectReleased(relays.sockets);
    });
    it("settles promptly when relays refuse, including auth-required, without claiming an empty history", async () => {
        const relays = fakeRelays({
            "auth.test": refuses("auth-required: sign in"),
            "error.test": refuses("error: overloaded"),
            "closed.test": refuses(""),
        });
        const result = relays.request();
        const rejection = expect(result).rejects.toThrow("No relay completed");
        await vi.advanceTimersByTimeAsync(10);
        await rejection;
        expectReleased(relays.sockets);
        for (const socket of relays.sockets)
            expect(socket.received.map(([verb]) => verb)).toEqual(["REQ"]);
    });
    it("confirms an empty history only after a relay finishes its stored events", async () => {
        const relays = fakeRelays({ "a.test": answers(), "b.test": { unreachable: true } });
        const result = relays.request();
        await vi.advanceTimersByTimeAsync(10);
        expect(await result).toEqual([]);
        expectReleased(relays.sockets);
    });
    it("keeps verified events received before a relay drops the connection", async () => {
        const relays = fakeRelays({
            "a.test": later((socket, id) => {
                socket.reply("EVENT", id, event);
                socket.drop();
            }),
            "b.test": { unreachable: true },
        });
        const result = relays.request();
        await vi.advanceTimersByTimeAsync(10);
        expect(ids(await result)).toEqual([event.id]);
        expectReleased(relays.sockets);
    });
});
