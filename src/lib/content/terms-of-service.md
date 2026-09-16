# Terms of Service

**Last Updated: September 16, 2026**

---

## 1. Overview

These Terms of Service (the "Terms") govern your access to and use of White Noise (the "Service"), which is operated by the Internet Privacy Foundation, a Wyoming nonprofit corporation ("IPF," "we," "us," or "our"). By downloading, installing, accessing, or using the Service, you agree to these Terms.

White Noise is a non-custodial private messaging application built on Nostr and the Marmot Protocol. It is designed for end-to-end encrypted group messaging. White Noise is software, not a custodial communications platform. IPF does not create a traditional account for you, does not hold your private keys, and cannot read the content of end-to-end encrypted messages.

These Terms apply only to White Noise apps, websites, APIs, Nostr relays, and related services that IPF actually owns or controls. They do not apply to third-party Nostr relays, Blossom servers, app stores, websites, or other infrastructure that IPF does not own or control.

If you do not agree to these Terms, do not access IPF-operated services under these Terms. Your rights under applicable open-source licenses remain unaffected.

---

## 2. Definitions

**"Blossom server"** means a server used to store or retrieve media files referenced by Nostr events.

**"End-to-end encryption"** means the cryptographic process by which messages are encrypted on the sender's device and can be decrypted only by intended recipients.

**"IPF-controlled infrastructure"** means the White Noise apps, websites, APIs, Nostr relays, notification services, analytics and telemetry services, diagnostic-log services, and other systems owned or controlled by IPF.

**"Marmot Protocol"** means the MLS-based encrypted group messaging protocol built on Nostr and used by White Noise for private communications.

**"MLS"** means the Messaging Layer Security protocol (RFC 9420), an IETF standard for end-to-end encrypted group messaging.

**"Nostr"** means the decentralized protocol known as "Notes and Other Stuff Transmitted by Relays," which enables users to publish, retrieve, and verify content using cryptographic keypairs and signed events.

**"Nostr event"** means a cryptographically signed data object published using the Nostr protocol.

**"Nostr keypair"** means the cryptographic public/private keypair used to create, sign, and authenticate Nostr events.

**"Relay"** means a server implementing the Nostr protocol for receiving, storing, indexing, or redistributing Nostr events.

**"Transponder"** means the optional push notification relay service operated by IPF for White Noise.

**"User content"** means any message, media, Nostr event, profile information, metadata, support submission, report, or other material you submit, publish, transmit, or make available through the Service.

---

## 3. Eligibility and Acceptance

You may use the Service only if you can form a binding agreement under applicable law or a parent or legal guardian agrees to these Terms on your behalf where required.

You must be at least 13 years old to use White Noise. If you are aged 13 through 15, you must have the involvement and consent of a parent or legal guardian. You must also satisfy any additional requirements under applicable law.

If you use the Service on behalf of an organization, you represent that you are authorized to bind that organization to these Terms.

---

## 4. Scope of the Service

White Noise is software that helps you create, send, receive, and manage encrypted communications over decentralized infrastructure.

IPF provides White Noise software and operates Nostr relays and certain optional supporting services. IPF-operated relays accept only the event kinds needed for White Noise to function. IPF does not operate the Nostr network as a whole or any Blossom servers. When White Noise interacts with third-party relays, media hosts, app stores, or other external services, those systems are governed by their own terms and privacy practices.

White Noise is free to use and will remain free. Donations are voluntary and do not purchase or create any entitlement to paid features, storage, support, priority access, or any particular level of service or availability.

Use of the broader Nostr network, third-party relays, and third-party Blossom servers is outside the scope of these Terms except to the extent your use also involves IPF-controlled infrastructure.

---

## 5. Non-Custodial Design and Key Responsibility

White Noise is designed to be non-custodial. Your Nostr private key is generated and stored locally on your device unless you choose to export or back it up elsewhere.

You are responsible for:

