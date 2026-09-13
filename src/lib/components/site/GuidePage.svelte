<script lang="ts">
import DocumentationLayout from "$lib/components/site/DocumentationLayout.svelte";
import PageIntro from "$lib/components/site/PageIntro.svelte";
import CopyButton from "$lib/components/system/CopyButton.svelte";
import Grid from "$lib/components/system/Grid.svelte";
import Icon from "$lib/components/system/Icon.svelte";
import Text from "$lib/components/system/Text.svelte";
import TextLink from "$lib/components/system/TextLink.svelte";
import type { GuideDocument } from "$lib/content/guide";
import { repositoryGroups } from "$lib/documentation";
import { type GuideArea, guideInfo } from "$lib/documentation-navigation";

let {
    area,
    document,
}: {
    area: GuideArea;
    document: GuideDocument;
} = $props();
const info = $derived(guideInfo[area]);
</script>

<svelte:head>
    <title>{document.title} — White Noise</title>
    <meta name="description" content={info.description} />
    <link rel="canonical" href={`https://www.whitenoise.chat${info.path}`} />
</svelte:head>

<DocumentationLayout {area}>
    <PageIntro title={document.title} description={info.description} />
    <article class="technical-content documentation-body" aria-label={info.title}>
        {#if document.sections}
            {#each document.sections as section}
                <section>
                    {@html section.html}
                    {#if section.prompt}
                        <div class="agent-prompt">
                            <div class="agent-prompt-controls">
                                <span class="type-ui">Copy and paste into {section.name}</span>
                                <CopyButton value={section.prompt} label={`${section.name} setup prompt`} />
                            </div>
                            <pre class="agent-prompt-text" role="region" aria-label={`${section.name} setup prompt text`}><code>{section.prompt}</code></pre>
                        </div>
                    {/if}
                    {@html section.afterHtml}
                </section>
            {/each}
        {:else}
            {@html document.html}
        {/if}
    </article>
    {#if area === "builders"}
        <section class="repository-section" aria-labelledby="repositories-heading">
            <h2 id="repositories-heading" class="type-heading">Repositories</h2>
            <Grid class="repository-groups">
                {#each repositoryGroups as group}
                    <section aria-label={group.name}>
                        <Text as="h3" role="title">{group.name}</Text>
                        <div class="repository-list">
                            {#each group.repositories as repository}
                                <div>
                                    <TextLink href={repository.href} external><span>{repository.name}</span><Icon name="external" /></TextLink>
                                    <Text role="small" tone="muted">{repository.description}</Text>
                                </div>
                            {/each}
                        </div>
                    </section>
                {/each}
            </Grid>
        </section>
    {/if}
</DocumentationLayout>
