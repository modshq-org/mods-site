#!/usr/bin/env node
/**
 * Pre-build script: generates cli.json from `mods cli-schema`.
 * Requires the mods binary to be available (cargo install or cargo build).
 *
 * Fallback: if mods isn't available, uses existing src/data/cli.json (CI/local dev).
 */

import { execSync } from 'child_process';
import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(__dirname, '..', 'src', 'data', 'cli.json');
const MODS_DIR = join(__dirname, '..', '..', 'mods');

async function main() {
  console.log('[cli-schema] Generating CLI schema...');

  try {
    let json;

    // Try `mods cli-schema` directly (if installed)
    try {
      json = execSync('mods cli-schema', { encoding: 'utf-8', timeout: 10000 });
    } catch {
      // Try building and running from sibling mods directory
      if (existsSync(join(MODS_DIR, 'Cargo.toml'))) {
        console.log('[cli-schema] mods not in PATH, trying cargo run...');
        json = execSync('cargo run --quiet -- cli-schema', {
          encoding: 'utf-8',
          cwd: MODS_DIR,
          timeout: 120000,
        });
      } else {
        throw new Error('mods binary not found and no sibling mods/ directory');
      }
    }

    // Validate it's valid JSON
    const data = JSON.parse(json);
    writeFileSync(OUTPUT, JSON.stringify(data, null, 2));
    console.log(`[cli-schema] ✓ ${data.commands.length} commands → ${OUTPUT}`);
  } catch (err) {
    if (existsSync(OUTPUT)) {
      console.warn(`[cli-schema] ⚠ Generation failed (${err.message}), using existing local copy`);
    } else {
      console.error(`[cli-schema] ✗ Generation failed and no local copy exists`);
      process.exit(1);
    }
  }
}

main();
