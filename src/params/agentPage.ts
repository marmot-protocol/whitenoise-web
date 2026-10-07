import publicStaticPages from "$lib/content/agent-pages.json";
import type { ParamMatcher } from "@sveltejs/kit";

// Leave unknown URLs to SvelteKit's existing styled 404 and link checks.
export const match: ParamMatcher = (path) => publicStaticPages.includes(`/${path}`);
