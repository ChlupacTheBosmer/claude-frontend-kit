---
name: frontend-design-pipeline
description: Use for ANY frontend design or redesign work - landing pages, marketing sites, portfolios, editorial, dashboards, app shells, product UI, forms, settings, onboarding, empty states, components. Also for design critique, UX review, audits, polish, typography, layout, spacing, color, motion, accessibility, responsive behavior, theming, design systems, and making a design bolder, quieter, or less generic. This skill is the entry point and supersedes design-taste-frontend and impeccable - it sequences both and resolves their conflicts. Load this INSTEAD of either one; it tells you when to read them. Not for backend-only or non-UI tasks.
version: 1.0.0
---

# Frontend design pipeline

> **Unattended client builds route elsewhere.** If the job is a Czech service-business site built
> from a brief with no human design decisions — the category canon played straight — use the
> **`canon-site`** skill instead. It replaces Step 2 with SERP-derived canon extraction, drops the
> human gate, and defers back to this file for Step 3's build rules and image sourcing. Everything
> below is the concept-led path.

A router, not a rulebook. It owns **sequence, scope and conflict resolution** across two skills that
each solve half the problem:

- **impeccable** (`~/.claude/skills/impeccable/`, global) is a directed process with real
  verification machinery: concept derivation, a committed direction contract, a static/browser
  detector, an out-of-thread finish review. Its weakness is that nothing opens its front door.
- **design-taste-frontend** (`~/.claude/skills/design-taste-frontend/`) is a rulebook with a
  62-item pre-flight. It fires reliably. Its weakness is that every check is self-graded prose.

Direction from the first, mechanics and gating from the second, verification from the first again.
Never let the rulebook pick the direction.

**Do not load either skill's SKILL.md wholesale up front.** This file names the specific file and
section to read at each step. Reading both in full costs ~2 400 lines and produces exactly the
conflict this router exists to prevent.

---

## Step 0. Inventory (once, before anything else)

Impeccable is installed globally at `${CLAUDE_PLUGIN_ROOT}/skills/impeccable/`, so its scripts and
reference files are available from any project. Its own docs cite that absolute path; run the
scripts from wherever they are, but **keep cwd at the user's project** — every artifact path
(`PRODUCT.md`, `DESIGN.md`, `.impeccable/`, surface briefs) resolves from cwd, not from the script
location.

Two facts still change the path. Establish them, do not assume them.

1. **Is image generation available?** A harness-native tool, an MCP image tool, or the API fallback.
2. **Is a browser driver available?** `chrome-devtools` MCP or a running dev server.

State the answer in one line, then follow **Degradation** at the bottom. Do not silently run the
reduced path while describing the full one.

---

## Step 1. Classify the surface, then pick sources

Classification is by **the surface requested**, not the product. A developer tool's landing page is
Persuade. A fashion house's changelog is Read.

| Mode | Surface | Direction source | Build rules | Pre-flight |
|---|---|---|---|---|
| **Persuade** | Landing, marketing, campaign, pricing | impeccable `new-work.md` (full) | taste §§2–12 (full) | taste §14 (all rows) |
| **Experience** | Portfolio, gallery, showcase | impeccable `new-work.md` (full) | taste §§2–12 (full) | taste §14 (all rows) |
| **Operate** | App UI, dashboard, admin, settings, editor, tools | impeccable `new-work.md` + `operate.md` | impeccable `operate.md` is primary; taste §2.A for the design-system choice, §§4.5–4.6, 4.11, 6, 9 only | taste §14 **mechanical rows only** |
| **Read** | Docs, guides, articles, changelogs | impeccable `new-work.md` + `operate.md` (typography and consistency) | as Operate, plus prose measure | taste §14 mechanical rows only |

