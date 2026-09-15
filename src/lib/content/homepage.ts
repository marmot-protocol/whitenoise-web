import type { ArtworkName } from "$lib/design-system/artwork";

type HomepageFeature = {
    title: string[];
    description: string;
    artwork: ArtworkName;
    id?: string;
    link?: { label: string; href: string };
};

export const homepageFeatures: HomepageFeature[] = [
    {
        title: ["Private messages.", "Private groups."],
        description:
            "Talk one to one or bring a group together. End-to-end encryption keeps your messages private between the people in the conversation. Even White Noise can’t read what you send.",
        artwork: "conversation",
        link: {
            label: "Why privacy matters",
            href: "/privacy-matters",
        },
    },
    {
        title: ["No phone number.", "No email."],
        description:
            "Choose a name and start connecting. No phone number, email address, or real name required. Create as many identities as you like. Use one for friends, another for work, or start fresh with people you’ve just met. You decide how you’re known.",
        artwork: "identity-balloon",
    },
    {
        title: ["All your AI", "in a single app"],
        description:
            "An agent is just another contact. Connect Hermes, OpenClaw, Codex, Claude Code, OpenCode or Pi and talk to them from your phone. They sit in the same list as everyone else, and they work before any of your friends are here.",
        artwork: "agent-contact",
        id: "agents",
        link: {
            label: "Connect your agent",
            href: "/agents",
        },
    },
    {
        title: ["No central server.", "No lock-in."],
        description:
            "White Noise delivers messages through independent servers called relays. Your identity isn’t tied to any one of them. Connect to multiple relays and switch whenever you want, keeping the same identity and contacts. You can even run your own relay and choose who you share it with.",
        artwork: "network-flower",
    },
    {
        title: ["We can’t lock you in."],
        description:
            "White Noise is built on Marmot, a free, open-source messaging protocol anyone can use or build on without asking permission. That opens the door to different apps with different styles and features. You can chat with people using other Marmot-compatible apps or switch to one yourself. Everyone gets to choose what suits them and still stay connected.",
        artwork: "band",
        id: "interoperability",
        link: {
            label: "Explore Marmot",
            href: "/docs/marmot/README.md",
        },
    },
    {
        title: ["Open source.", "Open standards."],
        description:
            "White Noise’s code is open for anyone to inspect, improve, or build on. You don’t have to take our word for how it works. Developers can check the code, help fix problems, or use it to create something of their own. Open standards let others build apps that work with it.",
        artwork: "children-plant",
        link: {
            label: "Explore the code",
            href: "/build",
        },
    },
    {
        title: ["Built with", "the community."],
        description:
            "Help make White Noise better. Share feedback, test new releases, translate, or contribute code and design. You don’t need to be a developer to make a difference. Simply telling us what feels confusing or what you wish worked better is a good place to start.",
        artwork: "smith-chain",
        link: {
            label: "Get involved",
            href: "/contribute",
        },
    },
];
