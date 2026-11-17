# Messages

Start chats and send text, custom emoji, stickers, voice messages and polls.

## Start a chat

1. In the chat list, tap **New Message** to open the new chat screen.
2. Search for a person or tap **Scan QR Code**, and note that an address that has been confirmed shows **Verified**.
3. Choose the person, and if you already have chats with them, either pick one to continue or tap **Start new conversation**.

A new chat shows **Send the first message to get started.** In a group that shows **Only you are here**, tap **Add members**. If someone isn't on White Noise yet, tap **Invite to White Noise**, then **Share Invite**.

## Write and send

Tap the message field to type, then tap **Send**. Return adds a new line. To reply, choose **Reply** from the message's actions; a reply preview appears above the composer, and **Cancel reply** removes it. For photos, video, GIFs, and files, see [Media and downloads](/docs/using/media/ios).

### Hold to dictate

On **iOS 26 or later**, you can turn speech into a text message without opening the keyboard. This is different from sending a recording of your voice.

> **Release sends:** letting go sends the recognized text, including any text, attachments or reply already in the composer. To review before sending, tap to type instead. Slide left during a hold to cancel.

1. With the keyboard hidden, touch and hold the field labelled **Tap to type, hold to dictate**. Allow microphone access if asked.
2. Speak while holding. Slide up to lock dictation if you want to keep listening without holding the screen.
3. Let go to send, or, after locking, tap **Send**. **Cancel dictation** discards the dictation. A hold listens for up to two minutes.

<figure><a href="/docs/ios/composer.svg"><img src="/docs/ios/composer.svg" alt="iOS message composer with plus, Tap to type, hold to dictate, and the voice-message waveform." loading="lazy" width="1206" height="220" /></a><figcaption class="type-small">Tap the message field to type, or hold it with the keyboard hidden to dictate. Releasing a completed dictation sends it. This image shows the idle control, not a transcription. Select the image to enlarge.</figcaption></figure>

If recognition stops early, you are editing a message, or the composer changes during the hold, the recognized text stays in the draft for you to check and send or save yourself. **Dictation stopped early** asks you to check the message before sending.

In **Settings > Appearance > Dictation**, **Hold to Dictate** is on by default. **Speech Model** shows whether the model is ready; use **Download Speech Model** if offered. iOS may need to download a model from Apple first. Wait for it to finish, then try again. Not every language is supported; the feature is not offered on older iOS versions.

Speech is transcribed on this device. Dictation audio isn't saved or sent; the resulting text is sent as your message. A speech-model download still contacts Apple. If microphone access is denied, allow it for White Noise in iOS Settings.

<figure><a href="/docs/ios/dictation.svg"><img src="/docs/ios/dictation.svg" alt="Dictation settings with Hold to Dictate on, Speech Model Ready and instructions to release to send, slide up to lock or left to cancel." loading="lazy" width="1206" height="780" /></a><figcaption class="type-small">Appearance includes Hold to Dictate and Speech Model on iOS 26 or later. Ready is the simulator’s reported model status, not a verified speech transcription. Select the image to enlarge.</figcaption></figure>

## Custom emoji

1. Tap **+** beside the composer, then **Custom Emoji**.
2. Choose an image under **Custom**, such as the built-in marmot or White Noise logo. It inserts a `:shortcode:` into your draft. You can also type the shortcode of an available emoji.
3. Add text if you like, then tap **Send**. Custom emoji appear inline with text; a message containing just one custom emoji displays it larger.

<figure><a href="/docs/ios/custom-emoji.svg"><img src="/docs/ios/custom-emoji.svg" alt="Custom emoji picker with built-in marmots, White Noise logo, search and the Emoji Sets button." loading="lazy" width="1206" height="550" /></a><figcaption class="type-small">Custom Emoji opens this picker. Choosing an emoji inserts its shortcode into your draft; the grid button beside search opens Emoji Sets. Select the image to enlarge.</figcaption></figure>

The picker includes built-in emoji, installed emoji sets and usable custom emoji already received in this chat. An unknown shortcode can remain plain text. Send custom emoji separately from photos and files: the app keeps the draft and asks you to separate them if you combine them.

### Add an emoji set

> Emoji sets are public and aren't reviewed by White Noise. Opening or installing a set downloads images from servers chosen by its author. Those servers can see your IP address. Installing a set doesn't change your public emoji list.

Open **Emoji Sets** beside the picker's search field. Browse **Discover**, search for a set or paste an author's `npub`. **Add by Link** accepts an emoji set's `naddr` or address; tap **Open Link**. **From Your Emoji List** shows suggestions when available.

Open a set and tap **Install**. Its emoji become available in the picker after installation. You can **Cancel** an installation, **Update** a set when an update is offered, or **Remove** it. A failed image preview has **Try Again**.

## Stickers

Tap **+**, then **Stickers**, and choose an installed pack. **Tapping a sticker sends it immediately**, rather than adding it to a draft. Stickers aren't offered while editing a message.

