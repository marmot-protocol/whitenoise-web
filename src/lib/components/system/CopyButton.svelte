<script lang="ts">
import { onDestroy } from "svelte";
import { motion } from "$lib/design-system/tokens";
import Icon from "./Icon.svelte";

let { value, label }: { value: string; label: string } = $props();
let copied = $state(false);
let status = $state("");
let timer: ReturnType<typeof setTimeout> | undefined;
onDestroy(() => clearTimeout(timer));
async function copy() {
    try {
        await navigator.clipboard.writeText(value);
        copied = true;
        status = `${label} copied.`;
        clearTimeout(timer);
        timer = setTimeout(() => {
            copied = false;
            status = "";
        }, motion.copyFeedbackMs);
    } catch {
        clearTimeout(timer);
        copied = false;
        status = "Copy is unavailable. Select the text and copy it manually.";
    }
}
</script>
<button class="icon-button" type="button" aria-label={`Copy ${label.toLowerCase()}`} onclick={copy} data-copied={copied}><Icon name={copied ? "check" : "copy"} /></button>
<span class="sr-only" role="status">{status}</span>
