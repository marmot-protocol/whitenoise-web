import TurndownService from "turndown";
import { tables } from "turndown-plugin-gfm";

// An explicit Markdown media range is required. Wildcards keep browser HTML.
export function prefersMarkdown(accept: string | null): boolean {
    const ranges = (accept || "").split(",").map((range) => {
        const [type, ...parameters] = range.trim().toLowerCase().split(";");
        const quality = parameters.find((parameter) => parameter.trim().startsWith("q="));
        const value = quality ? quality.trim().slice(2) : "1";
        const q = /^(?:0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/.test(value) ? Number(value) : 0;
        return { type: type.trim(), q };
    });
    const markdown = Math.max(
        0,
        ...ranges.filter(({ type }) => type === "text/markdown").map(({ q }) => q)
    );
    const htmlRange = ["text/html", "text/*", "*/*"].find((type) =>
        ranges.some((range) => range.type === type)
    );
    const html = Math.max(0, ...ranges.filter(({ type }) => type === htmlRange).map(({ q }) => q));
    return markdown > 0 && markdown >= html;
}

export function varyOnAccept(headers: Headers): void {
    const vary = (headers.get("Vary") || "")
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean);
    if (!vary.some((value) => value === "*" || value.toLowerCase() === "accept")) {
        headers.set("Vary", [...vary, "Accept"].join(", "));
    }
}

function contentUrl(value: string, base: URL): string | null {
    try {
        const url = new URL(value, base);
        if (
            !["http:", "https:", "mailto:", "bitcoin:", "lightning:", "nostr:"].includes(
                url.protocol
            )
        ) {
            return null;
        }
        return url.href.replace(/\(/g, "%28").replace(/\)/g, "%29");
    } catch {
        // Signed remote content can still contain an invalid URL.
        return null;
    }
}

export function pageMarkdown(html: string, url: URL): string {
    // The root layout owns one main element; sanitized remote content cannot add one.
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
    if (main === undefined) throw new Error("Page is missing its main content");
    const converter = new TurndownService({
        headingStyle: "atx",
        codeBlockStyle: "fenced",
        bulletListMarker: "-",
    });
    converter.use(tables);
    converter.remove(["script", "style", "nav", "button", "form"]);
    converter.remove((node) => node.nodeName.toLowerCase() === "svg");
    converter.addRule("absolute-links", {
        filter: "a",
        replacement: (content, node) => {
            const href = node.getAttribute("href");
            if (!href) return content;
            const destination = contentUrl(href, url);
            if (!destination) return content;
            return `[${content}](<${destination}>)`;
        },
    });
    converter.addRule("content-images", {
        filter: "img",
        replacement: (_content, node) => {
            const alt = node.getAttribute("alt");
            const src = node.getAttribute("src");
            if (!alt || !src) return "";
            const destination = contentUrl(src, url);
            if (!destination) return "";
            return `![${alt.replace(/[[\]]/g, "\\$&")}](<${destination}>)`;
        },
    });
    return `${converter.turndown(main)}\n\nSource: ${url.href}\n`;
}
