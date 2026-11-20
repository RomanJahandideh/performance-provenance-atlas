# GenEnv Refocus Audit

Audit of the deck as it stood on 2026-11-16 (commit `82a64a2`), before the refocus. Counts
come from `SLIDES` and `STEPS` in `src/data/steps.ts`, measured with the same word counter that
now generates the script and timing docs (`scripts/docs.mjs`).

## 1. The deck before the revision

| Measure | Value |
|---|---|
| Slides in `SLIDES` | **28** |
| Speaker-note words (what `N` shows, what Roman says) | **1,239** |
| Visible words on screen (lines, use lines, caveats, columns, questions) | 1,437 |
| Speaking time at 110 wpm / 100 wpm | 11:16 / 12:23 |
| With 3 s per step for scroll and first drawing beat | **12:40 / 13:47** |

### Time by part (105 wpm, plus 3 s per step)

| Part | Slides | Words | Time | Share |
|---|---|---:|---:|---:|
| Opening | 1 | 22 | 0:16 | 2% |
| Background: childhood, NODET, Tabriz, Zangar (3 slides), cabin, photography, ITU, Büyükada (2), to computation, SFU | 2 to 12, 14, 15 | 495 | **5:22** | 41% |
| Previous research: eCAADe, iViz, ISS, BioTerrarium | 13, 16 to 18 | 239 | 2:29 | 19% |
| Computational prototypes: constraints intro + four projects | 19 to 23 | 341 | 3:30 | 27% |
| Future PhD direction: provenance, methods | 24, 25 | 61 | **0:41** | 5% |
| GenEnv fit: where my path meets GenEnv, why I want to join | 26, 27 | 75 | 0:49 | 6% |
| Questions | 28 | 6 (five questions on screen, not in notes) | 0:06 | 0% |

The proposed direction got 41 seconds; the biography got more than five minutes. Prof. Liu
would first hear the research direction after about eleven minutes.

## 2. Duplicate or low-value slides

- **Zangar Museum takes three slides** (render, plans, sections). One image carries the argument.
- **Childhood and NODET are two separate slides.** Both establish continuity, not research ability.
- **Cabin and photography awards are two slides.** Neither supports the research argument.
- **Büyükada takes two slides** (analysis, water system). One composite is enough.
- **"Why I turned to computation"** (campus photos) repeats the transition the SFU slide makes.
- **"Two research areas" (iViz)** frames the work as inspired by GenEnv, which reads as derivative.
- **"Where my path meets GenEnv"** and **"Why I want to join GenEnv"** overlap. The second relies on
  praise ("exactly the work I mean") rather than fit.
- **The "How it could be studied" columns** (Build, Test, Compare, Interview) do not name a gap, a
  question, a measure or a contribution, so they read as a software integration plan.

## 3. Claims that need qualification

| Where | Claim as written | Why it needs qualifying |
|---|---|---|
| iViz slide | "Many of them were inspired by GenEnv’s work; I was following your lab closely" | Unverifiable and overfitted; replace with an account of how the trajectories converge. |
| meets-genenv | "132 participants across two peer-reviewed studies" | 60 + 36 + 36. ISS is accepted, not yet published; "peer-reviewed" is true, but the sum hides that one study is a companion (poster) paper. Say each study separately. |
| closing | "projects running in your lab that are exactly the work I mean" | Praise, not fit. |
| provenance | the record "is still missing" | Too broad: say what is missing *across my four prototypes*, not in the field. |
| ema | "Six AI roles" | Correct per evidence record (Generator, 4 Critics, Orchestrator), but the live unscripted LLM loop never ran, so the roles ran scripted. Keep that caveat next to the claim. |
| vcm | "18 floors instead of 10" | Must keep "base height and slope are placeholders" and "Grasshopper final step written, not executed" attached. |
| ISS DOI | DOI link shown as live | Registered, but inactive until the ISS Companion ’26 proceedings appear (23 to 26 Nov 2026). |
| learning to build | "teach interactive environments, 3D modeling and animation" | The three courses on Roman's site are IAT 313, IAT 343 and IAT 102 (Graphic Design). Needs Roman's confirmation. |

No result in the current deck is stronger than its source. The H1 speed result is shown as
"Not confirmed" in red, and BioTerrarium is labelled "Under revision". These must stay.

## 4. Inconsistencies between source and documentation

