import { writeFile } from "node:fs/promises";
import { validDocSource } from "../src/lib/documentation";

// Refresh the bundled outage fallback from public, immutable source revisions.
// Runtime reads refresh independently; this command does not publish the site.
const documents: Record<string, { markdown: string; checkedAt: string; revision: string }> = {};
const headers = { Accept: "application/vnd.github+json", "User-Agent": "White-Noise-docs" };
for (const repo of ["mdk", "marmot"] as const) {
    const commitResponse = await fetch(
        `https://api.github.com/repos/marmot-protocol/${repo}/commits/master`,
        { headers }
    );
    if (!commitResponse.ok) throw new Error(`Cannot resolve ${repo}: ${commitResponse.status}`);
    const { sha } = (await commitResponse.json()) as { sha: string };
    const treeResponse = await fetch(
        `https://api.github.com/repos/marmot-protocol/${repo}/git/trees/${sha}?recursive=1`,
        { headers }
    );
    if (!treeResponse.ok) throw new Error(`Cannot list ${repo}: ${treeResponse.status}`);
    const tree = (await treeResponse.json()) as {
        truncated: boolean;
        tree: { path: string; type: string }[];
    };
    if (tree.truncated) throw new Error(`Incomplete ${repo} tree`);
    const pending = tree.tree.filter(
        (entry) => entry.type === "blob" && validDocSource(repo, entry.path)
    );
    await Promise.all(
        Array.from({ length: 6 }, async () => {
            while (pending.length) {
                const entry = pending.pop();
                if (!entry) return;
                const response = await fetch(
                    `https://raw.githubusercontent.com/marmot-protocol/${repo}/${sha}/${entry.path}`,
                    { signal: AbortSignal.timeout(15000) }
                );
                if (!response.ok) throw new Error(`Cannot save ${entry.path}: ${response.status}`);
                const markdown = await response.text();
                if (markdown.length > 1_000_000)
                    throw new Error(`Document too large: ${entry.path}`);
                documents[`${repo}/${entry.path}`] = {
                    markdown,
                    checkedAt: new Date().toISOString(),
                    revision: sha,
                };
            }
        })
    );
}
await writeFile(
    "src/lib/server/docs-snapshot.json",
    `${JSON.stringify(Object.fromEntries(Object.entries(documents).sort()), null, 2)}\n`
);
console.log(`Saved ${Object.keys(documents).length} documentation fallbacks.`);
