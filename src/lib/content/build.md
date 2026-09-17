# Build with Marmot

## Getting started

Marmot provides the messaging protocol; its libraries give you a starting point for building a client. Your app supplies the interface around accounts, conversations, and messages.

Start with the Rust MDK for a native client, or explore marmot-ts for a TypeScript project. The repositories below include libraries and existing apps you can learn from.

## MDK

The Marmot Development Kit is a Rust workspace for building messaging clients. It includes an app runtime, account and group management, encrypted storage, and network transport.

For an app, start with `marmot-app`. Language bindings are available through `marmot-uniffi`. Lower-level libraries are there when you need more control.

To explore the workspace, install the Rust version specified in its toolchain file, then run:

```sh
git clone https://github.com/marmot-protocol/mdk.git
cd mdk
cargo test -p cgka-engine
```

[Full MDK documentation on GitHub](https://github.com/marmot-protocol/mdk/blob/master/README.md)

## TypeScript

marmot-ts offers client, group, storage, and network interfaces for TypeScript projects.

```sh
npm install @internet-privacy/marmot-ts
```

The library is in alpha; its maintainers advise against production use. Check its current feature support before choosing it for your project.

[Full TypeScript documentation on GitHub](https://github.com/marmot-protocol/marmot-ts/blob/master/README.md)

## Client flow

A basic messaging client needs to:

1. Create or load an account identity.
2. Publish the key material other people need to invite it.
3. Create a group or accept an invitation.
4. Send and receive encrypted messages through the group.
5. Store local state so conversations can continue after a restart.

Use the library’s group and message operations to implement this flow. The exact integration steps depend on the library you choose.

## Protocol basics

Marmot uses Nostr public keys for account identity and Messaging Layer Security (MLS) to manage encryption within a group. Clients commonly deliver the encrypted messages through Nostr relays.

Compatible clients must agree on how identities, invitations, and group changes are processed. The specification defines those rules; a library implements them for your app.

[Full protocol specification on GitHub](https://github.com/marmot-protocol/marmot/blob/master/README.md)
