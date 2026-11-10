# COOK presentation workflow

The user moved the presentation to `main`. Work from the current `origin/main` and push completed, validated updates to `main`; do not continue on `slide-deck`.

The entry point is `index.html`. After a requested update, validate the presentation, regenerate `COOK.html`, commit the change, and immediately push to GitHub. The user has explicitly authorized these pushes.

## Current illustration direction

The latest user request supersedes the earlier generated-asset direction. Do not use image generation. Draw custom SVG vector illustrations that closely follow the supplied mid-century culinary editorial references: bold vermilion, cobalt, cream and green fields; oversized food and expressive hands; small angular faces; organic interlocking silhouettes; economical ink accents; purposeful asymmetry; and subtle print grain. Avoid generic cartoon proportions, gradients, realistic rendering, and repetitive geometric clipart. Preserve the continuous eight-scene experience and staged profile reveals.

Editable drawings are in `assets/illustrations/`. Keep the geometry legible, inspect rendered screenshots at desktop and phone sizes, and animate cohesive vector layers with delicate transforms and opacity. UI icons may use simple SVG paths.

## Downloadable HTML

Run `python scripts/export_html.py` after every presentation update. It regenerates `COOK.html` with the SVG art, fonts, styles, and behavior embedded. Validate this version too and include it in the commit. The download URL now uses `main`.

Codex's embedded preview cannot be assumed available: the prior direct launch failed with `preview relay unavailable`. Do not claim an embedded preview opened without a successful launch.

## Narrative and presenter controls

The presentation has eight scenes and 22 reversible manual beats. Scenes 1–2 retain their established content. Scenes 3–8 must show only the exact copy specified by the user; do not add captions, UI labels, lesson names, headings, ingredient labels, or descriptive prose. Accessible names and off-screen status text are allowed. Keep navigation icon-only after the first two scenes. Arrow keys advance/reverse individual beats, including each obstacle and each capability; eight scene indicators jump to the start of scenes.

`style.css` preserves the original scene styles. `film.css` controls the cinematic extension and shared scene transforms. State is managed in `script.js`; `window.COOK.goTo(scene, beat)` and `getState()` support deterministic browser validation. The offline exporter must embed both stylesheets and every used SVG. Validate the 16:9 layout, all forward/reverse beats, the exact-copy constraint, reduced motion, and the offline file before pushing.
