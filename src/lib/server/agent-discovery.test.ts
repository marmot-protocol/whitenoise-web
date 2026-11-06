import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import agents from "#lib/content/agents.md?raw";
import build from "#lib/content/build.md?raw";
import firstChat from "#lib/content/docs/build/first-chat.md?raw";
import { aiCatalog, skillIndex, skillMarkdown, type skills } from "./agent-discovery";

describe("agent discovery artifacts", () => {
    it("advertises the exact bytes of every published skill", () => {
        expect(skillIndex.skills.map((skill) => skill.name)).toEqual([
            "connect-white-noise",
            "build-with-marmot",
        ]);
        for (const skill of skillIndex.skills) {
            const markdown = skillMarkdown(skill.name as (typeof skills)[number]["name"]);
            expect(markdown.startsWith(`---\nname: ${skill.name}\n`)).toBe(true);
            expect(skill.digest).toBe(
                `sha256:${createHash("sha256").update(markdown).digest("hex")}`
            );
            expect(skill.url).toBe(
                `https://www.whitenoise.chat/.well-known/agent-skills/${skill.name}/SKILL.md`
            );
        }
    });

    it("builds skills from the published guides instead of separate copies", () => {
        expect(skillMarkdown("connect-white-noise")).toContain(agents);
        expect(skillMarkdown("connect-white-noise")).toContain(
            "Ask for my approval before making changes"
        );
        expect(skillMarkdown("build-with-marmot")).toContain(build);
        expect(skillMarkdown("build-with-marmot")).toContain(firstChat);
    });

    it("lists each skill in the AI catalog without inlining its content", () => {
        for (const skill of skillIndex.skills) {
            const entry = aiCatalog.entries.find((item) => item.url === skill.url);
            expect(entry?.type).toBe("text/markdown");
            expect(entry).not.toHaveProperty("data");
        }
    });
});
