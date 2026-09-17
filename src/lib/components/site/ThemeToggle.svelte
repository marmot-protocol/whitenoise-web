<script lang="ts">
import { onMount } from "svelte";
import Icon from "$lib/components/system/Icon.svelte";

let dark = $state(false);
let ready = $state(false);
const label = $derived(dark ? "Switch to light mode" : "Switch to dark mode");

onMount(() => {
    const theme = window.whiteNoiseTheme;
    if (!theme) return;
    const sync = () => {
        dark = theme.dark;
    };
    sync();
    ready = true;
    window.addEventListener("wn-theme-change", sync);
    return () => window.removeEventListener("wn-theme-change", sync);
});
</script>

<button class="icon-button theme-toggle" aria-label={label} title={label} disabled={!ready} onclick={() => window.whiteNoiseTheme?.toggle()}>
    <Icon name="theme-toggle-icon" />
</button>
