import { type GuideArea, guideInfo } from "$lib/documentation-navigation";

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
export const moreMenuLinks = [...moreLinks, ...legalLinks];
const pageLinks = [...mainLinks, ...moreMenuLinks];

/** Match a destination and its descendants without matching unrelated path prefixes. */
export function isActiveDestination(pathname: string, href: string) {
    return (
        pathname === href ||
        pathname.startsWith(`${href}/`) ||
        (href === guideInfo.builders.path && pathname.startsWith("/docs/mdk/")) ||
        (href === guideInfo.marmot.path && pathname.startsWith("/docs/marmot/"))
    );
}

export function currentPageLabel(pathname: string) {
    return (
        pageLinks.find((link) => isActiveDestination(pathname, link.href))?.label ??
        (pathname === "/" ? "Home" : pathname === "/design-system" ? "Design system" : "")
    );
}

/** Only self-contained guide pages mount a section navigation. */
export function currentGuideArea(pathname: string): GuideArea | undefined {
    return (Object.keys(guideInfo) as GuideArea[]).find(
        (area) => guideInfo[area].path === pathname
    );
}
