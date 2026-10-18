# Documentation maintenance

## Content ownership

The website maintainer owns the documentation registry and publishing checks. Platform contributors verify procedures against the source/build they use. Every guide has immutable public source references. Public baseline details live in `src/lib/content/documentation-baseline.json`; runtime verification remains separate from source review.

Edit guide Markdown under `src/lib/content/docs/`. Its registry entry in `user-documentation.json` supplies the title, description, category, platform and source references. Keep the Markdown H1 and registry title identical. Platform counterparts use matching paths with `android` or `ios`. Use a shared guide for a shared concept and separate procedures for consequential differences.

Keep essential guide content in the article. Navigation and asides are omitted from negotiated Markdown.

Add each guide URL to `agent-pages.json` for deployed Markdown negotiation. The index, full text export, search and documentation sitemap derive from the registry. Preserve existing public URLs and redirects. Run `bun run docs:check`, the required repository checks and `bun run ci` before publication.

The approved Simple rows design uses native input/select controls with underlined edges, and full-row guide links with small arrows and fine separators. It reuses existing typography, color and spacing tokens. Search result counts stay readable as text; the live region announces loading or failure. A failed index keeps title/summary search available and retries through an explicit button.

## Review each application release

1. Record the released platform, channel, source revision, version and minimum OS. Confirm artifact/source mapping before changing the supported baseline.
2. Compare changed screens, labels, actions and permissions with the guide source references and private coverage inventory. Review onboarding, recovery and destructive actions explicitly.
3. Update the affected prose from verified evidence. Keep important consequences before the relevant action. Obtain the required substantive prose review and exact-revision prose checks.
4. Review associated screenshots. Replace images when labels, navigation or appearance change; retain an accurate capture baseline for unchanged images.
5. Test links, headings, explicit platform selection, keyboard use, mobile layouts, 200% browser zoom and HTML/Markdown representations in production output and the hosted preview.
6. Publish through a reviewed PR and verify the deployed revision. Keep the previous deployment available for rollback.

## Screenshots

Curated Android PNGs live in `static/docs/android/`; `documentation-captures.json` records their source, CI build, image/APK digests and verification level. Keep original device evidence and private operational receipts outside the repository. Capture only synthetic fixtures through the approved device broker. Preserve the existing preview package, signer and data.

The current images establish navigated device UI. Delivery was offline during capture. Keep that limit visible; app delivery qualification requires its own evidence.

An external contributor owns iOS captures in [issue14](https://github.com/marmot-protocol/whitenoise-web/issues/14). Keep the text usable independently and display the pending-image note until reviewed images replace it. Check each capture's applicability before replacing a placeholder.

## Deferred release automation

The owner requested release-driven maintenance scheduling later. No timer is installed by this PR. Once maintainers and the baseline map are established, a scheduled consumer should read the shared Gitcrawl collector, detect a new platform/channel release, compare its source with the recorded baseline and queue a documentation review. Reuse existing collection, leases and logs. Surface stale or missing release evidence. Keep publication behind factual review and website checks; the timer must retain its event/source identities, affected pages, decision, outcome and next action for troubleshooting.

## Preview and rollback

The existing Vercel Git integration supplies PR previews. Verify the exact PR head and CI before sharing its deployment. Current preview protection may require an authorized shareable link. Keep protection secrets private. Test the preview before merging to the production branch. A local HTML attachment supplements visual discussion; the hosted preview exercises routing, assets, headers and server responses.
