<script lang="ts">
import type { IconName } from "$lib/design-system/icons";
import Icon from "./Icon.svelte";

let {
    href,
    label,
    icon,
    variant = "primary",
    external = false,
    disabled = false,
    onclick,
    class: className = "",
}: {
    href?: string;
    label: string;
    icon?: IconName;
    variant?: "primary" | "secondary";
    external?: boolean;
    disabled?: boolean;
    onclick?: (event: MouseEvent) => void;
    class?: string;
} = $props();
</script>
{#snippet content()}{label}{#if icon}<Icon name={icon} />{/if}{/snippet}
{#if href && !disabled}
    <a class={`wn-button ${variant === "secondary" ? "secondary" : ""} ${className}`} {href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} {onclick}>{@render content()}</a>
{:else}
    <button type="button" class={`wn-button ${variant === "secondary" ? "secondary" : ""} ${className}`} {disabled} {onclick}>{@render content()}</button>
{/if}
