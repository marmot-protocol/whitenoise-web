<script lang="ts">
import Text from "$lib/components/system/Text.svelte";

let { eyebrow, title, description } = $props<{
    eyebrow?: string;
    title: string;
    description?: string;
}>();
</script>

<header class="page-intro">
    {#if eyebrow}<p class="eyebrow">{eyebrow}</p>{/if}
    <Text as="h1" role="display">{title}</Text>
    {#if description}<p class="page-description">{description}</p>{/if}
</header>
