const PRIMARY_HOSTNAME = "www.whitenoise.chat";
const APEX_HOSTNAME = "whitenoise.chat";
const TRACKING_QUERY_PARAMS = new Set([
    "fbclid",
    "gclid",
    "msclkid",
    "ref",
    "utm_campaign",
    "utm_content",
    "utm_id",
    "utm_medium",
    "utm_source",
    "utm_term",
]);

function hasTrackingParams(url: URL): boolean {
    return [...url.searchParams.keys()].some((key) => TRACKING_QUERY_PARAMS.has(key));
}

export function getCanonicalRedirect(url: URL): string | null {
    const redirectUrl = new URL(url);
    let shouldRedirect = false;

    if (redirectUrl.hostname === APEX_HOSTNAME) {
        redirectUrl.hostname = PRIMARY_HOSTNAME;
        shouldRedirect = true;
    }

    if (redirectUrl.pathname.length > 1 && redirectUrl.pathname.endsWith("/")) {
        redirectUrl.pathname = redirectUrl.pathname.replace(/\/+$/, "");
        shouldRedirect = true;
    }

    if (hasTrackingParams(redirectUrl)) {
        for (const key of [...redirectUrl.searchParams.keys()]) {
            if (TRACKING_QUERY_PARAMS.has(key)) {
                redirectUrl.searchParams.delete(key);
                shouldRedirect = true;
            }
        }
    }

    return shouldRedirect ? redirectUrl.toString() : null;
}
