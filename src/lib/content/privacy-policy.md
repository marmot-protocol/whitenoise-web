# Privacy Policy

**Last Updated: September 15, 2026**

---

## Request account or data deletion

To request deletion of White Noise data held by the Internet Privacy Foundation, email [privacy@ipf.dev](mailto:privacy@ipf.dev) with the subject “White Noise data deletion”. Describe the data or support interaction you want deleted. You can make this request without reinstalling the app. Never send your private key, recovery secret, or message contents. We will explain any information needed to locate the records and any records that must be retained for security or legal reasons.

To remove an identity from the Android app, open its account settings and choose **Sign Out & Wipe**, then follow the confirmation. This removes that identity’s local message database, cryptographic group state, and stored key from that installation, and attempts to remove its published key packages. Save any backup you intend to keep before wiping. Signing back in does not restore the deleted local history.

A Nostr identity is a cryptographic keypair that can also be used in other apps. Removing it from White Noise does not destroy copies of the key on other devices or erase events and encrypted media held by independent relays, servers, or recipients. IPF cannot guarantee deletion from those independent systems. We can process requests for identifiable records on infrastructure we control, including support correspondence and submitted audit logs. Usage analytics expires after 180 days; because its records are not linked to your Nostr identity, we generally cannot identify individual records for deletion. Turning usage sharing off stops future collection. Other retention limits are described in Sections 6, 7, and 13.

## 1. Overview

This Privacy Policy explains how the Internet Privacy Foundation ("IPF," "we," "us," or "our") collects, uses, and discloses information in connection with White Noise (the "Service").

White Noise operates as an interface to the Marmot Protocol — an end-to-end encrypted private messaging protocol built on Nostr. Unlike general-purpose Nostr clients, White Noise is designed specifically for private, encrypted group messaging. Messages sent through the Service are encrypted using the Messaging Layer Security (MLS) protocol and are not readable by IPF or by relay operators.

This Privacy Policy applies only to information processed through IPF-controlled infrastructure. For purposes of applicable data protection law, Internet Privacy Foundation acts as the data controller for information processed through IPF-controlled infrastructure, except where otherwise specified. IPF is a Wyoming nonprofit corporation.

---

## 2. Definitions

**"End-to-end encryption"** means the cryptographic process by which messages are encrypted on the sender's device and can only be decrypted by intended recipients. IPF cannot read the contents of encrypted messages transmitted through the Service.

**"Externally hosted content"** means any media referenced within a Nostr event that is stored on third-party infrastructure.

**"IPF-controlled infrastructure"** means the White Noise apps, websites, APIs, relays, media storage, and other systems owned or controlled by IPF.

**"Marmot Protocol"** means the MLS-based encrypted group messaging protocol built on Nostr, used by the Service for private communications.

**"MLS"** means the Messaging Layer Security protocol (RFC 9420), an IETF standard for end-to-end encrypted group messaging. MLS provides forward secrecy and post-compromise security, meaning that compromise of current keys does not expose past messages and limits exposure of future messages.

**"Nostr"** means the decentralized protocol known as "Notes and Other Stuff Transmitted by Relays," which enables users to publish, retrieve, and verify content using cryptographic keypairs and signed messages.

**"Nostr event"** means a cryptographically signed data object published using the Nostr protocol. A Nostr event may include a public key, timestamp, event kind, content, tags, metadata, and a digital signature. Once broadcast, Nostr events may be stored or replicated across multiple independent relays, including relays IPF does not own or control.

**"Nostr keypair"** means the cryptographic public/private keypair used to create, sign, and authenticate Nostr events. The public key functions as a user identifier across the Nostr protocol, and the private key is required to sign events and prove authorship.

**"Relay"** means any independently operated server implementing the Nostr protocol for receiving, storing, indexing, or redistributing Nostr events. Unless expressly stated otherwise, relays are not operated by IPF.

**"User content"** means any Nostr event, encrypted message, media, metadata, profile information, or other material submitted, published, or otherwise made available by a user through the Service.

**"Usage and diagnostics"** means the optional sharing of product analytics and technical diagnostics described in Section 6. It is off by default and is controlled by a single choice in the app.

**"Audit log"** means an optional local diagnostic file recording protocol-level group and message operations, used to investigate delivery or group-state problems. Audit logging is off by default, has its own separate consent, and is described in Section 7.

---

## 3. Non-Custodial Design

