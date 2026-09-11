<script lang="ts">
import { type ArtworkName, artworkGeometry, artworkViewBox } from "$lib/design-system/artwork";

let { name = "lantern" }: { name?: ArtworkName } = $props();
const viewBox = $derived(artworkViewBox(name).join(" "));
</script>

<figure class="artwork" aria-hidden="true">
    <svg {viewBox} focusable="false" aria-hidden="true">
        <image href={`/images/rebuild/${name}.png`} width={artworkGeometry.sourceSize} height={artworkGeometry.sourceSize} />
    </svg>
</figure>
