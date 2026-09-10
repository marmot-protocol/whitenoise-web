import recipes from "./typography.json";

export const typography = recipes;
export const textRoles = {
    display: ".hero-title",
    section: ".feature-block h2",
    heading: ".article-body h2",
    title: ".donation-label",
    lead: ".page-description",
    body: ".article-body p",
    small: ".donation-address-text",
    ui: ".wn-button",
    caption: ".footer-bottom",
} as const;
export type TextRole = keyof typeof textRoles;

export function renderTypography() {
    return `/* Generated from typography.json. Existing selectors and Text share these recipes. */\n${typography
        .map((recipe) => {
            const aliases = Object.entries(textRoles)
                .filter(([, selector]) =>
                    recipe.selectors
                        .split(",")
                        .map((s) => s.trim())
                        .includes(selector)
                )
                .map(([role]) => `.type-${role}`);
            const selectors = [recipe.selectors, ...aliases].join(",\n");
            const properties = Object.entries(recipe.properties)
                .map(([name, value]) => `    ${name}: ${value};`)
                .join("\n");
            const rule = `${selectors} {\n${properties}\n}`;
            return recipe.media ? `@media (max-width: ${recipe.media}px) {\n${rule}\n}` : rule;
        })
        .join("\n")}\n`;
}
