# Presentation illustrations

Most assets are authored SVG drawings with directly editable contours. Following the latest request, the caregiver group and new AR cooking scene use generated PNG artwork to improve figure craftsmanship. Raster images are used directly, never hidden inside an SVG wrapper.

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
- `cook-ar-kitchen.png`: 1672 × 941 generated kitchen illustration; Sara wears black camera glasses and slices a tomato with natural connected hands. The right side remains quiet for the lesson and technique-feedback HTML. It contains no baked text or UI.
- `culinary-school.svg`: 1443 × 1090; reference-coordinate reconstruction of the supplied two-chef kitchen composition, shared unchanged by scenes 4 and 6. The cobalt arch, tilted tall toque, smaller right cap, center hood/red pan, board, yellow stockpot, hands and commercial station follow the supplied layout. No Sara overlay, rotation, cropping, or embedded bitmap is used.
- `caregivers.png`: 2172 × 724 generated RGBA artwork closely following the five-standing-adult reference, including the swaddled infant, green striped bag, cane, green-shirted man, and mother carrying a child. The background is transparent, with no colored rectangle or extra scenery. Replaces the rejected manual caregiver SVG.
- `barrier-tuition.svg`, `barrier-commute.svg`, `barrier-time.svg`, `barrier-childcare.svg`: 300 × 300; independent obstacles for accumulating narrative beats.
- `ingredient-tomato.svg`, `ingredient-carrot.svg`, `ingredient-onion.svg`: reusable contours from the original food illustration, used for parallax and AR recognition.
- `receipt.svg`: wordless bill illustration carrying the exact HTML statistic.

No visible text is embedded in the illustration assets. On-screen narrative, capability titles, and the newly requested lesson/feedback remain HTML, constrained to the user's specified copy.

## Revised construction

Figures are authored from whole gestures rather than reused geometric body-part symbols. Face and neck share one contour; shoulders and sleeves follow a continuous clothing silhouette; hands continue the arm contour and meet the held objects. The caregiving group preserves the five supplied standing poses and their infant, bag, cane, and child contact. The school cooks lean into chopping and stirring with coherent tool grip and countertop perspective.

Kitchen vessels, produce, transport, papers, plush toy, and receipt use coherent organic silhouettes rather than primitive assemblies. The separate ingredient drawings match the still-life vocabulary. Existing vectors retain procedural grain; the new caregiver and AR cooking artwork use generated paper texture.
