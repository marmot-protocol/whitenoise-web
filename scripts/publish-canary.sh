#!/usr/bin/env bash
set -euo pipefail

RELAYS=(
  "wss://relay.primal.net"
  "wss://relay.damus.io"
  "wss://nos.lol"
  "wss://relay.ditto.pub"
)

DRY_RUN=false
ASSUME_YES=false
EXPLICIT_DATES=false
USE_CURRENT_TIMESTAMP=false
DATES=()
CUSTOM_TITLE=""
EXPECTED_PUBKEY="75d737c3472471029c44876b330d2284288a42779b591a2ed4daa1c6c07efaf7"

CANARY_URL="https://www.whitenoise.chat/canary"

usage() {
  echo "Usage:" >&2
  echo "  NOSTR_SECRET_KEY=<nsec> $0 [--date YYYY-MM-DD]... [--yes] [\"Title\"]" >&2
  echo "  $0 --dry-run [--date YYYY-MM-DD]... [\"Title\"]" >&2
  echo >&2
  echo "When --date is repeated, one event is generated for each date." >&2
  echo "A custom title can only be used when generating one event." >&2
}

fail() {
  echo "$1" >&2
  usage
  exit 1
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --yes)
      ASSUME_YES=true
      shift
      ;;
    --date)
      [[ $# -ge 2 ]] || fail "--date requires a value in YYYY-MM-DD format."
      DATES+=("$2")
      EXPLICIT_DATES=true
      shift 2
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    --)
      shift
      [[ $# -le 1 ]] || fail "Only one custom title may be provided."
      CUSTOM_TITLE="${1:-}"
      shift $(( $# > 0 ? 1 : 0 ))
      ;;
    -*)
      fail "Unknown option: $1"
      ;;
    *)
      [[ -z "$CUSTOM_TITLE" ]] || fail "Only one custom title may be provided."
      CUSTOM_TITLE="$1"
      shift
      ;;
  esac
done

if [[ ${#DATES[@]} -eq 0 ]]; then
  DATES+=("$(date '+%Y-%m-%d')")
  USE_CURRENT_TIMESTAMP=true
fi

if [[ ${#DATES[@]} -gt 1 && -n "$CUSTOM_TITLE" ]]; then
  fail "A custom title cannot be used with multiple --date values."
fi

date_to_epoch() {
  local iso_date="$1"
  local epoch

  if epoch="$(date -u -d "${iso_date}T12:00:00Z" '+%s' 2>/dev/null)"; then
    :
  elif epoch="$(date -u -j -f '%Y-%m-%d %H:%M:%S' "${iso_date} 12:00:00" '+%s' 2>/dev/null)"; then
    :
  else
    return 1
  fi

  local round_trip
  if round_trip="$(date -u -d "@${epoch}" '+%Y-%m-%d' 2>/dev/null)"; then
    :
  else
    round_trip="$(date -u -r "$epoch" '+%Y-%m-%d')"
  fi

  [[ "$round_trip" == "$iso_date" ]] || return 1
  echo "$epoch"
}

format_epoch() {
  local epoch="$1"
  local human_date

  if human_date="$(date -u -d "@${epoch}" '+%B %e, %Y' 2>/dev/null)"; then
    :
  else
    human_date="$(date -u -r "$epoch" '+%B %e, %Y')"
  fi

  echo "${human_date//  / }"
}

EPOCHS=()
for iso_date in "${DATES[@]}"; do
  [[ "$iso_date" =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] || fail "Invalid date: $iso_date"
  dated_epoch="$(date_to_epoch "$iso_date")" || fail "Invalid calendar date: $iso_date"
  [[ ! "$iso_date" > "$(date '+%Y-%m-%d')" ]] || fail "Future dates are not allowed: $iso_date"
  if [[ "$USE_CURRENT_TIMESTAMP" == "true" ]]; then
    epoch="$(date '+%s')"
  else
    epoch="$dated_epoch"
  fi
  EPOCHS+=("$epoch")
done

RELAYS_TAG="$(IFS=';'; echo "${RELAYS[*]}")"

TAG_ARGS=(
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

  for index in "${!DATES[@]}"; do
    human_date="$(format_epoch "${EPOCHS[$index]}")"
    title="${CUSTOM_TITLE:-White Noise Canary — $human_date}"
    content="As of ${human_date}, Internet Privacy Foundation has not received any national security letters, FISA court orders, or gagged legal demands requiring us to conceal their existence.

As of ${human_date}, Internet Privacy Foundation has not been compelled to install backdoors, weaken encryption, or modify White Noise to facilitate surveillance."

    jq -n \
      --argjson created_at "${EPOCHS[$index]}" \
      --arg content "$content" \
      --arg title "$title" \
      --arg canary_url "$CANARY_URL" \
      --arg relay_1 "${RELAYS[0]}" \
      --arg relay_2 "${RELAYS[1]}" \
      --arg relay_3 "${RELAYS[2]}" \
      --arg relay_4 "${RELAYS[3]}" \
      '{
        kind: 303,
        created_at: $created_at,
        content: $content,
        tags: [
          ["title", $title],
          ["t", "canary"],
          ["t", "attestation"],
          ["r", $canary_url],
          ["relays", $relay_1, $relay_2, $relay_3, $relay_4]
        ]
      }'
  done

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

if ! command -v jq >/dev/null 2>&1; then
  echo "jq is required to verify the signing key but was not found in PATH." >&2
  exit 1
fi

signed_pubkey="$(nak event -k 303 -c '' </dev/null | jq -r '.pubkey')"
if [[ "$signed_pubkey" != "$EXPECTED_PUBKEY" ]]; then
  echo "The supplied NOSTR_SECRET_KEY does not match the configured White Noise pubkey." >&2
  exit 1
fi

if [[ "$EXPLICIT_DATES" == "true" && "$ASSUME_YES" != "true" ]]; then
  echo "The following dated canary events will be signed and published:" >&2
  printf '  %s\n' "${DATES[@]}" >&2
  read -r -p "Continue? [y/N] " reply
  [[ "$reply" =~ ^[Yy]$ ]] || exit 1
fi

for index in "${!DATES[@]}"; do
  human_date="$(format_epoch "${EPOCHS[$index]}")"
  title="${CUSTOM_TITLE:-White Noise Canary — $human_date}"
  content="As of ${human_date}, Internet Privacy Foundation has not received any national security letters, FISA court orders, or gagged legal demands requiring us to conceal their existence.

As of ${human_date}, Internet Privacy Foundation has not been compelled to install backdoors, weaken encryption, or modify White Noise to facilitate surveillance."

  nak event \
    --created-at "${EPOCHS[$index]}" \
    -k 303 \
    -c "$content" \
    -t "title=$title" \
    "${TAG_ARGS[@]}" \
    "${RELAYS[@]}"
done
