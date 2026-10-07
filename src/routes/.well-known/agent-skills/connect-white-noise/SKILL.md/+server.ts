import { discoveryHeaders, skillMarkdown } from "$lib/server/agent-discovery";

export const prerender = true;
export function GET() {
    return new Response(skillMarkdown, {
        headers: { ...discoveryHeaders, "Content-Type": "text/markdown; charset=utf-8" },
    });
}
