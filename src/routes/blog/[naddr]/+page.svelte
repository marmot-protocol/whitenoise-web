<script lang="ts">
import { nestArticleHeadings } from "#lib/article.js";
import JsonLd from "#lib/components/JsonLd.svelte";
import BlogImage from "#lib/components/site/BlogImage.svelte";
import PageMeta from "#lib/components/site/PageMeta.svelte";
import Icon from "#lib/components/system/Icon.svelte";
import { breadcrumbSchema } from "#lib/seo.js";
import type { PageData } from "./$types";

let { data }: { data: PageData } = $props();
const articleHtml = $derived(nestArticleHeadings(data.safeHtml));

function formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
    });
}

const blogPostSchema = $derived.by(() => {
    const blogPostSchemaObj: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: data.post.title,
        url: `https://www.whitenoise.chat/blog/${data.post.naddr}`,
        datePublished: new Date(
            (data.post.publishedAt ?? data.post.createdAt) * 1000
        ).toISOString(),
        dateModified: new Date(data.post.createdAt * 1000).toISOString(),
        publisher: {
            "@type": "Organization",
            name: "Internet Privacy Foundation",
            url: "https://ipf.dev",
        },
        isAccessibleForFree: true,
        inLanguage: "en",
    };

    if (data.post.summary) blogPostSchemaObj.description = data.post.summary;
    if (data.post.image) blogPostSchemaObj.image = data.post.image;

    return blogPostSchemaObj;
});
</script>

<PageMeta
    title={data.post.title}
    site="White Noise Blog"
    description={data.post.summary || `Read ${data.post.title} on the White Noise blog`}
    path={`/blog/${data.post.naddr}`}
    type="article"
    image={data.post.image ? { url: data.post.image, alt: data.post.title } : undefined}
    publishedTime={new Date((data.post.publishedAt ?? data.post.createdAt) * 1000).toISOString()}
    modifiedTime={new Date(data.post.createdAt * 1000).toISOString()}
/>

<JsonLd schema={blogPostSchema} />
<JsonLd
    schema={breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: data.post.title, path: `/blog/${data.post.naddr}` },
    ])}
/>

<div class="site-width">
<article class="blog-article">
    <a class="blog-back type-ui" href="/blog"><Icon name="back" /><span>Back to blog</span></a>
    <header>
        <h1 class="article-heading">{data.post.title}</h1>
        <p class="small-note">
            Published on {formatDate(data.post.publishedAt ?? data.post.createdAt)}
        </p>
    </header>
    <BlogImage src={data.post.image} variant="article" />
    {#if data.post.summary}<p class="article-summary">{data.post.summary}</p>{/if}
    <div class="prose">{@html articleHtml}</div>
</article>
</div>
