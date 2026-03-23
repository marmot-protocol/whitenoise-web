<script lang="ts">
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

const blogSchemaJson = $derived.by(() =>
    JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "White Noise Blog",
        description:
            "Project updates and articles about secure messaging, privacy, and the Marmot Protocol.",
        url: "https://whitenoise.chat/blog",
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
                url: `https://whitenoise.chat/blog/${post.naddr}`,
                name: post.title,
            })),
        },
    }).replace(/</g, "\\u003c")
);
</script>

<svelte:head>
	<title>Blog | White Noise</title>
	<link rel="canonical" href="https://whitenoise.chat/blog" />
	<meta name="description" content="Latest updates and articles from the White Noise team about secure messaging, privacy, and the Nostr protocol." />
	<script type="application/ld+json">
		{blogSchemaJson}
	</script>
</svelte:head>

<div class="bg-glitch-50 min-h-screen">
	<div class="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">
		<h1 class="text-5xl font-bold text-glitch-950 mb-12">Blog</h1>

		<div class="flex flex-col gap-12">
			{#each data.posts as post}
				<a href="/blog/{post.naddr}" class="group">
					<article class="flex flex-col md:flex-row gap-6 md:gap-8">
						<!-- Text content -->
						<div class="flex-1 order-2 md:order-1">
							<h2 class="text-xl md:text-2xl font-bold text-glitch-950 group-hover:text-cyan-600 transition-colors mb-2">
								{post.title}
							</h2>
							<p class="text-sm text-glitch-500 mb-3">
								Published on {formatDate(post.publishedAt || post.createdAt)}
							</p>
							{#if post.summary}
								<p class="text-glitch-700 text-base leading-relaxed">
									{post.summary}
								</p>
							{/if}
						</div>

						<!-- Image -->
						<div class="w-full md:w-48 aspect-video md:aspect-square shrink-0 order-1 md:order-2 overflow-hidden rounded-lg">
							<img
								src={post.image || "/images/blocks-background.webp"}
								alt={post.title}
								class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
							/>
						</div>
					</article>
				</a>
			{/each}

			{#if data.posts.length === 0}
				<p class="text-glitch-500 text-center py-12">No blog posts found.</p>
			{/if}
		</div>
	</div>
</div>