White Noise is designed as a non-custodial application. IPF does not store your Nostr private key and does not maintain a traditional account on your behalf. Your interactions with the Service are associated with your public key and the Nostr events you publish or retrieve.

Your Nostr private key is generated and stored locally on your device. You are responsible for backing up and safeguarding your private key. If you lose access to your private key, IPF cannot recover it.

All group messages are end-to-end encrypted using the Marmot Protocol. IPF cannot read the contents of your messages.

---

## 4. How the App Works

White Noise runs locally on your device. Your private keys never leave your device, and all message encryption and decryption happens on-device. The app communicates with the following external systems:

**Nostr relays.** The app ships with a set of default relays but you can add, remove, or replace these at any time. Relays are independently operated servers that store and forward Nostr events. IPF does not operate any Nostr relays. When you connect to a relay, that relay operator may observe your IP address and the encrypted events you publish or retrieve. Message content is end-to-end encrypted and unreadable by relay operators. Furthermore, group message events are published using ephemeral Nostr keypairs rather than your identity keypair, meaning relay operators typically cannot determine who sent a given message even from metadata.

**Blossom servers.** The app uses Blossom servers to host media files (such as images and attachments). You can configure your own Blossom server or use any publicly available one. IPF does not operate any Blossom servers. When you upload or retrieve media, the Blossom server operator may observe your IP address.

Media files fall into two categories with respect to privacy. Profile pictures and other public profile media are uploaded unencrypted, as they are intended to be publicly visible on the Nostr network. Media shared within encrypted group conversations is end-to-end encrypted before upload — Blossom server operators storing such files see only ciphertext and have no ability to view the content.

**Transponder (push notifications).** If you enable push notifications, the app connects to Transponder, a notification relay service operated by IPF. Transponder routes encrypted notification events to your device. Notification requests are sent using ephemeral Nostr keypairs, meaning IPF cannot link a notification request to your identity public key. IPF can decrypt notification tokens to obtain the underlying Apple or Google push token required for delivery, but has no way to associate that token with your Nostr identity. The content of notifications is encrypted and not readable by IPF.

**Usage and diagnostics (opt-in only).** Usage and diagnostics sharing is off by default and requires an explicit, affirmative choice in the app. If you turn it on, the app sends two independent streams to servers IPF operates: product analytics to an IPF-hosted Aptabase instance (`aptabase.ipf.dev`), and technical diagnostics to an IPF-hosted OpenTelemetry collector (`otlp.ipf.dev`). IPF uses no third-party analytics, attribution, or advertising service for this purpose, and the app contains no advertising identifiers and no crash-reporting SDK. Both streams carry only bucketed counts, bucketed timings, and values drawn from a fixed catalogue of event and property names — never message content, contacts, account or group identifiers, public keys, filenames, or search terms. You can turn sharing off at any time in the app settings. Section 6 describes exactly what is collected, what our servers observe, and how long it is kept.

**Diagnostic audit logs (opt-in only).** Audit logging is off by default and is a separate choice from usage and diagnostics. On Android, enabling **Share technical logs** records diagnostic files locally and automatically uploads eligible files to IPF’s Goggles service. The app presents an additional confirmation before enabling automatic sharing. Other clients may offer local recording and a separate manual export; follow the controls and disclosure shown in your client. Audit logs are more sensitive than usage and diagnostics: they record group and message identifiers and the relay addresses involved, though never message content or key material. Section 7 describes this in detail.

**Android dictation and read-aloud.** Dictation is optional. Your selected Android speech-recognition service receives microphone audio and may send it to its provider for transcription, under that provider’s policy. White Noise shows a disclosure before external recognition is enabled and inserts the returned text into your draft; automatic sending is a separate explicit option. Android read-aloud uses installed offline voices and does not select voices marked as requiring a network connection. These optional features are separate from usage analytics and diagnostic-log sharing.

**Giphy (GIF search, where available).** If you use the GIF picker, the app queries Giphy, a third-party service IPF does not operate. Your search terms and IP address are visible to Giphy and are handled under Giphy's own privacy policy. A GIF you send is delivered inside your encrypted conversation like any other media.

IPF cannot read your messages. If you share audit logs, IPF can see the limited group and message metadata described in Section 7, but not the contents of your messages or group membership by name or public key. Note that your Nostr contact list is a public event on the Nostr network and may be visible to anyone, including relay operators — this is a property of the Nostr protocol, not specific to White Noise. IPF also has no visibility into your activity on relays or Blossom servers it does not operate, except for the information you opt to share: aggregate connection quality labeled by relay address in Section 6, and the more detailed audit metadata in Section 7.

