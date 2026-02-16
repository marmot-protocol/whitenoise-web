<script lang="ts">
import Accordion from "$lib/components/Accordion.svelte";
import DownloadButton from "$lib/components/DownloadButton.svelte";
import FeatureSection from "$lib/components/FeatureSection.svelte";
import type { FeatureCard } from "$lib/types";

const featureCards: FeatureCard[] = [
    {
        imagePosition: "left",
        color: "light",
        imageUrl: "/images/mask-man.webp",
        title: "Privacy & Security",
        description:
            "White Noise secures conversations using strong cryptography, enforced by end-to-end encryption. With forward secrecy and post-compromise security, even if keys are exposed, your past and future messages stay hidden.",
    },
    {
        imagePosition: "right",
        color: "dark",
        imageUrl: "/images/balloon-girl.webp",
        title: "Identity Freedom",
        description:
            "Communicate without needing phone numbers or emails. Choose anonymity, a pseudonym, or your real name. Your identity, your rules.",
    },
    {
        imagePosition: "left",
        color: "light",
        imageUrl: "/images/hands.webp",
        title: "Open & Decentralized",
        description:
            "Built on open standards (Nostr, Blossom, and MLS) via the Marmot Protocol, White Noise lets you take your identity, data, and contacts across platforms. Switch apps anytime without losing connections.",
    },
    {
        imagePosition: "right",
        color: "dark",
        imageUrl: "/images/smoke.webp",
        title: "Distributed & Uncensorable",
        description:
            "No single entity controls the network. Thousands of independent nodes worldwide ensure censorship resistance. Run your own relay in minutes, no corporate servers needed.",
    },
    {
        imagePosition: "left",
        color: "light",
        imageUrl: "/images/race-car.webp",
        title: "Fast, Reliable, & Scalable",
        description:
            "Engineered for real-time performance, White Noise handles direct messages and group conversations with speed. Built for reliability at every scale.",
    },
    {
        imagePosition: "right",
        color: "dark",
        imageUrl: "/images/kids.webp",
        title: "Non-Profit & Community-Driven",
        description:
            "White Noise is a non-profit, community-driven project. We are not funded by any corporation, and we are not beholden to any government or organization. We are a group of volunteers who are passionate about privacy and security.",
    },
];

const faqs = [
    {
        question: "What makes White Noise unique?",
        answer: "White Noise stands out by merging Nostr&rsquo;s decentralized network with advanced encryption. Unlike traditional apps that rely on centralized servers, White Noise operates on Nostr, a system of independent relays anyone can run. This eliminates single points of failure, making the network resilient to censorship or shutdowns. Additionally, it uses the Messaging Layer Security (MLS) protocol to ensure end-to-end encryption even in massive groups, scaling securely for thousands of users without compromising speed or privacy.",
    },
    {
        question: "How does encryption work?",
        answer: "White Noise encrypts every message using MLS, a protocol designed for dynamic security. If a private key is leaked, past messages remain private due to forward secrecy, and future messages automatically regain protection through rotating encryption keys. This process, called post-compromise security, ensures that even if a breach occurs, attackers can&rsquo;t access ongoing conversations. All messages are encrypted before reaching Nostr relays, meaning no third party—whether the relay operator or an eavesdropper—can read the content.",
    },
    {
        question: "Can governments or ISPs block White Noise?",
        answer: "Blocking White Noise is extremely difficult. Nostr&rsquo;s decentralized structure lets users switch relays instantly if one is censored or taken down. Relays can also be self-hosted, allowing communities to maintain their own servers beyond the reach of centralized control. Combined with MLS encryption, which scrambles messages into unreadable data, this makes surveillance or censorship nearly impossible. Even if an ISP intercepts traffic, they&rsquo;ll see only encrypted metadata, revealing nothing about the message content.",
    },
    {
        question: "How does White Noise handle large groups without lag?",
        answer: "MLS uses a tree-based key structure that scales logarithmically, reducing the computational load on devices as groups grow. Nostr relays handle message routing efficiently, so adding members does not linearly increase encryption cost. The result is responsive group conversations without the bottlenecks of pairwise encryption schemes.",
    },
    {
        question: "Where does my data live?",
        answer: "Messages in White Noise are encrypted end-to-end and temporarily relayed through several Nostr servers, which cannot read them and don&rsquo;t permanently store them. Relays act as transient delivery points, discarding data after transmission. Users can further prioritize privacy by selecting trusted relays or hosting their own, ensuring no single entity retains control over their communications.",
    },
    {
        question: "What happens if a relay goes offline?",
        answer: "White Noise connects to multiple relays simultaneously, so if one fails or is blocked, others take over automatically. This redundancy ensures messages are delivered reliably, and groups remain active as long as at least one relay is operational. Users experience minimal disruption, even during network outages or targeted censorship attempts.",
    },
    {
        question: "Can admins remove or censor users in a group?",
        answer: "Group admins can evict members using MLS&rsquo;s cryptographic tools. Once removed, a user loses access to future messages and cannot rejoin without a new invite. Crucially, future conversations remain secure because encryption keys are rotated, preventing expelled members from decrypting newer messages.",
    },
    {
        question: "Is White Noise open source?",
        answer: "Yes, White Noise is fully open source, allowing anyone to inspect its code and verify security claims. Transparency is core to its design, fostering trust in its encryption methods and ensuring accountability. Open-source development also encourages collaboration, enabling rapid improvements and community-driven audits.",
    },
    {
        question: "Can I use White Noise on multiple devices?",
        answer: "White Noise supports multi-device access through MLS&rsquo;s &ldquo;leaf nodes,&rdquo; which treat each device—phone, laptop, tablet—as a separate participant in the encryption process. This lets users join the same groups across devices without sacrificing security. Keys are stored locally on each device, ensuring seamless synchronization while maintaining end-to-end encryption.",
    },
    {
        question: "How Does White Noise Stay Secure Long-Term?",
        answer: "MLS&rsquo;s protocol agility allows White Noise to adopt new cryptographic standards, such as quantum-resistant algorithms, without overhauling the app. This future-proofs the app against evolving threats. Additionally, Nostr&rsquo;s decentralized relay network can independently upgrade cryptographic tools, ensuring resilience against both technological advances and institutional interference.",
    },
    {
        question: "What if I don&rsquo;t trust public relays?",
        answer: "Users concerned about public relays can self-host their own servers or join private relays operated by trusted communities. This gives full control over where data travels, eliminating reliance on third-party infrastructure. Self-hosting also shields users from potential relay abuse or data retention policies.",
    },
    {
        question: "How Do I Know My Messages Are Private?",
        answer: "MLS encryption ensures that only group members can decrypt messages. Relays receive only scrambled data, making it unreadable to operators or hackers. Even if a relay is compromised, attackers gain nothing but ciphertext—a jumble of characters with no meaningful information.",
    },
    {
        question: "What Happens If My Device Gets Stolen?",
        answer: "Immediately remove the compromised device from your groups using another device. MLS&rsquo;s post-compromise security guarantees that future messages remain protected, as encryption keys are rotated. Stolen devices cannot access new messages without rejoining through an invite, which admins can block entirely.",
    },
    {
        question: "Is It Free to Use?",
        answer: "Yes, White Noise is free and open source. While running a private relay or using premium relays may incur minor costs, the core application and basic usage are entirely free. This ensures accessibility while empowering users to customize their experience.",
    },
];

