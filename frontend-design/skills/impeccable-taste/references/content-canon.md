# Content & Canon (impeccable-taste)

> The content rulebook of the merged skill. Adapted from impeccable (new-work,
> craft-floor, modes) with the stochastic concept-selection machinery removed.
> On content architecture, section substance, copy concreteness, and direction,
> THIS file is the authority. On any visual question (palette, type, shape,
> layout mechanics, motion, theming), [visual-system.md](visual-system.md) wins.

## 1. Mode: name what the visitor's success looks like

Choose the mode from the requested surface, not the product, and state it before
building.

- **Persuade:** the visitor decides and acts; design is the product. Landing pages,
  marketing, campaigns, pricing. Earn attention and action.
- **Operate:** the visitor completes a task. App UI, dashboards, editors, admin,
  settings, tools. Scanability, consistency, and native expectations outrank
  expression. Brand lives in precise details.
- **Read:** the visitor understands something. Docs, articles, guides, help.
  Structure for comprehension, then make the reading experience worth staying in.
- **Experience:** the visitor is inside the work itself. Portfolios, galleries,
  showcases. The artifact leads from the first viewport; the interface recedes.

A tool's landing page is still Persuade; a docs index is Read, not Persuade.

## 2. Decide what is already true

Before inventing anything, read what exists: brand assets, existing code, tokens,
prior copy.

- **Redesign:** preserve product truth, content, function, constraints, and explicit
  brand commitments; the old look is evidence of what the subject is, not authority
  over what it becomes.
- **Established world:** inherit it. A coherent identity already present in code is
  not erased by the absence of documentation; document it instead of replacing it.
- **Incomplete brand:** preserve confirmed assets and recognizable traits, expand
  the system for the new surface.
- **No visual authority:** create the world via the canon path (Section 4).

A section, component, or state inside an established surface inherits that surface.
Do not turn a local addition into a new identity exercise.

## 3. What to find out (or infer)

The questions that change the work, per mode:

- **Persuade:** who must act, what they should believe, and which real proof,
  content, or assets can earn that belief.
- **Operate:** the task, information, important states, frequency, constraints.
- **Read:** the reader's question, source material, structure, wayfinding.
- **Experience:** what leads, how exploration unfolds, which interaction matters.

Across modes: what success looks like, what must remain untouched, what would make
a polished result feel wrong.

**Interactive session:** ask at most one round of two or three related questions;
skip settled facts. **Unattended run:** never ask; answer each from the brief and
category knowledge, state the assumptions inline in the direction contract, and
proceed.

## 4. Direction: the canon path (replaces concept selection)

The parent skill selected directions by deriving seven cultural-world candidates and
rolling a seed to pick one. That machinery is deliberately removed: its variance is
unreviewable in automated runs. The parent's own "standing exit" is this skill's
default and only path:

**The category standard, played straight, executed at full fidelity, without irony
or smuggled quirk.**

1. **Name the canon.** State in 2-3 sentences what the category's standard page is:
   the sections it always ships, the ordering, the conversion pattern, the trust
   devices. If real competitors are known or discoverable, name 2-3 products this
   should sit alongside; their craft level is the bar. If not, name the category
   pattern from knowledge and say so.
2. **Derive structure deterministically.** From the content, task, and user
   behavior, derive 3-5 materially different section structures, ordered by fit.
   Ship the top-ranked one. No dice, no tournament, no user decision page. (A
   brief- or user-pinned structure beats the ranking, always.)
3. **Differentiate through craft, not concept.** The page competes on execution
   quality (typography, spacing, states, copy concreteness, conversion clarity),
   not on a themed visual world. Concept theming (a page that "is" a van, a
   split-flap board, a terminal) is out of scope for this skill; when a brief
   explicitly demands it, that work belongs to native impeccable, not here.

## 5. The direction contract (record before code)

State the chosen direction as a contract in the artifact's opening comment, four
short blocks, 120 words max:

- **THESIS:** the one job this surface does and the canon it executes.
- **AUDIENCE + PROOF:** who must act and which real proof earns their belief.
- **FIRST VIEWPORT:** the exact composition, what is where at what scale, where the
  primary action sits.
- **ASSUMPTIONS:** everything inferred rather than given (unattended runs).

If a block reads like a mood, the direction is not decided yet. The finish pass
audits the render against this contract.

## 6. Build with full commitment (content rules)

