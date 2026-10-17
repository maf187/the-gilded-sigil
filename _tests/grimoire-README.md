# Grimoire archive and shared article layout

No production dependencies or deployment/workflow settings are added. Jekyll's
existing posts, categories, layouts and relative-URL conventions drive the page.
All post Markdown, dates, titles, summaries, embedded content and permalinks are
unchanged. New production assets are scoped to `.grimoire-page` only.

## What updates automatically

On each normal Jekyll rebuild, all-writing totals, category buttons/counts,
archive cards, latest-writing feature, reading-time estimates and related links
are regenerated. Categories with multiple words receive readable labels; new
categories appear without code edits. Uncategorized articles remain browsable.
The existing sigil starter is found by slug and disappears gracefully if removed.

The tarot pathway automatically includes published posts categorized `tarot`
whose title contains `10 Different Ways to Interpret It`, in publication order.
Other tarot articles remain in the archive/category but do not accidentally enter
this specific essay series. Previous/next links follow that same series, not
unrelated chronological posts. Other articles link to up to two posts sharing a
category. There are no fixed totals or invented future articles.

## Progressive enhancement

All archive entries and article prose work without JavaScript. Filters and the
contents panel stay hidden until initialized. Native buttons provide keyboard
activation, visible focus, pressed state, a controlled list and live result count.
Contents entries are generated from each article's own h2/h3 headings. Existing
heading IDs are retained; missing IDs and later duplicates receive collision-free
IDs. The first legacy fragment target is preserved. Existing article checklist
checkboxes remain interactive when JavaScript is enabled.

## Checks

Run from the repository root with Node.js 20 or newer:

```sh
npm install --prefix _tests --no-save --package-lock=false jsdom@26.1.0 postcss@8.5.6 liquidjs@10.21.1 js-yaml@4.1.0 markdown-it@14.1.0
node --check grimoire.js
node _tests/grimoire.test.cjs
node _tests/page-style.test.cjs
node _tests/forge.test.cjs
node _tests/spell-jar.test.cjs
python3 _tests/integration.test.py
```

The Grimoire test renders the actual Liquid templates and includes using LiquidJS
with Jekyll-style fixtures and filters. Markdown-it supplies representative post
HTML. It covers all current post files, preserved injected content/links, dynamic
totals/categories, new/multi-category/uncategorized synthetic posts, empty and
single-post archives, all filters with repeated reset, actual series endpoints,
related destinations, no-JS fallback, generated contents, duplicate-ID collisions,
subpath links, scoped CSS and responsive/reduced-motion rules.

These tests are NOT a full Jekyll build: Ruby/Jekyll is unavailable in the task
environment, and this repository has no Gemfile. Markdown-it is not Kramdown;
Jekyll's own build remains the integration authority. No production dependency is
required for the Node test tooling. Browser policy prevents local/file/data URL
preview navigation, so no rendered desktop/mobile visual QA is claimed. Review
both viewport sizes before merging. DOM tests do not validate native keyboard
activation or a screen reader.

## Deliberately deferred

The wealth incantation's existing malformed but working permalink is retained.
Changing that URL needs a separate migration/redirect decision; this layout PR
does not silently change it. No workflow, Pages settings, shared navigation,
Forge, Runes or Spell Jar files are changed.
