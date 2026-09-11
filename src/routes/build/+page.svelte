<script lang="ts">
import GuidePage from "$lib/components/site/GuidePage.svelte";
import type { PageData } from "./$types";

let { data }: { data: PageData } = $props();
</script>
<GuidePage area="builders" document={data.document} />
