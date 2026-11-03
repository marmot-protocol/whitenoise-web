# Photos, files and voice messages

Attach files, record audio, and open received media in White Noise for Linux.

Text follows the [reviewed Linux source](/docs/compatibility#linux). Screenshots show `v2026.10.6-build.1` with synthetic offline data. Controls can differ; cross-client messaging and full recovery have not been verified.

## Send photos or files

1. Open the conversation and click the paperclip in the composer.
2. Choose one or more files in the file picker.
3. Review the staged attachments above the composer. Click an attachment's remove control if you chose the wrong file.
4. Press Enter to send. You can send attachments without adding text.

You can also paste a copied image or copied files into the composer with Ctrl+V. A supported clipboard image or file becomes a staged attachment instead of pasted text.

Chat attachments use Marmot's encrypted media path. Profile pictures are different: they are published publicly. See [Your profile](/docs/using/profiles/linux).

<figure><a href="/docs/linux/composer.svg"><img src="/docs/linux/composer.svg" alt="Message composer containing the fictional draft The squirrels borrowed the meeting agenda, with attachment and microphone controls." loading="lazy" width="692" height="107" /></a><figcaption class="type-small">A fictional draft in the real composer. The paperclip adds attachments; the microphone starts recording. Nothing was sent. Select the image to enlarge.</figcaption></figure>

## Record a voice message

The microphone button starts recording with your system's default input device. Unlike the mobile hold-to-record controls, Linux starts with a click.

1. Click the microphone in the composer.
2. Check the **Recording** timer and input-level meter while speaking.
3. Click **Send** or press Enter to stop and send the recording as a WAV attachment.
4. To discard it instead, click **Cancel** or press Escape.

**Send** sends the recording; it does not put a preview into your draft for review. If White Noise cannot open the microphone, check the input device and microphone access in your desktop settings, then try again.

## Play and preview attachments

Images can appear as albums, while video and audio have playback controls in the conversation. Open an attachment to use its preview. Supported previews include PDFs, archives, source files with syntax highlighting, and STL, OBJ, FBX, and GLB models.

PDF tiles and previews offer **Fullscreen**. It fills the app window, not the desktop. Use the page controls to move through the document; **Exit fullscreen** returns to the preview, and Escape closes it.

GLB previews are static scenes with orbit, zoom, and an inspector. Animation and some compressed or advanced model features are not supported, and the viewer does not fetch a model's external resources. A file opening without those features does not mean the original file lacks them.

An unsupported file type can still be saved. A preview is not a guarantee that a file is safe to run in another program.

## Save a file outside White Noise

> A saved attachment is a readable copy outside the chat's encrypted storage. Other programs and anyone with access to the destination may be able to read it. Disappearing messages and later deletion do not remove that copy.

Click **Save** in an attachment preview, or right-click the message and choose **Save** followed by the attachment's filename. Choose a destination in the save dialog.

The chat header's **Files** control opens the conversation's file browser. Group settings also shows shared media. These views help find an attachment without manually scanning the conversation.

## Transcribe audio or dictate a draft

1. Open Settings and find **Speech to text**.
2. Turn it on and select a **Transcription model** to download. Wait for it to become available.
3. On an audio attachment, use **Transcribe** to turn speech into text locally.

M4A attachments use the audio card and its Transcribe control, including files another client labels as `video/mp4`. Model downloads require a network connection; the speech recognition itself runs on your device.

When speech to text is enabled, **Dictate** appears in the composer. It produces draft text rather than sending a voice recording. Review that text before sending it. To send your voice itself, use the microphone recording steps above.

## Image links and privacy

> Automatic link previews contact outside hosts, which can see your IP address. A link to an image is not the same as an encrypted attachment sent through the chat.

Direct JPG, PNG, GIF, and WebP links can show inline image cards. To stop new automatic preview requests, turn off **Link previews** in **Settings > Advanced > Privacy**. This does not stop chat attachment downloads.

Map links can also show location cards. The first card asks before loading map data; review that prompt before allowing outside requests. Receiving a map card does not make the Linux app share your own location. See [Privacy controls](/docs/using/privacy/linux).

## If a file does not arrive or open

Click a failed image or media retry banner to try the download again. For an outgoing **failed · tap to retry** row, click it to retry sending. Check the connection and read the status message before sending another copy.

For repeated download problems, see [Linux diagnostics and local logs](/docs/settings/linux/diagnostics). Avoid including private attachments or decrypted message text in a public bug report.

## Related

- [Messages](/docs/using/messages/linux)
- [Privacy controls](/docs/using/privacy/linux)
- [Linux settings](/docs/settings/linux)
