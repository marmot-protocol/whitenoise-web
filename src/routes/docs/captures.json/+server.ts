import captures from "#lib/content/documentation-captures.json";

export const prerender = true;
export function GET() {
    return Response.json({ captures });
}
