# Notifications

Allow alerts, choose how White Noise checks for messages, and decide what appears in notifications. Open **Settings**, then **Notifications**.

## Allow notifications

If iOS hasn't asked yet, the screen shows **Allow notifications to use these options** with an **Allow Notifications** button.

1. Tap **Allow Notifications**.
2. Accept the iOS permission prompt.

Expected result: the notification choices become available.

If the screen shows **Notifications are off**, tap **Open Settings**, turn on notifications for White Noise in iOS Settings, then return.

<figure><a href="/docs/ios/notifications.svg"><img src="/docs/ios/notifications.svg" alt="Notifications are off, with Open Settings and dimmed Notification Preview choices." loading="lazy" width="1206" height="2340" /></a><figcaption class="type-small">When iOS notifications are off, use Open Settings to allow them. Preview choices stay unavailable until local notifications can be delivered. This image does not demonstrate push delivery. Select the image to enlarge.</figcaption></figure>

## Choose how messages arrive

Under **Current Profile**, each profile has its own choices:

- **Local Notifications** shows message notifications on this iPhone. With Native Push off, delivery may wait until White Noise is active.
- **Native Push** uses a generic wake-up signal so White Noise can check for new messages in the background and helps notifications arrive when White Noise is closed. Message details stay on this iPhone.

To be alerted while White Noise is in the background, turn on both toggles. If **Native Push setup is incomplete** appears, tap **Try Again** under it.

## Mentions in muted chats

With **Mentions in Muted Chats** on, mentions of you still notify in muted chats, including chats set to **Nothing**. The setting applies to all profiles on this device. Turn it off to keep muted chats fully silent.

## Lock Screen previews

Under **All Profiles on This Device**, **Notification Preview** applies to every profile. Choose **Sender and Message**, **Sender Only** or **Generic**; the example line shows what each mode displays. Pick a smaller preview if other people can see your phone.

Preview and mention choices stay unavailable until **Local Notifications** is on and iOS notifications are allowed.

## Developer tools

After you turn on **Developer Tools** in **Settings > Developer Tools**, the notification screen also shows a **Developer** section. It reports APNS token and push server status, with **Request APNS Token**, **Refresh APNS Token** and **Sync Native Registration** for diagnosing push registration. Ordinary notification setup needs only the choices above.

## If notifications are late or missing

1. Confirm notifications are allowed for White Noise in iOS Settings.
2. Check that **Local Notifications** is on for the current profile.
3. Turn on **Native Push** so checks can run in the background.
4. Open White Noise. Messages that were waiting arrive while the app is active.

## Related

- [Media and downloads on iOS](/docs/using/media/ios)
- [Notifications on Android](/docs/using/notifications/android)
