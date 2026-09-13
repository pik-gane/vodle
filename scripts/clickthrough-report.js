/*
 * What the production click-through prints when it fails.
 *
 * The run of 2026-09-12 printed 300 KB of it: the whole console of three
 * browser profiles, most of that the Rust crypto tracing matrix-js-sdk
 * turns on at Debug, one "Failed to load resource" line repeated hundreds
 * of times, and every /_matrix/ request of the run with its full query
 * string. The single line naming the failure sat in the middle, and reading
 * it cost a round trip through the raw log. A report nobody can read is a
 * test nobody can run alone (#327).
 *
 * Run `node scripts/clickthrough-report.js --self-test` to check these.
 */
'use strict';

/** Collapse repeats into counts, biggest first, and cap both how many kinds
 *  come out and how long each line may be. */
function digest(lines, limit = 15, width = 200) {
  const counts = new Map();
  for (const line of lines) {
    const short = String(line).replace(/\s+/g, ' ').slice(0, width);
    counts.set(short, (counts.get(short) || 0) + 1);
  }
  const out = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, limit)
    .map(([text, n]) => (n > 1 ? n + '× ' : '') + text);
  if (counts.size > limit) { out.push('... and ' + (counts.size - limit) + ' more kinds'); }
  return out;
}

/** The last few console lines IN ORDER — what happened just before the
 *  failure — minus the SDK's own tracing, which would fill it on its own. */
function console_tail(lines, limit = 20, width = 200) {
  return lines
    .filter(line => !/^debug: (DEBUG|TRACE|INFO) |^debug: \[Perf\]|^debug: FetchHttpApi/.test(line))
    .slice(-limit)
    .map(line => String(line).replace(/\s+/g, ' ').slice(0, width));
}

/** The report in a dozen lines, for the CI log.
 *
 *  The JSON is some 170 lines, and after it the job prints two artifact
 *  uploads, its cleanup and the whole CouchDB service container's log — so
 *  reading the numbers out of the log meant asking for a 400-line tail and
 *  getting 60 lines of Erlang. A summary this short is reachable in a
 *  100-line tail (#327). */
function summarise(report) {
  const lines = [];
  const r = report || {};
  lines.push('click-through: ' + (r.ok ? 'ok' : 'FAILED'));
  if (!r.ok && r.error) { lines.push('  error: ' + String(r.error).slice(0, 300)); }
  if (r.host_voters !== undefined || r.guest_voters !== undefined) {
    lines.push('  voters: creator ' + r.host_voters + ', guest ' + r.guest_voters);
  }
  if (r.reload) {
    lines.push('  reload: list ' + r.reload.list_ms + ' ms (' + r.reload.list_requests
      + ' /_matrix/), poll shown ' + r.reload.shown_ms + ' ms, all ' + r.reload.voters
      + ' voters ' + r.reload.open_ms + ' ms (' + r.reload.open_requests + ')');
  }
  if (r.returning_ms !== undefined) { lines.push('  returning start: ' + r.returning_ms + ' ms'); }
  const boots = r.boots || r.boot || {};
  for (const who of ['creator', 'guest', 'returning']) {
    const b = boots[who];
    if (!b) { continue; }
    // boots[who] on a pass carries the slowest stage; boot[who] on a failure
    // is the bare stage list, so work it out either way
    const stages = (b.stages || b || []).flat ? (b.stages || b).flat() : [];
    const worst = b.slowest_stage !== undefined ? b
      : stages.reduce((a, x) => (!a || x.took > a.took ? x : a), null);
    if (worst) {
      lines.push('  boot ' + who + ': slowest "'
        + (worst.slowest_stage !== undefined ? worst.slowest_stage : worst.stage) + '" '
        + (worst.slowest_ms !== undefined ? worst.slowest_ms : worst.took) + ' ms');
    }
    const crypto = stages.filter(x => /end-to-end encryption/.test(x.stage || ''));
    for (const stage of crypto) { lines.push('    ' + stage.stage + ': ' + stage.took + ' ms'); }
  }
  for (const [name, list] of [['console errors', r.console_errors],
                              ['page errors', r.page_errors],
                              ['failed requests', r.failed_requests]]) {
    if (!list || !list.length) { continue; }
    lines.push('  ' + name + ' (' + list.length + ' kinds): ' + list[0]);
    for (const line of list.slice(1, 4)) { lines.push('    ' + line); }
  }
  return lines;
}

module.exports = { digest, console_tail, summarise };

if (require.main === module) {
  const at = process.argv.indexOf('--summary');
  if (at !== -1) {
    const file = process.argv[at + 1] || 'clickthrough-result.json';
    try {
      console.log(summarise(JSON.parse(require('fs').readFileSync(file, 'utf8'))).join('\n'));
    } catch (err) {
      console.log('(no readable ' + file + ': ' + err.message + ')');
    }
    process.exit(0);
  }
}

