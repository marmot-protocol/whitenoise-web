<script lang="ts">
const buildSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Build with the Marmot Protocol",
    "description": "Developer guide for the Marmot Protocol. MDK crate structure, Nostr event kinds, default ciphersuite, identity model, client flow, and MIP status for building encrypted messaging apps.",
    "url": "https://whitenoise.chat/build",
    "inLanguage": "en",
    "author": {
        "@type": "Organization",
        "name": "The Marmot Protocol",
        "url": "https://github.com/marmot-protocol"
    },
    "publisher": {
        "@type": "Organization",
        "name": "The Marmot Protocol",
        "url": "https://github.com/marmot-protocol"
    },
    "isAccessibleForFree": true,
    "about": [
        {
            "@type": "SoftwareSourceCode",
            "name": "MDK (Marmot Development Kit)",
            "codeRepository": "https://github.com/marmot-protocol/mdk",
            "programmingLanguage": "Rust",
            "license": "https://opensource.org/licenses/MIT"
        },
        {
            "@type": "SoftwareSourceCode",
            "name": "marmot-ts",
            "codeRepository": "https://github.com/marmot-protocol/marmot-ts",
            "programmingLanguage": "TypeScript",
            "description": "Early-stage TypeScript implementation of the Marmot Protocol"
        }
    ]
};
</script>

<svelte:head>
    <title>Build with Marmot Protocol | White Noise</title>
    <link rel="canonical" href="https://whitenoise.chat/build" />
    <meta name="description" content="Developer guide for the Marmot Protocol. MDK crate structure, Nostr event kinds, default ciphersuite, identity model, and client flow for building encrypted messaging apps." />
    {@html '<script type="application/ld+json">' + JSON.stringify(buildSchema).replace(/</g, '\\u003c') + '</script>'}
</svelte:head>

<div class="bg-glitch-50 min-h-screen">
    <!-- Hero -->
    <div class="bg-glitch-950 bg-[url('/images/blocks-background.webp')] bg-no-repeat bg-center-bottom md:bg-right bg-cover">
        <div class="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <h1 class="text-4xl md:text-6xl font-bold text-glitch-50 mb-4">Build with Marmot</h1>
            <p class="text-xl text-glitch-200 font-medium max-w-2xl">
                The Marmot Protocol combines Nostr, MLS, and Blossom for decentralized encrypted messaging. Use the MDK to build compatible clients without implementing the protocol from scratch.
            </p>
        </div>
    </div>

    <div class="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">

        <!-- Quick Start -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-glitch-950 mb-6">Quick Start (Rust)</h2>
            <p class="text-glitch-700 mb-4">The MDK (Marmot Development Kit) is a modular Rust SDK. Requires Rust 1.90.0+ and SQLite.</p>
            <pre class="bg-glitch-900 text-glitch-100 p-6 overflow-x-auto text-sm font-mono"><code>git clone https://github.com/marmot-protocol/mdk.git
