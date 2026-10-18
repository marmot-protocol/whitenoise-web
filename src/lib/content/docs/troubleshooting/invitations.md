# Invitations

**Outcome:** Both people see the conversation and can exchange messages.

**Prerequisites:** White Noise installed for both people. You also need the other person's public key or profile link; their QR code works too.

Your public key is safe to share. Keep your private key secret, including in conversations about troubleshooting.

## Diagnose

1. Confirm the identity. Compare the `npub` you entered with the one shown in the other person's profile, using a channel you trust. A single changed character points to a different account.
2. Ask the recipient to open White Noise and stay connected for a few minutes. An account has to publish the key material others need before anyone can invite it.
3. Check relays. Everyone in a conversation needs a shared way to exchange messages. If either of you uses a custom relay list, make sure you can both reach at least one relay in common.
4. Give the first invitation time while it is pending. If it still fails to arrive, send exactly one new invitation and wait again.
5. For an agent, add the agent's public key in New Message. Send a short test message from the account you authorized during setup. If the agent stays silent, confirm the connector is running and that your account is on its allowed senders list.
6. If you were removed from a group, ask an admin to add you again. Messages sent while you were out stay out of your reach.

## Expected result

The conversation appears for both people and a test message arrives.

## Escalation

Record the app version and platform. Add the time of the invitation and any error label. Redact contacts' keys and names, then follow [Report a problem](/docs/troubleshooting/report-problem).
