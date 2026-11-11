# COOK

A continuous, illustrated presentation for **Augmented Reality Culinary Education at Home**. Twelve scenes follow Sara from her kitchen and educational barriers into a first-person AR lesson, self-evaluation, and the possibilities of learning at home.

## Download the complete presentation

[Download COOK.html](https://github.com/KevlinSchmit/Cook/raw/refs/heads/main/COOK.html), then open the downloaded file in Chrome, Edge, Firefox, or Safari. This single file includes all images, fonts, styles, and animations, so it works offline without a server or adjacent files.

After changing the source files, regenerate the downloadable version with `python scripts/export_html.py`.

## View locally

Open `index.html` in a browser, or run this from the repository directory:

```sh
python -m http.server 3000 --bind 0.0.0.0
```

No build, dependencies, external fonts, or credentials are needed. The presentation combines editable SVG drawings with generated editorial illustrations. All assets, textures, and animations run locally.

## Present

- Use **← / →**, **Page Up / Page Down**, or **Space** to navigate individual story beats.
- **Home** returns to the title; **End** jumps to the closing brand composition.
- Twelve scene indicators jump to the start of each scene. The icon buttons reverse/advance one beat; the final next button replays the presentation.
- The motion control pauses ambient movement. The experience respects reduced-motion preferences.
- The self-evaluation scene has checkboxes and 1–5 scores for flavor, texture, and seasoning. These are the presenter's own assessments, not AI-generated grades.

The composition is optimized for 16:9 presentation. All 30 beats are reversible and remain within one document:

| Scene | Manual beats |
| --- | --- |
| COOK title | 1 |
| Meet Sara | 1, with staggered profile details |
| Sara's passion | 2, including the restaurant bill |
| Barriers to education | 6, starting with a clear route before four obstacles and the question |
| The bigger problem | 3, including proportional 50% and 70% illustrations |
| Traditional culinary education | 3, from school to home |
| Introducing COOK | 2, from black AR glasses alone to Sara wearing them in her kitchen |
| Through COOK glasses | 3, from the user's hands to tomato detection and a guided knife-skills step |
| Demo placeholder | 1, a white screen with “for demo” |
| Limitations and solutions | 2, from the finished dish to sensory self-evaluation |
| Returning to Sara | 3, with her new skills, meals, and family moment |
| Final closing | 3, from different home kitchens into the COOK brand composition |

The first seven scenes retain their established narrative, with the requested removal of page 7's lesson and fingertip boxes. The former capability scene has been replaced. Page 8 shows “Tomato Detected”, then a visionOS-inspired frosted-glass panel with “Knife Skills”, “Step 2 of 5”, and “Slice the tomato into even pieces”. Its progress indicator shows 2/5. Scene 4's tuition icon and text still wait for the first click. The figures and percentages are supplied presentation content, not a live data feed.

Future changes belong on `main` and should be committed and pushed after validation, as requested by the project owner.

## Typography

Fraunces by Undercase Type is bundled under the SIL Open Font License; see `assets/OFL.txt`. Font sources: [Google Fonts](https://github.com/google/fonts/tree/main/ofl/fraunces).

## Illustration assets

The artwork lives in `assets/illustrations/`. The 1672 × 941 kitchen SVG includes the arched navy window, vine, hanging pans, shelf, produce, blue bowl, orange counter, and cabinets in their reference positions. The opening scene lightly blurs this background to keep the title readable. Sara's SVG preserves the supplied left-facing cooking pose, cream blouse, red apron, continuous supporting arm, and stirring grip; her AR variant uses identical base geometry with black frames.

The five-person group is a generated 2172 × 724 transparent PNG closely following the supplied reference, with smooth unified figures and no baked background. Other generated art provides Sara's AR cooking scene, the first-person counter view, an isolated finished dish, Sara smiling while holding her glasses beside her baby and homemade meals, and three different home kitchens for the closing panorama. These are close reference-derived illustrations, rather than pixel-identical copies.

The presentation retains the same kitchen between scenes. Cohesive vector layers move gently; title transformation, progressive profile reveals, keyboard navigation, replay, and reduced motion are preserved.

All recurring instances use shared assets. The separate opening bowl overlay has been removed because the kitchen already includes a bowl. Scene 7 presents the black glasses product SVG on a quiet cream field, then opens into Sara's kitchen. The following scene moves into her first-person view. Digital labels and evaluation controls remain independent HTML layers, with translucent panels and background blur.

The offline exporter embeds `style.css`, `film.css`, and `ending.css`, every used PNG/SVG, fonts, and behavior into `COOK.html`. Always regenerate and validate this standalone version after changing the presentation.

The culinary-school illustration in scenes 4 and 6 now shares a single 1443 × 1090 SVG drawn against the supplied two-chef reference. Its geometry is editable vector artwork; the painted grain is procedural rather than an embedded image. The scene-4 Sara overlay has been removed, and the scene-6 artwork is fitted without cropping while keeping the question readable.
