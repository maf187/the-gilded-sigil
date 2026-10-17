# Sigil Forge checks

These developer-only files live under `_tests`, which Jekyll excludes from the
published site by default. No workflow or deployment settings are changed.

Run from the repository root:

    node --check forge.js
    node _tests/forge.test.cjs
    python3 _tests/integration.test.py

The Node suite exercises the actual application script with a simulated DOM,
animation clock and canvas. It covers original geometry, reduction, invalid
input, interrupted/repeated generation, replay, clear/reset, finishes, reduced
motion, keyboard submission and PNG export calls/dimensions. The Python check
verifies Jekyll front matter/assets, IDs/labels and app-scoped CSS/JS.

These checks do not render a browser or validate actual exported PNG pixels.
Real desktop/mobile rendering, screen-reader behavior and native downloads still
need review before merging. Browser QA was unavailable because the cloud browser
could not reach the separate local workspace preview server. No public preview,
site deployment or browser-policy workaround was attempted.

A local Jekyll build was not run: this execution environment has no Ruby/Jekyll,
and the repository contains no Gemfile or custom build instructions. The existing
layout, SEO front matter, permalink, and `relative_url` conventions are preserved.

Design notes: the display uses SVG for sharp scaling; export redraws the same
original 500-unit geometry at 2000px. Gold/charcoal and ink/parchment exports have
solid backgrounds (the old canvas export was transparent). The legacy app.js
remains untouched and is no longer loaded by forge.html.
