<script lang="ts">
import JsonLd from "$lib/components/JsonLd.svelte";
import type { PageData } from "./$types";

let { data }: { data: PageData } = $props();

function formatDate(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

const latestAttestation = $derived(data.attestations[0] || null);
const latestTimestamp = $derived(
    latestAttestation ? latestAttestation.publishedAt || latestAttestation.createdAt : null
);

const canarySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "White Noise Canary",
    description:
        "Warrant canary and transparency statement for White Noise and the Internet Privacy Foundation.",
    url: "https://www.whitenoise.chat/canary",
    inLanguage: "en",
    publisher: {
        "@type": "Organization",
        name: "Internet Privacy Foundation",
        url: "https://ipf.dev",
    },
};
</script>

<svelte:head>
    <title>Canary | White Noise</title>
    <link rel="canonical" href="https://www.whitenoise.chat/canary" />
    <meta name="description" content="Warrant canary and transparency statement for White Noise and the Internet Privacy Foundation." />
</svelte:head>

<JsonLd schema={canarySchema} />

<div class="bg-glitch-50 min-h-screen">
    <article class="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16 text-glitch-900">
        <header class="mb-10">
            <p class="text-sm uppercase tracking-[0.2em] text-glitch-500 mb-3">Transparency</p>
            <h1 class="text-4xl md:text-5xl font-bold mb-4">White Noise Canary</h1>
            <p class="text-lg text-glitch-700 max-w-3xl">
                This page serves as the Internet Privacy Foundation's regular transparency statement for White Noise.
                We intend to re-affirm this statement monthly.
            </p>
        </header>

        <section class="mb-10 rounded-2xl border border-glitch-200 bg-white p-6 md:p-8">
            <p class="text-sm text-glitch-500 mb-4">
                Last re-affirmed:
                {#if latestTimestamp}
                    {formatDate(latestTimestamp)}
                {:else}
                    No published attestation yet
                {/if}
            </p>
            {#if latestTimestamp}
                <div class="space-y-4 text-lg leading-8 text-glitch-800 mb-6">
                    <p>
                        As of {formatDate(latestTimestamp)}, Internet Privacy Foundation has not received any national
                        security letters, FISA court orders, or gagged legal demands requiring us to conceal their
                        existence.
                    </p>
                    <p>
                        As of {formatDate(latestTimestamp)}, Internet Privacy Foundation has not been compelled to
                        install backdoors, weaken encryption, or modify White Noise to facilitate surveillance.
                    </p>
                </div>
            {:else}
                <div class="space-y-4 text-lg leading-8 text-glitch-800 mb-6">
                    <p>
                        As of March 30, 2026, Internet Privacy Foundation has not received any national security
                        letters, FISA court orders, or gagged legal demands requiring us to conceal their existence.
                    </p>
                    <p>
                        As of March 30, 2026, Internet Privacy Foundation has not been compelled to install backdoors,
                        weaken encryption, or modify White Noise to facilitate surveillance.
                    </p>
                </div>
            {/if}
            {#if latestAttestation}
                <a
                    href={latestAttestation.url}
                    class="text-cyan-700 hover:underline text-sm font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View latest signed event
                </a>
            {/if}
        </section>

        <section class="mb-10">
            <p class="text-glitch-700 leading-7">
                If this page is not updated on its expected cadence, readers should not draw any single conclusion
                from that fact alone. Delays can happen for ordinary operational reasons.
            </p>
        </section>

        <section>
            <h2 class="text-2xl font-bold mb-4">Published attestations</h2>
            {#if data.attestations.length === 0}
                <div class="rounded-2xl border border-glitch-200 bg-glitch-100 p-6 text-glitch-700">
                    No signed canary attestations were found yet.
                </div>
            {:else}
                <div class="space-y-6">
                    {#each data.attestations as attestation}
                        <article class="rounded-2xl border border-glitch-200 bg-white p-6 md:p-8">
                            <div class="flex flex-col gap-2 md:flex-row md:items-start md:justify-between mb-4">
                                <div>
                                    <h3 class="text-xl font-bold text-glitch-950">{attestation.title}</h3>
                                    <p class="text-sm text-glitch-500">
                                        Published {formatDate(attestation.publishedAt || attestation.createdAt)}
                                    </p>
                                </div>
                                <a
                                    href={attestation.url}
                                    class="text-cyan-700 hover:underline text-sm font-medium"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View signed event
                                </a>
                            </div>
                            <div class="whitespace-pre-wrap leading-7 text-glitch-800">{attestation.content}</div>
                        </article>
                    {/each}
                </div>
            {/if}
        </section>
    </article>
</div>