---

## 5. Information We Collect

IPF may collect and process limited categories of information in connection with the Service.

**Information you provide directly:** Nostr profile metadata you choose to publish (such as display name, profile picture, and bio), communications with IPF support, and reports submitted through the Service.

**Information collected automatically:** IPF collects only the minimum information necessary for the Service to function. When you connect to IPF-controlled infrastructure (such as relays or APIs), we collect IP address and connection logs required to operate those systems. Apart from the website analytics described immediately below, this information is not used for tracking or analytics beyond what is necessary to maintain service reliability and security.

**Website analytics:** The White Noise website uses a self-hosted, cookieless analytics service that IPF operates (`analytics.ipf.dev`) to count page views. It records the page visited, the referring page, browser and operating system, screen size, and an approximate country derived from your IP address. It sets no cookies and no cross-site tracking identifiers, and groups repeat visits using a rotating value derived from your IP address and browser rather than a persistent identifier. Website analytics are separate from the in-app usage and diagnostics described in Section 6 and are not linked to your use of the app.

If you turn on usage and diagnostics, we additionally collect the bucketed feature-usage and reliability measurements described in Section 6, along with the app and device information, temporary session identifiers, and random installation identifier described there. Our analytics server also derives a daily device-grouping value and an approximate country or region from the IP address of the request. This information contains no message content, no private keys, and no identifier that links it to your Nostr identity, your account, or your groups.

**Push notification tokens:** If you enable push notifications, the Service may transmit a notification token to IPF-controlled infrastructure (the Transponder service) to deliver notifications. Transponder uses the underlying platform push token to route notifications to your device. Notification requests use ephemeral protocol keys rather than an identity public key, as described in Section 4. The content of notifications is encrypted and not readable by IPF.

**Usage and diagnostics data (opt-in):** If you turn on usage and diagnostics, the Service collects the bucketed usage and reliability information described in Section 6. The Service does not collect crash reports and contains no crash-reporting SDK.

**Audit log data (opt-in):** If you enable automatic technical-log sharing on Android, or manually send a log to IPF from a client that supports export, the Service transmits the protocol-level diagnostic information described in Section 7. Automatic technical-log sharing is a separate choice from usage and diagnostics.

Providing certain information may be necessary to use specific features of the Service. If you choose not to provide such information, some features may not function as intended.

---

## 6. Usage and Diagnostics (Opt-In)

White Noise can optionally share information about how the app is used and how reliably it performs. This section describes that sharing in full.

**It is off by default.** Nothing described in this section is collected or transmitted unless you make an explicit, affirmative choice to turn on usage and diagnostics in the app. Declining costs you no functionality. If the scope of what would be shared changes materially, the app asks again rather than carrying a previous choice forward.

**One choice, two streams.** A single in-app setting controls two independent streams, both sent to servers IPF operates:

- **Product analytics,** sent to an IPF-hosted Aptabase instance (`aptabase.ipf.dev`), recording which features are used and whether they succeed.
- **Technical diagnostics,** sent to an IPF-hosted OpenTelemetry collector (`otlp.ipf.dev`), recording aggregate performance and reliability measurements.

IPF uses no third-party analytics, attribution, or advertising service for this purpose. The app contains no advertising identifiers and no crash-reporting SDK, and sends no crash reports.

**What product analytics contains.** Product analytics is limited to a fixed catalogue of event names and property values. Events cannot carry free-form text: every property is a value chosen from a predefined list, a true or false flag, a count bucket (for example `1`, `2`, `3–5`, `11–20`, `1001+`), or a duration bucket (for example "up to 250 ms" or "up to 5 seconds"). Exact counts, exact timings, and raw error text are not transmitted. A transmitted event carries:

- The event name and its predefined property values — for example that a conversation screen was opened, that an onboarding step completed successfully, that a media upload failed, or that sending a message took under one second
- The app version, the operating system name and major version, a device class ("phone" or "tablet"), the app surface, and whether the build is a development build
- The version of the underlying Marmot development kit
- A random temporary session identifier, which expires after 30 minutes of inactivity and no later than one hour
- For aggregated measurements, a fresh random identifier for each 15-minute window