| Document | Says | Source says |
|---|---|---|
| `docs/TIMING_AUDIT.md` | 20 steps, 1,021 words, 9:17 | 28 slides, 1,239 note words |
| `docs/PRESENTATION_SCRIPT.md` | 28 slides, 1,306 words | 1,306 counts on-screen columns and questions, which are not spoken notes |
| `README.md` | "Exactly 20 steps", one continuous map, `src/atlas/`, `src/scenes/`, `L` legend, timer in the store | 28 slides; the map engine, `src/atlas/` and `src/scenes/` no longer exist; no `L` key; no timer |
| `docs/PROJECT_INTERACTION_SPEC.md` | `src/lib/scroll.ts` camera engine and map vignettes | Removed in the slide rebuild (Roman rejected the zooming map as blurry and cut off) |
| `docs/MAPPING_LANGUAGE.md` | `StatusGeometry.tsx`, world coordinates, axes | Not rendered anywhere now; `src/data/atlas.ts` is unused |
| `src/lib/stepper.ts`, `src/state/store.ts`, `overlays.tsx` | "Exactly 20 sheets", "all 20 sheets" in help | 28 |
| `src/data/scenes.ts` | header says "20 presentation steps" | 28 |
| `docs/PROJECT_EVIDENCE_AUDIT.md` | "Tabriz Islamic Art University"; "Second Prize landscape 2013" | Roman: "Tabriz Art University"; 2015 confirmed |
| `src/data/provenance.ts`, `projects.ts`, `atlas.ts` | the provenance chain, PhD questions and methods | Not imported by anything; the provenance diagram hard-codes its own copy |

**Fix:** the script and timing docs are now generated by `scripts/docs.mjs` from `SLIDES`, as part
of `npm run build`, and `node scripts/docs.mjs --check` fails if they are stale. The provenance
diagram, framework diagrams and PhD slides now read from `src/data/provenance.ts`.

## 5. Structural decisions (kept minimal)

- **No return to the zooming map.** Roman rejected it (blurry from transform zoom, things cut
  off). The atlas logic returns as a vector research map drawn on the title and closing steps:
  territories sized by role, status drawn as geometry, the proposed PhD territory faint on step 1
  and resolved at the end, GenEnv work in a separately bounded, attributed territory.
  `src/data/atlas.ts` now holds that map's data.
- **Presenter window (`P`).** A second window showing notes, next step and target times by section,
  synced to the deck by BroadcastChannel, with a storage-event fallback. Needed because the notes
  dock shows on the shared screen. The audience screen gets no timer, which Roman asked for.
- **`L` legend overlay** listing the colour and line roles, as the README and spec describe.
- **A `project` structure** (problem, built, evidence, limit, carries forward) rendered by the
  existing figure layouts, so the four projects share one pattern without a new engine.
- **Separate notes from slide text.** Slides keep at most two short sentences; the spoken detail
  moves to `notes`. This reverses the earlier "all text on the slides" rule, as the brief asks.

## 6. Result after the revision (2026-11-16)

| Measure | Before | After |
|---|---:|---:|
| Steps | 28 | **19** |
| Spoken words | 1,239 | **1,231** |
| Delivery, 110 to 100 wpm, 3 s per step | 12:40 to 13:47 | **12:08 to 13:16** |
| Background (biography, campuses, awards, portfolio boards) | 5:22 | **about 1:20** (steps 3 to 4) |
| PhD problem, framework, scenario, questions, methods, fit | 0:41 + 0:49 | **about 4:00 to 4:20** (steps 13 to 18) |
| Direction first stated | about minute 11 | **step 2, under 1:20** |
| Closing questions | 5 | **3** |

The word count barely moved; the time moved from biography to the proposal. At 100 wpm the talk
runs about 15 seconds over 13:00. If rehearsal is that slow, the first cut is the second
paragraph of the step 7 notes (BioTerrarium), about 45 words. The generated
`docs/TIMING_AUDIT.md` holds the per-step figures.

Validation run: `npm run build` (typecheck, docs, Vite, standalone), `npm run docs:check`, overflow,
overlap and caption-clipping checks on all 19 steps at 1920×1080 and 1366×768, and 23 functional
checks (hash routes, keys, wheel, chapter bar, forward and backward run, sources, legend, notes,
reduced motion, presenter sync both ways, file:// offline build, console errors). All passed.

## 7. Superseded in part on 2026-11-19

The background compression above went too far: it removed Roman's childhood, Tabriz, the Zangar
dissertation, the competitions, Istanbul and the Büyükada work. They are restored in
`docs/BACKGROUND_RESTORE_AUDIT.md`, and the GenEnv page and project framing were rewritten per
`docs/FULL_DECK_LANGUAGE_AND_POSITIONING_AUDIT.md`. The current deck is 23 steps
(`docs/FINAL_DECK_AUDIT.md`).
