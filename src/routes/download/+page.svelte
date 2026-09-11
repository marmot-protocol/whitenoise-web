<script lang="ts">
import JsonLd from "$lib/components/JsonLd.svelte";
import Artwork from "$lib/components/rebuild/Artwork.svelte";
import PageIntro from "$lib/components/rebuild/PageIntro.svelte";
import Action from "$lib/components/system/Action.svelte";
import Grid from "$lib/components/system/Grid.svelte";
import TextLink from "$lib/components/system/TextLink.svelte";

const options: {
    name: string;
    description: string;
    downloads: { label: string; href?: string; variant?: "primary" | "secondary" }[];
}[] = [
    {
        name: "iPhone",
        description: "Get White Noise for your iPhone.",
        downloads: [{ label: "App Store" }],
    },
    {
        name: "Android",
        description: "Choose a store or download the APK directly.",
        downloads: [
            { label: "Google Play" },
            {
                label: "Zapstore",
                variant: "secondary",
                href: "https://zapstore.dev/apps/naddr1qq2k7un89ecxzunjv4ejuamgd96x2mn0d9ek2q3qwhtn0s68y3cs98zysa4nxrfzss5g5snhndv35tk5m2sudsr7ltmsxpqqqplqk7t8ewh",
            },
            {
                label: "Download APK",
                href: "https://ipf.dev/android/whitenoise-latest.apk",
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
    description: "Download the White Noise private messenger for iOS and Android.",
    url: "https://www.whitenoise.chat/download",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    downloadUrl: options.flatMap((option) =>
        option.downloads.flatMap(({ href }) => (href ? [href] : []))
    ),
};
</script>

<svelte:head
    ><title>Download — White Noise</title><link
        rel="canonical"
        href="https://www.whitenoise.chat/download"
    /><meta
        name="description"
        content="Get White Noise for your iPhone or Android phone. Find store options and a direct Android APK download."
    /></svelte:head
>
<JsonLd {schema} />
<div class="site-width">
    <PageIntro
        title="Download White Noise"
        description="Get White Noise for iPhone or Android. Choose your preferred store or download the Android APK directly."
    />
    <Grid columns={2} class="download-options">
        {#each options as option}<section class="download-option">
                <h2>{option.name}</h2>
                <p>{option.description}</p>
                <div class="download-actions">
                    {#each option.downloads as download}
                        <Action external href={download.href} label={download.label} variant={download.variant} icon="down" />
                    {/each}
                </div>
            </section>{/each}
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
        <Artwork />
    </section>
</div>
