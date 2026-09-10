<script lang="ts">
import Action from "$lib/components/system/Action.svelte";

let {
    href = "/download",
    label = "Download White Noise",
    secondary = false,
    external = false,
} = $props<{ href?: string; label?: string; secondary?: boolean; external?: boolean }>();
</script>
<Action {href} {label} {external} variant={secondary ? "secondary" : "primary"} icon={external ? "external" : href === "/download" ? "down" : "right"} />
