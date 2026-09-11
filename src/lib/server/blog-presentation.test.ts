import { describe, expect, it } from "vitest";
import { renderBlogHtml } from "./blog-markdown";
import { formatBlogPresentation } from "./blog-presentation";

const releaseUrl = "https://github.com/marmot-protocol/whitenoise/releases";
const markdown = `# Release

This is the release body.

## Contributors

Jeff Gardner, Pepi, Danny Morabito, Mubarak Auwal, Javier Montoya, stupidloud, Datawav.

## Get the update

Download from the [GitHub releases page](${releaseUrl}). No phone. No email. Just keys.

---

**Release notes**: [vNEXT release notes](${releaseUrl})

**Report issues**: [marmot-protocol/whitenoise](https://github.com/marmot-protocol/whitenoise/issues)
`;

describe("May 22 release footer presentation", () => {
    it("keeps contributors with one release link and preserves the preceding article", () => {
        const html = renderBlogHtml(markdown);
        const result = formatBlogPresentation("PI5KrVIoOmRVtmUk", html);
        expect(result.split("<h2>Contributors")[0]).toBe(html.split("<h2>Contributors")[0]);
        expect(result).toContain("<h2>Contributors and release notes</h2>");
        expect(result).toContain(
            "Jeff Gardner, Pepi, Danny Morabito, Mubarak Auwal, Javier Montoya, stupidloud, Datawav."
        );
        expect(result.match(/href=/g)).toHaveLength(1);
        expect(result).toContain(`href="${releaseUrl}"`);
        expect(result).toContain("Read the release notes</a>");
        expect(result).not.toMatch(/Get the update|Report issues|vNEXT|<hr/);
    });
    it("does not edit other posts or an upstream footer that has changed", () => {
        const html = renderBlogHtml(markdown);
        expect(formatBlogPresentation("another-post", html)).toBe(html);
        const revised = renderBlogHtml(markdown.replace("## Get the update", "## Installation"));
        expect(formatBlogPresentation("PI5KrVIoOmRVtmUk", revised)).toBe(revised);
    });
    it("retains sanitizer protection for contributor content", () => {
        const html = renderBlogHtml(
            markdown.replace(
                "Jeff Gardner,",
                '<img src="https://example.com/avatar.png" onerror="alert(1)"> Jeff Gardner,'
            )
        );
        const result = formatBlogPresentation("PI5KrVIoOmRVtmUk", html);
        expect(result).toContain("Contributors and release notes");
        expect(result).not.toContain("onerror");
    });
});
