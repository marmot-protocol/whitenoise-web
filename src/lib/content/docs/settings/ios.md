# iOS settings

## Settings layout

The top of Settings shows your profile and up to three other signed-in profiles, with a +number badge when you have more. **Switch Profile** and **Add Profile** are here too. The bottom of the screen holds **Sign Out** and **Delete Profile**, and the app version (White Noise · version) appears there as well.

## Profiles

- **Switch Profile** lets you choose a signed-in profile or add a new one.
- **Profile** shows your Name and About text, plus a Verified Nostr Address (an address like name@example.com). Tap **Edit** to change them, and tap **Retry** if saving fails. See [Profiles](/docs/using/profiles/ios).
- **Share & Connect** has a **Mode** picker, **Share Profile URL**, **Share Profile Picture**, **Share Profile**, and a QR code that someone can scan to connect with you. The share card says: On White Noise? Message me here.
- **Profile Keys** shows your public key in Hex and npub formats along with the key status. Export options are here too. See [Identity and keys](/docs/settings/identity).
- **Relays** has Account Relays and Inbox Relays. See [Relays](/docs/settings/relays).

## Appearance

| Control | Effect |
|---|---|
| Theme | Follow your device appearance, or always use a light or dark theme. |
| Language | **System** follows your device language. Other choices update White Noise immediately. |
| Return Key Sends | When on, the Return key sends your message. When off, it starts a new line. |
| Show Link Previews | Shows the title and image of links in chats. Loading a preview reveals your IP address to the linked website and to the site that hosts its image. |

## Notifications

| Control | Effect |
|---|---|
| Local Notifications | Creates message notifications on this iPhone. Without Native Push, they may arrive only when White Noise is active. |
| Native Push | Uses a generic wake-up signal to check for new messages in the background. Message details stay on this iPhone. |
| Mentions in Muted Chats | Mentions of you still notify in muted chats, including chats set to Nothing. Applies to all profiles on this device. |
| Notification Preview | Controls how much message information a notification shows. See the modes below. |

| Preview mode | Example for a group chat message |
|---|---|
| Sender and Message | Captain Acorn: Bring emergency snacks. |
| Sender Only | Captain Acorn sent a message |
| Generic | General wording that leaves out the sender and the message |

If notifications are off, tap **Allow Notifications**. You can also tap **Open Settings** and turn them on in iOS Settings. A Developer section has APNS token and registration actions for testing. See [Notifications](/docs/using/notifications/ios).

## Data usage

- **Auto-Download**: Media that isn't downloaded automatically shows a download button. **Reset Auto-Download Settings** restores the defaults.
- **Remote Media**: When on, opening a conversation can tell GIPHY your IP address and which GIF was requested. When off, received GIFs load only when you tap them.
- **Sent Media > Photos and Videos**: Sets the quality of photos and videos you send. Higher quality uses more data. Identifying photo metadata, such as location, is always removed before sending.
- **Download Storage**: Sets storage limits for this profile. Downloads pause when storage is full and existing files are kept. You can remove individual downloads from Message info.

See [Media](/docs/using/media/ios).

## Privacy & security

| Control | Effect |
|---|---|
| Hide Screen in App Switcher | Hides app content in the app switcher, and while iOS detects screen recording or sharing. Regular screenshots still work. |
| App lock toggle (Face ID/Touch ID/passcode) | Locks White Noise when you leave. The toggle label names the method available on this iPhone, and your iPhone passcode works when biometric authentication is unavailable. The toggle needs an iPhone passcode; until you set one, it is disabled and the screen says Set an iPhone passcode to lock White Noise. |
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

- **Chat with support** starts a chat with White Noise Support. If it fails, tap **Try Again**.
- **Donate** supports the Internet Privacy Foundation (IPF). You can give **One time** or **Monthly**. The screen can show recent billing activity, all Payments, invoices and **Manage monthly donation**, and it tells you when Apple Pay is unavailable. If donation history access is no longer available on this device, a new donation won't restore earlier payments.

## Developer tools

**Developer Tools** are for development and testing only. The **Developer Tools** toggle turns on technical tools for this profile.

- **App Review Demo** creates Johnny Appleseed as a second profile and publishes real profile, KeyPackage, group and message events through your relays. **Clear Saved Demo Setup** leaves profiles and already published events in place.
- **Debug Mode** adds technical details to conversations. **Debug Events** and **Startup Diagnostics** are listed here too.
- **Key Packages** and **Quarantined Groups** are also here. In Quarantined Groups, **Retry Recovery** keeps your history and validation in place, and your group membership stays the same.
- **Diagnostic Logs** lets you export audit logs. See [iOS diagnostics](/docs/settings/ios/diagnostics).

## Sign out and delete profile

Both actions are at the bottom of the main Settings screen and apply to the active profile.

- **Sign Out** keeps this profile and its local data on this device. If it fails, the screen says Couldn't sign out. Try again.
- **Delete Profile** permanently removes this profile from this device. That covers its local message database and MLS group state, together with its key material on this device. Its outstanding key packages on relays are removed too. Enter the profile name exactly to enable the button. If it fails, the screen says Couldn't wipe profile.

Read [Identity and keys](/docs/settings/identity) before you use either one.

## How iOS differs from Android

| Topic | iOS | Android |
|---|---|---|
| Theme | Device, light or dark | Adds AMOLED, action color and chat bubble colors |
| Enter key | Return Key Sends toggle | Enter key behavior choice, and Shift+Enter always adds a new line |
| Swipe actions, folders, read aloud, dictation, translate, custom emoji | Absent from iOS Settings | Separate settings screens |
| Screen privacy | Hide Screen in App Switcher, and screenshots still work | Screen security blocks screenshots |
| App lock | Face ID/Touch ID/passcode, with Auto-Lock delay | Device screen lock, with Auto-lock |
| Removing data | Sign Out and Delete Profile in Settings, Erase App Data in Privacy & Security | Sign Out and Sign Out & Wipe in Profile Keys |
| Bug reports | Chat with support | Report a bug (public GitHub) and Chat with support |
| Donations | In-app one-time or monthly | Opens a donation page |
