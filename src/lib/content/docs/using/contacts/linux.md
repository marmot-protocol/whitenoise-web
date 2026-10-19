# Contacts

Open **Contacts** to browse the **People** list, start a conversation, or move a contact list between clients.

These instructions describe the reviewed Linux source. Packaged releases can differ; the steps have not been checked in a running app.

## Open a contact and start a chat

1. Select a person in the People list.
2. Review their name and public key. The page also shows key-package status, relays in common, and groups in common when available.
3. Click **Start chat**.

You can also use **New chat** in Chats and search the contact picker. See [Send a message](/docs/get-started/first-message/linux).

A display name is not a unique identifier. Compare the person's public key through a channel you already trust before relying on a familiar name or picture.

## Give someone a private nickname

1. Open the contact.
2. Enter a label in **Nickname**.
3. Press Enter to save it.

The nickname changes your local labels, not the person's published Nostr profile. Clear the field and press Enter to remove it. Nicknames are local-only, but contact exports include them, so do not share an export as though it contained public information only.

## Copy or show a contact's public key

Click **Copy** beside `npub`, or click **Show as QR** to display the person's code. To share your own account instead, open [Your profile](/docs/using/profiles/linux#share-your-public-key).

## Export contacts

> An exported contact file is readable outside White Noise. It includes names, public keys, your private nicknames, and blocked state. Save it somewhere appropriate and check it before sharing it.

1. Open Contacts.
2. At the bottom of the contact rail, click **Export CSV** or **Export JSON**.
3. Choose a file destination in the save dialog.

These buttons appear when you have contacts. This is a contact-list export, not a backup of your account, messages, or group encryption state.

## Import contacts

> Importing adds people to your Nostr contact list through follow operations. Your published contact list is not a private address book. Nicknames and blocked state are restored locally for newly added records.

1. Open Contacts and click **Import contacts** at the bottom of the rail.
2. Choose a contacts `.csv` or `.json` export.
3. Wait for the result reporting how many contacts were added, skipped, or failed.

Existing contacts and duplicate public keys are skipped rather than overwritten. Imported names do not replace the person's published profile name, which is fetched from Nostr.

Use a White Noise Linux export as the format to follow. CSV files need the exact header `name,npub,nickname,blocked`, with `true` or `false` in the blocked column. JSON files need an array of records containing exactly `name`, `npub`, `nickname` (strings), and `blocked` (a boolean). Each public key must be a valid `npub`.

If an import fails, correct the named record and import again. For a relay error, check [Linux settings](/docs/settings/linux) before retrying; already added contacts will be skipped.

## Remove or block someone

> Removing a contact changes your published contact list. It does not remove either of you from groups you already share.

On the contact page, choose **Remove contact** and confirm **Remove**.

Blocking is a separate local action. Choose **Block** and confirm to hide their messages and prevent direct messaging with them. Nothing is published by that block. **Unblock** reverses it. Blocking does not remove the person from a shared group or erase messages they already received; see [Privacy controls](/docs/using/privacy/linux).

## Related

- [Your profile](/docs/using/profiles/linux)
- [Groups](/docs/using/groups/linux)
- [Privacy controls](/docs/using/privacy/linux)
