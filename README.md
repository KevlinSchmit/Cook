# COOK

A continuous, illustrated presentation for **Augmented Reality Culinary Education at Home**. The first two scenes share one animated kitchen: the title transforms into Sara's introduction, with her profile revealed progressively.

## Download the complete presentation

[Download COOK.html](https://github.com/KevlinSchmit/Cook/raw/refs/heads/slide-deck/COOK.html), then open the downloaded file in Chrome, Edge, Firefox, or Safari. This single file includes all images, fonts, styles, and animations, so it works offline without a server or adjacent files.

After changing the source files, regenerate the downloadable version with `python scripts/export_html.py`.

## View locally

Open `index.html` in a browser, or run this from the repository directory:

```sh
python -m http.server 3000 --bind 0.0.0.0
```

No build, dependencies, external fonts, or credentials are needed. The kitchen, Sara, and food still life are finished generated gouache illustrations, bundled as high-quality WebP assets with alpha transparency where needed. All assets, textures, and animations run locally.

## Present

- Select **Meet Sara** to move into the second scene. Her five details appear in sequence.
- Use the scene indicators, **← / →**, **Page Up / Page Down**, or **Space** to navigate.
- Select **Back to the beginning** to replay the title and transition.
- **Pause motion** pauses the ambient movement of the finished artwork layers. The experience also respects your system's reduced-motion setting.

The presentation adapts to landscape and portrait screens. Future changes belong on the `slide-deck` branch and should be committed and pushed after validation, as requested by the project owner.

## Typography

Fraunces by Undercase Type is bundled under the SIL Open Font License; see `assets/OFL.txt`. Font sources: [Google Fonts](https://github.com/google/fonts/tree/main/ofl/fraunces).

## Illustration assets

The art direction follows the supplied mid-century editorial references: hand-painted gouache, organic silhouettes, intentional exaggerated proportions, saturated cobalt and vermilion, warm cream, and tactile paper grain. The kitchen environment, Sara portrait, and salad bowl were generated as a coordinated set and are stored in `assets/illustrations/`. The transparent portrait and bowl are composited over the same kitchen throughout the presentation.

Only complete image layers move: the kitchen drifts subtly, the bowl gently rocks, and Sara enters with a soft translation and fade, then a slight whole-image movement. Character anatomy and kitchen objects are never constructed or deformed with CSS or SVG geometry. Text timing, keyboard navigation, replay, reduced motion, and the continuous scene transition are preserved.
