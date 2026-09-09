#!/usr/bin/env node
/*
 * Minimal static file server for the built app, used by the e2e smoke suite
 * (test/wdio.conf.js). "ng build" outputs to docs/ in this project (see
 * angular.json). No dependencies; the app uses hash-based routing
 * (HashLocationStrategy), so no history fallback is needed.
 *
 *   node scripts/serve-app.js [port]     (default 8100)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'docs');
const port = parseInt(process.argv[2] || process.env.PORT || '8100', 10);

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff': 'font/woff',
  '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.map': 'application/json',
  '.txt': 'text/plain', '.webmanifest': 'application/manifest+json',
};

const server = http.createServer((req, res) => {
  const url_path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = path.normalize(path.join(root, url_path));
  if (!file.startsWith(root)) { res.writeHead(403); res.end(); return; }
  if (url_path === '/' || url_path === '') { file = path.join(root, 'index.html'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('not found'); return; }
    res.writeHead(200, {'Content-Type': MIME[path.extname(file)] || 'application/octet-stream'});
    res.end(data);
  });
});

server.listen(port, '127.0.0.1', () => {
  if (!fs.existsSync(path.join(root, 'index.html'))) {
    console.error('docs/index.html not found - run "npm run build" first');
    process.exit(1);
  }
  console.log('serving docs/ at http://127.0.0.1:' + port + '/');
});
