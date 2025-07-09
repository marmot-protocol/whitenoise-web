<script lang="ts">
import "../app.css";
import Footer from "$lib/components/Footer.svelte";
import Header from "$lib/components/Header.svelte";

const { children } = $props();
</script>

<div class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-1">
        {@render children()}
    </main>
    <Footer />
</div>
