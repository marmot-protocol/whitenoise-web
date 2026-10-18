# Build quickstart

This quickstart gets you a pinned copy of the Marmot Development Kit (MDK) and runs one small local test group. It confirms that your toolchain can build and test part of the engine before you start on a client.

## Prerequisites

- git
- Rust 1.97.1, the version set in the toolchain file at the pinned commit

## Steps

1. Clone MDK and check out the pinned commit:

```sh
git clone https://github.com/marmot-protocol/mdk.git
cd mdk
git checkout d20329e9ac6337294a9b4414a55f97bc76b6581d
```

2. Run the focused storage tests:

```sh
cargo test --locked -p cgka-engine --lib message_processor::store::tests
```

The `--locked` flag makes Cargo use the dependency versions in the committed lockfile.

## Expected result

At this commit, the command ran 3 tests and 0 failed. That result covers a small group of engine storage tests and nothing more. It does not qualify the full test suite, network delivery, or any device.

## If it fails

1. Run `git rev-parse HEAD` and check that it prints the full commit shown above.
2. Run `rustc --version` and compare the result with 1.97.1.
3. Save the complete command output without editing it.
4. Open an issue in the MDK repository. Include the commit, your Rust version, your operating system and the output. The Contribute page lists what to remove before you post.

## Next steps

For an app, start with `marmot-app`. Language bindings are in `marmot-uniffi`. For TypeScript there is marmot-ts, which is in alpha; its maintainers advise against using it in production. Read the client flow on the Build page before you choose a library.
