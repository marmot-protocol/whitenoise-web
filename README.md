# White Noise website

Marketing and documentation site for White Noise, built with SvelteKit.

## Development

Use Node 22 and Bun 1.4.2, matching CI and the Vercel runtime.

```bash
bun install --frozen-lockfile
bun run dev
```

Development and production preview servers listen on the local network for phone testing. Open the Network URL printed by Vite on a phone connected to the same Wi-Fi. Keep the server running during review and use the default scripts rather than overriding the host with `127.0.0.1`.

## Quality checks

```bash
bun run test
bun run lint:write
bun run format
bun run check
bun run build
```


## Site structure and maintenance

- Navigation destinations and active-page rules live in `src/lib/navigation.ts`, with guide paths and sections in `src/lib/documentation-navigation.ts`. The header and closing Download section live in `src/lib/components/site` and are rendered once by the root layout. Shared UI primitives live in `src/lib/components/system`.
- Appearance follows the device by default, with a persistent light/dark icon toggle in the top navigation. The small `static/theme.js` bootstrap applies saved choices before page paint; the design-system catalog owns both palettes.
- `src/lib/design-system/README.md` documents the active tokens, typography and component contracts. `/design-system` is the noindex reference, omitted from navigation and the sitemap. Run `bun run tokens:generate` after editing a catalog and include its generated CSS and runtime constants with the source.
- Homepage features live in `src/lib/content/homepage.ts`; FAQ pages, structured data and text exports share `src/lib/content/faqs.ts`. The short Agents, Build and Marmot guides use local Markdown in `src/lib/content`; full upstream documentation remains on GitHub. Legacy documentation URLs retain their redirects.
- Blog posts and canary attestations come from Nostr. Keep their loaders, sanitization, cache behavior and signed data intact. The privacy policy source is `src/lib/content/privacy-policy.md`.
- Generated exports and temporary browser evidence belong in ignored `output/` or `tmp/` directories. They are not production assets. Superseded design explorations and screenshots remain recoverable from Git history.
- The site uses the Vercel adapter. `bun run ci` runs the release checks locally; publishing still requires explicit authorization.

## Production behavior

Marketing pages, the FAQ, and the Agents, Build and Marmot guides are pre-rendered. The shared docs route uses an explicit Marmot README entry with `prerender = "auto"`; other documentation URLs remain server redirects and do not initialize the guide renderer. The legacy `.md` page URL explicitly serves HTML on Vercel; the preview middleware maps it to the generated `.html` file because SvelteKit preview otherwise infers Markdown MIME from the URL. Blog content, canary attestations and the sitemap also use server routes. No relay access is needed to build static pages. The page shell includes a styled error route; content outages return 503 rather than a misleading 404.

Relay transport lives under `src/lib/server`. It verifies signatures, author, kind and filters, chooses the newest replaceable event, and closes requests within ten seconds. Requests retain verified partial results. List and article caches coalesce concurrent reads, expire after five minutes, and allow at most one hour of stale blog content after refresh failures. Expired missing-post results are never served as stale content during an outage. Caches are process-local and bounded; they are not persistent storage. Canary data is cached for one minute with no stale-on-error fallback. The page renders the signed statement verbatim, escaped as text.

The content security policy permits same-origin code and the existing `analytics.ipf.dev` service. Inline style attributes remain allowed for measured artwork and the live design reference; inline executable scripts require SvelteKit's generated hashes/nonces. Blog images may use HTTP(S) origins. Framing is denied, content sniffing is disabled, and cross-origin referrers are limited. Vercel applies the static-asset headers as well. Keep deployment policy in sync with the local server hooks.

`/llms.txt` and `/llms-full.txt` retain their public URLs and are generated from the overview, FAQ and guide sources. They no longer claim to contain full upstream documentation. The sitemap reports article modification dates and does not invent fresh modification dates for static pages.

Agent setup prompts live in `agent-setup` fences in `src/lib/content/agents.md`; the guide's visible prompt containers, copy controls and text export share this source. Guide Markdown is rendered once per server instance; page data contains either one article or sections with prompts, without a duplicate full article. Keep the runtime-specific prerequisites and installation-approval step when updating them.

