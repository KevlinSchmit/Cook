# Slide deck workflow

Use the `slide-deck` branch for this user's slide work. Git branch names cannot contain spaces.

The slide is in `index.html`. After each requested update, validate the HTML, commit the change, and immediately push `slide-deck` to `origin`. The user explicitly authorized these pushes. Refresh the Codex HTML view when that capability is available; report any preview or push failure accurately.

## Illustration direction

Use professionally generated or supplied illustration assets for characters, kitchen environments, and major cooking objects. Do not construct these illustrations from CSS geometry or primitive SVG paths. The required direction is mid-century editorial gouache with organic silhouettes, intentional anatomy, bold colors, and visible paper texture, matching the user's references. Animate finished assets as whole images or separated image layers with subtle transforms, parallax, and opacity. Preserve the continuous presentation structure and progressive text reveals.

## Downloadable HTML

After each presentation update, run `python scripts/export_html.py` to refresh `COOK.html`, the single-file offline version with all fonts and illustrations embedded. Validate the exported file and include it in the same commit and push. For delivery, provide the GitHub download URL for `COOK.html`; workspace links have not loaded for this user.
