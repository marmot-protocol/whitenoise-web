<script lang="ts">
import JsonLd from "#lib/components/JsonLd.svelte";
import LegalPage from "#lib/components/site/LegalPage.svelte";
import PageMeta from "#lib/components/site/PageMeta.svelte";
import type { PageData } from "./$types";

let { data }: { data: PageData } = $props();

const termsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service",
    description: "Terms of Service for White Noise and the Internet Privacy Foundation.",
    url: "https://www.whitenoise.chat/terms",
    inLanguage: "en",
    publisher: {
        "@type": "Organization",
        name: "Internet Privacy Foundation",
        url: "https://ipf.dev",
    },
};
</script>

<PageMeta
    title="Terms of Service"
    description="Terms of Service for White Noise and the Internet Privacy Foundation."
    path="/terms"
/>

<JsonLd schema={termsSchema} />

<LegalPage {...data} />
