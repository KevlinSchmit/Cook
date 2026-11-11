# Presentation illustrations

The presentation combines editable SVG drawings and generated editorial PNG illustrations. Generated figures and objects keep the established gouache palette and whole-figure craftsmanship. Raster images are used directly, never hidden inside an SVG wrapper. Text and digital overlays remain independent HTML layers.

- `kitchen.svg`: 1672 × 941. A reference-coordinate redraw with the navy arched window, trailing vine, blue/orange hanging pans, shelf jars, orange counter, blue cabinets, striped towel, produce board, vegetable bowl, and utensil crock. The whole scene and miniature kitchen views share this asset.
- `sara.svg`: original 849 × 1852 reference coordinates, with viewBox `0 185 849 1667` removing only blank space above the bun. The reference's swept hair, profile, cream blouse, red apron, bowl, stirring hand, and supporting forearm are preserved. The supporting arm is one continuous silhouette in front of the bowl; apron shadows are clipped to the cloth.
- `salad-bowl.svg`: 720 × 730. Retained standalone still life, currently unused because the new kitchen already includes its reference bowl.

## Palette

| Ink | Color |
| --- | --- |
| Vermilion | `#e74829` |
| Cobalt | `#304c98` |
| Bowl blue | `#338aa4` |
| Cream | `#f5ecd6` |
| Charcoal | `#191f22` |
| Herb green | `#20764e` |
| Olive | `#819238` |
| Peach | `#efa786` |
| Onion lilac | `#d5a0c2` |

Vector texture uses clipped SVG turbulence with soft-light blending; some assets also use sparse vector scumble. Generated art uses its painted paper texture. The kitchen, Sara, caregiver group, and culinary-school drawings closely follow supplied reference compositions; their textures do not reproduce those references pixel for pixel.

## Narrative assets

- `sara-ar.svg`: the same Sara portrait with black AR glasses and a tiny camera; matching bounds allow a clean crossfade.
- `cook-glasses.svg`: 1040 × 450; transparent product illustration of matte-black AR glasses with clear lenses, connected temples, restrained edge highlights, and a small camera. Scene 7's first state contains this hero alone with the product name and tagline.
- `cook-ar-kitchen.png`: 1672 × 941 generated kitchen illustration; Sara wears black camera glasses and slices a tomato with natural connected hands. Scene 7's former lesson/fingertip boxes have been removed. No text or UI is baked into the artwork.
- `cook-pov.png`: 1672 × 941 generated first-person view of the user's hands preparing tomatoes on a home kitchen counter, with a board, knife, vegetables, and ordinary equipment. Scene 8 adds detection and a visionOS-inspired knife-skills panel as HTML.
- `finished-dish.png`: 1322 × 1190 generated RGBA plated dish with a transparent background. Scene 10 places Flavor, Texture, and Seasoning self-evaluation controls around it; no scores or checklists are baked into the art.
- `sara-return.png`: 1672 × 941 generated brighter kitchen scene. The same Sara smiles while holding her glasses; homemade dishes and her baby eating safely from a bowl complete the family scene.
- `learning-world.png`: 1672 × 941 generated panorama linking three home kitchens: a headscarf-wearing woman, seated older adult with a nearby cane, and father cooking beside a child. Its quiet cream upper band leaves room for the closing sentence before the final brand reveal.
- `culinary-school.svg`: 1443 × 1090; reference-coordinate reconstruction of the supplied two-chef kitchen composition, shared unchanged by scenes 4 and 6. The cobalt arch, tilted tall toque, smaller right cap, center hood/red pan, board, yellow stockpot, hands and commercial station follow the supplied layout. No Sara overlay, rotation, cropping, or embedded bitmap is used.
- `caregivers.png`: 2172 × 724 generated RGBA artwork closely following the five-standing-adult reference, including the swaddled infant, green striped bag, cane, green-shirted man, and mother carrying a child. The background is transparent, with no colored rectangle or extra scenery. Replaces the rejected manual caregiver SVG.
- `barrier-tuition.svg`, `barrier-commute.svg`, `barrier-time.svg`, `barrier-childcare.svg`: 300 × 300; independent obstacles for accumulating narrative beats.
- `ingredient-tomato.svg`, `ingredient-carrot.svg`, `ingredient-onion.svg`: reusable contours from the original food illustration, retained for the passion scene's ingredient parallax.
- `receipt.svg`: wordless bill illustration carrying the exact HTML statistic.

No visible text is embedded in the illustration assets. Narrative, tomato detection, knife-skills guidance, and self-evaluation controls remain HTML. The demo placeholder has no illustration: it is white with centered “for demo”. The former five-capability scene has been removed.

## Revised construction

Figures are authored from whole gestures rather than reused geometric body-part symbols. Face and neck share one contour; shoulders and sleeves follow a continuous clothing silhouette; hands continue the arm contour and meet the held objects. The caregiving group preserves the five supplied standing poses and their infant, bag, cane, and child contact. The school cooks lean into chopping and stirring with coherent tool grip and countertop perspective.

Kitchen vessels, produce, transport, papers, plush toy, and receipt use coherent organic silhouettes rather than primitive assemblies. Existing vectors retain procedural grain; generated caregiver, cooking, dish, and home-learning artwork use painted paper texture. `scripts/export_html.py` embeds every used asset and all three stylesheets (`style.css`, `film.css`, `ending.css`) into the standalone presentation.
