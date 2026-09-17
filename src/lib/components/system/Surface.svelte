<script lang="ts">
import type { Snippet } from "svelte";

let {
    tone = "muted",
    class: className = "",
    children,
    label,
}: {
    tone?: "muted" | "ink" | "paper";
    class?: string;
    children: Snippet;
    label?: string;
} = $props();
</script>
<section class={`system-surface surface-${tone} ${className}`} aria-label={label}>{@render children()}</section>
