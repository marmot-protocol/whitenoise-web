/** Bounded, process-local cache. Concurrent readers share one refresh per key. */
export function createAsyncCache<T>({
    ttlMs = 5 * 60_000,
    staleMs = 0,
    canServeStale = () => true,
    maxEntries = 64,
    now = Date.now,
}: {
    ttlMs?: number;
    staleMs?: number;
    canServeStale?: (value: T) => boolean;
    maxEntries?: number;
    now?: () => number;
} = {}) {
    const entries = new Map<
        string,
        { value: T; expires: number; staleUntil: number; retryAt: number }
    >();
    const pending = new Map<string, Promise<T>>();
    return {
        async get(key: string, fetchValue: () => Promise<T>): Promise<T> {
            const cached = entries.get(key);
            if (
                cached &&
                (now() < cached.expires || (now() < cached.retryAt && now() < cached.staleUntil))
            )
                return cached.value;
            const running = pending.get(key);
            if (running) return running;
            if (pending.size >= maxEntries) throw new Error("Content request capacity reached");
            const refresh = Promise.resolve()
                .then(fetchValue)
                .then((value) => {
                    entries.delete(key);
                    if (entries.size >= maxEntries)
                        entries.delete(entries.keys().next().value as string);
                    entries.set(key, {
                        value,
                        expires: now() + ttlMs,
                        staleUntil: now() + ttlMs + (canServeStale(value) ? staleMs : 0),
                        retryAt: 0,
                    });
                    return value;
                })
                .catch((cause: unknown) => {
                    if (cached && now() < cached.staleUntil) {
                        cached.retryAt = now() + Math.min(ttlMs, 30_000);
                        console.warn("[content] Refresh failed; serving cached content", cause);
                        return cached.value;
                    }
                    entries.delete(key);
                    throw cause;
                })
                .finally(() => pending.delete(key));
            pending.set(key, refresh);
            return refresh;
        },
    };
}
