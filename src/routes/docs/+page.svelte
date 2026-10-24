<script lang="ts">
import { onMount, tick } from "svelte";
import Icon from "#lib/components/system/Icon.svelte";
import Text from "#lib/components/system/Text.svelte";
import { guideFilters, guideIndexUrl, withGuideContext } from "#lib/documentation-browsing.js";
import { replaceState } from "$app/navigation";
import { page as currentPage } from "$app/state";
import type { PageData } from "./$types";

let { data }: { data: PageData } = $props();
let hydrated = $state(false);
onMount(() => {
    hydrated = true;
});
const filters = $derived(
    hydrated
        ? (currentPage.state.guideFilters ?? guideFilters(currentPage.url))
        : { platform: "android", query: "" }
);
const query = $derived(filters.query);
const platform = $derived(filters.platform);
function setFilters(selected: string, value: string) {
    replaceState(guideIndexUrl(selected, value), {
        ...currentPage.state,
        guideFilters: { platform: selected, query: value },
    });
}
$effect(() => {
    void loadSearch(query);
});
let restoredHash = "";
$effect(() => {
    const hash = currentPage.state.guideFilters ? "" : currentPage.url.hash;
    const ready = searchState;
    if (!hash) {
        restoredHash = "";
        return;
    }
    if (hash !== restoredHash && ready !== "loading") {
        void tick().then(() => {
            const target = document.getElementById(hash.slice(1));
            if (target) {
                target.scrollIntoView();
                restoredHash = hash;
            }
        });
    }
});
let searchText = $state<Record<string, string>>({});
let searchState = $state<"idle" | "loading" | "ready" | "error">("idle");
async function loadSearch(value: string) {
    if (
        !value.trim() ||
        searchState === "loading" ||
        searchState === "ready" ||
        searchState === "error"
    )
        return;
    searchState = "loading";
    try {
        const response = await fetch("/docs/index.json", { signal: AbortSignal.timeout(8000) });
        if (!response.ok) throw new Error("Search index unavailable");
        const index = await response.json();
        searchText = Object.fromEntries(
            index.pages.map((page: { slug: string; searchText: string }) => [
                page.slug,
                page.searchText,
            ])
        );
        searchState = "ready";
    } catch {
        searchState = "error";
    }
}
const groups = [
    ["get-started", "Get started"],
    ["using", "Using White Noise"],
    ["settings", "Settings"],
    ["troubleshooting", "Troubleshooting"],
    ["agents", "Agents"],
    ["build", "Build"],
];
const eligible = $derived(
    data.pages.filter(
        (item) => platform === "all" || item.platform === "shared" || item.platform === platform
    )
);
const matches = $derived(
    eligible.filter((item) =>
        `${item.title} ${item.description}`
            .toLocaleLowerCase()
            .includes(query.trim().toLocaleLowerCase())
    )
);
const additionalMatches = $derived(
    query.trim() && searchState === "ready"
        ? eligible.filter(
              (item) =>
                  !matches.some((match) => match.slug === item.slug) &&
                  (searchText[item.slug] ?? "")
                      .toLocaleLowerCase()
                      .includes(query.trim().toLocaleLowerCase())
          )
        : []
);
const resultCount = $derived(matches.length + additionalMatches.length);
function destination(item: { url: string; slug: string }) {
    return withGuideContext(item.url, guideIndexUrl(platform, query, item.slug));
}
</script>

<svelte:head>
    <title>Documentation — White Noise</title>
    <meta name="description" content="Guides for using White Noise on Android or iOS, with help for settings and connected agents." />
    <link rel="canonical" href="https://www.whitenoise.chat/docs" />
</svelte:head>
<div class="site-width">
    <header class="docs-hub-header"><Text as="h1" role="display">Guides</Text><select aria-label="Platform" class="docs-platform-select type-ui" id="docs-platform" value={platform} onchange={(event) => setFilters(event.currentTarget.value, query)}><option value="all">All platforms</option><option value="android">Android</option><option value="ios">iOS</option></select></header>
    <div class="technical-content">
        <form class="docs-hub-search" role="search" onsubmit={(event) => event.preventDefault()}>
            <input aria-label="Find a guide" id="docs-search" class="docs-search-input type-small" type="search" value={query} oninput={(event) => setFilters(platform, event.currentTarget.value)} placeholder="Find a guide" />
        </form>
        <p class="docs-hub-results type-small">{#if query.trim()}{resultCount} {resultCount === 1 ? "guide" : "guides"}{/if}</p>
        {#if resultCount === 0 && searchState !== "loading"}<p>Try a shorter search, or choose All platforms.</p>{/if}
        <div class="documentation-body">
        {#each groups as [category, title]}
                <section id={category} aria-labelledby={`${category}-title`} hidden={!!query.trim() && !matches.some((item) => item.category === category)}>
                    <h2 id={`${category}-title`}>{title}</h2>
                    {#if matches.some((page) => page.category === category)}
                    <ul class="docs-hub-list">{#each matches.filter((page) => page.category === category) as page (page.slug)}<li id={`guide-${page.slug.replaceAll("/", "-")}`}><a class="docs-hub-row" href={destination(page)}><div><strong class="type-ui">{page.title}{platform === "all" && page.platform !== "shared" ? ` (${page.platform === "ios" ? "iOS" : "Android"})` : ""}</strong>{#if category === "get-started"}<p class="type-small">{page.description}</p>{/if}</div><Icon name="right" /></a></li>{/each}</ul>
                    {:else}<p>No matching guides in this section.</p>{/if}
                </section>
        {/each}
        {#if additionalMatches.length}<section aria-labelledby="more-results"><h2 id="more-results">More results</h2><ul class="docs-hub-list">{#each additionalMatches as item (item.slug)}<li id={`guide-${item.slug.replaceAll("/", "-")}`}><a class="docs-hub-row" href={destination(item)}><strong class="type-ui">{item.title}{platform === "all" && item.platform !== "shared" ? ` (${item.platform === "ios" ? "iOS" : "Android"})` : ""}</strong><Icon name="right" /></a></li>{/each}</ul></section>{/if}
        <p class="docs-hub-results type-small" role="status" aria-live="polite">{#if query.trim()}{#if searchState === "loading"}Loading full-text search{/if}{#if searchState === "ready"}Full-text search ready.{/if}{#if searchState === "error"}Searching titles and summaries. Full-text search is unavailable.{/if}{/if}</p>
        {#if searchState === "error" && query.trim()}<button type="button" class="wn-button secondary" onclick={() => { searchState = "idle"; loadSearch(query); }}>Retry full-text search</button>{/if}
        <p><a href="/docs/compatibility">Versions and compatibility</a></p>
        </div>
    </div>
</div>
