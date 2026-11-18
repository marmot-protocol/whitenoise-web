# Media and downloads

Send photos, videos, voice messages, GIFs and stickers, view what you receive, and control downloads and storage.

## Before you share

- Identifying photo metadata, such as location, is always removed before sending. Check videos and files for embedded details before you send them.
- GIF search sends your search and IP address to GIPHY. Opening a received GIF also contacts GIPHY.
- Sticker packs and emoji sets can load artwork from servers chosen by their authors. Those servers can see your IP address. See [Custom emoji](/docs/using/messages/ios#custom-emoji) and [Stickers](/docs/using/messages/ios#stickers).
- Sharing media to another app gives that app the content you choose.

## Take a photo or video

1. Open the camera from the message composer in the conversation where you want to share the capture.
2. Tap for a photo, or hold for video. Video includes sound when microphone access is allowed. Otherwise, tap **Videos record without sound** to open Settings and allow microphone access. **Switch Camera** changes cameras, and **Close Camera** leaves the camera.
3. The capture appears in your draft. Tap it to preview it, or tap **Remove attachment** to drop it. Then send.

If you see **Camera Access Is Off**, tap **Open Settings**, allow camera access for White Noise, and return.

## Add a GIF or other attachment

Tap **+** beside the composer and choose **Photos and Videos** or **Files**. In builds offering GIF search (**Powered by** GIPHY), the privacy notice above appears before you search. **Cancel** closes the search. These attachments wait in your draft until you send; tap **Remove attachment** to drop one. Videos and files must be smaller than 512 MiB each.

**Stickers** and **Custom Emoji** are in the same menu but behave differently: a sticker sends immediately when selected, while custom emoji insert a shortcode into your text draft. See [Messages](/docs/using/messages/ios#custom-emoji) for packs, sets and privacy notices. Custom emoji must be sent separately from photos and files.

## Record a voice message

**Letting go sends the recording**, together with anything already in the composer. This sends audio, unlike [hold to dictate](/docs/using/messages/ios#hold-to-dictate), which sends text.

1. Touch and hold **Voice message**, the waveform button, until recording starts; a quick tap leaves the recorder idle.
2. Release to send. For a longer recording, slide up to lock it, then tap **Send**, the upward arrow.
3. Slide left during a hold to cancel, or use **Cancel recording** after locking.

If you are editing or the composer changes during recording, the finished recording stays in your draft for review instead. **Remove attachment** discards that draft recording.

## View, play, and save media

- Tap media in a message to open it full screen. Use **Save**, **Go to Message**, or **More** for other actions.
- Videos and voice messages have a **Playback speed** control.
- For files, tap **Open attachment**.
- If media doesn't load, use its **Retry** action to try loading that item again.

To retry an unsent message, tap its delivery warning and choose **Try Again** from the options. Choose **Delete** to discard that unsent message instead.

## Browse shared media

Open the conversation details and, under **Shared in Chat**, choose **Photos & Videos**, **Links** or **Documents**. The **Shared Media** screen has **Media**, **Voice**, **Files** and **Links** views. Open an item to view or play it. Use **Refresh**, **Retry** after a loading error, or **Load more** when more items are available.

## Manage a single download

Open **Message info** for the message. Under **Downloads**:

- **Cancel download** stops a download in progress.
- **Download again** retries it.
- **Remove download** deletes the downloaded file from this device. It doesn't affect anyone else's copy.

If White Noise shows **Not enough storage**, free up space on this device, then tap the attachment to try again.

## Data Usage settings

Open **Settings**, then **Data Usage**.

- **Auto-Download**: choose **Never**, **Wi-Fi Only** or **Wi-Fi and Cellular** separately for **Photos**, **Audio**, **Videos** and **Files**. Wi-Fi Only excludes personal hotspots and Low Data Mode. Other media shows a download button. **Reset Auto-Download Settings** appears when your choices differ from the defaults.
- **Automatically Load Remote GIFs**: when on, opening a conversation can tell GIPHY your IP address and which GIF was requested. When off, received GIFs load only when you tap them.
- **Sent Media Quality**: choose **Standard** or **High** for **Photos and Voice Notes**. Identifying photo metadata is removed at both levels. Videos are sent unchanged, so check them for identifying details yourself.

<figure><a href="/docs/ios/data-usage.svg"><img src="/docs/ios/data-usage.svg" alt="Data Usage with Photos, Audio, Videos and Files auto-download choices, remote GIF loading off and Standard Sent Media Quality." loading="lazy" width="1206" height="1950" /></a><figcaption class="type-small">Current Data Usage controls: automatic downloads, remote GIF loading off and Sent Media Quality. The older Download Storage row is gone. Select the image to enlarge.</figcaption></figure>

## Download storage

The reviewed build no longer has a **Download Storage** screen. Earlier builds offered free-space reserve and automatic-download size limits here. If your app still shows this screen, change the limits and tap **Save**. For current download choices, use **Data Usage > Auto-Download**; to reclaim space, use **Manage Storage** below.

<figure><a href="/docs/ios/download-storage.svg"><img src="/docs/ios/download-storage.svg" alt="Older iOS build's Download Storage screen with free-space and automatic-download limits." loading="lazy" width="1206" height="1300" /></a><figcaption class="type-small">Earlier build 2026.11.10 (48) only: this screen was removed in the reviewed build. Select the image to enlarge.</figcaption></figure>

## Manage storage

Open **Settings**, then **Manage Storage**. **Storage Used** shows what this profile keeps on this device.

<figure><a href="/docs/ios/manage-storage.svg"><img src="/docs/ios/manage-storage.svg" alt="Manage Storage with no attachments, Keep Media set to Forever and empty cache controls." loading="lazy" width="1206" height="2340" /></a><figcaption class="type-small">Storage is counted per profile. This profile has no attachments; no removal action was used for the capture. Select the image to enlarge.</figcaption></figure>

- **Keep Media** sets how long to keep attachments: **Forever**, **1 Year**, **6 Months** or **30 Days**. A shorter period asks you to confirm, then removes older attachments now and as they age.
- **Clear Cache** removes downloaded profile and group pictures. They download again when you need them.
- **Largest Attachments** lists attachments by size. Swipe left on one to remove it.
- **Remove Older Attachments** removes attachments older than the age you choose, in every chat.
- Open a chat under **Chats** and tap **Remove All Attachments** to remove that chat's attachments.

Removed attachments stay in their messages. You can download them again while they're still available. If the screen shows an error, tap **Try Again**.

## Related

- [Messages](/docs/using/messages/ios)
- [Notifications on iOS](/docs/using/notifications/ios)
- [Media and downloads on Android](/docs/using/media/android)
