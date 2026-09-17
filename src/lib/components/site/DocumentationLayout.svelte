<script lang="ts">
import type { Snippet } from "svelte";
import GuideNavigation from "$lib/components/site/GuideNavigation.svelte";
import type { GuideArea } from "$lib/documentation-navigation";

let { area, children }: { area: GuideArea; children: Snippet } = $props();
</script>
<div class="site-width docs-layout">
    <div class="docs-main">{@render children()}</div>
    <GuideNavigation {area} />
</div>
