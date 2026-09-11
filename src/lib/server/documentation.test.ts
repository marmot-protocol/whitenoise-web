import { describe, expect, it } from "vitest";
import { docUrl, validDocSource } from "$lib/documentation";
import { renderDocumentation } from "./docs-markdown";

describe("on-site documentation rendering", () => {
    it("keeps the MDK README separate from the Build overview and retains agent destinations", () => {
        expect(docUrl({ repo: "mdk", path: "README.md" })).toBe("/docs/mdk/README.md");
        expect(docUrl({ repo: "mdk", path: "integrations/README.md" })).toBe("/agents");
        expect(docUrl({ repo: "mdk", path: "integrations/hermes/marmot/README.md" })).toBe(
            "/agents/hermes"
        );
    });
    it("preserves explicit GitHub destinations in curated guides without bypassing sanitization", () => {
        const result = renderDocumentation(
            '[Full docs](https://github.com/marmot-protocol/mdk/blob/master/README.md)\n<a href="javascript:alert(1)">Unsafe</a>'
        );
        expect(result.html).toContain(
            'href="https://github.com/marmot-protocol/mdk/blob/master/README.md"'
        );
        expect(result.html).not.toContain('href="/docs/');
        expect(result.html).not.toContain("javascript:");
    });

    it("removes executable markup and unsafe URLs while keeping safe content", () => {
        const result = renderDocumentation(
            '# Safe\n<script>alert(1)</script>\n<a href="javascript:alert(1)" onclick="alert(1)">link</a><img src="x" onerror="alert(1)"><iframe src="https://example.com"></iframe>\n[unsafe](data:text/html,bad)'
        );
        expect(result.html).not.toMatch(/<script|onclick|onerror|javascript:|data:text|<iframe/);
        expect(result.html).toContain("link");
    });

    it("provides unique heading anchors and scrollable tables with one page title", () => {
        const result = renderDocumentation(
            "# Agents\n## Set up\n## Set up\n## Set up-1\n# Another heading\n\n| A | B |\n| --- | --- |\n| one | two |"
        );
        expect(result.title).toBe("Agents");
        expect(result.html).not.toContain("<h1");
        expect(result.headings.map((heading) => heading.id)).toEqual([
            "set-up",
            "set-up-1",
            "set-up-1-1",
            "another-heading",
        ]);
        expect(result.html).toContain('class="technical-scroll" tabindex="0"');
    });
});

describe("documentation sources", () => {
    it("rejects invalid source paths", () => {
        for (const path of [
            "../README.md",
            "/README.md",
            "AGENTS.md",
            "notes/CLAUDE.md",
            "README.md?x=1",
            "a//b.md",
        ]) {
            expect(validDocSource("mdk", path)).toBe(false);
        }
    });
});
