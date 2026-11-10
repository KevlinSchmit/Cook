# Custom vector illustrations

These are authored SVG drawings, not generated raster images or automatic image traces. Geometry and contour accents can be edited directly. Each file contains a descriptive title, grouped composition, and comments identifying the drawn objects.

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

Texture uses clipped SVG turbulence with soft-light blending; some assets also use sparse vector scumble. No bitmap images are embedded. The latest kitchen, Sara, caregiver group, and culinary-school drawings closely reconstruct the supplied reference compositions using authored paths. Procedural texture does not reproduce the painted references pixel for pixel.

## Narrative assets

- `sara-ar.svg`: the same Sara portrait with translucent AR glasses; matching bounds allow a clean crossfade.
- `culinary-school.svg`: 1443 × 1090; reference-coordinate reconstruction of the supplied two-chef kitchen composition, shared unchanged by scenes 4 and 6. The cobalt arch, tilted tall toque, smaller right cap, center hood/red pan, board, yellow stockpot, hands and commercial station follow the supplied layout. No Sara overlay, rotation, cropping, or embedded bitmap is used.
- `caregivers.svg`: 2048 × 683; the supplied five-standing-adult composition, including the swaddled infant, green striped bag, cane, green-shirted man, and mother carrying a child. The flat cobalt background blends into scene 5, with procedural grain confined to the figures.
- `barrier-tuition.svg`, `barrier-commute.svg`, `barrier-time.svg`, `barrier-childcare.svg`: 300 × 300; independent obstacles for accumulating narrative beats.
- `ingredient-tomato.svg`, `ingredient-carrot.svg`, `ingredient-onion.svg`: reusable contours from the original food illustration, used for parallax and AR recognition.
- `receipt.svg`: wordless bill illustration carrying the exact HTML statistic.

No text is embedded in the new illustration assets. On-screen narrative and AR capability titles remain HTML, and are constrained to the user's specified copy.

## Revised construction

Figures are authored from whole gestures rather than reused geometric body-part symbols. Face and neck share one contour; shoulders and sleeves follow a continuous clothing silhouette; hands continue the arm contour and meet the held objects. The caregiving group preserves the five supplied standing poses and their infant, bag, cane, and child contact. The school cooks lean into chopping and stirring with coherent tool grip and countertop perspective.

Kitchen vessels, produce, transport, papers, plush toy, and receipt use coherent organic silhouettes rather than primitive assemblies. The separate ingredient drawings match the still-life vocabulary. Grain remains procedural SVG; no bitmap illustrations or image generation were added.
