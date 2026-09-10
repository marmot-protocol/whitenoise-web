<script lang="ts">
import type { Snippet } from "svelte";
import Icon from "./Icon.svelte";

let {
    title,
    children,
    open = false,
}: { title: string; children: Snippet; open?: boolean } = $props();
</script>
<div class="faq-items system-disclosure"><details {open}><summary>{title}<Icon name="add" /></summary>{@render children()}</details></div>
