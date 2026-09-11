# Design system baseline QA — September 9, 2026

## Scope

The current site was extracted into a shared token catalog, generated responsive typography, components and a visual reference at `/design-system`. This supersedes the earlier variant QA: only Plain remains. Existing server loaders, APIs, donation destinations, download destinations and deployment settings were preserved.

## Browser checks

- Reference page: no document overflow at 320, 640, 768 and 1280 CSS pixels. Inspected desktop palette, typography, icons and artwork plus mobile controls. Native category filtering returns the two Icon tokens; search finds the intended token.
- Contribute: desktop retains white support introduction and full-width gray donation methods; Lightning and Bitcoin remain side by side with aligned actions. At 320px they stack without address overflow. Copy targets measure 44×44px.
- Homepage, Download, Contribute, Privacy Matters, Privacy Policy, Canary, Build and Blog: checked at 320px; no horizontal document overflow. Every route has one shared closing section and one temporary footer link. Tables/code retain their own overflow handling.
- Real blog article: loaded “Building the messenger that deserves to exist” at 320px, with a 280px left-aligned reading area and no document overflow.
- Copy demo: click switches immediately to check; resets after three seconds. No payment link was activated. Disabled Action remains a disabled native button.
- Native disclosure responds to Enter and has a visible focus outline. Homepage FAQ opens. Mobile menu opens, Escape closes it and restores focus to Menu.
- 640×450 reflow represents the CSS viewport of a 1280×900 screen at 200% zoom. The in-app browser did not accept the zoom shortcut; this is a reflow check, not a true browser-zoom test.
- Browser error log was empty after the reference and route checks.

## Engineering checks

40 tests across 8 files pass, including seven system contract checks. Repository lint, formatting and Svelte check pass (zero errors or warnings). Production build succeeds with the Vercel adapter. Existing optional dependency warnings remain for `bufferutil`, `utf-8-validate` and `supports-color`.

Contract checks cover generated CSS parity, token references, unique identifiers, arbitrary value guards including component style blocks, centralized icons, documented breakpoints, four-pixel spacing and inherited exceptions, contrast calculations, copy duration and source artwork bounds.

## Deliberate review items

The baseline preserves inherited type scales, gray roles and off-grid spacing, marking exceptions for review. The pale hero gray remains below AA large-text contrast and is documented in the live reference. These are visible design decisions for the next consolidation pass, not silently resolved in this extraction.

Branch: `codex/website-rebuild`. No commit, push or deployment. `master` remains `0a79a977b0af4e6d12b807ddb4f8a2a96413aafb`.

## Consolidation QA — September 10, 2026

Supersedes baseline sizes and counts above. 174 tokens reduced to 91; 28 font-size definitions to seven steps; 46 spacing values to fourteen; 16 colors to eight. Nine typography roles plus responsive rules replace the per-page recipes. One 768px reading measure and 56px minimum text-action height apply throughout.

- Desktop 1280px: visually checked homepage and donation layout. Both Donate actions and the inverted footer Download measure 56px high with 16px text. Supporting band padding is 56/64px.
- Tablet 768px: inspected the Contribute hero, equal contribution columns and heading wrapping; no text overflow.
- Mobile 320px: checked Home, Contribute, Download, Privacy Matters, Privacy Policy, Canary, Build, Blog, an actual blog article and the reference page. No document overflow. A long-word overflow found in the initial hero pass was fixed through the shared responsive display role: 72/48/32px, not a page-specific size.
- Real article loads with 18px body text and a 272px reading area at 320px; desktop reading area is 768px.
- Native copy specimen changes to check immediately and resets after three seconds. Native disclosure responds to Enter with visible focus. Disabled action stays disabled. Menu opens, Escape closes it and restores focus.
- 640×450 reflow fits; actual browser 200% zoom remains unverified, as in the baseline QA.
- Nostr-backed Blog and Canary required longer initial loading after restarting the dev server; both subsequently rendered. Their loaders were not changed.
- A transient Vite HMR error occurred while removing the redundant LinkButton module. Subsequent full page loads and the production build use Action directly.

