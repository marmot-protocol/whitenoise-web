import { Marked } from "marked";
import sanitizeHtml from "sanitize-html";

export function renderDocumentation(markdown: string) {
    const headings: { id: string; text: string; depth: number }[] = [];
    const slugs = new Set<string>();
    let title = "Documentation";
    let foundTitle = false;
    const parser = new Marked({ gfm: true, breaks: false });
    parser.use({
        renderer: {
            heading({ tokens, depth }) {
                const html = this.parser.parseInline(tokens);
                const text = sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
                    .replace(/&amp;/g, "&")
                    .replace(/&lt;/g, "<")
                    .replace(/&gt;/g, ">")
                    .replace(/&quot;/g, '"')
                    .replace(/&#39;/g, "'");
                const base = text
                    .toLowerCase()
                    .replace(/[^\p{L}\p{N}_\s-]/gu, "")
                    .replace(/\s/g, "-");
                let id = base || "section";
                let count = 1;
                while (slugs.has(id)) id = `${base || "section"}-${count++}`;
                slugs.add(id);
                if (depth === 1 && !foundTitle) {
                    foundTitle = true;
                    title = text;
                    return `<span id="${id}"></span>`;
                }
                const level = Math.max(2, depth);
                if (level <= 3) headings.push({ id, text, depth: level });
                return `<h${level} id="${id}">${html}</h${level}>`;
            },
        },
    });
    const html = sanitizeHtml(parser.parse(markdown) as string, {
        allowedTags: [
            "a",
            "p",
            "br",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "ul",
            "ol",
            "li",
            "pre",
            "code",
            "strong",
            "em",
            "del",
            "blockquote",
            "hr",
            "table",
            "thead",
            "tbody",
            "tr",
            "th",
            "td",
            "img",
            "span",
        ],
        allowedAttributes: {
            a: ["href", "title", "rel", "id"],
            span: ["id"],
            h2: ["id"],
            h3: ["id"],
            h4: ["id"],
            h5: ["id"],
            h6: ["id"],
            code: ["class"],
            pre: ["tabindex", "role", "aria-label"],
            ol: ["start"],
            img: ["src", "alt", "title", "loading"],
        },
        allowedSchemes: ["https", "http", "mailto"],
        allowedSchemesByTag: { img: ["https", "http"] },
        allowProtocolRelative: false,
        transformTags: {
            pre: () => ({
                tagName: "pre",
                attribs: { tabindex: "0", role: "region", "aria-label": "Code example" },
            }),
            a: (_tag, attributes) => ({
                tagName: "a",
                attribs: {
                    ...attributes,
                    ...(attributes.href
                        ? {
                              href: attributes.href,
                              rel: "noopener noreferrer",
                          }
                        : {}),
                },
            }),
            img: (_tag, attributes) => ({
                tagName: "img",
                attribs: { ...attributes, loading: "lazy" },
            }),
        },
    })
        .replace(
            /<table>/g,
            '<div class="technical-scroll" tabindex="0" role="region" aria-label="Scrollable documentation table"><table>'
        )
        .replace(/<\/table>/g, "</table></div>");
    return { title, html, headings };
}
