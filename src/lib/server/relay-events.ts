import type { GroupReqMessage } from "applesauce-relay";
import { type Filter, matchFilter } from "nostr-tools/filter";
import { type Event, verifyEvent } from "nostr-tools/pure";
import { type Observable, Subscription } from "rxjs";

/** Validate untrusted relay data before it reaches a cache or a signed canary page. */
export function matchesVerifiedEvent(event: Event, filter: Filter): boolean {
    try {
        return (
            Number.isSafeInteger(event.created_at) &&
            event.created_at >= 0 &&
            event.created_at <= 8_640_000_000_000 &&
            event.content.length <= 2_000_000 &&
            matchFilter(filter, event) &&
            verifyEvent(event)
        );
    } catch {
        return false;
    }
}

/** A wall-clock deadline preserves verified partial results and always closes the subscription. */
export function collectRelayEvents(
    source: Observable<GroupReqMessage>,
    filter: Filter,
    relayCount: number,
    deadlineMs = 10_000
): Promise<Event[]> {
    return new Promise((resolve, reject) => {
        const events = new Map<string, Event>();
        const finished = new Set<string>();
        let receivedEose = false;
        let settled = false;
        const subscription = new Subscription();
        const finish = () => {
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            subscription.unsubscribe();
            if (events.size || receivedEose) resolve([...events.values()]);
            else reject(new Error("No relay completed the content request"));
        };
        const timer = setTimeout(finish, deadlineMs);
        subscription.add(
            source.subscribe({
                next(message) {
                    if (settled) return;
                    if (message.type === "EVENT" && matchesVerifiedEvent(message.event, filter)) {
                        events.set(message.event.id, message.event);
                        if (events.size >= 500) finish();
                    } else if (
                        message.type === "EOSE" ||
                        message.type === "ERROR" ||
                        message.type === "CLOSED"
                    ) {
                        finished.add(message.from);
                        if (message.type === "EOSE") receivedEose = true;
                        if (finished.size >= relayCount) finish();
                    }
                },
                error: finish,
                complete: finish,
            })
        );
    });
}

/** NIP-01: newest replacement wins; equal timestamps use the lowest event id. */
export function latestReplacements(events: Event[]): Event[] {
    const latest = new Map<string, Event>();
    for (const event of events) {
        const identifier = event.tags.find((tag) => tag[0] === "d")?.[1] ?? "";
        const key = `${event.kind}:${event.pubkey}:${identifier}`;
        const previous = latest.get(key);
        if (
            !previous ||
            event.created_at > previous.created_at ||
            (event.created_at === previous.created_at && event.id < previous.id)
        )
            latest.set(key, event);
    }
    return [...latest.values()];
}
