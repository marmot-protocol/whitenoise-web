# Build with Marmot

## Getting started

Marmot provides the messaging protocol; its libraries give you a starting point for building a client. Your app supplies the interface around accounts, conversations, and messages.

Start with MDK, the Marmot Development Kit, written in Rust. It is the flagship Marmot library: White Noise is built on it, and it gets most of the protocol's research and development.

Marmot libraries are also available in other languages:

- TypeScript: [marmot-ts](https://github.com/marmot-protocol/marmot-ts)
- Kotlin: [marmot-kmp](https://github.com/vitorpamplona/marmot-kmp), extracted from Amethyst
- C#: [Scramble.Marmot](https://github.com/DavidGershony/Scramble/tree/master/src/Scramble.Marmot.Engine), the engine behind Scramble
- Odin: [mdk-odin](https://gitworkshop.dev/cyberguy.fyi/relay.ngit.dev/mdk-odin)
- Common Lisp: [cl-marmot](https://github.com/modus-lisp/cl-marmot)

The repositories below include libraries and existing apps you can learn from.

## Choosing Marmot

Marmot suits apps where people or agents talk in end-to-end encrypted groups, identify themselves with Nostr keys and exchange messages through relays that anyone can run.

What you get:

- A Rust engine that White Noise uses on Android and iOS, with Swift and Kotlin bindings (MarmotKit) and a C interface.
- Group encryption based on Messaging Layer Security (MLS), including adding and removing members.
- Account identity from Nostr keys, with no phone number or email address.
- MIT-licensed source.

What your app is responsible for:

- Keeping each account's private key and local database safe. Losing either can mean losing the account or its conversation history on that device.
- Choosing relays. Each participant needs to reach the relays where others publish invitations and messages.
- Telling people what relays can see: encrypted messages, timing and connection information.

Another approach may fit better if you need a server to read, search or moderate message content, or contact discovery by phone number.

When Marmot fits, start with the two-person chat tutorial in the developer guides.

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

The library is in alpha; its maintainers advise against production use.

[Full TypeScript documentation on GitHub](https://github.com/marmot-protocol/marmot-ts/blob/master/README.md)

## Client flow

A basic messaging client needs to:

1. Create or load an account identity.
2. Publish the key material other people need to invite it.
3. Create a group or accept an invitation.
4. Send and receive encrypted messages through the group.
5. Store local state so conversations can continue after a restart.

Use MDK’s group and message operations to implement this flow.

## Protocol basics

Marmot uses Nostr public keys for account identity and Messaging Layer Security (MLS) to manage encryption within a group. Clients commonly deliver the encrypted messages through Nostr relays.

Compatible clients must agree on how identities, invitations, and group changes are processed. The specification defines those rules; MDK implements them for your app.

[Full protocol specification on GitHub](https://github.com/marmot-protocol/marmot/blob/master/README.md)
