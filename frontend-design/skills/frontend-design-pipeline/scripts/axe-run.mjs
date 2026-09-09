#!/usr/bin/env node
// axe-core accessibility scan in the pipeline's own bundled Chromium (never system Chrome).
// Usage: node axe-run.mjs <url-or-file> [viewportWidth]
// Prints violations as JSON lines; exits 2 when violations exist, 0 when clean.

import { chromium } from 'playwright';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');

let target = process.argv[2];
if (!target) { console.error('usage: node axe-run.mjs <url-or-file> [viewportWidth]'); process.exit(1); }
if (!/^(https?|file):/.test(target)) target = pathToFileURL(resolve(target)).href;
const width = Number(process.argv[3]) || 1280;

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(target, { waitUntil: 'networkidle', timeout: 30000 });
  await page.evaluate(axeSource);
  const results = await page.evaluate(async () =>
    await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] }));
  if (results.violations.length === 0) {
    console.log('axe: 0 violations');
  } else {
    for (const v of results.violations) {
      console.log(JSON.stringify({
        id: v.id, impact: v.impact, help: v.help,
        nodes: v.nodes.slice(0, 5).map(n => n.target.join(' ')),
      }));
    }
    process.exitCode = 2;
  }
} finally {
  await browser.close();
}
