<script lang="ts">
import JsonLd from "$lib/components/JsonLd.svelte";
import Artwork from "$lib/components/site/Artwork.svelte";
import Supporters from "$lib/components/site/Supporters.svelte";
import Action from "$lib/components/system/Action.svelte";
import Disclosure from "$lib/components/system/Disclosure.svelte";
import TextLink from "$lib/components/system/TextLink.svelte";
import { faqSchema, homepageFaqs } from "$lib/content/faqs";
import { homepageFeatures } from "$lib/content/homepage";

const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "White Noise",
    applicationCategory: "CommunicationApplication",
    operatingSystem: ["iOS", "Android"],
    description:
        "A private, open-source messenger for direct messages, groups, and connected agents. End-to-end encrypted conversations. No phone number or email required.",
    url: "https://www.whitenoise.chat/",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};
</script>

<svelte:head>
    <title>White Noise — The identity-free messenger for private communication.</title>
    <link rel="canonical" href="https://www.whitenoise.chat/" />
    <meta
        name="description"
        content="Private messages, groups, and connected agents. White Noise is an open-source messenger with end-to-end encryption. No phone number or email required."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.whitenoise.chat/" />
    <meta property="og:image" content="https://www.whitenoise.chat/images/og_preview@1x.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="og:title" content="White Noise — The identity-free messenger for private communication." />
    <meta
        property="og:description"
        content="Private messages, groups, and connected agents. End-to-end encrypted. Open source. No phone number or email required."
    />
    <meta property="twitter:title" content="White Noise — The identity-free messenger for private communication." />
    <meta
        property="twitter:description"
        content="Private messages, groups, and connected agents. End-to-end encrypted. Open source. No phone number or email required."
    />
</svelte:head>
<JsonLd {schema} /><JsonLd schema={faqSchema(homepageFaqs)} />
<div class="homepage site-width">
    <section class="home-hero">
        <div class="hero-title">
            <h1>White Noise</h1>
            <p class="hero-tagline">The private messenger you can start using in seconds. No phone number, no email.</p>
        </div>
        <div class="hero-action" id="hero-download">
            <Action href="/download" label="Download" icon="down" />
        </div>
    </section>
    <Supporters />
    <div class="home-features" id="features">
        {#each homepageFeatures as feature}
            <section class="feature-block illustrated" id={feature.id}>
                <div class="feature-copy">
                    <h2>{#each feature.title as line, index}{#if index > 0}<br />{/if}{line}{/each}</h2>
                    <p>{feature.description}</p>
                    {#if feature.link}<TextLink href={feature.link.href}>{feature.link.label}</TextLink>{/if}
                </div>
                <Artwork normalization="visual-mass" name={feature.artwork} />
            </section>
        {/each}
    </div>
    <section class="faq-section" id="faqs">
        <h2>Few things<br />you might ask.</h2>
        <div>
            <div class="faq-items">
                {#each homepageFaqs as faq}
                    <Disclosure title={faq.question}>
                        <p>{faq.answer}</p>
                        {#if faq.link}<TextLink href={faq.link.href} external={faq.link.external}>{faq.link.label}</TextLink>{/if}
                    </Disclosure>
                {/each}
            </div>
            <TextLink href="/faq">See all questions</TextLink>
        </div>
    </section>
</div>
