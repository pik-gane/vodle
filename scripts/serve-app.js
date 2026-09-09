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

const root = path.resolve(__dirname, '..', 'docs');
const port = parseInt(process.argv[2] || process.env.PORT || '8100', 10);

if (!fs.existsSync(path.join(root, 'index.html'))) {
  console.error('docs/index.html not found - run "npm run build" first');
  process.exit(1);
}

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff': 'font/woff',
  '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.map': 'application/json',
  '.txt': 'text/plain', '.webmanifest': 'application/manifest+json',
};

const server = http.createServer((req, res) => {
  const url_path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const file = path.normalize(path.join(root,
    (url_path === '/' || url_path === '') ? '/index.html' : url_path));
  // a plain file.startsWith(root) would also admit a sibling directory whose
  // name merely begins with "docs":
  const relative = path.relative(root, file);
  if (relative === '..' || relative.startsWith('..' + path.sep) || path.isAbsolute(relative)) {
    res.writeHead(403); res.end(); return;
  }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('not found'); return; }
    res.writeHead(200, {'Content-Type': MIME[path.extname(file)] || 'application/octet-stream'});
    res.end(data);
  });
});

server.listen(port, '127.0.0.1', () => {
  console.log('serving docs/ at http://127.0.0.1:' + port + '/');
  // tell the parent (test/wdio.conf.js) that the port is actually open, so it
  // need not guess how long node takes to boot on a loaded CI runner:
  if (process.send) { process.send('ready'); }
});
