# Atelier coming-soon page and Grimoire title

The archive title keeps “The” in cream and accents “Grimoire” in gold. The new static `/atelier/` page uses the shared Jekyll shell and scoped styling. It has no products, launch dates, forms, payments, scripts or third-party embeds. Shared navigation, the Threshold CTA and two short promotional article sentences now link to the forthcoming Atelier instead of Etsy. Article instructions and all app scripts remain unchanged.

Run `node _tests/atelier.test.cjs` with jsdom, postcss, liquidjs and js-yaml available on NODE_PATH. Tests cover front matter, base-path-aware links, IDs, heading split, scoped CSS, no transactional/data-collection UI, and production Etsy-link removal. Existing Node suites and the Python integration test were rerun.

LiquidJS rendering is not a Ruby/Jekyll build. Ruby/Jekyll and rendered desktop/mobile browser QA were unavailable in the authoring environment. Verify the GitHub Pages build and live layout after the owner chooses to merge.