cd mdk
cargo build
cargo test --features mip04</code></pre>
        </section>

        <!-- MDK Crate Structure -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-glitch-950 mb-6">MDK Crate Structure</h2>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="border-b-2 border-glitch-300">
                            <th class="py-3 pr-6 text-glitch-950 font-bold">Crate</th>
                            <th class="py-3 text-glitch-950 font-bold">Purpose</th>
                        </tr>
                    </thead>
                    <tbody class="text-glitch-700">
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900">mdk-core</td>
                            <td class="py-3">Main library: MLS implementation, Nostr integration, group management</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900">mdk-storage-traits</td>
                            <td class="py-3">Storage abstraction layer (implement for custom backends)</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900">mdk-memory-storage</td>
                            <td class="py-3">In-memory storage for development and testing</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900">mdk-sqlite-storage</td>
                            <td class="py-3">SQLite-based persistent storage with encryption (production use)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Nostr Event Kinds -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-glitch-950 mb-6">Nostr Event Kinds</h2>
            <p class="text-glitch-700 mb-4">Marmot clients must subscribe to and publish these event kinds:</p>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="border-b-2 border-glitch-300">
                            <th class="py-3 pr-6 text-glitch-950 font-bold">Kind</th>
                            <th class="py-3 pr-6 text-glitch-950 font-bold">Purpose</th>
                            <th class="py-3 text-glitch-950 font-bold">Notes</th>
                        </tr>
                    </thead>
                    <tbody class="text-glitch-700">
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900">443</td>
                            <td class="py-3 pr-6">KeyPackage</td>
                            <td class="py-3">Public invitation card for async group joins. TLS-serialized, base64 encoded.</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900">444</td>
                            <td class="py-3 pr-6">Welcome</td>
                            <td class="py-3">Sent to new members when added to a group. Wrapped in NIP-59 gift wrap.</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900">445</td>
                            <td class="py-3 pr-6">Group Event</td>
                            <td class="py-3">Encrypted group messages (proposals, commits, application messages). Uses ephemeral keypairs.</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900">447</td>
                            <td class="py-3 pr-6">Token Request</td>
                            <td class="py-3">Push notification token exchange (MIP-05).</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900">448</td>
                            <td class="py-3 pr-6">Token List Response</td>
                            <td class="py-3">Push notification token list (MIP-05).</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900">449</td>
                            <td class="py-3 pr-6">Token Removal</td>
                            <td class="py-3">Remove push notification token (MIP-05).</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900">10050</td>
                            <td class="py-3 pr-6">Relay List</td>
                            <td class="py-3">User's preferred relays for notifications.</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900">10051</td>
                            <td class="py-3 pr-6">KeyPackage Relay List</td>
                            <td class="py-3">Relays where user publishes KeyPackages.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Default Ciphersuite -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-glitch-950 mb-6">Default Ciphersuite</h2>
            <p class="text-glitch-700 mb-4">All Marmot clients must support this ciphersuite:</p>
            <pre class="bg-glitch-900 text-glitch-100 p-6 overflow-x-auto text-sm font-mono"><code>MLS_128_DHKEMX25519_AES128GCM_SHA256_Ed25519</code></pre>
            <p class="text-glitch-700 mt-4">X25519 for key exchange, AES-128-GCM for encryption, SHA-256 for hashing, Ed25519 for signatures.</p>
        </section>

        <!-- Identity Model -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-glitch-950 mb-6">Identity Model</h2>
            <ul class="list-disc pl-6 space-y-2 text-glitch-700">
                <li>Nostr keypairs are used for identity (32-byte public key as <code class="bg-glitch-100 px-1 py-0.5 text-glitch-900 text-sm">BasicCredential</code>)</li>
                <li>MLS signing keys are separate from Nostr identity keys</li>
                <li>Compromise of a Nostr identity does not give access to MLS group messages</li>
                <li>Each device is a separate MLS leaf node (multi-device support)</li>
            </ul>
        </section>

        <!-- Basic Client Flow -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-glitch-950 mb-6">Basic Client Flow</h2>
            <ol class="list-decimal pl-6 space-y-4 text-glitch-700">
                <li><span class="font-medium text-glitch-900">Generate identity:</span> Create or import a Nostr keypair</li>
                <li><span class="font-medium text-glitch-900">Publish KeyPackage:</span> Create an MLS KeyPackage and publish it as a kind:443 event to relays listed in the user's kind:10051 event</li>
                <li><span class="font-medium text-glitch-900">Create a group:</span> Initialize an MLS group with the Marmot Group Data Extension (0xF2EE), then invite members by consuming their KeyPackages</li>
                <li><span class="font-medium text-glitch-900">Send Welcome:</span> After committing an Add proposal, send a Welcome message (kind:444) wrapped in NIP-59 gift wrap</li>
                <li><span class="font-medium text-glitch-900">Send messages:</span> Encrypt with MLS, derive Nostr encryption key from <code class="bg-glitch-100 px-1 py-0.5 text-glitch-900 text-sm">exporter_secret</code>, apply NIP-44 encryption, publish as kind:445 with ephemeral keypair</li>
                <li><span class="font-medium text-glitch-900">Receive messages:</span> Subscribe to kind:445 events filtered by the group's <code class="bg-glitch-100 px-1 py-0.5 text-glitch-900 text-sm">h</code> tag, decrypt NIP-44 layer, process MLS application message</li>
            </ol>
        </section>

        <!-- MIP Status -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-glitch-950 mb-6">MIP Status</h2>
            <p class="text-glitch-700 mb-4">The Marmot Protocol is specified through MIPs (Marmot Improvement Proposals):</p>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="border-b-2 border-glitch-300">
                            <th class="py-3 pr-6 text-glitch-950 font-bold">MIP</th>
                            <th class="py-3 pr-6 text-glitch-950 font-bold">Title</th>
                            <th class="py-3 pr-6 text-glitch-950 font-bold">Status</th>
                            <th class="py-3 text-glitch-950 font-bold">Required</th>
                        </tr>
                    </thead>
                    <tbody class="text-glitch-700">
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900">MIP-00</td>
                            <td class="py-3 pr-6">Credentials and KeyPackages</td>
                            <td class="py-3 pr-6"><span class="bg-glitch-200 text-glitch-800 px-2 py-0.5 text-xs font-medium">Review</span></td>
                            <td class="py-3">Yes</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900">MIP-01</td>
                            <td class="py-3 pr-6">Group Construction and Marmot Group Data Extension</td>
                            <td class="py-3 pr-6"><span class="bg-glitch-200 text-glitch-800 px-2 py-0.5 text-xs font-medium">Review</span></td>
                            <td class="py-3">Yes</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900">MIP-02</td>
                            <td class="py-3 pr-6">Welcome Events</td>
                            <td class="py-3 pr-6"><span class="bg-glitch-200 text-glitch-800 px-2 py-0.5 text-xs font-medium">Review</span></td>
                            <td class="py-3">Yes</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900">MIP-03</td>
                            <td class="py-3 pr-6">Group Messages</td>
                            <td class="py-3 pr-6"><span class="bg-glitch-200 text-glitch-800 px-2 py-0.5 text-xs font-medium">Review</span></td>
                            <td class="py-3">Yes</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900">MIP-04</td>
                            <td class="py-3 pr-6">Encrypted Media (Blossom + ChaCha20-Poly1305)</td>
                            <td class="py-3 pr-6"><span class="bg-glitch-200 text-glitch-800 px-2 py-0.5 text-xs font-medium">Review</span></td>
                            <td class="py-3">No</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900">MIP-05</td>
                            <td class="py-3 pr-6">Push Notifications</td>
                            <td class="py-3 pr-6"><span class="bg-glitch-100 text-glitch-600 px-2 py-0.5 text-xs font-medium">Draft</span></td>
                            <td class="py-3">No</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="text-glitch-700 mt-4">Full specifications: <a href="https://github.com/marmot-protocol/marmot" class="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">github.com/marmot-protocol/marmot</a></p>
        </section>

        <!-- Known Limitations -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-glitch-950 mb-6">Known Limitations</h2>
            <ul class="list-disc pl-6 space-y-2 text-glitch-700">
                <li>Welcome messages currently exceed relay size limits above approximately 150 group members. Work is underway on "light" Welcome support for larger groups.</li>
                <li>The project is in beta. Protocol specifications are in review status.</li>
            </ul>
        </section>

        <!-- TypeScript -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-glitch-950 mb-6">TypeScript (marmot-ts)</h2>
            <p class="text-glitch-700 mb-4">For web or Node.js applications, marmot-ts is an early-stage TypeScript implementation:</p>
            <pre class="bg-glitch-900 text-glitch-100 p-6 overflow-x-auto text-sm font-mono"><code>git clone https://github.com/marmot-protocol/marmot-ts.git</code></pre>
            <p class="text-glitch-600 mt-4 text-sm">marmot-ts is under active development and not yet feature-complete.</p>
        </section>

        <!-- Key Dependencies -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-glitch-950 mb-6">Key Dependencies</h2>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="border-b-2 border-glitch-300">
                            <th class="py-3 pr-6 text-glitch-950 font-bold">Library</th>
                            <th class="py-3 pr-6 text-glitch-950 font-bold">Purpose</th>
                            <th class="py-3 text-glitch-950 font-bold">Repository</th>
                        </tr>
                    </thead>
                    <tbody class="text-glitch-700">
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-medium text-glitch-900">OpenMLS</td>
                            <td class="py-3 pr-6">Rust MLS implementation</td>
                            <td class="py-3"><a href="https://github.com/openmls/openmls" class="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">github.com/openmls/openmls</a></td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-medium text-glitch-900">rust-nostr</td>
                            <td class="py-3 pr-6">Nostr protocol support</td>
                            <td class="py-3"><a href="https://github.com/rust-nostr/nostr" class="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">github.com/rust-nostr/nostr</a></td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-medium text-glitch-900">Blossom</td>
                            <td class="py-3 pr-6">Content-addressed media storage</td>
                            <td class="py-3"><a href="https://github.com/hzrd149/blossom" class="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">github.com/hzrd149/blossom</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Repositories -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-glitch-950 mb-6">Repositories</h2>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="border-b-2 border-glitch-300">
                            <th class="py-3 pr-6 text-glitch-950 font-bold">Repository</th>
                            <th class="py-3 pr-6 text-glitch-950 font-bold">Purpose</th>
                            <th class="py-3 pr-6 text-glitch-950 font-bold">Language</th>
                            <th class="py-3 text-glitch-950 font-bold">License</th>
                        </tr>
                    </thead>
                    <tbody class="text-glitch-700">
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6"><a href="https://github.com/marmot-protocol/whitenoise" class="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">whitenoise</a></td>
                            <td class="py-3 pr-6">Flutter mobile client</td>
                            <td class="py-3 pr-6">Dart</td>
                            <td class="py-3">AGPL-3.0</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6"><a href="https://github.com/marmot-protocol/whitenoise-rs" class="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">whitenoise-rs</a></td>
                            <td class="py-3 pr-6">Rust backend library with OpenMLS</td>
                            <td class="py-3 pr-6">Rust</td>
                            <td class="py-3">AGPL-3.0</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6"><a href="https://github.com/marmot-protocol/marmot" class="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">marmot</a></td>
                            <td class="py-3 pr-6">Protocol specification (MIPs)</td>
                            <td class="py-3 pr-6">N/A</td>
                            <td class="py-3">MIT</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6"><a href="https://github.com/marmot-protocol/mdk" class="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">mdk</a></td>
                            <td class="py-3 pr-6">Marmot Development Kit (modular Rust SDK)</td>
                            <td class="py-3 pr-6">Rust</td>
                            <td class="py-3">MIT</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6"><a href="https://github.com/marmot-protocol/marmot-ts" class="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">marmot-ts</a></td>
                            <td class="py-3 pr-6">TypeScript implementation (early stage)</td>
                            <td class="py-3 pr-6">TypeScript</td>
                            <td class="py-3">-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="text-glitch-700 mt-4">All repositories: <a href="https://github.com/marmot-protocol" class="text-cyan-600 hover:underline" target="_blank" rel="noopener noreferrer">github.com/marmot-protocol</a></p>
        </section>

    </div>
</div>
