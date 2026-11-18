// Shared page metadata for search engines, link previews and agents.
export const SITE_ORIGIN = "https://www.whitenoise.chat";
export const SITE_NAME = "White Noise";

export const DEFAULT_SOCIAL_IMAGE = {
    url: `${SITE_ORIGIN}/images/og_preview@1x.png`,
    width: 1200,
    height: 630,
    alt: "White Noise, a private messenger",
} as const;

const TITLE_SEPARATOR = " — ";

/** The absolute canonical URL for a site path; only root-relative paths are accepted. */
export function canonicalUrl(path: string): string {
    if (!path.startsWith("/") || path.startsWith("//")) {
        throw new Error(`Canonical paths must be root-relative: ${path}`);
    }
    return new URL(path, SITE_ORIGIN).toString();
}

/** A document title with the site suffix. An empty site leaves the title as given. */
export function pageTitle(title: string, site: string = SITE_NAME): string {
    return site ? `${title}${TITLE_SEPARATOR}${site}` : title;
}

const platformNames = { android: "Android", ios: "iOS" } as const;

/**
 * Platform guides share their visible heading with their counterpart, so the document title
 * names the platform to keep each URL distinct in search results.
 */
export function guideTitle(page: { title: string; platform: string }): string {
    const name = platformNames[page.platform as keyof typeof platformNames];
    if (!name || new RegExp(`\\b${name}\\b`, "i").test(page.title)) return page.title;
    return `${page.title} on ${name}`;
}

const PUBLISHER = {
    "@type": "Organization",
    name: "Internet Privacy Foundation",
    url: "https://ipf.dev",
} as const;

/** Schema.org breadcrumbs from the site root to the current page. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: canonicalUrl(item.path),
        })),
    };
}

/** Schema.org description of a how-to or reference guide. */
export function guideSchema(guide: { title: string; description: string; path: string }) {
    return {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: guide.title,
        description: guide.description,
        url: canonicalUrl(guide.path),
        inLanguage: "en",
        isAccessibleForFree: true,
        publisher: PUBLISHER,
        about: { "@type": "SoftwareApplication", name: SITE_NAME, url: `${SITE_ORIGIN}/` },
    };
}
