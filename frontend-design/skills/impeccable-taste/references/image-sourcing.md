# Image Sourcing (impeccable-taste)

> Ported from frontend-design-pipeline's Image sourcing section (reviewed 2026-08-01
> against live results). This is Peter's standing image policy and it overrides
> everything the parent rulebooks say about placeholders:
>
> **No placeholders, ever. Photography comes from Unsplash.**
>
> No `picsum.photos`, no TODO image comments, no empty slots, no grey boxes, no
> "styled placeholder panels". A page is not done while any image slot is empty,
> commented out, or filled by a stand-in. Image generation is only for what
> photography cannot supply (UI screenshots, abstract textures, invented product
> renders). Never div-based fake screenshots; never gradients, glass, or generic
> icon tiles where an authored asset belongs.

## Three sources, not interchangeable

| Source | Auth | Licence | Owns |
|---|---|---|---|
| **Unsplash** | `UNSPLASH_ACCESS_KEY` (env var, set on this machine) | Unsplash licence, commercial OK | **People.** Portraits, team, anyone-at-work, faces. Also contemporary interiors and lifestyle context |
| **Wikimedia Commons** | none | **Varies per file, read each one** | Real equipment, named places, buildings, vehicles, actual workspaces |
| **Openverse** | none | **Must filter** (see below) | Working scenes and detail from the Flickr pool; broadest reach, most variable quality |

**People are Unsplash-only.** Wikimedia and Openverse both fail the portrait slot:
their people photography is documentary or dated and reads wrong on a current
commercial page. Any slot with a recognizable human face goes to Unsplash.
Equipment, tools, workspaces, vehicles and materials go to Wikimedia first (precise
about real named objects), then Openverse for breadth.

Pexels and Pixabay cover the same contemporary-people ground; both need a free key
and neither is configured. Register one only if a project needs more range in faces
than Unsplash gives.

**Tested and rejected, do not re-add:** The Met, Cleveland Museum, Library of
Congress (verified retrieval, but historical material unusable on current
commercial pages); Art Institute of Chicago IIIF (403s here even with its required
header). Revisit only as a deliberate archive-material choice for a concept that
calls for it.

## Licence discipline

CC0 and public domain are safe. Openverse aggregates the full CC range including
non-commercial and no-derivatives; its unfiltered default WILL hand you
`by-nc-nd` - always request `&license_type=commercial,modification`, which returns
only `by` and `by-sa`. Wikimedia licences vary per file: read each one. Never ship
NC or ND material on client work.

## The six rules

1. **Query the API, never assemble a URL by hand.** Photo and object IDs are opaque
   strings and are the single most-fabricated asset in generated pages. Unsplash:
   `GET https://api.unsplash.com/search/photos?query=<subject>&per_page=15` with
   header `Authorization: Client-ID $UNSPLASH_ACCESS_KEY` (returns dimensions,
   colors, photographer credits). Museum APIs return the image URL on the object
   record.
2. **Verify each URL resolves before shipping.** Fetch it, confirm 200 and an image
   content-type. A 404 hotlink is worse than no image. URL-encode non-ASCII museum
   paths before fetching or the check fails on a URL that is actually fine.
   (Mechanized as `scripts/check-images.mjs` - see SKILL.md Gates.)
3. **Size at the source.** Unsplash:
   `images.unsplash.com/photo-<id>?w=<width>&q=80&fm=webp&fit=crop`. Museum CDNs
   and IIIF endpoints take their own size parameters. Request the width the layout
   actually uses; never a 4000px hero, never a 128px thumbnail scaled up.
4. **Credit the source.** Photographer for Unsplash, institution and object for
   museum material. The licences mostly do not require it; it costs one line and
   the APIs return the fields.
5. **Keep the register consistent across the surface.** Mixing polished Unsplash
   lifestyle shots with grainy Openverse documentary frames reads as a scrapbook.
   Where a page needs both people and equipment, match on light, saturation and
   finish, or push all images through one treatment (a duotone, a consistent grade,
   a shared crop ratio) so they read as one shoot.
6. **Generated imagery stays labeled.** Authored at production fidelity, and
   anything a visitor could mistake for a real photograph, screenshot or data view
   is labeled synthetic. Commercial and factual claims stay uninventable regardless
   of the asset: no invented prices, customers, benchmarks or capabilities.

## Unattended runs

Sourcing real images is part of the build, not an optional enrichment: query the
APIs, verify, size, credit, ship. If a source is unreachable mid-run (API down, no
network), the run FAILS the image gate and says so in its summary; it does not
quietly ship a placeholder instead.
