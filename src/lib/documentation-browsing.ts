export function guideFilters(url: URL) {
    const selected = url.searchParams.get("platform");
    return {
        platform: selected === "ios" || selected === "all" ? selected : "android",
        query: url.searchParams.get("q") ?? "",
    };
}

export function guideIndexUrl(platform: string, query: string, slug?: string) {
    const url = new URL("https://www.whitenoise.chat/docs");
    if (platform !== "android") url.searchParams.set("platform", platform);
    if (query) url.searchParams.set("q", query);
    if (slug) url.hash = `guide-${slug.replaceAll("/", "-")}`;
    return url.pathname + url.search + url.hash;
}

export function guideReturnUrl(value: string | null, platform: string) {
    if (value) {
        try {
            const url = new URL(value, "https://www.whitenoise.chat");
            if (url.origin === "https://www.whitenoise.chat" && url.pathname === "/docs") {
                const filters = guideFilters(url);
                const target = guideIndexUrl(filters.platform, filters.query);
                return target + (/^#guide-[a-z0-9-]+$/.test(url.hash) ? url.hash : "");
            }
        } catch {
            // Invalid navigation context falls back to the current platform.
        }
    }
    return guideIndexUrl(platform === "ios" ? "ios" : "android", "");
}

export function withGuideContext(destination: string, context: string) {
    const url = new URL(destination, "https://www.whitenoise.chat");
    url.searchParams.set("guides", context);
    return url.pathname + url.search + url.hash;
}
