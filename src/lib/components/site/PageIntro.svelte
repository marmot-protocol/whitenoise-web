<script lang="ts">
import type { Snippet } from "svelte";
import Text from "$lib/components/system/Text.svelte";

let { title, description } = $props<{
    title: string;
    description?: string | Snippet;
}>();
</script>

<header class="page-intro">
    <Text as="h1" role="display">{title}</Text>
    {#if description}<p class="page-description">{#if typeof description === "string"}{description}{:else}{@render description()}{/if}</p>{/if}
</header>
