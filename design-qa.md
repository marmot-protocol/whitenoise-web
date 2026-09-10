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
