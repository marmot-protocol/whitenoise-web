# Notifications

Allow alerts, choose how White Noise checks for messages, and decide what appears on the Lock Screen. Open **Settings**, then **Notifications**.

## Allow notifications

1. In the **Status** section, tap **Allow Notifications**.
2. Accept the iOS permission prompt.

Expected result: the delivery options become available.

If the screen shows **Notifications are off**, tap **Open Settings**, turn on notifications for White Noise in iOS Settings, then return. If **Try Again** appears under **Status**, tap it to check once more.

## Choose how messages arrive

- **Local Notifications** creates message notifications on this iPhone. With Native Push off, delivery may wait until White Noise is active.
- **Native Push** uses a generic wake-up signal so White Noise can check for new messages in the background. Message details stay on this iPhone.

To be alerted while White Noise is in the background, turn on both toggles.

## Mentions in muted chats

With **Mentions in Muted Chats** on, mentions of you still notify in muted chats, including chats set to **Nothing**. The setting applies to all profiles on this device. Turn it off to keep muted chats fully silent.

## Lock Screen previews

Under **Preview**, use **Notification Preview** to choose how much message information appears on the Lock Screen. Pick a smaller preview if other people can see your phone.

## Developer tools

Some builds show a **Developer** section with **Request APNS Token**, **Refresh APNS Token** and **Sync Native Registration**. These tools are for diagnosing push registration. Ordinary notification setup needs only the toggles above.

## If notifications are late or missing

1. Confirm notifications are allowed for White Noise in iOS Settings.
2. Check that **Local Notifications** is on.
3. Turn on **Native Push** so checks can run in the background.
4. Open White Noise. Messages that were waiting arrive while the app is active.

## Related

- [Media and downloads on iOS](/docs/using/media/ios)
- [Notifications on Android](/docs/using/notifications/android)
