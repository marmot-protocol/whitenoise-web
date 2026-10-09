<script lang="ts">
import "@fontsource-variable/manrope";
import "./base.css";
import "$lib/design-system/tokens.css";
import "$lib/design-system/primitives.css";
import "../site.css";
import "$lib/design-system/typography.css";
import "./relay.css";
import { onMount } from "svelte";
import PageIntro from "$lib/components/site/PageIntro.svelte";
import Action from "$lib/components/system/Action.svelte";
import Container from "$lib/components/system/Container.svelte";
import CopyButton from "$lib/components/system/CopyButton.svelte";
import Surface from "$lib/components/system/Surface.svelte";
import Text from "$lib/components/system/Text.svelte";
import TextLink from "$lib/components/system/TextLink.svelte";
import RelayHeader from "./RelayHeader.svelte";

let { region }: { region: "us" | "eu" } = $props();
const label = $derived(region === "us" ? "United States" : "Europe");
const address = $derived(`wss://relay.${region}.whitenoise.chat`);
const other = $derived(region === "us" ? "eu" : "us");

onMount(() => {
    const root = document.documentElement;
    const footer = document.querySelector(".relay-footer");
    if (!footer) return;
    // Match the exposed canvas to the visible page edge, including rubber-band scrolling.
    const syncCanvas = () => {
        root.dataset.relayEdge =
            footer.getBoundingClientRect().top < window.innerHeight ? "bottom" : "top";
        document
            .querySelector('meta[name="theme-color"]')
            ?.setAttribute("content", getComputedStyle(root).backgroundColor);
    };
    const observer = new IntersectionObserver(syncCanvas);
    observer.observe(footer);
    window.addEventListener("wn-theme-change", syncCanvas);
    syncCanvas();
    return () => {
        observer.disconnect();
        window.removeEventListener("wn-theme-change", syncCanvas);
        delete root.dataset.relayEdge;
    };
});

const kinds = [
    [0, "Profile metadata"],
    [3, "Follow lists"],
    [5, "Deletion requests"],
    [303, "Canary attestations"],
    [445, "Marmot group events"],
    [1059, "Gift wraps, including Welcomes"],
    [10000, "Mute lists"],
    [10002, "Relay lists"],
    [10050, "Inbox relay lists"],
    [24133, "Remote signing (NIP-46)"],
    [30443, "MLS KeyPackages"],
] as const;
</script>

<svelte:head>
    <title>White Noise {region.toUpperCase()} relay</title>
    <meta name="description" content={`${label} Nostr relay operated by Internet Privacy Foundation for White Noise. Connection details, accepted event kinds and relay limits.`} />
    <link rel="canonical" href={`https://relay.${region}.whitenoise.chat/`} />
</svelte:head>

<div class="wn-site">
    <a class="skip-link" href="#main-content">Skip to content</a>
    <RelayHeader />
    <main id="main-content" tabindex="-1">
        <Container>
            <PageIntro title={`White Noise ${region.toUpperCase()} relay.`}>
                {#snippet description()}
                    A Nostr relay in {label === "Europe" ? "Europe" : "the United States"} for <a class="relay-inline-link" href="https://www.whitenoise.chat/">White Noise</a> and encrypted group messaging. Operated by <a class="relay-inline-link" href="https://ipf.dev/">Internet Privacy Foundation</a>.
                {/snippet}
            </PageIntro>
            <Surface class="relay-connect" tone="ink" label="Connect your client">
                <div class="relay-address">
                    <div class="relay-address-copy">
                        <p class="type-heading">wss://relay.{region}.<wbr />whitenoise.chat</p>
                        <p class="relay-connect-help type-small">Add this address to a compatible Nostr client.</p>
                    </div>
                    <CopyButton value={address} label={`${region.toUpperCase()} relay address`} buttonLabel="Copy address" />
                </div>
            </Surface>

            <div class="relay-details">
                <section class="relay-section">
                    <Text as="h2" role="section">Built for messaging.</Text>
                    <Text tone="muted">This relay accepts the event kinds White Noise needs. It isn’t a general-purpose Nostr relay.</Text>
                    <dl class="relay-kinds type-body">
                        {#each kinds as [kind, description]}
                            <div><dt>{kind}</dt><dd>{description}</dd></div>
                        {/each}
                    </dl>
                </section>
                <div class="relay-supporting">
                    <section class="relay-section">
                        <Text as="h2" role="heading">Relay limits.</Text>
                        <dl class="relay-limits type-body">
                            <div><dt>Maximum event size</dt><dd>2 MiB</dd></div>
                            <div><dt>WebSocket message limit</dt><dd>4 MiB</dd></div>
                        </dl>
                    </section>
                    <section class="relay-section">
                        <Text as="h2" role="heading">Find missing events.</Text>
                        <Text tone="muted">Supports NIP-77 reconciliation (Negentropy) to help compatible clients find and recover missing events.</Text>
                    </section>
                    <section class="relay-section">
                        <Text as="h2" role="heading">Our other relay.</Text>
                        <Text tone="muted">White Noise also operates a relay in {other === "eu" ? "Europe" : "the United States"}.</Text>
                        <TextLink href={`https://relay.${other}.whitenoise.chat/`}>Visit the {other.toUpperCase()} relay</TextLink>
                    </section>
                </div>
            </div>
        </Container>
    </main>
    <footer class="relay-footer">
        <div class="relay-footer-inner site-width">
        <div class="relay-footer-copy type-caption tone-muted">
            <p>© {new Date().getFullYear()} <a class="relay-inline-link" href="https://ipf.dev">Internet Privacy Foundation</a></p>
            <p>{region.toUpperCase()} relay · <a class="relay-inline-link" href="https://github.com/hoytech/strfry/releases/tag/1.1.3">strfry 1.1.3</a> · <a class="relay-inline-link" href="https://github.com/hoytech/strfry/commit/16c00df04e264f4d68db5e10a48127f015c7824b">Source 16c00df</a></p>
        </div>
        <Action href="https://www.whitenoise.chat/" label="Visit White Noise" icon="external" />
        </div>
    </footer>
</div>
