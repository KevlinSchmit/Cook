# COOK presentation workflow

The user moved the presentation to `main`. Work from the current `origin/main` and push completed, validated updates to `main`; do not continue on `slide-deck`.

The entry point is `index.html`. After a requested update, validate the presentation, regenerate `COOK.html`, commit the change, and immediately push to GitHub. The user has explicitly authorized these pushes.

## Current illustration direction

The latest user request supersedes the earlier generated-asset direction. Do not use image generation. Draw custom SVG vector illustrations that closely follow the supplied mid-century culinary editorial references: bold vermilion, cobalt, cream and green fields; oversized food and expressive hands; small angular faces; organic interlocking silhouettes; economical ink accents; purposeful asymmetry; and subtle print grain. Avoid generic cartoon proportions, gradients, realistic rendering, and repetitive geometric clipart. Preserve the continuous two-scene experience and staged profile reveals.

Editable drawings are in `assets/illustrations/`. Keep the geometry legible, inspect rendered screenshots at desktop and phone sizes, and animate cohesive vector layers with delicate transforms and opacity. UI icons may use simple SVG paths.

## Downloadable HTML

Run `python scripts/export_html.py` after every presentation update. It regenerates `COOK.html` with the SVG art, fonts, styles, and behavior embedded. Validate this version too and include it in the commit. The download URL now uses `main`.

Codex's embedded preview cannot be assumed available: the prior direct launch failed with `preview relay unavailable`. Do not claim an embedded preview opened without a successful launch.