**Product analytics never contains** message content or any part of it; your Nostr public key or private key; account, group, message, or event identifiers; contact lists or group membership; relay, server, or media addresses; media filenames or exact file sizes; search terms; emoji or reaction choices; push notification tokens; or raw error text.

**What technical diagnostics contains.** Diagnostics consists of aggregate counters and fixed-bucket histograms accumulated on your device over a reporting interval — for example how many message publications succeeded, or the distribution of time between one relay delivering a message and another relay delivering the same message. It contains no per-message or per-event records. It is transmitted with:

- A random installation identifier, created when you turn sharing on. It is not derived from your Nostr identity, your account, or your device, and it is discarded and replaced if you turn sharing off and later turn it on again.
- The operating system type and version, and the device model identifier (for example the hardware model of your phone)
- The app version and deployment environment

Diagnostics also includes **relay addresses**, and this is a deliberate exception to the general rule that relay activity stays on your device. To choose good default relays and detect failing ones, relay performance measurements are labeled with the relay they describe. For an install with sharing turned on, this means IPF can see aggregate connection quality for the relays that install uses — but not which accounts, groups, or messages were involved, and not the content of anything sent through them. Diagnostics carries no account, member, group, subscription, or message identifier, no public key, and no IP-derived field.

**What our servers observe.** Because these streams are ordinary network requests, our servers receive your IP address in transit, as does any server you connect to.

Our analytics server runs Aptabase in its standard configuration, which means two things beyond the event contents described above. It derives a daily grouping value from the request's IP address and user agent, so that separate sessions from the same device on the same day can be counted as one active device. It also adds an approximate country and region derived from the IP address. The IP address itself is not stored as a field on the events; as with any server, ingestion infrastructure may record connection logs, which IPF minimizes and retains for a limited period.

The practical effect is that our analytics server can group a day's activity from one device and can tell which country or region it came from. It cannot link that activity to your Nostr public key, your account, your groups, your contacts, or any message, because no such identifier is ever transmitted. These groupings are approximate measures of activity, not verified people. IPF does not attempt to reconstruct identities across sessions and does not combine this information with any other dataset.

We are also deliberately clear about the limits of anonymization: temporary identifiers reduce, but do not eliminate, the possibility that a rare event, an unusual timing pattern, or infrastructure-level logs could distinguish one device from another.

**Withdrawal and retention.** You can turn usage and diagnostics off at any time in the app settings. Doing so stops both streams, discards anything queued on your device that has not yet been sent, and rotates the diagnostics installation identifier. Data already transmitted cannot be recalled.

Usage analytics records are scheduled for automatic deletion 180 days after collection. Aggregate diagnostics measurements are retained for a limited period for reliability and capacity analysis.

IPF processes this information on the basis of your consent. Because these records contain no identifier that IPF can link to you, IPF generally cannot locate your individual records in response to an access, correction, or deletion request; turning sharing off is the effective way to exercise control over it. Questions may be directed to privacy@ipf.dev.

---

## 7. Diagnostic Audit Logs (Opt-In)

Separately from usage and diagnostics, White Noise can record a detailed audit log to help investigate difficult protocol problems — messages that fail to arrive, or a group whose cryptographic state has diverged between devices.

**Audit logging is off by default and has its own separate consent.** Turning on usage and diagnostics does not turn on audit logging, and turning on audit logging does not turn on usage and diagnostics.

**Android automatic technical-log sharing.** Android’s **Share technical logs** control records an append-only file locally and automatically sends eligible diagnostic audit files to Goggles, operated by IPF. This covers every profile on that installation and can include files recorded before the latest opt-in. A confirmation identifies the recipient and sensitive data before sharing is enabled. Updated Android builds require a fresh acknowledgement instead of treating an older local-recording choice as permission for automatic uploads. Cancel leaves sharing off. Turning sharing off stops new recording and prevents new upload batches. A batch already in progress may finish uploading its files. Turning sharing off does not delete files already stored locally or uploaded.

**Manual export and other clients.** A client may also let you create a copy of local audit files and choose its recipient through the operating system’s share controls. Such an export is a separate action. In clients that offer local-only recording, the files remain on the device until you explicitly export them.

**Audit logs are more sensitive than the information described in Section 6, and they are not anonymized.** For each protocol operation, a log may record the operation and its outcome, timestamps, group identifiers, message and event identifiers, group epoch numbers, the relay addresses and subscriptions involved, an identifier for the app installation, and a hashed reference derived from your account identifier rather than the account identifier itself.

