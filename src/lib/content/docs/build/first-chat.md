# Build a two-person chat

In this tutorial you build a small Rust program in which two people, Alice and Bob, create accounts, share an encrypted group and exchange a message. Everything runs on your computer against a temporary relay, so no account or message reaches a public relay.

## Prerequisites

- git and Rust 1.97.1, the version MDK sets in its toolchain file
- A C compiler, make and Perl. The build compiles SQLCipher and OpenSSL from source.
- About 10 GB of free disk space for the debug build

## What the program does

1. Starts a Nostr relay inside the program on a random local port.
2. Gives Alice and Bob their own data directory, as if they were on two devices.
3. Creates an account for each person and publishes the key material others need to invite them.
4. Alice creates a group with Bob in it. Bob receives the invitation and accepts it.
5. Alice sends "Hello, Bob!", and Bob receives and decrypts the message.
6. Both close their apps. Bob's data directory is opened again to show that the group and message were stored.

## Steps

1. Create a project:

```sh
cargo new two-party-example
cd two-party-example
```

2. Pin the Rust version by saving this as `rust-toolchain.toml`:

```toml
[toolchain]
channel = "1.97.1"
```

3. Replace `Cargo.toml` with the following. It pins every MDK crate to one commit. The `[patch]` section is copied from MDK's own `Cargo.toml` at that commit; Cargo only applies patches from the top-level project, so yours has to repeat it.

```toml
[package]
name = "two-party-example"
version = "0.1.0"
edition = "2024"
publish = false

[dependencies]
marmot-app = { git = "https://github.com/marmot-protocol/mdk", rev = "4d525102389ea8fc053b4be1e3904fe23eb9b931" }
marmot-account = { git = "https://github.com/marmot-protocol/mdk", rev = "4d525102389ea8fc053b4be1e3904fe23eb9b931" }
cgka-traits = { git = "https://github.com/marmot-protocol/mdk", rev = "4d525102389ea8fc053b4be1e3904fe23eb9b931" }
nostr-relay-builder = "0.44"
tokio = { version = "1", features = ["rt-multi-thread", "macros", "time"] }

# Copied from MDK's own Cargo.toml at the same commit. Cargo only applies
# [patch] from the top-level project, so a project that depends on MDK has
# to repeat it. Without the libsqlite3-sys patch, SQLCipher prints a
# "WARN MEMORY sqlcipher_mlock" line for every failed mlock() call.
[patch.crates-io]
hax-lib-macros = { git = "https://github.com/cryspen/hax.git", rev = "8f9cb576e58f6cc7e9ed249a7d4439b0f7ed0da7" }
libsqlite3-sys = { git = "https://github.com/rusqlite/rusqlite.git", rev = "5ae7fdf83085c595fd54f977b3a56ccacabaf16b" }
```

4. Replace `src/main.rs` with:

