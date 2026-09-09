# Design-stack supply lines

Sourcing catalog for the frontend-design-pipeline. Loaded on demand from the router; nothing
here is a standing install except where marked. Researched and verified 2026-08-01
(full survey: `projects/Dump/frontend-design-stack-research.md`).

## Components (Operate/Read surfaces only)

**shadcn MCP — project-scoped, never user-scoped.** In a project with real product UI:
`npx shadcn@latest mcp init --client claude` (writes the project's `.mcp.json`). Gives
list/search/install across any registry in `components.json`. Registries worth namespacing:
Origin UI (~500 small variants), Kibo UI (41 complex stateful components: Gantt, Kanban,
editors), Magic UI (landing flourish, has llms.txt), tweakcn (full themes:
`npx shadcn add @tweakcn/<theme>`). Aceternity is reachable too — it is the "AI-startup
glow" the taste rules ban; deliberate spectacle only, and its license is not plain MIT.

**Standard external registries** (Motion Primitives, Watermelon UI) plus setup snippet and
gotchas live in the standalone **`ui-registries`** skill (`~/.claude/skills/ui-registries/`),
which is invocable outside this pipeline too. Follow its Step 1 when initializing a project.

**Before writing any shadcn code, read `references/shadcn/SKILL.md` and
`references/shadcn/rules/base-vs-radix.md`.** shadcn's default primitive switched from Radix
to **Base UI in July 2026**; training data assumes Radix (`asChild` vs `render` slots), so
unguided output is systematically wrong. `references/shadcn/migrate-radix-to-base/` covers
converting existing projects. Registry mechanics: `references/shadcn/cli.md`, `registry.md`,
`mcp.md`.

Components supply primitives and behavior. Visual identity always comes from the direction
contract — never ship a registry component's default look on a Persuade/Experience surface.

## Motion

- **Read `references/motion/SKILL.md`** for any non-trivial animation work (create or
  audit). Three weighted philosophies, cookbook, anti-slop checklist; its audit workflow
  produces an HTML report with looping demos of flagged animations.
- **Motion (framer-motion successor):** docs index at https://motion.dev/llms.txt — fetch
  it, then the specific doc page, instead of recalling the API. Free AI Kit
  (https://motion.dev/docs/ai-kit): docs search + CSS `linear()` spring generation, no
  account.
- **Prebuilt animated components:** Motion Primitives registry (`ui-registries` skill) before
  hand-rolling a text effect, carousel, or scroll reveal that already exists there.
- **GSAP is 100% free since the Webflow acquisition, including all former Club plugins**
  (SplitText, MorphSVG, DrawSVG, ScrollTrigger), commercial use covered. Reach for it for
  scroll-driven and text-splitting work beyond Motion's sweet spot.
- Paid, not yet active: **Motion+** (one-time, lifetime) — MotionScore render-cost grading
  (works on Motion, CSS, and GSAP code) + 410 premium examples. Peter's call.

## Typography

Both skill ban lists stand (router Step 3). Escape routes when the contract needs a face
the ban list forbids by default:

- **Fontshare** (https://www.fontshare.com) — ITF families (Satoshi, General Sans, Cabinet
  Grotesk…), Google-Fonts-style CSS API: one `<link>` to
  `https://api.fontshare.com/v2/css?f[]=<family>@<weights>&display=swap`. Free commercial
  under ITF-FFL; self-hosting allowed; no modification/redistribution. License page is
  JS-rendered — re-verify terms before client-facing licensing claims.
- **Uncut.wtf** (https://uncut.wtf) — ~150 curated open-source display/experimental faces;
  download and self-host; **license varies per font, read each one**. Feeds
  brutalist/editorial/high-end directions.
- **Google Fonts** stays the baseline for workhorse text faces (OFL/Apache per font).

## Icons

Router Step 3 already mandates library icons, one family per project (Phosphor, HugeIcons,
Radix, Tabler). Supply line: **Iconify API** — search
`https://api.iconify.design/search?query=<term>&limit=32`, then inline the SVG from
`https://api.iconify.design/<set>/<name>.svg` (e.g. `phosphor/arrow-right.svg`). 200+ sets,
~300k icons, plain GET, no install, no invented icon names. Icons are licensed per
collection — stay within the chosen family's license.

## Illustration

- **Humaaans / Open Peeps** (https://humaaans.com, https://openpeeps.com) — modular people
  illustrations, **CC0**, the licensing-safe default when the contract calls for
  illustration.
- unDraw is legal but reads generic; use only when the contract genuinely wants that
  register. Photography rules live in the router (Image sourcing).

## SVG backgrounds (waves, blobs, layered gradients)

**Haikei** (haikei.app) — manual-export-only browser generator; rules and the
generate-in-code default for unattended builds live in the `ui-registries` skill.

## Generated imagery (dormant until a brief needs it)

**Recraft MCP** (official remote) is the designated generation tool when a brief needs
invented product shots, hero art, or brandkit boards — vector-native, style control,
background removal, upscaling. Activate per project:
`claude mcp add recraft --scope project --transport http https://mcp.recraft.ai/mcp`
(OAuth against a Recraft account; billed to its credits). This supersedes the old
"set OPENAI_API_KEY someday" plan. Generalist alternative: Replicate's official MCP
(Flux/Ideogram/Recraft through one server). Generated assets stay labeled synthetic per
the router's image rules.

## Grounding references (anti-sameness)

- Standing practice: feed 2–3 reference screenshots (hand-picked) into context and iterate
  the build against them with viewport screenshots of its own output.
- **Mobbin MCP** (official, May 2026): 620k+ shipped app screens queryable by pattern,
  returns screenshots into context. **Requires a paid Mobbin plan** — Peter's call. When
  active: `claude mcp add mobbin --scope user --transport http https://api.mobbin.com/mcp`.
- Free browsing tier: recent.design (ex-Godly), Land-book (Pro ~$6/mo sells screenshot
  downloads), plus rohitg00/awesome-claude-design for forkable DESIGN.md families.

## Tailwind v4

Tailwind has no official llms.txt; training data emits v3 patterns against v4's CSS-first
`@theme`. For any Tailwind v4 question, use `references/tailwind-v4/SKILL.md` — a local
docs snapshot with an index; load only the relevant page. If the snapshot is missing or
stale (>1 week), its SKILL.md says how to re-sync (license-gated, local only).

## Verification toolkit (Step 5 channel 2)

- `scripts/viewport-shots.mjs <url-or-file> [outDir] [--full]` — 375/768/1440 PNGs +
  horizontal-overflow warnings + console errors (exit 2 if any). Needs Playwright Chromium.
- `odiff a.png b.png diff.png` (global) — before/after pixel diff primitive.
- `node <this-skill>/scripts/axe-run.mjs <url-or-file> [width]` — axe-core (WCAG 2.1 A/AA)
  inside the pipeline's own bundled Chromium; exit 2 = violations as JSON lines. Supplements,
  never replaces, the manual keyboard walk. (The `@axe-core/cli` global is retired: its
  chromedriver binds to the system Chrome, which is both version-fragile and banned here.)
- Playwright `toHaveScreenshot()` for regression on pages that get revisited (baselines are
  platform-suffixed `-win32`; fine while everything is local).
- Lighthouse: chrome-devtools MCP `lighthouse_audit` — already installed, do not add
  another Lighthouse tool.
- Review rubric for code: `references/web-interface-guidelines.md` (Vercel, 100+ mechanical
  interaction/a11y/forms rules). Upstream refreshes: https://github.com/vercel-labs/web-interface-guidelines.

## Out-of-thread review (Step 5 channel 3)

The registered subagent **`design-review`** (`~/.claude/agents/design-review.md`, adapted
from OneRedOak/claude-code-workflows) replaces the generic subagent brief: live-environment
first, 7 phases, viewport sweep, WCAG walk, triage matrix, contract-fidelity report.
Originals for provenance: `references/design-review-upstream/`.

## Conditional activations (document, don't pre-install)

| Trigger | Action |
|---|---|
| Client hands over Figma files | `claude mcp add --transport http figma https://mcp.figma.com/mcp` (free all plans, bidirectional since Feb 2026) |
| Must match an existing brand site | SkillUI (`npx` at need, github.com/amaancoderx/npxskillui) or senlindesign/taste-skill — extract tokens/principles into a project skill |
| Standing CWV/perf/SEO audit leg | addyosmani/web-quality-skills (6 skills; overlaps taste §14 CWV rows) |
| Real WebGL/3D/scroll-cinema brief | freshtechbro/claudedesignskills (22 library-specific skills), install per project |
| Interactive session in logged-in browser | Claude in Chrome: `claude --chrome` (Windows ≥ v2.1.211) |
| Client Figma design-system token pipeline | Figma Console MCP (docs.figma-console-mcp.southleft.com) — DTCG token round-trip |
| A11y as client deliverable | add pa11y as second engine (axe 27% + pa11y 20% ≈ 35% combined detection) |

## Deliberately skipped (2026-08-01 survey — reasons in the research file)

Anthropic frontend-design plugin (subset of this stack), Magic MCP/21st.dev (paid,
transitioning, generic output), UI/UX Pro Max, superdesign (unmaintained), Lost Pixel
(archived), BackstopJS, Chromatic/Percy, Onlook, a11y MCP servers (jsdom — can't do
contrast/focus rules), Deque axe MCP (enterprise sales), Canva/Zeplin MCPs, Font Awesome,
browser-use, fal.ai/Ideogram MCPs, Playwright MCP as standing install (CLI scripts +
chrome-devtools cover both lenses), interface-design (DESIGN.md + Step 6.3 already do its
memory trick). Watch list: **Claude Design (Anthropic Labs)** — competes with the Open
Design gate; evaluate once.
