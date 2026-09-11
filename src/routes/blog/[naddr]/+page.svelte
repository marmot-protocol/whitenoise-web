<script lang="ts">
import { nestArticleHeadings } from "$lib/article";
import JsonLd from "$lib/components/JsonLd.svelte";
import BlogImage from "$lib/components/rebuild/BlogImage.svelte";
import Icon from "$lib/components/system/Icon.svelte";
import type { PageData } from "./$types";

let { data }: { data: PageData } = $props();
const articleHtml = $derived(nestArticleHeadings(data.safeHtml));

function formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

const blogPostSchema = $derived.by(() => {
    const blogPostSchemaObj: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: data.post.title,
        url: `https://www.whitenoise.chat/blog/${data.post.naddr}`,
        datePublished: new Date(
            (data.post.publishedAt || data.post.createdAt) * 1000
        ).toISOString(),
        dateModified: new Date(data.post.createdAt * 1000).toISOString(),
        publisher: {
            "@type": "Organization",
            name: "The Marmot Protocol",
            url: "https://github.com/marmot-protocol",
        },
        isAccessibleForFree: true,
        inLanguage: "en",
    };

    if (data.post.summary) blogPostSchemaObj.description = data.post.summary;
    if (data.post.image) blogPostSchemaObj.image = data.post.image;

    return blogPostSchemaObj;
});
</script>

<svelte:head>
    <title>{data.post.title} | White Noise Blog</title>
    <meta
        name="description"
        content={data.post.summary || `Read ${data.post.title} on the White Noise blog`}
    />
    <meta property="og:title" content={data.post.title + " | White Noise Blog"} />
    <meta
        property="og:description"
        content={data.post.summary || `Read ${data.post.title} on the White Noise blog`}
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content={`https://www.whitenoise.chat/blog/${data.post.naddr}`} />
    {#if data.post.image}
        <meta property="og:image" content={data.post.image} />
    {/if}
    <link rel="canonical" href={`https://www.whitenoise.chat/blog/${data.post.naddr}`} />
</svelte:head>

<JsonLd schema={blogPostSchema} />

<div class="site-width">
<article class="blog-article">
    <a class="blog-back type-ui" href="/blog"><Icon name="back" /><span>Back to blog</span></a>
    <header>
        <h1 class="article-heading">{data.post.title}</h1>
        <p class="small-note">
            Published on {formatDate(data.post.publishedAt || data.post.createdAt)}
        </p>
    </header>
    <BlogImage src={data.post.image} variant="article" />
    {#if data.post.summary}<p class="article-summary">{data.post.summary}</p>{/if}
    <div class="prose">{@html articleHtml}</div>
</article>
</div>
