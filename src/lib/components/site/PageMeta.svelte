<script lang="ts">
import { canonicalUrl, DEFAULT_SOCIAL_IMAGE, pageTitle, SITE_NAME } from "#lib/seo.js";

type SocialImage = { url: string; alt?: string; width?: number; height?: number };

let {
    title,
    description,
    path,
    site = SITE_NAME,
    type = "website",
    image,
    robots,
    publishedTime,
    modifiedTime,
}: {
    /** The page name without the site suffix. */
    title: string;
    description?: string;
    /** Root-relative canonical path. Omit only for pages that are not indexed. */
    path?: string;
    site?: string;
    type?: "website" | "article";
    image?: SocialImage;
    /** Set only for pages that must stay out of search results; they get no canonical URL. */
    robots?: "noindex" | "noindex, nofollow";
    publishedTime?: string;
    modifiedTime?: string;
} = $props();

const fullTitle = $derived(pageTitle(title, site));
const url = $derived(path && !robots ? canonicalUrl(path) : undefined);
const socialImage = $derived<SocialImage>(image ?? DEFAULT_SOCIAL_IMAGE);
</script>

<svelte:head>
    <title>{fullTitle}</title>
    {#if description}<meta name="description" content={description} />{/if}
    {#if robots}<meta name="robots" content={robots} />{/if}
    {#if url}<link rel="canonical" href={url} />{/if}
    <meta property="og:site_name" content={SITE_NAME} />
    <meta property="og:locale" content="en_US" />
    <meta property="og:type" content={type} />
    <meta property="og:title" content={fullTitle} />
    {#if description}<meta property="og:description" content={description} />{/if}
    {#if url}<meta property="og:url" content={url} />{/if}
    <meta property="og:image" content={socialImage.url} />
    {#if socialImage.width && socialImage.height}
        <meta property="og:image:width" content={String(socialImage.width)} />
        <meta property="og:image:height" content={String(socialImage.height)} />
    {/if}
    {#if socialImage.alt}<meta property="og:image:alt" content={socialImage.alt} />{/if}
    {#if type === "article" && publishedTime}<meta property="article:published_time" content={publishedTime} />{/if}
    {#if type === "article" && modifiedTime}<meta property="article:modified_time" content={modifiedTime} />{/if}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={fullTitle} />
    {#if description}<meta name="twitter:description" content={description} />{/if}
    <meta name="twitter:image" content={socialImage.url} />
    {#if socialImage.alt}<meta name="twitter:image:alt" content={socialImage.alt} />{/if}
</svelte:head>
