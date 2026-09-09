// Gate 1: em/en-dash scan on visible text (HTML comments exempt).
// Usage: node check-dashes.mjs <artifact.html>
// Exit 0 = OK, exit 1 = FAIL.
import { readFileSync } from 'fs';

const file = process.argv[2];
if (!file) { console.error('usage: node check-dashes.mjs <artifact.html>'); process.exit(2); }

const visible = readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
const matches = visible.match(/[—–]/g);
if (matches) {
  console.log(`FAIL ${matches.length} visible em/en dashes`);
  process.exit(1);
}
console.log('OK no visible em/en dashes');
