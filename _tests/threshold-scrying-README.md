# Threshold and Scrying Glass

The homepage refresh and contemplative mirror retain the existing Jekyll default layout, navigation, footer, theme fonts and URLs. `quizzes.html` intentionally keeps its public URL while replacing the old archetype quiz. The homepage describes the new mirror accurately. No shared layout, other apps, articles, dependencies or deployment configuration are changed.

The mirror starts still. Its optional motion is disabled under reduced-motion preferences. Begin/End and Escape provide a simple reflection flow without a timer, camera, audio, accounts, AI or prediction claims. Six suggested prompts cycle; the optional own-prompt field uses textContent, a 240-character limit and explicit Use/Clear controls. Text stays in the current DOM and is not saved or sent by the app. No-JavaScript visitors see the still mirror and initial prompt with an exit link.

## Verification

Run `node _tests/threshold-scrying.test.cjs` with jsdom and postcss available on NODE_PATH (or JSDOM_PATH and POSTCSS_PATH). The focused test covers start/end/Escape, repeated actions, prompt cycling, custom-input safety and clearing, motion preferences, link structure, CSS scoping and removal of preview chrome. Existing app regression suites are retained and were rerun. Liquid-compatible template rendering checks are not a real Ruby/Jekyll build.

Actual desktop/mobile rendered visual QA and a real Jekyll build were unavailable in the authoring environment. The mist uses explicitly layered, softly blurred gradients and slow transform-only motion; its compositing and reduced-motion rules were inspected and tested statically. Review the deployment after merging before assuming browser rendering has been verified.
