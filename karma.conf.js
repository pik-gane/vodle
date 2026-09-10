// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const fs = require('fs');
const path = require('path');

// When KARMA_RESULT_FILE is set, write a machine-readable summary of the run
// there. scripts/check-test-results.js compares it against the checked-in
// baseline of known failures, which is how CI tells a regression apart from
// the pre-existing breakage (see .github/workflows/tests.yml). Reading the
// results this way rather than parsing the progress reporter's output keeps
// spec names exact and needs no additional dependency.
const result_file = process.env.KARMA_RESULT_FILE;

function JsonResultReporter() {
  const failed = [], skipped = [], seen = new Set(), messages = {}, perf = [];
  let succeeded = 0;
  // the VODLE_PERF console lines of the real-server specs (propagation and
  // join latencies, see planning/matrix-migration/MATRIX_PERF_SECURITY_REPORT.md),
  // so that they can be read from the results file and the end of a CI log:
  this.onBrowserLog = (browser, log) => {
    const text = String(log);
    if (text.includes('VODLE_PERF')) { perf.push(text.trim()); }
  };
  this.onSpecComplete = (browser, result) => {
    const name = result.suite.concat(result.description).join(' > ');
    if (seen.has(name)) { return; }
    seen.add(name);
    if (result.skipped) { skipped.push(name); }
    else if (!result.success) {
      failed.push(name);
      // the failure messages (with the top of each stack trace), so that a
      // failure is diagnosable from the end of a CI log (which is all one can
      // fetch of a long log) and from the uploaded results file, not only
      // from the progress output in between:
      messages[name] = (result.log || []).map(line => String(line).split('\n').slice(0, 6).join('\n'));
    }
    else { succeeded += 1; }
  };
  this.onRunComplete = (browsers, results) => {
    fs.mkdirSync(path.dirname(result_file), {recursive: true});
    fs.writeFileSync(result_file, JSON.stringify({
      // results.error is true when the browser disconnected or the suite never
      // ran; without it an empty failure list would look like a green run:
      errored: !!(results && results.error),
      exit_code: results ? results.exitCode : null,
      succeeded: succeeded,
      failed: failed.sort(),
      skipped: skipped.sort(),
      messages: messages,
      perf: perf,
    }, null, 2) + '\n');
  };
}
JsonResultReporter.$inject = [];

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
      ...(result_file ? [{'reporter:json-result': ['type', JsonResultReporter]}] : [])
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/ngv'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'].concat(result_file ? ['json-result'] : []),
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    singleRun: false,
    restartOnFileChange: true,
    // the CouchDB two-client integration specs do real HTTP, real replication
    // and wait for a real poll deadline, which can exceed the 30s default:
    browserNoActivityTimeout: 120000
  });
};
