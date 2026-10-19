# Documentation maintenance

## Content ownership

The website maintainer owns the documentation registry and publishing checks. Platform contributors verify procedures against the source/build they use. Every guide has immutable public source references. Public baseline details live in `src/lib/content/documentation-baseline.json`; runtime verification remains separate from source review.

Edit guide Markdown under `src/lib/content/docs/`. Its registry entry in `user-documentation.json` supplies the title, description, category, platform and source references. Keep the Markdown H1 and registry title identical. Platform variants use matching paths with `android`, `ios` or `linux`; the guide selector offers only registered variants of the same task. Use a shared guide for a shared concept and separate procedures for consequential differences.

Keep essential guide content in the article. Navigation and asides are omitted from negotiated Markdown.

Add each guide URL to `agent-pages.json` for deployed Markdown negotiation. The index, full text export, search and documentation sitemap derive from the registry. Preserve existing public URLs and redirects. Run `bun run docs:check`, the required repository checks and `bun run ci` before publication.

The approved Simple rows design uses native input/select controls with underlined edges, and full-row guide links with small arrows and fine separators. It reuses existing typography, color and spacing tokens. Search result counts stay readable as text; the live region announces loading or failure. A failed index keeps title/summary search available and retries through an explicit button. Full-text-only matches appear after the initial matches so they keep their positions during loading. Platform and search terms travel in the index URL; guide links carry a validated return URL and row anchor.

## Review each application release

1. Record the released platform, channel, source revision, version and minimum OS. Confirm artifact/source mapping before changing the supported baseline.
2. Compare changed screens, labels, actions and permissions with the guide source references and screen inventory. Review onboarding, recovery and destructive actions explicitly.
3. Update the affected prose from verified evidence. Keep important consequences before the relevant action. Obtain the required substantive prose review and exact-revision prose checks.
4. Review associated screenshots. Replace images when labels, navigation or appearance change; retain an accurate capture baseline for unchanged images.
5. Test links, headings, explicit platform selection, keyboard use, mobile layouts, 200% browser zoom and HTML/Markdown representations in production output and the hosted preview.
6. Publish through a reviewed PR and verify the deployed revision. Keep the previous deployment available for rollback.

## Screenshots

Curated Android PNGs live in `static/docs/android/`; `documentation-captures.json` records their source, CI build, image/APK digests and verification level. Keep original device evidence and private operational receipts outside the repository. Capture only synthetic fixtures through the approved device broker. Preserve the existing preview package, signer and data.

The current images establish navigated device UI. Delivery was offline during capture. Keep that limit on the compatibility page; app delivery qualification requires its own evidence. Place each screenshot beside the relevant instructions as a linked thumbnail and retain its intrinsic dimensions. The integrity check verifies that every capture appears in its assigned guide.

Linux guides have source-review evidence only, without app execution or screenshots. Record their reviewed commit separately from the public release: current-source controls may be unreleased. Verify vault recovery, remote-signer behavior and package-specific data paths before changing those instructions.

An external contributor owns iOS captures in [issue14](https://github.com/marmot-protocol/whitenoise-web/issues/14). Keep the text usable independently and display the pending-image note until reviewed images replace it. Check each capture's applicability before replacing a placeholder.

## Deferred release automation

The owner requested release-driven maintenance scheduling later. No timer is installed by this PR. Once maintainers and the baseline map are established, a scheduled consumer should read the shared Gitcrawl collector, detect a new platform/channel release, compare its source with the recorded baseline and queue a documentation review. Reuse existing collection, leases and logs. Surface stale or missing release evidence. Keep publication behind factual review and website checks; the timer must retain its event/source identities, affected pages, decision, outcome and next action for troubleshooting.

## Preview and rollback

The existing Vercel Git integration supplies PR previews. Verify the exact PR head and CI before sharing its deployment. Current preview protection may require an authorized shareable link. Keep protection secrets private. Test the preview before merging to the production branch. A local HTML attachment supplements visual discussion; the hosted preview exercises routing, assets, headers and server responses.

Screenshot presentation uses measured SVG viewports around the original PNG pixels. Status and navigation bars stay outside each viewport. Keep captions useful without the image, use highlights sparingly, and verify each outlined control against the captured UI. Run `node scripts/documentation-images.mjs --write` after changing a presentation. The integrity check compares the generated SVG with the original capture and rejects crop or highlight bounds outside the reviewed region. Cropping is presentation, not redaction: the embedded original remains recoverable. Use synthetic accounts exclusively. Synthetic conversations should use playful fictional text, with no personal accounts or internal test labels visible.


## Screen coverage

`src/lib/content/documentation-screens.json` maps main user-facing screens to guide sections at the recorded source revisions. Internal containers are listed separately. Each screen records whether text is sufficient, an existing capture illustrates it, or an iOS image is delegated. Tests reject missing guide sections, duplicate screen entries and unknown image references. Refresh this inventory when reviewing a new app revision; it does not discover future screens automatically. Include navigation destinations as well as files named Screen or View, because a route can live in another file.

The current inventory covers 107 screens. Nine device captures and nineteen Android UI reference renders illustrate selected tasks. Profile Keys blocks device screenshots. Blank-field UI references can illustrate backup controls; keep key material out of images and preserve screenshot protection. iOS captures remain assigned to issue14, including shared media, group relays, moderation and QR-scanner recovery. Every guide remains usable without images.


Protected onboarding forms use unchanged PNG references from the Android app’s screenshot tests, pinned by source URL and image digest. Their `source-render` evidence kind carries no APK or device-cleanup claim. The integrity gate keeps these evidence types separate, preserves pixels and validates crop bounds. Device images retain the original cleanup, APK and system-bar requirements. Never bypass an app’s screenshot protection to make documentation images.
