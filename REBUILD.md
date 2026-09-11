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

## Upstream rebase — September 10, 2026

Rebased the two redesign commits onto `origin/master` at `04b010f`. Kept the upgraded dependencies and Vercel adapter configuration; added Manrope to the upstream manifest and regenerated the lockfile. Download now offers iOS TestFlight (`https://testflight.apple.com/join/KrVBcjpA`) and Android APK (`https://ipf.dev/android`) in the existing equal two-column grid. Zapstore and the obsolete GitHub APK destination were removed, including their metadata references. This supersedes the historical instruction to retain the old distribution destinations.

The Build page retains all upstream documentation body text and links in the shared presentation. Privacy Matters retains the approved essay and adds the upstream “Holding Ourselves to It” disclosure using existing article styles. The policy Markdown and Vercel configuration match upstream exactly. No server loader or signed canary changes were introduced.

## Homepage content expansion — September 10, 2026

The user approved six concrete feature explanations: private messages and groups, phone-number-free identity, connected agents, independent relays, open source and standards, and community contributions. The original four sculptures remain normalized and unchanged; agents and open standards use text-only equal columns. Product screenshots/showcases and “Sign up with nothing” were explicitly excluded. The approved hero and root closing section remain intact.

Sixteen native FAQ disclosures are grouped into Getting started, Privacy and identity, Groups and the network, and Agents. Editable FAQ copy lives in `src/lib/content/homepage.ts`; the page derives FAQ structured data from those same answers. The FAQ uses the shared 768px reading measure, with the existing `#faqs` anchor and a new relay-section anchor. No new design tokens, dependencies, server behavior, download destinations or policy changes were needed.

Source review for this pass:

- Original homepage at baseline `0a79a97` and https://www.whitenoise.chat/ supplied topics, not proof of historical security or availability claims.
- https://github.com/marmot-protocol/marmot describes identity, MLS encryption, redundant relay delivery and metadata limitations.
- https://www.rfc-editor.org/rfc/rfc9420.html describes the MLS group-encryption standard.
- https://github.com/marmot-protocol/whitenoise-ios describes public profile links, QR codes, identity flows and relay editing. The Android store description at https://github.com/marmot-protocol/whitenoise-android/blob/master/fastlane/metadata/android/en-US/full_description.txt confirms direct/group messaging and encrypted conversation media. These are source/documentation checks, not installation tests of the released native apps.
- https://github.com/marmot-protocol/mdk/blob/master/integrations/README.md documents Hermes, OpenClaw, Codex, OpenCode and Pi integrations, local connectors and invite authorization. The homepage links directly to that maintained guide without copying versioned installer commands.
- https://github.com/marmot-protocol/marmot/blob/master/features/multi-device.md is explicitly a branch draft and excludes history synchronization. The FAQ does not advertise seamless multi-device chat sync or recovery using only an identity key.
- The existing `src/lib/content/privacy-policy.md`, dated September 9, supplies the published key-recovery, server-storage, public-profile and optional diagnostics disclosures. The policy was not edited. Current local Download destinations remain the authority for the platform FAQ.

Do not restore claims of guaranteed anonymity, uncensorability, unlimited scale, automatic chat-history portability, transient-only relay storage or automatic recovery after theft. Agent transport encryption is described separately from model-provider processing and logging.

## Six illustrated feature sections — September 10, 2026

The user requested the community section's layout for every homepage feature: complete text block on the left, sculpture on the right, vertically centered in equal columns. This supersedes the text-only agents and open-standards compositions above. All six sections now use the same `illustrated` composition; mobile stacks artwork after copy with the existing 32px relationship. The hero, supporters, FAQ and footer keep their existing compositions.

Two additional transparent source images were downloaded from the same Figma file, resized from 4096×4096 to 1200×1200 with transparency preserved, and saved as optimized RGBA PNGs:

