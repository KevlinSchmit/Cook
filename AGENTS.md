# COOK presentation workflow

The user moved the presentation to `main`. Work from the current `origin/main` and push completed, validated updates to `main`; do not continue on `slide-deck`.

The entry point is `index.html`. After a requested update, validate the presentation, regenerate `COOK.html`, commit the change, and immediately push to GitHub. The user has explicitly authorized these pushes.

## Current illustration direction

Follow the supplied mid-century culinary editorial references: bold vermilion, cobalt, cream and green fields; controlled food scale and expressive integrated hands; rounded profiles; flowing whole-body silhouettes; economical ink accents; purposeful asymmetry; and subtle print grain. The latest user request explicitly permits generated images to improve the figures. Scene 5 now uses a generated transparent PNG closely following the supplied five-adult reference; scene 7 uses a generated cooking illustration of Sara. Use these finished illustrations directly as PNGs, without hiding raster art inside SVG. Keep the other editable vector artwork. Soft color planes and restrained gradients may match the references. Avoid generic cartoon proportions and repetitive geometric clipart. Preserve the continuous eight-scene experience and staged profile reveals. The black glasses hero is a more realistic product SVG, as specifically requested.

Editable drawings are in `assets/illustrations/`. Keep the geometry legible, inspect rendered screenshots at desktop and phone sizes, and animate cohesive vector layers with delicate transforms and opacity. UI icons may use simple SVG paths.

## Downloadable HTML

Run `python scripts/export_html.py` after every presentation update. It regenerates `COOK.html` with the SVG art, fonts, styles, and behavior embedded. Validate this version too and include it in the commit. The download URL now uses `main`.

Codex's embedded preview cannot be assumed available: the prior direct launch failed with `preview relay unavailable`. Do not claim an embedded preview opened without a successful launch.

## Narrative and presenter controls

The presentation has eight scenes and 23 reversible manual beats. Scenes 1–2 retain their established content, with a slight kitchen blur only on scene 1. Scenes 3–8 must show only the exact copy specified by the user, including the latest scene-7 replacement described below. Do not add other captions, UI labels, headings, ingredient labels, or descriptive prose. Accessible names and off-screen status text are allowed. Keep navigation icon-only after the first two scenes. Arrow keys advance/reverse individual beats, including each obstacle and each capability; eight scene indicators jump to the start of scenes. Scene 4 has six beats: an initial unobstructed route, then tuition, commuting, class time, childcare, and the question. Tuition must not appear until the first click.

`style.css` preserves the original scene styles. `film.css` controls the cinematic extension and shared scene transforms. State is managed in `script.js`; `window.COOK.goTo(scene, beat)` and `getState()` support deterministic browser validation. The offline exporter must embed both stylesheets and every used SVG. Validate the 16:9 layout, all forward/reverse beats, the exact-copy constraint, reduced motion, and the offline file before pushing.

## Whole-figure craftsmanship

The user explicitly rejected figures assembled from disconnected geometric pieces. Start with the complete posture and weight-bearing gesture, then draw head/neck/shoulder continuity and clothing that wraps that same body. Hands belong in the forearm contour, with an understandable wrist and contact against the held object. Avoid detached nose triangles, separate neck wedges, pasted lapels, stacked circular hair lobes, slab forearms, splayed mitten hands, and identical stiff front-facing poses. Design each person as an organic individual while retaining the same face/contour grammar across Sara, the caregivers, and the cooks. The latest supplied images establish the craftsmanship baseline for future figures and objects; explicitly requested reference redraws must also preserve their composition and poses.

The revised Sara cradles a bowl at her waist with one arm and stirs with the other. Her AR portrait must use precisely the same figure geometry. Object drawings need coherent vessel rims, handles, perspective, and contact with the counter; check physical placement after changing their contours.

## Reference-specific culinary school artwork

The user specifically requested a literal vector reconstruction of the supplied two-chef image for scenes 4 and 6. Keep both scenes using the same `culinary-school.svg`, now 1443 × 1090, with the wide cobalt arch, large tilted left toque, green-shirted right cook, center hood/red pan, yellow stockpot, chopping board, and commercial counter in their reference positions. Do not add Sara over the scene-4 artwork or rotate/crop this image. The asset must remain genuine SVG paths and procedural texture, with no embedded PNG or other raster illustration. Treat this as a reference-specific exception to the general freedom to reinterpret character designs.

## Latest kitchen, Sara, and caregiver references

The user requested close vector reconstructions of three additional supplied images, replacing every occurrence globally. `kitchen.svg` is 1672 × 941: keep the navy arched window, wall light bands, trailing vine, orange rail and counter, two hanging pans, shelf jars, produce board, blue vegetable bowl, utensils, towel, and cabinets in the reference positions. The bowl is part of this composition; do not restore the old separate opening bowl overlay. The desktop stage is 16:9 and miniature kitchen views fit this same asset without distortion.

`sara.svg` follows the original 849 × 1852 reference coordinates with viewBox `0 185 849 1667`, removing only the empty top margin. Preserve the left-facing swept-hair/bun portrait, cream blouse, red apron and pocket, right stirring grip, and continuous left supporting arm around the blue bowl. Clip apron shading to the cloth silhouette and keep hand/bowl overlaps continuous. `sara-ar.svg` must share the identical base drawing and bounds, with only glasses added.

`caregivers.png` is a generated 2172 × 724 RGBA illustration replacing the rejected manual caregiver SVG. Preserve the five standing figures in order—father carrying a swaddled infant, woman with a green striped bag, white-haired adult with a cane, green-shirted man, and headscarf-wearing mother carrying a child. The artwork has a genuinely transparent background; the cobalt belongs to the scene, not the image. Do not restore the sketchy manual reconstruction or add a rectangular backdrop. The generated redraw closely follows the reference but is not a pixel-identical copy.

## Glasses-first product reveal

Scene 7 has exactly two manually reversible states. State 0 shows only `cook-glasses.svg` (1040 × 450, matte-black AR frames with a tiny camera) on a quiet cream field, plus “COOK” and “Your kitchen. Your culinary school.” Hide the shared kitchen, Sara, and all floating hints in this state.

State 1 draws the glasses toward Sara's face as `cook-ar-kitchen.png` (1672 × 941) opens into view. This generated illustration preserves Sara's bun, cream blouse and red apron while showing black camera glasses and a natural tomato-cutting gesture. The lesson and feedback appear lightly after Sara is visible: “LESSON 01: Knife Skills” and “Keep your fingertips tucked in”. The tomato recognition overlay has no extra text. Remove the earlier “Professional culinary education, powered by AR and AI.” line from this scene. Keep the cooking art, glasses, and hints independent so their cinematic transform, iris, and opacity transitions remain reversible and respect reduced motion. The final iris radius must cover every image corner.
