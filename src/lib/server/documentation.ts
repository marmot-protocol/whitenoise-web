import { error } from "@sveltejs/kit";
import { type DocSource, type Documentation, validDocSource } from "$lib/documentation";
import { renderDocumentation } from "./docs-markdown";
import snapshot from "./docs-snapshot.json";

type Saved = { markdown: string; checkedAt: string; revision?: string; etag?: string };
type Cached = { document: Saved; refreshAfter: number; savedCopy: boolean };
const saved: Record<string, Saved> = snapshot;
const known = new Set(Object.keys(saved));
const HOUR = 60 * 60 * 1000;

export function createDocumentationReader(
    fetcher: typeof fetch = fetch,
    fallbacks: Record<string, Saved> = saved,
    now = Date.now
) {
    const cache = new Map<string, Cached>();
    const pending = new Map<string, Promise<Cached>>();
    async function refresh(source: DocSource, previous?: Saved): Promise<Cached> {
        try {
            const response = await fetcher(
                `https://raw.githubusercontent.com/marmot-protocol/${source.repo}/master/${source.path}`,
                {
                    headers: previous?.etag ? { "If-None-Match": previous.etag } : {},
                    signal: AbortSignal.timeout(5000),
                    redirect: "error",
                }
            );
            if (response.status === 404) error(404, "Documentation not found");
            if (response.status === 304 && previous)
                return {
                    document: { ...previous, checkedAt: new Date(now()).toISOString() },
                    refreshAfter: now() + HOUR,
                    savedCopy: false,
                };
            if (!response.ok) throw new Error(`Documentation source returned ${response.status}`);
            if (Number(response.headers.get("content-length")) > 1_000_000)
                throw new Error("Documentation is too large");
            const markdown = await response.text();
            if (
                !markdown.trim() ||
                markdown.length > 1_000_000 ||
                /^\s*<!doctype html/i.test(markdown)
            )
                throw new Error("Invalid documentation response");
            return {
                document: {
                    markdown,
                    checkedAt: new Date(now()).toISOString(),
                    etag: response.headers.get("etag") || undefined,
                },
                refreshAfter: now() + HOUR,
                savedCopy: false,
            };
        } catch (cause) {
            if (cause && typeof cause === "object" && "status" in cause && cause.status === 404)
                throw cause;
            if (previous)
                return { document: previous, refreshAfter: now() + 5 * 60 * 1000, savedCopy: true };
            error(503, "This guide is temporarily unavailable. Please try again shortly.");
        }
    }
    return async (source: DocSource): Promise<Documentation> => {
        if (!validDocSource(source.repo, source.path)) error(404, "Documentation not found");
        const key = `${source.repo}/${source.path}`;
        let entry = cache.get(key);
        if (!entry || entry.refreshAfter <= now()) {
            let request = pending.get(key);
            if (!request) {
                request = refresh(source, entry?.document || fallbacks[key]);
                pending.set(key, request);
            }
            try {
                entry = await request;
                if (cache.size >= 100) cache.delete(cache.keys().next().value as string);
                cache.set(key, entry);
            } finally {
                pending.delete(key);
            }
        }
        return {
            ...renderDocumentation(entry.document.markdown, source, known),
            source,
            sourceUrl: `https://github.com/marmot-protocol/${source.repo}/blob/${entry.document.revision || "master"}/${source.path}`,
            checkedAt: entry.document.checkedAt,
            savedCopy: entry.savedCopy,
        };
    };
}

export const readDocumentation = createDocumentationReader();