**Audit logs do not contain** the decrypted content of any message, plaintext group state values, your private key or any other key material, or your full account identity.

When an audit log reaches IPF through automatic sharing or manual export, IPF can see metadata about your groups: that particular groups and messages exist, when operations on them happened, and which relays were involved. IPF still cannot see what anyone said, and the log does not identify group members by name or public key. Uploaded audit logs are treated as sensitive, access is restricted to the personnel investigating the reported problem, and they are retained only as long as needed for that investigation.

Turning audit logging off stops new recording but does not delete files already written. Existing audit files remain in the app's local storage until they are removed or you uninstall the app.

---

## 8. Public, IPF-Controlled, and Third-Party Data

Because the Service operates on Nostr, it is important to understand how different categories of data are handled.

**Public Nostr data:** Nostr profile metadata and certain protocol-level events (such as key packages used for MLS group setup) are published to Nostr relays and are generally public. Once published, such data may be stored or replicated on independent relays outside IPF's control.

**Encrypted message data:** Message content transmitted through the Service is end-to-end encrypted. Encrypted ciphertexts may be stored on Nostr relays, but the content cannot be read by relay operators or by IPF.

**IPF-controlled data:** Information processed or stored on IPF-controlled infrastructure, such as logs, notification tokens, and relay data, is subject to this Policy.

**Third-party data:** The Service may display or link to externally hosted content stored on third-party servers, relays, or storage providers. IPF does not own or control those systems and is not responsible for their data handling practices. For example, GIF search results are provided by Giphy, which receives your search terms and IP address when you use that feature.

---

## 9. How We Use Information

IPF processes information as reasonably necessary to operate, secure, maintain, and improve the Service. This includes:

- Transmitting and routing Nostr events
- Delivering push notifications to your device
- Maintaining the reliability, performance, and security of IPF-controlled infrastructure
- Detecting and preventing abuse, fraud, or illegal activity
- Responding to support inquiries
- Understanding which features are used and where the app fails or performs poorly, where you have turned on usage and diagnostics
- Investigating delivery or group-state problems from audit logs you explicitly agree to share
- Complying with applicable law

Usage and diagnostics information is used only to understand and improve how the Service works. It is never used for advertising, never sold or shared for cross-context behavioral advertising, and never used to build a profile of an individual user.

IPF never has access to message content. Because all messages are end-to-end encrypted on your device before transmission, IPF cannot read, use, or process message content for any purpose.

---

## 10. Legal Bases for Processing

Where applicable under data protection law, IPF processes personal data on the following legal bases:

- **To operate and provide the Service,** including transmitting Nostr events and delivering notifications: legitimate interests
- **To maintain security and prevent abuse:** legitimate interests and legal obligations
- **To comply with applicable law,** including responding to lawful requests: legal obligations
- **Where required, based on user consent** (e.g., turning on usage and diagnostics, enabling automatic technical-log sharing, or manually sending an audit log to IPF): consent

Where IPF relies on legitimate interests, it does so after considering the potential impact on users and their rights. Because message content is end-to-end encrypted using MLS, IPF is technically unable to decrypt or provide the plaintext content of messages under any circumstances, including in response to legal requests.

---

## 11. Disclosure of Information

IPF may disclose information to service providers that process data on our behalf and under our instructions to support the operation of IPF-controlled infrastructure, to comply with legal obligations or lawful requests, or to protect the rights, safety, and integrity of the Service and its users.

Because message content is end-to-end encrypted using MLS, IPF is technically unable to decrypt or provide the plaintext content of messages to any third party under any circumstances, including in response to legal process.

Because the Service interacts with decentralized systems, information contained in Nostr events — including encrypted message ciphertexts and public key package events — may be accessible to independent relays and third-party systems outside IPF's control.

IPF does not sell personal information.

---

## 12. International Data Transfers

IPF operates globally, and information may be processed in jurisdictions outside your country of residence, including the United States. Where required, IPF relies on appropriate safeguards for international data transfers, such as standard contractual clauses or other lawful mechanisms.

---

## 13. Data Retention

IPF retains information for as long as reasonably necessary to operate the Service, comply with legal obligations, and prevent abuse.

Notification tokens are retained only as long as needed for delivery. Disabling notifications or removing an installation initiates removal where supported; uninstalling the app alone does not guarantee immediate removal of server-side records. Tokens can also expire or be invalidated by the platform provider. Server logs and other operational diagnostic data are retained for a limited period for security and operational purposes.

