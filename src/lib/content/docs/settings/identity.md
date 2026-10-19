# Identity, keys and signing out

Your profile is identified by a key pair. Share your **public key** so people can find and connect with you. Anyone who has your **private key** can use your profile, and White Noise can't recover it for you.

The procedures below cover Android and iOS. On Linux, use [Back up and recover your account](/docs/using/recovery/linux) for vault passwords, identity keys and backup limits, and [Your profile](/docs/using/profiles/linux) for account removal. Do not use the phone backup procedure to recover a Linux vault.

> **Important:** Your private key restores your identity only. After a wipe, past groups, messages and media are gone from that device, even if you sign in again with the same key, and you need new invitations to rejoin groups. See Recovery for [Android](/docs/using/recovery/android) or [iOS](/docs/using/recovery/ios).

## Encrypted backup import

White Noise exports identity backups as NIP-49 `ncryptsec1` strings protected by your passphrase. The current sign-in screens require a decrypted private key, shown as `nsec` in these guides. Before you delete an identity or its app data, keep the existing profile signed in on its device and keep the `ncryptsec1` backup and its passphrase available. Ask the runtime or app maintainers for a trusted method to decrypt NIP-49 locally, and confirm it produces your `nsec` before removing anything. Keep the key and passphrase on devices you trust; avoid online converters and web uploads.

## Invitation keys

Invitation keys, also called key packages, are published to your relays so others can add you to groups. You need at least one published to receive new group invitations. On both platforms, **Developer Tools > Key Packages** has **Publish New Key Package**. On Android, **Republish** publishes the current key package again without replacing it, and **Delete key package** publishes a deletion event and clears that package from the local cache. See Groups for [Android](/docs/using/groups/android) or [iOS](/docs/using/groups/ios).

## Android: profile keys

Open **Settings > Profile Keys**. The header shows whether the profile uses **Local signing** or an **External signer**. It also shows whether the account session is running, along with the connection status.

- **Copy public key** copies your public key.
- **Show private key** and **Copy Private Key** reveal and copy your private key.
- If you signed in with Amber, Amber holds the private key, so manage backups in Amber.

### Export the private key

1. On the **Profile Keys** screen, tap **Export** to begin backing up the private key for this profile.
2. For an encrypted backup, choose **Export Encrypted Private Key** and enter a long, unique password twice. The app shows its strength, and you need this password to open the encrypted file.
3. Tap **View backup**, then copy or export it to a secure place. The backup hides after 30 seconds or when you leave the screen.

**Export Private Key** shares the raw key and exposes it to whichever app you choose. An encrypted backup or a trusted password manager is safer. If the export expires, return to Profile Keys and start again; no key data was written.

### Sign out

- **Stays on this device:** Your groups and message history are kept, and so are your drafts. The profile stays available on this device, so you can sign back in from the account picker.
- **What changes:** Notifications for this account stop and temporary app data is cleared.
- **Remove invitation keys from relays** (optional): Stops new group invitations while you are signed out.

If the app says some invitation keys may still be on relays, you are signed out but those keys may still be published.

### Sign out and wipe

> **Warning:** This permanently deletes this account's messages and group encryption data and removes its sign-in key from this device. Its published invitation keys are removed from relays as well. You can sign in again with the same key, but past groups, messages and media are gone from this device. Back up your private key first.

1. In **Profile Keys**, tap **Sign Out & Wipe** once your private key is safely backed up.
2. Type WIPE in the confirmation field, then tap **Wipe**.
3. The app leaves your groups and removes your invitation keys. It then wipes local data and reports how many groups were left and how many keys were removed.

If the result is **Local data wipe incomplete**, some data may remain on the device.

## iOS: profile keys

Open **Settings > Profile Keys**. Your public key is shown in Hex and npub formats. **Key Status** shows Online when this account's runtime is active and subscribed to its relays. That status describes the runtime only, so it says nothing about whether the key itself is accessible.

- **Export Encrypted Private Key** creates an ncryptsec1 backup protected by your passphrase. Marmot never stores the passphrase.
- **Export Private Key** asks you to confirm before it reveals the key in plaintext, and that key is then permanently marked as handled insecurely.

## iOS: sign out and delete profile

Both actions are at the bottom of the main Settings screen and apply to the active profile.

- **Sign Out** keeps this profile and its local data on this device.
- **Delete Profile** is the iOS counterpart of Android's Sign Out & Wipe. It permanently removes this profile's local message database and MLS group state, together with its key material on this device. Its outstanding key packages on relays are removed too. Enter the profile name exactly to confirm. If it fails, the screen says Couldn't wipe profile.

> **Warning:** If you sign back in with the same key, you keep your identity, but past groups, messages and media are gone from this device and you will need to be re-invited to any groups. Encrypted messages already delivered to other members, and copies kept by independent relays, stay where they are.

> **Warning:** Back up the private key of every profile and confirm a working local recovery method for each encrypted backup before erasing all app data.

**Erase App Data** in Privacy & Security removes every profile and all local data from the iPhone. See [iOS settings](/docs/settings/ios).
