import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import screenCoverage from "../content/documentation-screens.json";
import { pageMarkdown } from "./agent-markdown";
import { documentationIndex, documentationPage, documentationPages } from "./user-documentation";

describe("user documentation registry", () => {
    it("gives each inventoried screen a working guide and section", () => {
        const seen = new Set<string>();
        for (const screen of screenCoverage.screens) {
            const key = `${screen.platform}:${screen.id}`;
            expect(seen.has(key), key).toBe(false);
            seen.add(key);
            const [route, anchor] = screen.guide.split("#");
            const page = documentationPage(route.replace("/docs/", ""));
            expect(page, key).toBeTruthy();
            expect(
                page.headings.map((heading) => heading.id),
                key
            ).toContain(anchor);
        }
    });

    it("publishes unique, directly addressable guides and source references", () => {
        const index = documentationIndex();
        expect(index.length).toBeGreaterThan(25);
        expect(new Set(index.map((page) => page.slug)).size).toBe(index.length);
        for (const page of documentationPages) {
            expect(page.slug).toMatch(/^[a-z0-9-]+(?:\/[a-z0-9-]+)*$/);
            expect(page.title.length).toBeGreaterThan(3);
            expect(page.markdown).toContain(`# ${page.title}`);
            expect(["android", "ios", "shared"]).toContain(page.platform);
            expect(page.sources.length).toBeGreaterThan(0);
            for (const source of page.sources)
                expect(source).toMatch(/^https:\/\/github.com\/marmot-protocol\//);
        }
    });

    it("preserves consequences and platform instructions in readable exports", () => {
        for (const page of documentationPages) {
            const rendered = documentationPage(page.slug);
            const markdown = pageMarkdown(
                `<main><h1>${page.title}</h1>${rendered.html}</main>`,
                new URL(`https://www.whitenoise.chat/docs/${page.slug}`)
            );
            expect(markdown).toContain(page.title);
            expect(rendered.headings.length).toBeGreaterThan(0);
            const bodyIds = [...rendered.html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
            for (const shellId of [
                "documentation-screen-reference",
                "documentation-illustrations",
                "documentation-evidence",
            ])
                expect(bodyIds).not.toContain(shellId);
            expect(rendered.html).not.toMatch(/<script|onerror=/);
            expect(new Set(rendered.headings.map((heading) => heading.id)).size).toBe(
                rendered.headings.length
            );
        }
    });

    it("preserves wipe consequences before destructive instructions in agent exports", () => {
        const document = documentationPage("settings/identity");
        const markdown = pageMarkdown(
            `<main><h1>${document.title}</h1>${document.html}</main>`,
            new URL("https://www.whitenoise.chat/docs/settings/identity")
        );
        if (markdown === null) throw new Error("Guide export is missing");
        expect(markdown).toContain(
            "This permanently deletes this account's messages and group encryption data"
        );
        expect(markdown).toContain("Back up your private key first.");
        expect(markdown.indexOf("This permanently deletes")).toBeLessThan(
            markdown.indexOf("Type WIPE")
        );
    });

    it("explains encrypted-backup import limits before destructive recovery steps", () => {
        for (const [slug, destructiveSection] of [
            ["using/recovery/android", "## Sign out and wipe"],
            ["using/recovery/ios", "## Delete a profile"],
        ]) {
            const document = documentationPage(slug);
            const markdown = pageMarkdown(
                `<main><h1>${document.title}</h1>${document.html}</main>`,
                new URL(`https://www.whitenoise.chat/docs/${slug}`)
            );
            if (markdown === null) throw new Error("Guide export is missing");
            expect(markdown).toContain(
                "The current sign-in screens require a decrypted private key"
            );
            expect(markdown.indexOf("## Encrypted backup import")).toBeLessThan(
                markdown.indexOf(destructiveSection)
            );
        }
    });

    it("keeps a usable-key requirement before iOS erasure in text exports", () => {
        const document = documentationPage("using/privacy/ios");
        const markdown = pageMarkdown(
            `<main><h1>${document.title}</h1>${document.html}</main>`,
            new URL("https://www.whitenoise.chat/docs/using/privacy/ios")
        );
        if (markdown === null) throw new Error("Guide export is missing");
        expect(markdown).toContain("trusted local decryption method");
        expect(markdown).toContain("/docs/settings/identity#encrypted-backup-import");
        expect(markdown.indexOf("trusted local decryption method")).toBeLessThan(
            markdown.indexOf("tap **Erase App Data**")
        );
    });

    it("keeps backup checks before profile deletion and qualifies incomplete erasure", () => {
        const profile =
            documentationPages.find((page) => page.slug === "using/profiles/ios")?.markdown ?? "";
        expect(profile).toContain("Back up your private key");
        const deletion = profile.slice(profile.indexOf("## Delete a profile"));
        expect(deletion.indexOf("Back up your private key")).toBeLessThan(
            deletion.indexOf("tap **Delete Profile**")
        );
        expect(deletion).toContain("/docs/settings/identity#encrypted-backup-import");
        const settings =
            documentationPages.find((page) => page.slug === "settings/ios")?.markdown ?? "";
        expect(settings).toContain("Use a retry or recovery action only if the app offers one");
        expect(settings).toContain("confirm that you can recover each key");
    });

    it("illustrates download and each Android account-entry stage beside the instructions", () => {
        const android = documentationPage("get-started/install/android");
        for (const image of [
            "android-download",
            "welcome",
            "sign-up",
            "sign-in",
            "setup-checklist",
            "setup-ready",
        ])
            expect(android.html).toContain(`/docs/android/${image}.svg`);
        expect(documentationPage("get-started/install/ios").html).toContain(
            "/docs/ios/ios-download.svg"
        );
        expect(documentationPage("using/profiles/android").html).toContain(
            "/docs/android/add-profile.svg"
        );
    });

    it("continues onboarding on the same platform through message and backup guides", () => {
        for (const platform of ["android", "ios"]) {
            expect(documentationPage(`get-started/install/${platform}`).next?.url).toBe(
                `/docs/get-started/first-message/${platform}`
            );
            expect(documentationPage(`get-started/first-message/${platform}`).next?.url).toBe(
                `/docs/using/recovery/${platform}`
            );
            expect(documentationPage(`using/recovery/${platform}`).previous?.url).toBe(
                `/docs/get-started/first-message/${platform}`
            );
        }
    });

    it("declares explicit versions and supports full-text lookup without a second content source", () => {
        const page = documentationIndex().find((page) => page.slug === "settings/android");
        expect(page?.searchText).toContain("Appearance");
        expect(page?.applicability).toHaveProperty("currentSource");
        expect(page?.applicability).toHaveProperty("minimumOS");
    });

    it("distinguishes connector hosts and library toolchains from phone requirements", () => {
        const index = documentationIndex();
        expect(index.find((page) => page.slug === "agents/access")?.applicability).toHaveProperty(
            "hostOS",
            ["macOS", "Linux"]
        );
        expect(
            index.find((page) => page.slug === "build/quickstart")?.applicability
        ).toHaveProperty("rustToolchain", "1.97.1");
    });

    it("keeps every guide in the deployed Markdown route set", () => {
        const routes = JSON.parse(
            readFileSync(new URL("../content/agent-pages.json", import.meta.url), "utf8")
        );
        expect(routes).toContain("/docs");
        for (const page of documentationIndex()) expect(routes).toContain(page.url);
    });

    it("switches the same task rather than sending readers to a platform homepage", () => {
        expect(documentationPage("get-started/first-message/android").counterpart?.url).toBe(
            "/docs/get-started/first-message/ios"
        );
        expect(documentationPage("get-started/first-message/ios").counterpart?.url).toBe(
            "/docs/get-started/first-message/android"
        );
        expect(documentationPage("compatibility").counterpart).toBeNull();
    });

    it("rejects unknown and traversal-like documentation paths", () => {
        expect(() => documentationPage("unknown")).toThrow();
        expect(() => documentationPage("../settings/android")).toThrow();
    });

    it("keeps every in-site documentation link and anchor resolvable", () => {
        for (const page of documentationPages) {
            for (const match of page.markdown.matchAll(/\]\((\/docs\/[^)\s]+)\)/g)) {
                const [path, hash] = match[1].split("#");
                if (path === "/docs/marmot/README.md") continue;
                if (/^\/docs\/(?:android|ios)\/[a-z-]+\.(?:png|svg)$/.test(path)) {
                    expect(
                        readFileSync(new URL(`../../../static${path}`, import.meta.url)).length
                    ).toBeGreaterThan(0);
                    continue;
                }
                const target = documentationPage(path.slice("/docs/".length));
                if (hash) expect(target.headings.some((heading) => heading.id === hash)).toBe(true);
            }
        }
    });
});
