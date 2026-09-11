<script lang="ts">
let { src, variant = "thumbnail" }: { src?: string | null; variant?: "thumbnail" | "article" } =
    $props();
let failedSource = $state<string>();
const placeholder = $derived(!src || src === failedSource);
</script>

<div class={`blog-image ${variant === "thumbnail" ? "blog-thumbnail" : "article-image"}`} class:blog-image-placeholder={placeholder}>
    {#if placeholder}
        <img class="blog-placeholder-logo" src="/images/logomark.svg" alt="" width="58" height="44" />
    {:else}
        <img class="blog-image-content" src={src || undefined} alt="" loading={variant === "thumbnail" ? "lazy" : "eager"} onerror={() => { failedSource = src || undefined; }} />
    {/if}
</div>
