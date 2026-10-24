import { documentationIndex } from "#lib/server/user-documentation.js";

export const prerender = true;
export function GET() {
    const urls = ["/docs", ...documentationIndex().map((page) => page.url)];
    return new Response(
        `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>https://www.whitenoise.chat${url}</loc></url>`).join("")}</urlset>`,
        { headers: { "Content-Type": "application/xml" } }
    );
}
