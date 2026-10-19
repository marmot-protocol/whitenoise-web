# Recover an agent

When an agent stops replying or fails mid-task, an action may already have happened. Find out what happened before you retry.

**Before retrying.** Repeating a request can repeat its effects, such as a second commit, message or purchase. Confirm the outcome of the first attempt first.

## Diagnose

1. Save the exact request you sent, the time, and any error the agent or connector showed.
2. Separate White Noise status from agent activity. A sent message on your phone shows local status, not that the connector received it.
3. On the computer, check that the agent runtime is running and still signed in.
4. If you use Hermes or OpenClaw, confirm the gateway was restarted as the guide instructs after installation or changes.
5. Check external effects directly: the project files, repository, or service the agent was using.
6. Check your network. A relay, VPN or provider can block or delay traffic.

## Retry safely

1. Note what completed and what did not.
2. Send a harmless test message and wait for a reply. See [Agent routing](/docs/agents/routing).
3. Ask for only the remaining steps, and name what is already done.

## Expected result

The agent answers the test message, and the remaining work finishes without duplicates.

## Escalate

If the connector still fails, follow the troubleshooting in the runtime's guide in the MDK repository. Avoid reinstalling or clearing state as a first step. Report the problem with your saved errors and private content removed.
