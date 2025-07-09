<script lang="ts">
import Download from "carbon-icons-svelte/lib/Download.svelte";

let { size = 20 }: { size?: 16 | 20 | 24 | 32 } = $props();
</script>

<a href="/download" class="bg-cyan-300 hover:bg-cyan-400 text-glitch-950 px-6 py-2 text-xl flex flex-row gap-3 items-center font-medium mt-4">
    <Download {size} class="w-5 h-5" /> Download
</a>
