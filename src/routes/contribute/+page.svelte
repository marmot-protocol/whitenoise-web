<script lang="ts">
import Copy from "carbon-icons-svelte/lib/Copy.svelte";

let lightningAddress = $state("whitenoise@npub.cash");
let bitcoinAddress = $state("sp1qqvp56mxcj9pz9xudvlch5g4ah5hrc8rj6neu25p34rc9gxhp38cwqqlmld28u57w2srgckr34dkyg3q02phu8tm05cyj483q026xedp0s5f5j40p");

function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
}
</script>

<svelte:head>
    <title>Contribute - White Noise</title>
    <meta name="description" content="Join us in building a tool that defends freedom. Contribute to White Noise through donations, development, or community engagement." />
</svelte:head>

<!-- Hero Section -->
<div class="flex flex-col gap-12 py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div class="bg-gradient-to-br from-cyan-400/20 via-cyan-300/20 to-blue-400/20 px-6 md:px-12 py-16 md:py-24 relative">
            <div class="flex flex-col md:flex-row items-center justify-end gap-8 relative z-10">
                <!-- Hero image positioned absolutely to hang over left edge -->
                <img src="/images/contribute-statue.webp" alt="Contribute Statue" class="absolute left-1/2 md:left-[-150px] top-1/2 transform -translate-x-1/2 md:translate-x-0 -translate-y-1/2 w-[500px] md:w-[600px] h-auto object-contain drop-shadow-2xl z-0" />

                <div class="flex flex-col gap-6 max-w-2xl text-center md:text-right relative z-10 ml-auto">
                    <h1 class="text-4xl md:text-6xl font-bold text-glitch-950 leading-tight">
                        Join Us In Building a Tool That Defends Freedom
                    </h1>
                    <p class="text-lg md:text-xl text-glitch-800 font-medium leading-relaxed">
                        Whether you write code, design interfaces, translate languages, document features, test for bugs, or simply care about freedom tech—you belong here. You can also contribute by donating funds to support the people building it.
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- Join Our Chat Section -->
    <div class="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div class="bg-glitch-950 text-glitch-50 px-6 md:px-12 py-12">
            <div class="flex flex-col md:flex-row items-center justify-between gap-8">
                <div class="flex flex-col gap-4 max-w-2xl">
                    <h2 class="text-2xl md:text-3xl font-bold">Join Our Chat - This Is Where Things Get Built</h2>
                    <p class="text-lg text-glitch-200 leading-relaxed">
                        We're currently chatting on Signal - because dogfooding pre-alpha apps isn't everyone's idea of fun. But as soon as White Noise hits stable, we're packing up and moving home. See you there!
                    </p>
                </div>
                <a
                    href="https://signal.group/#CjQKICPlUduq29DjYD_EJQEBwu1EcEMR5QMZqcMlde026LBaEhCGS-kIM7uhNqtwtby57yQ1"
                    class="bg-cyan-400 hover:bg-cyan-300 text-glitch-950 px-8 py-4 text-xl font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Join the Signal Chat
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </a>
            </div>
        </div>
    </div>

    <!-- Donate Section -->
    <div class="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div class="bg-yellow-100 px-6 md:px-12 py-12">
            <div class="flex flex-col gap-8 mb-8">
                <div class="text-center md:text-left">
                    <h2 class="text-2xl md:text-3xl font-bold text-glitch-950 mb-4">Donate to Defend Digital Freedom</h2>
                    <p class="text-lg text-glitch-700 leading-relaxed max-w-3xl">
                        Behind White Noise are real people. Your donation directly supports their work, ensuring they can stay dedicated, independent, and focused on making White Noise better for everyone.
                    </p>
                </div>
            </div>

            <div class="flex flex-col gap-6">
                <!-- Lightning Address -->
                <div class="flex flex-col gap-3">
                    <label for="lightning-address" class="text-lg font-medium text-glitch-800">Lightning Address</label>
                    <div class="flex flex-col md:flex-row gap-2">
                        <div class="flex-1 relative">
                            <input
                                id="lightning-address"
                                type="text"
                                bind:value={lightningAddress}
                                readonly
                                class="w-full px-4 py-3 bg-white border border-glitch-300 text-glitch-900 font-mono text-sm"
                            />
                            <button
                                onclick={() => copyToClipboard(lightningAddress)}
                                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-glitch-600 hover:text-glitch-800"
                                title="Copy to clipboard"
                                aria-label="Copy lightning address to clipboard"
                            >
                                <Copy size={20} />
                            </button>
                        </div>
                        <a href={`lightning:${lightningAddress}`} class="bg-glitch-950 hover:bg-glitch-800 text-glitch-50 px-6 py-2 font-medium transition-colors flex items-center justify-center gap-2">
                            Donate
                            <img src="/icons/flash.png" alt="Lightning" class="w-4 h-4" />
                        </a>
                    </div>
                </div>

                <!-- Bitcoin Silent Payment Address -->
                <div class="flex flex-col gap-3">
                    <label for="bitcoin-address" class="text-lg font-medium text-glitch-800">Bitcoin Silent Payment Address</label>
                    <div class="flex flex-col md:flex-row gap-2">
                        <div class="flex-1 relative">
                            <input
                                id="bitcoin-address"
                                type="text"
                                bind:value={bitcoinAddress}
                                readonly
                                class="w-full px-4 py-3 bg-white border border-glitch-300 text-glitch-900 font-mono text-sm truncate pr-10"
                            />
                            <button
                                onclick={() => copyToClipboard(bitcoinAddress)}
                                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-glitch-600 hover:text-glitch-800"
                                title="Copy to clipboard"
                                aria-label="Copy bitcoin address to clipboard"
                            >
                                <Copy size={20} />
                            </button>
                        </div>
                        <a href={`bitcoin:${bitcoinAddress}`} class="bg-glitch-950 hover:bg-glitch-800 text-glitch-50 px-6 py-2 font-medium transition-colors flex items-center justify-center gap-2">
                            Donate
                            <img src="/icons/bitcoin.png" alt="Bitcoin" class="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Dive Into the Repo Section -->
    <div class="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div class="bg-glitch-50 px-6 md:px-12 py-12">
            <div class="flex flex-col md:flex-row items-center justify-between gap-8">
                <div class="flex flex-col gap-4 max-w-2xl text-center md:text-left">
                    <h2 class="text-3xl md:text-4xl font-bold text-glitch-950">Dive Into the Repo</h2>
                    <p class="text-lg text-glitch-700 leading-relaxed">
                        Fork, code, push, pull, open issues, squash bugs, refine docs – every commit drives White Noise forward.
                    </p>
                </div>
                <a
                    href="https://github.com/parres-hq/whitenoise"
                    class="bg-glitch-950 hover:bg-glitch-800 text-glitch-50 px-8 py-4 text-xl font-medium transition-colors flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View on GitHub
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</div>

