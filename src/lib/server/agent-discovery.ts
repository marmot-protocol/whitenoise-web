import { createHash } from "node:crypto";
import agents from "#lib/content/agents.md?raw";
import build from "#lib/content/build.md?raw";
import buildSkill from "#lib/content/build-skill.md?raw";
import firstChat from "#lib/content/docs/build/first-chat.md?raw";

const origin = "https://www.whitenoise.chat";

// Each skill is assembled from the same Markdown the site publishes as guides,
// so the skill and the human guide cannot drift apart.
const skillSources = [
    {
        name: "connect-white-noise",
        displayName: "Connect an agent to White Noise",
        description:
            "Connect an existing local agent runtime to White Noise using the documented Marmot connector and owner-approved installation.",
        body: agents,
        representativeQueries: [
            "How do I connect my local agent to White Noise?",
            "How do I set up the Marmot connector for my agent runtime?",
        ],
    },
    {
        name: "build-with-marmot",
        displayName: "Build an encrypted chat app with Marmot",
        description:
            "Decide whether Marmot fits an encrypted messaging app, then build and verify a two-person chat with the Marmot Development Kit (MDK).",
        body: [buildSkill, build, firstChat].join("\n\n"),
        representativeQueries: [
            "How should I build end-to-end encrypted group chat?",
            "How do I build a messaging app with MLS and Nostr?",
            "How do I send a message with the Marmot Development Kit?",
        ],
    },
] as const;

export type SkillName = (typeof skillSources)[number]["name"];

export const skills = skillSources.map((skill) => {
    const markdown = `---\nname: ${skill.name}\ndescription: ${skill.description}\n---\n\n${skill.body}`;
    return {
        ...skill,
        path: `/.well-known/agent-skills/${skill.name}/SKILL.md`,
        markdown,
        digest: `sha256:${createHash("sha256").update(markdown, "utf8").digest("hex")}`,
    };
});

export function skillMarkdown(name: SkillName) {
    const skill = skills.find((item) => item.name === name);
    if (!skill) throw new Error(`Unknown skill ${name}`);
    return skill.markdown;
}

export const skillIndex = {
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: skills.map(({ name, description, path, digest }) => ({
        name,
        type: "skill-md",
        description,
        url: `${origin}${path}`,
        digest,
    })),
};

export const aiCatalog = {
    specVersion: "1.0",
    host: {
        displayName: "White Noise",
        identifier: origin,
        documentationUrl: `${origin}/docs`,
    },
    entries: [
        ...skills.map(({ name, displayName, path, representativeQueries }) => ({
            identifier: `urn:air:whitenoise.chat:skill:${name}`,
            displayName,
            type: "text/markdown",
            url: `${origin}${path}`,
            representativeQueries: [...representativeQueries],
        })),
        {
            identifier: "urn:air:whitenoise.chat:documentation",
            displayName: "White Noise documentation",
            type: "application/json",
            url: `${origin}/docs/index.json`,
            representativeQueries: [
                "How do I use White Noise on Android or iOS?",
                "What does this setting do?",
            ],
        },
    ],
};

export const discoveryHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=300",
};
