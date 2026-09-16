<script lang="ts">
import JsonLd from "$lib/components/JsonLd.svelte";
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

<svelte:head>
    <title>Terms of Service | White Noise</title>
    <link rel="canonical" href="https://www.whitenoise.chat/terms" />
    <meta name="description" content="Terms of Service for White Noise and the Internet Privacy Foundation." />
</svelte:head>

<JsonLd schema={termsSchema} />

<div class="bg-glitch-50 min-h-screen">
    <article class="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div class="prose prose-lg max-w-none prose-headings:text-glitch-950 prose-p:text-glitch-800 prose-a:text-cyan-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-glitch-900 prose-code:text-glitch-900 prose-code:bg-glitch-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-glitch-900 prose-pre:text-glitch-100 prose-blockquote:border-glitch-300 prose-blockquote:text-glitch-600 prose-li:text-glitch-800 prose-hr:border-glitch-200">
            {@html data.introductionHtml}
            <nav aria-label="Table of contents" class="my-8 rounded-xl border border-glitch-200 p-5 md:p-6">
                <p class="!mt-0 font-semibold text-glitch-950">On this page</p>
                <ul class="!m-0 grid list-none gap-y-1 !p-0">
                    {#each data.sections as section (section.id)}
                        <li><a href={`#${section.id}`}>{section.title}</a></li>
                    {/each}
                </ul>
            </nav>
            {@html data.sectionsHtml}
        </div>
    </article>
</div>

<style>
    :global(.prose h1) {
        font-size: 3rem;
        font-weight: 700;
        margin-top: 0;
        margin-bottom: 2rem;
        line-height: 1;
    }

    :global(.prose h2) {
        scroll-margin-top: 6rem;
        font-size: 2rem;
        font-weight: 700;
        color: hsl(120 2% 13%);
        margin-top: 3rem;
        margin-bottom: 1rem;
        line-height: 1.2;
    }

    :global(.prose h3) {
        font-size: 1.25rem;
        font-weight: 600;
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
    }

    :global(.prose p) {
        margin-top: 1rem;
        margin-bottom: 1rem;
        line-height: 1.75;
    }

    :global(.prose ul) {
        margin-top: 1rem;
        margin-bottom: 1rem;
        padding-left: 1.5rem;
    }

    :global(.prose li) {
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;
    }

    :global(.prose hr) {
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
    }
</style>