- **The first viewport is a thesis, not a header.** A first-time visitor must know
  what this is, why it matters, and what to do within seconds. The memory test: if
  someone left after one viewport, what would they describe an hour later? If the
  honest answer is a mood, the content has not committed.
- **Offer the visitor their fork.** When the audience arrives in two distinct
  states (urgent vs. planned, buyer vs. researcher, new vs. returning), give each
  state its own labeled path near the top, with the copy and CTA that state needs.
  One generic CTA for two different intents converts neither.
- **Prove, don't claim.** Show the subject doing its job: specifics a competitor
  could not copy-paste. Sections that restate a claim in different words add
  length, not substance. Concrete beats abstract in every string: "V Praze obvykle
  do 60 minut" beats "rychlá reakce"; "Měď, plast i ocel" beats "všechny materiály".
- **Truth binds claims, not demonstrations.** Author demonstration content (names,
  entries, copy, thumbnails) at full fidelity and label it synthetic where a
  visitor could mistake it for real. NEVER invent commercial or factual claims:
  prices, customers, benchmarks, review scores, certifications, capabilities. An
  unanswerable commercial claim is OMITTED (restructure the section so nothing is
  missing) or replaced by a verifiable transparent promise; never shipped as a
  visible placeholder (no placeholders anywhere, ever - see
  [image-sourcing.md](image-sourcing.md) for the image half of this rule).
  Transparent, verifiable promises (price known before work starts, written
  guarantee terms) are stronger trust devices than invented social proof.
- **Author the assets; never substitute chrome.** Every blank the brief left open
  is yours to author at production fidelity; content is authorable, claims are
  labelable, no section is omittable. Gradients, glass, and generic icon tiles
  where an authored asset belongs are the gap wearing chrome.
- **Pace the scroll.** Vary density, scale, and quiet inside one grammar; a dense
  passage earns a quiet one, and the page ends anchored by a real close. One
  spacing rhythm throughout, more space above a heading than below it.
- **Microcopy carries the relationship.** Form fields explain why they're needed
  ("ať vím, komu volám zpět"), buttons name their action, errors name the problem
  and the recovery, the post-submit state says what happens next and offers the
  faster channel. Anti-spam reassurance where a visitor would hesitate ("Žádný
  newsletter, žádné obvolávání.").
- **Full state cycles.** Hover, focus-visible, disabled, loading, error, empty,
  success. A form without a designed failure and success state is unfinished.

## 7. Craft floor (verify on the built result, not the intention)

- **Contrast:** body and placeholder text ≥ 4.5:1, large text ≥ 3:1. On colored
  surfaces tint secondary text from that hue or the foreground; never gray.
- **Depth:** shadows carry an offset and a soft blur. A zero-offset colored halo is
  decoration.
- **Spacing:** tight groups, generous separation, more space above a heading than
  below it. Read the computed values.
- **Type:** body measure 65-75ch, display max 6rem, balanced headings, obvious
  scale and weight steps. Run the real copy at every breakpoint and fix overflow.
- **Motion:** one authored moment, not scattered effects and not one identical
  entrance on every section. Content visible by default.
- **States:** hover, disabled, loading, error, empty. Plus real content, working
  controls, responsive composition, keyboard focus.
- **Copy:** the product's own language. Controls name their action; errors name the
  problem and the recovery.
- **Coverage:** every brief requirement present and findable within seconds.

Refuse-by-default list (the brief's own words can earn any of them; reaching for
one when the axis is free means you were not deciding):

- Same-size icon+heading+text cards as the page structure; nested cards are always
  wrong.
- The hero-metric template: big number, small label, supporting stats, accent.
- A tracked uppercase eyebrow over every section.
- Section numbers (01 / 02 / 03) unless the sequence itself carries information.
- Gradient text; glass and blur as decoration; colored `border-left` above 1px on
  cards and callouts; monospace as a costume for "technical".
- Light or dark picked by category habit. Pick it from the use scene: who, where,
  under what ambient light. (Execution of the choice follows visual-system.md's
  dark-mode protocol.)

## 8. Finish

Inspect desktop and mobile renders, critique against the direction contract and the
brief, fix material gaps, re-inspect. On a Persuade surface verify the mode did its
job: what this is, why it matters, what to do, within seconds. Then run the
mechanical gates in SKILL.md. In unattended runs there is no out-of-thread reviewer;
the mechanical gates plus a fresh-eyes pass against the contract substitute for it,
and the run's summary must say which gates ran and what they found.
