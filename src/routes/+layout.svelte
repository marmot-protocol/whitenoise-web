<script lang="ts">
import "../app.css";
import Footer from "$lib/components/Footer.svelte";
import Header from "$lib/components/Header.svelte";

const { children } = $props();

const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "White Noise",
    url: "https://www.whitenoise.chat",
    description:
        "A secure and private messenger that's lightning fast, scalable, and identity-free.",
    inLanguage: "en",
    publisher: {
        "@type": "Organization",
        name: "The Marmot Protocol",
        url: "https://github.com/marmot-protocol",
        sameAs: [
            "https://github.com/marmot-protocol/whitenoise",
            "https://github.com/marmot-protocol/marmot",
        ],
    },
};

const websiteSchemaJson = JSON.stringify(websiteSchema).replace(/</g, "\\u003c");
</script>

<svelte:head>
    <script type="application/ld+json">
        {websiteSchemaJson}
    </script>
</svelte:head>

<div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-1">
        {@render children()}
    </main>
    <Footer />
</div>
