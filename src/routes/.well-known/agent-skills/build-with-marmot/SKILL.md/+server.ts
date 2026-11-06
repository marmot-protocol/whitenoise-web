import { discoveryHeaders, skillMarkdown } from "#lib/server/agent-discovery.js";

export const prerender = true;
export function GET() {
    return new Response(skillMarkdown("build-with-marmot"), {
        headers: { ...discoveryHeaders, "Content-Type": "text/markdown; charset=utf-8" },
    });
}
