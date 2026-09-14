import assert from "node:assert/strict";
import handler from "../.vercel/output/functions/![-]/catchall.func/.svelte-kit/vercel-tmp/index.js";

// Exercise the deployed handler with require(ESM) disabled, as on Vercel's Node runtime.
const response = await handler.fetch(new Request("https://www.whitenoise.chat/privacy"));
assert.equal(response.status, 200, "The deployed privacy route must return HTTP 200");
const html = await response.text();
assert.ok(html.includes("<h1>Privacy Policy</h1>"), "The policy must be rendered on the server");
assert.ok(html.includes("privacy@ipf.dev"), "The policy must include its contact details");
console.log("Vercel privacy route smoke test passed");
