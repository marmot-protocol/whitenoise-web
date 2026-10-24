<script lang="ts">
import { onMount } from "svelte";
import GuideNavigation from "#lib/components/site/GuideNavigation.svelte";
import PageIntro from "#lib/components/site/PageIntro.svelte";
import TextLink from "#lib/components/system/TextLink.svelte";
import { guideReturnUrl, withGuideContext } from "#lib/documentation-browsing.js";
import type { documentationPage } from "#lib/server/user-documentation.js";
import { goto } from "$app/navigation";
import { page } from "$app/state";

let { document }: { document: ReturnType<typeof documentationPage> } = $props();
let hydrated = $state(false);
onMount(() => {
    hydrated = true;
});
const returnUrl = $derived(
    guideReturnUrl(hydrated ? page.url.searchParams.get("guides") : null, document.platform)
);
function switchPlatform(target: string) {
    const context = new URL(returnUrl, page.url.origin);
    context.searchParams.set("platform", target.includes("/ios") ? "ios" : "android");
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
            {#if document.counterpart}
                <select class="docs-platform-select type-ui" aria-label="Guide platform" value={`/docs/${document.slug}`} onchange={(event) => switchPlatform(event.currentTarget.value)}>
                    <option value={document.platform === "android" ? `/docs/${document.slug}` : document.counterpart.url}>Android</option>
                    <option value={document.platform === "ios" ? `/docs/${document.slug}` : document.counterpart.url}>iOS</option>
                </select>
                <noscript><a href={document.counterpart.url}>Read this guide for {document.counterpart.platform === "ios" ? "iOS" : "Android"}</a></noscript>
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