41 tests pass, including the compact-scale and shared-dimension contracts. Lint, formatting, Svelte checks and production build pass. Existing optional Vercel dependency warnings remain unchanged. No commits or publishing; master remains at the recorded baseline.

## Rebase validation — September 10, 2026

- Replayed both website commits over upstream `04b010f`; the original state remains at `backup/website-rebuild-before-rebase`. Local `master` remains at `0a79a977b0af4e6d12b807ddb4f8a2a96413aafb`.
- All 41 tests pass on Vitest 5. Lint, formatting, Svelte checking and the Vercel production build pass with the upstream dependency upgrades. Three new Biome selector-order warnings were resolved by ordering the UI recipe before the more specific article heading recipe, moving the homepage FAQ override after its base rule, and removing a redundant tablet gap declaration. No typography values changed.
- Compared upstream Build body text and the new privacy disclosure after whitespace/markup normalization: identical. Policy Markdown and Vercel adapter configuration match upstream byte for byte.
- Download visually checked at 1280px, 768px and 320px: two balanced desktop/tablet columns and stacked mobile options with updated destinations. Build and Privacy Matters checked at 320px. Blog listing, a full article and the signed canary loaded successfully with upgraded Nostr/Markdown dependencies.
- Restarted the local dev server after the Vite major upgrade. Existing optional dependency tracing warnings (`bufferutil`, `utf-8-validate`, `supports-color`) remain in the successful Vercel build. Actual 200% browser zoom was not newly verified in this pass.
- The rebase and follow-up fixes are local only; no push, merge into master or deployment was performed.

## Homepage feature and FAQ expansion — September 10, 2026

- Inspected the six feature sections at desktop (1280px), tablet (768px) and mobile (320px), including the new text-only agents composition and longer feature headings. Four normalized sculptures remain intact. Inspected expanded FAQs at 320px and 390px.
- No horizontal document overflow at 1280, 768, 640, 390 or 320 CSS pixels. All sixteen FAQs were also open together without document overflow at 320px. The four-pixel local icon overflow on an open disclosure is the existing rotated plus glyph, contained within the page gutters.
- One H1, six feature H2s, an FAQ H2 and four category H3s; all sixteen disclosures responded to Enter. Visible keyboard focus remained present. Mobile menu opens; Escape closes it and restores focus. The relay FAQ anchor resolves, as do all homepage hash links.
- Confirmed FAQ JSON-LD questions and answers exactly match the rendered disclosure text. Homepage metadata now includes groups and connected agents. Browser warning/error log was empty.
- Homepage, Download, Privacy Matters, Contribute, Build, Privacy Policy, Canary, Blog and Design system returned HTTP 200 with the shared closing section. Existing download and navigation URLs remain unchanged. This pass did not retest a fetched individual blog article.
- All 41 tests pass; lint/format, Svelte check (zero errors/warnings), and the Vercel production build pass. Existing optional dependency tracing warnings for `bufferutil`, `utf-8-validate` and `supports-color` remain.
- The preview browser ignored zoom shortcuts: 1280px remained 1280px with device-pixel ratio 1. Checked 640×450 reflow instead; actual 200% browser zoom remains unverified. Reset the temporary viewport and FAQ state after inspection.
- Work is local on `codex/website-rebuild`, created from the clean `website-rebuild` checkout for the instructed branch scope. Local `master` remains `0a79a977b0af4e6d12b807ddb4f8a2a96413aafb`. No commit, push, merge or publishing performed.

## Consistent illustrated features — September 10, 2026

