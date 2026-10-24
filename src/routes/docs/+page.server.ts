import { documentationIndex } from "#lib/server/user-documentation.js";

export const prerender = true;
export function load() {
    return {
        pages: documentationIndex().map(
            ({ slug, title, description, category, platform, url }) => ({
                slug,
                title,
                description,
                category,
                platform,
                url,
            })
        ),
    };
}
