# ux-design-skills

Claude Code skill bundle for frontend design and UX work, shared from Peter Kutsos's setup.

## What's inside

| Path | What it is |
|---|---|
| `skills/frontend-design-pipeline/` | Entry point for any frontend design/redesign work; sequences the other skills and resolves their conflicts. Load this first. |
| `skills/impeccable/` | Full UX review and polish: hierarchy, accessibility, motion, design systems. |
| `skills/design-taste-frontend/` | Anti-slop landing pages and portfolios; audit-first redesigns. |
| `skills/impeccable-taste/` | Canon-path builds that follow the category standard; for unattended/automated work. |
| `skills/ui-registries/` | Wires up external component registries: Motion Primitives, Watermelon UI, Haikei, Agentation. |
| `skills/dataviz/` | References and palette validators only. The skill's main instruction file ships inside Claude Code itself (bundled skill), so you already have it; these are its support files. |
| `agents/design-review.md` | Subagent definition for live-preview design review via the chrome-devtools MCP. |

## Install

1. Copy the folders under `skills/` into `~/.claude/skills/`.
2. Copy `agents/design-review.md` into `~/.claude/agents/`.
3. `frontend-design-pipeline/scripts/` needs its dependencies restored: run `npm install` in that folder (`node_modules` was stripped from this repo; `package.json` and lockfile are included).

## Usage

Start any design task with `frontend-design-pipeline`; it tells you when to read the others. Don't load `impeccable` or `design-taste-frontend` alongside `impeccable-taste`, which merges them.