**On Operate and Read:** taste §13 declares dashboards, data tables, multi-step forms and code
editors out of its scope, and it is right to. Its landing-page rows actively damage product UI.
Skip every row about heroes, eyebrows, logo walls, zigzag alternation, marquees, scroll cues and
section layout families. Keep contrast, CTA wrap, form contrast, interactive states, theme lock,
motion justification, Core Web Vitals, and the AI-tell list. Impeccable's `operate.md` carries the
discipline these surfaces actually need: earned familiarity, fixed rem scale, restrained color,
full state vocabulary, 150–250 ms transitions, no orchestrated page-load sequence.

A section, component or state inside an existing surface **inherits that surface**. Do not run
Step 2 for a local addition; go straight to Step 3 on the incumbent system.

---

## Step 2. Direction (impeccable owns this; taste is not consulted)

Run `node ${CLAUDE_PLUGIN_ROOT}/skills/impeccable/scripts/context.mjs --target <path>` once, follow its directives, then read
`reference/new-work.md` and follow its phases. Do not paraphrase them from memory.

The phases, so you can tell whether one was skipped: decide what is already true (redesign vs
established world vs greenfield) → one round of two or three questions → derive seven visual
systems from the audience's cultural world → `concept-seed.mjs` rolls which direction is built and
deals challengers → present one committed direction plus surviving challengers → commit the world
(color strategy, faces, light or dark from the physical use scene) → **write the direction contract
and DESIGN.md before the first build edit** → visualize comps for approval.

Two rules that exist because this step is where synthesis usually fails:

- **The contract sets the dials, never the reverse.** taste's three dials (VARIANCE / MOTION /
  DENSITY) and its use-case preset table are a fast heuristic for when no direction exists. Once a
  direction contract is written, derive the dial values *from the contract* and discard the preset
  row. A preset that pulls a committed world back toward the category median has undone the entire
  point of Step 2.
- **Do not read taste §0–1 during this step.** Its brief-inference and dial sections will produce a
  confident "design read" that feels like a direction and is not one. A design read names a
  category; a contract names a world, a first viewport, and a refusal.

The contract is five blocks, 150 words maximum, in the artifact's opening comment: THESIS,
OWN-WORLD, STORY, FIRST VIEWPORT, FORM. If any block reads like a mood, the direction is not
decided and Step 3 has not started.

---

## Step 3. Build (both sources; the conflict table governs)

Load impeccable `reference/craft-floor.md` immediately before editing UI, and pull taste sections
by need per the Step 1 table. Build the committed direction, not a safer interpretation of it.

