import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { error } from "@sveltejs/kit";
import publicStaticPages from "$lib/content/agent-pages.json";
import type { RequestHandler } from "./$types";

// The Vercel adapter excludes static page handlers. The build copies the exact
// public HTML snapshots into its function bundle for negotiated requests only.
// Normal browser requests still hit the original static files before this route.
let pages: Promise<Record<string, string>> | undefined;
export const GET: RequestHandler = async ({ url }) => {
    if (!publicStaticPages.includes(url.pathname)) error(404, "Page not found");
    pages ??= readFile(join(process.cwd(), "agent-pages.json"), "utf8")
        .then(JSON.parse)
        .catch((failure) => {
            pages = undefined;
            throw failure;
        });
    const snapshots = await pages;
    const html = Object.hasOwn(snapshots, url.pathname) ? snapshots[url.pathname] : undefined;
    if (html === undefined) error(404, "Page not found");
    return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
};

export const prerender = false;
