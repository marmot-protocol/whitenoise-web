# Send a message

Both people need White Noise or another compatible Marmot client, with a connected account and published invitation keys. A Nostr public key, beginning with `npub`, identifies the person; a Nostr profile alone does not mean they are ready to receive encrypted chat invitations.

Text follows the [reviewed Linux source](/docs/compatibility#linux). Screenshots show `v2026.10.6-build.1` with synthetic offline data. Controls can differ; cross-client messaging and full recovery have not been verified.

## Check your setup

If Chats shows **Get started**, check **Connect to relays** and **Publish your key package** first. Use **Check now** to refresh a waiting check, then **Publish** if needed. A completed key-package row says **Key package published**.

Keep a remote signer open and approve requests there if your account uses one. A disconnected signer can delay operations even when relays are connected.

## Start a direct chat

1. Choose **New chat** from Chats or the **Get started** checklist.
2. Use **Search contacts...** to find a saved contact.
3. Select the contact. White Noise creates and opens the conversation.

You can also open a person's contact page and choose **Start chat**. See [Contacts](/docs/using/contacts/linux) if the person is not in your contact list.

## Start with a Nostr address instead

The new-chat contact search is a contact picker, not the mobile address-entry screen. To create a group with someone who is not saved as a contact:

1. In **New chat**, choose **New group**.
2. Enter a **Group name**. A photo is optional.
3. In **First member**, paste the person's npub, or search for and select a contact.
4. Choose **Create group**. If you enter an address that needs resolving, the action may first say **Look up**; review the resolved person before creating the group.

A group needs a first member besides you. This creates a group, not a special direct-chat lookup. See [Groups](/docs/using/groups/linux) for managing it.

If creation fails because the person has no invitation key, ask them to open their compatible client, connect to relays, and publish a key package. Confirm their public key through a channel you trust before trying again.

## Send your first message

1. Open the conversation. An empty chat says **No messages yet** and invites you to send the first message.
2. Type in **Send a message...**.
3. Press **Enter** to send. Use **Shift+Enter** for a new line.

Expected result: your text appears in the conversation. A local send result does not prove the other person has received or read it. Messages written offline enter the device's send queue for reconnecting; do not delete the vault or remove the account to fix a connection problem.

If you see **You can't send messages to someone you blocked**, check the person's identity and choose **Unblock** only if you want to resume direct messaging. For other failures, keep the error details and see [Delivery problems](/docs/troubleshooting/delivery) and [Linux diagnostics](/docs/settings/linux/diagnostics).

<figure><a href="/docs/linux/composer.svg"><img src="/docs/linux/composer.svg" alt="Message composer containing the fictional draft The squirrels borrowed the meeting agenda, with attachment and microphone controls." loading="lazy" width="692" height="107" /></a><figcaption class="type-small">A fictional draft in the real composer. The paperclip adds attachments; the microphone starts recording. Nothing was sent. Select the image to enlarge.</figcaption></figure>

## Respond to an invitation

A pending conversation shows **You were invited to this group.** Choose **Accept** to join or **Decline** to turn it down. Read the invitation before accepting; do not use account removal as a way to decline it.

To share your own address, open **Settings > Keys & identity > Identity**, then use **Copy** beside **Public key (npub)**. Share the npub, never your private `nsec` key or a backup password.
