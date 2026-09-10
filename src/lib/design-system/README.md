# White Noise design system — established baseline

The live reference is `/design-system`. It uses the same tokens and components as the website, rather than a separate approximation. This first pass records the approved site and makes its inconsistencies reviewable; it does not declare every inherited value a final design decision.

## Sources of truth

- `tokens.json`: named colors, typography values, spacing, widths, grids, geometry, layers, icon sizes and motion. Each token records its purpose, original uses, and `established` or `review` status. CSS dimensions use rem; documentation converts to pixels at the default 16px root. Historical `type-size-*px` names identify the original measured size, while their values are rem.
- `typography.json`: the existing responsive type recipes, including deliberate display differences and inherited exceptions. `typography.ts` adds semantic Text roles to these same rules. Element semantics and visual role are independent.
- `tokens.css` and `typography.css`: generated outputs. Edit the catalogs, then run `bun run tokens:generate`. Do not hand-edit these files.
- `icons.ts`: the only active Carbon icon imports. Icons inherit text color; Icon supplies the shared size. Icons are decorative inside controls with accessible names.
- `artwork.ts`: measured visible-pixel bounds of the source sculptures. Image geometry is source data, not a spacing scale. Artwork normalizes the transparent assets without modifying their pixels or logo geometry.
- `baseline.json`: historical audit of the CSS before extraction, for comparison only. It is not another live source of styles.
- `primitives.css`: shared component structure and states. `src/rebuild.css` composes the existing pages using tokens. `reference.css` styles only the reference page.

## Composition and components

Use `src/lib/components/system` for new work:

| Component | Contract |
| --- | --- |
| Text | Semantic heading/paragraph/span with a named type role and ink, muted or inverse tone. |
| TextLink | Shared underlined inline navigation; external destination handling is explicit. |
| Action | Native link or button; primary, secondary and inverse variants, optional registry icon, real disabled button. |
| Icon | One registry, consistent visible geometry, decorative by default. |
| CopyButton | Accessible 44px target, copy → check immediately, reset after three seconds; screen-reader status without visible extra copy. |
| Disclosure | Native details/summary with keyboard behavior and the shared disclosure icon. |
| Container | Shared left-aligned content measure and responsive gutters. |
| Grid | Equal two/three-column grids; stacks at the mobile breakpoint. |
| Surface | Paper, muted or ink full-width background while content retains the shared alignment. |

Existing Header, PageIntro, Artwork, Supporters and DownloadClosing remain composed patterns under `components/rebuild`. The root layout provides the same Header, closing statement and Footer on every route. LinkButton delegates to Action for compatibility. Existing page selectors consume the generated typography recipes; changing a recipe updates both its live page and its visual specimen.

Full-bleed surfaces extend the shared container using shadow and clipping. Place them inside the site container, not inside a scroll-clipped wrapper. No page-specific copy of a button, icon or footer is needed.

## Rules for the next pass

1. Choose a documented semantic role and existing spacing token before adding a value. Four pixels (0.25rem) is the spacing base. The scale represents distances, not a visible decorative grid.
2. Do not add literal colors, font sizes, spacing, dimensions or arbitrary Tailwind values in page/component styles. Breakpoint literals are the documented 640/900px contract because CSS variables cannot be used in media queries. Zero, percentages, intrinsic layout keywords and measured SVG/artwork geometry are structural values.
3. `legacy-space-*` values and other `review` tokens preserve the current site. They are not a recommended palette for new composition. Consolidate them deliberately during review, updating all affected consumers together.
4. If a new role is necessary, add its token with a concrete purpose, consumers and review status. Regenerate styles, inspect its specimen and affected pages, then run the checks. Renaming an old arbitrary value is not justification for a new token.
5. Keep Manrope self-hosted. Keep brand geometry intact. Use the icon registry, not new inline icon approximations.
6. State changes are immediate cuts: no fades, resizing, moving elements, keyframes or smooth scrolling. The three-second copy confirmation is a state duration, not an animation.
7. Preserve native semantics, visible keyboard focus, selectable donation addresses and responsive wrapping. Never test donation links by initiating a payment.

## Known review items

- The user-selected pale hero gray (#9e9e9e) has approximately 2.68:1 contrast on white, below the 3:1 large-text AA threshold. It is preserved and flagged visibly, not silently changed.
- Several gray roles, fixed type sizes, type weights, reading measures and spacing exceptions overlap. The reference lists the complete baseline so these can be consolidated with context.
- Existing action heights differ (52px default, 56px donation). Both are captured; the next review can choose a single rhythm.
- Unmounted legacy components and the old `glitch-*` Tailwind theme remain for compatibility. They are outside the active presentation, are not endorsed system components, and must not be used for new pages.

## Validation and temporary access

`tokens.test.ts` checks generated-file parity, token references, duplicate identifiers, contrast calculations, spacing conventions, responsive breakpoints and artwork geometry. It guards active routes/components against arbitrary style values and direct icon imports, including component style blocks.

Run `bun run test && bun run lint:write && bun run format && bun run check`, followed by `bun run build` for a complete release validation. Browser-check affected routes at desktop, tablet and 320px, plus keyboard controls and zoom/reflow. Automated token checks supplement visual judgment; they cannot establish optical quality alone.

The temporary footer link is controlled by `showDesignSystemLink` in `preview.ts`. Set it to false when review access should be removed. The reference page is marked noindex/nofollow and is not added to the sitemap. It remains a normal local route; no authentication or public deployment was introduced.
