<script lang="ts">
import type { Snippet } from "svelte";

let {
    href,
    children,
    external = false,
    ariaLabel,
}: {
    href: string;
    children: Snippet;
    external?: boolean;
    ariaLabel?: string;
} = $props();
</script>
<a class="text-link" {href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} aria-label={ariaLabel}>{@render children()}</a>
