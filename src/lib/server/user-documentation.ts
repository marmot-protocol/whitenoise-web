import { error } from "@sveltejs/kit";
import baseline from "$lib/content/documentation-baseline.json";
import captures from "$lib/content/documentation-captures.json";
import content from "$lib/content/user-documentation.json";
import { renderDocumentation } from "./docs-markdown";

export type Platform = "android" | "ios" | "linux" | "shared";
export type DocumentationPage = {
    slug: string;
    title: string;
    description: string;
    category: string;
    platform: Platform;
    markdown: string;
    sources: string[];
};

const markdownSources = import.meta.glob("/src/lib/content/docs/**/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
});
export const documentationPages: DocumentationPage[] = (
    content as Omit<DocumentationPage, "markdown">[]
).map((page) => ({
    ...page,
    markdown: markdownSources[`/src/lib/content/docs/${page.slug}.md`] as string,
}));
const bySlug = new Map(documentationPages.map((page) => [page.slug, page]));
const platformLabels = { android: "Android", ios: "iOS", linux: "Linux", shared: "All platforms" };
export function documentationApplicability(page: Pick<DocumentationPage, "category" | "platform">) {
    if (page.category === "agents") return baseline.connector;
    if (page.category === "build") return baseline.development;
    return page.platform === "shared"
        ? { android: baseline.android, ios: baseline.ios, linux: baseline.linux }
        : baseline[page.platform];
}
export function documentationEvidence(page: Pick<DocumentationPage, "platform">) {
    return page.platform === "shared" ? "source-reviewed" : baseline[page.platform].evidence;
}
const pageIndex = documentationPages.map(({ markdown, ...page }) => ({
    ...page,
    platformLabel: platformLabels[page.platform],
    url: `/docs/${page.slug}`,
    searchText: markdown.replace(/[#*_`>|[\]]/g, " "),
    applicability: documentationApplicability(page),
    evidence: documentationEvidence(page),
}));

export function documentationIndex() {
    return pageIndex;
}

export function documentationPage(slug: string) {
    const page = bySlug.get(slug);
    if (!page) error(404, "Documentation not found");
    const { markdown, ...metadata } = page;
    const rendered = renderDocumentation(markdown);
    const platforms =
        page.platform === "shared"
            ? []
            : (["android", "ios", "linux"] as const).flatMap((platform) => {
                  const variant = bySlug.get(
                      slug.replace(/\/(android|ios|linux)(?=\/|$)/, `/${platform}`)
                  );
                  return variant
                      ? [
                            {
                                url: `/docs/${variant.slug}`,
                                platform,
                                label: platformLabels[platform],
                            },
                        ]
                      : [];
              });
    const onboarding = [
        `get-started/install/${page.platform}`,
        `get-started/first-message/${page.platform}`,
        `using/recovery/${page.platform}`,
    ];
    const sequence = onboarding.includes(slug)
        ? onboarding
        : documentationPages
              .filter(
                  (item) =>
                      item.category === page.category &&
                      (item.platform === page.platform || item.platform === "shared")
              )
              .map((item) => item.slug);
    const position = sequence.indexOf(slug);
    const readingLink = (target: string | undefined) => {
        const item = target ? bySlug.get(target) : undefined;
        return item ? { title: item.title, url: `/docs/${item.slug}` } : null;
    };
    return {
        ...metadata,
        previous: readingLink(position > 0 ? sequence[position - 1] : undefined),
        next: readingLink(position >= 0 ? sequence[position + 1] : undefined),
        checkedAt: baseline.checkedAt,
        html: rendered.html,
        headings: rendered.headings,
        captures: captures.filter((capture) => capture.guides.includes(page.slug)),
        platforms,
    };
}
