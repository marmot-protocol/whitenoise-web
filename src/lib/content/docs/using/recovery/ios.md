# Back up and recover your account

Your private key (nsec) is how you get back into this profile. Back it up before you sign out, delete the profile, or move to another iPhone.

## What a key backup restores

A private key backup restores your identity: your profile and the ability to sign in as yourself. Message history and group encryption (MLS) state live on the device where they were created and stay out of the backup. If you move to a new iPhone with only your key, your identity moves with you and your conversations remain on the old device. To rejoin groups from a new device, ask members to invite you again.

## Encrypted backup import

White Noise exports identity backups as NIP-49 `ncryptsec1` strings protected by your passphrase. The current sign-in screens require a decrypted private key, shown as `nsec` in these guides. Before you delete an identity or its app data, keep the existing profile signed in on its device and keep the `ncryptsec1` backup and its passphrase available. Ask the runtime or app maintainers for a trusted method to decrypt NIP-49 locally, and confirm it produces your `nsec` before removing anything. Keep the key and passphrase on devices you trust; avoid online converters and web uploads.

## Back up your private key

Open **Settings > Profile Keys**. Under **Back Up Your Private Key**, choose how to back up.

**With a password (recommended)**

1. Tap **Back Up With a Password**.
2. In the **Encrypted Private Key** sheet, enter a **Password** and **Confirm Password**, then tap **Export**.
3. The share sheet opens with your encrypted backup as ncryptsec1 text. Pick a safe destination, such as a password manager, and finish saving it there.

Expected result: the ncryptsec1 text is stored in the place you picked. Tapping **Export** only hands the text to the share sheet, so open the destination and check the backup arrived. White Noise never stores the password. Use a long, unique one, and keep it safe and separate from the backup, because you need both to restore.

**Without a password**

> **Warning:** **Back Up Without a Password** reveals your private key in plaintext and permanently marks it as handled insecurely. Anyone with the exported key can use your profile. Use the password backup unless you need the raw nsec.

Tap **Back Up Without a Password**, then confirm **Export Without a Password?** with **Export Key**. The share sheet opens with your nsec.

Profile Keys shows your **Public Key** as an npub. Share it so people can find and connect with you. The **Private Key** row has **Show private key** and **Copy Private Key**. Each asks you to confirm first, and each reveals the plaintext key and marks it as handled insecurely, so use them only when you need to. If a profile can't export its private key, the screen says **This account cannot export a private key.**

## Sign in with your key

1. On the **Sign In** screen, paste your key into **Private Key**. It starts with nsec.
2. Tap **Sign In**.

If the app reports the key as invalid, check that you copied the whole key, then try again.

### If setup was interrupted

Two recovery actions can appear here, and they work differently:

- **Recover Identity** covers a legacy case: an earlier sign-in that stopped before setup finished. It removes that incomplete local setup and retries. A KeyPackage from the failed attempt may remain published on relays.
- **Recover Setup** appears on the **Sign-In Recovery** screen when White Noise can’t restore a profile’s saved sign-in setup. It signs the profile out and resets its setup. Data on relays stays the same. Then tap **Sign In** for that profile and enter its private key to start a fresh setup.

The **Sign-In Recovery** screen also has **Remove Profile from This Device**. It deletes that profile’s saved key and local chats. Published data stays on relays, so keep your private key to sign in again later.

## Sign out

In Settings, tap **Sign Out**. Leave **Wipe Local Data** off and tap **Sign Out** to keep this profile and its chats on this device. Afterward, the profile appears under **Ready to sign in**, and its **Sign In** button still asks for the private key. Tap **Sign In with Another Account** to use a different key. Turning on **Wipe Local Data** erases this profile’s chats and media, plus its secret key, from this device instead, so back up your key first. Wiping can take up to a minute; keep White Noise open. If **Cleanup Details** appears, some cleanup failed and it shows what may remain.

## Delete a profile

> **Warning:** **Delete Profile** signs you out and permanently removes this profile’s data from this device. Signing in again with a saved secret key keeps the same Nostr identity only: deleted chats and media won’t be restored, and you’ll need new invitations to rejoin groups. Messages and profile information held by other people or independent relays may remain.

1. Back up your private key and confirm the backup is saved.
2. In Settings, tap **Delete Profile**.
3. Review the summary of what is deleted.
4. Under **Profile name**, type the profile name exactly, then tap **Delete Profile**. This can take up to a minute, so keep White Noise open.

Expected result: the profile is signed out and its local data is removed from this iPhone. If **Cleanup Details** appears, some cleanup failed and it shows what may remain.

To remove every profile and all White Noise data at once, use **Erase App Data**, described in Privacy and security settings.

## Related

- [Privacy and security settings](/docs/using/privacy/ios)
