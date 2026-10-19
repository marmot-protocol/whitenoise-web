# Client compatibility

Two Marmot clients can work together when they handle identities, invitations and group changes in the same way. The specification defines those rules and libraries implement them. Each library or app version may cover a different part of the specification.

## Before you claim compatibility

1. Write down the exact specification, library and app commits or versions you are testing.
2. Check identity. Accounts use Nostr public keys, and each client must verify that the account authorized every device's MLS membership key.
3. Check invitations. From each client, publish key material, send an invitation and accept one.
4. Check group changes. Add and remove members, and process updates that arrive out of order.
5. Check delivery across more than one relay. Marmot transport must not depend on a single server.
6. Send a harmless test message from each side. Judge each step by what the recipient sees, not by local send status.

## Expected result

You end up with a written record of which flows worked between which versions. Claim compatibility only for those flows and versions.

## Known limits

- Compatibility testing between MDK, marmot-ts and White Noise releases remains pending for these guides.
- marmot-ts is in alpha. Check what it currently supports before you rely on it.
- Linked-device support is still in development. Importing the same identity on another device does not sync history or encryption state.

## Escalation

If two clients disagree about group state, save both clients' versions and errors. Then report it against the specification or the library, with steps to reproduce it.
