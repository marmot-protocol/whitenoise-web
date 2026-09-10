<script lang="ts">
import JsonLd from "$lib/components/JsonLd.svelte";
import Artwork from "$lib/components/rebuild/Artwork.svelte";
import LinkButton from "$lib/components/rebuild/LinkButton.svelte";
import Supporters from "$lib/components/rebuild/Supporters.svelte";
import Disclosure from "$lib/components/system/Disclosure.svelte";
import TextLink from "$lib/components/system/TextLink.svelte";

const faqs = [
    {
        question: "What is White Noise?",
        answer: "White Noise is a private messenger for iOS and Android. It uses end-to-end encryption and the decentralized Nostr network to connect people.",
    },
    {
        question: "Do I need a phone number?",
        answer: "No phone number or email is required. You create an identity in the app using a cryptographic keypair.",
    },
    {
        question: "Is it free?",
        answer: "White Noise is free to download and open source. You can explore the code, report a bug, or help improve the app.",
    },
    {
        question: "Where can I get it?",
        answer: "Visit the download page for the available iOS and Android installation options. White Noise is in beta, so features and availability may change.",
    },
];
const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "White Noise",
    applicationCategory: "CommunicationApplication",
    operatingSystem: ["iOS", "Android"],
    description:
        "A private, open-source messenger with end-to-end encrypted conversations. No phone number or email required.",
    url: "https://www.whitenoise.chat/",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};
const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
};
</script>

<svelte:head>
    <title>White Noise — The identity-free messenger for private communication.</title>
    <link rel="canonical" href="https://www.whitenoise.chat/" />
    <meta
        name="description"
        content="White Noise is a private, open-source messenger. End-to-end encrypted conversations. No phone number. No email. Download for iOS and Android."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.whitenoise.chat/" />
    <meta property="og:image" content="https://www.whitenoise.chat/images/og_preview@1x.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="og:title" content="White Noise — The identity-free messenger for private communication." />
    <meta
        property="og:description"
        content="A private, open-source messenger. No phone number. No email. Just a conversation."
    />
    <meta property="twitter:title" content="White Noise — The identity-free messenger for private communication." />
    <meta
        property="twitter:description"
        content="A private, open-source messenger. No phone number. No email. Just a conversation."
    />
</svelte:head>
<JsonLd {schema} /><JsonLd schema={faqSchema} />
<div class="homepage site-width">
    <section class="home-hero">
        <div class="hero-identity">
            <div class="hero-title">
                <h1>White Noise</h1>
                <p class="hero-tagline">The identity-free messenger for private communication.</p>
            </div>
        </div>
        <div class="hero-action" id="hero-download">
            <LinkButton label="Download" />
        </div>
    </section>
    <Supporters />
    <div class="home-features" id="features">
        <section class="feature-block illustrated">
            <div class="feature-copy">
                <h2>Keep it<br />between you.</h2>
                <p>
                    Some things belong in a conversation. White Noise uses end-to-end encryption to
                    keep your messages between you and the people you choose.
                </p>
                <TextLink href="/privacy-matters">Why privacy matters</TextLink>
            </div>
            <Artwork normalized />
        </section>
        <section class="feature-block illustrated identity-feature">
            <div class="feature-copy">
                <h2>No phone number.<br />No email.</h2>
                <p>
                    Your identity starts with a key, not a form. Create it in the app and connect
                    without handing over a phone number or email address.
                </p>
            </div>
            <Artwork normalized name="identity" />
        </section>
        <section class="feature-block illustrated open-feature">
            <div class="feature-copy">
                <h2>Open by design.</h2>
                <p>
                    Open-source software. A decentralized network. Built on Nostr and the Marmot
                    Protocol, so the conversation can happen beyond a single company’s servers.
                </p>
                <TextLink href="/build">Look under the hood</TextLink>
            </div>
            <Artwork normalized name="roots" />
        </section>
        <section class="feature-block illustrated community-feature">
            <div class="feature-copy">
                <h2>Better, together.</h2>
                <p>
                    Good tools grow with the people who use them. Help shape White Noise by writing
                    code, improving the design, translating, or telling us what could work better.
                </p>
                <TextLink href="/contribute">Find your way to contribute</TextLink>
            </div>
            <Artwork normalized name="community" />
        </section>
    </div>
    <section class="faq-section" id="faqs">
        <h2>Few things<br />you might ask.</h2>
        <div class="faq-items">
            {#each faqs as faq}<Disclosure title={faq.question}>
                    <p>{faq.answer}</p>
                    {#if faq.question === "Where can I get it?"}<TextLink href="/download">Go to downloads</TextLink>{/if}
                </Disclosure>{/each}
        </div>
    </section>
</div>
