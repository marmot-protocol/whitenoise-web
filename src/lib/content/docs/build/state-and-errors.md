# State and errors

A Marmot client stores local state so conversations can continue after a restart. That state holds the MLS group data your client needs to decrypt and send messages, so handle it with care when something breaks.

## What local state means

- The identity key identifies the account. On its own it cannot restore message history or MLS group state.
- Clearing storage or reinstalling can permanently remove conversations from that device. Keep both out of first-step troubleshooting.
- Group changes can arrive out of order. Process them with the library's group and message operations so your state stays consistent with other members.

## Track status separately

Show local send status and recipient status as two different things. When a relay accepts an event, that shows your client published it. It does not show that the recipient received, decrypted or read it. Push notifications depend on OS permission and background conditions, so they cannot prove delivery either.

## Diagnosing an error

1. Before you change anything, save the exact request, the error text, and the library version and commit.
2. Work out which layer failed: identity, invitation, group processing, storage or transport.
3. For transport errors, check whether the relays can be reached. Relays, VPNs and network providers can all block traffic.
4. If you are unsure whether something reached the network, such as a message or a group change, confirm that first. Check the relays or ask the recipient.
5. Retry only after you know the earlier attempt failed. Blind duplicate sends can cause repeated messages or conflicting group changes.

## Logs and screenshots

Logs can contain other people's identifiers and content. Before you share a log, redact peer keys, group and message identifiers, and message text. Never include private keys.

## Escalation

If state still looks inconsistent, open an issue in the library repository with the details you saved. Ask maintainers before you delete any local data.
