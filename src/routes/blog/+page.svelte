<script lang="ts">
import JsonLd from "$lib/components/JsonLd.svelte";
import BlogImage from "$lib/components/rebuild/BlogImage.svelte";
import TextLink from "$lib/components/system/TextLink.svelte";
import type { PageData } from "./$types";

let { data }: { data: PageData } = $props();

function formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

const blogSchema = $derived.by(() => ({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "White Noise Blog",
    description:
        "Project updates and articles about secure messaging, privacy, and the Marmot Protocol.",
    url: "https://www.whitenoise.chat/blog",
    inLanguage: "en",
    publisher: {
        "@type": "Organization",
        name: "The Marmot Protocol",
        url: "https://github.com/marmot-protocol",
    },
    mainEntity: {
        "@type": "ItemList",
        itemListElement: data.posts.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `https://www.whitenoise.chat/blog/${post.naddr}`,
            name: post.title,
        })),
    },
}));
</script>

<svelte:head>
    <title>Blog | White Noise</title>
    <link rel="canonical" href="https://www.whitenoise.chat/blog" />
    <meta
        name="description"
        content="Latest updates and articles from the White Noise team about secure messaging, privacy, and the Nostr protocol."
    />
</svelte:head>

<JsonLd schema={blogSchema} />

<div class="site-width">
    <h1 class="sr-only">White Noise Blog</h1>
    <div class="blog-list">
        {#each data.posts as post}
            <a class="blog-entry" href={`/blog/${post.naddr}`} aria-label={post.title}
                ><article>
                    <h2>{post.title}</h2>
                    {#if post.summary}<p>{post.summary}</p>{/if}
                    <time
                        datetime={new Date(
                            (post.publishedAt || post.createdAt) * 1000,
                        ).toISOString()}>{formatDate(post.publishedAt || post.createdAt)}</time
                    >
                </article>
                <BlogImage src={post.image} /></a
            >
        {:else}
            <section class="empty-blog">
                <h2>A quiet moment.</h2>
                <p>
                    No articles are available from the network right now. You can check back later
                    or explore the developer guides and repositories.
                </p>
                <TextLink href="/build">For developers</TextLink>
            </section>
        {/each}
    </div>
</div>
