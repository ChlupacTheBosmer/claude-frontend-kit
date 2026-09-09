#!/usr/bin/env bash
# One-time dependency restore for the frontend-design plugin.
# Idempotent: safe to re-run. Installs axe-core + playwright and the Chromium
# binary the verification gates drive.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEPS="$ROOT/skills/frontend-design-pipeline/scripts"

command -v node >/dev/null || { echo "ERROR: node not found. Install Node 18+ first." >&2; exit 1; }
command -v npm  >/dev/null || { echo "ERROR: npm not found." >&2; exit 1; }

echo "==> Installing script dependencies in $DEPS"
( cd "$DEPS" && npm install --no-audit --no-fund )

echo "==> Installing Chromium for Playwright"
( cd "$DEPS" && npx --yes playwright install chromium )

echo "==> Verifying gates"
fail=0
node "$DEPS/axe-run.mjs" --help >/dev/null 2>&1 || true
[ -d "$DEPS/node_modules/axe-core" ] || { echo "  MISSING: axe-core"; fail=1; }
[ -d "$DEPS/node_modules/playwright" ] || { echo "  MISSING: playwright"; fail=1; }
node -e "require('$DEPS/node_modules/playwright-core')" 2>/dev/null || { echo "  MISSING: playwright-core"; fail=1; }

if [ "$fail" -eq 0 ]; then
  echo "OK — verification gates are ready."
  echo "   axe-run.mjs, viewport-shots.mjs, check-overflow.mjs, check-images.mjs, check-dashes.mjs"
else
  echo "Bootstrap incomplete — see MISSING lines above." >&2
  exit 1
fi
