import { describe, expect, it } from "vitest";
import { breadcrumbSchema, canonicalUrl, guideTitle, pageTitle } from "./seo";

describe("canonicalUrl", () => {
    it("builds URLs on the canonical origin", () => {
        expect(canonicalUrl("/")).toBe("https://www.whitenoise.chat/");
        expect(canonicalUrl("/docs/settings/ios")).toBe(
            "https://www.whitenoise.chat/docs/settings/ios"
        );
    });

    it("refuses paths that would point canonical links at another origin", () => {
        expect(() => canonicalUrl("//example.com/blog")).toThrow();
        expect(() => canonicalUrl("https://example.com/blog")).toThrow();
    });
});

describe("pageTitle", () => {
    it("appends the site name", () => {
        expect(pageTitle("Download")).toBe("Download — White Noise");
        expect(pageTitle("Release notes", "White Noise Blog")).toBe(
            "Release notes — White Noise Blog"
        );
    });

    it("leaves a complete title alone when no site suffix is requested", () => {
        expect(pageTitle("White Noise — Private messenger.", "")).toBe(
            "White Noise — Private messenger."
        );
    });
});

describe("guideTitle", () => {
    it("names the platform so Android and iOS guides have distinct titles", () => {
        expect(guideTitle({ title: "Send a message", platform: "android" })).toBe(
            "Send a message on Android"
        );
        expect(guideTitle({ title: "Send a message", platform: "ios" })).toBe(
            "Send a message on iOS"
        );
    });

    it("does not repeat a platform the title already names, or add one to shared guides", () => {
        expect(guideTitle({ title: "iOS diagnostics and local logs", platform: "ios" })).toBe(
            "iOS diagnostics and local logs"
        );
        expect(guideTitle({ title: "Relays", platform: "shared" })).toBe("Relays");
    });
});

describe("breadcrumbSchema", () => {
    it("numbers absolute item URLs from the site root", () => {
        expect(
            breadcrumbSchema([
                { name: "Home", path: "/" },
                { name: "Documentation", path: "/docs" },
            ]).itemListElement
        ).toEqual([
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.whitenoise.chat/",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Documentation",
                item: "https://www.whitenoise.chat/docs",
            },
        ]);
    });
});
