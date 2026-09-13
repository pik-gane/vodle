/**
 * Closed poll rooms (#328) — the pure part of the guard bot's doorman role,
 * without the SDK, so that it can be unit-tested with `node --test knock.test.js`.
 *
 * A poll room's join rule is `knock`: nobody joins by knowing the poll id
 * alone, as anyone could while the rooms were public. The room carries a
 * join key K = SHA-256("vodle-join:" + poll id + ":" + poll password) in the
 * state event m.room.vodle.poll.join_key, which the app writes at creation
 * from the poll password of the magic link. A joiner who holds the link
 * knocks with HMAC-SHA-256(K, own user id) as the knock's reason, and this
 * bot — a member with power 100 — verifies the proof against the room's key
 * and invites the knocker, or declines the knock (a kick).
 *
 * What the proof protects: a knocker without the password cannot compute K
 * (a hash of the password, held only in the room's state, which non-members
 * cannot read); a proof seen in transit (the knocker's own homeserver sees
 * it; a remote server receives it in the knock event before it holds the
 * room's state) is bound to one user id and lets no other user in. Members
 * and the room's homeservers can read K, but they hold the poll anyway. K
 * does not reveal the password (12–16 random characters: no preimage
 * search). The app computes the same values with WebCrypto
 * (MatrixService.joinKey / joinProof); the test vectors are shared.
 */
import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const JOIN_KEY_TYPE = "m.room.vodle.poll.join_key";
export const KNOCK_REASON_PREFIX = "vodle-join-v1:";

const HEX_256 = /^[0-9a-f]{64}$/;

/** the join key of a poll (hex) */
export function joinKey(pollId, pollPassword) {
  return createHash("sha256").update("vodle-join:" + pollId + ":" + pollPassword, "utf8").digest("hex");
}

/** the proof (hex) that `userId` knows the poll behind the join key `keyHex` */
export function joinProof(keyHex, userId) {
  return createHmac("sha256", Buffer.from(keyHex, "hex")).update(userId, "utf8").digest("hex");
}

/** the proof carried by a knock's reason, or null when it is not a vodle knock */
export function proofFromReason(reason) {
  if (typeof reason !== "string" || !reason.startsWith(KNOCK_REASON_PREFIX)) return null;
  const proof = reason.slice(KNOCK_REASON_PREFIX.length);
  return HEX_256.test(proof) ? proof : null;
}

/** whether the knock's `reason` proves that the knocker `userId` knows the
 *  poll password behind the room's join key event content `keyContent` */
export function verifyKnock(keyContent, userId, reason) {
  const keyHex = keyContent?.key;
  if (keyContent?.version !== 1 || typeof keyHex !== "string" || !HEX_256.test(keyHex)) return false;
  const proof = proofFromReason(reason);
  if (proof === null || typeof userId !== "string" || userId === "") return false;
  return timingSafeEqual(Buffer.from(joinProof(keyHex, userId), "hex"), Buffer.from(proof, "hex"));
}
