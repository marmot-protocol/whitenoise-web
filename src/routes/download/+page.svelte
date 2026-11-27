<script lang="ts">
import JsonLd from "#lib/components/JsonLd.svelte";
import Artwork from "#lib/components/site/Artwork.svelte";
import PageIntro from "#lib/components/site/PageIntro.svelte";
import PageMeta from "#lib/components/site/PageMeta.svelte";
import Action from "#lib/components/system/Action.svelte";
import Grid from "#lib/components/system/Grid.svelte";
import TextLink from "#lib/components/system/TextLink.svelte";

const options: {
    name: string;
    setup: string;
    downloads: {
        label: string;
        href: string;
        variant?: "primary" | "secondary";
    }[];
}[] = [
    {
        name: "iPhone",
        setup: "/docs/get-started/install/ios",
        downloads: [
            {
                label: "App Store",
                href: "https://apps.apple.com/app/id6773000993",
            },
        ],
    },
    {
        name: "Android",
        setup: "/docs/get-started/install/android",
        downloads: [
            {
                label: "Zapstore",
                href: "https://zapstore.dev/apps/dev.ipf.whitenoise.android",
            },
            {
                label: "Google Play",
                href: "https://play.google.com/store/apps/details?id=dev.ipf.whitenoise.android",
                variant: "secondary",
            },
            {
                label: "GitHub Release",
                href: "https://github.com/marmot-protocol/whitenoise-android/releases/latest",
                variant: "secondary",
            },
        ],
    },
];

const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "White Noise",
    applicationCategory: "CommunicationApplication",
    operatingSystem: ["iOS", "Android"],
    description: "Download the White Noise private messenger for iPhone and Android.",
    url: "https://www.whitenoise.chat/download",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    downloadUrl: options.flatMap(({ downloads }) => downloads.map(({ href }) => href)),
    isAccessibleForFree: true,
};
</script>

<PageMeta
    title="Download"
    description="Download White Noise for iPhone and Android."
    path="/download"
/>

<JsonLd {schema} />
<div class="site-width">
    <PageIntro
        title="Download White Noise"
        description="It takes two taps to create a profile."
    />
    <Grid columns={2} class="download-options">
        {#each options as option}
            <section class="download-option">
                <h2>{option.name}</h2>
                <div class="download-actions">
                    {#each option.downloads as download}
                        <Action
                            external
                            href={download.href}
                            label={download.label}
                            variant={download.variant}
                            icon="down"
                        />
                    {/each}
                </div>
                <TextLink href={option.setup}>Set up on {option.name}</TextLink>
            </section>
        {/each}
    </Grid>
    <section id="first-message" class="download-help">
        <div>
            <h2>Start or join a chat</h2>
            <p>
                To start a chat, use the other person’s profile link or QR code. If they need White Noise, send them the
                <TextLink href="/download">download link</TextLink>.
            </p>
            <p>
                If a friend sent you a download link, create a profile and send them your public profile link.
                In <strong>Settings</strong>, tap your profile, then <strong>Share Profile</strong> and
                <strong>Share Profile URL</strong>. When their invitation appears in <strong>Chats</strong>,
                open it and tap <strong>Accept</strong>.
            </p>
            <div class="download-help-links">
                <TextLink href="/docs/get-started/first-message/ios">First chat on iPhone</TextLink>
                <TextLink href="/docs/get-started/first-message/android">First chat on Android</TextLink>
                <TextLink href="/faq">See all questions</TextLink>
            </div>
        </div>
        <Artwork name="smith-chain" />
    </section>
</div>
