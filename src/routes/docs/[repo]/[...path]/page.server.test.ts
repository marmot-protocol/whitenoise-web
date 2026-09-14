import { describe, expect, it, vi } from "vitest";
import { load } from "./+page.server";

// Redirects must remain usable even if the guide renderer cannot initialize at runtime.
vi.mock("$lib/server/curated-guides", () => {
    throw new Error("Guide renderer unavailable");
});
const request = (repo: string, path: string) =>
    load({
        params: { repo, path },
        url: new URL(`https://example.com/docs/${repo}/${path}`),
    } as Parameters<typeof load>[0]);

describe("legacy documentation routes", () => {
    it.each([
        ["mdk", "README.md", "/build#mdk"],
        ["mdk", "integrations/README.md", "/agents"],
        ["mdk", "integrations/hermes/marmot/README.md", "/agents/hermes"],
        [
            "mdk",
            "crates/mdk/README.md",
            "https://github.com/marmot-protocol/mdk/blob/master/crates/mdk/README.md",
        ],
        [
            "marmot",
            "foundation/identity.md",
            "https://github.com/marmot-protocol/marmot/blob/master/foundation/identity.md",
        ],
    ])("redirects %s/%s without initializing the guide renderer", async (repo, path, location) => {
        await expect(request(repo, path)).rejects.toMatchObject({ status: 307, location });
    });

    it.each([
        ["unknown", "README.md"],
        ["marmot", "../README.md"],
        ["mdk", "notes/AGENTS.md"],
    ])("rejects invalid source %s/%s before loading the guide renderer", async (repo, path) => {
        await expect(request(repo, path)).rejects.toMatchObject({ status: 404 });
    });
});
