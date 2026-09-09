<script lang="ts">
import Download from "carbon-icons-svelte/lib/Download.svelte";
import JsonLd from "$lib/components/JsonLd.svelte";

const downloadSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "White Noise",
    applicationCategory: "CommunicationApplication",
    operatingSystem: ["iOS", "Android"],
    description:
        "A decentralized, end-to-end encrypted messenger built on the Marmot Protocol (Nostr + MLS + Blossom). No phone number, email, or account required.",
    url: "https://www.whitenoise.chat/download",
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
    },
    downloadUrl: ["https://testflight.apple.com/join/KrVBcjpA", "https://ipf.dev/android"],
    softwareVersion: "beta",
    isAccessibleForFree: true,
    codeRepository: "https://github.com/marmot-protocol/whitenoise",
    license: "https://github.com/marmot-protocol/whitenoise/blob/master/LICENSE",
};
</script>

<svelte:head>
    <title>Download - White Noise</title>
    <link rel="canonical" href="https://www.whitenoise.chat/download" />
    <meta name="description" content="Download White Noise - A secure and private messenger that's lightning fast, scalable, and identity-free." />
</svelte:head>

<JsonLd schema={downloadSchema} />

<!-- Hero Section -->
<div class="flex flex-col py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div class="bg-glitch-950 bg-[url('/images/blocks-background.webp')] bg-no-repeat bg-center-bottom md:bg-right bg-cover px-6 md:px-12 py-16 md:py-24">
            <div class="flex flex-col items-center justify-center">
                <div class="text-center max-w-4xl">
                    <h1 class="text-5xl md:text-6xl font-bold text-glitch-50 mb-6">Download White Noise</h1>
                    <p class="text-xl md:text-2xl text-glitch-200 font-medium">
                        A secure and private messenger that's<br />lightning fast, scalable, and identity-free.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Download Options -->
<div class="max-w-5xl mx-auto w-full px-6 md:px-12 pb-16">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- iOS TestFlight -->
        <div class="flex flex-col items-center text-center">
            <a
                href="https://testflight.apple.com/join/KrVBcjpA"
                target="_blank"
                class="bg-glitch-950 hover:bg-glitch-800 text-glitch-50 px-8 py-4 text-xl font-medium transition-colors duration-200 flex flex-row gap-3 items-center justify-center w-full"
            >
                iOS TestFlight
                <Download size={20} class="w-5 h-5" />
            </a>
            <p class="text-glitch-600 mt-4 text-base">Get the app for iOS via TestFlight</p>
        </div>

        <!-- Android APK -->
        <div class="flex flex-col items-center text-center">
            <a
                href="https://ipf.dev/android"
                target="_blank"
                class="bg-glitch-950 hover:bg-glitch-800 text-glitch-50 px-8 py-4 text-xl font-medium transition-colors duration-200 flex flex-row gap-3 items-center justify-center w-full"
            >
                Android APK
                <Download size={20} class="w-5 h-5" />
            </a>
            <p class="text-glitch-600 mt-4 text-base">Download the latest APK for Android</p>
        </div>
    </div>
</div>
