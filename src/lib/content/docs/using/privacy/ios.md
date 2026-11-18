# Privacy and security settings

Most of these controls are in Settings under **Privacy & Security**.

## App security

- **Hide Sensitive Content** hides app content in the app switcher and while iOS detects screen recording or sharing. Regular screenshots are still possible.
- **Require Face ID**, **Require Touch ID**, **Require Optic ID** or **Require passcode** locks White Noise when you leave it. The toggle names the method your iPhone has, and your iPhone passcode is the fallback. Set an iPhone passcode first, or the toggle is unavailable.
- **Auto-Lock** appears once the lock is on and sets when White Noise locks. See [iOS settings](/docs/settings/ios#privacy--security) for the available delays.

<figure><a href="/docs/ios/privacy.svg"><img src="/docs/ios/privacy.svg" alt="Privacy & Security with Hide Sensitive Content and Require Face ID off, plus diagnostics and Erase App Data." loading="lazy" width="1206" height="2160" /></a><figcaption class="type-small">Neither Hide Sensitive Content nor the app lock is enabled in this example. Select the image to enlarge.</figcaption></figure>

## Diagnostics

Open **Diagnostics & Improvements** to choose what you share, set how long logs are kept, or clear diagnostic logs on this device. Until a choice is recorded, a **Help Improve White Noise** sheet appears on the chat list. Both choices start off, and tapping **Done** without changing them doesn't opt you in. See [iOS diagnostics and local logs](/docs/settings/ios/diagnostics).

## Blocked users

Blocking hides a person’s messages and stops you sending to them in direct chats. Existing history is kept.

1. Open **Blocked Users** from **Privacy & Security**.
2. Swipe the person's row and tap **Unblock**.
3. Confirm **Unblock this user?** with **Unblock User**.

Expected result: their messages appear again and you can send to them.

## Notifications and link previews

- In **Notifications**, **Native Push** uses a generic wake-up signal to check for new messages. Message details stay on this iPhone. With only **Local Notifications**, delivery may wait until White Noise is active.
- In **Appearance**, link previews show a link’s title and image. Loading a preview reveals your IP address to the linked website and to the site hosting its image.

## Your profile is public

Anyone can see your name, photo, and bio, including people using other apps on the same network. A nickname works fine. Photos may stay online after you remove them.

## Erase app data

> **Warning:** Erase App Data signs out every profile and permanently removes all White Noise data from this iPhone, including chats, media, drafts, keys, and settings. This is irreversible. Back up each profile’s private key first and confirm each backup is saved. The current sign-in screens require a decrypted private key, shown as `nsec` in these guides. Before erasing, follow [Encrypted backup import](/docs/settings/identity#encrypted-backup-import) and confirm a trusted local decryption method produces each profile’s `nsec` while its existing profile stays signed in. Keep each encrypted backup and its passphrase available.

1. In **Privacy & Security**, under **Device Data**, tap **Erase App Data**.
2. Enter the three words shown, exactly as written.
3. Confirm.

If you see “Erasure didn’t finish. Some data may remain,” keep that message on screen and note its details. If the screen offers a retry or recovery action, use that action. Otherwise, contact support with the details before taking other steps, such as deleting the app.

## Related

- [Back up and recover your account](/docs/using/recovery/ios)
