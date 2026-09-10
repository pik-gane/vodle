#!/usr/bin/env node
/*
 * Compare a karma run against the checked-in baseline of known failures.
 *
 * The suite has failures that predate any current work (all of them TestBed
 * dependency-injection errors in "should create" specs; they fail on main
 * too). Until those are fixed, a CI job that simply requires a green suite
 * would be permanently red and therefore ignored. This script instead fails
 * only on failures that are NOT in the baseline, so a regression is loud while
 * the pre-existing breakage stays visible and countable in one file.
 *
 * Usage: node scripts/check-test-results.js [results.json] [baseline.txt] [--no-skips]
 *
 * --no-skips additionally fails when any spec was skipped. CI passes it
 * because it provisions CouchDB first, so a skipped integration spec there
 * means those specs have silently stopped running.
 *
 * The results file is written by the json-result reporter in karma.conf.js,
 * which is active whenever KARMA_RESULT_FILE is set:
 *
 *   KARMA_RESULT_FILE=karma-results.json ng test --watch=false ...
 *   node scripts/check-test-results.js
 *
 * The baseline is meant to shrink to zero. Specs that no longer fail are
 * reported so their entries get removed, but they do not fail the run.
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const no_skips = args.includes('--no-skips');
const positional = args.filter(arg => !arg.startsWith('--'));
const results_path = positional[0] || 'karma-results.json';
const baseline_path = positional[1] || path.join('test', 'known-failing-specs.txt');

function read_baseline(file) {
  if (!fs.existsSync(file)) { return []; }
  return fs.readFileSync(file, 'utf8').split('\n')
    .map(line => line.replace(/#.*$/, '').trim())
    .filter(line => line.length > 0);
}

function fail(message) {
  console.error('\n' + message);
  process.exit(1);
}

if (!fs.existsSync(results_path)) {
  fail('No karma results at ' + results_path + '. Did the test run start at all, '
     + 'and was KARMA_RESULT_FILE set?');
}

let results;
try {
  results = JSON.parse(fs.readFileSync(results_path, 'utf8'));
} catch (err) {
  fail('Could not read ' + results_path + ': ' + err.message);
}

const baseline = read_baseline(baseline_path);
const known = new Set(baseline);
const failed = results.failed || [];
const skipped = results.skipped || [];
const regressions = failed.filter(name => !known.has(name));
const fixed = baseline.filter(name => !failed.includes(name));

console.log('specs passed:   ' + results.succeeded);
console.log('specs failed:   ' + failed.length + ' (' + baseline.length + ' known)');
console.log('specs skipped:  ' + skipped.length);
if (skipped.length) {
  console.log('\nskipped (integration specs skip themselves without a provisioned CouchDB):');
  for (const name of skipped) { console.log('  - ' + name); }
}

// A browser that disconnected, or a run that executed nothing, must not look
// green just because it reported no failures. Check this before the baseline
// diff, whose output would otherwise be misleading noise:
if (results.errored) {
  fail('The karma run reported an error (browser disconnect or startup failure).');
}
if (results.succeeded === 0 && failed.length === 0) {
  fail('No spec was executed.');
}
if ((results.perf || []).length) {
  // the measurements of the real-server specs, for the report's CI column:
  console.log('\nperformance lines:');
  for (const line of results.perf) { console.log('  ' + line); }
}
if (fixed.length) {
  console.log('\nno longer failing — remove these from ' + baseline_path + ':');
  for (const name of fixed) { console.log('  - ' + name); }
}
if (no_skips && skipped.length) {
  fail('Specs were skipped although skipping was not allowed (' + skipped.length + '). '
     + 'In CI this usually means the test CouchDB was not provisioned, so the '
     + 'integration specs silently stopped running.');
}
if (regressions.length) {
  // with the messages the json-result reporter recorded, so that a failure
  // is diagnosable from the end of the CI log alone:
  const messages = results.messages || {};
  fail('NEW test failures (' + regressions.length + '):\n'
     + regressions.map(name => '  - ' + name
         + (messages[name] || []).map(line => '\n      ' + line).join('')).join('\n')
     + '\n\nFix them, or — if the failure is genuinely expected — add the exact '
     + 'spec name to ' + baseline_path + ' with a comment saying why.');
}

console.log('\nno new test failures.');
