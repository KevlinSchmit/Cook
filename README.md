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

No build, dependencies, external fonts, or credentials are needed. The kitchen, Sara, and food still life are custom SVG vector drawings with procedural print grain. No generated raster artwork is used. All assets, textures, and animations run locally.

## Present

- Use **← / →**, **Page Up / Page Down**, or **Space** to navigate individual story beats.
- **Home** returns to the title; **End** jumps to the final capability.
- Eight scene indicators jump to the start of each scene. The icon buttons reverse/advance one beat; the final next button replays the presentation.
- The motion control pauses ambient movement. The experience respects reduced-motion preferences.
- The curriculum tiles are interactive; selecting a tile highlights its lesson state without adding extra on-screen copy.

The composition is optimized for 16:9 presentation. All 22 beats are reversible and remain within one document:

| Scene | Manual beats |
| --- | --- |
| COOK title | 1 |
| Meet Sara | 1, with staggered profile details |
| Sara's passion | 2, including the restaurant bill |
| Barriers to education | 5, accumulating four obstacles and the question |
| The bigger problem | 3, including proportional 50% and 70% illustrations |
| Traditional culinary education | 3, from school to home |
| Introducing COOK | 2, including the AR product reveal |
| COOK features | 5, one capability per beat |

Scenes 3–8 use only the specified presentation copy. Controls and AR interface artwork are icon-based; additional labels are accessible names rather than visible text. The figures and percentages are supplied presentation content, not a live data feed.

Future changes belong on `main` and should be committed and pushed after validation, as requested by the project owner.

## Typography

Fraunces by Undercase Type is bundled under the SIL Open Font License; see `assets/OFL.txt`. Font sources: [Google Fonts](https://github.com/google/fonts/tree/main/ofl/fraunces).

## Illustration assets

The editable SVG drawings live in `assets/illustrations/`. Their art direction follows the supplied mid-century culinary posters: bold flat vermilion and cobalt, cream paper, herb greens, organic produce, expressive connected hands, rounded profiles, flowing silhouettes, and sparse ink marks. The kitchen frames the central type with simple, distinctive enamel cookware and a loose organic herb plant. Sara holds a blue bowl close to her waist along one supporting forearm while the other hand grips the stirring spoon. Her inclined head, short neck, sloping shoulders, bent arms, and draped apron follow one coherent posture; the AR variant uses identical geometry. Additional original SVGs show the professional kitchen, a diverse group of caregivers, tuition, commuting, time, and childcare.

All illustration shapes are authored SVG paths; there are no embedded bitmap illustrations or image-generation assets. A clipped procedural SVG grain filter and sparse vector scumble add print texture. The drawing geometry remains directly editable at any scale.

The presentation retains the same kitchen between scenes. Cohesive vector layers move gently; title transformation, progressive profile reveals, keyboard navigation, replay, and reduced motion are preserved.

The population and culinary-school figures are also redrawn as complete, interacting poses. Clothing follows shoulder, ribcage, elbow, and hip contours; integrated wrists/palms make infant, cane, blanket, knife, spoon, and pot contact explicit. The kitchen, food, and barrier illustrations share softer object contours, consistent vessel perspective, and the same limited print palette.
