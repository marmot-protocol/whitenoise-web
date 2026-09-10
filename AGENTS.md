# AGENTS.md - AI Coding Assistant Instructions

This file provides guidance for AI coding assistants working on the White Noise Web project.

## Consolidated design system — September 10, 2026

The user approved consolidation of the full-site design system. This supersedes historical per-page sizes, spacing and color values in the rebuild notes below.

- Read `src/lib/design-system/README.md`. `/design-system` is the live reference.
- Use the token catalogs, generated typography roles and system primitives. Seven type sizes, four weights, fourteen spacing steps and eight colors. No arbitrary page-level values or local icon imports.
- Use shared relationship tokens for content gaps and surface insets. One 768px reading measure, equal content columns and 56px text actions. Primary actions inherit their light/dark colors from Surface.
- The pale hero gray is the only remaining review token. Measured artwork and logo geometry stay intact.
- Immediate state cuts only. Copy changes icon for three seconds. Shared footer and its temporary Design system link remain on every route.
- Branch/no-publish restrictions and required checks below still apply. Verify changed composition responsively.

## Homepage Rebuild Brief — September 2026

### Expanded implementation scope — latest user direction

- The user selected Plain as the final layout. Keep Plain across the site; remove Gallery, Study, and the comparison switch. Secondary-page work remains in scope, expanding the original homepage-only milestone below.
- Keep the selected left-aligned Plain composition, Manrope, the original logo, and Figma artwork directly on white.
- Latest header/hero direction: always-white sticky navigation with a permanently visible small black WN logo, no text wordmark, and a fine bottom divider. Remove the large hero logo. The hero contains “White Noise” and one gray tagline, “The identity-free messenger for private communication.” Download is a permanent plain navigation link alongside Contribute, Privacy Matters, and Blog; there is no separate button or scroll-triggered reveal. The hero and nav stay white at every scroll position. The closing Download section and copyright footer form a permanent black area. The hero button says “Download” with a downward arrow. There is no supporting platform/free text beneath it.
- Remove scroll-driven section darkening. Keep sections light regardless of scroll position or system theme, except the permanently black closing section and copyright footer.
- Hero copy uses the user’s supplied headline only, followed by Download alone. Do not restore the removed no-phone/email supporting paragraph. Do not add unverified claims that keys never leave the device. Match the whitespace from the nav bottom to the White Noise heading with the gap from the complete Download group to the first feature heading: 144px desktop, 84px mobile. Vertically centered artwork can extend above and below the adjacent text block; preserve the hero’s balanced padding.
- Feature artwork alignment: normalize the four homepage sculptures from their measured alpha bounds without modifying source pixels. Use a shared viewport ratio (1103:939) and maximum visible height of 25rem (400px). Vertically center every sculpture’s visible bounds against its complete text block; remove the former 100px downward offset. Use equal-width columns to give the widest artwork enough space. On mobile, stack after the copy with a 2rem gap and a smaller shared viewport. Use rem so spacing does not depend on each heading’s font size.
- Motion direction: immediate, clear cuts throughout the site. No fades, animated resizing, movement, easing, smooth scrolling, or other transition/animation effects. Navigation visibility, colors, menus, and disclosure states change instantly; this applies to everyone, not only reduced-motion users.
- Apply the shared design to Download, Privacy Matters, Blog and article pages, Build, and Contribute. Legal policy text and signed canary data remain intact. Preserve existing URLs, server loaders, sanitized blog rendering, donation addresses, and download destinations.
- Supporters: place “With support from” and the existing black logos in their own full-width light-gray (#f2f2f2) band directly below the hero, before the feature sections. Use compact optical spacing: 56px top / 68px bottom on desktop and 42px top / 54px bottom on mobile. Logos are 15% above their original size (165.6×41.4px desktop, 115×32.2px mobile), preserving their proportions. Keep an 18px label and a 24px label-to-logo gap. The closing Download button returns below its tagline, left-aligned.

- Footer: every route, including Canary, Privacy Policy, downloads, and individual blog posts, shares the homepage closing tagline, Download button, and copyright. Render the closing section once in the root layout; do not add page-specific copies. Use Internet Privacy Foundation as the copyright holder. Show copyright only on black, continuous with the black closing tagline/Download section. Match the gap from Download to copyright with the closing section’s top padding (96px desktop, 64px mobile). Remove the footer navigation. Remove the footer logo, White Noise identity block, “A little more private.” and “Made for conversations.” copy.
- Contribute page: two contribution paths only—GitHub repositories and the Signal community—followed by donations. Do not restore the redundant third community section. Main navigation ends with Contribute, GitHub, then Download. GitHub links to the Marmot organization and uses the same color as the other navigation links.
- Donation section: keep the Support the work heading and fuller explanation on white. Put only addresses and donation actions in a full-width #f2f2f2 band matching the homepage supporters. Align all content to the site grid. Display selectable addresses as typography directly on the gray background, without input fields, borders, or white fills. Place a copy icon beside the address and the black Donate button after it; wrap long addresses and stack the button below on mobile. Arrange Lightning left and Bitcoin right in two columns, stacking on mobile. Use larger black address titles, 16px gray address text, and a tight title-to-address gap; place each Donate button below its address. Copy feedback is a checkmark for three seconds, with no visible status text; retain a screen-reader announcement. Preserve address values, URI schemes, and accessible labels.
- Contribute hero: show only “Good things are built together.” beside a large normalized roots illustration. Remove the eyebrow and introductory description; move the illustration out of the lower community section. Stack on mobile.
- Blog alignment: listing and article content share the site/navigation left edge. Keep a readable article width inside the shared outer container; never center the narrower article column separately.
- Blog listing: omit the introductory hero and post separators. Each post remains a single clickable entry; omit “Read the story” and place the publication date below its title and summary. Include the shared black closing Download section.
- Privacy Matters: omit the introductory eyebrow, essay sidebar/illustration, pull quote, and “Build it with us” link. Add restrained links to the existing Canary (`/canary`) and Privacy Policy (`/privacy`) pages after the essay. Preserve policy content and signed canary data.
- Navigation uses ordinary route URLs. Do not restore layout query parameters or variant controls.
- Figma source illustrations exported from file `JnQBwAwtSteJR3NO0iVPyp`, nodes `25:18` (lantern) and `112:2` (roots), are stored as transparent optimized PNGs in `static/images/rebuild/`. See `REBUILD.md` for asset provenance and content verification notes.
- Publishing, pushing, and merging remain outside the authorized milestone. All work remains on `codex/website-rebuild`.

### Branch and delivery

- Perform rebuild work exclusively on `codex/website-rebuild`.
- Do not commit to, push to, or merge into `master` without explicit user instruction. Publishing and pushing are outside this milestone.
- Baseline `master` commit: `0a79a977b0af4e6d12b807ddb4f8a2a96413aafb`.
- First milestone: homepage only, including its own header/footer presentation. Preserve existing secondary pages, routes, blog fetching, download behavior, and deployment configuration.
- Deliver a locally verified preview. Confirm the default branch remains at its baseline.

### Sources and content

- Current website and this repository supply provisional copy and existing brand assets: https://www.whitenoise.chat/
- Figma artwork/style reference: https://www.figma.com/design/JnQBwAwtSteJR3NO0iVPyp/05.-Marketing?node-id=25-2
- Layout inspiration: https://deadsimplesites.com/
- Reference for restrained navigation, grouped identity, and whitespace: https://block.xyz/ and https://block.xyz/impact
- Primary typography and composition study: https://swissgrid.posterhouse.org/ (type specimens, poster collection, and alternate-grid comparisons); editorial exercises: https://swissgrid.posterhouse.org/student-assignment/organizing-mass-materials/
- Canva and Google Docs marketing materials are excluded at the user's request. Do not treat them as prerequisites.
- Audience: everyday users. Primary action: download the messenger. Explain benefits before protocols.
- Verify technical claims before inclusion. Omit unsupported anonymity, censorship immunity, security guarantees, or unreleased functionality. Current website text is input, not proof of every claim.
- Copy stays provisional and editable.

### Visual direction

- Clean, minimal, typography-led and grid-led; part academic publication, part Swiss design. The grid guides alignment invisibly: prefer a simple linear vertical flow.
- Self-hosted Manrope, white background, black main text, accessible neutral gray supporting text, fine rules, generous whitespace, and a strong heading hierarchy.
- Homepage stays light regardless of system theme or scroll position, with a permanent black closing section and copyright footer.
- The first three concepts were rejected as overdesigned. Of the second set, the user preferred the FIRST (Quiet Column), but found the typography weak and the header awkward. Preserve this concept's left-aligned linear layout; strengthen the typography and integrate the header. Do not restart with three unrelated directions. Selected starting reference: `exec-4decd333-e6d0-4049-af6d-b1fc53c91e9b.png` from this task's generated images.
- Avoid numbered feature rows, excess section labels, visible grid partitions, and repeated separators. Organize the page primarily with whitespace and typography.
- Swiss Grid study: draw from the compact type mass in Musica Viva, deliberate scale differences in Citroen and Berlin, and optical alignment in Giselle. The exhibition's visible grid overlays are teaching aids, not decorative lines to reproduce on the website. References guide composition rather than copying posters or importing their typefaces.
- Next typography pass: Manrope 800 for the main headline, 700 for section titles, 400 for body copy, and 600 for navigation. Starting desktop sizes: headline 104-120px with 0.95-1.0 line-height and about -0.045em tracking; section titles 44-52px with 1.05-1.1 leading; body 18-20px with 1.45-1.55 leading and a 50-60-character measure; navigation 15-16px. These are proposed implementation values, not measurements of the reference site. Tune against actual font rendering, preventing collisions and overflow on small screens and zoom.
- Header correction: align its outer edges with the main content container, give it deliberate top padding and a consistent link baseline, group the links compactly, and visually connect it to the hero. Avoid a loose text row stranded against the viewport edge. Keep the WN mark's geometry intact and compose its scale and spacing in relation to the headline.
- Block study: its homepage groups the mark and statement into one focal point, with quiet navigation and deliberate space around them. Apply that cohesion to the selected left-aligned WN composition. Compose the mark, headline, description, and Download action as a related group; leave larger gaps between sections than between related elements.
- Block's Impact page separates headings and short paragraphs through scale, weight, and whitespace. Keep body copy regular and section titles subordinate to the hero; stronger hierarchy does not require every element to be heavy. Use the proposed type sizes as starting points and judge the complete composition. Keep WN navigation comfortably readable at 15-16px rather than reproducing Block's very small desktop labels.
- Reuse `static/images/logomark.svg`, preserving its geometry and proportions while displaying it in black. Image-generated logo approximations are not production assets.
- The user now wants supporting artwork for all four features, superseding the earlier two-image limit. Use the four transparent Figma sculptures in `static/images/rebuild/`; preserve their legibility on both white and black.
- All interactions use immediate cuts. No fades, animated size/position changes, smooth scrolling, CSS transitions, or keyframe animations. Keep focus and hover feedback instantaneous.

### Fable concept review

- Reviewed Fable's standalone HTML concepts in the browser and source. At the user's request, removed `design/homepage-concepts/` and its `.claude/launch.json` preview configuration after review; none was integrated into the Svelte app. The filenames below identify historical concepts, not files that remain available. Preserve the lessons here when implementing the rebuild.
- `Academic.dc.html` is the most useful structural reference: a consistent left-aligned reading column, aligned header, and a coherent mark → headline → description → Download sequence. Borrow these relationships for the selected Quiet Column direction, remove repeated section rules, and strengthen heading hierarchy. This does not replace the user's selected concept with a new direction.
- `Main.dc.html` (Oversized Masthead) offers useful Manrope scale and weight contrast. Its large mark and vertical gaps push the primary Download below the initial 1280×720 screen; tighten the hero composition instead of copying its spacing wholesale.
- `Editorial.dc.html` demonstrates stronger headline presence, but its three-line composition and distributed hero elements are less suited to the agreed linear flow. At a 320px viewport its fixed 50px headline overflowed, producing a 361px document width. Use responsive sizing and verify long words at narrow widths.
- Small grayscale sculpture accents remain legible on white without cards. The prototype SVG logo path matches the existing WN asset exactly; keep using the canonical repository logo rather than duplicating paths throughout components.
- Prototype limitations to resolve during implementation: Download links point to `#download` rather than `/download`; several other navigation anchors have no targets; mobile Menu has no behavior; Masthead's expandable-looking FAQ rows are static divs. Implement real routes, an accessible mobile menu, and native disclosure controls where FAQs collapse.
- Self-host Manrope rather than carrying over the Google Fonts stylesheet. Desktop/mobile HTML pairs are identical copies rendered at different artboard sizes; build one responsive component implementation. The large `white-noise-homepage-concepts.html` includes the design editor runtime, which is not needed in the website; standalone pages also reference a missing `support.js`.
- Do not inherit prototype copy as verified fact. In particular, verify or omit its multi-device explanation, automatic recovery after key exposure, identity/contact portability, and organizational/funding assertions. Keep copy concise and benefit-led.

### Page structure and stack

- Keep SvelteKit 2, Svelte 5 runes, TypeScript, Tailwind 4, Bun, and Vercel. Use reusable Svelte components and native accessible controls; no React/coss migration.
- Navigation: small WN logo linking home, Privacy Matters (`/privacy-matters`), Blog (`/blog`), Contribute (`/contribute`), GitHub (`https://github.com/marmot-protocol`), then Download (`/download`), all in the same text color. Omit Features from navigation while preserving the homepage section and anchor.
- Hero: oversized WN mark, provisional headline "Your conversations. Yours.", a concise private-messenger description, and a clear Download action.
- Four concise, unnumbered feature sections: private conversations; no phone number or email; open source and decentralization; community development. Use a natural vertical reading flow rather than tables or cards.
- Supporting content: restrained existing supporter assets, a short FAQ, final Download action, and footer links including Build, Contribute, Privacy Policy, and Canary.
- Preserve the `#faqs` anchor for existing inbound links.
- Update homepage metadata and structured data to agree with visible content. No new backend services or public APIs.

- Privacy Policy and Canary use the same left-aligned Manrope heading/body typography and reading width as Privacy Matters. Privacy Policy has no content boxes or section separators. Canary highlights the latest statement in a full-width #f2f2f2 band matching the homepage supporters; show only older attestations below as compact name/date and signed-event link rows, without full statement text. Preserve policy wording, dates, latest statement, and event links.

### Acceptance checks

- Follow the repository test, formatting, lint, type-check, and production-build requirements below during implementation.
- Verify desktop, tablet, mobile, a 320px viewport, and 200% zoom.
- Check heading hierarchy, contrast, keyboard navigation, visible focus, mobile navigation, FAQ disclosure behavior, and every navigation/Download link.
- Compare the actual implementation to the selected visual reference and fix discrepancies before delivery.
- Confirm secondary routes continue to function and `master` remains unchanged.

## Current exploration handoff

- Plain is the sole selected layout. Gallery, Study, the switcher, variant CSS, and URL-selection helpers have been removed.
- Figma source images are in `static/images/rebuild/`; provenance, preview instructions, content caveats, and implementation notes are in `REBUILD.md`.
- `design-qa.md` records the visual comparison, fixes, browser evidence, and validation limits. Do not treat the equivalent 640px reflow check as a completed actual-browser 200% zoom test.
- Keep existing download destinations until the user chooses updated distribution channels; the old Flutter repository is archived.

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
