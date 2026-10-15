#!/usr/bin/env node
/*
Every translation key a template asks for must exist in en.json.

English is the fallback language (src/app/i18n-loader.ts): a key missing there
is not translated into anything, it renders as the raw key — the user sees
"mypolls.archived" where a section heading should be. The other languages may
lag behind; English may not.

Run: node scripts/check-i18n-keys.js
*/
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const EN = path.join(SRC, 'assets/i18n/en.json');

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

// 'some.key' | translate  — only whole literals: a key computed from pieces
// ('analysis.' + this.mode | translate) cannot be checked from the template,
// so a literal with a + on either side of it is skipped.
const KEY_RE = /(\+\s*)?'([A-Za-z0-9_.-]+)'\s*(\+)?\s*\|\s*translate/g;

function lookup(node, key) {
  return key.split('.').reduce(
    (n, part) => (n && typeof n === 'object' ? n[part] : undefined), node);
}

const en = JSON.parse(fs.readFileSync(EN, 'utf8'));
const missing = [];
let keyCount = 0;

for (const file of walk(SRC)) {
  // a commented-out block asks for nothing
  const text = fs.readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  let m;
  while ((m = KEY_RE.exec(text)) !== null) {
    if (m[1] || m[3]) continue;  // part of a computed key
    const key = m[2];
    keyCount++;
    const value = lookup(en, key);
    // an empty English value is deliberate: a few units are sentence
    // fragments that some languages need and English does not, and the
    // other way round (see INTENTIONALLY_EMPTY in src/app/i18n-loader.ts)
    if (typeof value !== 'string') {
      const line = text.slice(0, m.index).split('\n').length;
      missing.push(`${path.relative(ROOT, file)}:${line}: ${key}`);
    }
  }
}

// The FAQ's keys are computed ('help.faq.' + id + '.q'), so the loop above
// cannot see them: the page lists its ids in HelpPage.FAQ_IDS, and each must
// have a question and an answer in English. A language may lag behind, but
// it may not carry an id the page does not show -- a renamed id would leave
// its translation behind, unseen.
const HELP_TS = path.join(SRC, 'app/help/help.page.ts');
const idsBlock = /FAQ_IDS = \[([\s\S]*?)\];/.exec(fs.readFileSync(HELP_TS, 'utf8'));
if (!idsBlock) {
  missing.push('src/app/help/help.page.ts: no FAQ_IDS list to check');
} else {
  const ids = [...idsBlock[1].replace(/\/\/.*$/gm, '').matchAll(/'([^']+)'/g)].map(m => m[1]);
  for (const id of ids) {
    for (const part of ['q', 'a']) {
      keyCount++;
      const value = lookup(en, `help.faq.${id}.${part}`);
      if (typeof value !== 'string' || !value.trim()) missing.push(`help.faq.${id}.${part} (FAQ_IDS)`);
    }
  }
  const I18N = path.dirname(EN);
  for (const file of fs.readdirSync(I18N).filter(f => f.endsWith('.json'))) {
    const faq = lookup(JSON.parse(fs.readFileSync(path.join(I18N, file), 'utf8')), 'help.faq') || {};
    for (const key of Object.keys(faq)) {
      if (key !== 'title' && !key.startsWith('_') && !ids.includes(key)) {
        missing.push(`${file}: help.faq.${key} is not in FAQ_IDS`);
      }
    }
  }
}

if (missing.length > 0) {
  console.error(`${missing.length} translation key(s) missing from src/assets/i18n/en.json:`);
  for (const entry of missing) console.error('  ' + entry);
  console.error('\nAdd them to en.json: English is the fallback, so a key missing');
  console.error('there renders as itself in every language.');
  process.exit(1);
}

console.log(`i18n: ${keyCount} template key(s) all present in en.json`);
