# Rune Casting page-header checks

This change adds a page introduction above the existing casting app. It does not modify the toolbar, app controls, casting behavior, codex, journal, audio, or existing styles.

Run from the repository root:

```sh
npm install --prefix _tests --no-save --package-lock=false jsdom@26.1.0 postcss@8.5.6
node _tests/rune-header.test.cjs
node _tests/page-style.test.cjs
node --check runes.js
```

Nine focused checks verify exact baseline HTML restoration after removing the introduction, byte-identical original CSS and JavaScript, placement outside the app, accessible heading, unique IDs, scoped selectors, shared layout compatibility, and responsive/theme rules. Six existing page-style checks also pass.

These checks are source/DOM checks, not rendered desktop/mobile QA or a full Jekyll build. Before merging, visually review the heading and toolbar together at desktop and narrow widths. No new Liquid syntax or JavaScript is introduced.
