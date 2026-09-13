# Connect your agent.

## Getting started

A connector lets you talk to an agent from a White Noise conversation. The agent runs on your computer, using the tools and accounts you already have set up.

You’ll need White Noise on your phone, a working agent runtime on your Mac or Linux computer, and your White Noise account’s public key (`npub`).

1. Choose your agent below. Copy its setup prompt and paste it into that agent on your computer.
2. Give the agent your White Noise public key (`npub`) when it asks. Review the proposed changes and approve installation when you’re ready.
3. After setup, add the agent’s public key in New Message in White Noise and send a test message.

You can also follow the manual setup guides linked below.

[Full setup documentation on GitHub](https://github.com/marmot-protocol/mdk/blob/master/integrations/README.md)

## Hermes

Use this connector if you already run Hermes. It adds White Noise to the Hermes gateway, with support for messages, reactions, media, and live previews.

Install the Marmot plugin, follow the gateway restart instructions, then add the agent in White Noise.

```agent-setup
Connect this Hermes installation to White Noise through Marmot. Read the current connector guide at https://github.com/marmot-protocol/mdk/blob/master/crates/agent-connector/README.md. Explain how the connector works and what installation will change. Ask me for my White Noise public key (npub), then propose setup for that account. Ask for my approval before making changes. After approval, install and verify the connector, then reply with your agent public key.
```

[Full Hermes documentation on GitHub](https://github.com/marmot-protocol/mdk/blob/master/integrations/hermes/marmot/README.md)

## OpenClaw

Use this connector if you already run OpenClaw. It adds White Noise as a channel in your existing gateway, with support for messages, media, and live previews.

Install the channel plugin and restart the gateway when prompted. Then invite the agent to your conversation.

```agent-setup
Connect this OpenClaw instance to White Noise through Marmot. Read the current connector guide at https://github.com/marmot-protocol/mdk/blob/master/crates/agent-connector/README.md. Explain how the connector works and what installation will change. Ask me for my White Noise public key (npub), then propose setup for that account. Ask for my approval before making changes. After approval, install and verify the connector, then reply with your agent public key.
```

[Full OpenClaw documentation on GitHub](https://github.com/marmot-protocol/mdk/blob/master/integrations/openclaw/marmot/README.md)

## Codex

Use this connector to work with Codex through White Noise. Codex must already be installed and signed in on the computer that runs the connector.

After setup, add the agent in White Noise. You can select a working directory with a message containing its path, such as `/path/to/project`.

```agent-setup
Connect this Codex setup to White Noise through Marmot. Read the Codex harness guide at https://github.com/marmot-protocol/mdk/blob/master/integrations/codex/marmot/README.md and the connector guide at https://github.com/marmot-protocol/mdk/blob/master/crates/agent-connector/README.md. Explain how the connector works and what installation will change. Confirm that Codex CLI is installed and authenticated. Ask me for my White Noise public key (npub), then propose setup for that account. Ask for my approval before making changes. After approval, use the documented verified installation flow, reply with your agent public key, and ask me to send a test message.
```

[Full Codex documentation on GitHub](https://github.com/marmot-protocol/mdk/blob/master/integrations/codex/marmot/README.md)

## OpenCode

Use this connector to work with OpenCode through White Noise. Have OpenCode installed and working before you install the connector.

Add the agent in White Noise and choose the project directory you want it to work in.

```agent-setup
Connect this OpenCode setup to White Noise through Marmot. Read the current connector guide at https://github.com/marmot-protocol/mdk/blob/master/crates/agent-connector/README.md. Explain how the connector works and what installation will change. Ask me for my White Noise public key (npub), then propose setup for that account. Ask for my approval before making changes. After approval, install and verify the connector, then reply with your agent public key.
```

[Full OpenCode documentation on GitHub](https://github.com/marmot-protocol/mdk/blob/master/integrations/opencode/marmot/README.md)

## Pi

Use this connector to work with Pi through White Noise. Pi must already be installed and signed in on the computer that runs the connector.

Once setup is complete, add the agent in White Noise and send a test message from the account you authorized.

```agent-setup
Connect this Pi setup to White Noise through Marmot. Read the Pi harness guide at https://github.com/marmot-protocol/mdk/blob/master/integrations/pi/marmot/README.md and the connector guide at https://github.com/marmot-protocol/mdk/blob/master/crates/agent-connector/README.md. Explain how the connector works and what installation will change. Confirm that Pi is installed and authenticated. Ask me for my White Noise public key (npub), then propose setup for that account. Ask for my approval before making changes. After approval, use the documented verified installation flow, reply with your agent public key, and ask me to send a test message.
```

[Full Pi documentation on GitHub](https://github.com/marmot-protocol/mdk/blob/master/integrations/pi/marmot/README.md)
