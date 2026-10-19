# Messages

Write messages, find local history, and save conversation transcripts in White Noise for Linux.

These instructions describe the reviewed Linux source. Packaged releases can differ; the steps have not been checked in a running app.

## Write and send

Open a conversation, type in the composer, and press Enter to send. Shift+Enter inserts a new line. Markdown formatting is supported, including links and `$$` math blocks. Use **Read more** to expand a collapsed long message.

For a new conversation, see [Send a message](/docs/get-started/first-message/linux). For attachments and recording, see [Photos, files and voice messages](/docs/using/media/linux).

When a transport failure queues a message, it can retry after the connection returns. A queued or sending row is not a delivery confirmation. If a row shows **failed · tap to retry**, click it to retry. The delete control on a pending row lets you discard it when available.

## Reply and react

Right-click a message to open its actions.

- Choose **Reply** to quote it in your next message. Check the reply banner above the composer, then send. **Cancel** removes the reply target.
- Choose **Reply in thread** to open a separate thread for the message.
- Pick an emoji from the reaction strip, or open the emoji picker for another reaction.
- Choose **Copy text** to put the message body on the clipboard.

The menu depends on the message. Custom emoji, attachments, and your own messages can offer different actions.

## Edit a message

1. Right-click a message you sent and choose **Edit message**.
2. Change its text in the composer. The **Editing message** banner confirms that you are editing rather than writing a new message.
3. Press Enter to submit, or use **Cancel** to leave the message unchanged.

Click the message's edited marker to open **Edit history**. It shows the **Original**, intermediate edits when available, and **Current** text. Editing is not a way to erase information someone already read or saved.

## Forward a message

> Forwarding sends a copy into another conversation. Check the destination and whether the original conversation's participants would expect that content to be shared there.

1. Right-click the message and choose **Forward**.
2. In **Forward to**, use **Filter chats** if needed.
3. Click the destination chat to forward the message.

Attachments are downloaded and prepared in the background. A status strip names the destination and stays visible if you change chats. If forwarding fails, open the destination chat and retry its failed row.

## Search messages

For the open conversation, click **Search** in its header, type into **Search messages**, and press Enter. Escape returns to the normal timeline.

To search across conversations:

1. Press Ctrl+K to open **Search all chats**.
2. Enter literal message text. This is a text search, not a regular-expression search.
3. Optionally filter by chat, attachment type, or sender. You can type a sender name or hex public key, or use **Known senders**.
4. For dates, enter `YYYY-MM-DD` in **Start day (UTC)** and **End day (UTC, inclusive)**. These dates use UTC, not your desktop's local timezone.
5. Click a result to open the conversation at that message. Use **More results** for another page of matches.

All-chats search includes archived chats but only searches locally stored history. It cannot find messages that have not synced to this device. Opening an older result loads history as needed; opening an archived result does not unarchive it.

Closing search keeps its query and results for the current account. Switching accounts clears them. **Search again** retries a failed search.

## Export a conversation

> Exported HTML and Markdown files are not encrypted by White Noise. They expose conversation text and identifiers, and HTML can embed images. Anyone who can open the file can read it. Choose the destination and recipients carefully.

1. Open the conversation and load the portion of history you need.
2. Open its **Group settings** from the conversation name or header Settings control.
3. Under **Export chat**, choose **HTML** or **Markdown**. You can also right-click the chat-list row and choose **Export as HTML** or **Export as Markdown**.
4. Wait for preparation, then choose a destination in the save dialog.

Exports cover the loaded chat window, not necessarily the whole history. HTML prepares embedded images in the background and shows image progress. An image that cannot be obtained is recorded as an unavailable-image note. Leaving the chat or switching accounts discards an unfinished export.

A transcript is for reading, not restoring account keys or group encryption state. See [Back up and recover your account](/docs/using/recovery/linux) for the separate recovery controls and their limits.

## Delete a message

> Deletion cannot remove screenshots, exports, forwarded messages, or copies retained by another client. Do not use it as a promise that every copy is gone.

Right-click a message and choose **Delete for me** to hide it on this device while leaving it for everyone else. On your own messages, **Delete for everyone** is also available. Review the confirmation before deleting; deletion for everyone cannot be undone through this control.

## Related

- [Photos, files and voice messages](/docs/using/media/linux)
- [Groups](/docs/using/groups/linux)
- [Privacy controls](/docs/using/privacy/linux)
