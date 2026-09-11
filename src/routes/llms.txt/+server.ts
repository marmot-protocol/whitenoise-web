import overview from "$lib/content/overview.md?raw";

export const prerender = true;
export function GET() {
    return new Response(overview, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
