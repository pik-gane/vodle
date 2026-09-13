# Who can see what, and infer what about whom

This describes the **Matrix backend** as it stands after [#327](https://github.com/pik-gane/vodle/issues/327). Every claim below names the mechanism it rests on, so it can be checked against the code rather than believed. Where the legacy **CouchDB backend** differs, §9 says so; where it does *not* differ, that is said too, because several of the limits below are inherited from the original design rather than introduced by the port.

This is an engineering document. It is not the privacy statement a deployment shows its users — see `deployment/MATRIX.md` §4 for what that has to say — but it is what such a statement should be written from.

---

## 1. The pieces

**Three kinds of account.**

| Account | Name on the homeserver | What it does |
|---|---|---|
| The person's own | `@<BLAKE2s(e-mail)>:<server>` (`hashEmail`) | owns the *user room*, and joins no poll |
| One per (poll, voter) | `@<BLAKE2s("vodle.poll."+pid+".voter."+vid)>:<server>` (`pollAccountName`) | joins the poll room, owns that voter's room, sends every event of that poll |
| The guard bot | `@vodle-guard:<server>` | power 100 in every poll and voter room; closes them at the deadline, answers knocks |

A guest (a magic link opened on a device with no account) gets a person's account with random credentials, and poll accounts under it like anyone else.

The poll account's password is `BLAKE2s("vodle-matrix-poll:" + pid + ":" + vid + ":" + <user password>)` — derived, never equal to the person's own, so a poll account cannot hand the user's password back.

**Three kinds of room.**

| Room | Alias | Who is in it | Holds |
|---|---|---|---|
| User room | none | the person's own account, alone | user data: settings, and one entry per poll the person takes part in |
| Poll room | `#vodle_poll_<pid>` | the poll accounts of the participants, plus the bot | poll metadata, options, deadline, lifecycle state, voter-room announcements, delegation events |
| Voter room | `#vodle_voter_<pid>_<base64url(vid)>` | one poll account (power 50), the bot (100), the other participants read-only | that voter's ratings and delegation records |

Poll rooms are `knock`: a joiner proves it holds the poll password and the bot invites it. Voter rooms are `restricted` to the poll room's members, so discovery works without invitations. Neither is in the public room directory.

**What is encrypted, and with what.**

| Content | Where | Protection |
|---|---|---|
| poll title, description, type, language | state events `m.room.vodle.poll.data.*`, `m.room.vodle.poll.meta` | AES-GCM under the **poll password** |
| option texts | timeline events `m.room.vodle.poll.option` | same; the option id stays plain |
| ratings | state events `m.room.vodle.voter.rating.rating.<oid>` in the voter's room | same; the vid and the option id stay plain |
| delegation request / response | timeline events in the poll room; state events in the voter rooms | same; the delegation id stays plain |
| user settings and poll memberships | state events `m.room.vodle.user.*` in the user room | AES-GCM under the **user's vodle password** |
| `consent`, `last_access` | user room | **plain**, as on CouchDB |
| deadline, lifecycle state | `m.room.vodle.poll.deadline`, `...poll.state` | **plain** — the guard bot has to read them |
| voter-room announcement | timeline event `m.room.vodle.voter.announce` in the poll room | **plain**: `{voter_id: vid, vodle_vid: vid, voter_room_id}` |
| the vid | voter-room alias, topic, and `m.room.vodle.voter.vid` | **plain** |

The AES key is PBKDF2-SHA-256, 600 000 iterations, salted per poll (`vodle-poll-<pid>`) or per user (`user:<user id>`). Matrix's own end-to-end encryption is **off** and would not help: everything above is a *state* event, which megolm never covers.

**One rule that shapes everything below**: a vodle data key becomes part of the Matrix **event type** — `m.room.vodle.user.poll.<pid>.myvid`, `m.room.vodle.voter.rating.rating.<oid>`, `m.room.vodle.poll.data.del_private_key.<did>`. Values are encrypted; **key names never are**. Most of what the homeserver can infer, it infers from key names.

---

## 2. The actors

| Who | Reaches |
|---|---|
| **The homeserver operator** | the database: every room, event, membership, timestamp, IP address, device and user agent |
| **The guard bot** | every poll and voter room it is in, as a member with power 100 |
| **A co-participant** | the poll room and every voter room of that poll, and the poll password |
| **Someone holding the magic link** | the same — the link *is* the poll password |
| **Anyone else with an account** | nothing: poll rooms need a knock with a proof, voter rooms need poll-room membership |
| **Another homeserver** | the rooms of polls its own users take part in, in full: federation replicates events, not just those a client asks for |
| **A network observer** | TLS only; sizes and timing |

---

## 3. What the homeserver operator sees

**Metadata, in the clear:**

- every poll's id, when it was created, its deadline, its lifecycle state, how many options it has and how many voters;
- which poll accounts are in which poll — that is, the participation graph *by poll account*;
- for each voter: which option ids they hold a rating for, **when each rating was written, and how often it changed** — the values are ciphertext, the behaviour is not;
- each voter's vid (in the alias, the topic, the announcement and the `voter.vid` state event) and hence the poll account that goes with it, since the account name is a hash of `(pid, vid)`;
- **which polls each person takes part in** — see the next paragraph;
- the person's `consent` record and the month of their last access.

**The one that matters: the user room names the polls.** The person's own account holds one user-data entry per poll — `poll.<pid>.myvid`, `poll.<pid>.password`, `poll.<pid>.state` — and the poll id is in the event *type*. So the operator can read, straight out of a person's user room, the list of polls they take part in. The values (the vid, the poll password) are encrypted and stay so; the participation does not.

This is the honest limit of the per-poll accounts: **they make two of a person's polls unlinkable to co-participants and to anyone reading the poll rooms, not to the operator of the homeserver holding the user room.** The CouchDB backend has exactly the same property — the user database holds documents `~<hash>§poll.<pid>.state` — so this is not something the Matrix port lost; it is something neither design ever had. §8 says what would have to change.

**Contents the operator does not get**, short of the attacks in §8: poll titles and descriptions, option texts, rating values, delegation details, and everything in a user room beyond consent and last access.

**Linking accounts to a person.** The operator also has the `user_ips` table: every account's IP address, user agent and device. A person's poll accounts are signed in from one device, minutes apart, from one address — so an operator who wants to correlate them can, whatever the account names say. This is true of the CouchDB backend too, and of any client-server protocol; nothing vodle does at the application layer changes it.

**Confirming a guess at who has an account.** `hashEmail` is an unsalted BLAKE2s of the lowercased address. The operator cannot invert it, but can test any address they care to guess — one hash per guess. So "does *this* person use this deployment" is answerable; "who are all these people" is not.

---

## 4. What the guard bot sees

The bot is a full member of every poll and voter room with power 100. It therefore sees everything the operator sees for those rooms, and it is trusted not to abuse the power: it *could* rewrite power levels, close a poll early, or admit a knocker who proved nothing. It cannot read anything encrypted — it never holds a poll password or a user password — and the deployment guide says to run it on the same host as the homeserver, where it is under the same administration anyway.

It needs the deadline and the lifecycle state in the clear. That is why those two are the only poll fields left unencrypted.

---

## 5. What a co-participant sees

A participant holds the poll password, so within that poll they see **everything**: the title, the options, and every voter's ratings, keyed by vid. That is by design — vodle's method needs every participant to be able to recompute the tally.

What they do *not* see is who a vid is. Every event of the poll is sent by a poll account whose name is a hash of `(pid, vid)`, so the sender adds nothing the vid did not already say. Before #327 this was false: one account per person sent every poll's events, so two vids in two polls with the same sender were the same person, and a participant in both could read it off the sender field.

Two things can still unmask a vid, and neither is the protocol's doing:

- **The invitation.** Whoever sent a magic link knows who they sent it to. With one invitee, the vid that appears next is theirs.
- **The content.** A poll of three people, or a rating pattern only one person would produce, identifies itself.

---

## 6. Delegations

Delegation is **disabled in both environments** (`environment.delegation.enabled`). What follows is what it would expose if it were switched on. Read §6.3 before switching it on.

### 6.1 How a delegation is recorded

A delegator generates a delegation id `did` and a keypair, sends a magic link `.../delrespond/<pid>/<did>/<from>/<private key>` out of band (`from` is a nickname they type), and records the request. The delegate opens the link, signs a response with that private key, and records it. Both records live in vodle's ordinary data, plus a pair of timeline events in the poll room for live notification:

| Record | Written by | Lives in | Event type (plain) | Value |
|---|---|---|---|---|
| `del_request.<did>` | delegator | delegator's voter room | `m.room.vodle.voter.rating.del_request.<did>` | encrypted |
| `del_response.<did>` | delegate | delegate's voter room | `m.room.vodle.voter.rating.del_response.<did>` | encrypted |
| `del_private_key.<did>`, `del_nickname.<did>` | delegator | poll room | `m.room.vodle.poll.data.del_private_key.<did>` | encrypted |
| `del_incoming.<did>` | delegate | **delegate's user room** | `m.room.vodle.user.del_incoming.<did>` | encrypted |
| request / response notification | each | poll room timeline | `m.room.vodle.vote.delegation_request` / `_response` | `delegation_id` plain, the rest encrypted |

### 6.2 What that reveals

**To a co-participant**: the whole delegation graph, by vid, with the option sets and the accept/decline — they hold the poll password. As with ratings, that is deliberate: delegation changes the tally, and the tally has to be checkable.

**To the homeserver operator**, from the plaintext event types alone, without decrypting anything:

- that a delegation `did` exists in poll `pid`, and when;
- **which vid is the delegator** — their voter room carries `del_request.<did>`;
- **which vid is the delegate** — their voter room carries `del_response.<did>`, and whether they answered at all.

So the operator gets the delegation graph by vid for free. Not the option sets, not accept-versus-decline (both are inside the encrypted value), not who the vids are.

### 6.3 The part that must be fixed before delegation is enabled

`del_incoming.<did>` sits in the **delegate's user room**, which belongs to their *personal* account, while `del_request.<did>` sits in the delegator's voter room inside poll `pid`. The `did` is plaintext in both event types. Matching them tells the operator that the person behind that personal account takes part in that poll — a link from a real identity to a poll, established by the delegation alone.

As it happens this changes nothing today, because §3 already gives the operator the same fact from `poll.<pid>.myvid` in the same room. But the two should be fixed together: whatever makes the user room stop naming polls must also make it stop naming delegation ids, or the leak simply moves. The same holds on CouchDB, where `del_incoming.<did>` is a document id in the user database.

---

## 7. What is out of reach for everyone

- **The poll password never reaches any homeserver.** It travels in the magic link, and lives in the user room (encrypted under the user's own password) and the device's local storage.
- **The user's vodle password never reaches the homeserver as itself** — the login sends `BLAKE2s("vodle-matrix-login:" + e-mail + ":" + password)`. See §8 for how much that is worth.
- **Poll contents** — titles, options, ratings, delegation details — are AES-GCM ciphertext to anyone without the poll password.
- **A poll is not discoverable by browsing.** Neither poll rooms nor voter rooms are published to the room directory, so there is no list to walk. A knock without a valid proof is left unanswered rather than declined, so a knocker learns nothing about the members or the state — deliberately, since any answer would itself be a membership change.

  What this does *not* hide: an alias resolves for anyone who can name it, so someone who knows a poll id can confirm that the poll exists (and, knowing a vid too, that the voter room exists). Poll ids are 8 hex characters — 32 bits — which is enough that they cannot be guessed one at a time against a rate-limited server, but they are not a secret: the poll password is.

---

## 8. Known weaknesses, by what they would cost

Ordered by how hard they are to exploit, hardest last.

1. **The user room names a person's polls** (§3). No attack required — it is plaintext metadata in the operator's own database. This is the largest single gap between what vodle promises and what it delivers against the operator. Fixing it means taking the poll id out of the user-data key: store the entries under an opaque per-user key (a keyed hash of the pid) and keep the pid inside the encrypted value, so a second device can still enumerate its polls by decrypting rather than by reading key names. It is a change to both backends and to the second-device restore path, and it needs a migration for existing accounts, which is why it is written down here rather than done in passing.

2. **A delegation links a personal account to a poll** (§6.3). Same shape, same fix.

3. **The vodle password, against an operator who records login requests.** `deriveMatrixPassword` is a single BLAKE2s. Synapse stores bcrypt of what the client sends, so the stored form is not the problem — but the request body is the fast-hashed password, and an operator who logs it can run a dictionary attack at one BLAKE2s per guess and recover a human-chosen password. With the password they can decrypt the user room. The derivation exists so the operator does not get the password *directly*; it does not make guessing it expensive. Making the login password a slow derivation (PBKDF2 or argon2 over the same input) would close this, at the cost of a migration for every existing account.

4. **The poll password, from the join key.** The poll room carries `m.room.vodle.poll.join_key` = SHA-256(`"vodle-join:" + pid + ":" + password`) so the bot can verify knocks. Readable by any room member and by the operator. The poll password is 16 hex characters — **64 bits**. Attacking it through the encrypted data means PBKDF2 at 600 000 iterations per guess, which is hopeless; attacking it through the join key means one SHA-256 per guess, which is about 58 GPU-years, or a couple of days for someone with a thousand GPUs and a reason to care about one particular poll. Nobody but a member or the operator can read the join key, and a member already knows the password — so this matters for the operator, and for a member who has since left. Deriving the join key with the same slow KDF would remove the shortcut; existing polls would need the joiner to offer both proofs until they age out.

5. **Correlation by IP address and timing** (§3). Not fixable at the application layer. It is the reason this document says *unlinkable to co-participants*, and does not say *unlinkable to the operator*.

6. **Confirming that a given e-mail address has an account** (§3). One hash per guess, because the hash is unsalted. Salting it would break the derivation that lets a second device find its own account from the address alone, so this one is a deliberate trade.

Nothing in this list is a regression introduced by the per-poll accounts; 1, 2, 3 and 6 predate them and hold on the CouchDB backend too.

---

## 9. Where the CouchDB backend differs

| | CouchDB | Matrix |
|---|---|---|
| account per (poll, voter) | yes — `vodle.poll.<pid>.voter.<vid>` | yes, since #327 |
| user account | `vodle.user.<hash of e-mail and password>` | `@<hash of e-mail>` |
| the user store names the polls | yes, in document ids | yes, in event types |
| poll contents encrypted under the poll password | yes | yes |
| server sees rating timing per voter | yes | yes |
| who enforces the deadline | a validation function in the database | the guard bot |
| participation visible to other participants | database membership | room membership |
| cross-homeserver polls | no | yes — and the remote homeserver then holds the whole poll |

The move to Matrix did not weaken the privacy model, and #327 restored the one thing it had lost (one account per poll rather than one per person). It did add federation, which means a poll joined from another homeserver is replicated there in full, with the same metadata visibility as on the home server.

---

## 10. What goes away, and when

- The guard bot removes a poll's rooms `RETENTION_DAYS` after the deadline (365 by default) — through the Synapse admin API where `ADMIN_PURGE` is set, so the data leaves the server; otherwise by leaving them, which leaves them on disk.
- A poll a user deletes locally is left and forgotten by their client; the rooms survive until retention removes them.
- A guest who later logs in with an address of their own has their guest account deactivated; its rating events stay as the voter rooms' state, since they are the poll's data rather than the account's.
- **Nothing is erased retroactively.** A poll from before the per-poll accounts (§5) carries, in its room history, announcements sent by the person's own account with the vid in plain text. The handover that makes such a poll writable again (`takeOverFrom`) is itself a power-levels event sent by the personal account naming the poll account, so it is another such link — for polls that were already linked, and only those, since the handover runs only where the personal account already held the rooms. Unlinkability is a property of polls started from #327 onwards.
