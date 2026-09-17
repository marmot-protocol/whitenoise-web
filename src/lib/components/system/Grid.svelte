<script lang="ts">
import type { Snippet } from "svelte";

let {
    children,
    columns = 2,
    class: className = "",
}: { children: Snippet; columns?: 2 | 3; class?: string } = $props();
</script>
<div class={`system-grid grid-${columns} ${className}`}>{@render children()}</div>