if (require.main === module && process.argv.includes('--self-test')) {
  const assert = require('assert');

  // counts, biggest first
  assert.deepStrictEqual(
    digest(['a', 'b', 'a', 'a', 'c', 'b']),
    ['3× a', '2× b', 'c']);
  // a single occurrence carries no count
  assert.deepStrictEqual(digest(['only once']), ['only once']);
  assert.deepStrictEqual(digest([]), []);

  // the shape that made the 2026-09-12 report unreadable
  const flood = [];
  for (let i = 0; i < 400; i++) {
    flood.push('Failed to load resource: the server responded with a status of 404 (Not Found)');
  }
  flood.push('VODLE DataService Matrix onRatingUpdate callback failed TypeError');
  const digested = digest(flood);
  assert.strictEqual(digested.length, 2, 'four hundred lines, two kinds');
  assert.ok(digested[0].startsWith('400× Failed to load resource'));
  assert.ok(digested[1].includes('onRatingUpdate'), 'the one that matters survives');

  // more kinds than the limit: the rest are counted, not dropped silently
  const many = Array.from({length: 30}, (_, i) => 'kind ' + i);
  const capped = digest(many, 5);
  assert.strictEqual(capped.length, 6);
  assert.strictEqual(capped[5], '... and 25 more kinds');

  // long lines are cut, and newlines folded so one line stays one line
  assert.strictEqual(digest(['x'.repeat(500)], 15, 10)[0], 'x'.repeat(10));
  assert.strictEqual(digest(['two\nlines'])[0], 'two lines');

  // the tail keeps order and drops the SDK's tracing
  const console_lines = [
    'log: 1', 'debug: DEBUG matrix_sdk_crypto::identities::manager: ...',
    'debug: [Perf]: receiveSyncChanges took 22ms',
    'debug: FetchHttpApi: --> GET /_matrix/client/v3/sync',
    'log: 2', 'error: boom',
  ];
  assert.deepStrictEqual(console_tail(console_lines), ['log: 1', 'log: 2', 'error: boom']);
  // a vodle debug line is NOT tracing and must stay
  assert.deepStrictEqual(console_tail(['debug: [vodle boot] +5ms sync store ready']),
    ['debug: [vodle boot] +5ms sync store ready']);
  assert.strictEqual(console_tail(Array.from({length: 50}, (_, i) => 'log: ' + i)).length, 20);

  // the summary, against the shape a passing run actually produces
  const passing = {
    ok: true, host_voters: 10, guest_voters: 10,
    reload: {list_ms: 479, list_requests: 0, shown_ms: 300, open_ms: 475, open_requests: 18, voters: 10},
    returning_ms: 5354,
    boots: {
      creator: {slowest_stage: 'logged in to the homeserver', slowest_ms: 827, stages: [[
        {stage: 'crypto WASM loaded', at: 59, took: 53},
        {stage: 'end-to-end encryption ready', at: 151, took: 90},
        {stage: 'logged in to the homeserver', at: 991, took: 827},
      ]]},
      returning: {slowest_stage: 'logged in to the homeserver', slowest_ms: 1114, stages: [[
        {stage: 'the old crypto store is gone', at: 85, took: 1},
        {stage: 'end-to-end encryption ready', at: 214, took: 129},
      ]]},
    },
    console_errors: ['36× a', '35× b', 'c', 'd', 'e'], page_errors: [], failed_requests: [],
  };
  const summary = summarise(passing);
  assert.strictEqual(summary[0], 'click-through: ok');
  assert.ok(summary.some(l => l.includes('creator 10, guest 10')));
  assert.ok(summary.some(l => l.includes('list 479 ms (0 /_matrix/)')));
  assert.ok(summary.some(l => l.includes('returning start: 5354 ms')));
  assert.ok(summary.some(l => l.includes('boot returning: slowest "logged in to the homeserver" 1114 ms')));
  assert.ok(summary.some(l => l.includes('end-to-end encryption ready: 129 ms')),
    'the stage this whole exercise was about must be in the summary');
  assert.ok(summary.some(l => l.includes('console errors (5 kinds): 36× a')));
  assert.ok(!summary.some(l => l.includes('page errors')), 'empty lists are left out');
  assert.ok(summary.length < 20, 'short enough to reach in a 100-line tail, got ' + summary.length);

  // and against a failing run, whose boot lists have no slowest_stage
  const failing = {
    ok: false, error: 'Error: a start stage took too long: returning spent 18453 ms',
    boot: {creator: [[{stage: 'crypto WASM loaded', at: 59, took: 53}]],
           guest: [], returning: [[{stage: 'end-to-end encryption ready', at: 18505, took: 18453}]]},
    console_errors: ['400× Failed to load resource'],
  };
  const failed_summary = summarise(failing);
  assert.strictEqual(failed_summary[0], 'click-through: FAILED');
  assert.ok(failed_summary[1].includes('18453 ms'));
  assert.ok(failed_summary.some(l => l.includes('end-to-end encryption ready: 18453 ms')));

  // and it must not throw on anything
  assert.deepStrictEqual(summarise(null)[0], 'click-through: FAILED');
  assert.deepStrictEqual(summarise({})[0], 'click-through: FAILED');

  console.log('clickthrough-report self-test: all assertions passed');
}
