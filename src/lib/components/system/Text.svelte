<script lang="ts">
import type { Snippet } from "svelte";
import type { TextRole } from "$lib/design-system/typography";

let {
    as = "p",
    role = "body",
    tone = "ink",
    children,
}: {
    as?: "h1" | "h2" | "h3" | "p" | "span";
    role?: TextRole;
    tone?: "ink" | "muted" | "inverse";
    children: Snippet;
} = $props();
</script>
<svelte:element this={as} class={`system-text type-${role} tone-${tone}`}>{@render children()}</svelte:element>
