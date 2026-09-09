---
name: ui-registries
description: 'Connect and use Peter''s preferred external UI component registries and frontend tooling in any React + Tailwind project - Motion Primitives (animated components), Watermelon UI (components, blocks, dashboards, templates), Haikei (SVG backgrounds), and Agentation (visual point-and-click feedback from browser to agent). Use when the user says "use the UI registries", "wire up the component registries", "/ui-registries", "agentation", "watch mode", asks to add animated components, prebuilt blocks, or generated SVG backgrounds, or starts frontend work outside the frontend-design-pipeline skill. Not a design-direction skill: it supplies materials, not taste.'
---

# UI registries

Internal skill. Connects the standing set of external component registries to whatever
frontend project is at hand, independent of any other design skill. Registry URLs and
commands verified 2026-08-26/27.

## Prerequisites

A React project with Tailwind and a `components.json` (shadcn-initialized). If missing:
`npx shadcn@latest init` first. Use the project's package runner (`npx` / `pnpm dlx` /
`bunx --bun`) per its `packageManager`.

## Step 1. Wire the registries (once per project)

1. Add the namespaces to the project's `components.json`:

```json
"registries": {
  "@motion-primitives": "https://motion-primitives.com/c/{name}.json",
  "@watermelon": "https://registry.watermelon.sh/{name}.json"
}
```

2. Optionally register the shadcn MCP, **project scope only, never user scope**
   (standing decision, see frontend-design-pipeline's design-stack.md):
   `npx shadcn@latest mcp init --client claude` (writes the project's `.mcp.json`).
   The CLI alone (`search` / `view` / `add`) covers everything without the MCP.

## Step 2. Use them

```bash
npx shadcn@latest search @motion-primitives -q "text"
npx shadcn@latest search @watermelon -q "pricing"
npx shadcn@latest view @watermelon/animated-accordion
npx shadcn@latest add @motion-primitives/text-effect
npx shadcn@latest add @watermelon/animated-accordion
```

**What lives where:**

- **Motion Primitives** (motion-primitives.com, MIT, ibelick): ~50+ animated components on
  Tailwind + `motion` - text effects, carousels, scroll reveals, micro-interactions. Check
  here before hand-rolling any animation that sounds like a named component.
- **Watermelon UI** (ui.watermelon.sh, MIT, WatermelonCorp/watermellon-registry): 260+
  components plus blocks, dashboards, and full-page templates. React 18+/19,
  **Tailwind v4 required**, Radix + Framer Motion. Broadest block coverage.

**Known issues:**

- Motion Primitives CLI installs occasionally fail to resolve
  (ibelick/motion-primitives#112). Fallback: copy-paste from its docs pages. The site sits
  behind Vercel bot protection - browse the docs, don't curl.
- Third-party registry components may ship hardcoded `@/components/ui/...` imports that
  don't match the project's aliases. After every `add`, read the added files and fix
  imports against `npx shadcn@latest info` (aliases, iconLibrary).

## Haikei (SVG backgrounds)

haikei.app generates wave/blob/grid/gradient SVG backgrounds. Free tier, SVG/PNG export,
**no API, CLI, or npm package (verified 2026-08-26)** - manual export only.

- Peter hand-picks: he exports the SVG, drops it in the project; inline and optimize it.
- Unattended/agent builds: generate equivalent wave/blob paths in code instead of blocking
  on a manual export. Never hotlink; never leave the slot empty waiting for an export.

## Agentation (visual feedback loop, verified 2026-08-27)

Peter clicks elements in the browser and annotates them; the agent receives structured
selectors/positions instead of prose descriptions. Two packages by benjitaylor
(agentation.com), license **PolyForm Shield 1.0.0** (free to use commercially; only bans
building a competing product).

**Setup in a project (dev-only, never shipped to production):**

1. `npm install -D agentation`, then mount the toolbar in dev:

```tsx
import { Agentation } from 'agentation';
// render <Agentation /> alongside the app root, gated on import.meta.env.DEV or NODE_ENV
```

2. Copy-paste mode needs nothing else: Peter annotates, copies markdown, pastes into chat.
3. Agent Sync mode (live loop): register the MCP **project scope**
   (`claude mcp add agentation --scope project -- cmd /c npx agentation-mcp server`, or
   `npx agentation-mcp init`), pass `endpoint="http://localhost:4747"` to the toolbar,
   verify with `npx agentation-mcp doctor`.
4. "Watch mode" = call `agentation_watch_annotations` in a loop: acknowledge each
   annotation, make the change, `agentation_resolve` with a summary, repeat until Peter
   says stop.

React 18+ peer dependency, zero runtime deps. This complements, not replaces, the
design-review verification channels: it is Peter's feedback conduit, not an audit.

## Pre-flight check (before finishing)

- [ ] Registries added to `components.json`, not just used via one-off URLs?
- [ ] Every added component's files read; import aliases and icon library fixed?
- [ ] No MCP registered at user scope?
- [ ] Watermelon components only in Tailwind v4 projects?
- [ ] Any Haikei-style background either a real exported file or generated in code - no
      placeholders?
- [ ] Agentation toolbar gated to dev builds only, and its MCP registered at project scope?
