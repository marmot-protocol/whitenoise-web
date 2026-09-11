import { error, redirect } from "@sveltejs/kit";
import { docUrl, validDocSource } from "$lib/documentation";
import { curatedGuide } from "$lib/server/curated-guides";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ params, url }) => {
    const { repo, path } = params;
    if (!validDocSource(repo, path)) error(404, "Documentation not found");
    if (repo === "marmot" && path === "README.md") return { document: curatedGuide("marmot") };
    if (repo === "mdk" && path === "README.md") redirect(307, "/build#mdk");
    const canonical = docUrl({ repo, path });
    if (canonical !== url.pathname) redirect(307, canonical);
    redirect(307, `https://github.com/marmot-protocol/${repo}/blob/master/${path}`);
};

export const prerender = false;
