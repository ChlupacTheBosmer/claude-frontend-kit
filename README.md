# claude-frontend-kit

Frontend design and UX tooling for [Claude Code](https://claude.com/claude-code), packaged as an
installable plugin. Install once, and it is available in **every** project — no per-project copying.

## Install

```bash
# 1. Point Claude Code at this repo
/plugin marketplace add ChlupacTheBosmer/claude-frontend-kit

# 2. Install the plugin
/plugin install frontend-design

# 3. Restore script dependencies (once per machine, ~115MB)
~/.claude/plugins/marketplaces/claude-frontend-kit/frontend-design/scripts/bootstrap.sh
```

Step 3 is required. `node_modules` (21MB) and the Chromium binary (95MB) are deliberately not
committed; `bootstrap.sh` restores both and verifies every gate. It is idempotent.

Requires Node 18+ and Google Chrome.

## What you get

| Component | What it does |
|---|---|
| **`frontend-design-pipeline`** | Entry point for any frontend design work. A router that owns sequence, scope, and conflict resolution. Bundles Tailwind v4 docs, shadcn guidance (incl. Radix→Base migration), motion references, and the web interface guidelines. |
| **`impeccable`** | Concept-led path: concept derivation, a committed direction contract, a static/browser detector, out-of-thread finish review. 34 reference playbooks. |
| **`impeccable-taste`** | Category-canon path — plays the category standard straight. For client sites and unattended builds where stochastic direction-picking is unreviewable. |
| **`design-taste-frontend`** | Anti-slop rules for landing pages and portfolios. Audit-first on redesigns. |
| **`ui-registries`** | Wires up Motion Primitives, Watermelon UI, Haikei, and Agentation. Supplies materials, not taste. |
| **`design-review` agent** | Drives real Chrome via the bundled chrome-devtools MCP: interaction, responsiveness, visual polish, WCAG 2.1 AA, robustness, console. |
| **chrome-devtools MCP** | Bundled in `.mcp.json` — installs automatically with the plugin. |

## Usage

Start any design task with the pipeline; it tells you when to read the others:

```
Use frontend-design-pipeline to redesign the pricing page
```

Do **not** load `impeccable` or `design-taste-frontend` alongside `impeccable-taste` — that skill
already merges both with conflicts arbitrated.

## Verification gates

All are local, and all exit non-zero on failure so they can gate a build:

```bash
P=~/.claude/plugins/marketplaces/claude-frontend-kit/frontend-design
node $P/skills/frontend-design-pipeline/scripts/axe-run.mjs      dist/index.html
node $P/skills/frontend-design-pipeline/scripts/viewport-shots.mjs dist/index.html
node $P/skills/impeccable-taste/scripts/check-overflow.mjs        dist/index.html
node $P/skills/impeccable-taste/scripts/check-images.mjs          dist/index.html
node $P/skills/impeccable-taste/scripts/check-dashes.mjs          dist/index.html
node $P/skills/impeccable/scripts/detect.mjs --json               src/**/*.tsx
```

## Improving the kit

Edit here, then:

```bash
git commit -am "..." && git push
```

Consumers pick it up with `/plugin update frontend-design`.

Everything inside the plugin is addressed as `${CLAUDE_PLUGIN_ROOT}/...`, which the harness
resolves at runtime. Never hardcode absolute paths — that is what made the original bundle
machine-specific.

## Also included

`frontend-design/references/dataviz/` holds palette validators and chart-design references. These
are support files for the `dataviz` skill that ships inside Claude Code itself, kept outside
`skills/` so they do not register as a broken skill.

## Attribution and licensing

The skill bundle originates from **Peter Kutsos's** Claude Code setup (`ux-design-skills`); the
original README is preserved as [`README.upstream.md`](README.upstream.md).

- `impeccable` declares **Apache 2.0**.
- `frontend-design-pipeline`, `impeccable-taste`, `design-taste-frontend`, and `ui-registries`
  declare **no license**.
- The `design-review` agent is adapted from
  [OneRedOak/claude-code-workflows](https://github.com/OneRedOak/claude-code-workflows), rewired to
  the chrome-devtools MCP and this pipeline's rubric.

Because four of the five skills carry no license grant, redistribution terms are unsettled. If you
are not Peter, confirm with him before relying on or re-sharing this repo.

Packaging, path portability, bootstrap, and plugin manifests by Petr Chlup.
