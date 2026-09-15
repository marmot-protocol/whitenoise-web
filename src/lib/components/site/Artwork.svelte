<script lang="ts">
import {
    type ArtworkName,
    type ArtworkNormalization,
    artworkCompactOffset,
    artworkSourceSize,
    artworkViewBox,
} from "$lib/design-system/artwork";

let {
    name = "smith-chain",
    normalization = "bounds",
}: { name?: ArtworkName; normalization?: ArtworkNormalization } = $props();
const viewBox = $derived(artworkViewBox(name, normalization).join(" "));
const sourceSize = $derived(artworkSourceSize(name));
</script>

<figure class="artwork" class:artwork--balanced={normalization === "visual-mass"} aria-hidden="true">
    <svg {viewBox} style:--artwork-compact-offset={`${artworkCompactOffset(name) * 100}%`} focusable="false" aria-hidden="true">
        <image href={`/images/artwork/${name}.webp`} width={sourceSize[0]} height={sourceSize[1]} />
    </svg>
</figure>
