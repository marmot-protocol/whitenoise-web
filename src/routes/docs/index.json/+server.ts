import { json } from "@sveltejs/kit";
import { documentationIndex } from "$lib/server/user-documentation";

export const prerender = true;
export function GET() {
    return json(
        { version: 1, pages: documentationIndex() },
        { headers: { "Cache-Control": "public, max-age=300", "Access-Control-Allow-Origin": "*" } }
    );
}
