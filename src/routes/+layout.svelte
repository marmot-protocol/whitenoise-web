<script lang="ts">
import "@fontsource-variable/manrope";
import "../app.css";
import "$lib/design-system/tokens.css";
import "$lib/design-system/primitives.css";
import "../rebuild.css";
import "$lib/design-system/typography.css";
import JsonLd from "$lib/components/JsonLd.svelte";
import DownloadClosing from "$lib/components/rebuild/DownloadClosing.svelte";
import Footer from "$lib/components/rebuild/Footer.svelte";
import Header from "$lib/components/rebuild/Header.svelte";
import Container from "$lib/components/system/Container.svelte";

const { children } = $props();
const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "White Noise",
    url: "https://www.whitenoise.chat",
    description:
        "A private, open-source messenger. End-to-end encrypted conversations without a phone number or email.",
    inLanguage: "en",
    publisher: {
        "@type": "Organization",
        name: "The Marmot Protocol",
        url: "https://github.com/marmot-protocol",
    },
};
</script>

<svelte:head><meta name="theme-color" content="#ffffff" /></svelte:head>
<JsonLd schema={websiteSchema} />
<div class="wn-site">
    <a class="skip-link" href="#main-content">Skip to content</a>
    <Header />
    <main id="main-content" tabindex="-1">
        {@render children()}
        <Container><DownloadClosing /></Container>
    </main>
    <Footer />
</div>
