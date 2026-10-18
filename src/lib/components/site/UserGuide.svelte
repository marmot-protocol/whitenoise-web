<script lang="ts">
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
        <nav aria-label="Guide breadcrumb"><p><TextLink href="/docs">All guides</TextLink>{#if document.platform !== "shared"} · <span class="type-ui">{document.platform === "ios" ? "iOS" : "Android"}</span>{/if}{#if document.counterpart} · <TextLink href={document.counterpart.url} ariaLabel={`Read this guide for ${document.counterpart.platform === "ios" ? "iOS" : "Android"}`}>{document.counterpart.platform === "ios" ? "iOS" : "Android"}</TextLink>{/if}</p></nav>
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
            <section aria-labelledby="documentation-evidence"><h2 id="documentation-evidence">About this guide</h2><p>Checked on <time datetime={document.checkedAt}>{document.checkedAt}</time> against {document.platform === "shared" ? "the referenced sources" : document.platform === "ios" ? "iOS source" : "Android source"}. See <a href="/docs/compatibility">versions and verification</a> for the baseline and testing limits.</p>
                <ul>{#each document.sources as source}<li><a href={source} aria-label={source.replace("https://github.com/marmot-protocol/", "").replace(/\/blob\/[a-f0-9]{40}\//, " / ")}>{source.split("/").at(-1)}</a></li>{/each}</ul>
            </section>
        </article>
    </div>
    <GuideNavigation area="documentation" />
</div>
