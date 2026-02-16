import { fetchBlogPostsCached } from "$lib/nostr";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
    const baseUrl = "https://whitenoise.chat";

    const staticPages = [
        { path: "/", changefreq: "weekly", priority: "1.0" },
        { path: "/download", changefreq: "monthly", priority: "0.9" },
        { path: "/privacy-matters", changefreq: "yearly", priority: "0.7" },
        { path: "/contribute", changefreq: "monthly", priority: "0.8" },
        { path: "/blog", changefreq: "weekly", priority: "0.8" },
    ];

    function escapeXml(s: string): string {
        return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
    }

    let blogEntries = "";
    try {
        const posts = await fetchBlogPostsCached();
        for (const post of posts) {
            if (post.naddr) {
                const lastmod = new Date(
                    (post.publishedAt || post.createdAt) * 1000,
                ).toISOString().split("T")[0];
                blogEntries += `
  <url>
    <loc>${baseUrl}/blog/${escapeXml(post.naddr)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
            }
        }
    } catch (err) {
        console.error("[sitemap] Error fetching blog posts:", err);
    }

    const today = new Date().toISOString().split("T")[0];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
    .map(
        (page) => `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
    )
    .join("\n")}${blogEntries}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "max-age=86400",
        },
    });
};
