import { describe, expect, it } from "vitest";
import { nestArticleHeadings } from "./article";
import { renderBlogHtml } from "./server/blog-markdown";

describe("article heading hierarchy", () => {
    it("nests body headings beneath the article title without changing code examples", () => {
        const html = renderBlogHtml(
            "# Title\n\n## Section\n\n###### Detail\n\n```html\n<h1>Example</h1>\n```"
        );
        const nested = nestArticleHeadings(html);
        expect(nested).toContain("<h2>Title</h2>");
        expect(nested).toContain("<h3>Section</h3>");
        expect(nested).toContain("<h6>Detail</h6>");
        expect(nested).toContain("&lt;h1&gt;Example&lt;/h1&gt;");
        expect(nested).not.toContain("<h1>");
    });
});
