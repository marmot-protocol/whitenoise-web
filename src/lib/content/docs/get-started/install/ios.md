# Install and set up White Noise

White Noise for iOS runs on iOS 18 or later. After you install it, you can create a new profile or sign in with a Nostr identity you already have.

## Get the app

1. Go to [Download](/download) and follow the iOS option listed on that page.
2. Open White Noise. The first time, the welcome screen links the Terms of Service and Acceptable Use Policy. Review them, then tap **Agree & Continue** to accept them.

**Expected result:** the welcome screen shows **Sign Up** and **Sign In**.

<figure><a href="/docs/ios/welcome.svg"><img src="/docs/ios/welcome.svg" alt="Welcome to White Noise with Agree & Continue." loading="lazy" width="1206" height="1620" /></a><figcaption class="type-small">Review the linked terms before choosing Agree & Continue. Select the image to enlarge.</figcaption></figure>

## Create a new profile

**Before you sign up, know that your profile is public.** Anyone can see your name and photo along with your bio, including people using other apps on the same network. Photos may stay online even after you remove them, so consider a nickname and an image you are comfortable sharing.

1. Tap **Sign Up** on the welcome screen to open the profile form.
2. Keep the suggested **Name** or enter your own. **About** text and a photo are optional.
3. Tap **Sign Up** to create your profile.

<figure><a href="/docs/ios/sign-up.svg"><img src="/docs/ios/sign-up.svg" alt="Sign Up form with the fictional name Emerald Flounder and blank About field." loading="lazy" width="1206" height="2340" /></a><figcaption class="type-small">A nickname is enough. The Sign Up button requires a name. Your name, photo and bio are public. Select the image to enlarge.</figcaption></figure>

If saving your sign-up progress fails, free up storage on your device and try again. When restoring an unfinished sign-up fails, tap **Retry** or **Discard draft**. Discarding removes only the saved sign-up form from this device and keeps your accounts, along with anything already uploaded or published.

## Sign in with an existing identity

For an encrypted backup, first follow [Encrypted backup import](/docs/settings/identity#encrypted-backup-import).

Your public key (npub) is the address you share with people, and your private key (nsec) signs you in. Keep your nsec private, because anyone who has it can act as you.

**Before you approve any relay list:** saving one publishes it as your public relay list. It replaces the previous list and removes any entries you leave out, so check every address before you approve it.

1. Tap **Sign In** on the welcome screen to open the private key form.
2. Enter your **Private Key**, which starts with nsec. You can also scan a QR code that contains it.
3. Tap **Sign In** and wait while White Noise prepares your account.

<figure><a href="/docs/ios/sign-in.svg"><img src="/docs/ios/sign-in.svg" alt="Sign In sheet with an empty private-key field and QR scan control." loading="lazy" width="1158" height="780" /></a><figcaption class="type-small">The private-key field is blank in this example. Never share a screenshot containing your private key. Select the image to enlarge.</figcaption></figure>

After you sign in, a **Getting ready to chat** checklist checks your profile, people you follow, relays, message inbox, chats on this device and secure messaging. Tap **Review and Continue** for any item that needs your attention, and check each proposal before you approve it. When everything is ready, tap **Open Chats**.

**Your profile.** If White Noise finds no profile, or one it needs you to review, it shows a **Your profile** form. Tap **Save** to publish it, or **Not Now** to skip. If the step fails, tap **Try Again**. When it can't continue, **Cancel Sign-In** appears here too.

**Relays.** Inbox relays receive invitations to new chats and groups. If White Noise can't find a usable relay list, it offers default relays or a search of a relay you have used with this profile. Searching only reads from that relay. Choosing **Replace With Default Relays** asks you to confirm first. If you already have an inbox relay list, the defaults replace it and relays you leave out stop receiving your invitations. You review the change before anything is published.

**Chats on this device.** Each sign-in has its own chat history. Chats in another app or on another device stay there and don't appear here. When someone starts a new chat with you, it may arrive in either app. Tap **Continue** to accept this, or **Continue anyway** if White Noise found messaging keys from another app or couldn't check.

Setup can stop at a few points:

- **A step needs another look:** tap **Check Again** to repeat the checks, or **Review and Continue** to fix the item shown.
- **Setup stops with an error:** tap **Try Again**.
- **This sign-in can't continue:** tap **Cancel Sign-In**, then confirm. You sign in again afterwards; changes already published are kept.
- **Your key is rejected:** check it for missing or extra characters.
- **A scanned code holds something other than a private key:** tap **Try Again** and scan the right code.

## Recover an unfinished setup

White Noise offers two recovery options. Both repair setup only, and earlier conversation history stays unrestored with either one.

- **Recover Identity** appears when an earlier sign-in stopped before setup finished. It removes that incomplete setup from this device and then tries the sign-in again. A KeyPackage from the failed attempt may stay published on relays.
- **Recover Setup** appears on the **Sign-In Recovery** screen when White Noise can't restore a profile's saved sign-in setup. It signs the profile out and resets its setup, so you must sign in again yourself with the private key. Nothing on relays changes. The same screen has **Remove Profile from This Device**, which deletes the saved key and local chats for that profile.

After you sign out normally, the welcome flow lists the profile under **Ready to sign in**. Its **Sign In** button still asks for the profile's private key. Tap **Sign In with Another Account** to use a different key.

For more help, see [Access problems](/docs/troubleshooting/access), or follow [Report a problem](/docs/troubleshooting/report-problem) if the issue continues. Once setup is complete, continue to [Send a message](/docs/get-started/first-message/ios).
