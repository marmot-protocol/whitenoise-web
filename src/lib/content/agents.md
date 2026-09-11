# Connect your agent.

## Getting started

A connector lets you talk to an agent from a White Noise conversation. The agent runs on your computer, using the tools and accounts you already have set up.

You’ll need White Noise on your phone, a working agent runtime on your Mac or Linux computer, and your White Noise account’s public key (`npub`).

1. Choose your runtime below.
2. Follow its installation guide on GitHub. The installer asks which White Noise account may contact the agent.
3. Add the agent’s identity in White Noise, invite it to a conversation, and send a test message.

[Full setup documentation on GitHub](https://github.com/marmot-protocol/mdk/blob/master/integrations/README.md)

## Hermes

Use this connector if you already run Hermes. It adds White Noise to the Hermes gateway, with support for messages, reactions, media, and live previews.

Install the Marmot plugin, follow the gateway restart instructions, then add the agent in White Noise.

[Full Hermes documentation on GitHub](https://github.com/marmot-protocol/mdk/blob/master/integrations/hermes/marmot/README.md)

## OpenClaw

Use this connector if you already run OpenClaw. It adds White Noise as a channel in your existing gateway, with support for messages, media, and live previews.

Install the channel plugin and restart the gateway when prompted. Then invite the agent to your conversation.

[Full OpenClaw documentation on GitHub](https://github.com/marmot-protocol/mdk/blob/master/integrations/openclaw/marmot/README.md)

## Codex

Use this connector to work with Codex through White Noise. Codex must already be installed and signed in on the computer that runs the connector.

After setup, add the agent in White Noise. You can select a working directory with a message containing its path, such as `/path/to/project`.

[Full Codex documentation on GitHub](https://github.com/marmot-protocol/mdk/blob/master/integrations/codex/marmot/README.md)

## OpenCode

Use this connector to work with OpenCode through White Noise. Have OpenCode installed and working before you install the connector.

Add the agent in White Noise and choose the project directory you want it to work in.

[Full OpenCode documentation on GitHub](https://github.com/marmot-protocol/mdk/blob/master/integrations/opencode/marmot/README.md)

## Pi

Use this connector to work with Pi through White Noise. Pi must already be installed and signed in on the computer that runs the connector.

Once setup is complete, add the agent in White Noise and send a test message from the account you authorized.

[Full Pi documentation on GitHub](https://github.com/marmot-protocol/mdk/blob/master/integrations/pi/marmot/README.md)
