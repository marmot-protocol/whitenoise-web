# Marmot Protocol

## Getting started

Marmot is a protocol for end-to-end encrypted group messaging. It gives different clients a shared set of rules for identities, groups, and messages.

White Noise is an app built on Marmot. Other clients can implement the same protocol. This page introduces the main concepts; the full specification on GitHub covers the formats, validation rules, and behavior needed to build a client.

[Read the full specification on GitHub](https://github.com/marmot-protocol/marmot/blob/master/README.md)

## Identity

Marmot uses Nostr public keys to identify accounts. A group also keeps track of the devices participating in it, with separate keys for their MLS membership.

This distinction lets the protocol associate a device with an account while validating its role in a particular group. Clients check that the account has authorized the device’s membership key.

[Identity specification on GitHub](https://github.com/marmot-protocol/marmot/blob/master/foundation/identity.md)

## Groups and encryption

Messaging Layer Security (MLS) manages the group’s encryption state. Joining, leaving, and sending messages follow agreed rules so members can process changes consistently.

Marmot defines the steps around MLS: creating a group, inviting members, processing incoming messages, and applying membership changes. These rules help different clients agree on the group’s state, even when updates arrive in a different order.

[Group flows and encryption on GitHub](https://github.com/marmot-protocol/marmot/blob/master/protocol-core/README.md)

## Message delivery

Clients currently use Nostr relays to carry encrypted messages. Marmot requires transport to support delivery through multiple endpoints, rather than depending on a single server.

The delivery layer defines where clients publish messages and how recipients fetch them. It carries the encrypted data; group membership and encryption are handled by the protocol above it. Keeping these responsibilities separate allows other transports to be defined without changing account identities.

[Message transport specifications on GitHub](https://github.com/marmot-protocol/marmot/blob/master/transports/README.md)
