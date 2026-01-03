# AGENTS.md - AI Coding Assistant Instructions

This file provides guidance for AI coding assistants working on the White Noise Web project.

## Project Overview

White Noise Web is a marketing and documentation website for White Noise, a secure messaging app built on Nostr. The site is built with SvelteKit and deployed on Vercel.

## Tech Stack

- **Framework**: SvelteKit 2.x with Svelte 5.x (runes mode)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x
- **Package Manager**: Bun
- **Linting/Formatting**: Biome
- **Deployment**: Vercel

## Key Conventions

### Svelte 5 Runes

This project uses Svelte 5's new runes syntax. Key patterns:

```svelte
<script lang="ts">
// State
let count = $state(0);

// Derived state
let doubled = $derived(count * 2);

// Props
let { data }: { data: PageData } = $props();

// Effects
$effect(() => {
  console.log('count changed:', count);
});
</script>
```

**Do NOT use legacy Svelte 4 patterns** like:
- `export let` for props (use `$props()`)
- `$:` reactive statements (use `$derived` or `$effect`)
- `on:click` directive (use `onclick` property)

### Nostr Integration

The blog fetches content from Nostr relays using the `applesauce-*` libraries:
- `applesauce-core`: EventStore for deduplication
- `applesauce-relay`: RelayPool for fetching events
- Blog posts are NIP-23 long-form content (kind 30023)

## Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable Svelte components
│   ├── nostr.ts        # Nostr fetching utilities
│   └── types.ts        # TypeScript types
├── routes/
│   ├── +layout.svelte  # Root layout
│   ├── +page.svelte    # Homepage
│   ├── blog/           # Blog section
│   ├── download/       # Download page
│   ├── contribute/     # Contribute page
│   └── privacy-matters/# Privacy page
└── app.css             # Global styles
```

## Development Commands

```bash
# Start dev server
bun run dev

# Type checking
bun run check

# Linting
bun run lint

# Auto-fix lint issues
bun run lint:write

# Format code
bun run format

# Build for production
bun run build
```

## ⚠️ IMPORTANT: Before Finishing Work

**Always run formatting and linting before completing any work session:**

```bash
bun run lint:write && bun run format && bun run check
```

This ensures:
1. Imports are properly organized
2. Code is formatted consistently (spaces, not tabs)
3. No TypeScript errors
4. No Svelte compilation issues

## Styling Guidelines

- Use Tailwind CSS utility classes
- Custom colors use the `glitch-*` palette (defined in app.css)
- Mobile-first responsive design (`md:` breakpoint for desktop)
- Prefer `aspect-*` over fixed heights for images

## SSR Considerations

- The site uses server-side rendering for SEO
- Nostr fetching happens on the server in `+page.server.ts` files
- WebSocket polyfill is applied for Node.js environment
- Simple in-memory caching with TTL for blog posts

## Common Patterns

### Fetching blog posts (server-side)

```typescript
// +page.server.ts
import { fetchBlogPostsCached } from "$lib/nostr";

export const load: PageServerLoad = async () => {
    const posts = await fetchBlogPostsCached();
    return { posts };
};
```

### Date formatting

```typescript
function formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000); // Nostr timestamps are seconds
    return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}
```

## Testing

Currently no automated tests. Manual testing via the dev server is the primary method.

## Deployment

The site auto-deploys to Vercel on push to main branch.