**Supply lines.** When the build needs materials — components, motion, fonts, icons,
illustration, generated imagery, grounding references, Tailwind v4 — read
`references/design-stack.md` (this skill's folder) and follow its pointers. Three of its rules
are load-bearing enough to repeat: any shadcn work starts with `references/shadcn/SKILL.md` +
`references/shadcn/rules/base-vs-radix.md`, because shadcn's default primitive switched from
Radix to Base UI in July 2026 and unguided output is systematically wrong; non-trivial
animation work starts with
`references/motion/SKILL.md` (create and audit workflows); and Tailwind v4 questions resolve
against the local snapshot in `references/tailwind-v4/`, never from recalled v3 patterns.

### The precedence rule

**Union the prohibitions. The direction contract can earn any of them by name.**

Where both skills prohibit, take the stricter. Where only one prohibits, that prohibition stands.
Where the committed world natively uses a prohibited device, the contract's OWN-WORLD block names
it and it is permitted for that build only. This is not a compromise between the two skills; it is
impeccable's own stated rule ("these are the category's defaults, not bans; the brief's own words
can earn any of them") applied to the merged set.

Your own habit never earns an exception. Only the brief or the written contract does.

### The six real conflicts

| Axis | Resolution |
|---|---|
| **Icons** | Library icons by default: Phosphor, HugeIcons, Radix, Tabler; one family per project; standardized stroke width (taste §3.C). Never hand-roll a one-off because the library lacked a glyph; install a second library. **Exception:** when OWN-WORLD names icon grammar as a world device, author the full set in that grammar. Authored-set-or-library-set, never a mix. |
| **Light / dark** | Mode decides. **Persuade / Experience:** commit one mode, chosen from one sentence of physical use scene; taste's "both modes mandatory" does not apply to a committed brand surface. **Operate / Read:** ship both and honour `prefers-color-scheme` (taste §6.C); users live in these surfaces and arrive with a system preference. |
| **Imagery** | **No placeholders, ever. Photography comes from Unsplash.** This overrides both sources: taste's `picsum.photos` tier and its "clearly-labeled placeholder slot" fallback are both retired, as is any TODO comment standing in for an image. See **Image sourcing** below. Image generation is still correct for what photography cannot supply: UI screenshots, abstract textures, invented product renders. Never div-based fake screenshots (taste §4.8), never gradients, glass or generic icon tiles where an authored asset belongs (impeccable). |
| **Fonts** | Union of both ban lists: impeccable's 16 training-data defaults (Fraunces, Playfair, Cormorant, Lora, Crimson, Newsreader, Syne, Space Grotesk, Space Mono, IBM Plex, Inter-as-display, DM Sans, DM Serif, Outfit, Plus Jakarta Sans, Instrument Sans) plus taste's Fraunces and Instrument Serif. Naming one anyway requires a reason in the contract that no other face satisfies; subject association is never that reason. **Operate / Read are exempt** for workhorse UI faces and system stacks, which `operate.md` explicitly permits. |
| **Cards** | Nested cards never, no exception (impeccable, absolute). Cards only where elevation communicates real hierarchy; otherwise group with `border-t`, `divide-y` or negative space (taste §4.4). At VISUAL_DENSITY > 7, generic card containers are banned. |
| **Em-dashes** | Zero in all shipped output: headlines, body, quotes, attribution, captions, buttons, alt text (taste §9.G). Impeccable has no position here, so nothing is being overruled. This one is absolute and the contract cannot earn it. |

### Image sourcing

Every image on a shipped page is a real, resolving asset. A page is not done while any image slot is
empty, commented out, or filled by a grey box.

**Three sources, and they are not interchangeable.** Reviewed 2026-08-01 against the six slots a
real page has to fill, on live results rather than reputation.

| Source | Auth | Licence | Owns |
|---|---|---|---|
| **Unsplash** | `UNSPLASH_ACCESS_KEY` (set) | Unsplash licence, commercial OK | **People.** Portraits, team, anyone-at-work, faces. Also contemporary interiors and lifestyle context |
| **Wikimedia Commons** | none | **Varies per file, read each one** | Real equipment, named places, buildings, vehicles, actual workspaces |
| **Openverse** | none | **Must filter** (see below) | Working scenes and detail from the Flickr pool; broadest reach of the three, most variable quality |

**People are Unsplash-only.** Wikimedia and Openverse both fail the portrait slot: their people
photography is documentary or dated and reads wrong on a current commercial page. Any slot with a
recognizable human face goes to Unsplash. Equipment, tools, workspaces, vehicles and materials go
to Wikimedia first, which is precise about real named objects, then Openverse for breadth.

This is a single point of failure on the hardest slot. **Pexels** and **Pixabay** cover the same
contemporary-people ground, both need a free key, and neither is configured; register one if a
project needs more range in faces than Unsplash gives.

**Tested and rejected, do not re-add:** The Met, Cleveland Museum, Library of Congress. All three
return verified images for trade queries — Library of Congress scored 18/18 — but the material is
historical, so a high retrieval rate measured only that the API answered, not that the photograph
was usable. The Art Institute of Chicago IIIF endpoint returns 403 here even with its required
`AIC-User-Agent` header. If a brief genuinely calls for archive material, these are worth revisiting
as a deliberate choice for that concept; they are not general-purpose sources.

**Licence discipline.** CC0 and public domain are safe. Openverse aggregates the full Creative
Commons range including non-commercial and no-derivatives, and its unfiltered default will hand you
`by-nc-nd` — always request `&license_type=commercial,modification`, which returns only `by` and
`by-sa`. Wikimedia licences vary per file, so read each one. Never ship NC or ND material on client
work.

1. **Query the API, never assemble a URL by hand.** Photo and object IDs are opaque strings and are
   the single most-fabricated asset in generated pages. Unsplash:
   `GET https://api.unsplash.com/search/photos?query=<subject>&per_page=15` with header
   `Authorization: Client-ID $UNSPLASH_ACCESS_KEY`, which also returns dimensions, colors and
   photographer credits. Museum APIs return an image URL directly on the object record.
2. **Verify each URL resolves before shipping.** Fetch it and confirm a 200 and an image
   content-type. A 404 hotlink is worse than no image, and impeccable already requires this
   ("verify stock URLs resolve"). Museum URLs can carry non-ASCII characters, so URL-encode the
   path before fetching or the check fails on a URL that is actually fine.
3. **Size at the source.** Unsplash:
   `images.unsplash.com/photo-<id>?w=<width>&q=80&fm=webp&fit=crop`. Museum CDNs and IIIF endpoints
   take their own size parameters. Request the width the layout actually uses; never ship a 4000 px
   hero, and never a 128 px thumbnail scaled up.
4. **Credit the source.** Photographer for Unsplash, institution and object for museum material.
   The licences mostly do not require it; it costs one line and the APIs return the fields.
5. **Keep the register consistent across the surface.** Mixing polished Unsplash lifestyle shots
   with grainy Openverse documentary frames reads as a scrapbook. Where a page needs both people
   and equipment, match them on light, saturation and finish, or push all of them through the same
   treatment (a duotone, a consistent grade, a shared crop ratio) so they read as one shoot.
6. **Generated imagery stays labeled.** Where image generation covers what photography cannot, the
   asset is still authored at production fidelity, and anything a visitor could mistake for a real
   photograph, screenshot or data view is labeled synthetic. Commercial and factual claims stay
   uninventable regardless of the asset: no invented prices, customers, benchmarks or capabilities.

Everything else in the two skills is additive, not contradictory. Where impeccable is stricter
(hero-metric templates, section numbering, eyebrow grammar, `border-left` accents, monospace as
costume) and where taste is more specific (CTA wrap, duplicate CTA intent, logo-wall discipline,
bento cell counts, italic descender clearance, theme lock), take both.

---

## Step 4. Pre-flight gate (taste §14, filtered)

Run taste §14 as written, minus the rows Step 1 excluded for the surface. It is the only
mechanically checkable list either skill has. Treat "count the eyebrows" and "count the layout
families" literally; the rows are phrased as counts because counting is what makes them checkable.

Add three rows the merge requires:

- [ ] **Direction contract present** in the artifact's opening comment, all five blocks, none of
      them a mood?
- [ ] **DESIGN.md exists and matches what was built** (new or replaced world only)?
- [ ] **Every conflict-table exception taken is named in OWN-WORLD**, not assumed?
- [ ] **Zero placeholders**: no `picsum`, no TODO image comments, no empty slots, no grey boxes?
- [ ] **Every image URL fetched and confirmed 200** with an image content-type, not assumed valid?
- [ ] **Licences cleared**: nothing NC or ND; Openverse queried with `license_type=commercial,modification`; each Wikimedia file's licence read individually?
- [ ] **One source family** across the surface, not a scrapbook of stock plus archive plus generated?

For **Operate / Read** surfaces, `references/web-interface-guidelines.md` (Vercel, 100+
mechanical interaction/a11y/forms rules) supplies the rows taste §14 skips for product UI —
run it lint-style against the changed code, not as prose to agree with.

A self-graded checklist is weak evidence. It is the gate, not the verification. Step 5 is the
verification.

---

## Step 5. Verify (impeccable owns this; do not self-attest)

Three channels, in order of strength. Use every one that Step 0 found available.

1. **Detector.** `node ${CLAUDE_PLUGIN_ROOT}/skills/impeccable/scripts/detect.mjs --json <files>`. Local files, no network,
   no npx. Static HTML/CSS cascade, regex and visual-contrast engines. This is the only real
   mechanical checker in either skill. Act on its findings; do not re-audit the same rules by hand.
   Never add a token or a DESIGN.md rule purely to silence a finding.
2. **Browser pass.** Inspect desktop and mobile against the direction contract and the request.
   With `chrome-devtools` MCP available this is a real check, not a described one: navigate,
   screenshot both viewports, read computed values for the contrast and spacing rows.
   Mechanical helpers (all local, see `references/design-stack.md` › Verification toolkit):
   `node <this-skill>/scripts/viewport-shots.mjs <url-or-file>` captures 375/768/1440 PNGs and
   fails on console errors or horizontal overflow (bundled Chromium — never the system Chrome);
   `npx @axe-core/cli <url>` for deterministic WCAG findings; `odiff` for before/after pixel
   diffs on redesigns. These supplement the contract inspection, they do not replace it.
3. **Out-of-thread review.** Spawn the registered **`design-review`** subagent
   (`~/.claude/agents/design-review.md`, adapted 2026-08-01 from OneRedOak/claude-code-workflows,
   rewired to chrome-devtools MCP) with a fresh context. Give it the original request, the
   confirmed answers, the artifact path or dev-server URL, the direction contract, DESIGN.md, and
   any detector findings. It runs a live-environment-first, seven-phase pass (flows, viewport
   sweep, polish, WCAG walk + axe, robustness, code health, console) against the contract and
   `references/web-interface-guidelines.md`, and reports a triage matrix plus contract fidelity.
   Apply the material fixes, then finish. **This review never runs inside the build thread** -
   the build thread has already decided the artifact is good.

   `new-work.md` names a shipped agent `impeccable-finish-reviewer`; that agent is still not
   registered here — `design-review` is its standing replacement. If `design-review` is missing
   too (another machine), fall back to a general-purpose subagent with the brief above and say so.

Do not run a second detector pass after the review.

---

## Step 6. Human review in Open Design

**This is the only human gate in the pipeline.** Steps 2 to 5 run autonomously; the human sees the
page once, when it is finished and already verified. Never hand over work with open detector
findings — fixing contrast in front of the reviewer wastes the one gate you get.

The review medium is the artifact itself. Peter edits the page directly in Open Design, and **those
edits are the feedback** — there is no separate round of comments to parse.

### 6.1 Hand off

1. **Resolve the project.** `get_active_context()` first. If it returns `active:false`, call
   `list_projects()` and match by name; create one with `create_project` only if nothing fits.
   Never guess a project id.
2. **Write the artifact.** `create_artifact(name, content)` for a new entry file — it **rejects
   existing targets**, so use `write_file(path, content)` to iterate on something already there.
   Write the siblings too (tokens CSS, JSX modules, assets); `get_artifact` will pull them back as
   a set.
3. **Snapshot exactly what you wrote** to `.od-review/<name>.<ISO-timestamp>` in the Claude Code
   project, before handing over. Without this snapshot there is no diff later, and his edits become
   indistinguishable from your own output.
4. **Say it is ready and end the turn.** Do not poll `get_active_context` waiting for him to look;
   it expires about five minutes after the last interaction and blocking on it burns the session
   for nothing. Name the project and file, state what was verified, and stop.

### 6.2 Read back

On the next turn, or whenever he says he is done:

1. `get_artifact()` — entry file plus every referenced sibling in one call.
2. **Diff against the snapshot.** Every hunk is signal. If the diff is empty, say so rather than
   inventing improvements he did not ask for.
3. **Changes made by Open Design's own agents count as his.** If he ran a skill through
   `start_run` — `impeccable-design-polish` is the obvious one — those edits arrive in the same
   diff. Treat them as accepted direction, not as noise to reconcile.

### 6.3 Classify every edit, then persist the rules

Each hunk is one of two things, and they are handled differently:

| Kind of edit | Examples | What to do |
|---|---|---|
| **One-off content** | Copy rewrites, a swapped image, a corrected fact, a changed CTA label | Apply and move on. Do not generalize a single copy fix into a rule. |
| **A design rule** | Spacing changed, a colour replaced, type scale adjusted, a component restructured, motion removed | Apply, **and write it into DESIGN.md** at the project or app boundary. A correction you have to be given twice is a rule that was never recorded. |

This is what makes a late gate worth having. One review that produces durable rules beats three
review rounds that produce none.

### 6.4 Never revert a human edit

A later automated pass must not undo something he changed by hand. If the detector or a subsequent
review flags a manual edit — he removed a focus ring, he set a contrast ratio below AA, he used a
banned face — **surface the conflict in one line and let him decide.** Silently restoring your own
version is the worst failure mode this step has: it reads as the tool ignoring him, and it will
happen again on every subsequent run until the rule is recorded.

The same logic as impeccable's own rule about tokens added to silence a hook, running the other
way: a check does not outrank a person.

---

## Degradation

| Step 0 finding | What changes |
|---|---|
| **No image generation** | Skip comp visualization; the shipped page outranks optional imagery. Page photography is unaffected — it comes from Unsplash, which needs no generation tool. For the few assets photography cannot supply, author them in code at full fidelity. Never fill the gap with hand-rolled decorative SVG, and never with a placeholder. |
| **No browser driver** | `scripts/viewport-shots.mjs` ships its own Playwright + bundled Chromium, so screenshots and console checks stay available even without the chrome-devtools MCP; only interactive inspection (hover states, computed values) is lost. Say which half ran. Do not describe an inspection you did not perform. |
| **Open Design daemon not running** | Every OD tool fails with "cannot reach the daemon at 127.0.0.1:7456". This is the app being closed, not the project being missing. Write the artifact to the ordinary project path, say the app is closed, and offer to push it into OD once it is open. Step 6.2's diff still works: snapshot on disk against whatever he edits. |
| **Narrow refinement of existing code** | Steps 2 and 4's contract rows do not apply. Inherit the incumbent world, read one representative source of visual truth before editing, apply Step 3's conflict table and Step 5's detector. Offer `init` afterward rather than blocking on it. |
| **Impeccable missing** (another machine, or a reinstall that relocated it) | Locate it before assuming it is gone; the global install is the norm here. If it genuinely is not present: run Step 2's phases in-thread from the list above, but guard the failure the dice roll exists to prevent — write out all seven candidates, name the category's rut explicitly, and never present a ranked menu of your own candidates, because the safest card wins every time. `AskUserQuestion` replaces the served decision page. Step 5 loses the detector, so the browser pass and the out-of-thread review both become mandatory. Say which steps ran reduced. |

### Optional: the detector as an edit-time hook

Step 5's detector can also run automatically, per project, as a `PostToolUse` and `Stop` hook. It is
**off everywhere by default and should stay that way** outside projects with real UI: it was
previously enabled in a scratch folder where it fired 160 times for 84 seconds and surfaced nothing.
Enable it only where a project has a substantial UI surface, by adding to that project's
`.claude/settings.local.json`:

```json
{"hooks":{"PostToolUse":[{"matcher":"Edit|Write|MultiEdit","hooks":[{"type":"command",
"command":"node \"${CLAUDE_PLUGIN_ROOT}/skills/impeccable/scripts/hook.mjs\"",
"timeout":5,"statusMessage":"Checking UI changes"}]}]}}
```

When the hook is active it already enforces the mechanical craft-floor checks during editing; act on
its findings rather than re-auditing the same rules by hand, and never add a token or a DESIGN.md
rule purely to silence one.

---

## What this router does not do

It does not restate either skill's content, so it goes stale only when their **structure** changes,
not their rules. If a section number cited here stops resolving, re-read the source and fix the
citation rather than working from this file's summary.

It does not cover: native iOS and Android (impeccable `audit.native.md` and `adapt.native.md`
directly), live in-browser variant iteration (impeccable `live.md`), or non-UI work.
