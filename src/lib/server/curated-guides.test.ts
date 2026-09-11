import { describe, expect, it } from "vitest";
import { guideLinks } from "$lib/documentation-navigation";
import { curatedGuide } from "./curated-guides";

describe("self-contained guide content", () => {
    for (const area of ["agents", "builders", "marmot"] as const) {
        it(`${area} keeps anchors local and full documentation links on GitHub`, () => {
            const document = curatedGuide(area);
            const ids = document.headings.map((heading) => heading.id);
            for (const link of guideLinks[area]) {
                if (link.id !== "repositories-heading") expect(ids).toContain(link.id);
            }
            expect(new Set(ids).size).toBe(ids.length);
            const destinations = [...document.html.matchAll(/href="([^"]+)"/g)].map(
                (match) => match[1]
            );
            expect(destinations.length).toBeGreaterThan(0);
            expect(destinations.every((href) => href.startsWith("https://github.com/"))).toBe(true);
            expect(document.html).not.toMatch(/href="\/(?:agents|build|docs)/);
            expect(document.html.replace(/<[^>]+>/g, " ").split(/\s+/).length).toBeLessThan(650);
        });
    }
});