The cookie dependency override applies the upstream 0.7.x validation fix for [GHSA-pxg6-pf52-xh8x](https://github.com/advisories/GHSA-pxg6-pf52-xh8x) while SvelteKit declares the older range. Recheck this override when updating SvelteKit; remove it once the framework resolves a fixed version itself.

Existing `/images/rebuild/` paths are stable public asset URLs retained for compatibility. Site components and styles use durable `site` naming. The design system's documentation catalog is isolated from normal page runtime imports; small generated constants supply breakpoint and copy-feedback behavior.

Public availability copy describes the intended launch state, when both iPhone and Android apps are available. The App Store and Google Play buttons are user-approved active placeholders: clicking stays on the Download page. They are excluded from structured download URLs. Zapstore and the direct APK retain their real destinations. Replace the placeholders only when store URLs are supplied.

## Artwork sources

Manrope is self-hosted through `@fontsource-variable/manrope`. The canonical WN mark, supporter logos, social preview and application icons remain in `static/`.

The IPF supporter lettermark was adapted from the [official IPF favicon](https://ipf.dev/favicon.svg) on September 15, 2026: its straight-edged letter contours were traced into SVG, the square background removed, and the letters made black as requested. Its optical frame and the OpenSats frame are documented in the design-system README; original letter shapes and proportions are preserved.

Current illustrations in `static/images/artwork/` are the user-approved WebPs from `/Users/vladimirkrstic/Workspaces/ffmpeg-tools/output/half-size-webp-2026-09-13`, supplied September 13, 2026. Copy these files unchanged; do not re-encode them. Source dimensions and visible alpha bounds (above 16, excluding near-transparent export noise) live in `src/lib/design-system/artwork.ts`. The shared viewport preserves proportions and uses the approved artwork layout.

| Site asset | Supplied file | Placement |
| --- | --- | --- |
| `conversation.webp` | `Private Conversation-half.webp` | Private messages. Private groups. |
| `identity-balloon.webp` | `Woman With A Balloon-half.webp` | No phone number. No email. |
| `agent-contact.webp` | `Agent-half.webp` | All your AI in a single app |
| `network-flower.webp` | `Girl With A Flower-half.webp` | No central server. No lock-in. |
| `band.webp` | `Band-half.webp` | We can’t lock you in. |
| `children-plant.webp` | `Children Holding Plant-half.webp` | Open source. Open standards.; Contribute introduction |
| `smith-chain.webp` | `Smith & Chain-half.webp` | Built with the community.; Download feedback section |

The seven distinct active illustrations total 1.97 MB. `Explorer Boy-half.webp` is not used in the selected composition. Earlier `/images/rebuild/` URLs remain available for compatibility. Original Figma exports came from the [Marketing file](https://www.figma.com/design/JnQBwAwtSteJR3NO0iVPyp/05.-Marketing?node-id=25-2): lantern `25:18`, roots `112:2`, identity `25:187`, community `120:17`, agents `25:303`, open `35:21`.

## Content verification

The website copy is editable, but security and availability claims need source verification. Consult the [Marmot protocol](https://github.com/marmot-protocol/marmot), [MLS standard](https://www.rfc-editor.org/rfc/rfc9420.html), native [iOS](https://github.com/marmot-protocol/whitenoise-ios) and [Android](https://github.com/marmot-protocol/whitenoise-android) clients, and [agent integration documentation](https://github.com/marmot-protocol/mdk/blob/master/integrations/README.md). Platform statements must agree with the current Download destinations; privacy disclosures must agree with the policy.

Do not equate identity-key reuse with synchronized message history, claim guaranteed anonymity or connectivity, or imply that encrypted agent transport makes a cloud model run locally. Preserve donation addresses, payment URIs and download destinations unless an update is explicitly approved.

Responsive release review should cover desktop, tablet, 320px, keyboard navigation and actual browser 200% zoom. A narrower viewport alone is not proof of a completed browser-zoom check.

The security contact in `static/.well-known/security.txt` uses the [published IPF security address](https://raw.githubusercontent.com/marmot-protocol/marmot/master/dependency_reqs.md), replacing the archived app repository. Confirm that mailbox ownership remains current during release review.

## Canary attestations

The `/canary` page fetches signed White Noise canary attestations from Nostr.

Current setup:
- custom immutable event kind: `303`
- author pubkey: `75d737c3472471029c44876b330d2284288a42779b591a2ed4daa1c6c07efaf7`
- relays:
  - `wss://relay.primal.net`
  - `wss://relay.damus.io`
  - `wss://nos.lol`
  - `wss://relay.ditto.pub`

Recommended event shape for published canary events:
- `kind: 303`
- `content`: the human-readable canary statement
- tags:
  - `title`
  - `t=canary`
  - `t=attestation`
  - `r=https://www.whitenoise.chat/canary`
  - one `relays` tag containing all publication relays

Example tag set:

```text
["title", "White Noise Canary — March 30, 2026"]
["t", "canary"]
["t", "attestation"]
["r", "https://www.whitenoise.chat/canary"]
["relays", "wss://relay.primal.net", "wss://relay.damus.io", "wss://nos.lol", "wss://relay.ditto.pub"]
```

### Publishing a canary with `nak`

Use the helper script in this repo:

```bash
NOSTR_SECRET_KEY=<white-noise-nsec> bun run canary:publish
```

You can optionally override the generated title:

```bash
NOSTR_SECRET_KEY=<white-noise-nsec> bun run canary:publish -- "White Noise Canary — March 2026"
```

The script generates the standard canary text automatically using the current date, publishes a kind `303` event to all configured relays, adds a single `relays` tag listing those relays, and includes the canonical `/canary` page in the `r` tag.

To publish one or more events with historical dates, repeat `--date`. Historical events use noon UTC on the specified date for `created_at`. The script displays the dates and asks for confirmation before signing and publishing them:

```bash
NOSTR_SECRET_KEY=<white-noise-nsec> bun run canary:publish -- \
  --date 2026-04-30 \
  --date 2026-05-31 \
  --date 2026-06-30 \
  --date 2026-07-31
```

Pass `--yes` to skip the batch confirmation in an already-approved, non-interactive run. Before publishing, the script verifies that `NOSTR_SECRET_KEY` belongs to the White Noise pubkey. The secret is read from the environment and is not passed in the `nak` process arguments.

### Dry-run the event shape

To inspect the exact unsigned event JSON before signing or publishing:

```bash
./scripts/publish-canary.sh --dry-run
```

You can also provide a custom title:

```bash
./scripts/publish-canary.sh --dry-run "White Noise Canary — March 2026"
```

Dry-run historical events by repeating `--date`:

```bash
./scripts/publish-canary.sh --dry-run \
  --date 2026-04-30 \
  --date 2026-05-31
```

This prints the event through `jq`, including:
- `kind`
- `content`
- the full `tags` array

## Release considerations

- App Store and Google Play URLs have not been supplied. The Download page keeps the user-approved active placeholders described above; Zapstore and the APK have real destinations.
- The pale hero gray is an accepted exception to large-text AA contrast, recorded in the design system.
- “Holding Ourselves to It” on Privacy Matters contains absolute privacy/anonymization claims that conflict with the policy's stated limitations. That copy still needs a separate content review; the canonical policy is unchanged.
- Vercel's build tracer reports the optional `supports-color` dependency of `debug`. Local production builds and tested routes work without it.

Before publishing, verify deployed headers and domain redirects, check mobile Safari on a physical device, and resolve the outstanding content and store-destination decisions. Keep dated test results and browser evidence in ignored `tmp/` or `output/`, rather than maintaining a second release log here.

Favicon artwork uses the exact path from `static/images/logomark.svg`, centered without distortion in a square: white on ink for light mode, ink on white for dark mode. `favicon.svg` follows device appearance without JavaScript; the theme controller selects explicit SVG, PNG and ICO variants when running. SVG is preferred, with a 96px PNG and multi-resolution 16/32/48/64/256px ICO fallback. The 180px Apple touch icon and 192/512px maskable manifest icons use the white-on-ink version; installed icons are not live theme controls. Maskable exports keep the complete mark inside the central 80% safe circle. Raster assets were rendered from these vector paths at 4× output resolution and downsampled, with independently rendered ICO entries. Regenerate them from the canonical path if the mark changes; never wrap raster data in SVG.
