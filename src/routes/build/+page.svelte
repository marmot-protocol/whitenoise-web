<script lang="ts">
import JsonLd from "$lib/components/JsonLd.svelte";

const buildSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Build with the Marmot Protocol",
    description:
        "Developer guide for the Marmot Protocol. MDK crates, Nostr event kinds, default ciphersuite, identity model, client flow, and the protocol spec surfaces for building encrypted messaging apps.",
    url: "https://www.whitenoise.chat/build",
    inLanguage: "en",
    author: {
        "@type": "Organization",
        name: "The Marmot Protocol",
        url: "https://github.com/marmot-protocol",
    },
    publisher: {
        "@type": "Organization",
        name: "The Marmot Protocol",
        url: "https://github.com/marmot-protocol",
    },
    isAccessibleForFree: true,
    about: [
        {
            "@type": "SoftwareSourceCode",
            name: "MDK (Marmot Development Kit)",
            codeRepository: "https://github.com/marmot-protocol/mdk",
            programmingLanguage: "Rust",
            license: "https://opensource.org/licenses/MIT",
        },
        {
            "@type": "SoftwareSourceCode",
            name: "marmot-ts",
            codeRepository: "https://github.com/marmot-protocol/marmot-ts",
            programmingLanguage: "TypeScript",
            description: "TypeScript implementation of the Marmot Protocol",
        },
    ],
};
</script>

<svelte:head>
    <title>Build with Marmot Protocol | White Noise</title>
    <link rel="canonical" href="https://www.whitenoise.chat/build" />
    <meta name="description" content="Developer guide for the Marmot Protocol. MDK crates, Nostr event kinds, default ciphersuite, identity model, and client flow for building encrypted messaging apps." />
</svelte:head>

<JsonLd schema={buildSchema} />

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
            <p class="text-glitch-700 mb-4">The MDK (Marmot Development Kit) is the Rust implementation workspace for Marmot. The toolchain is pinned by <code class="bg-glitch-100 px-1 py-0.5 text-glitch-900 text-sm">rust-toolchain.toml</code>, currently 1.97.1. SQLCipher and OpenSSL are vendored, so you need a C compiler but no system SQLite.</p>
            <pre class="bg-glitch-900 text-glitch-100 p-6 overflow-x-auto text-sm font-mono"><code>git clone https://github.com/marmot-protocol/mdk.git
cd mdk
cargo build

# Engine boundary tests
cargo test -p cgka-engine

