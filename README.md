# COOK

A continuous, illustrated presentation for **Augmented Reality Culinary Education at Home**. The first two scenes share one animated kitchen: the title transforms into Sara's introduction, with her profile revealed progressively.

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

- Select **Meet Sara** to move into the second scene. Her five details appear in sequence.
- Use the scene indicators, **← / →**, **Page Up / Page Down**, or **Space** to navigate.
- Select **Back to the beginning** to replay the title and transition.
- **Pause motion** pauses the ambient movement of the finished artwork layers. The experience also respects your system's reduced-motion setting.

The presentation adapts to landscape and portrait screens. Future changes belong on the `main` branch and should be committed and pushed after validation, as requested by the project owner.

## Typography

Fraunces by Undercase Type is bundled under the SIL Open Font License; see `assets/OFL.txt`. Font sources: [Google Fonts](https://github.com/google/fonts/tree/main/ofl/fraunces).

## Illustration assets

The editable SVG drawings live in `assets/illustrations/`. Their art direction follows the supplied mid-century culinary posters: bold flat vermilion and cobalt, cream paper, herb greens, long vegetables, expressive hands, small angular faces, asymmetric silhouettes, and sparse ink marks. The kitchen frames the central type with simple, distinctive enamel cookware and a loose organic herb plant. Sara's composition encloses an oversized blue bowl, with a continuous raised forearm and a supporting hand beneath it.

All illustration shapes are authored SVG paths; there are no embedded bitmap illustrations or image-generation assets. A clipped procedural SVG grain filter and sparse vector scumble add print texture. The drawing geometry remains directly editable at any scale.

The presentation retains the same kitchen between scenes. Cohesive vector layers move gently; title transformation, progressive profile reveals, keyboard navigation, replay, and reduced motion are preserved.
