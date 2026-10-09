<script lang="ts">
import { onDestroy } from "svelte";
import { copyFeedbackMs } from "$lib/design-system/runtime";
import Action from "./Action.svelte";
import Icon from "./Icon.svelte";

let { value, label, buttonLabel }: { value: string; label: string; buttonLabel?: string } =
    $props();
let copied = $state(false);
let status = $state("");
let timer: ReturnType<typeof setTimeout> | undefined;
let disposed = false;
onDestroy(() => {
    disposed = true;
    clearTimeout(timer);
});
async function copy() {
    try {
        await navigator.clipboard.writeText(value);
        if (disposed) return;
        copied = true;
        status = `${label} copied.`;
        clearTimeout(timer);
        timer = setTimeout(() => {
            copied = false;
            status = "";
        }, copyFeedbackMs);
    } catch {
        clearTimeout(timer);
        copied = false;
        status = "Copy is unavailable. Select the text and copy it manually.";
    }
}
</script>
{#if buttonLabel}
    <Action label={buttonLabel} icon={copied ? "check" : "copy"} onclick={copy} />
{:else}
    <button class="icon-button" type="button" aria-label={`Copy ${label.toLowerCase()}`} onclick={copy} data-copied={copied}><Icon name={copied ? "check" : "copy"} /></button>
{/if}
<span class="sr-only" role="status">{status}</span>
