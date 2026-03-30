import { type Handle, redirect } from "@sveltejs/kit";
import { getCanonicalRedirect } from "$lib/canonical-url";

export const handle: Handle = async ({ event, resolve }) => {
    const canonicalRedirect = getCanonicalRedirect(event.url);

    if (canonicalRedirect) {
        redirect(308, canonicalRedirect);
    }

    return resolve(event);
};
