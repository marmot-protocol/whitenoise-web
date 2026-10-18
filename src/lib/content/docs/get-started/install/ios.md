# Install and set up White Noise

White Noise for iOS runs on iOS 18 or later. After you install it, you can create a new profile or sign in with a Nostr identity you already have.

## Get the app

1. Go to [Download](/download) and follow the iOS option listed on that page.
2. Open White Noise and review the Terms of Service and Acceptable Use Policy linked from the welcome screen. Using the app means you agree to them.

**Expected result:** the welcome screen shows **Sign Up** and **Sign In**.

## Create a new profile

**Before you sign up, know that your profile is public.** Anyone can see your name and photo along with your bio, including people using other apps on the same network. Photos may stay online even after you remove them, so consider a nickname and an image you are comfortable sharing.

1. Tap **Sign Up** on the welcome screen to open the profile form.
2. Enter the **Name** people will see. You can also add **About** text and a photo.
3. Save to publish your profile, or tap **Not Now** to add details later in Settings.

If saving your sign-up progress fails, free up storage on your device and try again. When restoring an unfinished sign-up fails, tap **Retry** or **Discard draft**. Discarding removes only the saved sign-up form from this device and keeps your accounts, along with anything already uploaded or published.

## Sign in with an existing identity

For an encrypted backup, first follow [Encrypted backup import](/docs/settings/identity#encrypted-backup-import).

Your public key (npub) is the address you share with people, and your private key (nsec) signs you in. Keep your nsec private, because anyone who has it can act as you.

**Before you approve any relay list:** saving one publishes it as your public relay list. It replaces the previous list and removes any entries you leave out, so check every address before you approve it.

1. Tap **Sign In** on the welcome screen to open the private key form.
2. Enter your **Private Key**, which starts with nsec. You can also scan a QR code that contains it.
3. Tap **Sign In** and wait while White Noise prepares your account.

White Noise may then show setup proposals, such as relay settings or secure messaging preparation. Review each proposal as it appears and correct anything that looks wrong before you continue.

Inbox relays receive invitations to new chats and groups. If White Noise can't find a usable relay list, you can use the defaults shown. You can also search a relay you have used with this profile; searching only reads from that relay. When setup is ready, tap **Open Chats**.

Setup can stop at a few points:

- **Secure messaging or device setup stops:** tap **Try Again**.
- **Your key is rejected:** check it for missing or extra characters.
- **A scanned code holds something other than a private key:** tap **Try Again** and scan the right code.

## Recover an unfinished setup

White Noise offers two recovery options. Both repair setup only, and earlier conversation history stays unrestored with either one.

- **Recover Identity** appears when an earlier sign-in stopped before setup finished. It removes that incomplete setup from this device and then tries the sign-in again. A KeyPackage from the failed attempt may stay published on relays.
- **Recover Setup** appears when a saved profile shows “This profile's saved sign-in setup needs recovery”. It signs the profile out and replaces the unreadable setup checkpoint, so you must sign in again yourself with the private key. Earlier relay publications stay in place.

For more help, see [Access problems](/docs/troubleshooting/access), or follow [Report a problem](/docs/troubleshooting/report-problem) if the issue continues. Once setup is complete, continue to [Send a message](/docs/get-started/first-message/ios).
