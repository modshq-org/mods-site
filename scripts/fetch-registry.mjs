#!/usr/bin/env node
/**
 * Pre-build script: fetches the latest registry index.json before Astro builds.
 * Used in CI/CD (Cloudflare Pages) so we never commit stale registry data.
 *
 * Fallback: if fetch fails, uses existing src/data/registry.json (local dev).
 */

import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(__dirname, '..', 'src', 'data', 'registry.json');

const REGISTRY_URL =
  process.env.REGISTRY_URL ||
  'https://raw.githubusercontent.com/modshq-org/mods-registry/main/index.json';

async function main() {
  console.log(`[fetch-registry] Fetching ${REGISTRY_URL}`);

  try {
    const res = await fetch(REGISTRY_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    writeFileSync(OUTPUT, JSON.stringify(data, null, 2));
    console.log(`[fetch-registry] ✓ ${data.items.length} models → ${OUTPUT}`);
  } catch (err) {
    if (existsSync(OUTPUT)) {
      console.warn(`[fetch-registry] ⚠ Fetch failed (${err.message}), using existing local copy`);
    } else {
      console.error(`[fetch-registry] ✗ Fetch failed and no local copy exists`);
      process.exit(1);
    }
  }
}

main();
