// gta6-meme-x-01 — "The Third Protagonist"
//
// The entry is the X post itself: a GTA 6 meme whose first picture is meme.png.
// This program hands the gate what it needs: POST.json (the post's address)
// and a byte-identical copy of the meme picture, for provenance.
// It runs on Node 22 with the standard library only and no network:
//
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// sha256 of meme.png as committed in this repository.
const MEME_SHA256 =
  '862111fc86fddd409b101341900dff4742b751497e5534705dd7e170716c6e5d';

mkdirSync(OUTPUT_DIR, { recursive: true });

// 1. POST.json must parse and carry a url string. The placeholder is refused
//    by the gate, so submit only after the real post address is in place.
const postPath = join(BOT_DIR, 'POST.json');
const post = JSON.parse(readFileSync(postPath, 'utf8')) as { url?: unknown };
if (typeof post.url !== 'string' || !post.url.startsWith('https://')) {
  console.error(
    `POST.json must hold a url string, got: ${JSON.stringify(post)}`,
  );
  process.exit(1);
}
copyFileSync(postPath, join(OUTPUT_DIR, 'POST.json'));

// 2. The meme picture, byte-identical, with its hash checked first so a
//    different picture can never slip in under the same name. The PNG header
//    is also read, so a resized or re-encoded picture is caught too.
const memePath = join(BOT_DIR, 'meme.png');
const memeBytes = readFileSync(memePath);
if (createHash('sha256').update(memeBytes).digest('hex') !== MEME_SHA256) {
  console.error(
    'meme.png does not match its committed sha256; refusing to copy a different picture.',
  );
  process.exit(1);
}
const memeWidth = memeBytes.readUInt32BE(16);
const memeHeight = memeBytes.readUInt32BE(20);
if (memeWidth !== 1600 || memeHeight !== 1600) {
  console.error(`meme.png must be 1600x1600, got ${memeWidth}x${memeHeight}.`);
  process.exit(1);
}
copyFileSync(memePath, join(OUTPUT_DIR, 'meme.png'));

console.log(`handed in ${post.url} with meme.png (${MEME_SHA256.slice(0, 12)}…)`);
