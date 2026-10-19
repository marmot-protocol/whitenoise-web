# Agent routing

Before asking an agent to change files or act for you, confirm where your messages go. A wrong project directory or account can send work to the wrong place.

## Prerequisites

- A connector installed and approved for your account
- The agent's public key, added through New Message in White Noise

## Check the route

1. Open the conversation with the agent from the account you authorized during setup.
2. Choose the working location. With Codex, send a message containing the directory path, such as `/path/to/project`. With Claude Code, select a trusted project directory under your home folder. With OpenCode, choose the project directory you want it to use. Other runtimes follow their own guide.
3. Send a harmless roundtrip request, such as asking which runtime and directory it is using. Claude Code setup asks for a text-only test message.
4. Compare the reply with what you expect: runtime, computer, conversation and project.
5. Repeat the check after changing directory, conversation, account or connector settings.

## Expected result

The agent answers in the same conversation and reports the runtime and project you chose.

## If the route is wrong

- Stop sending task requests until the route is fixed.
- Keep each conversation and project separate. Reusing another group's environment as a workaround can expose that group's files or context to the wrong people.
- Recheck the setup against the runtime's guide in the MDK repository.
- If replies never arrive, follow [Recover an agent](/docs/agents/recovery).
