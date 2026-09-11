<script lang="ts">
import GuidePage from "$lib/components/rebuild/GuidePage.svelte";
import type { PageData } from "./$types";

let { data }: { data: PageData } = $props();
</script>
<GuidePage area="marmot" document={data.document} />
