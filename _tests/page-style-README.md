# App workspace style regression checks

Run from the repository root with Node.js 20 or newer:

```sh
npm install --prefix _tests --no-save --package-lock=false jsdom@26.1.0 postcss@8.5.6
node _tests/page-style.test.cjs
node _tests/forge.test.cjs
node _tests/spell-jar.test.cjs
```

The focused style test parses all four relevant stylesheets, checks the three scoped 72rem workspace caps, preserves shared one-rem gutters, checks expected box-model widths around responsive breakpoints at two root font sizes, and verifies exact Forge heading wording and the cream/gold cascade. Existing app suites cover interaction behavior.

These are source and DOM checks, not a rendered browser layout audit or Jekyll build. Before merging, visually review the three pages on desktop and mobile. This change does not alter internal app breakpoints or grids.