Usage analytics records are scheduled for automatic deletion 180 days after collection. Aggregate technical diagnostics measurements are retained for a limited period for reliability and capacity analysis. Audit logs you send to IPF are retained only as long as needed to investigate the problem for which they were submitted.

IPF has no obligation to retain user content and may remove or cease storing content at its discretion, subject to applicable law.

---

## 14. Your Rights

Depending on your jurisdiction, you may have the right to:

- Access personal data held about you
- Request correction of inaccurate or incomplete data
- Request deletion of personal data
- Request restriction of processing
- Object to processing based on legitimate interests
- Request data portability
- Withdraw consent where processing is based on consent

These rights may be limited in cases involving legal obligations or the decentralized nature of the Service. Because message content is end-to-end encrypted, IPF cannot access, correct, or delete message content on your behalf.

Usage and diagnostics records are subject to a similar limit. They contain no identifier that IPF can link to you, so IPF generally cannot locate "your" records in order to provide access to them, correct them, or delete them individually. The property that protects your privacy also prevents us from identifying your data. You can withdraw consent at any time in the app settings, which stops all further collection.

You also have the right to lodge a complaint with a supervisory authority in your jurisdiction if you believe your data has been processed in violation of applicable law.

Requests may be submitted to: privacy@ipf.dev

---

## 15. Automated Decision Making

IPF does not engage in automated decision-making or profiling that produces legal or similarly significant effects on users within the meaning of applicable data protection law.

---

## 16. Security

IPF implements reasonable technical and organizational measures to protect information processed on IPF-controlled infrastructure. All message content is protected by end-to-end encryption using the MLS protocol (RFC 9420), which provides forward secrecy and post-compromise security. IPF has no ability to read message content.

However, no system is completely secure, and IPF does not guarantee that infrastructure-level information (such as logs or notification tokens) will be free from unauthorized access, loss, or alteration.

---

## 17. Children

The Service is intended for users aged 16 and older. Users under 16 may only use the Service with the involvement and consent of a parent or legal guardian, where required by applicable law.

IPF's ability to enforce this restriction is limited by the decentralized, non-custodial architecture of the Service. Because IPF does not issue accounts, does not control Nostr relays, and does not store user data centrally, IPF cannot verify user ages, suspend individual users, or delete data held on infrastructure it does not operate.

Where IPF becomes aware that a user under 16 is using the Service without required parental consent, IPF may take action within the scope of infrastructure it controls — specifically, removing or restricting access to the Service through app store distribution channels where permitted.

Users and parents should be aware that the decentralized nature of the Service means that Nostr events published through the app may persist on independent relays outside IPF's control and cannot be deleted by IPF. This architectural property applies equally to all users and is a deliberate privacy protection, not a limitation specific to minors.

---

## 18. Decentralized System Notice

Because the Service interacts with decentralized networks, certain data — including Nostr profile metadata and protocol-level key package events — may persist on independent relays, archives, or third-party systems even after removal from IPF-controlled infrastructure. IPF cannot guarantee deletion or control of such content.

Encrypted message ciphertexts stored on Nostr relays remain encrypted regardless of where they are stored and cannot be read without the appropriate MLS group keys held by group members.

---

## 19. Changes to This Policy

IPF may update this Privacy Policy from time to time. Updated versions will be posted with a revised "Last Updated" date. For material changes, IPF will provide notice through the Service or via other appropriate means. Continued use of the Service after such notice constitutes acceptance of the updated policy.

---

## 20. California Privacy Rights

If you are a California resident, you may have certain rights under the California Consumer Privacy Act (CCPA), as amended by the California Privacy Rights Act (CPRA), subject to applicable thresholds and limitations.

These rights may include the ability to request access to categories and specific pieces of personal information we have collected about you, request deletion of personal information subject to certain exceptions, request correction of inaccurate personal information, and opt out of the sale or sharing of personal information where applicable.

IPF does not sell personal information and does not share personal information for cross-context behavioral advertising.

You may submit requests related to your personal information by contacting privacy@ipf.dev. IPF will respond in accordance with applicable law.

Because the Service interacts with decentralized systems, some information may not be within IPF's control and may not be capable of being deleted or modified by IPF.

---

## 21. Contact

For questions about this Privacy Policy, contact:

Internet Privacy Foundation  
30 N Gould St #57037  
Sheridan, WY 82801  
privacy@ipf.dev  
https://ipf.dev
