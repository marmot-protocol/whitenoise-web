# White Noise website — contributor instructions

This repository is the production White Noise marketing and documentation site. Changes on `website-rebuild` are intended as a release candidate, not an experimental alternate website.

## Scope and delivery

- Use the current branch, `website-rebuild`. Never create, recreate, or switch to a `codex/` branch automatically. Do not create or switch branches or create a separate worktree unless the user explicitly requests it. This repository-specific instruction overrides default branch-prefix conventions. Preserve unrelated changes.
- Do not commit to, merge into, push, or publish the default branch without explicit authorization. Publishing and pushing remain outside the current task.
- The default branch is `master`; its protected baseline is `0a79a977b0af4e6d12b807ddb4f8a2a96413aafb`. Confirm it remains unchanged before delivery.
- Preserve public route URLs, legacy redirects, donation addresses and payment URIs, download destinations, privacy-policy wording, and signed canary data unless a specific change is authorized.
- Review actual behavior and report remaining limitations honestly. Passing automated checks does not establish that every browser or external service will work indefinitely.

## Stack and structure

SvelteKit 2, Svelte 5, TypeScript, Tailwind 4, Bun, Biome, Vitest and Vercel. Runtime versions are declared in `package.json` and CI. Do not migrate frameworks or introduce a competing UI library.

- `src/routes`: thin page composition, metadata, loaders and endpoints. Static marketing pages are pre-rendered; network-backed content opts into server rendering.
- `src/lib/components/site`: shared site navigation, page introductions, artwork, blog images and footer composition.
- `src/lib/components/system`: reusable semantic UI primitives.
- `src/lib/design-system`: approved catalogs, generated CSS, runtime constants, icons and measured artwork geometry.
- `src/site.css`: site composition and responsive layouts; `src/app.css`: global reset and font rendering.
- `src/lib/content`: editable FAQ and curated guide content, machine-readable overview, and the canonical privacy-policy source.
- `src/lib/server`: relay transport, bounded caching, sanitized Markdown rendering and guide loading. Keep network and server-only dependencies out of client components.
- `src/lib/nostr.ts`: shared event types, identifiers and pure conversions.
- `static`: production assets. Existing `/images/rebuild/` URLs are retained for compatibility; the name is not a separate design variant.

Use Svelte 5 runes: `$props`, `$state`, `$derived`, `$effect`; DOM handlers such as `onclick`. Do not introduce `export let`, reactive `$:` statements, or `on:click` directives. Keep pure helpers testable. Prefer small concrete components and native controls over unnecessary abstractions.

## Design system — mandatory for UI work

Read [src/lib/design-system/README.md](src/lib/design-system/README.md). `/design-system` is the live reference; it remains noindex, omitted from navigation and the sitemap.

- Use existing semantic type roles, colors, spacing and relationship tokens, registry icons, and system primitives. Typography size is independent of heading level.
- New tokens, roles, icons, visual primitives, arbitrary values, one-off overrides, or changes to approved token values need explicit approval describing the difference. Ordinary composition using existing elements can proceed.
- Token and typography catalogs are the sources of truth. Run `bun run tokens:generate` after editing them and include generated files. Runtime consumers must not import the full documentation catalog for a timer or breakpoint.
- Preserve self-hosted Manrope, the canonical WN logo, transparent Figma illustrations and their measured normalization. Artwork provenance is in README.md.
- All state changes are immediate. No fades, transitions, animated movement/resizing, or smooth scrolling. Copy feedback changes the icon for three seconds and includes a screen-reader announcement.
- The pale hero gray remains an explicitly accepted contrast exception: on September 11, 2026 the user chose to keep it after being told it falls below large-text AA contrast. Do not silently change it.

## Approved composition and interactions

The current implementation and design-system reference supersede all historical concept/rebuild briefs. There is one selected, left-aligned presentation; do not restore Gallery, Study, variant selectors or layout query parameters.

