# COOK presentation workflow

The user moved the presentation to `main`. Work from the current `origin/main` and push completed, validated updates to `main`; do not continue on `slide-deck`.

The entry point is `index.html`. After a requested update, validate the presentation, regenerate `COOK.html`, commit the change, and immediately push to GitHub. The user has explicitly authorized these pushes.

## Current illustration direction

The latest user request supersedes the earlier generated-asset direction. Do not use image generation. Draw custom SVG vector illustrations that closely follow the supplied mid-century culinary editorial references: bold vermilion, cobalt, cream and green fields; controlled food scale and expressive integrated hands; rounded profiles with noses in the facial contour; flowing whole-body silhouettes; economical ink accents; purposeful asymmetry; and subtle print grain. Avoid generic cartoon proportions, gradients, realistic rendering, and repetitive geometric clipart. Preserve the continuous eight-scene experience and staged profile reveals.

Editable drawings are in `assets/illustrations/`. Keep the geometry legible, inspect rendered screenshots at desktop and phone sizes, and animate cohesive vector layers with delicate transforms and opacity. UI icons may use simple SVG paths.

## Downloadable HTML

Run `python scripts/export_html.py` after every presentation update. It regenerates `COOK.html` with the SVG art, fonts, styles, and behavior embedded. Validate this version too and include it in the commit. The download URL now uses `main`.

Codex's embedded preview cannot be assumed available: the prior direct launch failed with `preview relay unavailable`. Do not claim an embedded preview opened without a successful launch.

## Narrative and presenter controls

The presentation has eight scenes and 22 reversible manual beats. Scenes 1–2 retain their established content. Scenes 3–8 must show only the exact copy specified by the user; do not add captions, UI labels, lesson names, headings, ingredient labels, or descriptive prose. Accessible names and off-screen status text are allowed. Keep navigation icon-only after the first two scenes. Arrow keys advance/reverse individual beats, including each obstacle and each capability; eight scene indicators jump to the start of scenes.

`style.css` preserves the original scene styles. `film.css` controls the cinematic extension and shared scene transforms. State is managed in `script.js`; `window.COOK.goTo(scene, beat)` and `getState()` support deterministic browser validation. The offline exporter must embed both stylesheets and every used SVG. Validate the 16:9 layout, all forward/reverse beats, the exact-copy constraint, reduced motion, and the offline file before pushing.

## Whole-figure craftsmanship

The user explicitly rejected figures assembled from disconnected geometric pieces. Start with the complete posture and weight-bearing gesture, then draw head/neck/shoulder continuity and clothing that wraps that same body. Hands belong in the forearm contour, with an understandable wrist and contact against the held object. Avoid detached nose triangles, separate neck wedges, pasted lapels, stacked circular hair lobes, slab forearms, splayed mitten hands, and identical stiff front-facing poses. Design each person as an organic individual while retaining the same face/contour grammar across Sara, the caregivers, and the cooks. References guide style, not exact figure copying.

The revised Sara cradles a bowl at her waist with one arm and stirs with the other. Her AR portrait must use precisely the same figure geometry. Object drawings need coherent vessel rims, handles, perspective, and contact with the counter; check physical placement after changing their contours.

## Reference-specific culinary school artwork

The user specifically requested a literal vector reconstruction of the supplied two-chef image for scenes 4 and 6. Keep both scenes using the same `culinary-school.svg`, now 1443 × 1090, with the wide cobalt arch, large tilted left toque, green-shirted right cook, center hood/red pan, yellow stockpot, chopping board, and commercial counter in their reference positions. Do not add Sara over the scene-4 artwork or rotate/crop this image. The asset must remain genuine SVG paths and procedural texture, with no embedded PNG or other raster illustration. Treat this as a reference-specific exception to the general freedom to reinterpret character designs.
