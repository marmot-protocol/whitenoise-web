import termsMarkdown from "$lib/content/terms-of-service.md?raw";
import { renderBlogHtml } from "$lib/server/blog-markdown";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const sections: { id: string; title: string }[] = [];
    const safeHtml = renderBlogHtml(termsMarkdown).replace(
        /<h2>(\d+)\. ([^<]+)<\/h2>/g,
        (_heading, number: string, title: string) => {
            const id = `section-${number}`;
            sections.push({ id, title: `${number}. ${title}` });
            return `<h2 id="${id}">${number}. ${title}</h2>`;
        }
    );
    const firstSection = safeHtml.indexOf('<h2 id="section-1">');
    return {
        introductionHtml: safeHtml.slice(0, firstSection),
        sectionsHtml: safeHtml.slice(firstSection),
        sections,
    };
};
