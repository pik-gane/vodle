#!/usr/bin/env node
/*
A separator written right after a control-flow block's `}` never reaches the
page.

Angular's template compiler trims the text that follows a block, and
JavaScript's trim() counts a non-breaking space as whitespace, so `}&nbsp;<b>`
renders `EndedFriday, October 9` with the two glued together (#365). The
Angular 21 control-flow migration produced this shape wherever the old
`*ngIf` markup had `</span>&nbsp;<b>`: five places in this app, all of them
losing their space.

The remedy is to give the separator an element of its own --
`}<span>&nbsp;</span><b>` -- or to put it inside the block before the `}`.

What is checked: every `}` that stands in a template's text (not inside a tag,
an attribute value or an interpolation), and the text that follows it up to
the next element or block. A run that is whitespace with a non-breaking space
in it, or that begins with one, is reported: that is the separator that will
vanish. Prose after a block is left alone.

Run: node scripts/check-templates.js
     node scripts/check-templates.js --self-test
*/
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const NBSP = ' ';
/** whitespace, in the sense JavaScript's trim() uses — which includes NBSP */
const TRIMMED = /^[\s ]*$/;

/**
 * The places in `html` where a separator after a block's `}` is lost.
 * Returns [{index, text}], `text` being the run that will not survive.
 */
function vanishingSeparators(html) {
  const found = [];
  let i = 0, inTag = false, quote = '';
  while (i < html.length) {
    const c = html[i];
    if (inTag) {
      if (quote) { if (c === quote) quote = ''; }
      else if (c === '"' || c === "'") quote = c;
      else if (c === '>') inTag = false;
      i++;
      continue;
    }
    if (c === '<' && html.startsWith('<!--', i)) {     // a comment, apostrophes and all
      const end = html.indexOf('-->', i + 4);
      i = end === -1 ? html.length : end + 3;
      continue;
    }
    if (c === '<') { inTag = true; i++; continue; }
    if (c === '{' && html[i + 1] === '{') {          // an interpolation's braces
      const end = html.indexOf('}}', i + 2);
      i = end === -1 ? html.length : end + 2;
      continue;
    }
    if (c !== '}') { i++; continue; }
    // a block's closing brace: what follows, up to the next element or block
    let j = i + 1;
    while (j < html.length && html[j] !== '<' && html[j] !== '@' && html[j] !== '}') j++;
    const run = html.slice(i + 1, j)
      .replace(/&nbsp;/g, NBSP).replace(/&#160;|&#xa0;/gi, NBSP);
    // the whole run is whitespace and holds a non-breaking space, or the run
    // opens with one: either way trim() takes the separator away
    const leading = (/^[\s ]*/.exec(run) || [''])[0];
    if (run.includes(NBSP) && (TRIMMED.test(run) || leading.includes(NBSP))) {
      found.push({index: i, text: html.slice(i + 1, j)});
    }
    i = j;
  }
  return found;
}

function selfTest() {
  const cases = [
    ['}&nbsp;<b>x</b>', 1],
    ['}\n  &nbsp;<b>x</b>', 1],
    ['}&nbsp;&nbsp;</text>', 1],
    ['}&nbsp;@if (x) {<i>y</i>}', 1],
    // an element of its own survives, and so does a separator inside the block
    ['}<span>&nbsp;</span><b>x</b>', 0],
    ['<span>a</span>&nbsp;<b>x</b>', 0],
    ['@if (x) {<i>y</i>&nbsp;}<b>z</b>', 0],
    // ordinary whitespace after a block is not a separator anyone wrote
    ['}\n  <b>x</b>', 0],
    // prose after a block keeps its words; only a leading nbsp would vanish
    ['} and then<b>x</b>', 0],
    // braces inside an attribute value or an interpolation are not blocks
    ['<div [style]="{a: 1}">&nbsp;x</div>', 0],
    ['<div>{{ {a: 1} }}&nbsp;x</div>', 0],
    // an apostrophe inside a comment used to leave the scanner looking for a
    // closing quote, and every brace after it went unseen
    [`<!--the slider's bar-->@if (x) {<i>y</i>}&nbsp;<b>z</b>`, 1],
  ];
  let failed = 0;
  for (const [html, expected] of cases) {
    const got = vanishingSeparators(html).length;
    if (got !== expected) {
      console.error(`self-test: ${JSON.stringify(html)} expected ${expected}, got ${got}`);
      failed++;
    }
  }
  if (failed) process.exit(1);
  console.log(`check-templates self-test: ${cases.length} cases pass`);
}

function main() {
  const reported = [];
  for (const file of walk(SRC)) {
    const html = fs.readFileSync(file, 'utf8');
    for (const {index, text} of vanishingSeparators(html)) {
      const line = html.slice(0, index).split('\n').length;
      reported.push(`${path.relative(ROOT, file)}:${line}: }${text.replace(/\n/g, '\\n')}`);
    }
  }
  if (reported.length) {
    console.error('a separator right after a control-flow block never reaches the page (#365):');
    for (const line of reported) console.error('  ' + line);
    console.error('\nGive it an element of its own -- }<span>&nbsp;</span><b> -- or');
    console.error('write it inside the block, before the closing brace.');
    process.exit(1);
  }
  console.log('no separator is lost after a control-flow block.');
}

if (process.argv.includes('--self-test')) { selfTest(); } else { main(); }
