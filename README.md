# White Noise website

Marketing and documentation site for White Noise, built with SvelteKit.

## Development

```bash
bun install
bun run dev
```

## Quality checks

```bash
bun run test
bun run lint:write
bun run format
bun run check
bun run build
```


## Site structure and maintenance

- Shared navigation and the closing Download section live in `src/lib/components/rebuild` and are rendered once by the root layout. Shared UI primitives live in `src/lib/components/system`.
- `src/lib/design-system/README.md` documents the active tokens, typography and component contracts. `/design-system` is the noindex reference, omitted from navigation and the sitemap. Run `bun run tokens:generate` after editing a catalog and commit its generated CSS with the source.
- Homepage and FAQ copy share `src/lib/content/homepage.ts`. The short Agents, Build and Marmot guides use local Markdown in `src/lib/content`; full upstream documentation remains on GitHub. Legacy documentation URLs retain their redirects.
- Blog posts and canary attestations come from Nostr. Keep their loaders, sanitization, cache behavior and signed data intact. The privacy policy source is `src/lib/content/privacy-policy.md`.
- Generated exports and temporary browser evidence belong in ignored `output/` or `tmp/` directories. They are not production assets. Superseded design explorations and screenshots remain recoverable from Git history.
- The site uses the Vercel adapter. `bun run ci` runs the release checks locally; publishing still requires explicit authorization.

## Artwork sources

Manrope is self-hosted through `@fontsource-variable/manrope`. The canonical WN mark, supporter logos, social preview and application icons remain in `static/`. The transparent 1200px sculptures in `static/images/rebuild/` come from the [Figma Marketing file](https://www.figma.com/design/JnQBwAwtSteJR3NO0iVPyp/05.-Marketing?node-id=25-2). Visible bounds and normalization live in `src/lib/design-system/artwork.ts`; preserve source pixels and logo geometry.

| Asset | Figma source node |
| --- | --- |
| `lantern.png` | `25:18` |
| `roots.png` | `112:2` |
| `identity.png` | `25:187` |
| `community.png` | `120:17` |
| `agents.png` | `25:303` |
| `open.png` | `35:21` |

## Content verification

The website copy is editable, but security and availability claims need source verification. Consult the [Marmot protocol](https://github.com/marmot-protocol/marmot), [MLS standard](https://www.rfc-editor.org/rfc/rfc9420.html), native [iOS](https://github.com/marmot-protocol/whitenoise-ios) and [Android](https://github.com/marmot-protocol/whitenoise-android) clients, and [agent integration documentation](https://github.com/marmot-protocol/mdk/blob/master/integrations/README.md). Platform statements must agree with the current Download destinations; privacy disclosures must agree with the policy.

Do not equate identity-key reuse with synchronized message history, claim guaranteed anonymity or connectivity, or imply that encrypted agent transport makes a cloud model run locally. Preserve donation addresses, payment URIs and download destinations unless an update is explicitly approved.

Responsive release review should cover desktop, tablet, 320px, keyboard navigation and actual browser 200% zoom. A narrower viewport alone is not proof of a completed browser-zoom check.

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
