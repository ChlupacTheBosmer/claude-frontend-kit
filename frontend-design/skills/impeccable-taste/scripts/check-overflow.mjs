// Gate 2: mobile horizontal-overflow assertion at 390px and 360px.
// Usage: node check-overflow.mjs <artifact.html | http(s)://url>
// Exit 0 = OK at both widths, exit 1 = OVERFLOW somewhere.
// Uses bundled Chromium via playwright-core; NEVER launches system Chrome.
import { pathToFileURL } from 'url';
import { createRequire } from 'module';

// playwright-core + installed Chromium live in the frontend-design-pipeline
// scripts tree inside this plugin; resolved relative to this file so the path
// is portable across machines. Falls back to normal resolution elsewhere.
const KNOWN = new URL(
  '../../frontend-design-pipeline/scripts/package.json',
  import.meta.url,
).href;
let chromium;
try {
  ({ chromium } = createRequire(KNOWN)('playwright-core'));
} catch {
  ({ chromium } = await import('playwright-core'));
}

const target = process.argv[2];
if (!target) { console.error('usage: node check-overflow.mjs <artifact.html|url>'); process.exit(2); }
const url = /^https?:\/\//.test(target) ? target : pathToFileURL(target).href;

const browser = await chromium.launch();
let fail = 0;
for (const w of [390, 360]) {
  const page = await browser.newPage({ viewport: { width: w, height: 844 } });
  await page.goto(url, { waitUntil: 'networkidle' });
  const sw = await page.evaluate(() => document.documentElement.scrollWidth);
  const ok = sw <= w;
  if (!ok) fail++;
  console.log(`${w}px: scrollWidth=${sw} ${ok ? 'OK' : 'OVERFLOW'}`);
  await page.close();
}
await browser.close();
process.exit(fail ? 1 : 0);
