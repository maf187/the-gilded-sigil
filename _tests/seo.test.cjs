'use strict';
// Source + Liquid fixture tests, not a Ruby/Jekyll build.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const yaml = require('js-yaml');
const { Liquid } = require('liquidjs');
const { JSDOM } = require('jsdom');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const split = file => {
  const [, front, body] = read(file).match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  return { meta: yaml.load(front), body };
};
(async () => {
  const config = yaml.load(read('_config.yml'));
  assert.equal(config.url, 'https://thegildedsigil.com');
  assert.ok(config.plugins.includes('jekyll-seo-tag'));
  assert.ok(config.plugins.includes('jekyll-sitemap'));
  assert.equal((read('_layouts/default.html').match(/{% seo %}/g) || []).length, 1);
  const pages = ['index.html', 'forge.html', 'spell-jar.html', 'daily.html', 'runes.html', 'quizzes.html', 'articles.html', 'atelier.html'];
  const posts = fs.readdirSync(path.join(root, '_posts')).filter(f => f.endsWith('.md')).map(f => '_posts/' + f);
  const titles = new Set(), descriptions = new Set();
  for (const file of [...pages, ...posts]) {
    const { meta } = split(file);
    assert.ok(meta.title && meta.description, `${file}: explicit title and description`);
    assert.ok(!titles.has(meta.title), `${file}: unique title`); titles.add(meta.title);
    assert.ok(!descriptions.has(meta.description), `${file}: unique description`); descriptions.add(meta.description);
    assert.ok(!meta.title.includes(config.title), `${file}: don't repeat the brand appended by jekyll-seo-tag`);
    if (meta.permalink) assert.ok(meta.permalink.startsWith('/') && !meta.permalink.includes('://'), `${file}: site-relative permalink`);
  }
  const tarot = posts.filter(f => split(f).meta.series === 'tarot-interpretations');
  assert.equal(tarot.length, 10);
  for (const file of tarot) {
    const { meta, body } = split(file);
    assert.match(meta.title, /Tarot Meaning: 10 Interpretations$/);
    for (const tradition of ['Rider-Waite-Smith', 'Marseille', 'Thoth']) assert.ok(body.includes(tradition), `${file}: description backed by content`);
  }
  const intro = split('_posts/2026-08-19-intro-to-sigil-craft.md').body;
  assert.ok(!/Forge on our homepage|download the vector|terminal crossbar/.test(intro));
  assert.ok(intro.includes("'/forge.html' | relative_url"));
  assert.ok(intro.includes('2000-pixel PNG'));
  const clean = split('_posts/2026-08-30-an-incantation-for-wealth-with-warding.md').meta.permalink;
  const { meta, body } = split('wealth-legacy-redirect.html');
  assert.equal(meta.layout, null);
  assert.equal(meta.permalink, '/https:/thegildedsigil.com/');
  assert.equal(meta.sitemap, false);
  assert.equal(meta.redirect_target, clean);
  assert.notEqual(meta.permalink, clean);
  // Directory-style permalink output: preserve exactly the legacy path, including its colon.
  assert.equal(path.posix.join(meta.permalink, 'index.html'), '/https:/thegildedsigil.com/index.html');
  for (const baseurl of ['', '/preview']) {
    const engine = new Liquid({ strictFilters: true });
    engine.registerFilter('relative_url', value => baseurl + value);
    engine.registerFilter('absolute_url', value => config.url + baseurl + value);
    const rendered = await engine.parseAndRender(body, { page: meta });
    const d = new JSDOM(rendered).window.document;
    const target = config.url + baseurl + clean;
    assert.equal(d.querySelectorAll('link[rel=canonical]').length, 1);
    assert.equal(d.querySelector('link[rel=canonical]').getAttribute('href'), target);
    assert.equal(d.querySelector('meta[http-equiv=refresh]').content, '0; url=' + target);
    assert.equal(d.querySelector('a').getAttribute('href'), baseurl + clean);
    assert.equal(d.querySelectorAll('script').length, 0);
    assert.ok(!/{{|{%/.test(rendered));
  }
  console.log(`SEO checks passed: ${pages.length + posts.length} unique explicit titles/descriptions, 10 tarot articles, corrected guide, legacy redirect with canonical/refresh/fallback and sitemap exclusion.`);
  console.log('Redirect rendering uses LiquidJS fixtures. Actual GitHub Pages path serving, generated sitemap and SEO plugin output require a Jekyll build/deployment check.');
})().catch(error => { console.error(error); process.exitCode = 1; });
