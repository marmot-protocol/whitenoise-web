import { error, redirect } from "@sveltejs/kit";
import userPages from "#lib/content/user-documentation.json";
import { docUrl, validDocSource } from "#lib/documentation.js";
import type { EntryGenerator, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, url }) => {
    const { repo, path } = params;
    const slug = path ? `${repo}/${path}` : repo;
    if (userPages.some((page) => (page as { slug: string }).slug === slug)) {
        const { documentationPage } = await import("#lib/server/user-documentation.js");
        return { userDocument: documentationPage(slug) };
    }
    if (!validDocSource(repo, path)) error(404, "Documentation not found");
    if (repo === "marmot" && path === "README.md") {
        const { curatedGuide } = await import("#lib/server/curated-guides.js");
        return { document: curatedGuide("marmot") };
    }
    if (repo === "mdk" && path === "README.md") redirect(307, "/build#mdk");
    const canonical = docUrl({ repo, path });
    if (canonical !== url.pathname) redirect(307, canonical);
    redirect(307, `https://github.com/marmot-protocol/${repo}/blob/master/${path}`, {
        external: ["https://github.com"],
    });
};

// Publish the bundled guide as static HTML/data, while keeping arbitrary legacy redirects.
export const prerender = "auto";
export const entries: EntryGenerator = () => [
    { repo: "marmot", path: "README.md" },
    ...userPages.map((page) => {
        const [repo, ...parts] = (page as { slug: string }).slug.split("/");
        return { repo, path: parts.join("/") };
    }),
];
