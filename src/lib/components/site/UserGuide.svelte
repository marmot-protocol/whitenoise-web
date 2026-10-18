<script lang="ts">
import { goto } from "$app/navigation";
import GuideNavigation from "$lib/components/site/GuideNavigation.svelte";
import PageIntro from "$lib/components/site/PageIntro.svelte";
import Grid from "$lib/components/system/Grid.svelte";
import TextLink from "$lib/components/system/TextLink.svelte";
import type { documentationPage } from "$lib/server/user-documentation";

let { document }: { document: ReturnType<typeof documentationPage> } = $props();
</script>

<svelte:head>
    <title>{document.title} — White Noise</title>
    <meta name="description" content={document.description} />
    <link rel="canonical" href={`https://www.whitenoise.chat/docs/${document.slug}`} />
</svelte:head>
<div class="site-width docs-layout">
    <div class="docs-main">
        <nav class="docs-guide-tools" aria-label="Guide navigation">
            <TextLink href="/docs">All guides</TextLink>
            {#if document.counterpart}
                <select class="wn-button secondary" aria-label="Guide platform" value={`/docs/${document.slug}`} onchange={(event) => goto(event.currentTarget.value)}>
                    <option value={document.platform === "android" ? `/docs/${document.slug}` : document.counterpart.url}>Android</option>
                    <option value={document.platform === "ios" ? `/docs/${document.slug}` : document.counterpart.url}>iOS</option>
                </select>
                <noscript><a href={document.counterpart.url}>Read this guide for {document.counterpart.platform === "ios" ? "iOS" : "Android"}</a></noscript>
            {/if}
        </nav>
        <PageIntro title={document.title} description={document.description} />
        <article class="technical-content documentation-body">
            {@html document.html}
            {#if document.captures.length}
                <section aria-labelledby="documentation-screen-reference">
                    <h2 id="documentation-screen-reference">Screen reference</h2>
                    <Grid>
                        {#each document.captures as capture}
                            <figure>
                                <a href={capture.url} aria-label={`Enlarge Android ${capture.id.replaceAll("-", " ")} screenshot`}><img src={capture.url} alt={`White Noise Android ${capture.id.replaceAll("-", " ")} screen with synthetic profiles`} loading="lazy" width={capture.dimensions.width} height={capture.dimensions.height} /></a>
                                <figcaption class="type-caption">{capture.id.replaceAll("-", " ")} · {capture.build}. Select to enlarge.</figcaption>
                            </figure>
                        {/each}
                    </Grid>
                    <p>Captured from the CI preview with synthetic accounts. These captures establish the visible interface; delivery qualification is separate. <a href="/docs/captures.json">Capture details</a>.</p>
                </section>
            {/if}
            {#if document.platform === "ios"}
                <section aria-labelledby="documentation-illustrations"><h2 id="documentation-illustrations">Illustrations</h2><p>iOS screenshots are pending. These instructions can be read on their own. <a href="https://github.com/marmot-protocol/whitenoise-web/issues/14">Follow the screenshot work</a>.</p></section>
            {/if}

        </article>
    </div>
    <GuideNavigation area="documentation" />
</div>
