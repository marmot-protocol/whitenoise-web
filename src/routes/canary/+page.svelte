<script lang="ts">
import JsonLd from "$lib/components/JsonLd.svelte";
import PageIntro from "$lib/components/site/PageIntro.svelte";
import Surface from "$lib/components/system/Surface.svelte";
import TextLink from "$lib/components/system/TextLink.svelte";
import type { PageData } from "./$types";

let { data }: { data: PageData } = $props();

function formatDate(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    });
}

const pastAttestations = $derived(data.attestations.slice(1));
const latestAttestation = $derived(data.attestations[0] || null);
const latestTimestamp = $derived(
    latestAttestation ? (latestAttestation.publishedAt ?? latestAttestation.createdAt) : null
);

const canarySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "White Noise Canary",
    description:
        "Warrant canary and transparency statement for White Noise and the Internet Privacy Foundation.",
    url: "https://www.whitenoise.chat/canary",
    inLanguage: "en",
    publisher: {
        "@type": "Organization",
        name: "Internet Privacy Foundation",
        url: "https://ipf.dev",
    },
};
</script>

<svelte:head>
    <title>Canary | White Noise</title>
    <link rel="canonical" href="https://www.whitenoise.chat/canary" />
    <meta
        name="description"
        content="Warrant canary and transparency statement for White Noise and the Internet Privacy Foundation."
    />
</svelte:head>

<JsonLd schema={canarySchema} />

<div class="site-width">
    <PageIntro
        title="White Noise Canary"
        description="This page serves as the Internet Privacy Foundation's regular transparency statement for White Noise. We intend to re-affirm this statement monthly."
    />
    <article class="article-body canary-body">
        <Surface class="canary-latest">
            <h2>
                Last re-affirmed:
                {#if latestTimestamp}
                    {formatDate(latestTimestamp)}
                {:else}
                    No published attestation yet
                {/if}
            </h2>
            {#if latestAttestation}
                <div>
                    {#each latestAttestation.content.split(/\n\s*\n/) as paragraph}
                        <p>{paragraph}</p>
                    {/each}
                </div>
            {:else}
                <div>
                    <p>
                        As of March 30, 2026, Internet Privacy Foundation has not received any
                        national security letters, FISA court orders, or gagged legal demands
                        requiring us to conceal their existence.
                    </p>
                    <p>
                        As of March 30, 2026, Internet Privacy Foundation has not been compelled to
                        install backdoors, weaken encryption, or modify White Noise to facilitate
                        surveillance.
                    </p>
                </div>
            {/if}
            {#if latestAttestation}
                <TextLink href={latestAttestation.url}

                    external>
                    View latest signed event
                </TextLink>
            {/if}
        </Surface>

        <section class="canary-note">
            <p>
                If this page is not updated on its expected cadence, readers should not draw any
                single conclusion from that fact alone. Delays can happen for ordinary operational
                reasons.
            </p>
        </section>

        <section>
            <h2>Past attestations</h2>
            {#if pastAttestations.length === 0}
                <p>No past attestations yet.</p>
            {:else}
                <div class="canary-attestations">
                    {#each pastAttestations as attestation}
                        <article class="canary-attestation">
                            <h3>{attestation.title}</h3>
                            <TextLink href={attestation.url}

                                external

                                ariaLabel={`View signed event: ${attestation.title}`}>View signed event</TextLink>
                        </article>
                    {/each}
                </div>
            {/if}
        </section>
    </article>
</div>
