# Daily Altar refresh checks

The approved Daily Altar preview is integrated into the existing Jekyll layout, with a left-aligned cream/gold heading. Shared navigation, footer, other apps, articles, and shared CSS remain unchanged.

Changes are confined to daily.html, daily.css, daily.js and these test/docs files. The app keeps deterministic card selection, original meaning data and numerology formulas, approximately calculated lunar data, and browser-local operation. It removes the unsupported Void-of-Course status. Date navigation, keyboard reveal, reduced motion, birthday month/day validation and stale-result clearing follow the approved preview.

Run from the repo root after installing the test dependencies from npm:

```
npm install --prefix _tests --no-save --package-lock=false jsdom@26.1.0 postcss@8.5.6 liquidjs markdown-it js-yaml
node _tests/daily-altar.test.cjs
node _tests/grimoire.test.cjs
node _tests/forge.test.cjs
node _tests/spell-jar.test.cjs
node _tests/page-style.test.cjs
node _tests/rune-header.test.cjs
python _tests/integration.test.py
node --check daily.js
```

Daily Altar: 164 assertions covering initial render, unique IDs, date/month/year/leap boundaries, stable card selection, reveal and keyboard states, concealed faces, birthday validation and cleared results, original data/function hashes, CSS scope, exact theme, reduced motion, left header and absence of preview shell. Existing Grimoire checks include the actual Jekyll include-parameter grammar guard from the previous build-error fix.

These are source and simulated-DOM checks. This environment does not have Ruby/Jekyll, and its local browser could not render the preview. They are not a full Jekyll build, GitHub Pages deployment test, or rendered desktop/mobile QA. Check the deployed build after the owner chooses to merge. Lunar estimates are timestamp-specific, not continuously refreshed. No birth year, local storage, account or backend was added.