- securing your device;
- protecting your private key, any recovery material, and backups;
- choosing which relays and Blossom servers to use; and
- verifying who you are communicating with.

IPF does not store your private key and cannot recover it for you. Recovering or importing your Nostr identity key does not by itself restore message history or MLS group state. Removing local app data can permanently erase those records even if you retain your identity key.

---

## 6. Optional and Third-Party Infrastructure

White Noise may interact with both optional IPF-operated services and third-party infrastructure.

**IPF-operated relays.** Public events published to these relays are publicly accessible. Private communications are stored and transmitted as encrypted events that IPF cannot decrypt. IPF may observe connection information and event metadata as described in the [Privacy Policy](/privacy). Relay operation does not give IPF access to encrypted group conversations.

**Transponder.** If you enable push notifications, White Noise may use Transponder, an optional notification relay operated by IPF. Transponder helps route encrypted notification events to your device. It is not required to use White Noise messaging itself.

**Optional usage, telemetry, and diagnostics.** White Noise offers optional usage and telemetry sharing and separate group diagnostic-log sharing with IPF-operated services, including Goggles. These choices are off by default and governed by separate in-app controls and disclosures. Accepting these Terms does not enable them. Details, including automatic uploads where enabled, withdrawal, and retention, are in the [Privacy Policy](/privacy).

**Other third-party features.** Features such as GIF search, web image search, and speech recognition may contact third-party providers when used. Availability varies by client. The Privacy Policy describes these interactions; the providers have their own terms and privacy practices.

**Third-party relays and Blossom servers.** White Noise is built to work with independently operated relays and media hosts. Those operators may set their own rules, retention periods, technical limits, and terms of use. IPF is not responsible for their availability, security practices, moderation decisions, or data retention.

IPF is not responsible for outages, content loss, message delay, duplicate storage, or deletion caused by third-party infrastructure.

---

## 7. Acceptable Use

White Noise does not tolerate objectionable content or abusive behavior. You must not use the Service to harass, bully, threaten, exploit, or sexually abuse others, distribute child sexual abuse material, incite violence, or distribute other unlawful or abusive content.

You agree to use the Service lawfully and in a way that does not interfere with IPF-controlled infrastructure or other users.

You may not:

- use IPF-controlled infrastructure in violation of applicable law;
- attempt to gain unauthorized access to the Service or related systems;
- interfere with, disrupt, degrade, overload, or attack IPF-controlled infrastructure;
- distribute malware, malicious code, or other harmful material through IPF-controlled infrastructure;
- use IPF-controlled infrastructure for spam, denial-of-service activity, abusive automation, or fraud;
- infringe the intellectual property, privacy, publicity, or other rights of others through material you intentionally submit to IPF-controlled public surfaces, support channels, or other IPF-operated services; or
- circumvent technical restrictions or security controls on IPF-controlled infrastructure.

Because White Noise is end-to-end encrypted and decentralized, IPF does not claim general monitoring authority over your private messages. These Terms are enforced only to the extent reasonably possible on infrastructure IPF actually controls.

---

## 8. Blocking, Reporting, and Group Moderation

**Blocking.** White Noise uses Nostr mute lists to let you block other users. Blocking hides messages and invitations from those users in White Noise. It does not prevent them from publishing events to the Nostr network, using other applications, or contacting you through another identity. Blocking is a personal filtering control, not a network-wide ban.

**In-group reporting.** You can report a message within its encrypted group for a specified reason. Reports, including their reasons and message identifiers, remain entirely within that encrypted group and are visible to all group members. This reporting mechanism does not send message contents, report reasons, or report identifiers to IPF for review. IPF cannot read these reports or the group conversation.

**Administrator moderation.** Only group administrators can act on reports through group moderation controls and decide what action to take concerning a reported message or a user's participation in the group. Administrator deletion hides a message in cooperating clients. It does not remove the encrypted event from relays, erase copies retained by recipients, or guarantee that other clients will honor the deletion. An in-group report does not identify the corresponding relay event to IPF for removal.

