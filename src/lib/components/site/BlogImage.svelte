<script lang="ts">
import type { Attachment } from "svelte/attachments";

let { src, variant = "thumbnail" }: { src?: string | null; variant?: "thumbnail" | "article" } =
    $props();
let failedSource = $state<string>();
const placeholder = $derived(!src || src === failedSource);

// The CSP blocks Svelte's inline replay handler, so an image that failed before hydration is detected here.
const fallBackWhenBroken: Attachment<HTMLImageElement> = (image) => {
    const fail = () => {
        failedSource = src || undefined;
    };
    image.addEventListener("error", fail);
    if (image.complete && image.naturalWidth === 0) {
        // Some browsers report zero for a valid SVG without intrinsic size; only a broken image fails to decode.
        const requested = image.src;
        image.decode().catch(() => {
            if (image.src === requested) fail();
        });
    }
    return () => image.removeEventListener("error", fail);
};
</script>

<div class={`blog-image ${variant === "thumbnail" ? "blog-thumbnail" : "article-image"}`} class:blog-image-placeholder={placeholder}>
    {#if placeholder}
        <img class="blog-placeholder-logo" src="/images/logomark.svg" alt="" width="58" height="44" />
    {:else}
        <img class="blog-image-content" src={src || undefined} alt="" loading={variant === "thumbnail" ? "lazy" : "eager"} {@attach fallBackWhenBroken} />
    {/if}
</div>
