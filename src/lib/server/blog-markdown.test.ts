import { describe, expect, it } from "vitest";
import { renderBlogHtml } from "./blog-markdown";

describe("renderBlogHtml", () => {
    it("removes script tags and inline event handlers", () => {
        const html = renderBlogHtml(
            [
                "# Hello",
                "",
                "<script>alert('xss')</script>",
                '<img src="https://example.com/cat.png" onerror=\'alert(1)\' onclick=alert(1) alt="cat">',
            ].join("\n")
        );

        expect(html).toContain("<h1>Hello</h1>");
        expect(html).toContain('<img src="https://example.com/cat.png" alt="cat" />');
        expect(html).not.toContain("<script");
        expect(html).not.toContain("onerror");
        expect(html).not.toContain("onclick");
    });

    it("strips javascript urls from links", () => {
        const html = renderBlogHtml("[bad](javascript:alert(1)) and [good](https://example.com)");

        expect(html).not.toContain("javascript:");
        expect(html).toContain(
            '<a href="https://example.com" rel="noopener noreferrer nofollow">good</a>'
        );
    });

    it("preserves safe markdown structure like code blocks and tables", () => {
        const html = renderBlogHtml(
            [
                "```ts",
                "const message = 'hello';",
                "```",
                "",
                "| Name | Value |",
                "| ---- | ----- |",
                "| Key | 443 |",
            ].join("\n")
        );

        expect(html).toContain('<pre><code class="language-ts">');
        expect(html).toContain("<table>");
        expect(html).toContain("<td>443</td>");
    });
});
