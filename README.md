# COOK

A continuous, illustrated presentation for **Augmented Reality Culinary Education at Home**. The first two scenes share one animated kitchen: the title transforms into Sara's introduction, with her profile revealed progressively.

## View locally

Open `index.html` in a browser, or run this from the repository directory:

```sh
python -m http.server 3000 --bind 0.0.0.0
```

No build, dependencies, external fonts, or credentials are needed. All artwork is original SVG, and the paper texture and animations run locally.

## Present

- Select **Meet Sara** to move into the second scene. Her five details appear in sequence.
- Use the scene indicators, **← / →**, **Page Up / Page Down**, or **Space** to navigate.
- Select **Back to the beginning** to replay the title and transition.
- **Pause motion** pauses the ambient illustration. The experience also respects your system's reduced-motion setting.

The presentation adapts to landscape and portrait screens. Future changes belong on the `slide-deck` branch and should be committed and pushed after validation, as requested by the project owner.

## Typography

Fraunces by Undercase Type is bundled under the SIL Open Font License; see `assets/OFL.txt`. Font sources: [Google Fonts](https://github.com/google/fonts/tree/main/ofl/fraunces).
