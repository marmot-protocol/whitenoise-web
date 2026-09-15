<script lang="ts">
import { type IconName, icons } from "$lib/design-system/icons";

let { name }: { name: IconName } = $props();
const Glyph = $derived(icons[name]);
</script>
<span class="system-icon" aria-hidden="true"><Glyph size={20} /></span>
