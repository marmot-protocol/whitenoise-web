# Your profile

Your profile holds your name, verified Nostr address, and a short bio. People see these details when they find you or chat with you, so treat them as public.

## Edit your details

1. Open **Profile** and tap **Edit**.
2. Update **Name**, **Verified Nostr Address** (an address like name@example.com), and **About**.
3. Tap **Done** to save your changes, or tap **Cancel** to discard them.

Expected result: the Profile screen shows your updated details. If White Noise reports **Couldn't save your profile**, check your connection and tap **Retry**. If it reports **Couldn't load your profile**, tap **Retry** to load it again.

## Share your profile

1. Open **Share & Connect**.
2. Use the **Mode** picker to switch views. Your QR code appears with the caption **Scan to connect.**
3. Tap **Share Profile**, then choose **Share Profile URL** or **Share Profile Picture**.

A progress indicator appears while White Noise prepares the profile picture. If sharing fails, White Noise asks you to try again.

## Switch or add profiles

Open **Settings** and find the profile management row. What it shows depends on how many other profiles are signed in on this device:

- With only your current profile, the row reads **Add Profile**. Tap it to add another profile.
- With one other profile, the row shows that profile's picture and name. Tap it to open **Switch Profile**, where you can switch or add a profile.
- With several other profiles, the row reads **Switch Profile**. Tap it, then choose a signed-in profile or tap **Add Profile**.

## Sign out

1. In **Settings**, tap **Sign Out**.
2. Leave **Wipe Local Data** off and tap **Sign Out**.

Expected result: you are signed out, and this profile and its chats stay on this device. If other profiles are signed in, choose one to continue or tap **Add Profile**.

To also erase this profile's chats, media and secret key from this device, turn on **Wipe Local Data**, type the profile name under **Profile name**, and tap **Sign Out and Delete Data**. You leave your groups and need new invitations to rejoin.

## Delete a profile

> **Warning:** **Delete Profile** signs you out and permanently removes this profile's chats, media, drafts, secret key, and local settings from this device. Signing in again with a saved secret key keeps the same Nostr identity, but deleted chats and media won't be restored, and you'll need new invitations to rejoin groups. Messages and profile information held by other people or independent relays may remain.

1. Back up your private key and confirm the backup is saved. For an encrypted backup, follow [Encrypted backup import](/docs/settings/identity#encrypted-backup-import) and confirm you can recover your key before deleting anything.
2. Open **Settings** and tap **Delete Profile**.
3. Read the summary of what is deleted.
4. Under **Profile name**, type the profile name exactly as shown.
5. Tap **Delete Profile**.

Expected result: the profile is gone from this device.

To clear the whole app, **Privacy & Security** has **Erase App Data**. It signs out every profile and permanently removes all White Noise data from this iPhone.

For more on keys, signing out, and wiping data, see [Identity settings](/docs/settings/identity).

## Related

- [Identity settings](/docs/settings/identity)
- [Contacts on iOS](/docs/using/contacts/ios)
- [Your profile on Android](/docs/using/profiles/android)
