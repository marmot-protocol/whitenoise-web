<script lang="ts">
import { page } from "$app/state";
import Icon from "$lib/components/system/Icon.svelte";

let open = $state(false);
let menuButton: HTMLButtonElement;
const links = [
    { label: "Privacy Matters", href: "/privacy-matters" },
    { label: "Blog", href: "/blog" },
    { label: "Contribute", href: "/contribute" },
    { label: "GitHub", href: "https://github.com/marmot-protocol" },
    { label: "Download", href: "/download" },
];

function closeMenu() {
    open = false;
}
function escapeMenu(event: KeyboardEvent) {
    if (event.key === "Escape" && open) {
        closeMenu();
        menuButton?.focus();
    }
}
</script>

<svelte:window onkeydown={escapeMenu} />
<header class="site-header">
    <div class="header-inner site-width">
        <div class="header-logo-slot">
            <a class="header-logo" href="/" aria-label="White Noise home" onclick={closeMenu}>
                <img src="/images/logomark.svg" alt="" width="48" height="37" />
            </a>
        </div>
        <nav class="desktop-nav" aria-label="Main navigation">
            {#each links as link}
                <a
                    href={link.href}
                    aria-current={page.url.pathname === link.href ? "page" : undefined}
                    >{link.label}</a
                >
            {/each}
        </nav>
        <button
            bind:this={menuButton}
            class="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onclick={() => (open = !open)}
        >
            {open ? "Close" : "Menu"}{#if open}<Icon name="close" />{:else}<Icon name="menu" />{/if}
        </button>
    </div>
    <nav
        id="mobile-navigation"
        class="mobile-nav site-width"
        hidden={!open}
        aria-label="Mobile navigation"
    >
        {#each links as link}
            <a
                href={link.href}
                aria-current={page.url.pathname === link.href ? "page" : undefined}
                onclick={closeMenu}>{link.label}</a
            >
        {/each}
    </nav>
</header>