**IPF's role.** IPF does not review or moderate the contents of encrypted group conversations. IPF may enforce these Terms on infrastructure it operates, including restricting relay access or removing stored events where technically possible. Infrastructure enforcement is separate from in-group reporting and does not give IPF access to decrypted messages or control over other relays or recipients' devices.

---

## 9. User Content and Your Rights

You retain ownership of your user content.

These Terms do not transfer ownership of your messages, media, profile data, or other content to IPF.

If you choose to transmit, upload, or submit user content through IPF-controlled infrastructure, you grant IPF a limited, non-exclusive, worldwide, royalty-free license to host, cache, transmit, and process that content only as reasonably necessary to operate the specific IPF-controlled service you use, maintain security, comply with law, and enforce these Terms.

This license is limited to operation of the Service. It does not give IPF the right to sell your content, use it for advertising, or claim ownership of it.

This license does not expand IPF's ability to access end-to-end encrypted message content.

IPF may use ideas and suggestions you voluntarily provide to improve the Service without an obligation to compensate you. Personal information, support submissions, and diagnostic logs remain subject to the Privacy Policy; this permission does not authorize unrestricted use or disclosure of those records.

You are responsible for the content you create, send, publish, or submit using the Service and for ensuring that you have the rights needed to do so.

---

## 10. Software License and Open-Source Components

To the extent White Noise or any of its components are provided under an applicable open-source license, that license governs your rights in that code.

These Terms do not limit rights granted under applicable open-source licenses. Accepting, rejecting, or terminating these Terms does not revoke those rights.

Subject to these Terms, you may access IPF-operated services for their intended purpose. This permission does not grant ownership of IPF trademarks or non-open-source materials, or a right to use those materials beyond permissions expressly granted by IPF or applicable law.

---

## 11. Privacy

Please read the [White Noise Privacy Policy](/privacy) to understand how IPF handles information processed through IPF-controlled infrastructure.

The Privacy Policy explains how IPF handles information; it is not a substitute for any consent required by applicable law. Accepting these Terms does not consent to or enable optional usage and telemetry or group diagnostic-log sharing. Those features require their own affirmative choices, as described in the Privacy Policy.

---

## 12. Service Availability, Changes, and Support

White Noise and related IPF-controlled services may change over time. IPF may add, modify, suspend, or discontinue features when reasonably necessary for maintenance, security, legal compliance, or technical reasons.

Where practical, IPF will provide reasonable notice of material changes to IPF-controlled services. Not every change will be announced in advance.

IPF does not guarantee that the Service, or any part of it, will always be available, uninterrupted, or compatible with every device, operating system, relay, or third-party service.

Any support provided by IPF is on a reasonable-efforts basis unless IPF expressly states otherwise.

---

## 13. No Emergency Services

White Noise is not a replacement for emergency services and does not provide access to emergency responders, public safety answering points, hospitals, police, or fire services.

Do not rely on White Noise to contact emergency services or to send time-critical emergency communications.

---

## 14. Disclaimers

The Service is provided on an "as is" and "as available" basis to the maximum extent permitted by applicable law.

IPF disclaims all warranties, whether express, implied, or statutory, including implied warranties of merchantability, fitness for a particular purpose, title, non-infringement, and any warranty that the Service will be uninterrupted, error-free, or free from loss.

IPF does not warrant that:

- messages or media will always be delivered, stored, or retrievable;
- third-party relays or Blossom servers will remain available;
- encrypted communications will remain accessible if you lose device access, lose keys, expose recovery material, or rely on malicious or compromised infrastructure; or
- the Service will meet your specific requirements.

Cryptography can reduce risk. It cannot eliminate device compromise, malicious recipients, user error, relay failure, or third-party service failure.

---

## 15. Limitation of Liability

