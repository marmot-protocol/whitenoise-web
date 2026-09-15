import { error } from "@sveltejs/kit";
import { nip19 } from "nostr-tools";
import { fetchCanaryAttestations } from "$lib/server/nostr";
import type { PageServerLoad } from "./$types";

function formatNostrLink(id: string): string {
    return `https://njump.me/${nip19.noteEncode(id)}`;
}

export const load: PageServerLoad = async () => {
    const attestations = await fetchCanaryAttestations().catch((cause: unknown) => {
        console.error("[content] Content request failed", cause);
        error(503, "Content is temporarily unavailable. Please try again shortly.");
    });

    return {
        attestations: attestations.map((attestation) => ({
            ...attestation,
            url: formatNostrLink(attestation.id),
        })),
    };
};

export const prerender = false;
