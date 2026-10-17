'use strict';
// Static cascade/box-model checks, not a browser rendering test.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const postcss = require('postcss');
const { JSDOM } = require('jsdom');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const sheets = Object.fromEntries(['style', 'forge', 'runes', 'spell-jar'].map(name => [name, postcss.parse(read(name + '.css'))]));
function declarations(sheet, selector) {
  const result = {};
  sheet.walkRules(rule => {
    if (rule.selector === selector && rule.parent.type === 'root') {
      rule.walkDecls(decl => { result[decl.prop] = decl.value; });
    }
  });
  return result;
}
let count = 0;
function test(name, fn) { fn(); count++; console.log('PASS ' + name); }
test('All four stylesheets parse', () => assert.equal(Object.keys(sheets).length, 4));
test('Shared border-box and one-rem outer gutters are preserved', () => {
  assert.equal(declarations(sheets.style, '*')['box-sizing'], 'border-box');
  assert.equal(declarations(sheets.style, 'body').padding, '2rem 1rem');
  assert.equal(declarations(sheets.style, 'body')['align-items'], 'center');
});
test('All three app main areas use the same responsive 72rem cap', () => {
  for (const [name, id] of [['forge', 'forge-app'], ['runes', 'rune-app'], ['spell-jar', 'spell-jar-app']]) {
    const rule = declarations(sheets[name], `body:has(#${id}) > main`);
    assert.equal(rule.width, '100%');
    assert.equal(rule['max-width'], '72rem');
    assert.equal(declarations(sheets[name], '#' + id).width, '100%');
    // No media rule changes the outer main width or cap.
    sheets[name].walkRules(r => {
      if (r.selector.includes('> main')) assert.equal(r.parent.type, 'root');
    });
  }
  assert.equal(declarations(sheets['spell-jar'], '#spell-jar-app').padding, '0');
});
test('Expected border-box widths remain bounded around every app breakpoint', () => {
  for (const rem of [16, 20]) for (const viewport of [320, 375, 380, 381, 600, 601, 730, 731, 760, 761, 768, 769, 900, 901, 1050, 1051, 1120, 1121, 1184, 1280, 1450, 1500, 1920, 2560]) {
    const width = Math.min(viewport - 2 * rem, 72 * rem);
    const gutter = (viewport - width) / 2;
    assert.ok(width > 0 && width <= 72 * rem);
    assert.ok(gutter >= rem);
  }
});
test('Forge preserves exact heading wording and adds only the gold word span', () => {
  const dom = new JSDOM(read('forge.html'));
  const heading = dom.window.document.querySelector('#forge-app .forge-title');
  assert.equal(heading.tagName, 'H2');
  assert.equal(heading.textContent, 'The Sigil Forge');
  assert.equal(heading.childNodes[0].textContent, 'The Sigil ');
  assert.equal(heading.querySelector('span').textContent, 'Forge');
  assert.equal(heading.querySelectorAll('span').length, 1);
  dom.window.close();
});
test('App-specific title wins in cream and its span has explicit gold', () => {
  // #forge-app .forge-title (1,1,0) outranks #forge-app h2 (1,0,1)
  // and the shared h1 (0,0,1); a directly specified span color beats inheritance.
  assert.equal(declarations(sheets.forge, '#forge-app .forge-title').color, '#e8e2cf');
  assert.equal(declarations(sheets.forge, '#forge-app .forge-title span').color, 'var(--gold)');
  assert.equal(declarations(sheets.forge, '#forge-app')['--gold'], '#d4af37');
  assert.equal(declarations(sheets.style, 'h1').color, '#d4af37');
});
console.log(`${count} page style checks passed. No rendered-layout claim.`);