To the maximum extent permitted by applicable law, IPF and its directors, officers, employees, contractors, and agents will not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or for any loss of profits, revenues, goodwill, use, messages, content, or data, arising out of or related to the Service or these Terms.

To the maximum extent permitted by applicable law, IPF's total aggregate liability for all claims arising out of or related to the Service or these Terms will not exceed the greater of:

- USD 100; or
- the amount you paid directly to IPF, if any, for White Noise-related services in the 12 months before the event giving rise to the claim.

Nothing in these Terms limits liability that cannot be limited under applicable law, including liability for fraud, willful misconduct, gross negligence, or death or personal injury caused by negligence where such limits are prohibited.

Some jurisdictions do not allow certain disclaimers or limitations of liability. In those jurisdictions, these limitations apply only to the extent permitted by law.

---

## 16. Suspension and Termination

You may stop using the Service at any time. Stopping use, disabling optional sharing, removing local profiles or data, and requesting deletion of records held by IPF are separate actions. See the [Privacy Policy](/privacy#section-14) for deletion instructions and the limits of deletion on decentralized infrastructure.

IPF may suspend or restrict access to IPF-controlled infrastructure if reasonably necessary to:

- address violations of these Terms;
- protect the security, integrity, or availability of the Service;
- comply with law or a lawful request; or
- prevent material harm to IPF, users, or third parties.

Where reasonable, IPF will provide notice and an opportunity to address the issue before suspension or restriction. IPF may act without prior notice if immediate action is reasonably necessary.

IPF may also discontinue some or all IPF-controlled services at any time. If that happens, IPF will try to provide reasonable notice where practical.

Suspension, restriction, or discontinuation of IPF-controlled infrastructure does not by itself prevent you from using software already installed on your device or from interacting with third-party relays or Blossom servers where technically possible.

Suspension or termination by IPF under these Terms applies only to IPF-controlled infrastructure. It does not give IPF control over third-party relays, Blossom servers, or the Nostr network.

Sections that by their nature should survive termination will survive, including disclaimers, limitation of liability, governing law, disputes, and general terms. The operational user-content license survives only to the extent and for as long as necessary for remaining service operations, security, or legal obligations, subject to the Privacy Policy and applicable retention limits.

---

## 17. Governing Law and Disputes

These Terms are governed by the laws of the State of Wyoming, excluding its conflict-of-laws rules, except to the extent non-waivable consumer protection laws of your place of residence apply.

Before filing a legal claim, you and IPF agree to try in good faith to resolve the dispute informally by written notice. The receiving party will have 30 days to respond.

If a dispute cannot be resolved informally, either party may bring a claim in any court of competent jurisdiction. Either party may also seek relief in small claims court where available and appropriate.

Nothing in these Terms requires arbitration, waives a class action by default, or limits rights that cannot be waived under applicable law.

---

## 18. Changes to These Terms

IPF may update these Terms from time to time.

If IPF makes a material change, IPF will provide reasonable notice through the Service, on an IPF-controlled website, or by another appropriate means where practical. Changes will apply prospectively from the effective date of the updated Terms.

If you continue to use the Service after the updated Terms take effect, you agree to the updated Terms. If you do not agree, you must stop accessing IPF-operated services under these Terms. Your rights under applicable open-source licenses remain unaffected. Changes to these Terms do not replace separate consent required for optional data sharing.

---

## 19. General

If any provision of these Terms is held unenforceable, the remaining provisions will remain in effect.

IPF's failure to enforce a provision of these Terms is not a waiver of its right to do so later.

These Terms, together with any additional terms that expressly apply to a specific IPF-operated feature, form the entire agreement between you and IPF regarding the Service.

You may not assign or transfer these Terms without IPF's consent. IPF may assign these Terms in connection with a reorganization, merger, asset transfer, or change in the operator of the Service.

---

## 20. Contact

For questions about these Terms, contact:

Internet Privacy Foundation  
30 N Gould St #57037  
Sheridan, WY 82801  
privacy@ipf.dev  
https://ipf.dev
