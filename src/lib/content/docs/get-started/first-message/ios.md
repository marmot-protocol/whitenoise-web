# Send a message

Both people need White Noise, or another compatible Marmot client, set up and connected. A Nostr public key (an address starting with `npub`) identifies the person. Their app also needs to publish invitation keys so you can start a chat. If that fails, see [Invitation problems](/docs/troubleshooting/invitations).

You can start a direct chat from **New Message** using the person's Nostr address or npub. Scanning their profile QR code works too.

## Start a chat

<figure><a href="/docs/ios/chats.svg"><img src="/docs/ios/chats.svg" alt="Chats toolbar with the New Message button at the upper right." loading="lazy" width="1206" height="210" /></a><figcaption class="type-small">On Chats, use the New Message button at the upper right. Select the image to enlarge.</figcaption></figure>

1. In **Chats**, tap **New Message** to open the **New Chat** screen.
2. Enter the person's Nostr address or npub, or tap **Scan QR Code** to scan their profile code.
3. Choose the person from the results, where a **Verified** badge means their address has been verified.

If you already have a chat with that person, White Noise asks you to pick an existing conversation or tap **Start new conversation**. If the lookup finds no profile, confirm the address with the person. If the lookup or chat creation fails, check your connection and tap **Retry**.

<figure><a href="/docs/ios/new-message.svg"><img src="/docs/ios/new-message.svg" alt="New Chat screen with New Group, Scan QR Code and a name or npub search field." loading="lazy" width="1206" height="2340" /></a><figcaption class="type-small">Search by name or npub at the bottom, or choose Scan QR Code. This example has no existing contacts. Select the image to enlarge.</figcaption></figure>

## Send your first message

1. Open the new chat and look for the prompt inviting you to send the first message.
2. Type your message in the composer and send it.

**Expected result:** your text appears in the chat. A local send status reports progress on your device only, and the recipient may still be offline or yet to read it.

If a message shows **Not delivered**, tap it, then choose **Try Again** to resend or **Delete** to discard it. If White Noise says you blocked this person, tap **View Profile** to check who it is, then tap **Unblock** to send messages. If the chat is still syncing, wait a moment and tap **Retry**. See [Delivery problems](/docs/troubleshooting/delivery) if messages keep failing.

## Invite someone new

On the New Chat screen, tap **Invite to White Noise** or **Share Invite** to open your share options with an invitation to download the app.

## Accept or decline an invitation

When someone invites you to a chat or group, the conversation shows **Accept** and **Decline**. Open it and tap **Accept** to join or **Decline** to turn it down. See [Invitation problems](/docs/troubleshooting/invitations) for more help.
