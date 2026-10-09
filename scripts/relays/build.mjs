import { execFileSync } from "node:child_process";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { build } from "vite";

const root = fileURLToPath(new URL("../../", import.meta.url));
const output = `${root}output/relays`;
const configFile = `${root}scripts/relays/vite.config.ts`;
await build({ configFile });
await build({
    configFile,
    build: {
        ssr: `${root}src/relay/render.ts`,
        outDir: `${output}/server`,
        rollupOptions: { output: { entryFileNames: "render.mjs" } },
    },
});
const { renderPage } = await import(`${output}/server/render.mjs`);
const template = await readFile(`${output}/client/index.html`, "utf8");
const instructions = await readFile(`${root}scripts/relays/deployment.txt`, "utf8");

for (const region of ["us", "eu"]) {
    const folder = `${output}/${region}`;
    await rm(folder, { recursive: true, force: true });
    await mkdir(`${folder}/public/images`, { recursive: true });
    await cp(`${output}/client/assets`, `${folder}/public/assets`, { recursive: true });
    for (const asset of [
        "theme.js",
        "favicon-light.svg",
        "favicon-dark.svg",
        "images/logomark.svg",
        "images/theme-toggle-icon.svg",
    ]) {
        await cp(`${root}static/${asset}`, `${folder}/public/${asset}`);
    }
    await writeFile(`${folder}/public/index.html`, renderPage(template, region));
    await writeFile(
        `${folder}/DEPLOY.txt`,
        instructions.replaceAll("{{REGION}}", region.toUpperCase()).replaceAll("{{region}}", region)
    );
    const zip = `${output}/white-noise-relay-${region}.zip`;
    await rm(zip, { force: true });
    execFileSync("zip", ["-qr", zip, "public", "DEPLOY.txt"], { cwd: folder });
    console.log(`Created ${zip}`);
}
