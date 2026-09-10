import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { artworkGeometry } from "./artwork";
import { breakpoints, contrastRatio, motion, renderTokens, tokenById, tokens } from "./tokens";
import { renderTypography, typography } from "./typography";

const read = (file: string) => readFileSync(file, "utf8");
const compact = (css: string) => css.replace(/\s+/g, "");
const walk = (directory: string): string[] =>
    readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
        entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)]
    );
const components = [
    ...walk("src/routes"),
    ...walk("src/lib/components/rebuild"),
    ...walk("src/lib/components/system"),
].filter((file) => file.endsWith(".svelte"));
const styles = [
    "src/rebuild.css",
    ...walk("src/lib/design-system").filter(
        (file) =>
            file.endsWith(".css") &&
            !file.endsWith("tokens.css") &&
            !file.endsWith("typography.css")
    ),
];
const liveStyles = () => [
    ...styles.map((file) => ({ file, css: read(file) })),
    ...components.flatMap((file) =>
        [...read(file).matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((match) => ({
            file,
            css: match[1],
        }))
    ),
];

describe("design system contract", () => {
    it("keeps generated CSS in sync with the catalogs used by the visual reference", () => {
        expect(compact(read("src/lib/design-system/tokens.css"))).toBe(compact(renderTokens()));
        expect(compact(read("src/lib/design-system/typography.css"))).toBe(
            compact(renderTypography())
        );
        expect(new Set(tokens.map((token) => token.id)).size).toBe(tokens.length);
        expect(new Set(typography.map((recipe) => recipe.id)).size).toBe(typography.length);
    });
    it("resolves every token reference in live styles and typography recipes", () => {
        const css = [
            ...liveStyles().map(({ css }) => css),
            renderTypography(),
            renderTokens(),
        ].join("\n");
        const declared = new Set([...css.matchAll(/--([\w-]+)\s*:/g)].map((match) => match[1]));
        const missing = [...css.matchAll(/var\(--([\w-]+)/g)]
            .map((match) => match[1])
            .filter((id) => !declared.has(id));
        expect([...new Set(missing)]).toEqual([]);
    });
    it("rejects new literal colors, dimensions and type values outside the catalog", () => {
        for (const { file, css: source } of liveStyles()) {
            const css = source
                .replace(/\/\*[\s\S]*?\*\//g, "")
                .replace(/@media\s*\([^)]*\)/g, "")
                .replace(/var\(--[\w-]+\)/g, "");
            expect(
                css.match(/#[\da-f]{3,8}\b|\b\d*\.?\d+(?:px|rem|em|vw|vh|ms|deg)\b/gi),
                file
            ).toBeNull();
            expect(
                css.match(/(?:font-size|font-weight|line-height|letter-spacing)\s*:\s*-?\d/g),
                file
            ).toBeNull();
        }
        // Active pages cannot bypass the system with Tailwind arbitrary values or inline CSS.
        for (const file of components) {
            const source = read(file);
            expect(source.match(/class=["'][^"']*\[[^\]]+\]/g), file).toBeNull();
            expect(
                source.match(/style=["'][^"']*(?:#[\da-f]{3,8}|\d+(?:px|rem))/gi),
                file
            ).toBeNull();
            expect(source.includes("carbon-icons-svelte"), file).toBe(false);
        }
    });
    it("keeps responsive breakpoints within the documented contract", () => {
        const allowed = Object.values(breakpoints) as number[];
        for (const file of styles) {
            for (const match of read(file).matchAll(/@media\s*\(max-width:\s*(\d+)px\)/g))
                expect(allowed).toContain(Number(match[1]));
        }
        for (const recipe of typography) if (recipe.media) expect(allowed).toContain(recipe.media);
    });
    it("keeps the spacing foundation on four-pixel steps and identifies inherited exceptions", () => {
        for (const token of tokens.filter((token) => token.category === "Spacing")) {
            const pixels = Number.parseFloat(token.value) * 16;
            if (token.status === "established") expect(pixels % 4, token.id).toBe(0);
            else expect(token.id).toMatch(/^legacy-space-/);
        }
    });
    it("computes contrast correctly and keeps the approved low-contrast exception visible", () => {
        expect(contrastRatio("#000", "#fff")).toBe(21);
        expect(contrastRatio("#fff", "#fff")).toBe(1);
        expect(
            contrastRatio(tokenById["color-muted"].value, tokenById["color-paper"].value)
        ).toBeGreaterThan(4.5);
        expect(
            contrastRatio(tokenById["color-hero-muted"].value, tokenById["color-paper"].value)
        ).toBeLessThan(3);
        expect(tokenById["color-hero-muted"].status).toBe("review");
    });
    it("keeps motion and measured artwork geometry consistent across components", () => {
        expect(motion.copyFeedbackMs).toBe(3000);
        expect(tokenById["duration-transition"].value).toBe("0ms");
        expect(tokenById["artwork-ratio"].value).toBe(
            `${artworkGeometry.ratioWidth} / ${artworkGeometry.ratioHeight}`
        );
        for (const [x, y, width, height] of Object.values(artworkGeometry.bounds)) {
            expect(x + width).toBeLessThanOrEqual(artworkGeometry.sourceSize);
            expect(y + height).toBeLessThanOrEqual(artworkGeometry.sourceSize);
        }
    });
});
