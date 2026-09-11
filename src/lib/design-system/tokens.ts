import definitions from "./tokens.json";

export type Token = (typeof definitions)[number];
export const tokens: readonly Token[] = definitions;
export const tokenById = Object.fromEntries(tokens.map((token) => [token.id, token]));
export const breakpoints = { mobile: 640, tablet: 900 } as const;
export const motion = {
    copyFeedbackMs: Number.parseInt(tokenById["duration-copy"].value, 10),
} as const;

/** Generated CSS and the reference page consume this same catalog. */
export function renderTokens() {
    return `/* Generated from src/lib/design-system/tokens.json. Run bun run tokens:generate. */\n:root {\n${tokens.map(({ id, value }) => `    --${id}: ${value};`).join("\n")}\n}\n`;
}

export function contrastRatio(foreground: string, background: string) {
    const luminance = (hex: string) => {
        let normalized = hex.replace("#", "");
        if (normalized.length === 3) normalized = [...normalized].map((c) => c + c).join("");
        const rgb = [0, 2, 4].map((offset) => {
            const channel = Number.parseInt(normalized.slice(offset, offset + 2), 16) / 255;
            return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
        });
        return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
    };
    const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
    return (values[0] + 0.05) / (values[1] + 0.05);
}

/** Numeric documentation is derived from tokens at the default 16px root. */
export function pixels(id: string) {
    const value = tokenById[id].value;
    return Number.parseFloat(value) * (value.endsWith("rem") ? 16 : 1);
}
export function describeValue(value: string): string {
    return value.replace(/var\(--([\w-]+)\)/g, (_, id: string) => tokenById[id]?.value ?? id);
}

export function renderRuntime() {
    return `// Generated from the design-system catalog. Run bun run tokens:generate.\nexport const breakpoints = { mobile: ${breakpoints.mobile}, tablet: ${breakpoints.tablet} } as const;\nexport const copyFeedbackMs = ${motion.copyFeedbackMs};\n`;
}
