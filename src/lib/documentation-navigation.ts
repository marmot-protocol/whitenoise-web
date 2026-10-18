import { agentRuntimes } from "$lib/documentation";

export type GuideArea = "agents" | "builders" | "marmot" | "documentation";
export const guideInfo = {
    documentation: {
        title: "Documentation",
        path: "/docs",
        navigationLabel: "Documentation sections",
        description: "Task guides, Settings and troubleshooting for White Noise.",
    },
    agents: {
        title: "Agents",
        path: "/agents",
        navigationLabel: "Agent guide sections",
        description:
            "Bring your agent into a White Noise conversation. Choose your runtime and get started.",
    },
    builders: {
        title: "For developers",
        path: "/build",
        navigationLabel: "Developer guide sections",
        description:
            "Build a messaging client with Marmot. Choose a library, understand the basics, and explore the code.",
    },
    marmot: {
        title: "Marmot Protocol",
        path: "/docs/marmot/README.md",
        navigationLabel: "Protocol guide sections",
        description:
            "A short introduction to the protocol behind White Noise: identities, encrypted groups, and message delivery.",
    },
};
const sections = {
    documentation: [
        ["get-started", "Get started"],
        ["using", "Using White Noise"],
        ["settings", "Settings"],
        ["troubleshooting", "Troubleshooting"],
        ["agents", "Agents"],
        ["build", "Build"],
    ],
    agents: [
        ["getting-started", "Getting started"],
        ["hermes", "Hermes"],
        ["openclaw", "OpenClaw"],
        ["codex", "Codex"],
        ["claude", "Claude"],
        ["opencode", "OpenCode"],
        ["pi", "Pi"],
    ],
    builders: [
        ["getting-started", "Getting started"],
        ["mdk", "MDK"],
        ["typescript", "TypeScript"],
        ["client-flow", "Client flow"],
        ["protocol-basics", "Protocol basics"],
        ["repositories-heading", "Repositories"],
    ],
    marmot: [
        ["getting-started", "Getting started"],
        ["identity", "Identity"],
        ["groups-and-encryption", "Groups and encryption"],
        ["message-delivery", "Message delivery"],
    ],
};
function linksFor(area: GuideArea) {
    return sections[area].map(([id, label]) => ({
        id,
        label,
        href: `${guideInfo[area].path}#${id}`,
    }));
}
export const guideLinks = {
    documentation: linksFor("documentation"),
    agents: linksFor("agents"),
    builders: linksFor("builders"),
    marmot: linksFor("marmot"),
};

export function activeGuide(area: GuideArea, pathname: string, hash: string): string {
    if (pathname === guideInfo[area].path) {
        return guideLinks[area].find((link) => hash === `#${link.id}`)?.id || "getting-started";
    }
    if (area === "agents") {
        return (
            agentRuntimes.find(
                (runtime) =>
                    pathname === `/agents/${runtime}` ||
                    pathname.startsWith(`/agents/${runtime}/`) ||
                    pathname.startsWith(`/docs/mdk/integrations/${runtime}/`)
            ) || "getting-started"
        );
    }
    if (area === "builders" && pathname.startsWith("/docs/mdk/")) return "mdk";
    return "getting-started";
}

/** The last section reaching the reading line stays active until the next arrives. */
export function guideAtPosition(sections: { id: string; top: number }[], readingLine: number) {
    let current = sections[0]?.id;
    for (const section of sections) {
        if (section.top > readingLine) break;
        current = section.id;
    }
    return current;
}
