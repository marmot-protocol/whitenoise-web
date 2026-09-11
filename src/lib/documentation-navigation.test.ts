import { describe, expect, it } from "vitest";
import { activeGuide, guideAtPosition, guideInfo, guideLinks } from "./documentation-navigation";

describe("documentation navigation", () => {
    it("keeps every sidebar destination on its own guide page", () => {
        for (const area of ["agents", "builders", "marmot"] as const) {
            expect(guideLinks[area][0].id).toBe("getting-started");
            for (const link of guideLinks[area]) {
                expect(link.href).toBe(`${guideInfo[area].path}#${link.id}`);
                expect(activeGuide(area, guideInfo[area].path, `#${link.id}`)).toBe(link.id);
            }
        }
    });
    it("retains the parent for legacy URLs", () => {
        expect(activeGuide("agents", "/agents/codex", "#setup")).toBe("codex");
        expect(activeGuide("builders", "/docs/mdk/crates/marmot-app/README.md", "")).toBe("mdk");
    });
});

describe("guide scroll position", () => {
    const sections = [
        { id: "start", top: -100 },
        { id: "hermes", top: 120 },
        { id: "codex", top: 800 },
    ];
    it("switches when a heading reaches the reading line and handles scrolling back", () => {
        expect(guideAtPosition(sections, 119)).toBe("start");
        expect(guideAtPosition(sections, 120)).toBe("hermes");
        expect(guideAtPosition(sections, 800)).toBe("codex");
        expect(guideAtPosition(sections, 300)).toBe("hermes");
    });
    it("keeps the first item above the sections and handles missing anchors", () => {
        expect(guideAtPosition([{ id: "start", top: 200 }], 120)).toBe("start");
        expect(guideAtPosition([], 120)).toBeUndefined();
    });
});