- All six homepage feature sections have copy left and artwork right at 1280px and 768px. At 1280px their copy/artwork centers differ by less than 0.01 CSS pixels. Visually inspected the new mail carrier and open hand on white against the existing community composition.
- At 320px every artwork follows its complete text block with a measured 32px gap and a 272px-wide viewport. Inspected both new images on mobile; the wider hand is fully contained. No document overflow at 1280, 768, 640 or 320px. 640×450 is a reflow check; actual 200% zoom remains unverified as noted above.
- Added a geometry regression check ensuring every visible alpha rectangle fits within its viewBox, retains the shared aspect ratio and is centered. All 42 tests pass, along with lint, formatting, Svelte checking and production build. Existing optional-dependency build warnings remain. Browser warning/error log is empty.
- Existing four assets are unchanged; the expanded viewBox math produces their previous framing. Both new source exports are documented in REBUILD.md and included in `/design-system`. Restored the browser's default viewport after testing. Work remains local on `codex/website-rebuild`; `master` is unchanged.

## Navigation, FAQ, and documentation verification — September 10, 2026

- Visually inspected the builders repository list at 1280px, restored homepage FAQ at 1280px, agent overview at 768px, and agent guide/content at 320px. Checked builders at 901/900/768/640/320px: no document overflow, desktop navigation fits at 901px, menu takes over at 900px, repository columns stack at 640px. All documentation uses the existing reading width and shared typography.
- The homepage has four native disclosures and the full FAQ has sixteen. Enter opens a question and reveals its answer. More opens by keyboard; Escape closes it and returns focus. It exposes Privacy Policy and Canary. Mobile navigation lists all nine destinations, closes after route selection, and supports Escape. At 640×450, its 448px contents scroll within a 361px region that ends above the viewport bottom. Actual 200% browser zoom remains unverified; this is a reflow check.
- The agent overview table of contents opens with Enter; all its anchors resolve, and a selected heading clears the sticky header. On-site runtime guide links resolve. Code blocks and wide tables have their own keyboard-focusable scrolling regions. No page overflow on the 320px Hermes guide or either FAQ page. Browser warning/error log is empty.
- HTTP checks passed for 33 routes: every main/More destination, all five runtime guides, protocol overview, and documentation linked from the overview pages. A scan of the 161 saved documents found no locally rewritten Markdown link missing from the snapshot. Existing blog, download, privacy, canary, and contribution routes returned 200. Existing individual blog article rendering was not changed.
- Documentation tests cover local link rewriting, code preservation, heading anchors, table accessibility, sanitization, image source resolution, concurrent request coalescing, one-hour refresh including changed upstream content, ETag revalidation, saved-copy recovery, invalid paths, upstream deletion, and unavailable uncached guides. All 50 tests pass; lint, formatting, Svelte checking and production build pass. Optional Vercel dependency tracing warnings remain unchanged.
- Work stays local on `codex/website-rebuild`. Local `master` remains `0a79a977b0af4e6d12b807ddb4f8a2a96413aafb`. No commit, push, merge, or deployment.

## Full responsive refinement — September 10, 2026

- Captured and inspected current baselines before changing the layout. The tablet homepage exposed narrow copy columns, oversized wrapping headings and undersized adjacent art. Mobile guides had repeated standalone-link margins. Tablet blog entries reserved excessive image width and an empty track on image-free entries. Mobile technical tables broke identifiers into very narrow fragments. These issues were corrected in shared styles and tokens.
- Final matrix: 12 page types × 10 widths (320, 390, 640, 641, 768, 900, 901, 1024, 1280, 1920px), 120 passing combinations. Each has one H1, a fitting header, no horizontal document overflow, and no out-of-bounds main content outside intended code/table scroll regions. Includes a live fetched blog article. Four remaining runtime guides and the Marmot overview also passed at 320px; the design-system reference fits at 320px with the new 24px tagline specimen.
- Inspected saved screenshots of the homepage, mobile/landscape navigation, builders, agents, full FAQ, blog listing/article, downloads, contributions/donations, Privacy Matters, Privacy Policy and Canary. The same 1280×900 homepage view before and after has a null pixel-difference bounding box: desktop appearance is unchanged. Screenshots and the numbered findings are in `design/responsive-qa/README.md`; raw matrix data is in `viewport-checks.json` alongside it.
- Verified menu opening leaves main content at its original position. At 844×390, its two-column panel ends at 369px, inside the viewport. Short portrait menus scroll; 48px menu rows and 44px compact text/copy targets remain accessible. Escape restores Menu focus, route selection closes the panel, keyboard focus leaving the header dismisses it, and clicking visible page text outside dismisses it.
- All sixteen FAQs opened by keyboard and stayed open together at 320px with no overflow and a visible focus outline. Donation copy announced success; URI values were inspected without activating payment links. Focused documentation tables respond to ArrowRight; table/code overflow remains local. Browser warning/error log is empty.
- All 50 tests, lint, formatting, Svelte checking and production build pass. Existing optional Vercel dependency warnings remain. These checks use the in-app browser, not physical Safari/Firefox devices. Actual 200% browser zoom remains unverified; narrow reflow and short portrait/landscape viewports were checked. The previously approved pale hero color remains the known contrast review item.
- Work remains local on `codex/website-rebuild`; master remains `0a79a977b0af4e6d12b807ddb4f8a2a96413aafb`. No commit, push, merge or deployment.

