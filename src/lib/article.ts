/** Nest sanitized blog body headings beneath the page's article title.
 * Input is already sanitized by renderBlogHtml; never use this as a sanitizer.
 */
export function nestArticleHeadings(safeHtml: string): string {
    return safeHtml.replace(
        /<(\/?)h([1-6])>/g,
        (_, closing, level) => `<${closing}h${Math.min(Number(level) + 1, 6)}>`
    );
}
