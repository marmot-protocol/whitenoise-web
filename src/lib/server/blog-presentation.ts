import type { BlogPost } from "$lib/nostr";

/** Only the fields needed by page UI cross the server/client boundary. */
export function blogMetadata({ title, summary, image, naddr, publishedAt, createdAt }: BlogPost) {
    return { title, summary, image, naddr, publishedAt, createdAt };
}

/** Local editorial presentation for the May 22 release post.
 * Preserve the signed source event and leave changed upstream footer shapes alone.
 * Input must already have passed through renderBlogHtml.
 */
export function formatBlogPresentation(dTag: string, safeHtml: string): string {
    if (dTag !== "PI5KrVIoOmRVtmUk") return safeHtml;

    const footer =
        /<h([1-6])>Contributors<\/h\1>\s*(<p>[\s\S]*?<\/p>)\s*<h\1>Get the update<\/h\1>\s*<p>[\s\S]*?<\/p>\s*<hr\s*\/?>\s*<p><strong>Release notes<\/strong>:\s*<a href="https:\/\/github\.com\/marmot-protocol\/whitenoise\/releases"[^>]*>[^<]*<\/a><\/p>\s*<p><strong>Report issues<\/strong>:[\s\S]*?<\/p>\s*$/;
    return safeHtml.replace(
        footer,
        (_match, level, contributors) =>
            `<h${level}>Contributors and release notes</h${level}>\n${contributors}\n<p><a href="https://github.com/marmot-protocol/whitenoise/releases" rel="noopener noreferrer nofollow">Read the release notes</a></p>\n`
    );
}
