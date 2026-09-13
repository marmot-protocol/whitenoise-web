<script lang="ts">
import { afterNavigate } from "$app/navigation";
import { page } from "$app/state";
import GuideNavigation from "$lib/components/site/GuideNavigation.svelte";
import Icon from "$lib/components/system/Icon.svelte";
import { breakpoints } from "$lib/design-system/runtime";
import {
    currentGuideArea,
    currentPageLabel,
    downloadLink,
    isActiveDestination,
    legalLinks,
    mainLinks,
    mobileLinkGroups,
    moreLinks,
    moreMenuLinks,
} from "$lib/navigation";

let open = $state(false);
let moreOpen = $state(false);
let menuButton: HTMLButtonElement;
let moreMenu: HTMLDetailsElement;
let moreSummary: HTMLElement;
let headerElement: HTMLElement;
const active = (href: string) => isActiveDestination(page.url.pathname, href);
const activeMoreLink = $derived(moreMenuLinks.find((link) => active(link.href)));
const pageLabel = $derived(currentPageLabel(page.url.pathname));
const guideArea = $derived(currentGuideArea(page.url.pathname));

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
            {#each mainLinks as link}
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
            <a href={downloadLink.href} aria-current={active(downloadLink.href) ? "page" : undefined}>{downloadLink.label}</a>
        </nav>
        <div class="compact-header-actions">
        <span class="compact-page-name type-ui">{pageLabel}</span>
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
        {#each mobileLinkGroups as group, index}
            {#if index > 0}<hr class="nav-divider" />{/if}
            {#each group as link}
                <a href={link.href} aria-current={active(link.href) ? "page" : undefined}>{link.label}</a>
            {/each}
        {/each}
    </nav>
    </div>
    {#if guideArea}<GuideNavigation area={guideArea} compact onopen={closeMenu} />{/if}
</header>
