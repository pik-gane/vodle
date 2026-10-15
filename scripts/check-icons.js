#!/usr/bin/env node
/*
Every icon a template names must be registered in src/app/icons.ts.

Ionic's standalone build (since the switch away from IonicModule) ships no
icon it was not told about: `addIcons` in src/app/icons.ts is the list. An
unregistered name falls back to a request for ./svg/<name>.svg, which the
build does copy from ionicons -- but only for a name ionicons has. The
draft poll page's kebab button named `ellipsis-vertical`, which was in
neither place, and the button rendered empty (#368).

What is checked: the `name`, `ios` and `md` attributes of <ion-icon>, the
string literals inside their bound forms ([name]="cond?'a':'b'"), and the
`icon: '...'` fields of the menu entries in TypeScript, which reach a
template as <ion-icon [name]="p.icon">. A name that cannot be read off the
source -- one computed at runtime -- is not checked and cannot be.

Run: node scripts/check-icons.js
     node scripts/check-icons.js --self-test
*/
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const ICONS_TS = path.join(SRC, 'app/icons.ts');

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.html') || entry.name.endsWith('.ts')) out.push(full);
  }
  return out;
}

/** source with its comments removed: a commented-out icon needs no registration */
function uncommented(text, file) {
  return file.endsWith('.html')
    ? text.replace(/<!--[\s\S]*?-->/g, '')
    : text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');
}

// name="x" / ios="x" / md="x", and [name]="…'x'…" with its literals
const PLAIN_ATTR_RE = /\b(?:name|ios|md)="([^"{}]*)"/g;
const BOUND_ATTR_RE = /\[(?:name|ios|md)\]="([^"]*)"/g;
const STRING_LITERAL_RE = /'([^']*)'/g;
// What an expression compares to, or glues onto, is not an icon name:
// [name]="type=='winner'?'trophy':'cut'" and its mirror image 'winner'==type
// name trophy and cut; [name]="'custom-'+suffix" names an icon this cannot
// know, so neither half is reported.
const COMPARED_BEFORE_RE = /(?:[=!]==?|[<>]=?|\+)\s*$/;
const COMPARED_AFTER_RE = /^\s*(?:[=!]==?|[<>]=?|\+)/;

/**
 * The <ion-icon …> tags in `html`, with their text. A plain regular
 * expression ends the tag at the first `>`, which inside a binding is an
 * operator — <ion-icon [name]="n > 1 ? 'a' : 'b'"> — so the quotes are
 * tracked.
 */
function ionIconTags(html) {
  const tags = [];
  const OPEN = /<ion-icon\b/g;
  let open;
  while ((open = OPEN.exec(html)) !== null) {
    let i = open.index + open[0].length, quote = '';
    while (i < html.length) {
      const c = html[i];
      if (quote) { if (c === quote) quote = ''; }
      else if (c === '"' || c === "'") quote = c;
      else if (c === '>') break;
      i++;
    }
    tags.push({index: open.index, text: html.slice(open.index, i + 1)});
    OPEN.lastIndex = i;
  }
  return tags;
}
// the menu entries of app.component.ts and the like: icon: 'home'
const TS_ICON_FIELD_RE = /\bicon:\s*'([^']*)'/g;
// ionicons' names: lower-case words joined by hyphens, nothing else
const ICON_NAME = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

/** every icon name `text` names, with the line it stands on */
function iconNamesIn(text, file) {
  const found = [];
  const add = (name, index) => {
    if (!ICON_NAME.test(name)) return;   // an expression, a path, a spinner's ""
    found.push({name, line: text.slice(0, index).split('\n').length});
  };
  if (file.endsWith('.html')) {
    // <ion-spinner name="crescent"> and <ion-input name="…"> are not icons,
    // so only what stands inside an <ion-icon> tag is read
    for (const tag of ionIconTags(text)) {
      const at = tag.index, inner = tag.text;
      let m;
      while ((m = PLAIN_ATTR_RE.exec(inner)) !== null) { add(m[1], at); }
      while ((m = BOUND_ATTR_RE.exec(inner)) !== null) {
        const expression = m[1];
        let lit;
        while ((lit = STRING_LITERAL_RE.exec(expression)) !== null) {
          const before = expression.slice(0, lit.index);
          const after = expression.slice(lit.index + lit[0].length);
          if (COMPARED_BEFORE_RE.test(before) || COMPARED_AFTER_RE.test(after)) { continue; }
          add(lit[1], at);
        }
      }
    }
  } else {
    let m;
    while ((m = TS_ICON_FIELD_RE.exec(text)) !== null) { add(m[1], m.index); }
  }
  return found;
}

