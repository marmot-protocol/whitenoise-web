#!/usr/bin/env bash
set -euo pipefail

RELAYS=(
  "wss://relay.primal.net"
  "wss://relay.damus.io"
  "wss://nos.lol"
  "wss://relay.ditto.pub"
)

DRY_RUN=false
if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=true
  shift
fi

HUMAN_DATE="$(date '+%B %e, %Y' | sed 's/  / /g')"
TITLE="${1:-White Noise Canary — $HUMAN_DATE}"
CANARY_URL="https://www.whitenoise.chat/canary"
CONTENT="As of ${HUMAN_DATE}, Internet Privacy Foundation has not received any national security letters, FISA court orders, or gagged legal demands requiring us to conceal their existence.

As of ${HUMAN_DATE}, Internet Privacy Foundation has not been compelled to install backdoors, weaken encryption, or modify White Noise to facilitate surveillance."

usage() {
  echo "Usage:" >&2
  echo "  NOSTR_SECRET_KEY=<nsec> $0 [\"Title\"]" >&2
  echo "  $0 --dry-run [\"Title\"]" >&2
}

RELAYS_TAG="$(IFS=';'; echo "${RELAYS[*]}")"

TAG_ARGS=(
  -t "title=$TITLE"
  -t "t=canary"
  -t "t=attestation"
  -t "r=$CANARY_URL"
  -t "relays=$RELAYS_TAG"
)

if [[ "$DRY_RUN" == "true" ]]; then
  if ! command -v jq >/dev/null 2>&1; then
    echo "jq is required for --dry-run but was not found in PATH." >&2
    exit 1
  fi

  jq -n \
    --arg content "$CONTENT" \
    --arg title "$TITLE" \
    --arg canary_url "$CANARY_URL" \
    --arg relay_1 "${RELAYS[0]}" \
    --arg relay_2 "${RELAYS[1]}" \
    --arg relay_3 "${RELAYS[2]}" \
    --arg relay_4 "${RELAYS[3]}" \
    '{
      kind: 303,
      content: $content,
      tags: [
        ["title", $title],
        ["t", "canary"],
        ["t", "attestation"],
        ["r", $canary_url],
        ["relays", $relay_1, $relay_2, $relay_3, $relay_4]
      ]
    }'

  exit 0
fi

if ! command -v nak >/dev/null 2>&1; then
  echo "nak is required but was not found in PATH." >&2
  exit 1
fi

if [[ -z "${NOSTR_SECRET_KEY:-}" ]]; then
  echo "Set NOSTR_SECRET_KEY to the White Noise nsec before running this script." >&2
  exit 1
fi

nak event \
  --sec "$NOSTR_SECRET_KEY" \
  -k 303 \
  -c "$CONTENT" \
  "${TAG_ARGS[@]}" \
  "${RELAYS[@]}"
