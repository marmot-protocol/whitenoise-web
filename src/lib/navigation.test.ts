import { describe, expect, it } from "vitest";
import { currentGuideArea, currentPageLabel, isActiveDestination } from "./navigation";

describe("site navigation", () => {
    it("keeps nested pages under their destination without matching unrelated prefixes", () => {
        expect(isActiveDestination("/blog/article", "/blog")).toBe(true);
        expect(isActiveDestination("/blog", "/blog")).toBe(true);
        expect(isActiveDestination("/blogger", "/blog")).toBe(false);
        expect(isActiveDestination("/privacy-matters", "/privacy")).toBe(false);
        expect(currentPageLabel("/privacy-matters")).toBe("Privacy Matters");
        expect(currentPageLabel("/privacy")).toBe("Privacy Policy");
        expect(currentPageLabel("/terms")).toBe("Terms of Service");
        expect(currentPageLabel("/download")).toBe("Download");
    });

    it("recognizes legacy documentation destinations and runtime pages", () => {
        expect(currentPageLabel("/docs/mdk/README.md")).toBe("For developers");
        expect(currentPageLabel("/docs/marmot/features/multi-device.md")).toBe("Marmot Protocol");
        expect(currentPageLabel("/agents/hermes")).toBe("Agents");
        expect(currentPageLabel("/docs/mdk-other/README.md")).toBe("");
    });

    it("provides compact labels for non-navigation pages without mislabeling unknown pages", () => {
        expect(currentPageLabel("/")).toBe("Home");
        expect(currentPageLabel("/design-system")).toBe("Design system");
        expect(currentPageLabel("/missing")).toBe("");
    });

    it("mounts guide navigation only where its local section targets exist", () => {
        expect(currentGuideArea("/agents")).toBe("agents");
        expect(currentGuideArea("/build")).toBe("builders");
        expect(currentGuideArea("/docs/marmot/README.md")).toBe("marmot");
        expect(currentGuideArea("/agents/hermes")).toBeUndefined();
        expect(currentGuideArea("/docs/mdk/README.md")).toBeUndefined();
        expect(currentGuideArea("/docs/marmot/features/multi-device.md")).toBeUndefined();
    });
});
