<script lang="ts">
import JsonLd from "$lib/components/JsonLd.svelte";
import Artwork from "$lib/components/rebuild/Artwork.svelte";
import PageIntro from "$lib/components/rebuild/PageIntro.svelte";
import Action from "$lib/components/system/Action.svelte";
import CopyButton from "$lib/components/system/CopyButton.svelte";
import Grid from "$lib/components/system/Grid.svelte";
import Surface from "$lib/components/system/Surface.svelte";
import TextLink from "$lib/components/system/TextLink.svelte";

const lightningAddress = "whitenoise@npub.cash";
const bitcoinAddress =
    "sp1qqvp56mxcj9pz9xudvlch5g4ah5hrc8rj6neu25p34rc9gxhp38cwqqlmld28u57w2srgckr34dkyg3q02phu8tm05cyj483q026xedp0s5f5j40p";
const ways = [
    {
        title: "Contribute on GitHub.",
        description:
            "Write code, report a bug, improve the docs, or help test the app. Every careful contribution counts.",
        label: "Explore the repositories",
        href: "https://github.com/marmot-protocol",
    },
    {
        title: "Join the community.",
        description:
            "Help with design, illustration, writing, or translation. Bring your perspective to the things people use every day.",
        label: "Join on Signal",
        href: "https://signal.group/#CjQKICPlUduq29DjYD_EJQEBwu1EcEMR5QMZqcMlde026LBaEhCGS-kIM7uhNqtwtby57yQ1",
    },
];
const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Contribute to White Noise",
    description:
        "Help improve White Noise through code, design, testing, translation, or donations.",
    url: "https://www.whitenoise.chat/contribute",
};
</script>

<svelte:head
    ><title>Contribute — White Noise</title><link
        rel="canonical"
        href="https://www.whitenoise.chat/contribute"
    /><meta
        name="description"
        content="Help build White Noise. Contribute code, design, translations, feedback, or financial support."
    /></svelte:head
>
<JsonLd {schema} />
<div class="site-width">
    <div class="contribute-hero">
        <PageIntro title="Good things are built together." />
        <Artwork name="roots" />
    </div>
    <Grid class="contribution-list">
        {#each ways as way}<section>
                <h2>{way.title}</h2>
                <p>{way.description}</p>
                <TextLink href={way.href} external>{way.label}</TextLink>
            </section>{/each}
    </Grid>
    <section class="donation-section">
        <header class="donation-intro">
            <h2>Support the work.</h2>
            <p>
                Building a private messenger takes ongoing care: writing and reviewing code,
                testing releases, fixing bugs, and making the app easier to use. There’s work
                behind every improvement, and people giving their time to make it happen.
            </p>
            <p>
                A donation is another way to contribute. It helps support the people developing
                White Noise and the continued work on an open-source messenger. If you’d like
                to help, you can donate with Lightning or Bitcoin below.
            </p>
        </header>
        <Surface class="donation-methods" label="Donation methods">
        {#each [{ label: "Lightning address", id: "lightning", address: lightningAddress, scheme: "lightning" }, { label: "Bitcoin silent payment address", id: "bitcoin", address: bitcoinAddress, scheme: "bitcoin" }] as method}
            <div class="donation-field">
                <h3 class="donation-label" id={`${method.id}-label`}>{method.label}</h3>
                <div class="donation-controls" role="group" aria-labelledby={`${method.id}-label`}>
                    <div class="donation-address">
                        <span class="donation-address-text">{method.address}</span>
                        <CopyButton value={method.address} label={method.label} />
                    </div>
                    <Action href={`${method.scheme}:${method.address}`} label="Donate" />
                </div>
            </div>
        {/each}
        </Surface>
    </section>
</div>