```rust
//! Two people, one encrypted group, one message, using MDK's app-level API.
//!
//! Alice and Bob each get their own data directory (as if they were on two
//! different phones). Both talk to one Nostr relay that runs inside this
//! process, so nothing touches the public network.

use std::error::Error;
use std::path::Path;
use std::time::Duration;

use cgka_traits::TransportEndpoint;
use marmot_account::AccountHome;
use marmot_app::{
    AccountSetupRequest, MarmotApp, MarmotAppConfig, MarmotAppEvent, MarmotAppRuntime,
};
use nostr_relay_builder::MockRelay;
use tokio::sync::broadcast;
use tokio::time::timeout;

type Result<T> = std::result::Result<T, Box<dyn Error>>;

/// Open (or create) one person's local Marmot installation in `root`.
fn open_app(root: &Path, relay_url: &str) -> Result<MarmotApp> {
    let config = MarmotAppConfig::default()
        // Our relay is on 127.0.0.1. Real apps leave loopback refused.
        .with_allow_loopback_relay_endpoints(true);
    let app = MarmotApp::try_with_relays_and_account_home_and_config(
        root,
        vec![relay_url.to_owned()],
        // Development key store: the secret key is a file under `root`.
        AccountHome::open(root),
        config,
    )?;
    Ok(app)
}

/// Create a new Nostr identity, publish its relay lists, profile and
/// KeyPackage to our relay, and return its account id (hex public key).
async fn create_account(runtime: &MarmotAppRuntime, relay_url: &str) -> Result<String> {
    let relay = TransportEndpoint(relay_url.to_owned());
    let setup = runtime
        .create_identity(AccountSetupRequest {
            default_relays: vec![relay.clone()],
            bootstrap_relays: vec![relay],
            publish_initial_key_package: true,
            ..AccountSetupRequest::default()
        })
        .await?;
    Ok(setup.account.account_id_hex)
}

/// Wait up to 30 seconds for the first event that `pick` accepts.
async fn wait_for<T>(
    events: &mut broadcast::Receiver<MarmotAppEvent>,
    mut pick: impl FnMut(MarmotAppEvent) -> Option<T>,
) -> Result<T> {
    let found = timeout(Duration::from_secs(30), async {
        loop {
            match events.recv().await {
                Ok(event) => {
                    if let Some(found) = pick(event) {
                        return Ok(found);
                    }
                }
                Err(broadcast::error::RecvError::Lagged(_)) => continue,
                Err(err) => return Err(err),
            }
        }
    })
    .await??;
    Ok(found)
}

fn main() -> Result<()> {
    // MDK's async call chains are deep; unoptimized (debug) builds overflow
    // Tokio's default 2 MiB worker stacks. Give every thread 8 MiB.
    tokio::runtime::Builder::new_multi_thread()
        .worker_threads(2)
        .thread_stack_size(8 * 1024 * 1024)
        .enable_all()
        .build()?
        .block_on(run())
}

async fn run() -> Result<()> {
    // Start a throwaway relay on a random local port.
    let relay = MockRelay::run().await?;
    let relay_url = relay.url().await.to_string();
    println!("relay running at {relay_url}");

    // Fresh data directories for every run.
    let data = Path::new("chat-data");
    if data.exists() {
        std::fs::remove_dir_all(data)?;
    }
    let (alice_dir, bob_dir) = (data.join("alice"), data.join("bob"));
    std::fs::create_dir_all(&alice_dir)?;
    std::fs::create_dir_all(&bob_dir)?;

    // 1. Each person opens their own app and creates an account.
    let alice = open_app(&alice_dir, &relay_url)?.runtime();
    let bob = open_app(&bob_dir, &relay_url)?.runtime();
    let alice_id = create_account(&alice, &relay_url).await?;
    let bob_id = create_account(&bob, &relay_url).await?;
    println!("alice = {alice_id}");
    println!("bob   = {bob_id}");

    // 2. Both start their runtimes, which connect to the relay and listen.
    let mut bob_events = bob.subscribe();
    alice.start().await?;
    bob.start().await?;

    // 3. Alice creates a group with Bob in it. MDK fetches Bob's KeyPackage
    //    from the relay and sends him an encrypted Welcome.
    let group_id = alice
        .create_group(&alice_id, "Tutorial chat", &[bob_id.clone()], None)
        .await?;
    println!("alice created group, inviting bob");

    // 4. Bob's runtime receives the Welcome and shows a pending invite.
    wait_for(&mut bob_events, |event| match event {
        MarmotAppEvent::GroupJoined { group_id: id, .. } if id == group_id => Some(()),
        _ => None,
    })
    .await?;
    let group = bob.accept_group_invite(&bob_id, &group_id).await?;
    println!("bob accepted invite to \"{}\"", group.profile.name);

    // 5. Alice sends a message; Bob receives and decrypts it.
    alice
        .send_message(&alice_id, &group_id, b"Hello, Bob!".to_vec())
        .await?;
    let received = wait_for(&mut bob_events, |event| match event {
        MarmotAppEvent::MessageReceived(m) if m.message.group_id == group_id => Some(m.message),
        _ => None,
    })
    .await?;
    let from = if received.sender == alice_id { "alice" } else { "?" };
    println!("bob received from {from}: {}", received.plaintext);

    // 6. Shut down cleanly: this closes every database and releases locks.
    alice.shutdown_and_close().await?;
    bob.shutdown_and_close().await?;
    drop((alice, bob));

    // 7. "Restart" Bob: open his data directory again and read what was
    //    stored, without starting a runtime or touching the network.
    let bob_again = open_app(&bob_dir, &relay_url)?;
    for group in bob_again.groups(&bob_id)? {
        println!("after restart, bob is in group \"{}\"", group.profile.name);
    }
    for message in bob_again.messages(&bob_id)? {
        if message.kind == 9 {
            println!("after restart, bob has message: {}", message.plaintext);
        }
    }
    Ok(())
}
```

5. Run it:

```sh
cargo run
```

The first build compiles MDK and its dependencies and can take several minutes. Later runs start in seconds.

## Expected result

The output looks like this. The port and both account ids are different every run.

```text
relay running at ws://127.0.0.1:34067
alice = bf95e7c8a9f099ef9f7314f8b27acac9c00cfbcdc77b65b27d308115854c04e5
bob   = a33c25186f7cc88921fd032be5ec92e7cad231594fd3fab80cf5f42833e84f4b
alice created group, inviting bob
bob accepted invite to "Tutorial chat"
bob received from alice: Hello, Bob!
after restart, bob is in group "Tutorial chat"
after restart, bob has message: Hello, Bob!
```

We ran this program at MDK commit `4d525102389ea8fc053b4be1e3904fe23eb9b931` with Rust 1.97.1 on Linux and got this output on three consecutive runs. It has not been tested on macOS or Windows.

## What this does not show

- **Key storage.** `AccountHome::open` keeps each private key in a file under the data directory, which is fine for a test. An app should use `AccountHome::open_with_keychain` or its own secret store.
- **Public relays.** The relay runs inside the program and forgets everything when it stops. A real app chooses relays that both people can reach. The program allows a `127.0.0.1` relay only because it sets `with_allow_loopback_relay_endpoints(true)`; leave that off in an app.
- **Reconnecting.** After the restart, Bob reads stored data without starting a runtime. To keep receiving messages an app calls `start()` again.
- **Other features.** Adding or removing members, sending media and delivering to a device that was offline when the message was sent are not covered.

## If it fails

1. If a debug build stops with a stack overflow, check that `main` still builds the runtime with 8 MiB thread stacks.
2. Repeated `WARN MEMORY sqlcipher_mlock` lines mean the `libsqlite3-sys` patch is missing from `Cargo.toml`.
3. A timeout while waiting for an event means Bob did not receive the invitation or message within 30 seconds. Check that nothing blocks connections to 127.0.0.1.
4. A compile error in MDK code usually means a dependency resolved to a newer version than the one we tested. Check that the `rev` values still match the commit above.

If it still fails, open an issue in the MDK repository with the commit, your Rust version, your operating system and the complete output. The Contribute page lists what to remove before you post.

## Next steps

- Read the `marmot-app` README at the same commit for the rest of the runtime API.
- Read State and errors before you store real conversations.
- Use MarmotKit (Swift and Kotlin) or the C interface if your interface is not written in Rust.
