---
name: impeccable-taste
description: Use when building or redesigning a frontend surface where the direction should follow the category standard rather than a novel visual concept - client sites, service-business pages, landing pages, marketing sites, and especially unattended or automated builds where stochastic direction-picking is unreviewable. Also use when the user asks for "the combined skill", "taste + impeccable", or a canon-path build. Not for concept-led brand-differentiating work (native impeccable) and not for backend or non-UI tasks.
---

# impeccable-taste

Internal skill (Peter's stack). A deliberate merge of two parents, arbitrated per
layer, built from an A/B comparison of both parents on an identical brief
(2026-08-01, Prague plumber test) and the user's verdict on the results:

- **Visual system** = design-taste-frontend's rulebook → [references/visual-system.md](references/visual-system.md)
- **Content architecture & craft** = impeccable's substance → [references/content-canon.md](references/content-canon.md)
- **Images** = Peter's standing policy → [references/image-sourcing.md](references/image-sourcing.md):
  **no placeholders anywhere, ever; photography comes from Unsplash** (people) /
  Wikimedia / Openverse (equipment, places), API-queried and verified; generation
  only for what photography cannot supply. This overrides anything softer in the
  other two references.
- **Direction** = the category canon, played straight. Impeccable's concept-seed
  rolling, seven-candidate tournaments, and interactive decision pages are removed
  by design: their variance is unreviewable in automated runs.

Do NOT load design-taste-frontend or impeccable alongside this skill; the two
reference files above ARE those skills' surviving content, with conflicts already
resolved. Loading a parent reintroduces the conflicts this skill exists to settle.

## Conflict rule (the whole merge in one line)

On visual questions (palette, type, shape, layout mechanics, motion, theming, AI
tells): **visual-system.md wins.** On content questions (modes, section substance,
copy concreteness, proof, states, microcopy): **content-canon.md wins.** On
direction: **the canon path only** (content-canon.md Section 4).

## Workflow

1. **Read all three reference files** before writing any code. They are the skill.
2. **Design read + dials** (visual-system Sections 0-1): declare the one-line read
   and the three dial values.
3. **Mode + truth + canon** (content-canon Sections 1-4): name the visitor mode,
   what already exists, the category canon, and the top-ranked structure.
4. **Direction contract** (content-canon Section 5): four blocks in the artifact's
   opening comment before code.
5. **Source the images** per image-sourcing.md BEFORE or during the build, never
   after: query the APIs (`UNSPLASH_ACCESS_KEY` is set on this machine), verify,
   size at source, credit. Image slots are filled with real assets as they are
   designed; a slot never exists without its image.
6. **Build** under both rulebooks. Full state cycles, authored content, labeled
   synthetic material, no invented commercial claims.
7. **Gates** (below), then finish per content-canon Section 8.

## Unattended mode

When running without a user in the loop (subagent, cron, pipeline): never ask
questions; state every assumption in the direction contract's ASSUMPTIONS block;
the canon path is mandatory (no concept invention); the run summary must name which
gates ran and their results. No approval gates for mechanical decisions.

## Language

Client-facing Czech surfaces: Czech copy written natively (never translated from
English), vykání, „české uvozovky", non-breaking spaces after one-letter
prepositions (k, s, v, z, o, u, a, i), dates as `15. 7. 2026`. Internal/technical
strings and code comments: English.

## Gates (mechanical, run before declaring done)

Run the full pre-flight matrix in visual-system Section 14 plus the craft-floor
verify list in content-canon Section 7. Then these two machine checks, which
history shows survive neither parent's prose rules alone:

**1. Em/en-dash scan (visible text only; HTML comments are exempt):**

```
node C:\Users\petko\.claude\skills\impeccable-taste\scripts\check-dashes.mjs <artifact.html>
```

**2. Mobile overflow assertion (390px and 360px; the check that caught what
impeccable's own finish review missed).** Uses bundled Chromium via
playwright-core (resolved from the frontend-design-pipeline scripts tree, with a
fallback to normal resolution); never launches system Chrome. Accepts a file path
or a dev-server URL:

```
node C:\Users\petko\.claude\skills\impeccable-taste\scripts\check-overflow.mjs <artifact.html | http://localhost:PORT/route>
```

**3. Image gate (zero placeholders, every image real and resolving):** fails on any
`picsum.photos` reference, any TODO image comment, any empty src, any image URL not
returning 200 with an image/* content-type, any missing local image file:

```
node C:\Users\petko\.claude\skills\impeccable-taste\scripts\check-images.mjs <artifact.html | url>
```

All scripts exit 0 on OK and 1 on failure; do not inline these checks as shell
one-liners (backslash escaping differs per shell and has broken the check in
production).

All three must print OK. An OVERFLOW at either width means a decorative element broke
the layout box (diagonal seams, full-bleed patterns, rotated bands are the usual
culprits); fix the element, do not clamp with `overflow-x: hidden` on body, which
hides the symptom and breaks position: sticky descendants.

For framework projects (React/Next), the same two gates apply to the rendered page
(run against the dev-server URL instead of file://).

## Provenance & deltas

- visual-system.md = design-taste-frontend SKILL.md verbatim except: header
  replaced (merge context + unattended-mode note), the entire placeholder/picsum
  tier of the image strategy replaced by the no-placeholders policy (pointing to
  image-sourcing.md), never-populated block-library section stubbed out.
- content-canon.md = distilled from impeccable's SKILL.md (modes), new-work.md
  (truth, ask round, commitment, contract, build rules) and craft-floor.md (verify
  + refuse lists), with concept-seed/tournament/serve-question machinery and the
  PRODUCT.md/DESIGN.md persistence contract removed; the "standing exit" (canon,
  played straight) promoted from escape hatch to the only direction path.
- image-sourcing.md = ported from frontend-design-pipeline's Image sourcing
  section (Peter's standing policy, 2026-08-01: no placeholders ever, Unsplash for
  people, Wikimedia/Openverse for objects, licences filtered, URLs API-queried and
  verified).
- The parents remain installed and untouched; this skill supersedes them only when
  it is the one loaded.
