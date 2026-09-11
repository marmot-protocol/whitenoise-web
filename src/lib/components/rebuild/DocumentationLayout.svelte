<script lang="ts">
import type { Snippet } from "svelte";
import { goto } from "$app/navigation";
import { page } from "$app/state";
import {
    activeGuide,
    type GuideArea,
    guideAtPosition,
    guideInfo,
    guideLinks,
} from "$lib/documentation-navigation";

let { area, children }: { area: GuideArea; children: Snippet } = $props();
const links = $derived(guideLinks[area]);
const navigationLabel = $derived(guideInfo[area].navigationLabel);
let scrolledGuide = $state<string>();
const selected = $derived(scrolledGuide ?? activeGuide(area, page.url.pathname, page.url.hash));
let sidebar: HTMLElement;
$effect(() => {
    const pathname = page.url.pathname;
    const localLinks = links.filter((link) => link.href.split("#")[0] === pathname);
    scrolledGuide = undefined;
    if (!localLinks.some((link) => link.href.includes("#"))) return;
    let frame = 0;
    const update = () => {
        const sections = localLinks
            .flatMap((link) => {
                const target = window.document.getElementById(
                    link.href.split("#")[1] || "getting-started"
                );
                return target ? [{ id: link.id, top: target.getBoundingClientRect().top }] : [];
            })
            .sort((a, b) => a.top - b.top);
        const readingLine = Number.parseFloat(getComputedStyle(sidebar).top);
        scrolledGuide = guideAtPosition(sections, readingLine);
    };
    const schedule = () => {
        cancelAnimationFrame(frame);
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
const currentHref = $derived(links.find((link) => link.id === selected)?.href);
</script>

<div class="site-width docs-layout">
    <div class="guide-selector">
        <label class="type-ui" for="guide-selector">{navigationLabel}</label>
        <select id="guide-selector" class="type-ui" value={currentHref} onchange={(event) => goto(event.currentTarget.value)}>
            {#each links as link}<option value={link.href}>{link.label}</option>{/each}
        </select>
    </div>
    <div class="docs-main">
        {@render children()}
    </div>
    <aside class="guide-sidebar" bind:this={sidebar}>
        <p class="guide-sidebar-title type-ui">{guideInfo[area].title}</p>
        <nav aria-label={navigationLabel}>
            {#each links as link}
                <a class="type-ui" href={link.href} aria-current={link.id === selected ? (link.href.includes("#") ? "location" : "page") : undefined}>{link.label}</a>
            {/each}
        </nav>
    </aside>
</div>