- Every route uses the white sticky header, small black canonical WN logo, main navigation, shared black closing Download section and copyright. Render the footer once in the root layout. Copyright belongs to Internet Privacy Foundation.
- Main navigation contains Privacy Matters, Contribute, Blog, More and Download. More contains Agents, For developers, Marmot Protocol, FAQ, then legal links. Nested routes retain their parent's active state. Desktop More displays the active destination, such as “More / FAQ”, with a persistent underline.
- Compact navigation includes Home and shows the current page label in muted gray beside the menu button. Menus use square white surfaces and fine rules. Escape, outside click/focus and navigation dismiss them; focus restoration must work with a keyboard.
- Agents, For developers and Marmot Protocol are short, self-contained guides. Desktop uses the sticky right sidebar; at 900px and below use the sticky full-width disclosure directly beneath the header. Getting started appears first. Selection follows scrolling; anchor positions clear the sticky header. Full documentation links go to GitHub.
- Keep runtime and MDK redirects. `/docs/mdk/README.md` goes to `/build#mdk`; deeper documentation URLs resolve to their exact upstream GitHub source.
- Homepage hero: White Noise, the gray identity-free tagline, then Download. At compact widths the tagline uses three unbroken phrases, breaking after “free” and “private”. The shared closing statement fits two unbroken lines. Preserve responsive sizing and approved artwork geometry.
- Homepage features use short everyday-language benefits. Technical details belong in the guides. Supporter logos remain a single row on mobile. Keep larger separation between sections than within related content.
- Contribute has developer/community paths and one muted donation surface. Both complete payment addresses remain visible and selectable. Each option's left rule spans the content only. Copy uses the complete address; each Donate link follows its own address independently. Never test payment links by initiating a payment.
- Privacy Matters ends with the prominent Privacy Policy link and explanation. Do not add a Canary link to that closing section.
- Blog entries always have an image area. Missing/failed images use the canonical white logo on ink. Preserve published image colors. Articles have one muted, chevron “Back to blog” link at the top, underlined on hover only.
- Long-form headings and body content use shared reading widths and spacing, including subsections. Preserve FAQ disclosures and the homepage `#faqs` anchor.

## Content and security boundaries

- Signed Nostr content is untrusted input until signature, author, kind and request-filter validation succeeds. Preserve the signed source text and identifiers. Render blog Markdown only after sanitization; canary statements display signed text.
- Keep relay requests time-bounded, release subscriptions/connections, coalesce concurrent reads, and bound caches. Distinguish outages from confirmed missing content. Do not fabricate a current canary statement from a date or silently treat an outage as an empty publication history.
- Preserve Markdown sanitization, safe URL schemes, canonical metadata, CSP and security headers. New external asset/script origins require a deliberate policy review.
- Do not introduce unsupported anonymity, security, connectivity, synchronization or distribution claims. Align availability copy with actual Download options, and privacy claims with the canonical policy. The overview and text exports must not become a second, drifting version of the guides.
- Figma reference: https://www.figma.com/design/JnQBwAwtSteJR3NO0iVPyp/05.-Marketing?node-id=25-2. Canva and Google Docs materials are not prerequisites.

## Required validation

Before completing a work session run:

```sh
bun run test && bun run lint:write && bun run format && bun run check
bun run build
```

`bun run ci` runs the non-mutating release checks. Run `bun audit` when changing dependencies, and retain the frozen lockfile. Do not suppress failures from preparation or build commands.

- Write meaningful tests for pure helpers, parsing/security boundaries, redirects, cache expiration, concurrency and error behavior. Avoid tests that merely restate CSS or mock away the behavior under review.
- Verify affected pages at desktop, tablet, mobile and 320px, plus keyboard controls and actual browser 200% zoom. A narrow viewport alone is not a completed browser-zoom check.
- Check heading hierarchy, focus visibility, navigation, FAQ/menu disclosures, full donation addresses, download links, and content/image failure states. Validate local production output as well as development rendering.
- Generated screenshots, exports and local reports belong in ignored `tmp/` or `output/`, never in production assets. Keep durable maintenance documentation concise and current.
