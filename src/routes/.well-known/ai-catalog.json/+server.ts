import { aiCatalog, discoveryHeaders } from "#lib/server/agent-discovery.js";

export const prerender = true;
export function GET() {
    return Response.json(aiCatalog, { headers: discoveryHeaders });
}
