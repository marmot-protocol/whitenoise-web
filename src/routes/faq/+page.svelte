<script lang="ts">
import JsonLd from "$lib/components/JsonLd.svelte";
import PageIntro from "$lib/components/rebuild/PageIntro.svelte";
import Disclosure from "$lib/components/system/Disclosure.svelte";
import Text from "$lib/components/system/Text.svelte";
import TextLink from "$lib/components/system/TextLink.svelte";
import { faqGroups, faqSchema } from "$lib/content/homepage";
</script>

<svelte:head>
    <title>Frequently asked questions — White Noise</title>
    <meta name="description" content="Answers about getting started with White Noise, privacy, identity, groups, relays, and connected agents." />
    <link rel="canonical" href="https://www.whitenoise.chat/faq" />
</svelte:head>
<JsonLd schema={faqSchema(faqGroups.flatMap((group) => group.items))} />
<div class="site-width faq-page">
    <PageIntro title="Frequently asked questions." description="Getting started, keeping conversations private, and making White Noise your own." />
    <div class="faq-groups">
        {#each faqGroups as group}
            <section class="faq-group" id={`faq-${group.id}`} aria-labelledby={`faq-heading-${group.id}`}>
                <div id={`faq-heading-${group.id}`}><Text as="h2" role="heading">{group.title}</Text></div>
                <div class="faq-items">
                    {#each group.items as faq}
                        <Disclosure title={faq.question}>
                            <p>{faq.answer}</p>
                            {#if faq.link}<TextLink href={faq.link.href} external={faq.link.external}>{faq.link.label}</TextLink>{/if}
                        </Disclosure>
                    {/each}
                </div>
            </section>
        {/each}
    </div>
</div>