Default packs can arrive after the first sync with White Noise relays. If the picker shows **No Stickers**, tap **Browse Sticker Packs**; otherwise use **Sticker Packs** in the picker toolbar. Browse **Discover**, search, or use **Add by Link > Open Link** with a Sonar sticker pack link or `naddr`. Open a pack and tap **Add**. Swipe an installed pack to remove it, or use **Remove** in its details.

> Stickers load from servers each pack's author chose. Those servers can see your IP address. Browsing names and counts doesn't load artwork, but opening a pack preview or loading a sticker does.

<figure><a href="/docs/ios/stickers.svg"><img src="/docs/ios/stickers.svg" alt="iOS Stickers picker showing the Marmot pack, Cancel, add-pack button and image-server privacy notice." loading="lazy" width="1206" height="1350" /></a><figcaption class="type-small">The installed Marmot sticker pack. Tapping a sticker sends immediately; the plus opens Sticker Packs. No sticker was sent for this capture. Select the image to enlarge.</figcaption></figure>

Received stickers may show **Tap to load sticker** or **Tap to retry**. Automatic loading depends on the pack being installed and your photo auto-download settings; see [Media and downloads](/docs/using/media/ios#data-usage-settings).

## Record a voice message

> **Release sends:** a voice message sends recorded audio, not dictated text. Letting go sends the recording with anything already in the composer.

1. Touch and hold **Voice message**, the waveform button at the right of the composer. Recording starts after a short hold; a quick tap doesn't start recording.
2. Let go to send. For a longer recording, slide up to lock it, then tap **Send**, the upward arrow.
3. Slide left to cancel during a hold, or tap **Cancel recording** after locking.

If you are editing or the composer changes during recording, the recording stays in the draft instead. Review it before sending, or tap **Remove attachment** to discard it.

## Message actions

Touch and hold a message to open its actions. The list depends on the message and its state as well as your role, so you only see actions that apply. They can include:

- **React**: tap one of your quick reactions, or tap **More reactions** to choose another emoji, including available custom emoji. In **Customize reactions**, tap a reaction to replace it; these six appear first in message actions. **Reset** restores the defaults, and **Done** saves your choices.
- **Reply** adds a reply preview to the composer, and **Copy** copies the message text.
- **Edit**: change the text and tap **Save**, after which the message keeps an **Edit history** with the **Original** and **Current** versions.
- **Forward**: pick a chat to send a copy to, and tap **Retry** if chats don't load.
- **Message info**: shows **Status**, **Sent**, **Received**, and **Expires**, along with the message's **Reactions**.

With several messages selected, **Delete selected messages** and **Copy selected messages** are available, and **Forward selected messages** sends them to another chat.

Tapping a link in a message opens a sheet of options, so check where the link goes before you open it; **Cancel** closes the sheet.

## Create a poll

> **Before you send or vote:** votes aren't anonymous, and every group member can see who voted for each option.

1. Open **New Poll** from the composer to start a poll in this chat.
2. Enter a **Question**, then tap **Add Option** once for each choice you want to offer.
3. Set **Allow Multiple Answers** and **Ends** to suit the poll, then tap **Send**.

**Votes** lists who chose each option. It shows **No votes yet** until someone votes, and **Poll unavailable** if the poll was deleted.

## Report a message

Choose **Report** in the message actions. Pick a **Reason** and add an **Explanation (optional)**, then review the destination notice before tapping **Report Message**.

> In a group, members can read your report and explanation. When **Send to White Noise** is available, it starts on: turn it off if you want to leave out the team copy. A team report includes your report and the sender's public key; the message itself is not shared with the team, and the sender is not notified.

The available destinations depend on the conversation and your role. In a direct chat, a report can go to the White Noise team without a group copy. Read the notice on the form. **Saved and waiting to send.** or **Saved; delivery confirmation is pending.** means delivery is unfinished; follow the screen's instructions before submitting again.

Group admins review group reports in [Moderation](/docs/using/groups/ios#review-group-reports). A message's **Reports** section shows the reports you are allowed to read; **Retry** reloads it and **Load more** shows more entries.

## Delete a message

> **Before you delete:** removing a message for everyone can't erase copies others have already saved or forwarded, or captured. **Older clients may retain this message.** Expiring messages have the same limits.

The delete prompt asks whether to remove the message from this device only or for everyone. Some messages can only be removed from this device, while group admins can remove a message for everyone.

## When things go wrong

- **Not delivered. Tap for options.**: tap the message, then **Try Again**; **Delete** discards the unsent message.
- Draft conflict: the saved draft changed while you were typing, and your text is kept. Choose **Keep my draft**, or tap **Use saved draft** to replace your text.
- **You blocked this user. Unblock them to send messages.**: tap **Unblock**, or tap **View Profile**.
- **Couldn't load conversation**: tap **Retry**.
- **Couldn't load reactions** or **Couldn't load votes**: tap **Retry** to load them again.

## Related

- [Media and downloads](/docs/using/media/ios)
- [Groups](/docs/using/groups/ios)
- [Messages on Android](/docs/using/messages/android)
