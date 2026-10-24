<script lang="ts">
import Text from "#lib/components/system/Text.svelte";

let { title, description }: { title: string; description?: string } = $props();
</script>

<header class="page-intro">
    <Text as="h1" role="display">{title}</Text>
    {#if description}<p class="page-description">{description}</p>{/if}
</header>
