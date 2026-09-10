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
