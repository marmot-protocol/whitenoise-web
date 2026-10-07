import { json } from "@sveltejs/kit";
import { aiCatalog, discoveryHeaders } from "$lib/server/agent-discovery";

export const prerender = true;
export function GET() {
    return json(aiCatalog, { headers: discoveryHeaders });
}
