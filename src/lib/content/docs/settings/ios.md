# iOS settings

## Settings layout

The top of Settings shows your profile and up to three other signed-in profiles, with a +number badge when you have more. **Switch Profile** and **Add Profile** are here too. The bottom of the screen holds **Delete Profile** and **Sign Out**, and the app version (White Noise · version) appears there as well.

<figure><a href="/docs/ios/settings.svg"><img src="/docs/ios/settings.svg" alt="iOS Settings showing the synthetic profile and the main settings destinations." loading="lazy" width="1206" height="2240" /></a><figcaption class="type-small">Your profile and Add Profile appear above the main settings. This example has one signed-in profile. Select the image to enlarge.</figcaption></figure>

## Profiles

- **Switch Profile** lets you choose a signed-in profile or add a new one.
- **Profile** shows your Name and About text, plus a Verified Nostr Address (an address like name@example.com). Tap **Edit** to change them, then **Done** to save. Tap **Retry** if saving fails. See [Profiles](/docs/using/profiles/ios).
- Tap your **profile card at the top of Settings** to open **Share & Connect**. **Share** shows your QR code and sharing actions; **Connect** scans someone else's profile QR code. This isn't a separate Settings row.
- **Profile Keys** shows your public `npub` and private-key backup controls: **Back Up With a Password** or **Back Up Without a Password**. Showing or copying the private key requires confirmation. See [Identity and keys](/docs/settings/identity).
- **Relays** has Account Relays and Inbox Relays. See [Relays](/docs/settings/relays).

## Appearance

| Control | Effect |
|---|---|
| Theme | Follow your device appearance, or always use a light or dark theme. |
| Density | Choose **Compact**, **Standard** or **Comfortable** spacing. |
| Language | **System** follows your device language. Other choices update White Noise immediately. |
| Show Link Previews | Shows the title and image of links in chats. Loading a preview reveals your IP address to the linked website and to the site that hosts its image. |
| Hold to Dictate | On iOS 26 or later, hold the message field with the keyboard hidden and release to send recognized text. On by default; the **Dictation** section also shows **Speech Model** status and **Download Speech Model** when needed. |

