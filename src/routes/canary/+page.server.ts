import { nip19 } from "nostr-tools";
import { fetchCanaryAttestations } from "$lib/nostr";
import type { PageServerLoad } from "./$types";

function formatNostrLink(id: string): string {
    return `https://njump.me/${nip19.noteEncode(id)}`;
}

export const load: PageServerLoad = async () => {
    const attestations = await fetchCanaryAttestations();

    return {
        attestations: attestations.map((attestation) => ({
            ...attestation,
            url: formatNostrLink(attestation.id),
        })),
    };
};
