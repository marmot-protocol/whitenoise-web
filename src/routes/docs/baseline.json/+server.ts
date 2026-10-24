import baseline from "#lib/content/documentation-baseline.json";

export const prerender = true;
export function GET() {
    return Response.json(baseline);
}
