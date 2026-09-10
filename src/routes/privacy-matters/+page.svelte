<script lang="ts">
import JsonLd from "$lib/components/JsonLd.svelte";
import PageIntro from "$lib/components/rebuild/PageIntro.svelte";
import TextLink from "$lib/components/system/TextLink.svelte";

const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Privacy is part of being human.",
    description: "Why private conversations matter, and how White Noise approaches them.",
    url: "https://www.whitenoise.chat/privacy-matters",
    author: { "@type": "Organization", name: "White Noise" },
};
</script>

<svelte:head
    ><title>Privacy matters — White Noise</title><link
        rel="canonical"
        href="https://www.whitenoise.chat/privacy-matters"
    /><meta
        name="description"
        content="Private conversations give us room to think, connect, and be ourselves. Read about the principles behind White Noise."
    /></svelte:head
>
<JsonLd {schema} />
<div class="site-width">
    <PageIntro
        title="Privacy is part of being human."
        description="A conversation with a friend. A question you’re not ready to ask out loud. An idea that needs room to grow."
    />
    <div class="privacy-essay">
        <article class="article-body">
            <section id="room">
                <h2>Room to be yourself.</h2>
                <p>
                    We speak differently when we know someone is listening. Private spaces let us
                    work things out, change our minds, and connect without performing for an
                    audience.
                </p>
                <p>
                    That space should exist online, too. The everyday messages we send deserve the
                    same care as a conversation behind a closed door.
                </p>
            </section>
            <section id="encryption">
                <h2>Privacy, built into the conversation.</h2>
                <p>
                    White Noise uses end-to-end encryption through the Marmot Protocol. Messages are
                    encrypted for the people in the conversation, rather than made readable to the
                    relays that carry them.
                </p>
                <p>
                    You don’t need a phone number or email to create an identity. And because the
                    software is open source, its approach is there for people to inspect and
                    improve.
                </p>
            </section>
            <section id="choice">
                <h2>A choice worth keeping.</h2>
                <p>
                    We want a world where private communication is ordinary. Where it’s easy to
                    reach people without giving up control of every conversation along the way.
                </p>
                <p>
                    White Noise is one contribution to that work. It’s still growing, and there’s
                    room for you to help shape it.
                </p>
            </section>
<section id="practice">
        <h2>Holding Ourselves to It</h2>
        <p>
            An argument like this one is only worth as much as the practice behind it. White Noise has no accounts and no servers holding your conversations. Your keys are generated and stay on your device, every message is end-to-end encrypted before it leaves, and group messages are published under ephemeral keypairs so that even the relays carrying them cannot tell who sent what. We cannot read your messages, and we cannot see who you talk to.
        </p>
        <p>
            We do want to know whether the app actually works&mdash;which features people use, and where things break. So we ask. Sharing usage and diagnostics is off until you turn it on, declining costs you nothing, and what we collect is deliberately built so it cannot identify you: bucketed counts and timings drawn from a fixed list of events, with no message content, no public keys, and no account, group, or contact information. We use our own servers for it rather than a third-party analytics company, and there are no advertising identifiers or trackers in the app at all.
        </p>
        <p>
            Asking for permission is easy to claim and harder to document, so we wrote down exactly what leaves your device, what our servers can and cannot infer from it, and how long any of it is kept. You can read all of it in our <TextLink href="/privacy">privacy policy</TextLink>.
        </p>
    </section>
            <nav class="privacy-resources" aria-label="Privacy documents">
                <TextLink href="/canary">Canary</TextLink>
                <TextLink href="/privacy">Privacy Policy</TextLink>
            </nav>
        </article>
    </div>
</div>
