# iOS diagnostics and local logs

White Noise for iOS has two optional sharing settings, and both apply to every profile on the device. Uploads start only after you turn sharing on. You can also choose how long logs stay on your iPhone, clear them, and export audit logs. See the [privacy policy](/privacy).

Until a choice is recorded, a one-time **Help Improve White Noise** sheet appears on the chat list with the same two settings. Both start off, and tapping **Done** without changing them doesn't opt you in. You can change them later.

## Open the controls

Open **Settings > Privacy & Security** and, under **Diagnostics**, tap **Diagnostics & Improvements**. The row shows a summary of your current choice.

<figure><a href="/docs/ios/diagnostics.svg"><img src="/docs/ios/diagnostics.svg" alt="Diagnostics & Improvements with both sharing options off, Keep Logs For set to 30 days and no stored diagnostic logs." loading="lazy" width="1206" height="1600" /></a><figcaption class="type-small">Both sharing choices are off. Keep Logs For is shown at 30 days; no diagnostic logs are stored in this example. Select the image to enlarge.</figcaption></figure>

## What each setting shares

| Setting | What is uploaded |
|---|---|
| Share usage and telemetry | Feature usage counts and app performance metrics. Usage data uses temporary session identifiers, and telemetry uses an installation identifier you can reset. Account and group identifiers are left out. |
| Share group diagnostic logs | Technical logs that can include group and message identifiers, timestamps and membership changes, with members referred to by hashed references. Message contents, profile names, group names and private keys are excluded. |

> **Before you turn on log sharing:** Logs already stored on this device may also be uploaded.

White Noise servers delete group diagnostic logs after 30 days, telemetry after 90 days and product analytics after 180 days. Turning sharing off stops new recording and new automatic uploads, though a batch already uploading may finish. Stored logs on this device follow **Keep Logs For**, or you can clear them sooner. Uploaded data follows the server retention periods above.

## Clear stored logs

Under **Stored Diagnostic Logs**, **Keep Logs For** sets how long logs stay on this iPhone: 1, 3, 7, 14 or 30 days. Logs older than that are deleted from this device, including ones not uploaded yet. A longer period applies at once. For a shorter one, White Noise asks **Delete older logs?**; tap **Delete Older Logs** to confirm.

To remove everything:

1. Under **Stored Diagnostic Logs**, tap **Clear Diagnostic Logs**. The button appears only when logs are stored.
2. Confirm with **Clear Logs**.

This permanently removes recorded diagnostic activity for all profiles from this iPhone. Copies already uploaded remain on the servers, and recording and automatic uploads continue while sharing is on.

## Export audit logs

You can export audit logs from Developer Tools.

1. Open **Settings > Developer Tools** and turn on **Developer Tools**.
2. Under **Diagnostic Logs**, tap **Export Latest Audit Logs**, then choose **Last 24 Hours**, **Last 48 Hours** or **Last 72 Hours**. White Noise bundles the logs changed in that time into one .zip file that you save with Files.
3. To export one log instead, tap its row and choose **Share** or **Save to Files**.

Exports keep the complete original JSONL, including event details, and logs can include group and message identifiers. Check an export before you send it, and share it only with someone you trust. When the log list is empty, the screen says There are no logs.

## Other tools

With **Developer Tools** on, **Chat Debug Mode** adds technical conversation details, and **Key Packages** and **Startup Diagnostics** show technical information for testing. **Audit Delivery** shows the state of this profile's log uploads. If delivery pauses, **Resume Delivery** tries again. **Usage and diagnostics** has a **Refresh** action that reloads your sharing choice.

## Report a problem

Use **Chat with support** in Settings to ask a question or report a problem. Describe what happened before you send any logs. See [Report a problem](/docs/troubleshooting/report-problem).
