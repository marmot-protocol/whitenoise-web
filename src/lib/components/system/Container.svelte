<script lang="ts">
import type { Snippet } from "svelte";

let { children, class: className = "" }: { children: Snippet; class?: string } = $props();
</script>
<div class={`site-width ${className}`}>{@render children()}</div>
