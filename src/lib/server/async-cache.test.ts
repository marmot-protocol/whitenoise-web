import { describe, expect, it, vi } from "vitest";
import { createAsyncCache } from "./async-cache";

describe("content cache", () => {
    it("coalesces simultaneous reads and retries rejected loads", async () => {
        const cache = createAsyncCache<string>();
        const load = vi.fn().mockResolvedValue("value");
        expect(await Promise.all([cache.get("post", load), cache.get("post", load)])).toEqual([
            "value",
            "value",
        ]);
        expect(load).toHaveBeenCalledTimes(1);
        const retry = vi
            .fn()
            .mockRejectedValueOnce(new Error("offline"))
            .mockResolvedValueOnce("back");
        await expect(cache.get("retry", retry)).rejects.toThrow("offline");
        expect(await cache.get("retry", retry)).toBe("back");
    });
    it("retains stale content during an outage only within its allowed window", async () => {
        let now = 0;
        const cache = createAsyncCache<string>({ ttlMs: 100, staleMs: 200, now: () => now });
        const load = vi
            .fn()
            .mockResolvedValueOnce("cached")
            .mockRejectedValue(new Error("offline"));
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        expect(await cache.get("post", load)).toBe("cached");
        now = 100;
        expect(await cache.get("post", load)).toBe("cached");
        now = 150;
        expect(await cache.get("post", load)).toBe("cached");
        expect(load).toHaveBeenCalledTimes(2);
        now = 300;
        await expect(cache.get("post", load)).rejects.toThrow("offline");
        warn.mockRestore();
    });
    it("evicts old entries and bounds concurrent distinct requests", async () => {
        const cache = createAsyncCache<string>({ maxEntries: 1 });
        const load = vi.fn().mockResolvedValue("value");
        await cache.get("a", load);
        await cache.get("b", load);
        await cache.get("a", load);
        expect(load).toHaveBeenCalledTimes(3);
        let finish!: (value: string) => void;
        const running = cache.get(
            "pending",
            () =>
                new Promise<string>((resolve) => {
                    finish = resolve;
                })
        );
        await expect(cache.get("excess", load)).rejects.toThrow("capacity");
        finish("done");
        await running;
    });
});
