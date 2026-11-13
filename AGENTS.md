# Remy (formerly COOK) presentation workflow

The brand is now **Remy**: every former COOK wordmark (masthead, title, reveal, closing) uses `assets/illustrations/remy-logo.svg`, a vector trace of the user's supplied lettering inlined once as the `#remy-wordmark` SVG symbol (CSS masks fail on file://) and filled `var(--orange)` (#e74829), the same orange as “Sara.”, in every location including the slide-1 title. Visible text and accessible names say Remy; the file name `COOK.html` and `window.COOK` API stay for compatibility. The user rejected the global palette remap; keep the original colours.

The user moved the presentation to `main`. Work from the current `origin/main` and push completed, validated updates to `main`; do not continue on `slide-deck`.

The entry point is `index.html`. After a requested update, validate the presentation, regenerate `COOK.html`, commit the change, and immediately push to GitHub. The user has explicitly authorized these pushes.

## Current illustration direction

Follow the supplied mid-century culinary editorial references: bold vermilion, cobalt, cream and green fields; controlled food scale and expressive integrated hands; rounded profiles; flowing whole-body silhouettes; economical ink accents; purposeful asymmetry; and subtle print grain. The user explicitly permits generated illustrations to improve craftsmanship. Finished PNGs now cover the caregiver group, AR cooking/POV scenes, dish, Sara's return, and wider home-learning world. Use these directly as PNGs, without hiding raster art inside SVG. Keep the other editable vector artwork. Soft color planes and restrained gradients may match the references. Avoid generic cartoon proportions and repetitive geometric clipart. Preserve the continuous fourteen-scene experience and staged profile reveals. The reveal-scene glasses are a procedural three.js model (`glasses3d.js`, bundled `assets/vendor/three.min.js` r149) of glossy black acetate camera glasses that spin 360° continuously with no controls. Its front and lens outlines are rounded polygons traced from the user's straight-on product photo (1160 px = 142 mm); details include hinge housings, contoured temples with ear tips, capture button, speaker slots, integrated nose pads and a ringed camera/LED. `COOK_GLASSES.holdAngle` pins the angle for screenshots; `cook-glasses.svg` is only the no-WebGL fallback.

Editable drawings are in `assets/illustrations/`. Keep the geometry legible, inspect rendered screenshots at desktop and phone sizes, and animate cohesive vector layers with delicate transforms and opacity. UI icons may use simple SVG paths.

## Downloadable HTML

Run `python scripts/export_html.py` after every presentation update. It regenerates `COOK.html` with the SVG art, fonts, styles, and behavior embedded. Validate this version too and include it in the commit. The download URL now uses `main`.

Codex's embedded preview cannot be assumed available: the prior direct launch failed with `preview relay unavailable`. Do not claim an embedded preview opened without a successful launch.

## Narrative and presenter controls

The presentation has fourteen scenes and 31 reversible manual beats. Preserve scenes 1–7 except the specifically requested removal of scene 7's lesson and fingertip boxes. Scene 1 retains its slight kitchen blur. Use only the user's specified narrative copy and the concise self-evaluation UI described below; accessible names and off-screen status text are allowed. There are no on-screen next/previous buttons, no chapter label at the bottom left, and no arrows anywhere; the title wordmark sits level and fades out on the Sara slide. Scene 3 alone has a vegetable layer, and no rabbit/bag detail (`ingredient-*.svg`: carrot, tomato, broccoli, pepper, eggplant, mushroom, onion, garlic). Arrow keys advance/reverse beats, fourteen scene indicators jump to scene starts, Home/End jump to the endpoints, and the final next button replays. Scene 4 (`barriers`) has six beats: Sara alone, then the road extends in turn to unlabeled tuition, commuting, class time, and childcare icons and finally the chefs; each segment draws first and its stop fades in after. Its question now fills its own slide (`question`) beside a large Sara, and "What if culinary school could come to your home?" fills its own slide (`home`) after the school scene; later scene numbers in this file predate these two insertions. Tuition must not appear until the first click.

The scene IDs and beat counts are `title:1`, `sara:1`, `passion:2`, `barriers:6`, `question:1`, `population:3`, `school:2`, `home:1`, `reveal:2`, `pov:3`, `demo:1`, `limitations:2`, `return:3`, and `closing:3`. The former `features` scene and its capability interfaces are removed; do not restore them.

`style.css` preserves the original scene styles. `film.css` controls the existing cinematic scenes and shared transforms; `ending.css` styles the POV and concluding sequence. State is managed in `script.js`; `window.COOK.goTo(scene, beat)` and `getState()` support deterministic browser validation. The offline exporter must embed all three stylesheets, every used SVG/PNG, fonts, and behavior. Validate the 16:9 layout, all forward/reverse beats, required copy, evaluation controls, reduced motion, and the offline file before pushing.

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

Scene 7 has exactly two manually reversible states. State 0 shows only `cook-glasses.svg` (1040 × 450, matte-black AR frames with a tiny camera) on a quiet cream field, plus the Remy logo and “Your kitchen. Your culinary school.” Hide the shared kitchen, Sara, and all floating hints in this state.

State 1 draws the glasses toward Sara's face as `cook-ar-kitchen.png` (1672 × 941) opens into view. This preserves Sara's bun, cream blouse and red apron while showing black camera glasses and a natural tomato-cutting gesture. The latest user request removes the “LESSON 01: Knife Skills” and “Keep your fingertips tucked in” boxes from this scene; the old `reveal-guidance` layer is gone. Do not restore the older AR/AI description. Keep the cooking art and glasses independent for reversible cinematic transforms and iris transitions. The final iris radius must cover every image corner.

## POV and concluding sequence

Scene 8 (`pov`) transitions from Sara wearing glasses into what she sees. `cook-pov.png` (1672 × 941) shows only her hands entering the bottom of a home-counter view, with a board, knife, tomatoes, vegetables, and ordinary equipment. Its three beats show the physical scene, then a subtle tomato detection outline and “Tomato Detected”, then a floating panel containing only “Knife Skills”, “Step 2 of 5”, and “Slice the tomato into even pieces”, plus minimal 2/5 progress. All digital overlays use visionOS-inspired translucent frosted glass, rounded corners, thin borders, soft shadows, and elegant typography. Keep UI separate from the art.

Scene 9 (`demo`) is a plain white background with only “for demo” centered. Scene 10 (`limitations`) centers the transparent `finished-dish.png` with “Evaluate flavor, texture, and seasoning yourself.”, then introduces Flavor/Texture/Seasoning panels. Their native “Evaluated” checkboxes and 1–5 score controls represent the user's own sensory judgments; never prefill or describe scores as AI-assigned grades.

Scene 11 (`return`) uses `sara-return.png`: the same smiling Sara holding her black glasses in a brighter kitchen, homemade dishes on the counter, and her baby safely eating from its own bowl. Reveal exactly: “Remember Sara?”, “Now she's learning on her own terms.”, and “New skills. New recipes. New possibilities.”

Scene 12 (`closing`) uses `learning-world.png` to expand into three ordinary home kitchens, then connects and gathers the illustrated world into a clean cinematic brand composition. Its exact copy is “Education should fit your life.”, the Remy logo, and “Redefining where and how learning happens.” Preserve the smooth manual/reversible sequence and reduced-motion behavior.
