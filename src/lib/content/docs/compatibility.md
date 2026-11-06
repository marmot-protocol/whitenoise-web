# Compatibility

This page lists the release and source baselines these guides were checked against. Other guides link here to keep version details in one place. To get the app, go to [Download](/download).

## Platform baselines

| Platform | Channel | Source baseline | Evidence | Missing checks |
|---|---|---|---|---|
| iPhone, iOS 18 or newer | App Store; see [Download](/download) | Version 2026.10.25, build 47, source `481736fa1db5eb320c7d44a80ebe2354bca97027` (release tag `v2026.10.25`) | Source review | Device testing; iOS screenshots are still missing (tracked in [issue14](https://github.com/marmot-protocol/whitenoise-web/issues/14)) |
| Android 11 or newer | Zapstore (recommended), Google Play or GitHub; see [Download](/download) | Release `android-v2026.10.27`, build 23, source `b81278afe96bddd4cf05e5f267eee7c656231f3d` | Source review of the release. Screenshots from CI preview 4551, source `81fb0947d51169093ac2d2661a3c2244a1eff8da`, Android SDK 37, synthetic test data, navigated on a device | Full delivery testing; screenshots and illustrations of account setup predate this release |
| Desktop app | Unconfirmed | Unrecorded | Unrecorded | Whether a desktop app is available |
| Agent connector computer | Mac or Linux | Current website setup guide | The website lists Mac and Linux | Windows support unknown |

## What this means

- Instructions match the releases listed above. If a control is missing, compare your app version with this table and update the app.
- Device screenshots use synthetic test data and show how to move through the app. Message delivery between real devices was outside their scope. Additional app illustrations use the Android project’s checked-in UI reference renders at source `63524b750b934d72e0f832805128cd84d3a92155`, before this release. They illustrate controls without claiming that those features ran on a device.
- The guides were checked against these sources and remain untested end to end on each release.
- Mixed app versions and mixed clients remain untested together as a whole.
- Linked devices are still in development. A second installation does not sync your history.
- Agent connectors run on your Mac or Linux computer, separately from the phone app.

For the pinned MDK source, Rust toolchain and focused test result, see [Build quickstart](/docs/build/quickstart).

## Find your version

On iPhone, open Settings, then General, then iPhone Storage, and select White Noise to see the version you have installed. On Android, open the system app details for White Noise and compare the version there with the release names on GitHub Releases, such as `android-v2026.10.27`.

## Report a problem

When you report a problem, include your platform and OS version, plus your app version and build. Remove other people's details from any screenshots first. Then follow [Report a problem](/docs/troubleshooting/report-problem).
