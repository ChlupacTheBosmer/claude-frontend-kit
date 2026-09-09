# frontend-design — operating notes

## Before the verification gates run

The gate scripts need Node dependencies and a Chromium binary that are **not** committed.
Once per machine:

```bash
"${CLAUDE_PLUGIN_ROOT}/scripts/bootstrap.sh"
```

If a gate fails with `Cannot find module 'playwright'` or `browserType.launch: Executable
doesn't exist`, bootstrap has not been run. Run it; do not work around it.

## Skill routing

**Start with `frontend-design-pipeline` for any frontend design or redesign work.** It is a
router: it owns sequence, scope, and conflict resolution, and tells you when to read the others.

Do **not** load `impeccable` or `design-taste-frontend` alongside `impeccable-taste` — the latter
is a deliberate merge of both parents and restates their rules with conflicts already arbitrated.
Loading them together produces contradictory direction.

- `frontend-design-pipeline` — entry point. Read this first.
- `impeccable` — concept-led path: direction contract, detector, out-of-thread review.
- `impeccable-taste` — category-canon path: for client/service-business sites and unattended
  builds where stochastic direction-picking is unreviewable.
- `design-taste-frontend` — anti-slop rules for landing pages and portfolios.
- `ui-registries` — supplies materials (Motion Primitives, Watermelon UI, Haikei, Agentation),
  not taste. Not a design-direction skill.

## Verification gates

| Script | Checks |
|---|---|
| `skills/frontend-design-pipeline/scripts/axe-run.mjs <url\|file>` | WCAG violations via axe-core. Exit 2 = violations, printed as JSON lines. |
| `skills/frontend-design-pipeline/scripts/viewport-shots.mjs <url\|file>` | Screenshots at 375/768/1440 + overflow and console errors. Writes `.shots/`. |
| `skills/impeccable/scripts/detect.mjs --json <files>` | Anti-slop/craft-floor detection. Local only, no network. |
| `skills/impeccable/scripts/doctor.mjs --json` | Project self-diagnostic. |
| `skills/impeccable-taste/scripts/check-overflow.mjs <file>` | Horizontal overflow at 390px and 360px. |
| `skills/impeccable-taste/scripts/check-images.mjs <file>` | Missing/placeholder images. No placeholders, ever. |
| `skills/impeccable-taste/scripts/check-dashes.mjs <file>` | Visible em/en dashes in shipped copy. |

## Design review

The `design-review` agent drives a real browser through the bundled `chrome-devtools` MCP.
It needs a running dev server or a `file://` artifact. It reports problems and their impact,
never prescriptions, triaged as Blocker / High-Priority / Medium-Priority / Nit.

## Paths

Everything inside this plugin is addressed as `${CLAUDE_PLUGIN_ROOT}/...`, which the harness
resolves to the install directory. Never hardcode an absolute path into these files.

## Copy conventions

Zero em-dashes in shipped copy. Czech client-facing copy uses correct vykání, „české uvozovky",
and non-breaking spaces after one-letter prepositions.
