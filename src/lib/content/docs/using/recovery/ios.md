# Back up and recover your account

Your private key (nsec) is how you get back into this profile. Back it up before you sign out, delete the profile, or move to another iPhone.

## What a key backup restores

A private key backup restores your identity: your profile and the ability to sign in as yourself. Message history and group encryption (MLS) state live on the device where they were created and stay out of the backup. If you move to a new iPhone with only your key, your identity moves with you and your conversations remain on the old device. To rejoin groups from a new device, ask members to invite you again.

## Encrypted backup import

White Noise exports identity backups as NIP-49 `ncryptsec1` strings protected by your passphrase. The current sign-in screens require a decrypted private key, shown as `nsec` in these guides. Before you delete an identity or its app data, keep the existing profile signed in on its device and keep the `ncryptsec1` backup and its passphrase available. Ask the runtime or app maintainers for a trusted method to decrypt NIP-49 locally, and confirm it produces your `nsec` before removing anything. Keep the key and passphrase on devices you trust; avoid online converters and web uploads.

## Back up your private key

1. Open Settings, then **Profile Keys**.
2. Under **Export**, tap **Export Encrypted Private Key**.
3. Enter a passphrase and tap **Export**.
4. The share sheet opens with your encrypted backup as ncryptsec1 text. Pick a safe destination, such as a password manager, and finish saving it there.

Expected result: the ncryptsec1 text is stored in the place you picked. Tapping **Export** only hands the text to the share sheet, so open the destination and check the backup arrived. Marmot never stores the passphrase. Keep it safe and separate from the backup, because you need both to restore.

> **Warning:** **Export Private Key** reveals your private key in plaintext and permanently marks it as handled insecurely. Use the encrypted export unless you need the raw nsec.

Profile Keys also shows your **Public Key** as Hex and npub. Share it so people can find and connect with you. Under **Key Status**, Online means this account’s runtime worker is active and subscribed to its relays; it reflects relay activity, separate from key access.

## Sign in with your key

1. On the **Sign In** screen, paste your key into **Private Key**. It starts with nsec.
2. Tap **Sign In**.

If the app reports the key as invalid, check that you copied the whole key, then try again.

### If setup was interrupted

Two recovery actions can appear here, and they work differently:

- **Recover Identity** covers a legacy case: an earlier sign-in that stopped before setup finished. It removes that incomplete local setup and retries. A KeyPackage from the failed attempt may remain published on relays.
- **Recover Setup** appears when a saved setup checkpoint can’t be read. It resets that checkpoint and returns you to signing in. Enter your key and tap **Sign In** again yourself to start a fresh setup.

## Sign out

In Settings, tap **Sign Out**. This profile and its local data stay on this device.

## Delete a profile

> **Warning:** **Delete Profile** permanently removes this profile from this device. Signing back in with the same key restores your identity only: past groups, messages, and media on this device are gone, and you’ll need to be re-invited to groups. Encrypted messages already delivered to other members, and copies kept by independent relays, are beyond White Noise’s reach to delete.

1. Back up your private key and confirm the backup is saved.
2. In Settings, tap **Delete Profile**.
3. Review **What gets destroyed**.
4. Under **Enter Profile Name**, type the profile name exactly, then confirm.

Expected result: the profile is signed out and its local data is removed from this iPhone.

To remove every profile and all White Noise data at once, use **Erase App Data**, described in Privacy and security settings.

## Related

- [Privacy and security settings](/docs/using/privacy/ios)
