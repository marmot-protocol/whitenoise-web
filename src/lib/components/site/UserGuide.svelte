<script lang="ts">
import { onMount } from "svelte";
import { goto } from "$app/navigation";
import { page } from "$app/state";
import GuideNavigation from "$lib/components/site/GuideNavigation.svelte";
import PageIntro from "$lib/components/site/PageIntro.svelte";
import TextLink from "$lib/components/system/TextLink.svelte";
import { guideReturnUrl, withGuideContext } from "$lib/documentation-browsing";
import type { documentationPage } from "$lib/server/user-documentation";

let { document }: { document: ReturnType<typeof documentationPage> } = $props();
let hydrated = $state(false);
onMount(() => {
    hydrated = true;
});
const returnUrl = $derived(
    guideReturnUrl(hydrated ? page.url.searchParams.get("guides") : null, document.platform)
);
function switchPlatform(target: string) {
    const selected = document.platforms.find((variant) => variant.url === target);
    if (!selected) {
        return;
    }
    const context = new URL(returnUrl, page.url.origin);
    context.searchParams.set("platform", selected.platform);
    context.hash = `guide-${target.slice("/docs/".length).replaceAll("/", "-")}`;
    void goto(withGuideContext(target, context.pathname + context.search + context.hash));
}
</script>

<svelte:head>
    <title>{document.title} — White Noise</title>
    <meta name="description" content={document.description} />
    <link rel="canonical" href={`https://www.whitenoise.chat/docs/${document.slug}`} />
</svelte:head>
<div class="site-width docs-layout">
    <div class="docs-main">
        <nav class="docs-guide-tools" aria-label="Guide navigation">
            <TextLink href={returnUrl}>All guides</TextLink>
            {#if document.platforms.length > 1}
                <select class="docs-platform-select type-ui" aria-label="Guide platform" value={`/docs/${document.slug}`} onchange={(event) => switchPlatform(event.currentTarget.value)}>
                    {#each document.platforms as variant (variant.platform)}<option value={variant.url}>{variant.label}</option>{/each}
                </select>
                <noscript><ul>{#each document.platforms.filter((variant) => variant.platform !== document.platform) as variant (variant.platform)}<li><a href={variant.url}>Read this guide for {variant.label}</a></li>{/each}</ul></noscript>
            {/if}
        </nav>
        <PageIntro title={document.title} description={document.description} />
        <aside class="docs-inline-contents" aria-label="Page contents"><GuideNavigation area="documentation" compact /></aside>
        <article class="technical-content documentation-body">
            {@html document.html}

        {#if document.platform === "ios"}<p class="type-small">iOS screenshots are being prepared.</p>{/if}
        </article>
        {#if document.previous || document.next}<nav class="docs-reading-nav" aria-label="Continue reading">{#if document.previous}<TextLink href={withGuideContext(document.previous.url, returnUrl)}>Previous: {document.previous.title}</TextLink>{/if}{#if document.next}<TextLink href={withGuideContext(document.next.url, returnUrl)}>Next: {document.next.title}</TextLink>{/if}</nav>{/if}
    </div>
    <GuideNavigation area="documentation" />
</div>
