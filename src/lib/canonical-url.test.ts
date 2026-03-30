import { describe, expect, it } from "vitest";
import { getCanonicalRedirect } from "./canonical-url";

describe("getCanonicalRedirect", () => {
    it("redirects the apex host to the primary hostname", () => {
        expect(getCanonicalRedirect(new URL("https://whitenoise.chat/build"))).toBe(
            "https://www.whitenoise.chat/build"
        );
    });

    it("removes trailing slashes from non-root pages", () => {
        expect(getCanonicalRedirect(new URL("https://www.whitenoise.chat/blog/"))).toBe(
            "https://www.whitenoise.chat/blog"
        );
    });

    it("strips tracking query parameters", () => {
        expect(
            getCanonicalRedirect(
                new URL("https://www.whitenoise.chat/?ref=iconpik.com&utm_source=google")
            )
        ).toBe("https://www.whitenoise.chat/");
    });

    it("keeps non-tracking query parameters untouched", () => {
        expect(getCanonicalRedirect(new URL("https://www.whitenoise.chat/?page=2"))).toBeNull();
    });

    it("returns a single canonical redirect when multiple fixes are needed", () => {
        expect(
            getCanonicalRedirect(
                new URL("https://whitenoise.chat/build/?fbclid=123&utm_medium=social")
            )
        ).toBe("https://www.whitenoise.chat/build");
    });
});
