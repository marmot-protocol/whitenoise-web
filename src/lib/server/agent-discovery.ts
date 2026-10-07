import { createHash } from "node:crypto";
import agents from "$lib/content/agents.md?raw";

export const skillName = "connect-white-noise";
export const skillDescription =
    "Connect an existing local agent runtime to White Noise using the documented Marmot connector and owner-approved installation.";
export const skillPath = `/.well-known/agent-skills/${skillName}/SKILL.md`;
export const skillMarkdown = `---\nname: ${skillName}\ndescription: ${skillDescription}\n---\n\n${agents}`;

export const skillIndex = {
    $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
    skills: [
        {
            name: skillName,
            type: "skill-md",
            description: skillDescription,
            url: `https://www.whitenoise.chat${skillPath}`,
            digest: `sha256:${createHash("sha256").update(skillMarkdown, "utf8").digest("hex")}`,
        },
    ],
};

export const aiCatalog = {
    specVersion: "1.0",
    host: {
        displayName: "White Noise",
        identifier: "https://www.whitenoise.chat",
        documentationUrl: "https://www.whitenoise.chat/agents",
    },
    entries: [
        {
            identifier: `urn:air:whitenoise.chat:skill:${skillName}`,
            displayName: "Connect an agent to White Noise",
            type: "text/markdown",
            url: `https://www.whitenoise.chat${skillPath}`,
            representativeQueries: [
                "How do I connect my local agent to White Noise?",
                "How do I set up the Marmot connector for my agent runtime?",
            ],
        },
    ],
};

export const discoveryHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=300",
};
