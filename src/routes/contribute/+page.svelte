<script lang="ts">
import JsonLd from "$lib/components/JsonLd.svelte";
import Artwork from "$lib/components/site/Artwork.svelte";
import PageIntro from "$lib/components/site/PageIntro.svelte";
import Action from "$lib/components/system/Action.svelte";
import Grid from "$lib/components/system/Grid.svelte";
import Surface from "$lib/components/system/Surface.svelte";
import Text from "$lib/components/system/Text.svelte";
import TextLink from "$lib/components/system/TextLink.svelte";

const ways = [
    {
        title: "Build with us.",
        description:
            "There’s plenty to work on in White Noise and Marmot, and we’d love your help. Fix a bug, contribute a feature, improve the libraries, or build your own app on the protocol. Explore the repositories and developer documentation and start.",
        label: "For developers",
        href: "/build",
    },
    {
        title: "Join the community.",
        description:
            "Help by testing new releases, sharing feedback, or contributing design, illustration, writing, or translation. You don’t need technical skills to make a difference. Bring your perspective to the things people use every day.",
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
        <Artwork name="children-plant" />
    </div>
    <Grid class="contribution-list">
        {#each ways as way}<section>
                <h2>{way.title}</h2>
                <p>{way.description}</p>
                <TextLink href={way.href} external={way.href.startsWith("https://")}>{way.label}</TextLink>
            </section>{/each}
    </Grid>
    <section class="donation-section">
        <Surface class="donation-content" label="Support White Noise">
        <header class="donation-intro">
            <Text as="h2" role="section">Support the work.</Text>
            <Text role="body" tone="muted">
                Building a private messenger takes ongoing care: writing and reviewing code,
                testing releases, fixing bugs, and making the app easier to use. Your donation
                supports the people doing that work and the continued development of White Noise.
            </Text>
        </header>
        <Action href="https://ipf.dev/donate/" label="Donate" icon="external" external />
        </Surface>
    </section>
</div>
