import { describe, expect, it } from "vitest";
import { pageMarkdown, prefersMarkdown, varyOnAccept } from "./agent-markdown";

describe("Markdown negotiation", () => {
    it.each([
        null,
        "*/*",
        "text/html",
        "text/markdown;q=0",
        "text/markdown;q=0.4, text/html;q=0.9",
        "text/markdown;q=bad",
        "text/markdown;q=1.1",
    ])("keeps HTML for %s", (accept) => {
        expect(prefersMarkdown(accept)).toBe(false);
    });
    it.each([
        "text/markdown",
        "TEXT/MARKDOWN",
        "text/markdown, text/html;q=0.8",
        "text/markdown;q=0.5, text/html;q=0, */*;q=1",
        "text/markdown; charset=utf-8;q=1",
    ])("selects Markdown for %s", (accept) => {
        expect(prefersMarkdown(accept)).toBe(true);
    });
    it("preserves existing cache dimensions without duplicating Accept", () => {
        const headers = new Headers({ Vary: "Accept-Encoding" });
        varyOnAccept(headers);
        varyOnAccept(headers);
        expect(headers.get("Vary")).toBe("Accept-Encoding, Accept");
        headers.set("Vary", "*");
        varyOnAccept(headers);
        expect(headers.get("Vary")).toBe("*");
    });
});

describe("page conversion", () => {
    it("keeps opaque URLs inside their Markdown destination", () => {
        const markdown = pageMarkdown(
            '<main><h1>Article</h1><a href="mailto:x&gt;[y](javascript:alert(1))">Contact</a></main>',
            new URL("https://www.whitenoise.chat/blog/article")
        );
        expect(markdown).toContain("mailto:x%3E[y]%28javascript:alert%281%29%29");
        expect(markdown).not.toContain("](javascript:");
    });
    it("tolerates malformed remote URLs and removes unsafe Markdown destinations", () => {
        const markdown = pageMarkdown(
            '<main><h1>Article</h1><a href="https://[invalid">Broken link</a><a href="javascript:alert(1)">Unsafe link</a><img src="https://[invalid" alt="Broken image"></main>',
            new URL("https://www.whitenoise.chat/blog/article")
        );
        expect(markdown).toContain("Broken link");
        expect(markdown).toContain("Unsafe link");
        expect(markdown).not.toMatch(/https:\/\/\[invalid|javascript:/);
    });
    it("retains content, code and tables, resolves links, and removes page controls", () => {
        const markdown = pageMarkdown(
            `<html><head><script>secret()</script></head><body><header>Global navigation</header><main><header><h1>Guide &amp; setup</h1></header><nav>Table of contents</nav><p>Use <a href="../download?ref=guide">Download</a>.</p><pre><code>echo &lt;hello&gt;</code></pre><table><thead><tr><th>Runtime</th><th>Docs</th></tr></thead><tbody><tr><td>Local</td><td>Guide</td></tr></tbody></table><button>Copy</button><svg>icon</svg><img src="/images/cover.png" alt="Article cover"><img src="/decoration.png" alt=""><script>execute()</script></main><footer>Global footer</footer></body></html>`,
            new URL("https://www.whitenoise.chat/agents")
        );
        expect(markdown).toContain("# Guide & setup");
        expect(markdown).toContain("[Download](<https://www.whitenoise.chat/download?ref=guide>)");
        expect(markdown).toContain("```\necho <hello>\n```");
        expect(markdown).toMatch(/\| Runtime \| Docs \|/);
        expect(markdown).toContain(
            "![Article cover](<https://www.whitenoise.chat/images/cover.png>)"
        );
        expect(markdown).not.toMatch(
            /Global navigation|Table of contents|Global footer|secret|execute|Copy|decoration|icon/
        );
    });
});
