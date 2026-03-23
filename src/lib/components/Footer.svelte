<script lang="ts">
import { derived } from "svelte/store";
import { page } from "$app/stores";
import DownloadButton from "./DownloadButton.svelte";

const showDownloadButton = derived(page, ($page) => $page.url.pathname !== "/download");
</script>

<footer class="bg-glitch-50 text-glitch-950">
    <div class="max-w-7xl mx-auto flex flex-row items-center py-6 gap-x-10 px-12 justify-between">
        <div class="flex flex-col items-start">
            {#if $showDownloadButton}
                <div class="mb-2">
                    <DownloadButton size={24} />
                </div>
            {/if}
        </div>
        <div class="flex flex-col items-end gap-2 text-right text-base">
            <a href="/privacy-matters" class="hover:underline">Privacy Matters</a>
            <a href="/#faqs" class="hover:underline">FAQ</a>
            <a href="/blog" class="hover:underline">Blog</a>
            <a href="/build" class="hover:underline">Build</a>
            <a href="/contribute" class="hover:underline">Contribute</a>
            <span class="text-xs text-glitch-400 mt-2">©2025 White Noise</span>
        </div>
    </div>
</footer>
