import publicStaticPages from "#lib/content/agent-pages.json";
import { type GuideArea, guideInfo } from "#lib/documentation-navigation.js";

type NavigationLink = { label: string; href: string };

export const mainLinks: NavigationLink[] = [
    { label: "Privacy Matters", href: "/privacy-matters" },
    { label: "Contribute", href: "/contribute" },
    { label: "Blog", href: "/blog" },
];
export const moreLinks: NavigationLink[] = [
    ...Object.values(guideInfo).map(({ title, path }) => ({ label: title, href: path })),
    { label: "FAQ", href: "/faq" },
];
export const legalLinks: NavigationLink[] = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Canary", href: "/canary" },
];
export const downloadLink: NavigationLink = { label: "Download", href: "/download" };
export const moreMenuLinks = [...moreLinks, ...legalLinks];
const pageLinks = [...mainLinks, ...moreMenuLinks, downloadLink];

/** Match a destination and its descendants without matching unrelated path prefixes. */
export function isActiveDestination(pathname: string, href: string) {
    if (
        href === "/docs" &&
        (pathname.startsWith("/docs/mdk/") || pathname.startsWith("/docs/marmot/"))
    )
        return false;
    return (
        pathname === href ||
        pathname.startsWith(`${href}/`) ||
        (href === guideInfo.builders.path && pathname.startsWith("/docs/mdk/")) ||
        (href === guideInfo.marmot.path && pathname.startsWith("/docs/marmot/"))
    );
}

export function currentPageLabel(pathname: string) {
    return (
        pageLinks
            .filter((link) => isActiveDestination(pathname, link.href))
            .sort((a, b) => b.href.length - a.href.length)[0]?.label ??
        (pathname === "/" ? "Home" : pathname === "/design-system" ? "Design system" : "")
    );
}

/** Only self-contained guide pages mount a section navigation. */
export function currentGuideArea(pathname: string): GuideArea | undefined {
    return (Object.keys(guideInfo) as GuideArea[]).find(
        (area) =>
            guideInfo[area].path === pathname ||
            (area === "documentation" &&
                publicStaticPages.includes(pathname) &&
                pathname.startsWith("/docs/") &&
                !pathname.startsWith("/docs/mdk/") &&
                !pathname.startsWith("/docs/marmot/"))
    );
}
