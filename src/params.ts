import { defineParams } from "@sveltejs/kit/params";
// SvelteKit imports this file with Node during the build, so JSON needs an import attribute.
import publicStaticPages from "#lib/content/agent-pages.json" with { type: "json" };

export const params = defineParams({
    // Leave unknown URLs to SvelteKit's existing styled 404 and link checks.
    agentPage: (path) => (publicStaticPages.includes(`/${path}`) ? path : undefined),
});
