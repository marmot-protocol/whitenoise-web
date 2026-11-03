import { describe, expect, it } from "vitest";
import {
    guideFilters,
    guideIndexUrl,
    guideReturnUrl,
    withGuideContext,
} from "./documentation-browsing";

describe("guide browsing context", () => {
    it("roundtrips platform, query and the selected row without changing the destination", () => {
        const context = guideIndexUrl("linux", "photos & files", "using/media/linux");
        const link = new URL(
            withGuideContext("/docs/using/media/linux", context),
            "https://www.whitenoise.chat"
        );
        expect(link.pathname).toBe("/docs/using/media/linux");
        expect(guideReturnUrl(link.searchParams.get("guides"), "linux")).toBe(context);
        expect(guideFilters(new URL(context, link))).toEqual({
            platform: "linux",
            query: "photos & files",
        });
        expect(context).toContain("#guide-using-media-linux");
        expect(guideReturnUrl(null, "linux")).toBe("/docs?platform=linux");
    });
    it("rejects external or unrelated return destinations and unexpected fragments", () => {
        for (const value of [
            "https://other.example/docs",
            "//other.example/docs",
            "/privacy",
            "javascript:alert(1)",
        ])
            expect(guideReturnUrl(value, "linux")).toBe("/docs?platform=linux");
        expect(guideReturnUrl("/docs?platform=bad&q=help#unknown", "ios")).toBe("/docs?q=help");
    });
    it("defaults to Android and leaves the unfiltered index URL short", () => {
        expect(guideFilters(new URL("https://www.whitenoise.chat/docs"))).toEqual({
            platform: "android",
            query: "",
        });
        expect(guideIndexUrl("android", "")).toBe("/docs");
    });
});
