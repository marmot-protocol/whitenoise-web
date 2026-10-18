<script lang="ts">
import GuidePage from "$lib/components/site/GuidePage.svelte";
import UserGuide from "$lib/components/site/UserGuide.svelte";
import type { PageData } from "./$types";

let { data }: { data: PageData } = $props();
</script>
{#if data.userDocument}<UserGuide document={data.userDocument} />{:else if data.document}<GuidePage area="marmot" document={data.document} />{/if}