## Navigation grouping verification — September 10, 2026

Verified the approved desktop order and all five More destinations, including the legal divider. Inspected the grouped 320px menu with no document overflow; For builders navigates to `/build` and closes the menu. Escape closes desktop More and restores focus. All 50 tests, formatting, lint, Svelte checking and production build pass; existing optional build warnings remain. No publishing or branch changes.

Verified Contribute precedes Blog in desktop and compact navigation. More, homepage FAQ and full FAQ use down/up chevrons; keyboard expansion and Escape remain functional. Open controls use a 180-degree transform with no transition. Inspected the full FAQ at 320px with no overflow. All 50 tests and required lint/format/type/build checks pass.

## Builder repository grouping — September 10, 2026

- `/build` now groups MDK and marmot-ts under Libraries in the left column, with iOS, Android, macOS and Linux under Apps in the right column. The existing Grid primitive stacks the groups below 640px.
- The protocol repository moved into a dedicated Marmot Protocol section with supporting text, the local specification link and its preserved GitHub destination. Other documentation pages retain their existing resource navigation.
- Browser-reviewed at 1280px, 768px, 390px and 320px. Equal columns align on desktop/tablet; groups and protocol links wrap on mobile. No document overflow at the measured widths. The specification link successfully opens `/docs/marmot/README.md`.
- All 50 tests, lint, formatting, Svelte/TypeScript checks and production build passed. The build retains optional dependency notices from the existing Vercel adapter tracing. Actual browser 200% zoom was not verified in this pass.
- Work remains on `codex/website-rebuild`; `master` remains at `0a79a977b0af4e6d12b807ddb4f8a2a96413aafb`. Nothing committed, pushed or published.

## Build developer-guide restoration — September 10, 2026

1. Reference review: captured the live White Noise Build page. Its purpose is client development, with a Rust quick start and protocol reference material. The search index returned an older copy; the live browser showed updated crate names and event kind 30443.
2. Replacement review: captured the local page before editing. The introductory agent language, repository-first ordering, and appended unlabelled MDK README mixed distinct tasks. This was an information-structure issue rather than a need for another visual style.
3. Restored guide: inspected browser captures at 1280px, 768px and 320px. The page starts with Build with Marmot and a Rust quick start; detailed source documents are deliberate links, with no agent setup in the guide. Libraries and Apps retain their grouped repository layout. First-section and protocol-section gaps use the shared relationships. Table code identifiers remain intact, with native horizontal scrolling inside tables and code regions at narrow widths.
4. Navigation/accessibility checks: MDK documentation opens its own on-site page from the built preview; the Build overview, MDK root, app runtime guide, Marmot registry and Agents routes all return 200 with the expected titles. Keyboard Tab displays a solid focus outline on the documentation link. The 320px document remains 320px wide, and code regions are keyboard focusable. Actual browser 200% zoom and a full screen-reader audit were not performed.

Validation: 51 tests passed; lint, formatting, Svelte/TypeScript checks and production build passed. Existing optional native-module tracing notices remain in the build output. No new design tokens, colors, type roles, icons or visual primitives. Work remains on `codex/website-rebuild`; master remains at `0a79a977b0af4e6d12b807ddb4f8a2a96413aafb`. Nothing committed, pushed or published.

