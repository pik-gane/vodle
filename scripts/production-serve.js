// A stand-in for the deployment's nginx: serves the production build at one
// origin and forwards /_matrix/ and /.well-known/matrix/ to the homeserver,
// with the same cache headers the real configuration sends. Not a substitute
// for the container, but it reproduces what the app sees.
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = process.env.VODLE_ROOT || require('path').join(__dirname, '..', 'docs');
const SITE = process.env.VODLE_SITE;
const HS = { host: '127.0.0.1', port: parseInt(process.env.VODLE_HS_PORT || '8009', 10) };
const PORT = parseInt(process.env.VODLE_PORT || '8100', 10);

const TYPES = {'.html':'text/html; charset=utf-8', '.js':'text/javascript', '.mjs':'text/javascript',
  '.css':'text/css', '.json':'application/json', '.wasm':'application/wasm', '.svg':'image/svg+xml',
  '.png':'image/png', '.jpg':'image/jpeg', '.ico':'image/x-icon', '.woff':'font/woff',
  '.woff2':'font/woff2', '.ttf':'font/ttf', '.eot':'application/vnd.ms-fontobject', '.map':'application/json'};

function send_file(res, file, url) {
  fs.readFile(file, (err, body) => {
    if (err) { res.writeHead(404, {'Content-Type': 'text/html'}); res.end('<h1>404</h1>'); return; }
    const ext = path.extname(file).toLowerCase();
    const headers = {'Content-Type': TYPES[ext] || 'application/octet-stream'};
    // the deployment's rules: the shell, the translations and the crypto
    // WASM revalidate (they keep their names across releases), hashed
    // assets do not
    if (ext === '.html' || ext === '.json' || ext === '.wasm') { headers['Cache-Control'] = 'no-cache'; }
    else if (/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/.test(url)) {
      headers['Cache-Control'] = 'public, immutable'; headers['Expires'] = new Date(Date.now() + 31536000000).toUTCString();
    }
    res.writeHead(200, headers); res.end(body);
  });
}

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (url.startsWith('/_matrix/') || url.startsWith('/.well-known/matrix/')) {
    const upstream = http.request({...HS, method: req.method, path: req.url, headers: {...req.headers, host: HS.host + ':' + HS.port}}, up => {
      res.writeHead(up.statusCode, up.headers); up.pipe(res);
    });
    upstream.on('error', e => { res.writeHead(502, {'Content-Type':'text/plain'}); res.end('proxy: ' + e.message); });
    req.pipe(upstream);
    return;
  }
  if (SITE && url.startsWith('/site/')) { return send_file(res, path.join(SITE, url.slice('/site/'.length)), url); }
  const candidate = path.join(ROOT, path.normalize(url).replace(/^(\.\.[/\\])+/, ''));
  fs.stat(candidate, (err, st) => {
    if (!err && st.isFile()) { return send_file(res, candidate, url); }
    if (/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|wasm|map)$/.test(url)) {
      res.writeHead(404, {'Content-Type': 'text/html'}); res.end('<h1>404</h1>'); return;   // never the shell for an asset
    }
    send_file(res, path.join(ROOT, 'index.html'), '/index.html');   // SPA fallback
  });
});
server.listen(PORT, () => console.log('serving ' + ROOT + ' on http://localhost:' + PORT + ', /_matrix/ -> ' + HS.host + ':' + HS.port));
