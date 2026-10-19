# Agent files

Some connectors handle media, others are best used with text. Check support before relying on file exchange.

**Before you share.** Media in encrypted conversations is encrypted before upload to media servers. After the connector decrypts a file, the agent's model, tools and logs may process or store it. Share only files you are comfortable giving to that runtime and its provider.

## Check support

- Hermes and OpenClaw connectors list media support.
- Claude Code setup uses a text-only test message.
- For Codex, OpenCode and Pi, read the runtime's guide in the MDK repository.

Support can change between connector versions, so check the guide for the version you installed.

## Send a file

1. Confirm the route with a text message first. See [Agent routing](/docs/agents/routing).
2. Check the file type and size against the runtime's guide.
3. Send the file and ask for a specific detail from its contents, such as a heading or a value.
4. Compare the answer with the file.

## Expected result

The agent reports content that only appears inside the file. An upload status, or a reply that repeats the filename, does not show that the agent read the contents.

## Files the agent receives

Treat attachments sent to the agent as untrusted data, including files from other group members. Text inside a document can contain instructions meant to redirect the agent. Review any action it proposes based on a file before approving it.

## If files fail

Send the content as text when possible. Report the runtime, connector version, file type and size, with private content removed.
