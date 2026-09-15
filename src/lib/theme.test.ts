import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";
import type {} from "./theme";

const bootstrap = readFileSync("static/theme.js", "utf8");

/** Exercise the actual pre-paint script without requiring the Svelte app to hydrate. */
function start({
    saved = null,
    dark = false,
    blocked = false,
}: {
    saved?: string | null;
    dark?: boolean;
    blocked?: boolean;
} = {}) {
    let stored = saved;
    const root = { dataset: {} as Record<string, string> };
    let browserColor = "";
    const icons = ["svg", "png", "ico"].map((extension) => ({
        dataset: { lightIcon: `/light.${extension}`, darkIcon: `/dark.${extension}` },
        href: `/adaptive.${extension}`,
        getAttribute() {
            return this.href;
        },
        setAttribute(_key: string, value: string) {
            this.href = value;
        },
    }));
    const system = new EventTarget() as EventTarget & { matches: boolean };
    system.matches = dark;
    const window = new EventTarget() as EventTarget & {
        matchMedia: () => typeof system;
        whiteNoiseTheme: NonNullable<Window["whiteNoiseTheme"]>;
    };
    window.matchMedia = () => system;
    const localStorage = {
        getItem: () => {
            if (blocked) throw new Error("Storage blocked");
            return stored;
        },
        setItem: (_key: string, value: string) => {
            if (blocked) throw new Error("Storage blocked");
            stored = value;
        },
        removeItem: () => {
            if (blocked) throw new Error("Storage blocked");
            stored = null;
        },
    };
    runInNewContext(bootstrap, {
        window,
        localStorage,
        Event,
        document: {
            documentElement: root,
            readyState: "complete",
            querySelectorAll: (selector: string) =>
                selector === "link[data-theme-icon]"
                    ? icons
                    : [
                          {
                              setAttribute: (_key: string, value: string) => {
                                  browserColor = value;
                              },
                          },
                      ],
        },
        getComputedStyle: () => ({
            getPropertyValue: () =>
                root.dataset.theme === "dark" || (root.dataset.theme === "system" && system.matches)
                    ? "#181818"
                    : "#fff",
        }),
    });
    return {
        root,
        theme: window.whiteNoiseTheme,
        saved: () => stored,
        color: () => browserColor,
        icons: () => icons.map((icon) => icon.href),
        systemChange(dark: boolean) {
            system.matches = dark;
            system.dispatchEvent(new Event("change"));
        },
        storageChange(
            value: string | null,
            key: string | null = "wn-theme",
            storageArea: unknown = localStorage
        ) {
            window.dispatchEvent(
                Object.assign(new Event("storage"), { key, newValue: value, storageArea })
            );
        },
    };
}

describe("appearance bootstrap", () => {
    it("applies saved appearance before hydration and keeps it over system changes", () => {
        const page = start({ saved: "dark" });
        expect(page.root.dataset.theme).toBe("dark");
        expect(page.color()).toBe("#181818");
        page.systemChange(false);
        expect(page.theme.preference).toBe("dark");
        expect(page.color()).toBe("#181818");
    });

    it("defaults to system, follows changes, and treats invalid stored values as system", () => {
        for (const saved of [null, "invalid", "system"]) {
            const page = start({ saved, dark: true });
            expect(page.theme.preference).toBe("system");
            expect(page.color()).toBe("#181818");
            page.systemChange(false);
            expect(page.color()).toBe("#fff");
        }
    });

    it("keeps SVG and raster favicons in sync with system changes and saved overrides", () => {
        const page = start({ dark: true });
        expect(page.icons()).toEqual(["/dark.svg", "/dark.png", "/dark.ico"]);
        page.systemChange(false);
        expect(page.icons()).toEqual(["/light.svg", "/light.png", "/light.ico"]);
        page.theme.toggle();
        expect(page.icons()).toEqual(["/dark.svg", "/dark.png", "/dark.ico"]);
        page.storageChange("light");
        expect(page.icons()).toEqual(["/light.svg", "/light.png", "/light.ico"]);
        expect(start({ saved: "light", dark: true }).icons()).toEqual(page.icons());
    });

    it("toggles the resolved device appearance and remembers the override", () => {
        for (const dark of [true, false]) {
            const page = start({ dark });
            expect(page.theme.dark).toBe(dark);
            page.theme.toggle();
            expect(page.theme.dark).toBe(!dark);
            expect(page.saved()).toBe(dark ? "light" : "dark");
            page.systemChange(!dark);
            page.systemChange(dark);
            expect(page.theme.dark).toBe(!dark);
            expect(start({ saved: page.saved(), dark }).theme.dark).toBe(!dark);
            page.theme.toggle();
            expect(page.theme.dark).toBe(dark);
        }
    });

    it("persists manual choices and removes the override when returning to system", () => {
        const page = start({ dark: true });
        page.theme.set("light");
        expect(page.saved()).toBe("light");
        expect(start({ saved: page.saved(), dark: true }).root.dataset.theme).toBe("light");
        page.theme.set("system");
        expect(page.saved()).toBeNull();
        expect(page.color()).toBe("#181818");
    });

    it("still permits a page-local choice when storage reads and writes fail", () => {
        const page = start({ blocked: true });
        expect(page.theme.preference).toBe("system");
        page.theme.set("dark");
        expect(page.root.dataset.theme).toBe("dark");
        expect(page.color()).toBe("#181818");
    });

    it("synchronizes other tabs, including clearing storage, without reacting to unrelated stores", () => {
        const page = start({ saved: "dark" });
        page.storageChange("light", "other");
        expect(page.theme.preference).toBe("dark");
        page.storageChange("light", "wn-theme", {});
        expect(page.theme.preference).toBe("dark");
        page.storageChange("light");
        expect(page.theme.preference).toBe("light");
        page.storageChange(null, null);
        expect(page.theme.preference).toBe("system");
        page.storageChange("invalid");
        expect(page.theme.preference).toBe("system");
    });
});
