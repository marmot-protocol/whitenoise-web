import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

marked.setOptions({
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
        a: (tagName, attribs) => ({
            tagName,
            attribs: attribs.href ? { ...attribs, rel: "noopener noreferrer nofollow" } : attribs,
        }),
    },
};

export function renderBlogHtml(markdown: string): string {
    const html = marked.parse(markdown) as string;
    return sanitizeHtml(html, SANITIZE_OPTIONS);
}
