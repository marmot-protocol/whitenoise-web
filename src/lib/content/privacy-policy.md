# Privacy Policy

**Last Updated: March 30, 2026**

---

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

**Usage and crash reporting (opt-in only).** If you choose to opt in, the app may send anonymized usage data and crash reports to services operated or contracted by IPF. This data contains no message content, private keys, or individually identifying information. You can opt in or out at any time in the app settings.

IPF has no visibility into your messages, the groups you participate in, or the membership of those groups. Note that your Nostr contact list is a public event on the Nostr network and may be visible to anyone, including relay operators — this is a property of the Nostr protocol, not specific to White Noise. IPF also has no visibility into your activity on relays or Blossom servers it does not operate.

---

## 5. Information We Collect

IPF may collect and process limited categories of information in connection with the Service.

**Information you provide directly:** Nostr profile metadata you choose to publish (such as display name, profile picture, and bio), communications with IPF support, and reports submitted through the Service.

**Information collected automatically:** IPF collects only the minimum information necessary for the Service to function. When you connect to IPF-controlled infrastructure (such as relays or APIs), we collect IP address and connection logs required to operate those systems. This information is not used for tracking or analytics beyond what is necessary to maintain service reliability and security.

If you opt in to anonymous usage reporting, we may additionally collect aggregated, anonymized information about how you use the Service, such as device and platform type and approximate location derived from network signals. This data contains no message content, private keys, or individually identifying information, and is used solely to improve the Service.

**Push notification tokens:** If you enable push notifications, the Service may transmit a notification token to IPF-controlled infrastructure (the Transponder service) to deliver notifications. These tokens are associated with your public key and are used solely to route notifications to your device. The content of notifications is encrypted and not readable by IPF.

**Crash and diagnostic data:** If you opt in to crash reporting, the Service may collect anonymized crash reports and diagnostic information. No message content or private keys are included in crash reports.

Providing certain information may be necessary to use specific features of the Service. If you choose not to provide such information, some features may not function as intended.

---

## 6. Public, IPF-Controlled, and Third-Party Data

Because the Service operates on Nostr, it is important to understand how different categories of data are handled.

**Public Nostr data:** Nostr profile metadata and certain protocol-level events (such as key packages used for MLS group setup) are published to Nostr relays and are generally public. Once published, such data may be stored or replicated on independent relays outside IPF's control.

**Encrypted message data:** Message content transmitted through the Service is end-to-end encrypted. Encrypted ciphertexts may be stored on Nostr relays, but the content cannot be read by relay operators or by IPF.

**IPF-controlled data:** Information processed or stored on IPF-controlled infrastructure, such as logs, notification tokens, and relay data, is subject to this Policy.

**Third-party data:** The Service may display or link to externally hosted content stored on third-party servers, relays, or storage providers. IPF does not own or control those systems and is not responsible for their data handling practices.

---

## 7. How We Use Information

IPF processes information as reasonably necessary to operate, secure, maintain, and improve the Service. This includes:

- Transmitting and routing Nostr events
- Delivering push notifications to your device
- Maintaining the reliability, performance, and security of IPF-controlled infrastructure
- Detecting and preventing abuse, fraud, or illegal activity
- Responding to support inquiries
- Complying with applicable law

IPF never has access to message content. Because all messages are end-to-end encrypted on your device before transmission, IPF cannot read, use, or process message content for any purpose.

---

## 8. Legal Bases for Processing

Where applicable under data protection law, IPF processes personal data on the following legal bases:

- **To operate and provide the Service,** including transmitting Nostr events and delivering notifications: legitimate interests
- **To maintain security and prevent abuse:** legitimate interests and legal obligations
- **To comply with applicable law,** including responding to lawful requests: legal obligations
- **Where required, based on user consent** (e.g., opt-in crash reporting): consent

Where IPF relies on legitimate interests, it does so after considering the potential impact on users and their rights. Because message content is end-to-end encrypted using MLS, IPF is technically unable to decrypt or provide the plaintext content of messages under any circumstances, including in response to legal requests.

---

## 9. Disclosure of Information

IPF may disclose information to service providers that process data on our behalf and under our instructions to support the operation of IPF-controlled infrastructure, to comply with legal obligations or lawful requests, or to protect the rights, safety, and integrity of the Service and its users.

Because message content is end-to-end encrypted using MLS, IPF is technically unable to decrypt or provide the plaintext content of messages to any third party under any circumstances, including in response to legal process.

