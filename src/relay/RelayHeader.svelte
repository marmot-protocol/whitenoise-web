<script lang="ts">
import ThemeToggle from "$lib/components/site/ThemeToggle.svelte";
</script>

<header class="site-header">
    <div class="header-inner site-width">
        <div class="header-logo-slot">
            <a class="header-logo" href="https://www.whitenoise.chat/" aria-label="White Noise website">
                <img src="/images/logomark.svg" alt="" width="48" height="37" />
            </a>
        </div>
        <div class="relay-header-actions"><ThemeToggle /></div>
    </div>
</header>
