/*
(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

This file is part of vodle.

vodle is free software: you can redistribute it and/or modify it under the 
terms of the GNU Affero General Public License as published by the Free 
Software Foundation, either version 3 of the License, or (at your option) 
any later version.

vodle is distributed in the hope that it will be useful, but WITHOUT ANY 
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR 
A PARTICULAR PURPOSE. See the GNU Affero General Public License for more 
details.

You should have received a copy of the GNU Affero General Public License 
along with vodle. If not, see <https://www.gnu.org/licenses/>. 
*/

/*
 * WebdriverIO configuration for the e2e smoke suite (plan session 5, #228).
 *
 *   npm run build     # produces docs/ (see angular.json outputPath)
 *   npm run e2e       # serves docs/ and drives the real built app
 *
 * Plain JavaScript (not TypeScript): the repo's pinned ts-node 8.x predates
 * what wdio 8's autocompile expects, and the smoke suite is small enough that
 * type checking buys little here.
 *
 * The 'devtools' automation protocol drives the browser over the Chrome
 * DevTools Protocol via the already-installed puppeteer-core, so no
 * chromedriver is needed (the pinned chromedriver 119 no longer matches any
 * current Chrome, and wdio 8.3's automatic driver management arrived only in
 * 8.14).
 */

const { fork } = require('child_process');
const path = require('path');

const PORT = parseInt(process.env.VODLE_E2E_PORT || '8100', 10);
let server = null;

// candidate browser binaries; CHROME_BIN wins (same convention as karma):
function chrome_binary() {
  if (process.env.CHROME_BIN) { return process.env.CHROME_BIN; }
  const fs = require('fs');
  for (const candidate of ['/usr/bin/google-chrome', '/usr/bin/chromium-browser', '/usr/bin/chromium']) {
    if (fs.existsSync(candidate)) { return candidate; }
  }
  return undefined; // let puppeteer try its own detection
}

exports.config = {
  runner: 'local',
  // everything here is plain JS; without this, wdio detects the repo's
  // ts-node 8.x and injects an ESM loader path that only exists in ts-node 10+:
  autoCompileOpts: {autoCompile: false},
  automationProtocol: 'devtools',
  specs: ['./specs/**/*.e2e.js'],
  maxInstances: 1,
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
      binary: chrome_binary(),
      headless: true,
      args: ['--headless=new', '--no-sandbox', '--disable-gpu', '--window-size=1280,900'],
    },
  }],
  logLevel: 'warn',
  baseUrl: 'http://127.0.0.1:' + PORT,
  waitforTimeout: 15000,
  connectionRetryTimeout: 60000,
  connectionRetryCount: 2,
  framework: 'jasmine',
  reporters: ['spec'],
  jasmineOpts: {
    defaultTimeoutInterval: 60000,
  },

  onPrepare: function () {
    // wdio's CLI sets this before it reads autoCompileOpts, and the worker
    // then injects a ts-node ESM loader that the repo's ts-node 8.x does not
    // have; onPrepare runs in the launcher before workers fork, so this is
    // the reliable place to withdraw it:
    delete process.env.WDIO_LOAD_TS_NODE;
    // serve the built app for the duration of the run:
    server = fork(path.join(__dirname, '..', 'scripts', 'serve-app.js'), [String(PORT)],
                  {stdio: 'inherit'});
    return new Promise((resolve, reject) => {
      server.on('spawn', () => setTimeout(resolve, 500));
      server.on('error', reject);
      server.on('exit', code => reject(new Error('static server exited with ' + code)));
    });
  },

  onComplete: function () {
    if (server) { server.kill(); server = null; }
  },
};
