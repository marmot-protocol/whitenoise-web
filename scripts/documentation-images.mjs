import { readFile, writeFile } from "node:fs/promises";

// SVG viewports crop authentic screenshots without repainting app content.
// Coordinates are measured artwork geometry, not website layout tokens.
const root = new URL("../", import.meta.url);
export function documentationImage(capture, bytes) {
    const { crop, highlights, alt } = capture.presentation;
    const escapeXml = (text) =>
        text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll('"', "&quot;");
    const box = (rectangle) =>
        `x="${rectangle.x}" y="${rectangle.y}" width="${rectangle.width}" height="${rectangle.height}"`;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${crop.width}" height="${crop.height}" viewBox="${crop.x} ${crop.y} ${crop.width} ${crop.height}" role="img" aria-labelledby="title"><title id="title">${escapeXml(alt)}</title><image width="${capture.dimensions.width}" height="${capture.dimensions.height}" href="data:image/png;base64,${bytes.toString("base64")}"/>${highlights.map((highlight) => `<rect ${box(highlight)} fill="none" stroke="#fff" stroke-width="12"/><rect ${box(highlight)} fill="none" stroke="#111" stroke-width="6"/>`).join("")}</svg>\n`;
}
if (process.argv.includes("--write")) {
    const captures = JSON.parse(
        await readFile(new URL("src/lib/content/documentation-captures.json", root), "utf8")
    );
    for (const capture of captures) {
        const bytes = await readFile(new URL(`static${capture.url}`, root));
        await writeFile(
            new URL(`static${capture.presentation.url}`, root),
            documentationImage(capture, bytes)
        );
    }
}
