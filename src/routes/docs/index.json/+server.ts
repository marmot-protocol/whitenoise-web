import { documentationIndex } from "#lib/server/user-documentation.js";

export const prerender = true;
export function GET() {
    return Response.json(
        { version: 1, pages: documentationIndex() },
        { headers: { "Cache-Control": "public, max-age=300", "Access-Control-Allow-Origin": "*" } }
    );
}
