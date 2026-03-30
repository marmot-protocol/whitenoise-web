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
```

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

### Dry-run the event shape

To inspect the exact unsigned event JSON before signing or publishing:

```bash
./scripts/publish-canary.sh --dry-run
```

You can also provide a custom title:

```bash
./scripts/publish-canary.sh --dry-run "White Noise Canary — March 2026"
```

This prints the event through `jq`, including:
- `kind`
- `content`
- the full `tags` array
