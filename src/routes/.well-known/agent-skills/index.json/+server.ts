import { discoveryHeaders, skillIndex } from "#lib/server/agent-discovery.js";

export const prerender = true;
export function GET() {
    return Response.json(skillIndex, { headers: discoveryHeaders });
}
