# Spell Jar regression tests

Run from the repository root with Node.js 20 or newer:

```sh
npm install --prefix _tests --no-save --package-lock=false jsdom@26.1.0 postcss@8.5.6
node _tests/spell-jar.test.cjs
```

Dependencies stay under `_tests/node_modules`; no root package or existing Forge test configuration needs to change. Do not commit `node_modules` or generated test results.

The suite reads the current repository files:

- `spell-jar.html`, `spell-jar.js`, and `spell-jar.css`
- `grimoire-data.js`
- `_layouts/default.html`

For local integration staging only, it can read the equivalent source snapshots from `reference/` when the normal data/layout paths are absent. No reference directory is required in a repository checkout. A dependency fallback also supports the existing local QA workspace; normal checkout runs use the dependencies installed in `_tests`.

## Coverage

- First visit: nine unselected native radios, optional personal words, disabled Begin/Save, and a truly empty vessel.
- All nine choices, 9,000 randomized formulations, correct ingredient roles, distinct botanicals, and labeled universal fallbacks.
- One-at-a-time named Add actions, substitution preservation, complete progress, seal/save gates, undo/reopen, empty/reset, shuffle, and new-jar behavior.
- Deterministic 450 ms rapid-click guards and forced stale timer callbacks after reset/new jar.
- Focus, native form/radio/label semantics, ARIA, literal user text, download contents/failure handling, and URL cleanup.
- Actual shared layout plus page content, frontmatter/SEO preservation, root/project relative URLs, single header/main/footer, and no preview shell.
- Exact approved grimoire data SHA-256, root-scoped styles and queries, inert loading on unrelated pages, and unrelated colliding IDs left untouched.
- Namespaced SVG layers/keyframes, app-root CSS variables, tablet layout declarations, print visibility, and reduced-motion declarations.

The test writes `_tests/spell-jar-test-results.json` with pass/fail details and exact tested file hashes. It exits nonzero if any assertion fails.

## Limits

This is jsdom functional testing plus PostCSS syntax/static cascade checks, not a browser rendering audit. Resource loading is disabled. The harness resolves the page's current frontmatter and `relative_url` expressions using the actual default layout; it minimally substitutes the SEO plugin output rather than running Jekyll. It does not claim a production Jekyll build, pixel/layout validation, physical keyboard activation, screen-reader verification, Safari testing, or an actual browser file download.

Before publishing, run the site's normal build and manually inspect desktop/mobile layout, contrast, keyboard navigation, and downloading in supported browsers.
