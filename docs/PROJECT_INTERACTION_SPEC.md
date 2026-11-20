# Interaction Spec — Scroll Choreography

> **Note (2026-11-16):** this document describes the earlier zooming map version. That engine
> (`src/lib/scroll.ts`, `src/atlas/`, `StatusGeometry.tsx`) was removed when Roman found the zoom
> blurry and parts cut off. The current deck is 25 composed steps; the map survives as the vector
> research map on steps 1 and 19 (`src/data/atlas.ts`), and the colour and line roles are defined
> in `src/data/provenance.ts` (`ROLE_STYLE`). See `README.md` and `docs/GENENV_REFOCUS_AUDIT.md`.

The design rule after Roman's review: **the scroll tells the story**. No content is behind a
click, no panel scrolls internally, no timer runs, and project details appear as large
typography and live drawings — never as small boxed chips. Every motion demonstrates a
relationship (rule → geometry, geometry → evidence, proposal → human judgment) and runs under
the presenter's scroll control, forwards and backwards. Reduced motion (`X` or the OS setting)
replaces interpolation with direct states; the same content appears.

## Engine

`src/lib/scroll.ts` maps window scroll to (scene, progress 0–1), eases the camera between
per-scene keyframes (gliding toward the next scene over each section's tail), and feeds progress
to the map. Vignettes exist only in their own scene; everything else drops to a 12%-opacity
context layer, keeping every frame minimal. The yellow route draws continuously across the whole
presentation (`ROUTE_TARGETS` per scene).

## Scene choreography (progress windows)

| Scene | What the scroll performs |
|---|---|
| 01 Opening | title as site designation → axes explained → route preview |
| 02 Trajectory | camera climbs Tabriz → ITU → SFU; the active campus ring lights; award boards glow; side blocks carry one campus each with its photo |
| 03 Foundation | eCAADe chamber sweeps transparency 10→90% and the “perceived NEARER” arrow flips at 60% (the published finding, demonstrated); ISS halo pulses beside the numeric chip; BioTerrarium pipeline streams and its fog thins |
| 04 PMG | 8 constraint rows parse one-by-one (active row highlighted) → setback planes rise on the lot → the envelope extrudes → parcel turns irregular → urban block grows AI-classified masses → review stamp |
| 05 ZLA | pipeline flows → grounded answer quotes clause C04 → the laneway case severs the pipeline with an orange ✕ and stamps NOT COVERED → the site check draws 10×37 m, computes 162.6 m², and flips 1→2 floors |
| 06 VCM | corridor ceiling draws from the viewpoint → flat-cap building rises (10 fl · 18,360 m²) → strips trim to the ceiling with live counters up to 18 fl · 25,608 m² · +39.5% → the footprint sweeps 7 orientations against its chart → evidence-state lines (real / verified / placeholder / unexecuted) |
| 07 EMA | Generator, four Critics, Orchestrator assemble → agent paths pulse (they argue; evaluators compute) → 5+5 seed tracks draw toward the 95% line (4/5 vs 1/5) → the 10-point Pareto front settles (r = −1.000) → verdict stats stamp, NOT CONFIRMED in red |
| 08 Synthesis | the six-stage chain draws above the four parcels with dotted leaders |
| 09 PhD | survey-staked site; the provenance spine lights link by link, each showing its label + what the record keeps (the real corridor revision), with the conceptual-demonstration caveat pinned |
| 10 GenEnv | the attributed structures reveal on yellow foundations; the provisional connector extends from the proposed site into the funded program |
| 11 Conversation | full atlas; three questions; links |

## Story layer

`src/ui/StoryLayer.tsx` renders each scene's blocks over soft gradient scrims (no boxes):
kicker, large title, at most a few sentences, and a stat row of oversized mono numbers
(`story-stat-value`) colour-coded by meaning — red for the falsified hypothesis, cyan for
verified computation, yellow for provenance, orange for NOT COVERED and caveats. Every block
fits the viewport; links are footnote-sized and optional.
