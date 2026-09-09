// Gate 3: image policy - zero placeholders, every image real and resolving.
// Usage: node check-images.mjs <artifact.html | http(s)://url-to-fetch-html-from>
// Exit 0 = OK, exit 1 = FAIL, exit 2 = usage error.
// Checks: no picsum.photos anywhere; no TODO image/photo comments; no empty
// src; every http(s) image URL returns 200 with an image/* content-type;
// local image paths exist on disk. Zero images is a WARN (prose pre-flight
// owns the "page needs images" judgment), not a mechanical FAIL.
import { readFileSync, existsSync } from 'fs';
import { dirname, resolve } from 'path';

const target = process.argv[2];
if (!target) { console.error('usage: node check-images.mjs <artifact.html|url>'); process.exit(2); }

let html, baseDir = null;
if (/^https?:\/\//.test(target)) {
  const res = await fetch(target);
  if (!res.ok) { console.log(`FAIL cannot fetch target page (${res.status})`); process.exit(1); }
  html = await res.text();
} else {
  html = readFileSync(target, 'utf8');
  baseDir = dirname(resolve(target));
}

const failures = [];

// 1. picsum is banned outright, anywhere in the file (comments included).
const picsum = html.match(/picsum\.photos/g);
if (picsum) failures.push(`picsum.photos referenced ${picsum.length}x (banned outright)`);

// 2. TODO image comments are placeholders.
const comments = html.match(/<!--[\s\S]*?-->/g) || [];
for (const c of comments) {
  if (/TODO/i.test(c) && /(photo|image|img|foto|obráz)/i.test(c)) {
    failures.push(`TODO image comment found: ${c.slice(0, 80).replace(/\s+/g, ' ')}...`);
  }
}

// 3. Collect image URLs: img src + srcset entries + inline CSS url(...).
const urls = new Set();
for (const m of html.matchAll(/<img\b[^>]*\bsrc\s*=\s*["']([^"']*)["']/gi)) urls.add(m[1].trim());
for (const m of html.matchAll(/\bsrcset\s*=\s*["']([^"']*)["']/gi)) {
  for (const part of m[1].split(',')) { const u = part.trim().split(/\s+/)[0]; if (u) urls.add(u); }
}
for (const m of html.matchAll(/url\(\s*["']?(https?:\/\/[^"')]+)["']?\s*\)/gi)) urls.add(m[1].trim());

let checked = 0;
for (const u of urls) {
  if (u === '') { failures.push('empty image src'); continue; }
  if (u.startsWith('data:')) continue; // inline assets are fine
  if (/^https?:\/\//.test(u)) {
    checked++;
    try {
      const res = await fetch(encodeURI(u), { redirect: 'follow' });
      const type = res.headers.get('content-type') || '';
      if (!res.ok) failures.push(`${res.status} for ${u.slice(0, 100)}`);
      else if (!type.startsWith('image/')) failures.push(`non-image content-type (${type}) for ${u.slice(0, 100)}`);
    } catch (e) {
      failures.push(`fetch failed (${e.cause?.code || e.message}) for ${u.slice(0, 100)}`);
    }
  } else if (baseDir) {
    checked++;
    if (!existsSync(resolve(baseDir, u.split(/[?#]/)[0]))) failures.push(`local image missing: ${u}`);
  }
}

if (failures.length) {
  console.log(`FAIL image gate (${failures.length}):`);
  for (const f of failures) console.log(`  - ${f}`);
  process.exit(1);
}
console.log(checked === 0
  ? 'OK image gate (WARN: zero image URLs found - confirm the surface genuinely needs none)'
  : `OK image gate (${checked} image URL(s) verified, zero placeholders)`);
