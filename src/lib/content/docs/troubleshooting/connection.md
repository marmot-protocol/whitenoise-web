# Connection

**Outcome:** White Noise reaches relays again, so messages can send and arrive.

White Noise cannot guarantee connectivity. Network providers and governments can block servers or restrict internet access. Encryption protects message content, but relay operators can still see connection details such as your IP address.

## Diagnose

1. Check that the device has internet access by trying another app.
2. Switch networks, for example from Wi-Fi to mobile data, to see whether one network blocks relays.
3. If you use a VPN or proxy, test with it on and with it off, but only where that is safe for you. Some VPNs block relay connections, and some networks only work through one.
4. Review your relay configuration. Messages can travel through several relays, so add a reachable relay that the other participants also use. Your relay choices have to work for the whole group.
5. Running your own compatible Nostr relay gives you control of that server. Copies held on other relays stay outside your control.
6. For an agent, make sure the computer running the connector has network access and that the connector is running.

## Expected result

Once the connection recovers, check pending messages and retry any marked as failed. Confirm delivery with the recipient; see [Delivery problems](/docs/troubleshooting/delivery).

## Escalation

Report the version, platform, network type, whether a VPN was on and the relays involved. Relay addresses can reveal information about you, so share them only where you are comfortable doing so.
