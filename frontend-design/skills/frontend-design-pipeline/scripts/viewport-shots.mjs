#!/usr/bin/env node
// Multi-viewport screenshot capture for the frontend-design-pipeline (Step 5, channel 2).
// Usage: node viewport-shots.mjs <url-or-file> [outDir] [--full]
//   <url-or-file>  http(s)://… , file:///… , or a local path (converted to file://)
//   [outDir]       output directory, default ./.shots
//   --full         full-page screenshots instead of viewport-height
// Requires Playwright with Chromium installed (npx playwright install chromium).
// Emits <outDir>/shot-<width>.png for 375 / 768 / 1440 and prints the paths.

import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { resolve, isAbsolute } from 'node:path';
import { pathToFileURL } from 'node:url';

const VIEWPORTS = [
  { width: 375, height: 812 },   // mobile
  { width: 768, height: 1024 },  // tablet
  { width: 1440, height: 900 },  // desktop
];

const args = process.argv.slice(2).filter(a => a !== '--full');
const fullPage = process.argv.includes('--full');
let target = args[0];
if (!target) { console.error('usage: node viewport-shots.mjs <url-or-file> [outDir] [--full]'); process.exit(1); }
if (!/^(https?|file):/.test(target)) target = pathToFileURL(resolve(target)).href;
const outDir = args[1] ? (isAbsolute(args[1]) ? args[1] : resolve(args[1])) : resolve('.shots');
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const consoleErrors = [];
try {
  for (const vp of VIEWPORTS) {
    const page = await browser.newPage({ viewport: vp });
    page.on('console', m => { if (m.type() === 'error') consoleErrors.push(`[${vp.width}px] ${m.text()}`); });
    page.on('pageerror', e => consoleErrors.push(`[${vp.width}px] ${e.message}`));
    await page.goto(target, { waitUntil: 'networkidle', timeout: 30000 });
    if (fullPage) {
      // Scroll through the page so IntersectionObserver-driven reveals fire before capture.
      await page.evaluate(async () => {
        // behavior:'instant' overrides any CSS scroll-behavior:smooth, which would
        // otherwise animate each call and never actually reach the lower sections.
        const step = window.innerHeight * 0.8;
        for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
          window.scrollTo({ top: y, behavior: 'instant' });
          await new Promise(r => setTimeout(r, 120));
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
        await new Promise(r => setTimeout(r, 400));
      });
      await page.waitForTimeout(800);
    }
    const path = resolve(outDir, `shot-${vp.width}.png`);
    await page.screenshot({ path, fullPage });
    console.log(path);
    // horizontal-overflow check: scrollWidth > clientWidth at this viewport is a finding
    const overflow = await page.evaluate(() =>
      document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (overflow > 1) console.log(`  WARN horizontal overflow at ${vp.width}px: +${overflow}px`);
    await page.close();
  }
} finally {
  await browser.close();
}
if (consoleErrors.length) {
  console.log('CONSOLE ERRORS:');
  for (const e of consoleErrors) console.log('  ' + e);
  process.exitCode = 2;
}
