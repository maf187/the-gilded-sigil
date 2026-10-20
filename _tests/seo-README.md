# Search snippet improvements

This change updates search titles and explicit descriptions without modifying
app scripts, CSS, assets, or tool headings. Article titles in the ten-part tarot
series are clarified; source filenames/dates (and therefore their URLs) stay
unchanged. A stable `series: tarot-interpretations` marker preserves series
navigation while still recognizing the original title convention.

The introductory sigil guide now links to the separate Forge, describes the
actual endpoint dots/circle, and promises a PNG rather than a vector download.

The wealth article moves to `/2026/08/an-incantation-for-wealth-with-warding/`.
`wealth-legacy-redirect.html` preserves `/https:/thegildedsigil.com/` with an
immediate HTML meta refresh, canonical pointing to the new article, and a normal
fallback link. This is **not an HTTP 301**. The old route is excluded from the
sitemap using `sitemap: false`; normal Jekyll article links follow the new
permalink. No redirect plugin or hosting configuration is added.

## Checks

With the existing test dependencies installed (jsdom, postcss, liquidjs,
markdown-it and js-yaml), run from the repository root:

    node _tests/seo.test.cjs
    node _tests/grimoire.test.cjs
    node _tests/spell-jar.test.cjs
    for test in _tests/*.test.cjs; do node "$test"; done
    python3 _tests/integration.test.py
    git diff --check

The SEO suite checks 23 unique explicit titles/descriptions, accurate tarot
metadata, the guide corrections, the explicit old/new permalink mapping,
`sitemap: false`, and Liquid-rendered canonical/refresh/fallback links at both
the root and a test base path. Grimoire checks exercise all actual posts,
including previous/next series navigation and archive links. Existing spell jar
metadata assertions are updated to the accurate intended copy.

## Verification limits and owner review

These are source and simulated-DOM/LiquidJS checks, **not a Ruby/Jekyll build**.
The authoring environment has no Ruby/Jekyll and this repository has no Gemfile
or custom build workflow. No merge or deployment was performed.

After approving and deploying, verify the GitHub Pages build, the generated
HTML title/description/canonical output, and sitemap.xml. Specifically request
the old malformed URL and confirm it still serves the redirect to the new 200
article URL; the sitemap should list only the new article URL. This cannot be
proven solely by a Liquid fixture. Search engines decide displayed snippets
and need to recrawl; title/description improvements do not guarantee higher
click-through rates.
