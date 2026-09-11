<script lang="ts">
import DocumentationLayout from "$lib/components/rebuild/DocumentationLayout.svelte";
import PageIntro from "$lib/components/rebuild/PageIntro.svelte";
import Grid from "$lib/components/system/Grid.svelte";
import Icon from "$lib/components/system/Icon.svelte";
import Text from "$lib/components/system/Text.svelte";
import TextLink from "$lib/components/system/TextLink.svelte";
import { repositoryGroups } from "$lib/documentation";
import { type GuideArea, guideInfo } from "$lib/documentation-navigation";

let { area, document }: { area: GuideArea; document: { title: string; html: string } } = $props();
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
        {@html document.html}
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
