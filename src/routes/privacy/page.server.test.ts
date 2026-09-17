import { describe, expect, it } from "vitest";
import { load } from "./+page.server";

describe("legal page navigation", () => {
    it("preserves the introduction and gives every contents link a unique section target", async () => {
        const data = await load({} as Parameters<typeof load>[0]);
        if (!data) throw new Error("Missing legal page data");
        expect(data.introductionHtml).toContain("<h1>");
        expect(data.introductionHtml).toContain("September 16, 2026");
        expect(data.sections.length).toBe(21);
        expect(new Set(data.sections.map((section: { id: string }) => section.id)).size).toBe(21);
        for (const section of data.sections) {
            expect(data.sectionsHtml).toContain(`<h2 id="${section.id}">${section.title}</h2>`);
        }
        expect(data.sectionsHtml).not.toContain("<h1>");
    });
});
