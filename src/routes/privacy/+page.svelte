<script lang="ts">
import JsonLd from "#lib/components/JsonLd.svelte";
import LegalPage from "#lib/components/site/LegalPage.svelte";
import PageMeta from "#lib/components/site/PageMeta.svelte";
import type { PageData } from "./$types";

let { data }: { data: PageData } = $props();

const privacySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    description: "Privacy Policy for White Noise and the Internet Privacy Foundation.",
    url: "https://www.whitenoise.chat/privacy",
    inLanguage: "en",
    publisher: {
        "@type": "Organization",
        name: "Internet Privacy Foundation",
        url: "https://ipf.dev",
    },
};
</script>

<PageMeta
    title="Privacy Policy"
    description="Privacy Policy for White Noise and the Internet Privacy Foundation."
    path="/privacy"
/>

<JsonLd schema={privacySchema} />

<LegalPage {...data} />
