<script lang="ts">
import Action from "$lib/components/system/Action.svelte";
import Text from "$lib/components/system/Text.svelte";
import type { PageData } from "./$types";

let { data }: { data: PageData } = $props();
let query = $state("");
let platform = $state("android");
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
const matches = $derived(
    data.pages.filter(
        (page) =>
            (platform === "all" || page.platform === "shared" || page.platform === platform) &&
            `${page.title} ${page.description} ${searchText[page.slug] ?? ""}`
                .toLocaleLowerCase()
                .includes(query.trim().toLocaleLowerCase())
    )
);
</script>

<svelte:head>
    <title>Documentation — White Noise</title>
    <meta name="description" content="Guides for using White Noise on Android or iOS, with help for settings and connected agents." />
    <link rel="canonical" href="https://www.whitenoise.chat/docs" />
</svelte:head>
<div class="site-width">
    <header class="docs-hub-header"><Text as="h1" role="display">Guides</Text></header>
    <div class="technical-content">
        <form class="docs-hub-search" role="search" onsubmit={(event) => event.preventDefault()}>
            <input aria-label="Find a guide" id="docs-search" class="wn-button secondary" type="search" bind:value={query} oninput={(event) => loadSearch(event.currentTarget.value)} placeholder="Find a guide" />
            <select aria-label="Platform" class="wn-button secondary" id="docs-platform" bind:value={platform}><option value="all">All platforms</option><option value="android">Android</option><option value="ios">iOS</option></select>
        </form>
        <p class="docs-hub-results type-small" role="status" aria-live="polite">{matches.length} {matches.length === 1 ? "guide" : "guides"}{#if searchState === "loading"} · Loading full-text search{/if}{#if searchState === "ready"} · Full-text search ready.{/if}{#if searchState === "error"} · Searching titles and summaries. Full-text search is unavailable.{/if}</p>
        {#if searchState === "error"}<button type="button" class="wn-button secondary" onclick={() => { searchState = "idle"; loadSearch(query); }}>Retry full-text search</button>{/if}
        {#if matches.length === 0}<p>Try a shorter search, or choose All platforms.</p>{/if}
        <div class="documentation-body">
        {#each groups as [category, title]}
                <section id={category} aria-labelledby={`${category}-title`}>
                    <h2 id={`${category}-title`}>{title}</h2>
                    {#if matches.some((page) => page.category === category)}
                    <ul class="docs-hub-list">{#each matches.filter((page) => page.category === category) as page}<li><Action href={page.url} label={`${page.title}${platform === "all" && page.platform !== "shared" ? ` (${page.platform === "ios" ? "iOS" : "Android"})` : ""}`} variant="secondary" icon="right" /><p class="type-small">{page.description}</p></li>{/each}</ul>
                    {:else}<p>No matching guides in this section.</p>{/if}
                </section>
        {/each}
        <p><a href="/docs/compatibility">Versions and compatibility</a></p>
        </div>
    </div>
</div>
