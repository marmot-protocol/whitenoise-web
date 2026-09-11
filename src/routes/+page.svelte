<script lang="ts">
import JsonLd from "$lib/components/JsonLd.svelte";
import Artwork from "$lib/components/rebuild/Artwork.svelte";
import Supporters from "$lib/components/rebuild/Supporters.svelte";
import Action from "$lib/components/system/Action.svelte";
import Disclosure from "$lib/components/system/Disclosure.svelte";
import TextLink from "$lib/components/system/TextLink.svelte";
import { agentsGuide, faqSchema, homepageFaqs } from "$lib/content/homepage";

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
        <div class="hero-identity">
            <div class="hero-title">
                <h1>White Noise</h1>
                <p class="hero-tagline">The identity-free messenger for private communication.</p>
            </div>
        </div>
        <div class="hero-action" id="hero-download">
            <Action href="/download" label="Download" icon="down" />
        </div>
    </section>
    <Supporters />
    <div class="home-features" id="features">
        <section class="feature-block illustrated">
            <div class="feature-copy">
                <h2>Private messages.<br />Private groups.</h2>
                <p>
                    Talk one to one or bring a group together. End-to-end encryption keeps your messages private between the people in the conversation.
                </p>
                <TextLink href="/privacy-matters">Why privacy matters</TextLink>
            </div>
            <Artwork />
        </section>
        <section class="feature-block illustrated identity-feature">
            <div class="feature-copy">
                <h2>No phone number.<br />No email.</h2>
                <p>
                    Choose a name and start connecting. No phone number or email address needed.
                </p>
            </div>
            <Artwork name="identity" />
        </section>
        <section class="feature-block illustrated" id="agents">
            <div class="feature-copy">
                <h2>An agent is just<br />another contact.</h2>
                <p>
                    Connect an AI agent running on your computer and chat with it from White Noise, just like another contact.
                </p>
                <TextLink href={agentsGuide}>Connect your agent</TextLink>
            </div>
            <Artwork name="agents" />
        </section>
        <section class="feature-block illustrated relay-feature">
            <div class="feature-copy">
                <h2>An independent<br />network.</h2>
                <p>
                    White Noise uses a network of independent servers to deliver messages, reducing reliance on any one provider.
                </p>
            </div>
            <Artwork name="roots" />
        </section>
        <section class="feature-block illustrated open-feature">
            <div class="feature-copy">
                <h2>Open source.<br />Open standards.</h2>
                <p>
                    Anyone can see how White Noise works, suggest improvements, or build on it. The code is open to everyone.
                </p>
                <TextLink href="/build">Explore the code</TextLink>
            </div>
            <Artwork name="open" />
        </section>
        <section class="feature-block illustrated community-feature">
            <div class="feature-copy">
                <h2>Built with<br />the community.</h2>
                <p>
                    Help make White Noise better. Share feedback, test new releases, translate, or contribute code and design.
                </p>
                <TextLink href="/contribute">Get involved</TextLink>
            </div>
            <Artwork name="community" />
        </section>
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
