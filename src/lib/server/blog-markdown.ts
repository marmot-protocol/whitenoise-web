import { Marked } from "marked";
import sanitizeHtml from "sanitize-html";

const parser = new Marked({
    gfm: true,
    breaks: true,
});

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
    allowedTags: [
        "a",
        "blockquote",
        "br",
        "caption",
        "code",
        "del",
        "em",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "hr",
        "img",
        "li",
        "ol",
        "p",
        "pre",
        "strong",
        "table",
        "tbody",
        "td",
        "th",
        "thead",
        "tr",
        "ul",
    ],
    allowedAttributes: {
        a: ["href", "rel", "title"],
        code: ["class"],
        pre: ["tabindex", "role", "aria-label"],
        img: ["alt", "src", "title"],
        td: ["align"],
        th: ["align"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: {
        img: ["http", "https"],
    },
    allowProtocolRelative: false,
    disallowedTagsMode: "discard",
    transformTags: {
        pre: () => ({
            tagName: "pre",
            attribs: { tabindex: "0", role: "region", "aria-label": "Code example" },
        }),
        a: (tagName, attribs) => ({
            tagName,
            attribs: attribs.href ? { ...attribs, rel: "noopener noreferrer nofollow" } : attribs,
        }),
    },
};

export function renderBlogHtml(markdown: string): string {
    const html = parser.parse(markdown) as string;
    return sanitizeHtml(html, SANITIZE_OPTIONS)
        .replace(
            /<table>/g,
            '<div class="technical-scroll" tabindex="0" role="region" aria-label="Scrollable table"><table>'
        )
        .replace(/<\/table>/g, "</table></div>");
}
