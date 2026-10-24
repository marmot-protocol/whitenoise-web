import { redirect } from "@sveltejs/kit";
import type { Handle } from "@sveltejs/kit/hooks";
import { getCanonicalRedirect } from "#lib/canonical-url.js";
import { pageMarkdown, prefersMarkdown, varyOnAccept } from "#lib/server/agent-markdown.js";
import { building } from "$app/env";

export const handle: Handle = async ({ event, resolve }) => {
    const canonicalRedirect = getCanonicalRedirect(event.url);

    if (canonicalRedirect) {
        // Apex and plain-HTTP requests redirect off-origin, only ever to the canonical origin.
        redirect(308, canonicalRedirect, { external: ["https://www.whitenoise.chat"] });
    }

    const markdown =
        !building &&
        ["GET", "HEAD"].includes(event.request.method) &&
        prefersMarkdown(event.request.headers.get("Accept"));
    let response = await resolve(event);
    if (response.headers.get("Content-Type")?.startsWith("text/html")) {
        varyOnAccept(response.headers);
        if (markdown && response.status === 200) {
            const content = pageMarkdown(
                await response.clone().text(),
                new URL(event.url.pathname, "https://www.whitenoise.chat")
            );
            if (content !== null) {
                // HTML validators and byte ranges do not describe the converted body. Without an
                // ETag, SvelteKit cannot answer the request's If-None-Match with the HTML's 304.
                const headers = new Headers(response.headers);
                for (const name of [
                    "Content-Length",
                    "Content-Encoding",
                    "Content-Range",
                    "ETag",
                    "Last-Modified",
                ]) {
                    headers.delete(name);
                }
                headers.set("Content-Type", "text/markdown; charset=utf-8");
                response = new Response(event.request.method === "HEAD" ? null : content, {
                    headers,
                });
            }
        }
    }
    response.headers.set("Content-Signal", "ai-train=no, search=yes, ai-input=yes");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("X-Frame-Options", "DENY");
    if (response.status === 503) response.headers.set("Retry-After", "60");
    return response;
};
