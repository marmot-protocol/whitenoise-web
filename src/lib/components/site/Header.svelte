<script lang="ts">
import { afterNavigate } from "$app/navigation";
import { page } from "$app/state";
import GuideNavigation from "$lib/components/site/GuideNavigation.svelte";
import Icon from "$lib/components/system/Icon.svelte";
import { breakpoints } from "$lib/design-system/runtime";
import { guideInfo } from "$lib/documentation-navigation";

let open = $state(false);
let moreOpen = $state(false);
let menuButton: HTMLButtonElement;
let moreMenu: HTMLDetailsElement;
let moreSummary: HTMLElement;
let headerElement: HTMLElement;
const links = [
    { label: "Privacy Matters", href: "/privacy-matters" },
    { label: "Contribute", href: "/contribute" },
    { label: "Blog", href: "/blog" },
];
const moreLinks = [
    { label: "Agents", href: "/agents" },
    { label: "For developers", href: "/build" },
    { label: "Marmot Protocol", href: "/docs/marmot/README.md" },
    { label: "FAQ", href: "/faq" },
];
const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Canary", href: "/canary" },
];
const download = { label: "Download", href: "/download" };
const active = (href: string) =>
    page.url.pathname === href ||
    page.url.pathname.startsWith(`${href}/`) ||
    (href === "/build" && page.url.pathname.startsWith("/docs/mdk/")) ||
    (href === "/docs/marmot/README.md" && page.url.pathname.startsWith("/docs/marmot/"));
const activeMoreLink = $derived([...moreLinks, ...legalLinks].find((link) => active(link.href)));

const currentPageLabel = $derived(
    [...links, ...moreLinks, ...legalLinks, download].find((link) => active(link.href))?.label ??
        (page.url.pathname === "/"
            ? "Home"
            : page.url.pathname === "/design-system"
              ? "Design system"
              : "")
);
const currentGuideArea = $derived(
    page.url.pathname === guideInfo.agents.path
        ? "agents"
        : page.url.pathname === guideInfo.builders.path
          ? "builders"
          : page.url.pathname === guideInfo.marmot.path
            ? "marmot"
            : undefined
);

function closeMenu() {
    open = false;
    moreOpen = false;
}
afterNavigate(closeMenu);
function escapeMenu(event: KeyboardEvent) {
    if (event.key === "Escape" && moreOpen) {
        moreOpen = false;
        moreSummary?.focus();
    }
    if (event.key === "Escape" && open) {
        closeMenu();
        menuButton?.focus();
    }
}
function outsideMenu(event: MouseEvent | FocusEvent) {
    const path = event.composedPath();
    if (moreOpen && !path.includes(moreMenu)) moreOpen = false;
    if (open && !path.includes(headerElement)) closeMenu();
}
function resized() {
    if (window.innerWidth > breakpoints.tablet) closeMenu();
}
</script>

<svelte:window onkeydown={escapeMenu} onclick={outsideMenu} onfocusin={outsideMenu} onresize={resized} />
<header class="site-header" bind:this={headerElement}>
    <div class="header-inner site-width">
        <div class="header-logo-slot">
            <a class="header-logo" href="/" aria-label="White Noise home">
                <img src="/images/logomark.svg" alt="" width="48" height="37" />
            </a>
        </div>
        <nav class="desktop-nav" aria-label="Main navigation">
            {#each links as link}
                <a
                    href={link.href}
                    aria-current={active(link.href) ? "page" : undefined}
                    >{link.label}</a
                >
            {/each}
            <details class="nav-more" bind:this={moreMenu} bind:open={moreOpen}>
                <summary bind:this={moreSummary} class="type-ui" aria-current={activeMoreLink ? "true" : undefined}>{activeMoreLink ? `More / ${activeMoreLink.label}` : "More"}<Icon name="chevron" /></summary>
                <div class="nav-more-links">
                    {#each moreLinks as link}<a href={link.href} aria-current={active(link.href) ? "page" : undefined}>{link.label}</a>{/each}
                    <hr class="nav-divider" />
                    {#each legalLinks as link}<a href={link.href} aria-current={active(link.href) ? "page" : undefined}>{link.label}</a>{/each}
                </div>
            </details>
            <a href={download.href} aria-current={active(download.href) ? "page" : undefined}>{download.label}</a>
        </nav>
        <div class="compact-header-actions">
        <span class="compact-page-name type-ui">{currentPageLabel}</span>
        <button
            bind:this={menuButton}
            class="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onclick={() => (open = !open)}
        >
            {#if open}<Icon name="close" />{:else}<Icon name="menu" />{/if}
        </button>
        </div>
    <nav
        id="mobile-navigation"
        class="mobile-nav nav-more-links"
        hidden={!open}
        aria-label="Mobile navigation"
    >
        <a href="/" aria-current={page.url.pathname === "/" ? "page" : undefined}>Home</a>
        {#each [...links, ...moreLinks, ...legalLinks, download] as link, index}
            {#if index === links.length || index === links.length + moreLinks.length || index === links.length + moreLinks.length + legalLinks.length}
                <hr class="nav-divider" />
            {/if}
            <a
                href={link.href}
                aria-current={active(link.href) ? "page" : undefined}>{link.label}</a
            >
        {/each}
    </nav>
    </div>
    {#if currentGuideArea}<GuideNavigation area={currentGuideArea} compact onopen={closeMenu} />{/if}
</header>
