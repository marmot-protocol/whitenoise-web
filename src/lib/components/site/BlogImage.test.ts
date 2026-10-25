import { render } from "svelte/server";
import { describe, expect, it } from "vitest";
import BlogImage from "./BlogImage.svelte";

describe("BlogImage server markup", () => {
    it("renders a published image without inline event handlers, which the CSP blocks", () => {
        const { body } = render(BlogImage, { props: { src: "https://images.example/post.jpg" } });

        expect(body).toContain('src="https://images.example/post.jpg"');
        expect(body).toContain('loading="lazy"');
        expect(body).not.toMatch(/\son(error|load)=/);
    });

    it("renders the canonical logo placeholder when a post has no image", () => {
        const { body } = render(BlogImage, { props: { src: null, variant: "article" } });

        expect(body).toContain('src="/images/logomark.svg"');
        expect(body).toContain("blog-image-placeholder");
        expect(body).not.toContain("blog-image-content");
    });
});
