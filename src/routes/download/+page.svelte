<script lang="ts">
import JsonLd from "#lib/components/JsonLd.svelte";
import Artwork from "#lib/components/site/Artwork.svelte";
import PageIntro from "#lib/components/site/PageIntro.svelte";
import Action from "#lib/components/system/Action.svelte";
import Grid from "#lib/components/system/Grid.svelte";
import TextLink from "#lib/components/system/TextLink.svelte";

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
        description: "Get White Noise for iPhone from the App Store.",
        downloads: [
            {
                label: "App Store",
                href: "https://apps.apple.com/app/id6773000993",
            },
        ],
    },
    {
        name: "Android",
        description: "Get White Noise from Zapstore, Google Play or GitHub.",
        downloads: [
            {
                label: "Zapstore",
                href: "https://zapstore.dev/apps/dev.ipf.whitenoise.android",
            },
            {
                label: "Google Play",
                href: "https://play.google.com/store/apps/details?id=dev.ipf.whitenoise.android",
                variant: "secondary",
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
    isAccessibleForFree: true,
};
</script>

<svelte:head>
    <title>Download — White Noise</title>
    <link rel="canonical" href="https://www.whitenoise.chat/download" />
    <meta name="description" content="Download White Noise for iPhone and Android." />
</svelte:head>

<JsonLd {schema} />
<div class="site-width">
    <PageIntro
        title="Download White Noise"
        description="Get White Noise for iPhone or Android. Choose your download below."
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
                White Noise is open source and still growing. Try it, explore it, and help us make
                it better. If something feels off, we’d like to hear about it.
            </p>
            <TextLink href="/contribute">Share feedback or get involved</TextLink>
        </div>
        <Artwork name="smith-chain" />
    </section>
</div>
