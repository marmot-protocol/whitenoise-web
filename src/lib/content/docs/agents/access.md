# Agent access

A connector lets an agent on your Mac or Linux computer read and answer White Noise messages. Plan its access before you approve installation.

**What encryption covers.** Messages are encrypted between White Noise and the connector, so relays cannot read them. The connector then decrypts each message it receives. From that point your agent runtime, its model provider, tools and logging settings handle the content under their own policies. A cloud model stays a cloud model when you reach it through White Noise. Only a model running on your own computer keeps inference local.

## Prerequisites

- White Noise on your phone and your account's public key (`npub`)
- A working agent runtime, signed in, on a Mac or Linux computer. Windows support is not confirmed.

## Set access

1. Give the setup prompt only the `npub` of each account that should be allowed to message the agent. Keep this list as short as possible.
2. Read the installation plan the agent proposes. Check which files, directories, accounts and tools it will be able to use, and which host it runs on.
3. Approve only when that scope matches what you want the agent to do.
4. Treat received attachments, repository files and web pages as untrusted data. Instructions inside them can try to steer the agent.
5. From an authorized account, send a harmless test message.

## Expected result

The agent replies to the authorized account, and its tool scope matches what you approved. The connector guide describes how allowed senders are configured.

## If access looks wrong

Stop the connector before sending sensitive requests, then review the setup with the runtime's guide. See [Stop an agent](/docs/agents/stop).
