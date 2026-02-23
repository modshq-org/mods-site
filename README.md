# mods-site

Website for [mods](https://github.com/modshq-org/mods) — the CLI model manager for AI image generation. Browse, search, and discover models at [mods.sh](https://mods.sh).

## What's here

- **Landing page** — product overview, features, install instructions
- **Model browser** (`/models`) — search, filter by type, sort 100+ models
- **Model detail pages** (`/models/[id]`) — variants, VRAM requirements, dependencies, install commands

## Development

```bash
npm install
npm run dev          # Dev server at localhost:4321
npm run build        # Production build to ./dist/
npm run preview      # Preview production build
```

The `prebuild` step fetches the latest registry data from [mods-registry](https://github.com/modshq-org/mods-registry) before building.

## Tech stack

- [Astro](https://astro.build) 5 — static site generation
- TypeScript
- Vanilla CSS with CSS custom properties

## Related

- [mods](https://github.com/modshq-org/mods) — CLI tool
- [mods-registry](https://github.com/modshq-org/mods-registry) — model manifests
