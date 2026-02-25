<script lang="ts">
import Download from "carbon-icons-svelte/lib/Download.svelte";

const downloadSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "White Noise",
    "applicationCategory": "CommunicationApplication",
    "operatingSystem": "iOS, Android",
    "description": "A secure and private messenger that's lightning fast, scalable, and identity-free.",
    "url": "https://whitenoise.chat/download",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "downloadUrl": "https://github.com/marmot-protocol/whitenoise/releases/latest",
    "softwareVersion": "beta",
    "isAccessibleForFree": true
});
</script>

<svelte:head>
    <title>Download - White Noise</title>
    <meta name="description" content="Download White Noise - A secure and private messenger that's lightning fast, scalable, and identity-free." />
    {@html '<script type="application/ld+json">' + downloadSchema + '</script>'}
</svelte:head>

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
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- iOS TestFlight -->
        <div class="flex flex-col items-center text-center">
            <a
                href="https://testflight.apple.com/join/c6Z7PpxC"
                target="_blank"
                class="bg-glitch-950 hover:bg-glitch-800 text-glitch-50 px-8 py-4 text-xl font-medium transition-colors duration-200 flex flex-row gap-3 items-center justify-center w-full"
            >
                iOS TestFlight
                <Download size={20} class="w-5 h-5" />
            </a>
            <p class="text-glitch-600 mt-4 text-base">Get the app for iOS via TestFlight</p>
        </div>

        <!-- Zapstore -->
        <div class="flex flex-col items-center text-center">
            <a
                href="https://zapstore.dev/apps/naddr1qq2k7un89ecxzunjv4ejuamgd96x2mn0d9ek2q3qwhtn0s68y3cs98zysa4nxrfzss5g5snhndv35tk5m2sudsr7ltmsxpqqqplqk7t8ewh"
                target="_blank"
                class="bg-glitch-950 hover:bg-glitch-800 text-glitch-50 px-8 py-4 text-xl font-medium transition-colors duration-200 flex flex-row gap-3 items-center justify-center w-full"
            >
                Zapstore
                <Download size={20} class="w-5 h-5" />
            </a>
            <p class="text-glitch-600 mt-4 text-base">Install the app via Zapstore on Android</p>
        </div>

        <!-- Android APK -->
        <div class="flex flex-col items-center text-center">
            <a
                href="https://github.com/marmot-protocol/whitenoise/releases/latest"
                target="_blank"
                class="bg-glitch-950 hover:bg-glitch-800 text-glitch-50 px-8 py-4 text-xl font-medium transition-colors duration-200 flex flex-row gap-3 items-center justify-center w-full"
            >
                Android APK
                <Download size={20} class="w-5 h-5" />
            </a>
            <p class="text-glitch-600 mt-4 text-base">Download APK directly for Android</p>
        </div>
    </div>
</div>

