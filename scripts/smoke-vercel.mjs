import assert from "node:assert/strict";
import { cp, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Keep the function outside the checkout so missing dependencies cannot resolve
// from the project's node_modules. Run with require(ESM) disabled, as on Vercel.
const isolatedBundle = await mkdtemp(join(tmpdir(), "whitenoise-vercel-smoke-"));
try {
    await cp(
        fileURLToPath(new URL("../.vercel/output/functions/![-]/catchall.func", import.meta.url)),
        isolatedBundle,
        { recursive: true }
    );
    const { default: handler } = await import(
        pathToFileURL(join(isolatedBundle, ".svelte-kit/vercel-tmp/index.js")).href
    );
    const response = await handler.fetch(new Request("https://www.whitenoise.chat/privacy"));
    assert.equal(response.status, 200, "The deployed privacy route must return HTTP 200");
    const html = await response.text();
    assert.ok(
        html.includes("<h1>Privacy Policy</h1>"),
        "The policy must be rendered on the server"
    );
    assert.ok(html.includes("privacy@ipf.dev"), "The policy must include its contact details");
    console.log("Vercel privacy route smoke test passed");
} finally {
    await rm(isolatedBundle, { recursive: true, force: true });
}