- `static/images/rebuild/agents.png`: [Mailman 1, node 25:303](https://www.figma.com/design/JnQBwAwtSteJR3NO0iVPyp/05.-Marketing?node-id=25-303). Measured alpha bounds: `[362, 43, 509, 1117]` (x, y, width, height).
- `static/images/rebuild/open.png`: [Hand 1, node 35:21](https://www.figma.com/design/JnQBwAwtSteJR3NO0iVPyp/05.-Marketing?node-id=35-21). Measured alpha bounds: `[113, 127, 990, 723]`.

The shared artwork viewBox now fits both width and height to the existing 1103:939 viewport, centering the measured visible bounds. This preserves the previous four sculptures' framing while containing the wider open hand without clipping. No source artwork was retouched or regenerated. Both additions appear in the live design-system artwork reference.

## Discoverable pages and on-site documentation — September 10, 2026

- Main navigation now includes Agents, For builders, FAQ, Privacy Matters, Blog, Contribute, More, and Download. For builders replaces GitHub and preserves `/build`. More exposes Privacy Policy and Canary; the tablet/mobile menu lists every destination directly. Repository exploration from Contribute and the empty Blog state also goes through the builders page.
- The builders page begins with seven repository links. Actual repositories remain on GitHub, while setup, architecture, and protocol Markdown is readable on this site. `/agents` offers the shared quickstart and five runtime guides. `/docs/[repo]/[...path]` serves additional MDK and Marmot guides, with canonical redirects for their overview/runtime aliases. Relative guide links are rewritten locally, while code snippets, source-file links, and non-documentation destinations retain their meaning.
- `src/lib/server/documentation.ts` refreshes a visited guide from public GitHub raw content, caches it for one hour per server process, coalesces concurrent requests, and revalidates with ETags. On upstream errors it serves a dated saved copy and retries after five minutes. An explicit upstream 404 remains a 404. The page displays source provenance and freshness. This is request-driven server behavior; no scheduled job or deployment was created.
- `bun run docs:sync` updates the bundled outage fallback. Initial snapshot: 111 MDK documents at `117004714d4e0d6687c0bd3d4a16a7a76b1fd205` and 50 Marmot documents at `4a2bc65f8db5866cec3b2a127dedb37818eaf207`. The 2.4 MiB generated server-only JSON is excluded from Biome's 1 MiB file limit. Only approved repository Markdown paths are fetched; assistant instruction files are excluded. Upstream content is sanitized before rendering, with scripts, handlers, and unsafe URL schemes removed. Source instructions are displayed as documentation, never executed.
- The homepage restores “Few things / you might ask.” with four questions and See all questions. `/faq` holds all sixteen questions in four topics and has its own metadata and matching FAQ structured data. The existing homepage `#faqs` anchor remains. Relay and multi-device links now reach the relevant on-site answers/guides.
- Shared design tokens and typography govern the new pages. Repository pairs stack on mobile; code and tables scroll inside the reading column, with keyboard-focusable regions. Navigation switches to the compact menu at the existing 900px breakpoint and supports short-screen scrolling. Legal text, signed canary data, download destinations, donation values, and the shared closing/footer remain intact.

## Responsive refinement — September 10, 2026

- Preserved the selected desktop homepage: the before/after 1280×900 captures have no differing pixels. Tablet feature sections and the homepage FAQ now stack at the existing 900px breakpoint, giving copy its reading width and allowing normalized artwork to remain substantial. Other useful pairs (downloads, repositories, contributions, donations and the Contribute hero) stack at 640px.
- The compact header keeps Download visible and moves Menu to the right. Its panel overlays content without layout shift, uses two columns in tablet/landscape layouts, one on phones, and scrolls within the dynamic visible viewport. Added outside-click/focus dismissal and desktop-resize dismissal alongside the existing Escape and route-selection behavior. Links use at least 44px touch targets on compact layouts; menu rows are 48px.
- Centralized tablet spacing at 80px section gaps, 64px page insets and 112px hero insets. Existing mobile values remain 64/48/80px. Removed fixed desktop bottom margins where shared section gaps apply. Mobile body copy stays 18px with 1.5 leading; the homepage tagline uses the existing 24px type step below its 32px title. No color, font family, animation or source artwork changes.
- Removed inherited standalone-link margins from documentation navigation, repository lists and the article back link. Tablet blog thumbnails use a 144px track, and image-free entries use the reading measure. Mobile technical table columns now have a 192px minimum so paths and prose stay readable within the horizontally scrolling table region. Code blocks retain their own scrolling area and keyboard focus.
- Updated `/design-system`, its README and generated catalogs to document the responsive compositions, dynamic viewport and mobile tagline recipe. No new type sizes, spacing steps, weights or colors were added. Screenshot evidence and the final 120-case viewport measurements live in `design/responsive-qa/`.

## Navigation grouping — September 10, 2026

The approved main order is now Privacy Matters, Blog, Contribute, More, Download. More contains Agents, For builders, FAQ, then a fine divider before Privacy Policy and Canary. The compact menu groups its primary links (including Download), resources, and legal links with the same separators; Download also remains visible in the compact header. Routes and keyboard dismissal behavior are unchanged.

Navigation now places Contribute before Blog: Privacy Matters, Contribute, Blog, More, Download. More and all shared disclosures use the registered downward chevron, pointing upward when open with an immediate 180-degree state cut. This replaces the former plus icon and also keeps guide contents disclosures consistent.

### Build page purpose restored — September 10, 2026

The user identified the replacement Build page as confusing because it mixed repository browsing, agent setup, and the full MDK README. `/build` is again a curated “Build with Marmot” developer guide, grounded in the current live `/build` page and current MDK/Marmot sources. It covers a Rust quick start, library layers, Nostr event kinds, ciphersuite, identity, the basic client flow, TypeScript, dependencies and implementation limits. The grouped Libraries/Apps repositories and contextual Marmot specification section remain.

`src/lib/content/build.md` owns the editorial guide. The existing Build server loader renders that local content through the shared sanitized documentation renderer; visiting the overview no longer fetches or embeds the MDK root README. Detailed MDK documentation is available at `/docs/mdk/README.md`; documentation URL mapping no longer redirects it to `/build`. Agent setup stays on `/agents`.

Technical references checked on September 10: the live White Noise Build page, MDK README and rust-toolchain.toml, marmot-ts README, and Marmot foundation identity/registries/MLS, Nostr transport, protocol-core overview and joining documents. The web index returned older Build copy than the live browser; the live page and current repositories took precedence. No Rust or TypeScript SDK build was run: the listed commands were checked against upstream documentation, while website validation ran locally.

### Short, self-contained guides — September 10

The latest review supersedes the embedded full-documentation approach. Agents, For builders, and Marmot Protocol now use a shared `GuidePage` with concise, locally edited Markdown. All sidebar entries are local section anchors with scroll tracking. Full documentation links explicitly go to GitHub and bypass the raw renderer's internal-link rewriting; prose contains no navigation to other hosted documentation pages.

The three public entry points remain `/agents`, `/build`, and `/docs/marmot/README.md`. Legacy agent runtime URLs redirect to the matching `/agents` section; the MDK root README redirects to `/build#mdk`. Other valid deep documentation URLs redirect to their exact GitHub source. Redirected runtime pages are no longer in the sitemap. The snapshot/sync utilities remain available for reference, but these three guide pages do not embed or fetch upstream READMEs.

Content was shortened using the existing documentation and checked against the Marmot, MDK, integrations, and marmot-ts GitHub sources. Installer scripts, architecture inventories, event registries and detailed protocol requirements belong in the linked full docs. Build retains a short Rust quick start, TypeScript overview, client flow, protocol basics, and separate Libraries/Apps repository columns.
