type Faq = {
    featured?: boolean;
    question: string;
    answer: string;
    link?: { label: string; href: string; external?: boolean };
};

export const agentsGuide = "/agents";

// Copy sources and verification requirements are recorded in README.md.
// Keep the visible answers and FAQ structured data on the same source.
export const faqGroups: { id: string; title: string; items: Faq[] }[] = [
    {
        id: "getting-started",
        title: "Getting started",
        items: [
            {
                question: "Is White Noise free?",
                featured: true,
                answer: "Yes. White Noise is free to download and open source. Running your own relay or choosing a paid relay service can have separate costs, but you do not need to run a server to get started.",
            },
            {
                question: "Which devices can I use?",
                featured: true,
                answer: "Our download page currently offers Android through Zapstore and a direct APK. App Store and Google Play links are not available yet. White Noise is in beta, so installation options and features may change between releases.",
                link: { label: "See download options", href: "/download" },
            },
            {
                question: "How do I find and add someone?",
                answer: "Exchange White Noise profiles using a profile link, QR code, or public key, then start a conversation in the app. Your public key identifies you and is safe to share. Your private key controls your identity: keep it secret and never send it to a contact.",
            },
            {
                question: "Can I use the same identity on multiple devices?",
                answer: "Linked-device support is still being developed in the Marmot protocol. Importing the same identity key on another device does not by itself transfer your conversations or their encryption state. Do not rely on a second installation as a synchronized backup of your chats.",
                link: {
                    label: "Read about multi-device development",
                    href: "/docs/marmot/features/multi-device.md",
                },
            },
        ],
    },
    {
        id: "privacy-and-identity",
        title: "Privacy and identity",
        items: [
            {
                question: "Who can read my messages?",
                featured: true,
                answer: "Messages are end-to-end encrypted for the participants in your conversation. White Noise and the relays carrying those messages cannot read their content. Participants can still copy or share what they receive, and someone with access to an unlocked or compromised device may be able to read messages on it.",
            },
            {
                question: "Does using White Noise make me anonymous?",
                answer: "No phone number or email is required, but that is not a guarantee of anonymity. Your public profile, the information you share, and network information such as your IP address can reveal things about you. You can choose a display name, including a pseudonym, while deciding what to share with others.",
            },
            {
                question: "Where are my messages and files stored?",
                answer: "Conversation data is stored on your device. Independent relays also store and forward encrypted message events; their retention policies vary. Media shared in encrypted conversations is encrypted before upload to media servers. Public profile information and profile pictures are public, and copies on independent servers may persist.",
                link: { label: "Read the privacy policy", href: "/privacy" },
            },
            {
                question: "What happens if I lose my phone or private key?",
                answer: "White Noise cannot reset or recover your private key for you. Keep a secure backup of your identity key, but remember that the key alone is not a backup of your message history. If a device or key is stolen, treat that identity as compromised and tell your contacts through another trusted channel. Encryption cannot erase messages already stored on the stolen device.",
            },
            {
                question: "What information does White Noise collect?",
                answer: "In-app usage and diagnostics sharing is off by default. If you enable it, it sends limited usage and reliability measurements, without message content, contacts, or account and group identifiers. Audit logs are a separate opt-in choice. Push notifications, public profiles, and services you connect to have their own data flows, all explained in the privacy policy.",
                link: { label: "See what is shared and when", href: "/privacy" },
            },
        ],
    },
    {
        id: "groups-and-network",
        title: "Groups and the network",
        items: [
            {
                question: "What is a relay?",
                answer: "A relay is a server that receives, stores, and forwards messages across the Nostr network. White Noise encrypts conversation content before sending it to relays. A relay operator can still observe connection information, such as your IP address, even though it cannot read the encrypted messages.",
            },
            {
                question: "What happens when a relay goes offline?",
                answer: "Marmot supports delivery through multiple relays so a conversation does not depend on one server. Other reachable relays shared by the conversation can continue carrying messages. Delivery can still be delayed if participants cannot reach a suitable relay or lose their internet connection.",
            },
            {
                question: "Can I choose my relays or run my own?",
                answer: "Yes. White Noise lets you configure relays, and you can run a compatible Nostr relay yourself. People in a conversation need a shared way to exchange messages, so relay choices must work for the group. Operating your own relay gives you control over that server, but does not give you control over copies held elsewhere.",
                link: { label: "Explore the protocol and tools", href: "/build" },
            },
            {
                question: "Can White Noise be blocked?",
                answer: "Yes. A network provider or government can block particular servers or restrict internet access. Independent relays reduce reliance on one operator and can provide alternative routes, but White Noise cannot guarantee connectivity. Encryption protects message content; it does not make network traffic invisible or impossible to block.",
            },
            {
                question: "What can group admins do?",
                answer: "Admins manage group membership, including adding and removing members under the group’s rules. Once a removal takes effect in the group’s encryption state, the removed member cannot decrypt new messages with their old keys. Removal does not erase messages they already received, saved, or shared.",
            },
        ],
    },
    {
        id: "agents",
        title: "Agents",
        items: [
            {
                question: "Which agents can I connect?",
                featured: true,
                answer: "MDK provides integrations for Hermes, OpenClaw, Codex, OpenCode, and Pi. Run the connector alongside your existing agent on a supported Mac or Linux computer, add its White Noise identity, and invite it to a conversation. The setup guide covers installation and which accounts are allowed to message it.",
                link: { label: "Connect your agent", href: agentsGuide },
            },
            {
                question: "What does encryption protect when I message an agent?",
                answer: "It protects the messages exchanged between White Noise and the agent’s connector from being read by the relays carrying them. The agent receives the message so it can respond. Its model provider, tools, and logging settings determine what happens after that; connecting through White Noise does not make a cloud model run locally.",
            },
        ],
    },
];

export const homepageFaqs = faqGroups.flatMap((group) => group.items).filter((faq) => faq.featured);

export function faqSchema(items: Faq[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
    };
}
