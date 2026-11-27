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

type HomepageTestimonial = {
    name: string;
    context?: string;
    quote: string;
    source: string;
    avatar: string;
};

export const homepageTestimonials: HomepageTestimonial[] = [
    {
        name: "Guy Swann",
        avatar: "guy-swann",
        context: "Host of Bitcoin Audible",
        quote: "Just switched to White Noise for my agent conversation … This is so cool",
        source: "https://x.com/TheGuySwann/status/2103592338451013740",
    },
    {
        name: "GIGAZINE",
        avatar: "gigazine",
        context: "Hands-on review",
        quote: "White Noise is free to use and does not require an email address or phone number to register",
        source: "https://gigazine.net/gsc_news/en/20250714-whitenoise-chat-secure-messaging-nostr/",
    },
    {
        name: "Forever Laura",
        avatar: "forever-laura",
        context: "@Laurastacksats",
        quote: "You’ll be amazed at how much it’s improved in just a few months. Private messaging is here, folks.",
        source: "https://x.com/Laurastacksats/status/2052682296843461109",
    },
    {
        name: "Juraj Bednár",
        avatar: "juraj-bednar",
        context: "Creator of Third Ear",
        quote: "I now use White Noise primarily and SimpleX secondarily, and I talk to my Hermes agent over White Noise too.",
        source: "https://primal.net/e/2efa11b75832b86256eaec439bc9031f4de1ffeffa925e306d06dd78c7b8b0ea",
    },
    {
        name: "GG",
        avatar: "gg",
        context: "@UnruggableGG",
        quote: "it's getting super close to the Signal UX.",
        source: "https://x.com/UnruggableGG/status/2118729627677991058",
    },
    {
        name: "Alien Investor",
        avatar: "alien-investor",
        quote: "I’m an active White Noise Messenger user and I genuinely love it — the app feels solid, clean, and reliable.",
        source: "https://primal.net/e/5db2836f29392ec286ccc860e08f9da85fc4024d4c712ed6223fa2af65d3d9fa",
    },
    {
        name: "FBO Developments Sàrl",
        avatar: "fbo",
        quote: "Very nice. Good candidate to replace some of my Signal groups!",
        source: "https://primal.net/e/00005ab65cd0613068d19bc4bedad09dda00b474d409abd4dab4e70f87adc27c",
    },
    {
        name: "Felipe Fenton",
        avatar: "felipe-fenton",
        quote: "I've been using it to control my Hermes agent, and I absolutely love it so far. Great job, guys!",
        source: "https://primal.net/e/f243f4e8fdd2ce0d4841e6dec4942ec9151e6802ab9badeee0e5eb3064f91633",
    },
    {
        name: "pyYTn9",
        avatar: "pyytn9",
        context: "@tn9_py",
        quote: "@whitenoisechat works so well with my agents - thanks for getting this working so well. UX is brill!",
        source: "https://x.com/tn9_py/status/2119788919327772748",
    },
];