## Shared long-form spacing and documentation cleanup — September 10, 2026

- Removed the standalone Marmot Protocol resource navigation and the “On this page” disclosure from the shared documentation layout. Agent-runtime links, main navigation and contextual Build specification links remain.
- Documentation, blog prose, essays and policy content now use the same existing relationships: 96px desktop / 80px tablet / 64px mobile before section and subsection headings; 24px heading-to-body and paragraph/list gaps. Section-wrapped essays use the same gap as flat Markdown. First headings avoid duplicate top spacing, and adjacent headings stay together.
- Browser-checked Agents, the real “Building the messenger that deserves to exist” blog article, Build, Privacy Matters and Privacy Policy. Measured subsection margins at 1280px, 768px and 320px; measured article/essay/policy widths at 320px with no document overflow. Removed controls are absent from the Agents DOM. Code and table scrolling remains intact. Actual browser 200% zoom was not verified.
- All 51 tests, lint, formatting, Svelte/TypeScript checks and production build pass. Shared token values, type roles and content wording are unchanged. Master remains at its original baseline; nothing committed, pushed or published.

## Sticky guide navigation — September 10, 2026

- Added the user-approved shared `DocumentationLayout` to Agents, For builders and their existing MDK/Marmot guide routes. The sidebar replaces the horizontal runtime links, lists Getting started first, underlines the current guide, and uses `aria-current`. Nested source documents retain the matching parent guide. The main header and More menu are unchanged.
- Reused the existing definition grid ratio, UI typography, color/spacing/border tokens and target sizes. Desktop sidebar position is sticky at the header height plus the shared copy/action gap, with a viewport-limited scroll area. At 900px and below it becomes a labeled native select above the article. No new token values or type roles.
- Verified desktop at 1280px: after scrolling, the sidebar stays at 120px below an 88px header, with no document overflow. Hermes navigation highlights Hermes; a nested marmot-app document highlights MDK. Verified the native selector at 768px and 320px, including navigation from Hermes to Codex. On the built preview, TypeScript and Repositories anchors update selection and place the target heading at 96px, clear of the header. Repository columns still stack at 320px. Actual browser 200% zoom was not verified.
- All 53 tests, lint, formatting, Svelte/TypeScript checks and production build passed. The active-guide tests cover nested runtime paths, nested MDK/Marmot pages and Build anchors. The local preview on port 4174 was rebuilt and restarted. Master remains at the original baseline; nothing committed, pushed or published.

### Compact guide sidebar — September 10

- Removed the redundant desktop area title and extra link padding in the shared Agents/For builders sidebar. Existing UI typography now gives each desktop row a 24px height, down from 44px; current-page underlining and sticky behavior remain.
- Verified the rebuilt `/agents` preview at 1280px: all six rows measure 24px, no area label, no horizontal overflow. At 320px the sidebar is hidden and the labeled native selector remains 58px high with no page overflow. No new browser zoom check was performed for this scoped change.
- All 53 tests, formatting, lint and Svelte checks pass. Production build passes with existing optional-module tracing warnings. `master` remains at `0a79a977b0af4e6d12b807ddb4f8a2a96413aafb`; no commit, push or publication.

### Right-side guide navigation — September 10

- Moved the shared sticky guide navigation to the right for Agents, For builders and their documentation. The existing four-column grid gives the article three columns, with the compact guide links in the fourth; content now aligns with the site's left edge. No new tokens introduced.
- Verified `/agents` at 1280px: article 764px, navigation 212px, existing 64px gap, no overflow. After scrolling, navigation stays at 120px below the viewport top. At 320px the labeled selector still precedes the article and the page has no horizontal overflow. Viewport override reset after checking; actual browser zoom was not retested.
- All 53 tests, lint, formatting, Svelte checks and production build pass. Existing optional-module tracing warnings remain. No publication or branch changes.

### One-page Agents guides and scroll tracking — September 10