let openFaqIndices: number[] = [];

function toggleFaq(index: number) {
    if (openFaqIndices.includes(index)) {
        openFaqIndices = openFaqIndices.filter((i) => i !== index);
    } else {
        openFaqIndices = [...openFaqIndices, index];
    }
}

function stripHtmlEntities(text: string): string {
    return text
        .replace(/&rsquo;/g, "'")
        .replace(/&lsquo;/g, "'")
        .replace(/&ldquo;/g, '"')
        .replace(/&rdquo;/g, '"')
        .replace(/&mdash;/g, "-")
        .replace(/&ndash;/g, "-")
        .replace(/&hellip;/g, "...")
        .replace(/&nbsp;/g, " ")
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number.parseInt(dec, 10)))
        .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(Number.parseInt(hex, 16)))
        .replace(/&amp;/g, "&");
}

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": stripHtmlEntities(faq.question),
        "acceptedAnswer": {
            "@type": "Answer",
            "text": stripHtmlEntities(faq.answer)
        }
    }))
};
</script>

<svelte:head>
    {@html '<script type="application/ld+json">' + JSON.stringify(faqSchema) + '</script>'}
</svelte:head>

<div class="hero flex flex-col md:flex-row items-center justify-between px-0 bg-glitch-950 bg-[url('/images/blocks-background.webp')] bg-no-repeat bg-center-bottom md:bg-right bg-cover">
    <div class="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12">
        <div class="flex flex-col gap-4 max-w-xl flex-1 justify-center text-center md:text-left items-center md:items-start shrink-0">
            <h1 class="text-6xl font-bold text-glitch-50">White Noise</h1>
            <p class="text-xl text-glitch-200 font-medium">A secure and private messenger that&rsquo;s lightning fast, scalable, and identity-free.</p>
            <DownloadButton />
        </div>
        <div class="max-w-3xl shrink">
            <img src="/images/lady-noise.webp" alt="Lady Noise Statue" class="relative object-contain drop-shadow-2xl top-8" />
        </div>
    </div>
</div>

<div class="max-w-7xl mx-auto w-full px-6 md:px-12 my-8 flex flex-col gap-4 items-center">
    <h2 class="text-2xl font-medium text-glitch-800">Supported By</h2>
    <div class="flex flex-col md:flex-row gap-4 md:gap-x-8 my-4">
        <a href="https://opensats.org" target="_blank" class="py-4 px-8 md:py-6 md:px-12 bg-glitch-950 flex items-center justify-center w-64 hover:bg-glitch-800 transition-colors">
            <img src="/images/opensats.svg" alt="OpenSats Logo" class="max-w-48 w-40 bg-transparent" />
        </a>
        <a href="https://hrf.org" target="_blank" class="py-4 px-8 md:py-6 md:px-12 bg-glitch-950 flex items-center justify-center w-64 hover:bg-glitch-800 transition-colors">
            <img src="/images/hrf.svg" alt="Human Rights Foundation Logo" class="max-w-64" />
        </a>
        <a href="https://andotherstuff.org" target="_blank" class="py-4 px-8 md:py-6 md:px-12 bg-glitch-950 flex items-center justify-center w-64 hover:bg-glitch-800 transition-colors">
            <img src="/images/aos.svg" alt="And Other Stuff Logo" class="max-w-24 bg-transparent" />
        </a>
    </div>
</div>

<div class="max-w-7xl mx-auto w-full">
    <div class="flex flex-col gap-8 px-6 md:px-12 py-8 md:py-12 justify-center text-center md:text-left items-center md:items-start">
        {#each featureCards as card}
            <FeatureSection featureCard={card} />
        {/each}
    </div>
</div>

<!-- FAQ Section -->
<div id="faqs" class="max-w-3xl mx-auto w-full mt-8 mb-16 flex flex-col gap-2">
    {#each faqs as faq, i}
        <Accordion
            question={faq.question}
            answer={faq.answer}
            open={openFaqIndices.includes(i)}
            onClick={() => toggleFaq(i)}
        />
    {/each}
</div>
