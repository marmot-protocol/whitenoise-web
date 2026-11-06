import type { ArtworkName } from "#lib/design-system/artwork.js";

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
            "Talk one to one or bring a group together. Every message is end-to-end encrypted with MLS, an open internet standard built for group chat. Only the people in the conversation can read it. Even White Noise can’t.",
        artwork: "conversation",
        link: {
            label: "Why privacy matters",
            href: "/privacy-matters",
        },
    },
    {
        title: ["No phone number.", "No email."],
        description:
            "Choose a name and start. White Noise doesn’t ask for a phone number, email address or real name. Create as many identities as you like: one for friends, one for work, a new one for people you’ve just met. You decide how you’re known.",
        artwork: "identity-balloon",
    },
    {
        title: ["All your AI", "in a single app"],
        description:
            "An agent is just another contact. Seven work today: Hermes, OpenClaw, Codex, Claude Code, OpenCode, Pi and Goose. Run the connector next to your agent on a Mac or Linux computer, then message it from your phone. It sits in the same list as everyone else, and it’s useful before any of your friends join.",
        artwork: "agent-contact",
        id: "agents",
        link: {
            label: "Connect your agent",
            href: "/agents",
        },
    },
    {
        title: ["No central server."],
        description:
            "White Noise delivers messages through independent servers called relays. You choose which ones to use, and your identity and contacts stay yours when you change them. A conversation can use several relays, so others can keep carrying messages if one goes offline. You can even run your own.",
        artwork: "network-flower",
    },
    {
        title: ["We can’t lock you in."],
        description:
            "White Noise is built on Marmot, an open messaging protocol anyone can build on without asking permission. That means other developers can create compatible apps, giving you more choice in how you connect.",
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
