import { describe, expect, it } from "vitest";
import agents from "$lib/content/agents.md?raw";
import { agentRuntimes } from "$lib/documentation";
import { guideLinks } from "$lib/documentation-navigation";
import { curatedGuide } from "./curated-guides";

describe("self-contained guide content", () => {
    for (const area of ["agents", "builders", "marmot"] as const) {
        it(`${area} keeps anchors local and full documentation links on GitHub`, () => {
            const document = curatedGuide(area);
            const prose = document.sections
                ? document.sections.map((section) => section.html + section.afterHtml).join(" ")
                : document.html;
            const ids = [...prose.matchAll(/<h[23] id="([^"]+)"/g)].map((match) => match[1]);
            for (const link of guideLinks[area]) {
                if (link.id !== "repositories-heading") expect(ids).toContain(link.id);
            }
            expect(new Set(ids).size).toBe(ids.length);
            const destinations = [...prose.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
            expect(destinations.length).toBeGreaterThan(0);
            expect(destinations.every((href) => href.startsWith("https://github.com/"))).toBe(true);
            expect(prose).not.toMatch(/href="\/(?:agents|build|docs)/);
            expect(prose.replace(/<[^>]+>/g, " ").split(/\s+/).length).toBeLessThan(650);
        });
    }

    it("keeps every runtime's exact copyable prompt with its guide section", () => {
        const document = curatedGuide("agents");
        const sections = document.sections ?? [];
        expect(sections.map((section) => section.name.toLowerCase())).toEqual([
            "getting started",
            ...agentRuntimes,
        ]);
        expect(sections[0].prompt).toBeUndefined();
        const sourcePrompts = [...agents.matchAll(/```agent-setup\n([\s\S]*?)\n```/g)].map(
            (match) => match[1]
        );
        expect(sections.flatMap((section) => (section.prompt ? [section.prompt] : []))).toEqual(
            sourcePrompts
        );
        expect(sourcePrompts).toHaveLength(agentRuntimes.length);
        for (const section of sections.slice(1)) {
            expect(section.prompt).toContain(`Connect this ${section.name}`);
            expect(section.prompt).toContain("Ask me for my White Noise public key (npub)");
            expect(section.prompt).toContain("Ask for my approval before making changes.");
            expect(section.prompt).not.toMatch(/%1\$s|npub1|nsec1/);
            expect(section.html).not.toContain("language-agent-setup");
            expect(section.html).not.toContain(`Full ${section.name} documentation`);
            expect(section.afterHtml).toContain(`Full ${section.name} documentation on GitHub`);
            expect(section.afterHtml).toContain(
                `https://github.com/marmot-protocol/mdk/blob/master/integrations/${section.name.toLowerCase()}/marmot/README.md`
            );
        }
        const displayedIds = sections.flatMap((section) =>
            [...section.html.matchAll(/<h[23] id="([^"]+)"/g)].map((match) => match[1])
        );
        expect(displayedIds).toEqual(guideLinks.agents.map((link) => link.id));
    });

    it("sends each setup prompt once without an unused full article", () => {
        const document = curatedGuide("agents");
        expect(document.html).toBeUndefined();
        expect(document.title).toBe(agents.split("\n")[0].replace(/^# /, ""));
        const payload = JSON.stringify(document);
        for (const runtime of agentRuntimes) {
            const name = document.sections?.find(
                (section) => section.name.toLowerCase() === runtime
            )?.name;
            expect(payload.split(`Connect this ${name}`).length - 1).toBe(1);
        }
    });
});
