# Performance Provenance — Parametric Research Atlas

An interactive, map-based research presentation for a 20-minute PhD interview with Professor Xun Liu
and the Generative Environments Lab (UBC SALA), built by and for **Roman Jahandideh**.

The entire presentation is one continuous mapped territory. Scenes are camera stops on the atlas:
foundations (Tabriz → Istanbul → SFU), the perception/embodied-systems district, the four
computational-urban-design prototypes, a synthesis chain, the proposed doctoral direction
(*performance provenance*), and an attributed GenEnv context territory.

- **11 main scenes** + 1 appendix scene; **scrolling itself tells the story** — the camera travels, the drawings demonstrate the projects live, and large unboxed text fades through (no clicks required, no timer, no panel scrollbars)
- Every displayed research number comes from `src/data/evidence.ts` (single source of truth)
- Status is drawn, not badged — plinths, hatching, wireframes, dashed footprints (press `L`)
- Works fully offline; no API keys, no external requests at runtime

## Install, run, build

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/ (runs tsc first)
npm run preview    # serve dist/ locally
npm run typecheck  # TypeScript only
```

Node 18+ recommended. The build is relative-path (`base: './'`), so `dist/` runs from any
subpath — GitHub Pages, Netlify, or a local folder.

## Presenting (interview checklist)

1. `npm run build && npm run preview` — present from the production build, not the dev server.
2. Open the site and press `F` for full screen — then simply **scroll**: the story, the camera,
   and the live project demonstrations are all scroll-driven (arrow keys and `Space` scroll too).
3. `?` shows the controls; `L` opens the legend; `N` shows your speaker notes.
4. `R` restarts from the opening; `PageDown`/`PageUp` jump whole scenes.
5. The appendix scene (after Conversation) is outside the main route — use it only if asked.
6. Rehearse offline once: disconnect the network; everything must still work (external links are
   the only thing that won't open).

Full key map: `docs/PRESENTATION_CONTROLS.md`. Scene-by-scene script: `docs/PRESENTATION_SCRIPT.md`.

## Deployment

**Netlify** — repository includes `netlify.toml`; connect the repo (build `npm run build`,
publish `dist`), or drag-and-drop the `dist/` folder onto app.netlify.com/drop.

**GitHub Pages** — build, then publish `dist/` to the `gh-pages` branch
(`npx gh-pages -d dist`) or use a Pages workflow; the relative base needs no extra config.

## Updating a research claim or asset

- **Claims / numbers:** edit the matching record in `src/data/evidence.ts` (and the audit trail in
  `docs/PROJECT_EVIDENCE_AUDIT.md`). Components never hard-code research numbers.
- **Scene text / script / timing:** `src/data/scenes.ts`.
- **Project facts, links, limitations:** `src/data/projects.ts`.
- **Education / awards:** `src/data/trajectory.ts`.
- **Citations in the source drawer:** `src/data/citations.ts`.
- **Images:** drop the file in `public/assets/…`, reference it from the data file, and record the
  source in `docs/ASSET_MANIFEST.md`.

## Repository map

```
src/data/       scenes, evidence, projects, citations, trajectory, provenance, atlas geometry
src/atlas/      the SVG map: grid, districts, route, parcels, status geometry, scene vignettes
src/scenes/     scroll sections (one per scene)
src/ui/         panels, HUD, legend, source drawer, notes, chapter map, sheets, minimap
src/state/      app store (scene/step, mode, panels, timer, interactive state)
src/lib/        camera controller, keyboard map
docs/           evidence audit, claim matrix, script, controls, mapping language, design audit…
```

## Documentation

| File | What it holds |
|---|---|
| `docs/PRESENTATION_SCRIPT.md` | Spoken script per scene with target timings |
| `docs/PRESENTATION_CONTROLS.md` | Keyboard + presenter controls |
| `docs/PROJECT_EVIDENCE_AUDIT.md` | Every claim → source → verification status → limitation |
| `docs/CLAIM_STATUS_MATRIX.md` | Implemented / tested / published / accepted / revised / proposed / placeholder / unexecuted |
| `docs/PROJECT_INTERACTION_SPEC.md` | Each interaction and the explanatory purpose it serves |
| `docs/MAPPING_LANGUAGE.md` | Axes, data→geometry rules, status drawing language, colour semantics |
| `docs/DESIGN_REFERENCE_AUDIT.md` | What was learned from GenEnv's language, what was deliberately not copied |
| `docs/ASSET_MANIFEST.md` | Asset origins, credits, and missing-asset placeholders |

## Honesty rules baked in

BioTerrarium stays labelled **UNDER REVISION**; the EMA speed hypothesis stays **NOT CONFIRMED**
(red); corridor elevations stay **PLACEHOLDER** (orange hatch); the unexecuted Grasshopper step
stays grey-dashed; the PhD direction stays a dotted footprint marked **for discussion**; GenEnv's
projects live in a separately bounded territory labelled *attributed external territory — not my
projects*.
