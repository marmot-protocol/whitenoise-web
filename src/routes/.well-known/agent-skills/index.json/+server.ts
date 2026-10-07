import { json } from "@sveltejs/kit";
import { discoveryHeaders, skillIndex } from "$lib/server/agent-discovery";

export const prerender = true;
export function GET() {
    return json(skillIndex, { headers: discoveryHeaders });
}
