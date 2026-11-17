# Your profile

Your profile holds your name, verified Nostr address, and a short bio. People see these details when they find you or chat with you, so treat them as public.

<figure><a href="/docs/ios/profile.svg"><img src="/docs/ios/profile.svg" alt="Profile for Emerald Flounder with Name, blank Verified Nostr Address and blank About." loading="lazy" width="1206" height="2100" /></a><figcaption class="type-small">The Profile screen shows your public details. This example uses a fictional name. Select the image to enlarge.</figcaption></figure>

## Edit your details

1. Open **Profile** and tap **Edit**.
2. Update **Name**, **Verified Nostr Address** (an address like name@example.com), and **About**.
3. Tap **Done** to save your changes, or tap **Cancel** to discard them.

<figure><a href="/docs/ios/edit-profile.svg"><img src="/docs/ios/edit-profile.svg" alt="Editable Profile form with Cancel, Done, Add Photo and the public-profile notice." loading="lazy" width="1206" height="2340" /></a><figcaption class="type-small">Edit your public details, then choose Done to save or Cancel to discard. Select the image to enlarge.</figcaption></figure>

Expected result: the Profile screen shows your updated details. If White Noise reports **Couldn't save your profile**, check your connection and tap **Retry**. If it reports **Couldn't load your profile**, tap **Retry** to load it again.

## Share your profile

1. In **Settings**, tap the profile card at the top (your picture and name, with a QR icon) to open **Share & Connect**.
2. Use the **Mode** picker to switch between **Share** and **Connect**. In **Share**, your QR code appears with the caption **Scan to connect.**
3. Tap the **Share Profile** button at the top right, then choose **Share Profile URL** or **Share Profile Picture**.

<figure><a href="/docs/ios/share-profile.svg"><img src="/docs/ios/share-profile.svg" alt="Share tab with the synthetic profile’s public npub and Scan to connect QR code." loading="lazy" width="1206" height="2340" /></a><figcaption class="type-small">Show your public profile QR code to connect. The pictured identity is only an example. Select the image to enlarge.</figcaption></figure>

A progress indicator appears while White Noise prepares the profile picture. If sharing fails, White Noise asks you to try again.

## Switch or add profiles

Open **Settings**. The profile management row under the profile card depends on how many other profiles are signed in on this device:

- With only your current profile, the row reads **Add Profile**. Tap it to add another profile.
- With one other profile, the row shows that profile's picture and name. Tap it to open **Switch Profile**, where you can switch or add a profile.
- With several other profiles, the row reads **Switch Profile**. Tap it, then choose a signed-in profile or tap **Add Profile**.

## Sign out

1. In **Settings**, tap **Sign Out**.
2. Leave **Wipe Local Data** off and tap **Sign Out**.

Expected result: you are signed out, and this profile and its chats stay on this device. If other profiles are signed in, choose one to continue or tap **Add Profile**. When you later open **Sign In** on the welcome screen, this profile appears under **Ready to sign in**. Its **Sign In** button still requires the profile's private key. Tap **Sign In with Another Account** to use a different key.

To also erase this profile's chats, media and secret key from this device, turn on **Wipe Local Data**, type the profile name under **Profile name**, and tap **Sign Out and Delete Data**. You leave your groups and need new invitations to rejoin. Leaving your chats can take up to a minute, so keep White Noise open until it finishes. If some cleanup fails, **Cleanup Details** lists what was removed and what may remain.

## Delete a profile

> **Warning:** **Delete Profile** signs you out and permanently removes this profile's chats, media, drafts, secret key, and local settings from this device. Signing in again with a saved secret key keeps the same Nostr identity, but deleted chats and media won't be restored, and you'll need new invitations to rejoin groups. Messages and profile information held by other people or independent relays may remain.

1. Back up your private key and confirm the backup is saved. For an encrypted backup, follow [Encrypted backup import](/docs/settings/identity#encrypted-backup-import) and confirm you can recover your key before deleting anything.
2. Open **Settings** and tap **Delete Profile**.
3. Read the summary of what is deleted.
4. Under **Profile name**, type the profile name exactly as shown.
5. Tap **Delete Profile** and keep White Noise open. Leaving your chats can take up to a minute.

Expected result: the profile is gone from this device. If cleanup is incomplete, **Cleanup Details** shows what may remain.

To clear the whole app, **Privacy & Security** has **Erase App Data**. It signs out every profile and permanently removes all White Noise data from this iPhone.

For more on keys, signing out, and wiping data, see [Identity settings](/docs/settings/identity).

## Related

- [Identity settings](/docs/settings/identity)
- [Contacts on iOS](/docs/using/contacts/ios)
- [Your profile on Android](/docs/using/profiles/android)
