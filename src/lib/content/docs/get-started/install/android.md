# Install and set up White Noise

White Noise for Android runs on Android 11 or later. After you install it, you can create a new profile or sign in with a Nostr identity you already have.

## Get the app

1. On Android, we recommend installing White Noise from [Zapstore](https://zapstore.dev/apps/dev.ipf.whitenoise.android).
2. On the White Noise listing, choose **Download** and follow Zapstore’s installation instructions. If Zapstore cannot offer a build, use another download option.
3. If you'd rather use Google Play or download from GitHub, see [Download](/download) for those options.
4. Open White Noise. You should see the welcome screen.

**Expected result:** the welcome screen shows **Sign Up** and **Sign In**. If the app reports a connection problem, connect to Wi-Fi or mobile data and tap **Retry**.

<figure><a href="/docs/android/android-download.svg"><img src="/docs/android/android-download.svg" alt="Android download options with Zapstore first, followed by Google Play and GitHub Release." loading="lazy" width="684" height="666" /></a><figcaption class="type-small">Choose Zapstore, the recommended Android download option. Select the image to enlarge.</figcaption></figure>

<figure><a href="/docs/android/zapstore-download.svg"><img src="/docs/android/zapstore-download.svg" alt="White Noise app icon, title and Download button on Zapstore." loading="lazy" width="732" height="228" /></a><figcaption class="type-small">The White Noise listing on Zapstore has a Download control beside the app name. Select the image to enlarge.</figcaption></figure>

<figure><a href="/docs/android/welcome.svg"><img src="/docs/android/welcome.svg" alt="Welcome screen with Sign In and Sign Up choices." loading="lazy" width="360" height="160" /></a><figcaption class="type-small">Choose Sign Up for a new profile or Sign In for an existing identity. Select the image to enlarge.</figcaption></figure>

## Create a new profile

**Before you sign up, know that your profile is public.** Everyone on the network can see the details you publish, including your photo, so consider using a nickname in place of your real name.

1. Tap **Sign Up** on the welcome screen to open the profile form.
2. Enter the **Name** people will see. If you like, add **About** text or tap **Add Photo** to choose an image.
3. Continue, then wait while White Noise shows **Creating Identity** and publishes your new profile.

<figure><a href="/docs/android/sign-up.svg"><img src="/docs/android/sign-up.svg" alt="Sign Up form with Add Photo and an empty Name field." loading="lazy" width="360" height="365" /></a><figcaption class="type-small">Add a profile photo if you want one, then enter the name people will see. Select the image to enlarge.</figcaption></figure>

If identity creation stops, check your connection and try again. If your identity was created but the photo upload or profile publishing stopped partway, tap **Retry**, which keeps the same identity. You can also keep the identity as it is and finish editing your profile later.

## Sign in with an existing identity

For an encrypted backup, first follow [Encrypted backup import](/docs/settings/identity#encrypted-backup-import).

A Nostr identity has two keys: your public key (npub) is the address you share with people, and your private key (nsec) signs you in. Keep your nsec private, because anyone who has it can act as you.

1. Tap **Sign In** on the welcome screen to open the private key form.
2. Paste or type your nsec into the field. To scan it instead, tap **Scan QR Code** and allow camera access.
3. Tap **Sign in** and wait for White Noise to finish setting up your account.

<figure><a href="/docs/android/sign-in.svg"><img src="/docs/android/sign-in.svg" alt="Sign in form with an empty private-key field and QR scanner button." loading="lazy" width="360" height="235" /></a><figcaption class="type-small">The private-key field accepts your nsec. The QR button opens the scanner. Select the image to enlarge.</figcaption></figure>

To use the Amber signer app, tap **Sign in with Amber**, then approve the identity request in Amber and sign the identity proof it shows next. If Amber reports that sign-in was cancelled, start again from the welcome screen.

If White Noise says you entered a public key, replace the npub with your nsec. If it says account setup is still finishing or stopped partway, tap sign in again to resume.

## Finish account setup

If **Account setup** appears, review the checklist. It checks your profile, follow list, read and write relays, inbox relays, this device and messaging keys. A row marked **Needs attention** opens the explanation and the choices available for that step. Review any proposed change before approving it.

<figure><a href="/docs/android/setup-checklist.svg"><img src="/docs/android/setup-checklist.svg" alt="Account setup checklist with a profile needing attention and later checks waiting." loading="lazy" width="360" height="650" /></a><figcaption class="type-small">Account setup checks your profile, relays and messaging keys. Open a row that needs attention to review the next step. Select the image to enlarge.</figcaption></figure>

If a relay step needs attention, inspect the proposed read and write lists. Recommendations keep existing relay entries, while a custom list removes entries you leave out. Changes can affect your other Nostr apps, so review the lists before choosing **Save changes**. Use **Finish later** if you want to leave the decision for another time.

<figure><a href="/docs/android/setup-relays.svg"><img src="/docs/android/setup-relays.svg" alt="Account-setup relay proposal with read and write lists and a warning about other Nostr apps." loading="lazy" width="360" height="500" /></a><figcaption class="type-small">Review the proposed read and write relay lists before saving changes. The displayed relay addresses are examples. Select the image to enlarge.</figcaption></figure>

When all required checks show **Ready**, tap **Open Chats**. **Finish later** saves the unfinished setup so you can return to it; it does not make a waiting step ready.

<figure><a href="/docs/android/setup-ready.svg"><img src="/docs/android/setup-ready.svg" alt="Account setup checklist with all six checks marked Ready." loading="lazy" width="360" height="550" /></a><figcaption class="type-small">When every required check is Ready, choose Open Chats to continue. Select the image to enlarge.</figcaption></figure>

## Recover an unfinished setup

White Noise offers two recovery options, and neither one restores earlier conversation history.

- **Recover** appears when an earlier sign-in stopped partway. It clears the unfinished setup and then retries the sign-in for you. Invitation keys that were already published may stay on relays.
- **Recover setup** appears on a saved profile whose setup needs repair. It signs that profile out and resets its setup checkpoint, so you must sign in again yourself with the profile's private key. Earlier relay publications stay in place, and this step publishes nothing new.

If sign-in stops because of an unexpected account state, White Noise leaves your account unchanged. See [Access problems](/docs/troubleshooting/access) for more help.
