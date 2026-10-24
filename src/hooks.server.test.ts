import type { RequestEvent } from "@sveltejs/kit";
import type { ResolveOptions } from "@sveltejs/kit/hooks";
import { describe, expect, it } from "vitest";
import { handle } from "./hooks.server";

async function responseFor(accept: string, response: Response, method = "GET") {
    const event = {
        url: new URL("https://www.whitenoise.chat/download"),
        request: new Request("https://www.whitenoise.chat/download", {
            method,
            headers: { Accept: accept, "If-None-Match": '"html-body"' },
        }),
    } as RequestEvent;
    const result = await handle({
        event,
        resolve: async (_event: RequestEvent, _options?: ResolveOptions) => response,
    });
    return { result };
}

describe("Markdown response handling", () => {
    it("keeps HTML when a page has no main content element", async () => {
        const html = "<h1>Standalone page</h1>";
        const { result } = await responseFor(
            "text/markdown",
            new Response(html, { headers: { "Content-Type": "text/html" } })
        );
        expect(result.headers.get("Content-Type")).toBe("text/html");
        expect(result.headers.get("Vary")).toBe("Accept");
        expect(await result.text()).toBe(html);
    });
    it("converts successful HTML and retains security/cache headers", async () => {
        const { result } = await responseFor(
            "text/markdown",
            new Response("<main><h1>Download</h1></main>", {
                headers: {
                    "Content-Type": "text/html",
                    "Content-Security-Policy": "default-src 'self'",
                    Vary: "Accept-Encoding",
                    ETag: '"old"',
                    "Last-Modified": "Wed, 07 Oct 2026 08:35:38 GMT",
                    "Content-Length": "37",
                    "Cache-Control": "private",
                },
            })
        );
        expect(result.headers.get("Content-Type")).toBe("text/markdown; charset=utf-8");
        expect(result.headers.get("Content-Security-Policy")).toBe("default-src 'self'");
        expect(result.headers.get("Cache-Control")).toBe("private");
        expect(result.headers.get("Vary")).toBe("Accept-Encoding, Accept");
        expect(result.headers.get("ETag")).toBeNull();
        expect(result.headers.get("Last-Modified")).toBeNull();
        expect(result.headers.get("Content-Length")).toBeNull();
        expect(await result.text()).toContain("# Download");
    });
    it("keeps error and non-HTML responses intact", async () => {
        for (const [status, type, body] of [
            [503, "text/html", "<h1>Unavailable</h1>"],
            [200, "application/json", '{"ok":true}'],
        ] as const) {
            const { result } = await responseFor(
                "text/markdown",
                new Response(body, { status, headers: { "Content-Type": type } })
            );
            expect(result.status).toBe(status);
            expect(result.headers.get("Content-Type")).toBe(type);
            expect(await result.text()).toBe(body);
        }
    });
    it("varies default HTML and returns no HEAD response body", async () => {
        const html = "<main><h1>Download</h1></main>";
        const browser = await responseFor(
            "text/html",
            new Response(html, { headers: { "Content-Type": "text/html" } })
        );
        expect(await browser.result.text()).toBe(html);
        expect(browser.result.headers.get("Vary")).toBe("Accept");
        const head = await responseFor(
            "text/markdown",
            new Response(html, { headers: { "Content-Type": "text/html" } }),
            "HEAD"
        );
        expect(head.result.headers.get("Content-Type")).toContain("text/markdown");
        expect(await head.result.text()).toBe("");
    });
});

describe("Canonical redirects", () => {
    it("allows only the canonical origin as an external destination", async () => {
        for (const url of [
            "https://whitenoise.chat/download?utm_source=x",
            "http://www.whitenoise.chat/download",
        ]) {
            const event = { url: new URL(url), request: new Request(url) } as RequestEvent;
            await expect(
                handle({ event, resolve: async () => new Response("unexpected") })
            ).rejects.toMatchObject({
                status: 308,
                location: "https://www.whitenoise.chat/download",
            });
        }
    });
});
