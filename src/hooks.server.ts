import { type Handle, redirect } from "@sveltejs/kit";
import { getCanonicalRedirect } from "$lib/canonical-url";

export const handle: Handle = async ({ event, resolve }) => {
    const canonicalRedirect = getCanonicalRedirect(event.url);

    if (canonicalRedirect) {
        redirect(308, canonicalRedirect);
    }

    const response = await resolve(event);
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("X-Frame-Options", "DENY");
    if (response.status === 503) response.headers.set("Retry-After", "60");
    return response;
};
