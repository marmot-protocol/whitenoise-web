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
    "whitenoise-linux": baseline.linux.source,
    "whitenoise-web": baseline.connector.guideSource,
    mdk: baseline.development.mdkSource,
    marmot: baseline.development.protocolSource,
    "marmot-ts": baseline.development.typescriptSource,
};
for (const revision of [
    ...Object.values(sourceRevisions),
    baseline.android.releaseSource,
    baseline.linux.releaseSource,
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
    "settings/linux",
    "settings/linux/diagnostics",
    "settings/android/diagnostics",
    "settings/android/translation",
    "settings/android/dictation",
    "settings/ios/diagnostics",
    "settings/relays",
    "settings/identity",
    "compatibility",
    "get-started/install/android",
    "get-started/install/ios",
    "get-started/install/linux",
    "get-started/first-message/android",
    "get-started/first-message/ios",
    "get-started/first-message/linux",
    "using/profiles/android",
    "using/profiles/ios",
    "using/profiles/linux",
    "using/contacts/android",
    "using/contacts/ios",
    "using/contacts/linux",
    "using/groups/android",
    "using/groups/ios",
    "using/groups/linux",
    "using/messages/android",
    "using/messages/ios",
    "using/messages/linux",
    "using/media/android",
    "using/media/ios",
    "using/media/linux",
    "using/notifications/android",
    "using/notifications/ios",
    "using/notifications/linux",
    "using/recovery/android",
    "using/recovery/ios",
    "using/recovery/linux",
    "using/privacy/android",
    "using/privacy/ios",
    "using/privacy/linux",
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
    const platform = page.slug.match(/\/(android|ios|linux)(?:\/|$)/)?.[1] ?? "shared";
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
            pages.some(
                (page) =>
                    page.slug === slug &&
                    (page.platform === capture.platform || page.platform === "shared")
            ),
            `Unknown capture guide: ${slug}`
        );
    const kind = capture.kind ?? "device";
    assert(["device", "source-render", "desktop"].includes(kind), "Unknown image evidence kind");
    if (kind === "device") {
        assert(
            capture.platform === "android" && capture.cleanupVerified,
            "Capture lacks device cleanup evidence"
        );
        assert.match(capture.apkSha256, /^[a-f0-9]{64}$/);
    } else if (kind === "source-render") {
        assert.equal(capture.platform, "android");
        assert.equal(capture.source, baseline.android.currentSource);
        assert(
            capture.sourceImage.startsWith(
                `https://github.com/marmot-protocol/whitenoise-android/blob/${capture.source}/app/src/test/snapshots/`
            ),
            "Reference image must have pinned app provenance"
        );
        assert(capture.sourceImage.endsWith(".png"));
        assert(
            !capture.apkSha256 && !capture.cleanupVerified,
            "Reference renders must not claim device qualification"
        );
    } else if (kind === "desktop") {
        assert.equal(capture.platform, "linux");
        assert.equal(capture.source, baseline.linux.releaseSource);
        assert.equal(capture.build, baseline.linux.releaseVersion);
        const prefix = `https://github.com/marmot-protocol/whitenoise-linux/releases/download/${capture.build}/WhiteNoise-${capture.build}-`;
        assert(
            ["linux-amd64.tar.gz", "linux-arm64.tar.gz", "x86_64.AppImage", "x86_64.flatpak"].some(
                (suffix) => capture.packageUrl === prefix + suffix
            ),
            "Desktop package must be a version-pinned public Linux release asset"
        );
        for (const digest of [capture.packageSha256, capture.executableSha256, capture.imageSha256])
            assert.match(digest, /^[a-f0-9]{64}$/);
        assert.equal(capture.fixture, "synthetic isolated accounts");
        assert.equal(capture.runtime, "SDL dummy video driver");
        assert.equal(capture.cleanupVerified, true);
        assert(
            !capture.apkSha256 && !capture.device && !capture.sourceImage,
            "Desktop captures must not claim Android or source-render evidence"
        );
        assert.match(capture.capturedAt, /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z)?$/);
        assert(!Number.isNaN(Date.parse(capture.capturedAt)), "Invalid desktop capture date");
        for (const size of [capture.dimensions.width, capture.dimensions.height])
            assert(
                Number.isInteger(size) && size > 0,
                "Desktop image dimensions must be positive pixels"
            );
    }
    assert(["android", "ios", "linux"].includes(capture.platform));
    assert(
        new RegExp(`^/docs/${capture.platform}/[a-z-]+\\.png$`).test(capture.url),
        "Unexpected capture path"
    );
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
    if (kind === "desktop") {
        assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
        assert.equal(bytes.readUInt32BE(16), capture.dimensions.width);
        assert.equal(bytes.readUInt32BE(20), capture.dimensions.height);
    }
    const { crop, highlights, url } = capture.presentation;
    assert.equal(url, capture.url.replace(/\.png$/, ".svg"));
    if (kind === "device")
        assert(
            crop.y >= 132 && crop.y + crop.height <= 2330,
            "System bars must be outside the crop"
        );
    assert(
        crop.y >= 0 && crop.y + crop.height <= capture.dimensions.height,
        "Crop exceeds image height"
    );
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

const screenCoverage = await readJson("src/lib/content/documentation-screens.json");
const screenKeys = new Set();
for (const screen of screenCoverage.screens) {
    const key = `${screen.platform}:${screen.id}`;
    assert(!screenKeys.has(key), `Duplicate screen: ${key}`);
    screenKeys.add(key);
    const repository = `whitenoise-${screen.platform}`;
    assert(
        screen.source.startsWith(
            `https://github.com/marmot-protocol/${repository}/blob/${sourceRevisions[repository]}/`
        ),
        `Unpinned screen source: ${key}`
    );
    assert(
        pages.some(
            (page) =>
                screen.guide.startsWith(`/docs/${page.slug}#`) &&
                (page.platform === screen.platform || page.platform === "shared")
        ),
        `Missing screen guide: ${key}`
    );
    assert(
        ["text", "delegated", ...captures.map((capture) => capture.id)].includes(screen.visual),
        `Missing screen capture: ${key}`
    );
    assert(screen.reason.length > 10, `Missing visual decision: ${key}`);
}
console.log(
    `Screen coverage: ${screenCoverage.screens.length} references; ${screenCoverage.excluded.length} excluded containers`
);