/** the names src/app/icons.ts registers with addIcons */
function registeredNames(source) {
  // a commented-out line registers nothing, however much it looks like it does
  const block = /addIcons\(\{([\s\S]*?)\}\)/.exec(uncommented(source, 'icons.ts'));
  if (!block) throw new Error('no addIcons({...}) call in src/app/icons.ts');
  const names = new Set();
  let m;
  const KEY_RE = /'([^']+)'\s*:/g;
  while ((m = KEY_RE.exec(block[1])) !== null) { names.add(m[1]); }
  return names;
}

function selfTest() {
  const cases = [
    ['<ion-icon name="trash-outline"></ion-icon>', 'html', ['trash-outline']],
    ['<ion-icon ios="ellipsis-horizontal" md="ellipsis-vertical"></ion-icon>', 'html',
     ['ellipsis-horizontal', 'ellipsis-vertical']],
    [`<ion-icon [name]="show?'eye-off-outline':'eye-outline'"></ion-icon>`, 'html',
     ['eye-off-outline', 'eye-outline']],
    // the menu's icons arrive through a binding on a variable: nothing to read
    ['<ion-icon [name]="p.icon"></ion-icon>', 'html', []],
    // 'winner' is what the expression tests for, not an icon (#368)
    [`<ion-icon [name]="poll_type=='winner'?'trophy':'cut'"></ion-icon>`, 'html', ['trophy', 'cut']],
    [`<ion-icon [name]="'winner'==poll_type?'trophy':'cut'"></ion-icon>`, 'html', ['trophy', 'cut']],
    // a name glued together at runtime is not one this can read
    [`<ion-icon [name]="'custom-'+suffix"></ion-icon>`, 'html', []],
    // a > inside the binding does not end the tag
    [`<ion-icon [name]="n > 1 ? 'people-outline' : 'person-outline'"></ion-icon>`, 'html',
     ['people-outline', 'person-outline']],
    // other components' name attributes are not icons
    ['<ion-spinner name="crescent"></ion-spinner><ion-input name="email"></ion-input>', 'html', []],
    ['<!-- <ion-icon name="ghost-outline"></ion-icon> -->', 'html', []],
    [`  { title: 'x', url: '/x', icon: 'home' },`, 'ts', ['home']],
    [`  // { icon: 'ghost-outline' }`, 'ts', []],
  ];
  let failed = 0;
  for (const [source, kind, expected] of cases) {
    const file = 'x.' + kind;
    const got = iconNamesIn(uncommented(source, file), file).map(f => f.name);
    if (JSON.stringify(got) !== JSON.stringify(expected)) {
      console.error(`self-test: ${JSON.stringify(source)}\n  expected ${JSON.stringify(expected)}, got ${JSON.stringify(got)}`);
      failed++;
    }
  }
  const registered = registeredNames(
    `addIcons({\n  'add': add,\n  // 'star': star,\n  'trash-outline': trashOutline,\n});`);
  if (registered.size !== 2 || !registered.has('trash-outline') || registered.has('star')) {
    console.error('self-test: registeredNames did not read the addIcons block as written');
    failed++;
  }
  if (failed) { process.exit(1); }
  console.log(`check-icons self-test: ${cases.length + 1} cases pass`);
}

function main() {
  const registered = registeredNames(fs.readFileSync(ICONS_TS, 'utf8'));
  const used = new Map();   // name -> ["file:line", …]
  for (const file of walk(SRC)) {
    if (file === ICONS_TS) continue;
    const text = uncommented(fs.readFileSync(file, 'utf8'), file);
    for (const {name, line} of iconNamesIn(text, file)) {
      const where = `${path.relative(ROOT, file)}:${line}`;
      if (!used.has(name)) used.set(name, []);
      if (!used.get(name).includes(where)) used.get(name).push(where);
    }
  }
  const missing = [...used.keys()].filter(name => !registered.has(name)).sort();
  const unused = [...registered].filter(name => !used.has(name)).sort();

  console.log(`${used.size} icon names in the sources, ${registered.size} registered in src/app/icons.ts`);
  if (unused.length) {
    // not a failure: an icon registered for a template that no longer uses it
    // costs a few hundred bytes, a missing one costs the control
    console.log(`registered and not named by any source (harmless): ${unused.join(', ')}`);
  }
  if (missing.length) {
    console.error('\nicons named by a template but not registered in src/app/icons.ts:');
    for (const name of missing) {
      console.error(`  ${name}  (${used.get(name).join(', ')})`);
    }
    console.error('\nAdd each to src/app/icons.ts: import the camelCase name from');
    console.error("'ionicons/icons' and register it under its hyphenated name (#368).");
    process.exit(1);
  }
  console.log('every icon the sources name is registered.');
}

if (process.argv.includes('--self-test')) { selfTest(); } else { main(); }
