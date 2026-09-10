<script lang="ts">
import { type ArtworkName, artworkGeometry } from "$lib/design-system/artwork";

let {
    name = "lantern",
    compact = false,
    normalized = false,
}: {
    name?: ArtworkName;
    compact?: boolean;
    normalized?: boolean;
} = $props();
const viewBox = $derived.by(() => {
    const [x, y, width, height] = artworkGeometry.bounds[name];
    const viewportWidth = height * (artworkGeometry.ratioWidth / artworkGeometry.ratioHeight);
    return `${x - (viewportWidth - width) / 2} ${y} ${viewportWidth} ${height}`;
});
</script>

<figure class="artwork" class:compact class:normalized class:roots={name === "roots"} aria-hidden="true">
    {#if normalized}
        <svg {viewBox} focusable="false" aria-hidden="true">
            <image href={`/images/rebuild/${name}.png`} width={artworkGeometry.sourceSize} height={artworkGeometry.sourceSize} />
        </svg>
    {:else}
        <img
            src={`/images/rebuild/${name}.png`}
            alt=""
            width={artworkGeometry.sourceSize}
            height={artworkGeometry.sourceSize}
            loading="lazy"
            decoding="async"
        />
    {/if}
</figure>
