import { error, redirect } from "@sveltejs/kit";
import { docUrl, validDocSource } from "$lib/documentation";
import type { EntryGenerator, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, url }) => {
    const { repo, path } = params;
    if (!validDocSource(repo, path)) error(404, "Documentation not found");
    if (repo === "marmot" && path === "README.md") {
        const { curatedGuide } = await import("$lib/server/curated-guides");
        return { document: curatedGuide("marmot") };
    }
    if (repo === "mdk" && path === "README.md") redirect(307, "/build#mdk");
    const canonical = docUrl({ repo, path });
    if (canonical !== url.pathname) redirect(307, canonical);
    redirect(307, `https://github.com/marmot-protocol/${repo}/blob/master/${path}`);
};

// Publish the bundled guide as static HTML/data, while keeping arbitrary legacy redirects.
export const prerender = "auto";
export const entries: EntryGenerator = () => [{ repo: "marmot", path: "README.md" }];
