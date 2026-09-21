<script lang="ts">
import JsonLd from "$lib/components/JsonLd.svelte";
import Artwork from "$lib/components/site/Artwork.svelte";
import PageIntro from "$lib/components/site/PageIntro.svelte";
import Action from "$lib/components/system/Action.svelte";
import Grid from "$lib/components/system/Grid.svelte";
import TextLink from "$lib/components/system/TextLink.svelte";

const options: {
    name: string;
    description: string;
    downloads: {
        label: string;
        href: string;
        variant?: "primary" | "secondary";
    }[];
}[] = [
    {
        name: "iPhone",
        description: "Get the beta app for iPhone through TestFlight.",
        downloads: [
            {
                label: "TestFlight",
                href: "https://testflight.apple.com/join/KrVBcjpA",
            },
        ],
    },
    {
        name: "Android",
        description: "Get White Noise from Zapstore or GitHub.",
        downloads: [
            {
                label: "Zapstore",
                href: "https://zapstore.dev/apps/dev.ipf.whitenoise.android",
            },
            {
                label: "GitHub Release",
                href: "https://github.com/marmot-protocol/whitenoise-android/releases/latest",
                variant: "secondary",
            },
        ],
    },
];

const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "White Noise",
    applicationCategory: "CommunicationApplication",
    operatingSystem: ["iOS", "Android"],
    description: "Download the White Noise private messenger for iPhone and Android.",
    url: "https://www.whitenoise.chat/download",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    downloadUrl: options.flatMap(({ downloads }) => downloads.map(({ href }) => href)),
    softwareVersion: "beta",
    isAccessibleForFree: true,
};
</script>

<svelte:head>
    <title>Download — White Noise</title>
    <link rel="canonical" href="https://www.whitenoise.chat/download" />
    <meta name="description" content="Download the White Noise beta for iPhone and Android." />
</svelte:head>

<JsonLd {schema} />
<div class="site-width">
    <PageIntro
        title="Download White Noise"
        description="Get the White Noise beta for iPhone or Android. Choose your download below."
    />
    <Grid columns={2} class="download-options">
        {#each options as option}
            <section class="download-option">
                <h2>{option.name}</h2>
                <p>{option.description}</p>
                <div class="download-actions">
                    {#each option.downloads as download}
                        <Action
                            external
                            href={download.href}
                            label={download.label}
                            variant={download.variant}
                            icon="down"
                        />
                    {/each}
                </div>
            </section>
        {/each}
    </Grid>
    <section class="download-help">
        <div>
            <h2>A work in progress.<br />With you in it.</h2>
            <p>
                White Noise is in beta. Try it, explore it, and help us make it better. If something
                feels off, we’d like to hear about it.
            </p>
            <TextLink href="/contribute">Share feedback or get involved</TextLink>
        </div>
        <Artwork name="smith-chain" />
    </section>
</div>
