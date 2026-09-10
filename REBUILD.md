# White Noise design exploration

Local preview: http://127.0.0.1:5173/

Run `bun install` and `bun run dev -- --host 127.0.0.1` to restart it.

## Selected layout: Plain

The user selected Plain. The hero has “White Noise” and the gray tagline “The identity-free messenger for private communication.”, without the large logo. The extra supporting paragraph is removed; Download follows the tagline. Matching 144px desktop / 84px mobile gaps frame the hero between the nav and the first feature; the lower gap starts after the Download button. The hero button says “Download” with a downward arrow and no supporting text beneath it. The sticky navigation stays white with a permanently visible small black WN logo and a fine bottom divider. Download is a permanent plain navigation item alongside Contribute, Privacy Matters, and Blog, including in the mobile menu. There is no separate nav button or scroll-triggered reveal. Sections stay white except the permanently black closing tagline/Download and copyright area; scroll-driven darkening remains removed. Every state change uses an immediate cut: no fades, animated resizing, movement, easing, smooth scrolling, transitions, or keyframe animations. The site now uses the left-aligned Quiet Column direction, strong typography, white sculptures directly on white, and a 1040px maximum content width. Gallery, Study, the switcher, and layout URL-selection code have been removed. Old `?layout=` links show Plain and navigation returns ordinary route URLs.

The homepage supporter strip is a standalone full-width light-gray (#f2f2f2) band directly below the hero, with black logos. The closing Download button sits below its tagline, left-aligned.

The footer contains copyright and a temporary Design system review link, on black continuous with the closing section. Footer navigation and the earlier logo/name/tagline block are removed. The closing Download button is white with black text and a downward arrow.

The homepage, Download, Privacy Matters, Blog listing and articles, Contribute, Build, Privacy Policy, and Canary use the selected presentation. Legal and technical pages retain their underlying content; Build also links to the native app repositories and labels the archived Flutter client.

## Assets and content

Manrope is self-hosted through `@fontsource-variable/manrope`; no Google Fonts request is needed. The canonical `static/images/logomark.svg` is displayed in black with its geometry intact. Supporter logos come from the existing repository.

Four transparent source images were downloaded from the supplied Figma Marketing file and resized from 4096px to 1200px, preserving transparency:

- `static/images/rebuild/lantern.png`: [Figma node 25:18](https://www.figma.com/design/JnQBwAwtSteJR3NO0iVPyp/05.-Marketing?node-id=25-18).
- `static/images/rebuild/roots.png`: [Figma node 112:2](https://www.figma.com/design/JnQBwAwtSteJR3NO0iVPyp/05.-Marketing?node-id=112-2).

- `static/images/rebuild/identity.png`: [Figma node 25:187, Man With Briefcase](https://www.figma.com/design/JnQBwAwtSteJR3NO0iVPyp/05.-Marketing?node-id=25-187).
- `static/images/rebuild/community.png`: [Figma node 120:17, Smith & Chain](https://www.figma.com/design/JnQBwAwtSteJR3NO0iVPyp/05.-Marketing?node-id=120-17).

They are real Figma assets, not generated approximations. Canva and Google Docs were excluded.

Provisional copy draws on the existing website, with the messaging, keypair identity, open-source and decentralization claims cross-checked against the [White Noise repository](https://github.com/marmot-protocol/whitenoise), [native iOS app](https://github.com/marmot-protocol/whitenoise-ios), and [Marmot protocol](https://github.com/marmot-protocol/marmot). No new anonymity, future-security, recovery, or multi-device promises were added.

The existing TestFlight, Zapstore, and GitHub APK destinations are preserved exactly. The old Flutter repository is archived; choosing a replacement APK distribution channel is a separate content decision. Donation addresses and community links are preserved. No transactions or external messages were sent.

## Implementation

SvelteKit 2, Svelte 5, TypeScript, Tailwind 4, Bun, and the Vercel adapter remain. Reusable UI lives in `src/lib/components/rebuild`; `src/rebuild.css` composes the selected presentation with the tokens and generated typography in `src/lib/design-system`. Shared primitives live in `src/lib/components/system`. The former scroll observers and reveal state have been removed. No new API or backend service was added. Existing blog fetching, caching, sanitization, policy data, and canary fetching remain unchanged. Article body headings are nested below the page title after sanitization.

Homepage copy and FAQ structured data share the same source.

## Validation

- 40 tests across 8 files pass, including the article-heading regression and design-system contract checks. The two obsolete layout-selection tests were removed with their implementation.
- Repository lint fixes, formatting, final lint, and Svelte type checks pass; 0 Svelte errors or warnings.
- Production build passes with the existing Vercel adapter. Optional dependency warnings remain for `bufferutil`, `utf-8-validate`, and `supports-color`.
- Initial browser checks covered all three explorations at 320, 768, and 1280px, and secondary pages at 320px and desktop sizes. After selection, the Plain homepage and navigation were rechecked without the switcher.
- Keyboard menu/Escape/focus return, skip link, native FAQ disclosures, donation copy feedback, real blog content, and download destinations were checked.
- 640×450 CSS-pixel reflow was checked as the equivalent layout size of a 1280×900 window at 200% zoom. The in-app browser did not expose working page-zoom controls; actual browser 200% zoom remains a manual spot check.

See `design-qa.md` for visual evidence and the comparison against the selected reference.

All work remains local on `codex/website-rebuild`. No commit, push, merge, or publication was performed. `master` remains `0a79a977b0af4e6d12b807ddb4f8a2a96413aafb`.

- Feature artwork alignment: normalize the four homepage sculptures from their measured alpha bounds without modifying source pixels. Use a shared viewport ratio (1103:939) and maximum visible height of 25rem (400px). Vertically center every sculpture’s visible bounds against its complete text block; remove the former 100px downward offset. Use equal-width columns to give the widest artwork enough space. On mobile, stack after the copy with a 2rem gap and a smaller shared viewport. Use rem so spacing does not depend on each heading’s font size.

## Design system baseline

The live reference is `/design-system`, linked temporarily from every footer. It documents colors and contrast, type specimens and all responsive recipes, spacing, grids, buttons and states, iconography, artwork, composed patterns and a searchable token catalog. It renders real shared components. See `src/lib/design-system/README.md` for source files, generation, component usage and governance.

This extraction preserves approved values and explicitly marks inherited inconsistencies for review. It does not pretend the existing 28 font-size definitions or off-grid spacing already form a finalized scale. The next pass can consolidate those values centrally and compare affected pages.

## Consolidation — September 10, 2026

The user approved the smaller shared system, superseding earlier measured spacing and type values above. The catalog now has 91 tokens, down from 174: eight colors, seven size steps, four weights, four line heights, three tracking values, fourteen spacing steps and eight shared rhythm relationships. Typography has nine roles plus responsive overrides. Reading widths unify at 768px; content pairs are equal; text actions share a 56px minimum and automatically invert on dark surfaces. The pale hero gray remains the only review token. Source assets and destinations are unchanged. See the live reference and design-system README for current values.
