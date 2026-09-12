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

module.exports = { digest, console_tail };

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

  console.log('clickthrough-report self-test: all assertions passed');
}
