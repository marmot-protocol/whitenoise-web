import { documentationIndex } from "$lib/server/user-documentation";

export const prerender = true;
export function load() {
    return {
        pages: documentationIndex().map(
            ({ slug, title, description, category, platform, platformLabel, url }) => ({
                slug,
                title,
                description,
                category,
                platform,
                platformLabel,
                url,
            })
        ),
    };
}
