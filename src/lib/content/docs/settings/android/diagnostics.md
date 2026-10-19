# Android diagnostics and local logs

White Noise for Android has two optional sharing settings, and both apply to every profile on the device. Uploads start only after you turn sharing on, and you can review, export or clear the diagnostic logs stored on the device at any time. See the [privacy policy](/privacy).

## Open the controls

1. Open **Settings > Privacy & Security**.
2. Tap **Diagnostics & Improvements**. The row summary shows On, Usage, Logs or Off.

## Share usage and telemetry

This setting shares how often features are used and how the app performs. The data includes a temporary session ID and an installation ID you can reset, and it leaves out account and group IDs.

## Share group diagnostic logs

When you turn this on, White Noise records group diagnostic logs for every profile on this device and uploads them to the White Noise audit collector, operated by the Internet Privacy Foundation.

> **Before you turn this on:** Logs already stored on this device may also be uploaded. Logs can include group and message IDs, relay addresses, timestamps, pseudonymous account references, an installation ID, your device model and the app version, with members referred to by hashed references. Message contents, profile names, group names and private keys are excluded.

1. Turn on **Share group diagnostic logs**.
2. Read the confirmation, then tap **Enable automatic sharing**, or tap **Cancel** to leave sharing off.

If the sharing details change, the app asks you to review them before sharing resumes.

## Retention and turning sharing off

White Noise servers delete group diagnostic logs after 30 days, telemetry after 90 days and product analytics after 180 days. When you turn sharing off, new recording and new uploads stop, though an upload already in progress may finish. Logs on this device remain until you clear them, and uploaded copies follow the retention periods above.

## Status messages

| Status | Meaning |
|---|---|
| Ready to share | Sharing is configured. |
| Permission needed | A permission is required first. |
| Not configured, Unavailable in this build | Sharing is disabled in this build. |
| Configuration rejected | The configuration was refused. |
| Couldn't load or save settings | Tap **Retry**. |

## Export stored logs

1. Under **Stored Diagnostic Logs**, tap **Export Diagnostic Logs**.
2. Read the warning that logs contain technical identifiers and activity details, then tap **Continue**.
3. Choose **Save to device** or **Share**.

The logs are packaged into one .zip file, which you should share only with someone you trust. If preparing or saving the file fails, the app shows an error and you can try again.

## Clear stored logs

1. Tap **Clear Diagnostic Logs**.
2. Confirm with **Clear Logs**.

This permanently deletes the diagnostic logs for every profile from this device. Your sharing settings stay as they are, and copies already uploaded remain on the servers.

## Developer diagnostics

In **Developer Tools > Diagnostics**, you can see Relay Health, runtime details and Events. **Send to self** sends a test ping to a chat.

**Performance logs** collect privacy-safe timing events on this device for a limited time, stopping after 30 minutes or when White Noise restarts. **Copy performance logs** copies the events from the current or most recent session, and that session is also included in your next export of stored logs.

## Report a problem

**Settings > Help > Report a bug** opens an empty public GitHub form. Everything you add there becomes public, so if you attach logs, export them first and remove anything you want to keep private. You can also use **Chat with support**. See [Report a problem](/docs/troubleshooting/report-problem).
