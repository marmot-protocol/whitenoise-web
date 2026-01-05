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

# Run tests
bun run test

# Run tests in watch mode
bun run test:watch

# Build for production
bun run build
```

## ⚠️ IMPORTANT: Before Finishing Work

**Always run tests, formatting, and linting before completing any work session:**

```bash
bun run test && bun run lint:write && bun run format && bun run check
```

This ensures:
1. All tests pass
2. Imports are properly organized
3. Code is formatted consistently (spaces, not tabs)
4. No TypeScript errors
5. No Svelte compilation issues

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

This project uses **Vitest** for unit testing.

### Running Tests

```bash
# Run all tests once
bun run test

# Run tests in watch mode (re-runs on file changes)
bun run test:watch

# Run tests with coverage report
bun run test:coverage
```

### Test File Conventions

- Test files are co-located with source files using the `.test.ts` extension
- Example: `src/lib/nostr.ts` → `src/lib/nostr.test.ts`

### Writing Tests

```typescript
import { describe, expect, it } from "vitest";
import { myFunction } from "./my-module";

describe("myFunction", () => {
    it("should do something", () => {
        expect(myFunction("input")).toBe("expected output");
    });
});
```

### What to Test

- **Pure functions**: Functions that take inputs and return outputs without side effects (e.g., `eventToBlogPost`, `decodeNaddr`)
- **Utility functions**: Date formatting, string manipulation, etc.
- **Edge cases**: Empty inputs, invalid data, boundary conditions

### What NOT to Test (or mock heavily)

- Network requests to Nostr relays (these are integration tests)
- Svelte components (use browser testing tools if needed)

## Deployment

The site auto-deploys to Vercel on push to main branch.

