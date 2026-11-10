# COOK

A continuous, illustrated presentation for **Augmented Reality Culinary Education at Home**. Eight scenes unfold in the same illustrated world, from Sara's kitchen and educational barriers to the COOK AR learning experience. The title and Sara introduction are retained, with a redesigned cradling-and-stirring pose.

## Download the complete presentation

[Download COOK.html](https://github.com/KevlinSchmit/Cook/raw/refs/heads/main/COOK.html), then open the downloaded file in Chrome, Edge, Firefox, or Safari. This single file includes all images, fonts, styles, and animations, so it works offline without a server or adjacent files.

After changing the source files, regenerate the downloadable version with `python scripts/export_html.py`.

## View locally

Open `index.html` in a browser, or run this from the repository directory:

```sh
python -m http.server 3000 --bind 0.0.0.0
```

No build, dependencies, external fonts, or credentials are needed. The presentation combines editable SVG drawings with generated illustrations for the caregiver group and Sara's AR cooking scene. All assets, textures, and animations run locally.

## Present

- Use **← / →**, **Page Up / Page Down**, or **Space** to navigate individual story beats.
- **Home** returns to the title; **End** jumps to the final capability.
- Eight scene indicators jump to the start of each scene. The icon buttons reverse/advance one beat; the final next button replays the presentation.
- The motion control pauses ambient movement. The experience respects reduced-motion preferences.
- The curriculum tiles are interactive; selecting a tile highlights its lesson state without adding extra on-screen copy.

The composition is optimized for 16:9 presentation. All 23 beats are reversible and remain within one document:

| Scene | Manual beats |
| --- | --- |
| COOK title | 1 |
| Meet Sara | 1, with staggered profile details |
| Sara's passion | 2, including the restaurant bill |
| Barriers to education | 6, starting with a clear route before four obstacles and the question |
| The bigger problem | 3, including proportional 50% and 70% illustrations |
| Traditional culinary education | 3, from school to home |
| Introducing COOK | 2, from black AR glasses alone to Sara cooking with light AR guidance |
| COOK features | 5, one capability per beat |

Scenes 3–8 use only the specified presentation copy, including the latest scene-7 lesson and fingertip guidance. Other controls and interface artwork use icons; additional labels are accessible names rather than visible text. The figures and percentages are supplied presentation content, not a live data feed. Scene 4's tuition icon and text appear only after the first click.

Future changes belong on `main` and should be committed and pushed after validation, as requested by the project owner.

## Typography

Fraunces by Undercase Type is bundled under the SIL Open Font License; see `assets/OFL.txt`. Font sources: [Google Fonts](https://github.com/google/fonts/tree/main/ofl/fraunces).

## Illustration assets

The artwork lives in `assets/illustrations/`. The 1672 × 941 kitchen SVG includes the arched navy window, vine, hanging pans, shelf, produce, blue bowl, orange counter, and cabinets in their reference positions. The opening scene lightly blurs this background to keep the title readable. Sara's SVG preserves the supplied left-facing cooking pose, cream blouse, red apron, continuous supporting arm, and stirring grip; her AR variant uses identical base geometry with black frames.

The five-person group is now a generated 2172 × 724 transparent PNG closely following the supplied reference, with smooth unified figures and no baked background. It replaces the rejected manual SVG. The new 1672 × 941 generated cooking scene shows Sara wearing black camera glasses while slicing a tomato, with open space for the HTML lesson and technique feedback. These are close reference-derived illustrations, rather than pixel-identical copies.

The presentation retains the same kitchen between scenes. Cohesive vector layers move gently; title transformation, progressive profile reveals, keyboard navigation, replay, and reduced motion are preserved.

All recurring instances use the shared assets, including the school comparison and personalized-learning kitchen. The separate opening bowl overlay has been removed because the kitchen already includes a bowl. Scene 7 first presents the 1040 × 450 black glasses product SVG on a quiet cream background, then opens into Sara's kitchen before introducing light AR hints. Its two states remain controlled by the presenter.

The culinary-school illustration in scenes 4 and 6 now shares a single 1443 × 1090 SVG drawn against the supplied two-chef reference. Its geometry is editable vector artwork; the painted grain is procedural rather than an embedded image. The scene-4 Sara overlay has been removed, and the scene-6 artwork is fitted without cropping while keeping the question readable.
