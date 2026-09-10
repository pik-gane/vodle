import { test } from "node:test";
import assert from "node:assert/strict";
import { JOIN_KEY_TYPE, KNOCK_REASON_PREFIX, joinKey, joinProof, proofFromReason, verifyKnock } from "./knock.js";

// the same vectors are asserted by the app's WebCrypto implementation
// (src/app/matrix.service.spec.ts), so both sides must agree on them:
const KEY = "1917c4c7c724b2f6307dd2cbaf7538a2618a925d2a902c0a4d38e46f1d9c3a3c";
const PROOF_ALICE = "c5064909af02e76c78ffacb447945cac75e30979fe9cc429c93b74d40ab54885";
const PROOF_BOB = "d1d801f71059f6faa198ebf14e8f3c8c65fd9dcb78b58bf792e8c510948eb686";

test("joinKey and joinProof match the shared test vectors", () => {
  assert.equal(JOIN_KEY_TYPE, "m.room.vodle.poll.join_key");
  assert.equal(joinKey("P1", "secret"), KEY);
  assert.equal(joinProof(KEY, "@alice:example.org"), PROOF_ALICE);
  assert.equal(joinProof(KEY, "@bob:example.org"), PROOF_BOB);
  assert.notEqual(joinKey("P1", "secret2"), KEY);
  assert.notEqual(joinKey("P2", "secret"), KEY);
});

test("proofFromReason reads only well-formed vodle knocks", () => {
  assert.equal(proofFromReason(KNOCK_REASON_PREFIX + PROOF_ALICE), PROOF_ALICE);
  assert.equal(proofFromReason(PROOF_ALICE), null);                       // no prefix
  assert.equal(proofFromReason(KNOCK_REASON_PREFIX + "abc"), null);       // not 32 bytes of hex
  assert.equal(proofFromReason(KNOCK_REASON_PREFIX + PROOF_ALICE.toUpperCase()), null);
  assert.equal(proofFromReason("vodle-join-v2:" + PROOF_ALICE), null);   // unknown version
  assert.equal(proofFromReason(undefined), null);
  assert.equal(proofFromReason({ reason: PROOF_ALICE }), null);
});

test("verifyKnock accepts the right proof for the knocking user only", () => {
  const key = { version: 1, key: KEY };
  assert.ok(verifyKnock(key, "@alice:example.org", KNOCK_REASON_PREFIX + PROOF_ALICE));
  assert.ok(verifyKnock(key, "@bob:example.org", KNOCK_REASON_PREFIX + PROOF_BOB));
  // alice's proof does not let bob in (a proof seen in transit is bound to its user):
  assert.ok(!verifyKnock(key, "@bob:example.org", KNOCK_REASON_PREFIX + PROOF_ALICE));
  // a proof computed from another password:
  assert.ok(!verifyKnock(key, "@alice:example.org", KNOCK_REASON_PREFIX + joinProof(joinKey("P1", "wrong"), "@alice:example.org")));
  // malformed or missing reasons:
  assert.ok(!verifyKnock(key, "@alice:example.org", undefined));
  assert.ok(!verifyKnock(key, "@alice:example.org", ""));
  assert.ok(!verifyKnock(key, "@alice:example.org", "please let me in"));
  assert.ok(!verifyKnock(key, "", KNOCK_REASON_PREFIX + PROOF_ALICE));
});

test("verifyKnock refuses when the room has no usable join key", () => {
  const reason = KNOCK_REASON_PREFIX + PROOF_ALICE;
  assert.ok(!verifyKnock(undefined, "@alice:example.org", reason));
  assert.ok(!verifyKnock({}, "@alice:example.org", reason));
  assert.ok(!verifyKnock({ version: 2, key: KEY }, "@alice:example.org", reason));
  assert.ok(!verifyKnock({ version: 1, key: "not hex" }, "@alice:example.org", reason));
  assert.ok(!verifyKnock({ version: 1, key: KEY.slice(2) }, "@alice:example.org", reason));
});
