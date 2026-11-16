import { render } from "svelte/server";
import { describe, expect, it } from "vitest";
import PageMeta from "./PageMeta.svelte";

describe("PageMeta head markup", () => {
    it("gives indexable pages a canonical URL and complete link-preview metadata", () => {
        const { head } = render(PageMeta, {
            props: { title: "Download", description: "Get the app.", path: "/download" },
        });

        expect(head).toContain("<title>Download — White Noise</title>");
        expect(head).toContain('<link rel="canonical" href="https://www.whitenoise.chat/download"');
        expect(head).toContain('property="og:url" content="https://www.whitenoise.chat/download"');
        expect(head).toContain(
            'property="og:image" content="https://www.whitenoise.chat/images/og_preview@1x.png"'
        );
        expect(head).toContain('name="twitter:card" content="summary_large_image"');
        expect(head).not.toContain('name="robots"');
    });

    it("keeps excluded pages out of search without claiming a canonical URL", () => {
        const { head } = render(PageMeta, {
            props: { title: "Page not found", path: "/missing", robots: "noindex" },
        });

        expect(head).toContain('<meta name="robots" content="noindex"');
        expect(head).not.toContain('rel="canonical"');
        expect(head).not.toContain("og:url");
    });
});
