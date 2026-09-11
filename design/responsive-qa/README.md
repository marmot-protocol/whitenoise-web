# Responsive design verification — 10 September 2026

Scope: local White Noise preview, using the current desktop design as the visual reference. All captures below are from this verification run.

## Results

120 route/viewport combinations passed: twelve page types at 320, 390, 640, 641, 768, 900, 901, 1024, 1280 and 1920 CSS pixels. Every checked page has one H1, a fitting header, and no document overflow or out-of-bounds main content outside intentional code/table scroll regions. Raw measurements are in [viewport-checks.json](viewport-checks.json).

## 1. Homepage and artwork — improved

Tablet features now stack at 900px, keeping the heading and copy on a useful reading measure. The artwork follows at its normalized size. Phone taglines use 24px beneath a 32px title. The 1280×900 desktop homepage has an exact pixel match with the baseline.

![01 before home tablet](/Users/vladimirkrstic/Workspaces/wn-website/design/responsive-qa/01-before-home-tablet.png)

![08 after home tablet](/Users/vladimirkrstic/Workspaces/wn-website/design/responsive-qa/08-after-home-tablet.png)

![11 after home mobile](/Users/vladimirkrstic/Workspaces/wn-website/design/responsive-qa/11-after-home-mobile.png)

## 2. Navigation — verified

Download stays visible beside Menu below 900px. The menu opens over the page without moving content. Tablet/landscape menus use two columns; phone menus use one. Links have 48px targets. Escape restores focus, navigation selection closes the panel, and focusing or clicking outside dismisses it. The short-screen panel is bounded by the dynamic visible viewport.

![10 after menu mobile](/Users/vladimirkrstic/Workspaces/wn-website/design/responsive-qa/10-after-menu-mobile.png)

![12 after menu landscape](/Users/vladimirkrstic/Workspaces/wn-website/design/responsive-qa/12-after-menu-landscape.png)

## 3. Builders and agent guides — improved

Repeated links no longer inherit empty copy-to-action margins. Guides retain the 768px reading limit and get comfortable touch targets. Code examples and tables scroll inside the page and are keyboard-focusable. Mobile table columns have a 192px minimum so long paths do not wrap into tiny fragments. ArrowRight scrolled a focused table successfully.

![02 before agents mobile](/Users/vladimirkrstic/Workspaces/wn-website/design/responsive-qa/02-before-agents-mobile.png)

![09 after agents mobile](/Users/vladimirkrstic/Workspaces/wn-website/design/responsive-qa/09-after-agents-mobile.png)

![23 after build mobile](/Users/vladimirkrstic/Workspaces/wn-website/design/responsive-qa/23-after-build-mobile.png)

![25 after table mobile](/Users/vladimirkrstic/Workspaces/wn-website/design/responsive-qa/25-after-table-mobile.png)

## 4. FAQ — verified

Four questions remain on the homepage and sixteen on the full FAQ page. All sixteen were opened by keyboard and remained open together at 320px without page overflow. The active summary has a visible focus outline. Tablet homepage FAQs stack below their heading.

![14 after faq mobile](/Users/vladimirkrstic/Workspaces/wn-website/design/responsive-qa/14-after-faq-mobile.png)

## 5. Blog and reading pages — improved

Tablet blog thumbnails use a 144px track, leaving more room for summaries. Entries without images use the reading width. Phone body and introductory text remain 18px with 1.5 leading. Articles, Privacy Matters, Privacy Policy and Canary retain their content and receive the same responsive rhythm.

![05 before blog tablet](/Users/vladimirkrstic/Workspaces/wn-website/design/responsive-qa/05-before-blog-tablet.png)

![15 after blog tablet](/Users/vladimirkrstic/Workspaces/wn-website/design/responsive-qa/15-after-blog-tablet.png)

![16 after article mobile](/Users/vladimirkrstic/Workspaces/wn-website/design/responsive-qa/16-after-article-mobile.png)

![18 after privacy matters mobile](/Users/vladimirkrstic/Workspaces/wn-website/design/responsive-qa/18-after-privacy-matters-mobile.png)

![19 after policy mobile](/Users/vladimirkrstic/Workspaces/wn-website/design/responsive-qa/19-after-policy-mobile.png)

![20 after canary mobile](/Users/vladimirkrstic/Workspaces/wn-website/design/responsive-qa/20-after-canary-mobile.png)

## 6. Downloads, contributions and closing section — verified

Utility pairs remain useful on tablets and stack on phones. Shared section spacing reduces proportionately. Donation addresses wrap while the 44px copy controls remain alongside them; copy feedback announced success. Download destinations, payment URIs and signed-event links were inspected without initiating downloads or payments. The shared black closing section remains continuous with the footer.

![21 after download tablet](/Users/vladimirkrstic/Workspaces/wn-website/design/responsive-qa/21-after-download-tablet.png)

![22 after contribute tablet](/Users/vladimirkrstic/Workspaces/wn-website/design/responsive-qa/22-after-contribute-tablet.png)

![13 after donations mobile](/Users/vladimirkrstic/Workspaces/wn-website/design/responsive-qa/13-after-donations-mobile.png)

## Verification limits

- These are viewport and keyboard checks in the Codex in-app browser, not physical-device testing in Safari or Firefox.
- Actual browser 200% zoom remains unverified: the preview browser does not apply its zoom shortcuts. 640×450 and short portrait/landscape reflow were checked instead.
- The previously approved pale hero gray remains the existing contrast review item; this pass does not claim full accessibility conformance.
- Existing optional Vercel dependency-tracing warnings remain. No commit, push, merge or deployment was performed.
