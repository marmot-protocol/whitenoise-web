# Groups

Groups let you chat with several people together.

## Create a group

1. In the chat list, tap **New Message**, then **New Group**.
2. Choose the people you want, then tap **Continue**. Your picks appear under **Selected**.
3. On **Set Up Group**, name the group and set **Disappearing messages**. A name is required when you start alone; unnamed groups show their members.
4. Tap **Create**.

Expected result: the group opens. A group with only you shows **Only you are here**; tap **Add members** to invite people. Tap **Retry** when the chat fails to start. **Chat unavailable** may mean the chat is still syncing, so wait a moment and tap **Retry**.

## Open group info

Open the conversation and tap its header. **Group Info** shows **Group · N members** and quick actions for **About**, **Mute**, **Disappearing**, and **Search**. Non-admins see **Only admins can add or manage members.**

## Edit group details

Only admins can edit, and everyone in the group sees the name and description.

1. Tap **Edit**, or tap **Add Description**.
2. In **Edit Group Info**, change the name or description. Leave the description blank to remove it.
3. Tap **Save**.

To change the picture, tap the group photo. If an update fails, check your connection and try again.

## Manage members and admins

> Removed members lose access to new messages. Removal can't erase messages they already received.

- **Add:** tap **Add People**, then tap **Invite** after selecting people.
- **Remove:** open a member's actions and choose **Remove**.
- **Change roles:** in the same actions, choose **Make Admin** or **Remove Admin**.
- **Step down:** tap **Step Down as Admin**. If you're the last admin, make someone else admin first.
- **From a profile:** under **Groups in Common**, tap **Add to Group**. It lists groups you administer that the person has yet to join.

Admins are labeled **Admin** and listed first. If an action fails, check your connection and retry it.

## Notifications and disappearing messages

Tap **Notifications**. Under **Notify me about**, choose **All messages**, **Only mentions**, or **Nothing**. Tap **Mute** to silence the chat and **Unmute** to restore it. Tap **Retry** when settings fail to load.

> Admins set the disappearing timer for everyone, and expired messages are permanently removed. The timer can't stop saved copies or screenshots.

1. Tap **Disappearing messages**.
2. Choose a preset or **Custom**, then tap **Save**.
3. Tap **Set Timer** to confirm.

## Leave or remove a group

> Leaving stops new messages. History stays on this device until you delete it.

- **Leave:** in Group Info, choose the leave action and confirm at **Leave this group?** In the chat list, you can also choose **Leave Chat**. The row then shows **Left chat**, or **Removed from chat** if someone removed you. **Filter** finds these chats.
- **Archive:** tap **Archive**. It hides the chat from your main list and doesn't notify anyone.

> Deleting permanently removes the chat and its messages from this device. Signing in again won't restore them.

- **Delete:** tap **Delete Local Copy**. In the chat list, choose **Delete Chat**. To delete several, tap **Select chat** and choose **Delete Chats**.

> Ending a group removes everyone permanently. No one can send messages or make changes afterward.

- **End (admins):** tap **End Group** and confirm. **Ending group…** shows while it processes, then **Group ended**.

## Advanced: recover a group

Use these steps only when a group stops syncing. For other diagnostics, see [Settings](/docs/settings/ios).

**Rejoin.** After **Unable to restore group synchronization.**, some invitations retry automatically. Re-invite anyone still missing from Group Info. Then tap **Review Rejoin Invitation**; **Invited by** names the inviter.

> Rejoining replaces this device's group state with the invited copy. Saved history is kept. Only rejoin if you trust the inviter; a newer group version alone isn't proof.

Tap **Rejoin Group** or **Decline Invitation**, or **Cancel** to decide later. If the check fails, tap **Retry**.

**Delete local group.**

> This deletes the group's local history, state, draft, and downloaded media on this device. Other members are unaffected. Rejoining needs a fresh invitation from someone still in the group.

In Group Info, open **Chat Developer Tools**, tap **Delete Local Group**, and confirm.

**Quarantined groups.** White Noise quarantines a stored group when it can't safely load the encryption state. Go to **Settings > Developer Tools > Quarantined Groups** and tap **Retry Recovery**. Tap **Retry Loading** when **Load Failed** appears. A retry keeps your history. Validation and membership also stay as they are. If **Recovery retry failed** appears, try later. The screen reports when every stored group loads.

## Related

- [Messages](/docs/using/messages/ios)
- [Settings](/docs/settings/ios)
- [Groups on Android](/docs/using/groups/android)