- `/agents` now includes Getting started and all five full runtime guides, as requested. Sources retain their refresh/fallback handling, source links and code examples. Sanitized guide HTML receives scoped IDs and internal links, with source headings nested under each runtime; no duplicate IDs were found in the rendered combined page. Existing runtime URLs remain available for inbound links.
- Sidebar destinations now use same-page anchors. A shared scroll listener tracks the last section reaching the reading line, updates `aria-current` and the mobile selector, and cleans up listeners/observers on navigation. Inactive links use the existing muted color, with ink and underline only on the active item. Restored 4px vertical padding for 32px desktop link rows.
- At 1280px, clicking Codex placed its full guide at 96px below the viewport top and selected Codex. Scrolling upward into OpenClaw changed the active item to OpenClaw without changing the URL hash; the sidebar remained sticky at 120px. At 320px, choosing Pi in the native selector landed at its section and retained the selected value. No page overflow at 320px or 768px. Reset the viewport and returned to Getting started. Actual 200% browser zoom was not retested.
- All 56 tests pass, including new scope/cross-guide link and scroll-position boundary checks. Lint, formatting, Svelte checks and production build pass, with existing optional-module tracing warnings only. No push or publication.

### Sidebar title and separator — September 10

- Added Agents / For builders above the shared sidebar links, using UI typography, the existing hairline rule/color and 16px spacing around the divider.
- Verified title and 1px divider on the 1280px Agents preview. At 320px the labeled native selector remains visible, desktop sidebar hidden, and no horizontal overflow. Viewport override reset.
- All 56 tests, lint, formatting, Svelte checks and production build pass. No publication; existing build warnings unchanged.

### Three concise, isolated guides — September 10

- Replaced full embedded READMEs with curated Agents (357 words), For builders (323 words before repositories), and Marmot Protocol (168 words). All three use the same right-hand sticky section navigation, title/divider, padded muted links, active ink underline and mobile selector. No token changes.
- Every sidebar destination is a same-page anchor. Every full-documentation link in the article remains a direct GitHub URL. Renderer tests verify that preserving external links still sanitizes unsafe markup. Shared content tests check anchor coverage, unique headings, external destinations and bounded guide length.
- Desktop 1280px: visually reviewed Build and Marmot; checked all three sidebars against rendered targets. Agents reduced from over 64,000px of embedded guide content to a 3,285px page including the footer. Clicking Hermes and MDK stayed on the corresponding page and positioned headings at about 96px. Keyboard Enter activated Message delivery in Marmot; subsequent scrolling updated the active item.
- At 320px all three guides have no horizontal overflow. Build and Protocol native selectors navigate to sections and reflect active selection. Agents also checked at 768px with the sidebar hidden and no overflow. Temporary viewport override reset. Actual 200% browser zoom was not retested.
- Verified HTTP redirects for legacy agent routes, MDK root and a deep Marmot specification URL. Full-source destinations stay on GitHub; main public URLs and header navigation remain intact. All 59 tests, lint, formatting, Svelte checks and production build pass. Existing optional-module build tracing warnings remain. Master is still `0a79a977b0af4e6d12b807ddb4f8a2a96413aafb`; no commit, push or publication.

### FAQ topic-link removal — September 10

- Removed the horizontal Getting started / Privacy and identity / Groups and the network / Agents navigation row from FAQ. All four question groups, their anchors, disclosures and structured data remain.
- Verified the row is absent at 1280px and no overflow at 320px. All 59 tests, lint, formatting, Svelte checks and production build pass. No publishing.

### Everyday-language homepage copy — September 11

- Removed the Marmot/MLS explanatory paragraph at the user's request, then shortened all six homepage feature sections to one paragraph each. Feature body copy is now 105 words total, down from 276 after the initial removal. Omitted key handling, runtime lists, relay configuration, and protocol architecture details; simplified the network heading and two link labels.
- Verified one paragraph per feature, with 13–21 words each. Desktop composition remains aligned with the existing artwork; 320px and 768px have no page overflow. Viewport override reset. No typography or spacing changes, and no new zoom test.
- All 59 tests, lint, formatting, Svelte checks and production build pass. Master remains at the recorded baseline; nothing pushed or published.

