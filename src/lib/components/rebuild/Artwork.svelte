<script lang="ts">
import { type ArtworkName, artworkGeometry } from "$lib/design-system/artwork";

let { name = "lantern" }: { name?: ArtworkName } = $props();
const viewBox = $derived.by(() => {
    const [x, y, width, height] = artworkGeometry.bounds[name];
    const viewportWidth = height * (artworkGeometry.ratioWidth / artworkGeometry.ratioHeight);
    return `${x - (viewportWidth - width) / 2} ${y} ${viewportWidth} ${height}`;
});
</script>

<figure class="artwork normalized" aria-hidden="true">
    <svg {viewBox} focusable="false" aria-hidden="true">
        <image href={`/images/rebuild/${name}.png`} width={artworkGeometry.sourceSize} height={artworkGeometry.sourceSize} />
    </svg>
</figure>
