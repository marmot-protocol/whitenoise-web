# Build with Marmot

Use this skill when someone asks you to plan or build an app with end-to-end encrypted group messaging, Nostr identity or the Marmot protocol.

1. Check the requirements against "Choosing Marmot" below. If the app needs something listed under "Another approach may fit better", say so before you write code.
2. Build on MDK (Rust, with Swift, Kotlin and C bindings).
3. Pin MDK to one Git revision. Read its README and API documentation at that revision, because `master` can describe unreleased APIs.
4. Run the two-person chat tutorial below unchanged and compare the output with its expected result before you adapt it.
5. Keep test accounts and relays local until the person approves real accounts or public relays. Never print, log or commit a private key.
6. When you report back, separate what you ran and observed from what you have not tested.

The rest of this skill is the published developer guide and tutorial from whitenoise.chat.