### Privacy Policy callout — September 11

- Removed Canary from the Privacy Matters closing resources. Replaced the small link pair with “Read our Privacy Policy” in the existing 32px heading role, followed by a short explanation of the policy's data handling and privacy choices. Uses the existing section and heading/body gaps.
- Verified desktop presentation and 320px wrapping without overflow; the link opens `/privacy`. Preserved the existing essay and policy content. All 59 tests, lint, formatting, Svelte checks and production build pass. No publication.

### Blog image fallback and original colors — September 11

- Every blog entry now renders a thumbnail through shared BlogImage. Missing sources and image-load failures use the canonical white WN logo centered on the existing ink background. Article headers use the same fallback. Removed the blog grayscale filter and the layout exception for image-free entries; original image files remain untouched.
- Verified all 17 entries have image areas, including the White Noise v2026.5.22 Released fallback. Desktop placeholder is 220×183px with a centered 96px logo; tablet thumbnail is 144×120px. At 320px the listing and article fallback fit without overflow. Existing loaded images have computed filter `none`. Added explicit article-title labels to the clickable entries and verified the release link resolves by its accessible name.
- All 59 tests, lint, formatting, Svelte checks and production build pass. Existing optional-module tracing warnings remain. Viewport override reset; no new zoom test and no publication.

### Blog back navigation — September 11

- Replaced the article's top “Back to the journal” link with “Back to blog” and the user-requested left chevron from the shared icon registry. It uses muted UI text, no default underline, and an underline on the label for hover. Removed the duplicate bottom link.
- Desktop verified one back link, the left chevron, muted computed color and no default text decoration. At 320px the target is 44px high with no page overflow. Clicking returns to `/blog`; viewport override reset. All 59 tests, lint, formatting, Svelte checks and production build pass. No publication.

### Release-post ending — September 11

- Consolidated the May 22 release article's ending into “Contributors and release notes,” preserving all contributor names and one “Read the release notes” link to the existing GitHub releases destination. Removed the duplicate Get the update block, divider, vNEXT label and Report issues paragraph.
- This is a local presentation override scoped to the source post's stable d-tag and known footer shape. Signed source content and other posts remain unchanged; a changed upstream footer shape is left intact. Sanitization runs before the presentation adjustment.
- Verified exactly one releases link in the rendered article, preserved names, and no horizontal overflow at 320px. All 62 tests, lint, formatting, Svelte checks and production build pass. Tests cover body preservation, post scoping, changed upstream structure and sanitizer protection. Viewport reset; no publication.
# Download channels — September 11, 2026

- Follow-up: all four actions now use the registry down arrow. App Store and Google Play are enabled primary buttons, with their destinations deliberately left for later wiring at the user's request. Zapstore and Download APK use the existing gray secondary variant. Checked enabled button activation and desktop/320px rendering; 62 tests, lint, formatting, Svelte checks and production build passed again.

- Removed the Download eyebrow and TestFlight option. Kept the headline and grouped App Store under iPhone, with Google Play, Zapstore and Download APK under Android. Reused the shared Action primitive and existing spacing tokens.
- Zapstore uses the existing official site's app destination. The direct APK URL, `https://ipf.dev/android/whitenoise-latest.apk`, was verified with an HTTP HEAD response (200, Android package MIME type); no binary was downloaded. App Store and Google Play URLs are pending user input; their buttons are disabled and omitted from structured-data download URLs.
- Browser checked at 1280px, 768px and 320px: no horizontal overflow, consistent 56px actions, two platform columns on desktop/tablet and stacked columns on mobile. Actual browser 200% zoom was not retested in this pass.
- Validation: 62 tests passed; lint, formatting, Svelte checks and production build passed. Existing optional dependency tracing warnings remain. Work stays local on `codex/website-rebuild`; master remains `0a79a977b0af4e6d12b807ddb4f8a2a96413aafb`.