# Fast pre-push gate: formatting, compile checks, clippy
just fast-ci</code></pre>
        </section>

        <!-- MDK Crates -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-glitch-950 mb-6">MDK Crates</h2>
            <p class="text-glitch-700 mb-4">The workspace is modular. These are the crates a client author usually touches:</p>
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
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900">marmot-app</td>
                            <td class="py-3">Multi-account app runtime. The entry point for most clients, and what the CLI, daemon, TUI, and bindings are built on.</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900">marmot-uniffi</td>
                            <td class="py-3">UniFFI bindings over the app runtime, used by the Swift and Kotlin clients.</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900">marmot-account</td>
                            <td class="py-3">Account records, key storage, and transport orchestration.</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900">cgka-engine</td>
                            <td class="py-3">OpenMLS-backed group key agreement engine and local group state machine.</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900">transport-nostr-adapter</td>
                            <td class="py-3">Nostr transport behind an injectable relay-client boundary.</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900">storage-sqlite</td>
                            <td class="py-3">SQLCipher-backed persistence for sessions and engine state.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="text-glitch-700 mt-4">There are more crates in the workspace — conformance simulator, QUIC agent-stream transports, forensic audit logging, CLI and daemon. The <a href="https://github.com/marmot-protocol/mdk#repository-map" class="text-glitch-700 hover:underline" target="_blank" rel="noopener noreferrer">repository map</a> lists all of them.</p>
        </section>

        <!-- Nostr Event Kinds -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-glitch-950 mb-6">Nostr Event Kinds</h2>
            <p class="text-glitch-700 mb-4">Two kinds carry the parts of Marmot you will implement first:</p>
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
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900">30443</td>
                            <td class="py-3 pr-6">KeyPackage</td>
                            <td class="py-3">Addressable event advertising an MLS KeyPackage, so others can add you to a group while you are offline. Its tags carry the MLS ciphersuite, extensions, proposals, and app components you support.</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900">445</td>
                            <td class="py-3 pr-6">Group message</td>
                            <td class="py-3">An MLS message for one group, encrypted with ChaCha20-Poly1305. Carries a single <code class="bg-glitch-100 px-1 py-0.5 text-glitch-900 text-sm">h</code> tag holding the group's routing id, and is signed by a fresh ephemeral keypair rather than your identity key.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="text-glitch-700 mt-4">Marmot also reuses standard Nostr kinds for Welcomes (NIP-59 gift wrap), relay lists, and push notifications. The complete list lives in the spec's <a href="https://github.com/marmot-protocol/marmot/blob/master/foundation/registries.md" class="text-glitch-700 hover:underline" target="_blank" rel="noopener noreferrer">event kind registry</a>.</p>
        </section>

        <!-- Default Ciphersuite -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-glitch-950 mb-6">Default Ciphersuite</h2>
            <p class="text-glitch-700 mb-4">Every Marmot implementation must support MLS ciphersuite 0x0001:</p>
            <pre class="bg-glitch-900 text-glitch-100 p-6 overflow-x-auto text-sm font-mono"><code>MLS_128_DHKEMX25519_AES128GCM_SHA256_Ed25519</code></pre>
            <p class="text-glitch-700 mt-4">X25519 for key exchange, AES-128-GCM for encryption, SHA-256 for hashing, Ed25519 for signatures. Clients may support more suites, but a group can only use one that every member supports.</p>
        </section>

        <!-- Identity Model -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-glitch-950 mb-6">Identity Model</h2>
            <ul class="list-disc pl-6 space-y-2 text-glitch-700">
                <li>Nostr keypairs are identity: the 32-byte public key is the MLS <code class="bg-glitch-100 px-1 py-0.5 text-glitch-900 text-sm">BasicCredential</code></li>
                <li>MLS leaf signature keys are separate from your Nostr identity key</li>
                <li>Each leaf carries a proof that the named account authorized that leaf's MLS signature key. A joiner rejects any leaf whose proof does not verify</li>
                <li>Compromise of a Nostr identity key does not by itself decrypt a group's message history</li>
                <li>Each device is its own MLS leaf, which is how multi-device works</li>
            </ul>
        </section>

        <!-- Basic Client Flow -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-glitch-950 mb-6">Basic Client Flow</h2>
            <ol class="list-decimal pl-6 space-y-4 text-glitch-700">
                <li><span class="font-medium text-glitch-900">Generate identity:</span> create or import a Nostr keypair</li>
                <li><span class="font-medium text-glitch-900">Publish a KeyPackage:</span> build an MLS KeyPackage and publish it as a kind:30443 event, with the proof that binds its leaf signature key to your account</li>
                <li><span class="font-medium text-glitch-900">Create a group:</span> initialize an MLS group whose GroupContext carries the <code class="bg-glitch-100 px-1 py-0.5 text-glitch-900 text-sm">required_capabilities</code> and <code class="bg-glitch-100 px-1 py-0.5 text-glitch-900 text-sm">app_data_dictionary</code> extensions, the latter holding Marmot's app components such as admin policy and group profile</li>
                <li><span class="font-medium text-glitch-900">Invite members:</span> consume their published KeyPackages, commit the Add, then deliver a Welcome to each invitee, gift-wrapped to the inbox relays they advertise</li>
                <li><span class="font-medium text-glitch-900">Send messages:</span> derive <code class="bg-glitch-100 px-1 py-0.5 text-glitch-900 text-sm">group_event_key</code> from the epoch's MLS exporter, encrypt the serialized MLS message with ChaCha20-Poly1305 under a random 12-byte nonce, and publish <code class="bg-glitch-100 px-1 py-0.5 text-glitch-900 text-sm">base64(nonce || ciphertext)</code> as kind:445 signed by a fresh ephemeral keypair</li>
                <li><span class="font-medium text-glitch-900">Receive messages:</span> subscribe to kind:445 filtered by the group's <code class="bg-glitch-100 px-1 py-0.5 text-glitch-900 text-sm">h</code> tag, verify the event, then decrypt and process the MLS message. Sender identity comes from the MLS message inside, never from the event's ephemeral pubkey</li>
            </ol>
        </section>

        <!-- Spec Surfaces -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-glitch-950 mb-6">Spec Surfaces</h2>
            <p class="text-glitch-700 mb-4">The protocol spec is organized by surface. Start with the one that owns the rule you need:</p>
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="border-b-2 border-glitch-300">
                            <th class="py-3 pr-6 text-glitch-950 font-bold">Surface</th>
                            <th class="py-3 text-glitch-950 font-bold">What it defines</th>
                        </tr>
                    </thead>
                    <tbody class="text-glitch-700">
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900"><a href="https://github.com/marmot-protocol/marmot/blob/master/foundation/README.md" class="hover:underline" target="_blank" rel="noopener noreferrer">foundation</a></td>
                            <td class="py-3">The invariants that make an implementation Marmot: identity, KeyPackages, message shape, MLS choices, encodings, registries.</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900"><a href="https://github.com/marmot-protocol/marmot/blob/master/protocol-core/README.md" class="hover:underline" target="_blank" rel="noopener noreferrer">protocol-core</a></td>
                            <td class="py-3">What clients do with group state: setup, joining, messaging, processing inbound bytes, convergence, departure, retained history.</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900"><a href="https://github.com/marmot-protocol/marmot/blob/master/app-components/README.md" class="hover:underline" target="_blank" rel="noopener noreferrer">app-components</a></td>
                            <td class="py-3">Versioned group-state payloads carried in the MLS <code class="bg-glitch-100 px-1 py-0.5 text-glitch-900 text-sm">app_data_dictionary</code>: admin policy, group profile, routing, media, retention.</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900"><a href="https://github.com/marmot-protocol/marmot/blob/master/transports/README.md" class="hover:underline" target="_blank" rel="noopener noreferrer">transports</a></td>
                            <td class="py-3">How Marmot bytes move over a network. Nostr relays today, with a QUIC binding for agent streams.</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-mono text-sm text-glitch-900"><a href="https://github.com/marmot-protocol/marmot/blob/master/features/README.md" class="hover:underline" target="_blank" rel="noopener noreferrer">features</a></td>
                            <td class="py-3">Optional, user-visible flows spanning several surfaces: encrypted media, push notifications, multi-device, agent text streams.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="text-glitch-700 mt-4">The spec is adopted. Older MIP-numbered documents describe a deprecated version of the protocol; the spec's <a href="https://github.com/marmot-protocol/marmot/blob/master/mip-coverage.md" class="text-glitch-700 hover:underline" target="_blank" rel="noopener noreferrer">MIP coverage map</a> shows where each one landed. Full specification: <a href="https://github.com/marmot-protocol/marmot" class="text-glitch-700 hover:underline" target="_blank" rel="noopener noreferrer">github.com/marmot-protocol/marmot</a></p>
        </section>

        <!-- Known Limitations -->
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-glitch-950 mb-6">Known Limitations</h2>
            <ul class="list-disc pl-6 space-y-2 text-glitch-700">
                <li>Every Welcome carries the group's full MLS ratchet tree, and out-of-band tree distribution is not supported, so Welcome size grows with the group. Very large groups can exceed relay limits.</li>
                <li>White Noise is in beta.</li>
            </ul>
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
                            <td class="py-3"><a href="https://github.com/openmls/openmls" class="text-glitch-700 hover:underline" target="_blank" rel="noopener noreferrer">github.com/openmls/openmls</a></td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-medium text-glitch-900">rust-nostr</td>
                            <td class="py-3 pr-6">Nostr protocol support</td>
                            <td class="py-3"><a href="https://github.com/rust-nostr/nostr" class="text-glitch-700 hover:underline" target="_blank" rel="noopener noreferrer">github.com/rust-nostr/nostr</a></td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6 font-medium text-glitch-900">Blossom</td>
                            <td class="py-3 pr-6">Content-addressed media storage</td>
                            <td class="py-3"><a href="https://github.com/hzrd149/blossom" class="text-glitch-700 hover:underline" target="_blank" rel="noopener noreferrer">github.com/hzrd149/blossom</a></td>
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
                            <th class="py-3 text-glitch-950 font-bold">Purpose</th>
                        </tr>
                    </thead>
                    <tbody class="text-glitch-700">
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6"><a href="https://github.com/marmot-protocol/mdk" class="text-glitch-700 hover:underline" target="_blank" rel="noopener noreferrer">mdk</a></td>
                            <td class="py-3">Marmot Development Kit. The Rust implementation workspace.</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6"><a href="https://github.com/marmot-protocol/marmot" class="text-glitch-700 hover:underline" target="_blank" rel="noopener noreferrer">marmot</a></td>
                            <td class="py-3">The protocol specification.</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6"><a href="https://github.com/marmot-protocol/marmot-ts" class="text-glitch-700 hover:underline" target="_blank" rel="noopener noreferrer">marmot-ts</a></td>
                            <td class="py-3">TypeScript implementation, built on ts-mls. Under active development.</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6"><a href="https://github.com/marmot-protocol/whitenoise-ios" class="text-glitch-700 hover:underline" target="_blank" rel="noopener noreferrer">whitenoise-ios</a></td>
                            <td class="py-3">iOS client, in Swift.</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6"><a href="https://github.com/marmot-protocol/whitenoise-mac" class="text-glitch-700 hover:underline" target="_blank" rel="noopener noreferrer">whitenoise-mac</a></td>
                            <td class="py-3">macOS client, in Swift.</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6"><a href="https://github.com/marmot-protocol/whitenoise-android" class="text-glitch-700 hover:underline" target="_blank" rel="noopener noreferrer">whitenoise-android</a></td>
                            <td class="py-3">Android client, in Kotlin.</td>
                        </tr>
                        <tr class="border-b border-glitch-200">
                            <td class="py-3 pr-6"><a href="https://github.com/marmot-protocol/whitenoise-linux" class="text-glitch-700 hover:underline" target="_blank" rel="noopener noreferrer">whitenoise-linux</a></td>
                            <td class="py-3">Linux client, in Rust.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="text-glitch-700 mt-4">Everything else, including community projects, is at <a href="https://github.com/marmot-protocol" class="text-glitch-700 hover:underline" target="_blank" rel="noopener noreferrer">github.com/marmot-protocol</a></p>
        </section>

    </div>
</div>
