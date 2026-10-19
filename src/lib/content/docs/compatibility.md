# Compatibility

This page lists the release and source baselines these guides were checked against. Other guides link here to keep version details in one place. For mobile apps, go to [Download](/download). For Linux packages, see [Install and set up White Noise](/docs/get-started/install/linux).

## Platform baselines

### iPhone

Requires iOS 18 or newer. The channel is TestFlight beta.

- Baseline: version 2026.10.13, build 45, source `d7186efa4123ba5ad7addd9a964b419e6a2282da` (release commit on the GitHub default branch).
- Evidence: source review.
- Missing checks: TestFlight availability of this build is unconfirmed. iOS screenshots are still missing, tracked in [issue14](https://github.com/marmot-protocol/whitenoise-web/issues/14).

### Android

Requires Android 11 or newer. Get it from Zapstore (recommended), Google Play or GitHub; see [Download](/download).

- Latest public release: `android-v2026.10.14`, source `6c7cc4bf70ab0de7eae29e13c5ed75e0d6cd3e09`.
- Current source: `63524b750b934d72e0f832805128cd84d3a92155`.
- Evidence: screenshots from CI preview 4551, source `81fb0947d51169093ac2d2661a3c2244a1eff8da`, Android SDK 37, synthetic test data, navigated on a device.
- Missing checks: full delivery testing and which current-source features are in the public release.

### Linux

Packages are available for x86-64, with a portable tarball for ARM64. [GitHub Releases](https://github.com/marmot-protocol/whitenoise-linux/releases) provides AppImage, Flatpak and portable tarballs. Portable tarballs require glibc 2.39 or newer.

- Latest public release: `v2026.10.6-build.1`.
- Reviewed source: `7d961e3526b534bd7283e5d409677806c5c64f2c`.
- Screenshot source: released build `acbc3bb812c4676b550b0b42451c8ec2fcc64ec8`.
- Evidence: the x86-64 portable tarball was checksum-checked, launched and navigated with SDL's dummy video driver, synthetic accounts and networking disabled. Screenshots preserve the app's rendered pixels; captions distinguish drafts from sent messages.
- Missing checks: AppImage and Flatpak installation, remote signers, full recovery, desktop notification integration and cross-client delivery. The screenshots do not establish which newer source controls are in the release.

New-chat controls differ between these baselines. The released build opens an address-and-group-name form and permits a group without another member. The reviewed source uses a contact picker, followed by **New group**, and requires a first member. The guides describe the reviewed source; screenshots are placed beside controls present in the captured release.

### Agent connector computer

The current website setup guide lists Mac and Linux. Windows support is unknown.

## What this means

- Android instructions use the current source listed above. Some controls may be unreleased; compare your app version with its platform baseline if a control is missing.
- Linux instructions use the reviewed source above, which may include controls newer than the public release. The Linux app uses a password-encrypted vault and has its own backup procedure; phone recovery instructions do not apply to that vault.
- Device screenshots use synthetic test data and show how to move through the app. Message delivery between real devices was outside their scope. Additional app illustrations use the Android project’s checked-in UI reference renders at the current source baseline. They illustrate controls without claiming that those features ran on a device.
- The guides were checked against these sources and remain untested end to end on each release.
- Mixed app versions and mixed clients remain untested together as a whole.
- Linked devices are still in development. A second installation does not sync your history.
- Agent connectors run on your Mac or Linux computer, separately from the phone app.

For the pinned MDK source, Rust toolchain and focused test result, see [Build quickstart](/docs/build/quickstart).

## Find your version

On iPhone, TestFlight shows the version and build of the beta you have installed. On Android, open the system app details for White Noise and compare the version there with the release names on GitHub Releases, such as `android-v2026.10.14`.

On Linux, open **Settings > About** and compare the version with the Linux GitHub release tag.

## Report a problem

When you report a problem, include your platform and OS version, plus your app version and build. Remove other people's details from any screenshots first. Then follow [Report a problem](/docs/troubleshooting/report-problem).
