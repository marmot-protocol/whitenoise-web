import { render } from "svelte/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const page = vi.hoisted(() => ({ status: 404, error: { message: "" } as { message: string } }));
vi.mock("$app/state", () => ({ page }));

import ErrorPage from "./+error.svelte";

describe("error page robots", () => {
    beforeEach(() => {
        page.error = { message: "" };
    });

    it("keeps missing pages out of search", () => {
        page.status = 404;
        expect(render(ErrorPage).head).toContain('<meta name="robots" content="noindex"');
    });

    it("leaves outages retryable instead of excluding the URL", () => {
        page.status = 503;
        const { head } = render(ErrorPage);
        expect(head).toContain("Something went wrong");
        expect(head).not.toContain('name="robots"');
    });
});
