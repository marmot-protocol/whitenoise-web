import { Marked } from "marked";
import sanitizeHtml from "sanitize-html";
import { type DocSource, docUrl, validDocSource } from "$lib/documentation";

export function documentationLink(href: string, source: DocSource, known: Set<string>): string {
    if (href.startsWith("#")) return href;
    const base = `https://github.com/marmot-protocol/${source.repo}/blob/master/${source.path}`;
    let url: URL;
    try {
        url = new URL(href, base);
    } catch {
        return href;
    }
    const parts = url.pathname.split("/").filter(Boolean);
    let repo = "";
    let path = "";
    if (url.hostname === "github.com" && parts[0] === "marmot-protocol") {
        repo = parts[1];
        if (parts.length === 2) path = "README.md";
        else if (["blob", "tree"].includes(parts[2]) && /^(master|[a-f0-9]{40})$/.test(parts[3]))
            path = parts.slice(4).join("/");
    } else if (
        url.hostname === "raw.githubusercontent.com" &&
        parts[0] === "marmot-protocol" &&
        /^(master|[a-f0-9]{40})$/.test(parts[2])
    ) {
        repo = parts[1];
        path = parts.slice(3).join("/");
    }
    if (path && !path.endsWith(".md") && known.has(`${repo}/${path.replace(/\/$/, "")}/README.md`))
        path = `${path.replace(/\/$/, "")}/README.md`;
    if (validDocSource(repo, path)) return docUrl({ repo, path }) + url.hash;
    return url.href;
}

export function renderDocumentation(
    markdown: string,
    source: DocSource,
    known: Set<string>,
    options: { keepExternalLinks?: boolean } = {}
) {
    const headings: { id: string; text: string; depth: number }[] = [];
    const slugs = new Map<string, number>();
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
                const count = slugs.get(base) || 0;
                slugs.set(base, count + 1);
                const id = count ? `${base}-${count}` : base;
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
                              href: options.keepExternalLinks
                                  ? attributes.href
                                  : documentationLink(attributes.href, source, known),
                              rel: "noopener noreferrer",
                          }
                        : {}),
                },
            }),
            img: (_tag, attributes) => {
                let src = "";
                try {
                    if (attributes.src)
                        src = new URL(
                            attributes.src,
                            `https://raw.githubusercontent.com/marmot-protocol/${source.repo}/master/${source.path}`
                        ).href;
                } catch {
                    /* Invalid source is omitted. */
                }
                return { tagName: "img", attribs: { ...attributes, src, loading: "lazy" } };
            },
        },
    })
        .replace(
            /<table>/g,
            '<div class="technical-scroll" tabindex="0" role="region" aria-label="Scrollable documentation table"><table>'
        )
        .replace(/<\/table>/g, "</table></div>");
    return { title, html, headings };
}
