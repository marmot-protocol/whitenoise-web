import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import agents from "$lib/content/agents.md?raw";
import { aiCatalog, skillIndex, skillMarkdown } from "./agent-discovery";

describe("agent discovery artifacts", () => {
    it("advertises the exact skill bytes and reuses the approved Agents content", () => {
        expect(skillMarkdown).toContain(agents);
        expect(skillIndex.skills[0].digest).toBe(
            `sha256:${createHash("sha256").update(skillMarkdown).digest("hex")}`
        );
        expect(skillMarkdown).toContain("Ask for my approval before making changes");
        expect(aiCatalog.entries[0].url).toBe(skillIndex.skills[0].url);
        expect(aiCatalog.entries[0].type).toBe("text/markdown");
        expect(aiCatalog.entries[0]).not.toHaveProperty("data");
    });
});