Because the Service interacts with decentralized systems, information contained in Nostr events — including encrypted message ciphertexts and public key package events — may be accessible to independent relays and third-party systems outside IPF's control.

IPF does not sell personal information.

---

## 10. International Data Transfers

IPF operates globally, and information may be processed in jurisdictions outside your country of residence, including the United States. Where required, IPF relies on appropriate safeguards for international data transfers, such as standard contractual clauses or other lawful mechanisms.

---

## 11. Data Retention

IPF retains information for as long as reasonably necessary to operate the Service, comply with legal obligations, and prevent abuse.

Notification tokens are retained only as long as needed to deliver notifications and are deleted when you disable notifications or uninstall the app. Logs and diagnostic data are retained for a limited period for security and operational purposes.

IPF has no obligation to retain user content and may remove or cease storing content at its discretion, subject to applicable law.

---

## 12. Your Rights

Depending on your jurisdiction, you may have the right to:

- Access personal data held about you
- Request correction of inaccurate or incomplete data
- Request deletion of personal data
- Request restriction of processing
- Object to processing based on legitimate interests
- Request data portability
- Withdraw consent where processing is based on consent

These rights may be limited in cases involving legal obligations or the decentralized nature of the Service. Because message content is end-to-end encrypted, IPF cannot access, correct, or delete message content on your behalf.

You also have the right to lodge a complaint with a supervisory authority in your jurisdiction if you believe your data has been processed in violation of applicable law.

Requests may be submitted to: privacy@ipf.dev

---

## 13. Automated Decision Making

IPF does not engage in automated decision-making or profiling that produces legal or similarly significant effects on users within the meaning of applicable data protection law.

---

## 14. Security

IPF implements reasonable technical and organizational measures to protect information processed on IPF-controlled infrastructure. All message content is protected by end-to-end encryption using the MLS protocol (RFC 9420), which provides forward secrecy and post-compromise security. IPF has no ability to read message content.

However, no system is completely secure, and IPF does not guarantee that infrastructure-level information (such as logs or notification tokens) will be free from unauthorized access, loss, or alteration.

---

## 15. Children

The Service is intended for users aged 16 and older. Users under 16 may only use the Service with the involvement and consent of a parent or legal guardian, where required by applicable law.

IPF's ability to enforce this restriction is limited by the decentralized, non-custodial architecture of the Service. Because IPF does not issue accounts, does not control Nostr relays, and does not store user data centrally, IPF cannot verify user ages, suspend individual users, or delete data held on infrastructure it does not operate.

Where IPF becomes aware that a user under 16 is using the Service without required parental consent, IPF may take action within the scope of infrastructure it controls — specifically, removing or restricting access to the Service through app store distribution channels where permitted.

Users and parents should be aware that the decentralized nature of the Service means that Nostr events published through the app may persist on independent relays outside IPF's control and cannot be deleted by IPF. This architectural property applies equally to all users and is a deliberate privacy protection, not a limitation specific to minors.

---

## 16. Decentralized System Notice

Because the Service interacts with decentralized networks, certain data — including Nostr profile metadata and protocol-level key package events — may persist on independent relays, archives, or third-party systems even after removal from IPF-controlled infrastructure. IPF cannot guarantee deletion or control of such content.

Encrypted message ciphertexts stored on Nostr relays remain encrypted regardless of where they are stored and cannot be read without the appropriate MLS group keys held by group members.

---

## 17. Changes to This Policy

IPF may update this Privacy Policy from time to time. Updated versions will be posted with a revised "Last Updated" date. For material changes, IPF will provide notice through the Service or via other appropriate means. Continued use of the Service after such notice constitutes acceptance of the updated policy.

---

## 18. California Privacy Rights

If you are a California resident, you may have certain rights under the California Consumer Privacy Act (CCPA), as amended by the California Privacy Rights Act (CPRA), subject to applicable thresholds and limitations.

These rights may include the ability to request access to categories and specific pieces of personal information we have collected about you, request deletion of personal information subject to certain exceptions, request correction of inaccurate personal information, and opt out of the sale or sharing of personal information where applicable.

IPF does not sell personal information and does not share personal information for cross-context behavioral advertising.

You may submit requests related to your personal information by contacting privacy@ipf.dev. IPF will respond in accordance with applicable law.

Because the Service interacts with decentralized systems, some information may not be within IPF's control and may not be capable of being deleted or modified by IPF.

---

## 19. Contact

For questions about this Privacy Policy, contact:

Internet Privacy Foundation  
30 N Gould St #57037  
Sheridan, WY 82801  
privacy@ipf.dev  
https://ipf.dev
