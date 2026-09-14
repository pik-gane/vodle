/*
 * The "[vodle boot] +Nms <stage>" lines, as stages with the time each took.
 *
 * What matters is the gap BETWEEN two stages. A total hides a single stage
 * that has gone wrong and an average hides it twice over: the owner's guest
 * spent 25.9 s of a 29.5 s start inside one of them (initRustCrypto), and
 * nothing but the per-stage delta points at it (#327).
 *
 * There are two stopwatches — DataService's, from the app starting, and
 * MatrixService's, from the client being set up — and both print the same
 * prefix, so a run ends wherever the milliseconds go backwards.
 *
 * Run `node scripts/boot-stages.js --self-test` to check the parsing against
 * the log that found the crypto-store defect.
 */
'use strict';

function boot_stages(lines) {
  const runs = [];
  let run = null, previous = 0;
  for (const line of lines) {
    const m = String(line).match(/\[vodle boot\] \+(\d+)ms (.*)$/);
    if (!m) { continue; }          // the un-stopwatched lines around the login
    const at = parseInt(m[1], 10), stage = m[2].trim();
    if (!run || at < previous) { run = []; runs.push(run); previous = 0; }
    run.push({ stage, at, took: at - previous });
    previous = at;
  }
  return runs;
}

/** the slowest single stage across every run, and what it was */
function slowest_stage(lines) {
  let worst = { stage: '(none)', took: 0, at: 0 };
  for (const run of boot_stages(lines)) {
    for (const s of run) { if (s.took > worst.took) { worst = s; } }
  }
  return worst;
}

module.exports = { boot_stages, slowest_stage };

if (require.main === module && process.argv.includes('--self-test')) {
  const assert = require('assert');

  // verbatim from the owner's guest console, the load that took 29.5 s
  const guest = [
    '[vodle boot] +0ms data service init ',
    '[vodle boot] +1ms local storage created ',
    '[vodle boot] +38ms restored from local storage state found',
    '[vodle boot] +41ms resuming the stored session ',
    '[vodle boot] reading the stored credentials',
    '[vodle boot] stored credentials read (none)',
    '[vodle boot] +46ms no stored session, logging in with the password ',
    '[vodle boot] logging in with the password',
    '[vodle boot] the homeserver accepted the password',
    '[vodle boot] +318ms this poll needs the homeserver; waiting for the login ',
    '[vodle boot] +0ms client setup begins @9d6080d5:example.org',
    '[vodle boot] +21ms sync store ready IndexedDB',
    '[vodle boot] +1562ms crypto WASM loaded ',
    '[vodle boot] +27429ms end-to-end encryption ready ',
    '[vodle boot] +27430ms queued writes and own ratings restored 0 queued',
    '[vodle boot] +27480ms syncing started ',
    '[vodle boot] +28898ms logged in to the homeserver ',
    '[vodle boot] +29522ms user data synced; the backend is ready ',
  ];

  const runs = boot_stages(guest);
  assert.strictEqual(runs.length, 2, 'two stopwatches, so two runs');
  assert.strictEqual(runs[0][0].stage, 'data service init');
  assert.strictEqual(runs[1][0].stage, 'client setup begins @9d6080d5:example.org');

  const worst = slowest_stage(guest);
  assert.strictEqual(worst.stage, 'end-to-end encryption ready',
    'the slowest stage must be the one that was actually slow');
  assert.strictEqual(worst.took, 27429 - 1562, 'the gap, not the timestamp');
  assert.ok(worst.took > 15000, 'a 15 s ceiling would have caught it');

  // the creator's own gap, from the same test
  const creator = [
    '[vodle boot] +0ms data service init ',
    '[vodle boot] +24ms restored from local storage state found',
    '[vodle boot] +10161ms resuming the stored session ',
  ];
  const creator_worst = slowest_stage(creator);
  assert.strictEqual(creator_worst.stage, 'resuming the stored session');
  assert.strictEqual(creator_worst.took, 10161 - 24);

  // a healthy start must not trip the ceiling
  const healthy = [
    '[vodle boot] +0ms client setup begins ',
    '[vodle boot] +39ms sync store ready IndexedDB',
    '[vodle boot] +1362ms crypto WASM loaded ',
    '[vodle boot] +2853ms end-to-end encryption ready ',
    '[vodle boot] +2999ms syncing started ',
  ];
  assert.ok(slowest_stage(healthy).took < 15000, 'a good start stays well under the ceiling');

  assert.deepStrictEqual(slowest_stage([]), { stage: '(none)', took: 0, at: 0 });
  assert.strictEqual(boot_stages(['nothing to do with the boot log']).length, 0);

  console.log('boot-stages self-test: all assertions passed');
}
