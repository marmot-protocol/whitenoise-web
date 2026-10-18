# iOS diagnostics and local logs

White Noise for iOS has two optional sharing settings, and both apply to every profile on the device. Uploads start only after you turn sharing on, and you can export or clear the audit logs stored on your iPhone. See the [privacy policy](/privacy).

## Open the controls

Open **Settings > Privacy & Security** and, under **Diagnostics**, tap **Diagnostics & Improvements**. The row shows a summary of your current choice.

## What each setting shares

| Setting | What is uploaded |
|---|---|
| Share usage and telemetry | Feature usage counts and app performance metrics. Usage data uses temporary session identifiers, and telemetry uses an installation identifier you can reset. Account and group identifiers are left out. |
| Share group diagnostic logs | Technical identifiers, timestamps and membership changes, with members referred to by hashed references. Message contents, profile names, group names and private keys are excluded. |

> **Before you turn on log sharing:** Logs already stored on this device may also be uploaded.

White Noise servers delete group diagnostic logs after 30 days, telemetry after 90 days and product analytics after 180 days. Turning sharing off stops new recording and new automatic uploads, though a batch already uploading may finish. Data on this device remains until you clear it, and data on the servers follows the retention periods above.

## Clear stored logs

1. Under **Stored Diagnostic Logs**, tap **Clear Diagnostic Logs**.
2. Confirm with **Clear Logs**.

This permanently removes recorded diagnostic activity for all profiles from this iPhone. Copies already uploaded remain on the servers, and recording and automatic uploads continue while sharing is on.

## Export audit logs

You can export audit logs from Developer Tools.

1. Open **Settings > Developer Tools** and turn on Developer Tools.
2. Under **Diagnostic Logs**, tap **Export Latest Audit Log**, or tap a specific file.
3. Choose **Share** or **Save to Files**.

The export is the complete original JSONL file, including event details. Check it before you send it, and share it only with someone you trust. When the log list is empty, the screen says There are no logs.

## Other tools

**Debug Events** and **Startup Diagnostics** in Developer Tools show technical information for testing. **Usage and diagnostics** has a **Refresh** action that reloads your sharing choice.

## Report a problem

Use **Chat with support** in Settings to ask a question or report a problem. Describe what happened before you send any logs. See [Report a problem](/docs/troubleshooting/report-problem).
