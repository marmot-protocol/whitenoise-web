<script lang="ts">
import JsonLd from "$lib/components/JsonLd.svelte";
import Artwork from "$lib/components/rebuild/Artwork.svelte";
import LinkButton from "$lib/components/rebuild/LinkButton.svelte";
import PageIntro from "$lib/components/rebuild/PageIntro.svelte";
import Grid from "$lib/components/system/Grid.svelte";
import TextLink from "$lib/components/system/TextLink.svelte";

const options = [
    {
        name: "iPhone",
        method: "iOS TestFlight",
        description: "Get the beta app for iOS.",
        href: "https://testflight.apple.com/join/KrVBcjpA",
    },
    {
        name: "Android",
        method: "Android APK",
        description: "Download the latest APK for Android.",
        href: "https://ipf.dev/android",
    },
];
const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "White Noise",
    applicationCategory: "CommunicationApplication",
    operatingSystem: ["iOS", "Android"],
    description: "Download the White Noise private messenger beta for iOS and Android.",
    url: "https://www.whitenoise.chat/download",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    downloadUrl: options.map((option) => option.href),
    softwareVersion: "beta",
};
</script>

<svelte:head
    ><title>Download — White Noise</title><link
        rel="canonical"
        href="https://www.whitenoise.chat/download"
    /><meta
        name="description"
        content="Get White Noise for iOS and Android. Choose iOS TestFlight or a direct Android APK download."
    /></svelte:head
>
<JsonLd {schema} />
<div class="site-width">
    <PageIntro
        eyebrow="Download"
        title="Your next conversation starts here."
        description="A little more room to be yourself. Get the White Noise beta for your phone."
    />
    <Grid columns={2} class="download-options">
        {#each options as option}<section class="download-option">
                <h2>{option.name}</h2>
                <p>{option.description}</p>
                <LinkButton external href={option.href} label={option.method} />
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
