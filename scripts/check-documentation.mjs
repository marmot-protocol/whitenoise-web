import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { access, readFile } from "node:fs/promises";

import { documentationImage } from "./documentation-images.mjs";

const root = new URL("../", import.meta.url);
const readJson = async (path) => JSON.parse(await readFile(new URL(path, root), "utf8"));
const pages = await readJson("src/lib/content/user-documentation.json");
const routes = await readJson("src/lib/content/agent-pages.json");
const captures = await readJson("src/lib/content/documentation-captures.json");
const baseline = await readJson("src/lib/content/documentation-baseline.json");
const sourceRevisions = {
    "whitenoise-android": baseline.android.currentSource,
    "whitenoise-ios": baseline.ios.source,
    "whitenoise-web": baseline.connector.guideSource,
    mdk: baseline.development.mdkSource,
    marmot: baseline.development.protocolSource,
    "marmot-ts": baseline.development.typescriptSource,
};
for (const revision of [
    ...Object.values(sourceRevisions),
    baseline.android.releaseSource,
    baseline.connector.connectorSource,
])
    assert.match(revision, /^[a-f0-9]{40}$/, "Baseline revisions must be immutable commits");
assert.equal(baseline.connector.connectorSource, baseline.development.mdkSource);
assert(pages.length > 25, "Documentation corpus is missing");
assert(new Set(pages.map((p) => p.slug)).size === pages.length, "Duplicate documentation slug");
assert(routes.includes("/docs"), "Documentation index needs Markdown routing");
// Accepted documentation coverage; a missing topic must fail the publication check.
const requiredTasks = [
    "settings/android",
    "settings/ios",
    "settings/android/diagnostics",
    "settings/android/translation",
    "settings/android/dictation",
    "settings/ios/diagnostics",
    "settings/relays",
    "settings/identity",
    "compatibility",
    "get-started/install/android",
    "get-started/install/ios",
    "get-started/first-message/android",
    "get-started/first-message/ios",
    "using/profiles/android",
    "using/profiles/ios",
    "using/contacts/android",
    "using/contacts/ios",
    "using/groups/android",
    "using/groups/ios",
    "using/messages/android",
    "using/messages/ios",
    "using/media/android",
    "using/media/ios",
    "using/notifications/android",
    "using/notifications/ios",
    "using/recovery/android",
    "using/recovery/ios",
    "using/privacy/android",
    "using/privacy/ios",
    "troubleshooting/access",
    "troubleshooting/invitations",
    "troubleshooting/delivery",
    "troubleshooting/notifications",
    "troubleshooting/media",
    "troubleshooting/connection",
    "troubleshooting/report-problem",
    "agents/access",
    "agents/routing",
    "agents/files",
    "agents/recovery",
    "agents/stop",
    "build/quickstart",
    "build/state-and-errors",
    "build/compatibility",
    "build/contribute",
];
for (const slug of requiredTasks)
    assert(
        pages.some((page) => page.slug === slug),
        `Missing required guide: ${slug}`
    );
for (const page of pages) {
    assert(
        ["get-started", "using", "settings", "troubleshooting", "agents", "build"].includes(
            page.category
        ),
        `Unknown guide category: ${page.slug}`
    );
    assert(
        page.slug === "compatibility" || page.slug.startsWith(`${page.category}/`),
        `Unexpected guide namespace: ${page.slug}`
    );
    const platform = page.slug.match(/\/(android|ios)(?:\/|$)/)?.[1] ?? "shared";
    assert.equal(page.platform, platform, `Wrong platform: ${page.slug}`);
    assert(/^[a-z0-9-]+(?:\/[a-z0-9-]+)*$/.test(page.slug), "Unsafe documentation slug");
    assert(routes.includes(`/docs/${page.slug}`), `Missing Markdown routing for ${page.slug}`);
    const markdown = await readFile(new URL(`src/lib/content/docs/${page.slug}.md`, root), "utf8");
    assert(markdown.startsWith(`# ${page.title}\n`), `Title mismatch: ${page.slug}`);
    assert(page.sources.length > 0, `Missing source evidence: ${page.slug}`);
    for (const source of page.sources) {
        const url = new URL(source);
        const [, , repo, kind, revision] = url.pathname.split("/");
        assert(
            (kind === "blob" || kind === "tree") && /^[a-f0-9]{40}$/.test(revision),
            `Mutable source reference: ${page.slug}`
        );
        assert.equal(
            revision,
            sourceRevisions[repo],
            `Source differs from the recorded baseline: ${page.slug}`
        );
        assert(
            url.protocol === "https:" &&
                url.hostname === "github.com" &&
                url.pathname.startsWith("/marmot-protocol/"),
            `Untrusted source: ${page.slug}`
        );
    }
}
assert.deepEqual(
    routes.filter((route) => route === "/docs" || route.startsWith("/docs/")).sort(),
    ["/docs", "/docs/marmot/README.md", ...pages.map((page) => `/docs/${page.slug}`)].sort(),
    "Published documentation routes must match the registry and preserved legacy page"
);
for (const capture of captures) {
    assert(capture.guides.length > 0, "Capture must illustrate a guide");
    for (const slug of capture.guides)
        assert(
            pages.some((page) => page.slug === slug && page.platform === capture.platform),
            `Unknown capture guide: ${slug}`
        );
    assert(
        capture.platform === "android" && capture.cleanupVerified,
        "Capture lacks device cleanup evidence"
    );
    assert(/^\/docs\/android\/[a-z-]+\.png$/.test(capture.url), "Unexpected capture path");
    for (const slug of capture.guides) {
        const guide = await readFile(new URL(`src/lib/content/docs/${slug}.md`, root), "utf8");
        assert(
            guide.includes(`src="${capture.presentation.url}"`),
            `Screenshot must appear beside its task: ${capture.id}`
        );
    }
    const bytes = await readFile(new URL(`static${capture.url}`, root));
    assert.equal(
        createHash("sha256").update(bytes).digest("hex"),
        capture.imageSha256,
        `Changed capture: ${capture.id}`
    );
    const { crop, highlights, url } = capture.presentation;
    assert.equal(url, capture.url.replace(/\.png$/, ".svg"));
    assert(crop.y >= 132 && crop.y + crop.height <= 2330, "System bars must be outside the crop");
    assert(
        crop.x >= 0 &&
            crop.width > 0 &&
            crop.height > 0 &&
            crop.x + crop.width <= capture.dimensions.width
    );
    for (const rectangle of highlights) {
        assert(rectangle.x >= crop.x && rectangle.y >= crop.y);
        assert(rectangle.width > 0 && rectangle.height > 0);
        assert(rectangle.x + rectangle.width <= crop.x + crop.width);
        assert(rectangle.y + rectangle.height <= crop.y + crop.height);
    }
    assert.equal(
        await readFile(new URL(`static${url}`, root), "utf8"),
        documentationImage(capture, bytes),
        "Presentation must preserve the original pixels and measured crop"
    );
    assert.match(capture.source, /^[a-f0-9]{40}$/);
    assert.match(capture.apkSha256, /^[a-f0-9]{64}$/);
}
await access(new URL("docs/documentation-maintenance.md", root));
assert(
    (await readFile(new URL("static/robots.txt", root), "utf8")).includes(
        "Sitemap: https://www.whitenoise.chat/docs/sitemap.xml"
    ),
    "Documentation sitemap must remain discoverable"
);
console.log(
    `Documentation integrity: ${pages.length} guides, ${captures.length} verified capture files`
);