Return adds a new line; there is no **Return Key Sends** toggle in this build. Dictation transcribes speech on this device without saving or sending its audio, but iOS may download a speech model from Apple. See [Hold to dictate](/docs/using/messages/ios#hold-to-dictate) for cancellation, locking, supported languages and release-to-send behavior.

<figure><a href="/docs/ios/appearance.svg"><img src="/docs/ios/appearance.svg" alt="Appearance settings with System theme, Standard density, Language and Show Link Previews off." loading="lazy" width="1206" height="2280" /></a><figcaption class="type-small">Choose theme, density and language here. Link previews are off; the Dictation section follows below. Select the image to enlarge.</figcaption></figure>

<figure><a href="/docs/ios/dictation.svg"><img src="/docs/ios/dictation.svg" alt="Dictation settings with Hold to Dictate on, Speech Model Ready and instructions to release to send, slide up to lock or left to cancel." loading="lazy" width="1206" height="780" /></a><figcaption class="type-small">Appearance includes Hold to Dictate and Speech Model on iOS 26 or later. Ready is the simulator’s reported model status, not a verified speech transcription. Select the image to enlarge.</figcaption></figure>

## Notifications

| Control | Effect |
|---|---|
| Local Notifications | Under **Current Profile**, creates message notifications on this iPhone for this profile. Without Native Push, they may arrive only when White Noise is active. |
| Native Push | Under **Current Profile**, uses a generic wake-up signal to check for new messages in the background. Message details stay on this iPhone. |
| Mentions in Muted Chats | Mentions of you still notify in muted chats, including chats set to Nothing. Applies to all profiles on this device. |
| Notification Preview | Under **All Profiles on This Device**, controls how much message information a notification shows. See the modes below. |

| Preview mode | Example for a group chat message |
|---|---|
| Sender and Message | Captain Acorn: Bring emergency snacks. |
| Sender Only | Captain Acorn sent a message |
| Generic | General wording that leaves out the sender and the message |

If notifications are off, tap **Allow Notifications** or **Open Settings**, as offered, and allow them in iOS Settings. Preview and mention controls need Local Notifications enabled and authorized. **Try Again** under Native Push retries incomplete push setup. A Developer section appears with Developer Tools enabled. See [Notifications](/docs/using/notifications/ios).

## Data usage

- **Auto-Download**: Set Photos, Audio, Videos and Files to **Never**, **Wi-Fi Only** or **Wi-Fi and Cellular**. Wi-Fi Only excludes personal hotspots and Low Data Mode. **Reset Auto-Download Settings** appears after changing the defaults.
- **Automatically Load Remote GIFs**: When on, opening a conversation can tell GIPHY your IP address and which GIF was requested. When off, received GIFs load only when you tap them.
- **Sent Media Quality**: Choose **Standard** or **High** for **Photos and Voice Notes**. Identifying photo metadata is removed at both levels. Videos are sent unchanged; check them for identifying details yourself.

The reviewed build no longer offers the older **Download Storage** settings screen.

## Manage storage

**Manage Storage** shows what this profile keeps on this device under **Storage Used**. Other profiles are counted separately.

- **Keep Media**: Keep attachments **Forever**, or for **1 Year**, **6 Months** or **30 Days**. A shorter period removes older attachments now and as they age.
- **Cache**: **Clear Cache** removes downloaded profile and group pictures. They download again when you need them.
- **Free Up Space**: **Largest Attachments** lists attachments by size, and **Remove Older Attachments** removes attachments older than the age you choose. Open a chat under **Chats** to tap **Remove All Attachments** or remove older ones from that chat only. Swipe left on an attachment to remove it.

Removed attachments stay in their messages, and you can download them again while they're still available.

See [Media](/docs/using/media/ios).

## Privacy & security

| Control | Effect |
|---|---|
| Hide Sensitive Content | Hides app content in the app switcher, and while iOS detects screen recording or sharing. Regular screenshots still work. |
| Require Face ID / Touch ID / Optic ID / passcode | Locks White Noise when you leave. The toggle label names the available method, and your device passcode works when biometric authentication is unavailable. Set a device passcode first. |
| Auto-Lock | Appears while the lock is on. Choose immediately, after 1 minute, after 5 minutes or after 15 minutes. |
| Diagnostics & Improvements | Shows a summary of your sharing choice and opens the diagnostics controls. See [iOS diagnostics](/docs/settings/ios/diagnostics). |
| Blocked Users | Lists the people you have blocked. See below. |
| Erase App Data | Signs out every profile and removes all White Noise data from this iPhone. |
| Privacy Policy | Opens the White Noise privacy policy. |

> **Warning:** Erase App Data is permanent. It removes every profile and all local chats, media, drafts, keys and settings from this iPhone. To continue, you must enter three confirmation words exactly. Back up each profile’s private key first. Before erasing, follow [Encrypted backup import](/docs/settings/identity#encrypted-backup-import) and confirm that you can recover each key. If erasure stops partway, note the error. Use a retry or recovery action only if the app offers one; otherwise contact support before deleting the app or trying again.

**Blocked Users**: Blocking hides the person's messages and stops you sending to them in direct chats, and existing history is kept. If you unblock someone, their messages appear again and you can send to them. When you block someone from their profile, **Block and Report** also notifies the White Noise team. See [Privacy](/docs/using/privacy/ios).

## AI agents

Your agent runs on your own machine or server as a separate Marmot account, and you chat with it here like any contact. The screen has a **Connectors** list and **Manual Setup**. **Agent connector documentation** is here too. Each prompt includes your npub, which is your public key, and your private key stays out of every prompt. The agent must explain the connector and ask for your approval before it installs anything. Use only an agent you run and trust.

## Support and donate

- **Chat with support** opens your chat with White Noise Support. If it fails, tap **Try Again**.
- **Donate** supports the Internet Privacy Foundation (IPF). You can give **One time** or **Monthly**. The screen can show recent billing activity, all Payments, invoices and **Manage monthly donation**, and it tells you when Apple Pay is unavailable. If donation history access is no longer available on this device, a new donation won't restore earlier payments.

## Developer tools

**Developer Tools** are for development and testing only. The **Developer Tools** toggle turns on technical tools for this profile.

- **App Review Demo** creates Johnny Appleseed as a second profile and publishes real profile, KeyPackage, group and message events through your relays. **Clear Saved Demo Setup** leaves profiles and already published events in place.
- **Debug Mode** adds technical details to conversations. **Debug Events** and **Startup Diagnostics** are listed here too.
- **Key Packages** and **Quarantined Groups** are also here. In Quarantined Groups, **Retry Recovery** keeps your history and validation in place, and your group membership stays the same.
- **Diagnostic Logs** lets you export audit logs. See [iOS diagnostics](/docs/settings/ios/diagnostics).

## Sign out and delete profile

Both actions are at the bottom of the main Settings screen and apply to the active profile.

- **Sign Out** opens a sheet. With **Wipe Local Data** off, your profile and chats stay on this device; tap **Sign Out**. With it on, this profile's chats, media and secret key are erased from this device, and you leave your groups. Type the profile name under **Profile name**, then tap **Sign Out and Delete Data**. If signing out fails, the sheet says Couldn't sign out. Try again.
- **Delete Profile** signs you out and permanently removes this profile's chats, media, drafts, secret key and local settings from this device. You leave your groups, and your other profiles are unaffected. Type the profile name under **Profile name** to enable the button. If it fails, the screen says Couldn't wipe profile.

Copies of messages and profile information held by other people or independent relays may remain. Cleanup can take up to a minute: keep White Noise open until it finishes. Check **Cleanup Details** if some cleanup couldn't finish. If other profiles are signed in, choose one to continue; otherwise use **Sign In**. A saved profile under **Ready to sign in** still needs its private key.

Read [Identity and keys](/docs/settings/identity) before you use either one.

## How iOS differs from Android

| Topic | iOS | Android |
|---|---|---|
| Theme | Device, light or dark | Adds AMOLED, action color and chat bubble colors |
| Enter key | Return adds a new line | Enter key behavior choice, and Shift+Enter always adds a new line |
| Dictation | Hold the message field on iOS 26+; switch and model status in Appearance | Separate dictation settings |
| Custom emoji and stickers | Composer **+** menu, with emoji sets and sticker packs | Separate controls and settings |
| Folders, read aloud and translate | No corresponding iOS settings | Separate settings screens |
| Screen privacy | Hide Sensitive Content, and screenshots still work | Screen security blocks screenshots |
| App lock | Face ID/Touch ID/passcode, with Auto-Lock delay | Device screen lock, with Auto-lock |
| Removing data | Sign Out (with optional Wipe Local Data) and Delete Profile in Settings, Erase App Data in Privacy & Security | Sign Out and Sign Out & Wipe in Profile Keys |
| Bug reports | Chat with support | Report a bug (public GitHub) and Chat with support |
| Donations | In-app one-time or monthly | Opens a donation page |
