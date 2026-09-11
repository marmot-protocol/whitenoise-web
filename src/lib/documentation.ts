export const repositoryGroups = [
    {
        name: "Libraries",
        repositories: [
            {
                name: "MDK",
                description:
                    "The Marmot Development Kit. Rust libraries for building messaging clients.",
                href: "https://github.com/marmot-protocol/mdk",
            },
            {
                name: "marmot-ts",
                description: "The TypeScript implementation of Marmot.",
                href: "https://github.com/marmot-protocol/marmot-ts",
            },
        ],
    },
    {
        name: "Apps",
        repositories: [
            {
                name: "iOS",
                description: "The native iPhone app, built in Swift.",
                href: "https://github.com/marmot-protocol/whitenoise-ios",
            },
            {
                name: "Android",
                description: "The native Android app, built in Kotlin.",
                href: "https://github.com/marmot-protocol/whitenoise-android",
            },
            {
                name: "macOS",
                description: "The native Mac app, built in Swift.",
                href: "https://github.com/marmot-protocol/whitenoise-mac",
            },
            {
                name: "Linux",
                description: "The native Linux app, built in Rust.",
                href: "https://github.com/marmot-protocol/whitenoise-linux",
            },
        ],
    },
];

export const agentRuntimes = ["hermes", "openclaw", "codex", "opencode", "pi"] as const;
export type DocsRepo = "mdk" | "marmot";
export type DocSource = { repo: DocsRepo; path: string };
export type Documentation = {
    title: string;
    html: string;
    headings: { id: string; text: string; depth: number }[];
    source: DocSource;
    sourceUrl: string;
    checkedAt: string;
    savedCopy: boolean;
};

export function docUrl({ repo, path }: DocSource): string {
    if (repo === "mdk" && path === "integrations/README.md") return "/agents";
    const runtime = agentRuntimes.find((name) => path === `integrations/${name}/marmot/README.md`);
    if (repo === "mdk" && runtime) return `/agents/${runtime}`;
    return `/docs/${repo}/${path}`;
}

export function validDocSource(repo: string, path: string): repo is DocsRepo {
    return (
        (repo === "mdk" || repo === "marmot") &&
        path.length <= 240 &&
        /^[a-zA-Z0-9_/-]+\.md$/.test(path) &&
        !path.startsWith("/") &&
        !path.includes("//") &&
        !/(^|\/)(AGENTS|CLAUDE)\.md$/i.test(path)
    );
}
