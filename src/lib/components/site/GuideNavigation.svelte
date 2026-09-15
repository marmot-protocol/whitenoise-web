<script lang="ts">
import { afterNavigate } from "$app/navigation";
import { page } from "$app/state";
import Icon from "$lib/components/system/Icon.svelte";
import { breakpoints } from "$lib/design-system/runtime";
import {
    activeGuide,
    type GuideArea,
    guideAtPosition,
    guideInfo,
    guideLinks,
} from "$lib/documentation-navigation";

let {
    area,
    compact = false,
    onopen,
}: { area: GuideArea; compact?: boolean; onopen?: () => void } = $props();
let open = $state(false);
let menu = $state<HTMLDetailsElement>();
let trigger = $state<HTMLElement>();
afterNavigate(() => {
    open = false;
});
function dismiss(event: MouseEvent | FocusEvent) {
    if (open && menu && !event.composedPath().includes(menu)) open = false;
}
function escapeMenu(event: KeyboardEvent) {
    if (event.key === "Escape" && open) {
        open = false;
        trigger?.focus();
    }
}
function resize() {
    if (window.innerWidth > breakpoints.tablet) open = false;
}
const links = $derived(guideLinks[area]);
const navigationLabel = $derived(guideInfo[area].navigationLabel);
let scrolledGuide = $state<string>();
const selected = $derived(scrolledGuide ?? activeGuide(area, page.url.pathname, page.url.hash));
let sidebar = $state<HTMLElement>();
$effect(() => {
    const pathname = page.url.pathname;
    scrolledGuide = undefined;
    if (pathname !== guideInfo[area].path) return;
    const targets = links.flatMap(({ id }) => {
        const element = window.document.getElementById(id);
        return element ? [{ id, element }] : [];
    });
    if (!targets.length) return;
    let frame = 0;
    const update = () => {
        const compactViewport = window.innerWidth <= breakpoints.tablet;
        if (compact !== compactViewport) return;
        const sections = targets
            .map(({ id, element }) => ({
                id,
                top: Math.round(element.getBoundingClientRect().top),
            }))
            .sort((a, b) => a.top - b.top);
        const readingLine = compact
            ? Number.parseFloat(getComputedStyle(window.document.documentElement).scrollPaddingTop)
            : Number.parseFloat(sidebar ? getComputedStyle(sidebar).top : "0");
        scrolledGuide = guideAtPosition(sections, Math.round(readingLine));
    };
    const schedule = () => {
        cancelAnimationFrame(frame);
        // Both presentations exist in the DOM; only the visible one tracks scrolling.
        const compactViewport = window.innerWidth <= breakpoints.tablet;
        if (compact !== compactViewport) return;
        frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    const content = window.document.querySelector(".docs-main");
    if (content) observer.observe(content);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    schedule();
    return () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        window.removeEventListener("scroll", schedule);
        window.removeEventListener("resize", schedule);
        window.removeEventListener("hashchange", schedule);
    };
});
const currentLabel = $derived(links.find((link) => link.id === selected)?.label ?? links[0].label);
</script>

<svelte:window onkeydown={escapeMenu} onclick={dismiss} onfocusin={dismiss} onresize={resize} />
{#if compact}
    <details class="compact-guide-nav nav-more" bind:this={menu} bind:open={open}>
        <summary class="site-width type-ui" bind:this={trigger} aria-label={`${navigationLabel}: ${currentLabel}`} onclick={() => onopen?.()}>
            <span>{currentLabel}</span><Icon name="chevron" />
        </summary>
        <nav class="nav-more-links guide-menu-links" aria-label={navigationLabel}>
            {#each links as link}
                <a class="site-width type-ui" href={link.href} aria-current={link.id === selected ? "location" : undefined} onclick={() => { open = false; trigger?.focus(); }}>{link.label}</a>
            {/each}
        </nav>
    </details>
{:else}
    <aside class="guide-sidebar" bind:this={sidebar}>
        <p class="guide-sidebar-title type-ui">{guideInfo[area].title}</p>
        <nav aria-label={navigationLabel}>
            {#each links as link}
                <a class="type-ui" href={link.href} aria-current={link.id === selected ? (link.href.includes("#") ? "location" : "page") : undefined}>{link.label}</a>
            {/each}
        </nav>
    </aside>
{/if}
