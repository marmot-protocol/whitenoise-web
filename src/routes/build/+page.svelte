<script lang="ts">
import JsonLd from "$lib/components/JsonLd.svelte";
import PageIntro from "$lib/components/rebuild/PageIntro.svelte";

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

<div class="site-width">
    <PageIntro
        eyebrow="For builders"
        title="Private by design. Open to build on."
        description="Explore the Marmot Protocol and the tools behind White Noise. Build on open standards, with room for your own ideas."
    />
    <div class="technical-content">
        <!-- Quick Start -->
        <section>
            <h2>Quick Start (Rust)</h2>
            <p>The MDK (Marmot Development Kit) is the Rust implementation workspace for Marmot. The toolchain is pinned by <code>rust-toolchain.toml</code>, currently 1.97.1. SQLCipher and OpenSSL are vendored, so you need a C compiler but no system SQLite.</p>
            <pre><code>git clone https://github.com/marmot-protocol/mdk.git
cd mdk
cargo build

# Engine boundary tests
cargo test -p cgka-engine

# Fast pre-push gate: formatting, compile checks, clippy
just fast-ci</code></pre>
        </section>

        <!-- MDK Crates -->
        <section>
            <h2>MDK Crates</h2>
            <p>The workspace is modular. These are the crates a client author usually touches:</p>
            <div class="technical-scroll">
                <table>
                    <thead>
                        <tr>
                            <th>Crate</th>
                            <th>Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>marmot-app</td>
                            <td>Multi-account app runtime. The entry point for most clients, and what the CLI, daemon, TUI, and bindings are built on.</td>
                        </tr>
                        <tr>
                            <td>marmot-uniffi</td>
                            <td>UniFFI bindings over the app runtime, used by the Swift and Kotlin clients.</td>
                        </tr>
                        <tr>
                            <td>marmot-account</td>
                            <td>Account records, key storage, and transport orchestration.</td>
                        </tr>
                        <tr>
                            <td>cgka-engine</td>
                            <td>OpenMLS-backed group key agreement engine and local group state machine.</td>
                        </tr>
                        <tr>
                            <td>transport-nostr-adapter</td>
                            <td>Nostr transport behind an injectable relay-client boundary.</td>
                        </tr>
                        <tr>
                            <td>storage-sqlite</td>
                            <td>SQLCipher-backed persistence for sessions and engine state.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>There are more crates in the workspace — conformance simulator, QUIC agent-stream transports, forensic audit logging, CLI and daemon. The <a href="https://github.com/marmot-protocol/mdk#repository-map" target="_blank" rel="noopener noreferrer">repository map</a> lists all of them.</p>
        </section>

        <!-- Nostr Event Kinds -->
        <section>
            <h2>Nostr Event Kinds</h2>
            <p>Two kinds carry the parts of Marmot you will implement first:</p>
            <div class="technical-scroll">
                <table>
                    <thead>
                        <tr>
                            <th>Kind</th>
                            <th>Purpose</th>
                            <th>Notes</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>30443</td>
                            <td>KeyPackage</td>
                            <td>Addressable event advertising an MLS KeyPackage, so others can add you to a group while you are offline. Its tags carry the MLS ciphersuite, extensions, proposals, and app components you support.</td>
                        </tr>
                        <tr>
                            <td>445</td>
                            <td>Group message</td>
                            <td>An MLS message for one group, encrypted with ChaCha20-Poly1305. Carries a single <code>h</code> tag holding the group's routing id, and is signed by a fresh ephemeral keypair rather than your identity key.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>Marmot also reuses standard Nostr kinds for Welcomes (NIP-59 gift wrap), relay lists, and push notifications. The complete list lives in the spec's <a href="https://github.com/marmot-protocol/marmot/blob/master/foundation/registries.md" target="_blank" rel="noopener noreferrer">event kind registry</a>.</p>
        </section>

        <!-- Default Ciphersuite -->
        <section>
            <h2>Default Ciphersuite</h2>
            <p>Every Marmot implementation must support MLS ciphersuite 0x0001:</p>
            <pre><code>MLS_128_DHKEMX25519_AES128GCM_SHA256_Ed25519</code></pre>
            <p>X25519 for key exchange, AES-128-GCM for encryption, SHA-256 for hashing, Ed25519 for signatures. Clients may support more suites, but a group can only use one that every member supports.</p>
        </section>

        <!-- Identity Model -->
        <section>
            <h2>Identity Model</h2>
            <ul>
                <li>Nostr keypairs are identity: the 32-byte public key is the MLS <code>BasicCredential</code></li>
                <li>MLS leaf signature keys are separate from your Nostr identity key</li>
                <li>Each leaf carries a proof that the named account authorized that leaf's MLS signature key. A joiner rejects any leaf whose proof does not verify</li>
                <li>Compromise of a Nostr identity key does not by itself decrypt a group's message history</li>
                <li>Each device is its own MLS leaf, which is how multi-device works</li>
            </ul>
        </section>

        <!-- Basic Client Flow -->
        <section>
            <h2>Basic Client Flow</h2>
            <ol>
                <li><span>Generate identity:</span> create or import a Nostr keypair</li>
                <li><span>Publish a KeyPackage:</span> build an MLS KeyPackage and publish it as a kind:30443 event, with the proof that binds its leaf signature key to your account</li>
                <li><span>Create a group:</span> initialize an MLS group whose GroupContext carries the <code>required_capabilities</code> and <code>app_data_dictionary</code> extensions, the latter holding Marmot's app components such as admin policy and group profile</li>
                <li><span>Invite members:</span> consume their published KeyPackages, commit the Add, then deliver a Welcome to each invitee, gift-wrapped to the inbox relays they advertise</li>
                <li><span>Send messages:</span> derive <code>group_event_key</code> from the epoch's MLS exporter, encrypt the serialized MLS message with ChaCha20-Poly1305 under a random 12-byte nonce, and publish <code>base64(nonce || ciphertext)</code> as kind:445 signed by a fresh ephemeral keypair</li>
                <li><span>Receive messages:</span> subscribe to kind:445 filtered by the group's <code>h</code> tag, verify the event, then decrypt and process the MLS message. Sender identity comes from the MLS message inside, never from the event's ephemeral pubkey</li>
            </ol>
        </section>

        <!-- Spec Surfaces -->
        <section>
            <h2>Spec Surfaces</h2>
            <p>The protocol spec is organized by surface. Start with the one that owns the rule you need:</p>
            <div class="technical-scroll">
                <table>
                    <thead>
                        <tr>
                            <th>Surface</th>
                            <th>What it defines</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><a href="https://github.com/marmot-protocol/marmot/blob/master/foundation/README.md" target="_blank" rel="noopener noreferrer">foundation</a></td>
                            <td>The invariants that make an implementation Marmot: identity, KeyPackages, message shape, MLS choices, encodings, registries.</td>
                        </tr>
                        <tr>
                            <td><a href="https://github.com/marmot-protocol/marmot/blob/master/protocol-core/README.md" target="_blank" rel="noopener noreferrer">protocol-core</a></td>
                            <td>What clients do with group state: setup, joining, messaging, processing inbound bytes, convergence, departure, retained history.</td>
                        </tr>
                        <tr>
                            <td><a href="https://github.com/marmot-protocol/marmot/blob/master/app-components/README.md" target="_blank" rel="noopener noreferrer">app-components</a></td>
                            <td>Versioned group-state payloads carried in the MLS <code>app_data_dictionary</code>: admin policy, group profile, routing, media, retention.</td>
                        </tr>
                        <tr>
                            <td><a href="https://github.com/marmot-protocol/marmot/blob/master/transports/README.md" target="_blank" rel="noopener noreferrer">transports</a></td>
                            <td>How Marmot bytes move over a network. Nostr relays today, with a QUIC binding for agent streams.</td>
                        </tr>
                        <tr>
                            <td><a href="https://github.com/marmot-protocol/marmot/blob/master/features/README.md" target="_blank" rel="noopener noreferrer">features</a></td>
                            <td>Optional, user-visible flows spanning several surfaces: encrypted media, push notifications, multi-device, agent text streams.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>The spec is adopted. Older MIP-numbered documents describe a deprecated version of the protocol; the spec's <a href="https://github.com/marmot-protocol/marmot/blob/master/mip-coverage.md" target="_blank" rel="noopener noreferrer">MIP coverage map</a> shows where each one landed. Full specification: <a href="https://github.com/marmot-protocol/marmot" target="_blank" rel="noopener noreferrer">github.com/marmot-protocol/marmot</a></p>
        </section>

        <!-- Known Limitations -->
        <section>
            <h2>Known Limitations</h2>
            <ul>
                <li>Every Welcome carries the group's full MLS ratchet tree, and out-of-band tree distribution is not supported, so Welcome size grows with the group. Very large groups can exceed relay limits.</li>
                <li>White Noise is in beta.</li>
            </ul>
        </section>

        <!-- Key Dependencies -->
        <section>
            <h2>Key Dependencies</h2>
            <div class="technical-scroll">
                <table>
                    <thead>
                        <tr>
                            <th>Library</th>
                            <th>Purpose</th>
                            <th>Repository</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>OpenMLS</td>
                            <td>Rust MLS implementation</td>
                            <td><a href="https://github.com/openmls/openmls" target="_blank" rel="noopener noreferrer">github.com/openmls/openmls</a></td>
                        </tr>
                        <tr>
                            <td>rust-nostr</td>
                            <td>Nostr protocol support</td>
                            <td><a href="https://github.com/rust-nostr/nostr" target="_blank" rel="noopener noreferrer">github.com/rust-nostr/nostr</a></td>
                        </tr>
                        <tr>
                            <td>Blossom</td>
                            <td>Content-addressed media storage</td>
                            <td><a href="https://github.com/hzrd149/blossom" target="_blank" rel="noopener noreferrer">github.com/hzrd149/blossom</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Repositories -->
        <section>
            <h2>Repositories</h2>
            <div class="technical-scroll">
                <table>
                    <thead>
                        <tr>
                            <th>Repository</th>
                            <th>Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><a href="https://github.com/marmot-protocol/mdk" target="_blank" rel="noopener noreferrer">mdk</a></td>
                            <td>Marmot Development Kit. The Rust implementation workspace.</td>
                        </tr>
                        <tr>
                            <td><a href="https://github.com/marmot-protocol/marmot" target="_blank" rel="noopener noreferrer">marmot</a></td>
                            <td>The protocol specification.</td>
                        </tr>
                        <tr>
                            <td><a href="https://github.com/marmot-protocol/marmot-ts" target="_blank" rel="noopener noreferrer">marmot-ts</a></td>
                            <td>TypeScript implementation, built on ts-mls. Under active development.</td>
                        </tr>
                        <tr>
                            <td><a href="https://github.com/marmot-protocol/whitenoise-ios" target="_blank" rel="noopener noreferrer">whitenoise-ios</a></td>
                            <td>iOS client, in Swift.</td>
                        </tr>
                        <tr>
                            <td><a href="https://github.com/marmot-protocol/whitenoise-mac" target="_blank" rel="noopener noreferrer">whitenoise-mac</a></td>
                            <td>macOS client, in Swift.</td>
                        </tr>
                        <tr>
                            <td><a href="https://github.com/marmot-protocol/whitenoise-android" target="_blank" rel="noopener noreferrer">whitenoise-android</a></td>
                            <td>Android client, in Kotlin.</td>
                        </tr>
                        <tr>
                            <td><a href="https://github.com/marmot-protocol/whitenoise-linux" target="_blank" rel="noopener noreferrer">whitenoise-linux</a></td>
                            <td>Linux client, in Rust.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>Everything else, including community projects, is at <a href="https://github.com/marmot-protocol" target="_blank" rel="noopener noreferrer">github.com/marmot-protocol</a></p>
        </section>

    </div>
</div>
