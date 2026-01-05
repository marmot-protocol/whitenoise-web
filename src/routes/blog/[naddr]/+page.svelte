<script lang="ts">
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import type { PageData } from "./$types";

const { data }: { data: PageData } = $props();

function formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}

// Configure marked for GitHub-flavored markdown
marked.setOptions({
    gfm: true,
    breaks: true,
});

// Parse markdown and sanitize the HTML output to prevent XSS attacks
const renderedContent = $derived(DOMPurify.sanitize(marked.parse(data.post.content) as string));
</script>

<svelte:head>
	<title>{data.post.title} | White Noise Blog</title>
	<meta name="description" content={data.post.summary || `Read ${data.post.title} on the White Noise blog`} />
	{#if data.post.image}
		<meta property="og:image" content={data.post.image} />
	{/if}
</svelte:head>

<div class="bg-glitch-50 min-h-screen">
	<article class="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">
		<!-- Header -->
		<header class="mb-8">
			<h1 class="text-3xl md:text-5xl font-bold text-glitch-950 mb-4 leading-tight">
				{data.post.title}
			</h1>
			<p class="text-glitch-500">
				Published on {formatDate(data.post.publishedAt || data.post.createdAt)}
			</p>
		</header>

		<!-- Hero image -->
		<div class="w-full aspect-video mb-8 overflow-hidden">
			<img
				src={data.post.image || "/images/blocks-background.webp"}
				alt={data.post.title}
				class="w-full h-full object-cover"
			/>
		</div>

		<!-- Summary as blockquote -->
		{#if data.post.summary}
			<blockquote class="border-l-4 border-glitch-300 pl-4 mb-8 text-glitch-600 italic">
				{data.post.summary}
			</blockquote>
		{/if}

		<!-- Content -->
		<div class="prose prose-lg max-w-none prose-headings:text-glitch-950 prose-p:text-glitch-800 prose-a:text-cyan-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-glitch-900 prose-code:text-glitch-900 prose-code:bg-glitch-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-glitch-900 prose-pre:text-glitch-100 prose-blockquote:border-glitch-300 prose-blockquote:text-glitch-600 prose-li:text-glitch-800">
			{@html renderedContent}
		</div>

		<!-- Back to blog -->
		<div class="mt-12 pt-8 border-t border-glitch-200">
			<a href="/blog" class="text-cyan-600 hover:text-cyan-700 font-medium">
				← Back to Blog
			</a>
		</div>
	</article>
</div>

<style>
	/* Additional prose overrides for better markdown rendering */
	:global(.prose h1) {
		font-size: 2rem;
		font-weight: 700;
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	:global(.prose h2) {
		font-size: 1.5rem;
		font-weight: 700;
		margin-top: 1.75rem;
		margin-bottom: 0.75rem;
	}

	:global(.prose h3) {
		font-size: 1.25rem;
		font-weight: 600;
		margin-top: 1.5rem;
		margin-bottom: 0.5rem;
	}

	:global(.prose h4) {
		font-size: 1.125rem;
		font-weight: 600;
		margin-top: 1.25rem;
		margin-bottom: 0.5rem;
	}

	:global(.prose p) {
		margin-top: 1rem;
		margin-bottom: 1rem;
		line-height: 1.75;
	}

	:global(.prose ul),
	:global(.prose ol) {
		margin-top: 1rem;
		margin-bottom: 1rem;
		padding-left: 1.5rem;
	}

	:global(.prose li) {
		margin-top: 0.25rem;
		margin-bottom: 0.25rem;
	}

	:global(.prose pre) {
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
		padding: 1rem;
		border-radius: 0.5rem;
		overflow-x: auto;
	}

	:global(.prose code) {
		font-size: 0.875em;
	}

	:global(.prose pre code) {
		background: transparent;
		padding: 0;
		border-radius: 0;
	}

	:global(.prose img) {
		max-width: 100%;
		height: auto;
		border-radius: 0.5rem;
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
	}

	:global(.prose a) {
		word-break: break-word;
	}

	:global(.prose blockquote) {
		margin-top: 1.5rem;
		margin-bottom: 1.5rem;
		padding-left: 1rem;
		font-style: italic;
	}

	:global(.prose hr) {
		margin-top: 2rem;
		margin-bottom: 2rem;
		border-color: hsl(120 1% 81%);
	}
</style>

