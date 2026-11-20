# From Environmental Evidence to Traceable Agentic Co-Design

An interactive presentation for Roman Jahandideh's PhD interview with Prof. Xun Liu and the
Generative Environments Lab (GenEnv), UBC SALA, for Fall 2027 admission to the PhD in Design,
Technology and Society. The interview is 20 minutes; the talk is about 13 to 14 minutes, leaving
about 6 to 7 minutes for conversation.

## The argument

Roman began by designing spatial form, learned to read environments as systems, learned to
measure how people perceive and respond to digital environments, and then learned to build
computational systems himself. The proposed next step is to study how agentic AI can help
designers explore performance-aware built environments while every consequential rule,
calculation, assumption, AI action and human decision stays inspectable and editable.

The talk ends with **three possible directions** within GenEnv's NSERC program, Human-AI
Co-Design Framework for Performance-Aware Constructed Environments. Each would be one
dissertation; all are labelled for discussion. Performance provenance is a supporting record.

## The 25 steps

| # | Section | Step |
|---:|---|---|
| 1 to 2 | Opening | Research identity; the question, the GenEnv program, the route from making to co-design |
| 3 to 9 | Background | Making; Tabriz; Zangar Museum and its development; competitions; Istanbul; Büyükada |
| 10 to 12 | Previous research | eCAADe (toward VR design tools); SFU, iViz Lab; HCI studies |
| 13 to 17 | Research projects | Division of roles; four projects as question, approach, evidence, limit, carries forward |
| 18 | PhD directions | State of the art → remaining gap (verified references only) |
| 19 | PhD directions | Shared principle and the performance-provenance record |
| 20 | PhD directions | One program, three possible directions |
| 21 to 23 | PhD directions | Verified Performance Co-Designer; Evidence-Calibrated Climate Co-Designer; Embodied Performance Reasoning Studio |
| 24 | GenEnv | Where my path meets GenEnv |
| 25 | Conversation | Three questions |

Word counts and timing: `docs/TIMING_AUDIT.md`. Script: `docs/PRESENTATION_SCRIPT.md`. Both are
generated from `src/data/steps.ts`, so they always match the deck.

## Install, run, build

```bash
npm install
npm run dev         # development server
npm run build       # typecheck, regenerate the script and timing docs, build, inline for file://
npm run preview     # serve dist/ (the build used for presenting)
npm run typecheck   # TypeScript only
npm run docs        # regenerate docs/PRESENTATION_SCRIPT.md and docs/TIMING_AUDIT.md
npm run docs:check  # fail if those docs are out of date
```

`dist/index.html` also opens straight from disk (`Open Presentation.html` in the repo root), with
no server and no network.

## Presenting

1. `npm run build && npm run preview`, or open `Open Presentation.html`.
2. Press `P` to open the presenter window on your own screen: notes, next step, and where the talk
   should be by now. Share only the deck window. The deck itself shows no timer and no notes.
3. Press `F` for full screen. One scroll, swipe or arrow key is one step. The arrow keys in the
   presenter window drive the deck too.
4. Rehearse once offline.

| Key | Action |
|---|---|
| scroll, swipe, ↓ → Space PgDn | next step |
| ↑ ← Shift+Space PgUp | previous step |
| Home / End | first / last step |
| `#step-N` in the URL | open at step N |
| bottom bar | jump to a section |
| F | full screen |
| P | presenter window |
| N | speaker notes on this screen (avoid while sharing) |
| S or C | sources and evidence for this step |
| L | legend: colours and line styles |
| M | list of all steps |
| R | restart |
| X | reduced motion (also follows the OS setting) |
| Esc | close any panel |

## Visual roles

Each role has a colour and a geometry, so they stay distinct over screen sharing:
yellow, flagged square = source or provenance · cyan, solid square = verified computation ·
white = editable parametric operation · orange hatch = assumption or uncertainty · lilac,
rounded and dashed = AI interpretation · coral diamond = human judgment · proposal blue, dotted =
provisional doctoral framework · red = failed check or falsified expectation. Defined once in
`src/data/provenance.ts` (`ROLE_STYLE`).

## Where things live

```
src/data/steps.ts        the 25 steps: slide text, speaker notes, sections, pace
src/data/provenance.ts   the proposed direction: definition, roles, framework, scenario, RQs
src/data/atlas.ts        the research map on steps 1 and 19
src/data/evidence.ts     every research claim, its status, source and limitation
src/data/citations.ts    sources shown in the drawer (S)
src/data/scenes.ts       which claims and sources each step's drawer shows
src/slides/Deck.tsx      layouts, transitions, chapter bar
src/sheets/framework.tsx diagrams for the argument (map, roles, gap, framework, scenario, RQs)
src/sheets/diagrams.tsx  project diagrams (zoning, envelope, corridor, agents, eCAADe)
src/ui/presenter.tsx     presenter window
src/ui/overlays.tsx      notes, sources, legend, step list, help
scripts/docs.mjs         generates the script and timing docs
scripts/standalone.mjs   inlines JS and CSS so dist/index.html runs from disk
```

## Documentation

| File | What it holds |
|---|---|
| `docs/GENENV_REFOCUS_AUDIT.md` | Audit of the 28-slide deck and the 2026-11-16 refocus |
| `docs/BACKGROUND_RESTORE_AUDIT.md` | What the refocus removed from the background, and how it was restored (2026-11-19) |
| `docs/FULL_DECK_LANGUAGE_AND_POSITIONING_AUDIT.md` | Per-step tone and positioning audit before the 2026-11-19 revision |
| `docs/NSERC_THREE_PROTOTYPE_DIRECTIONS_AUDIT.md`, `docs/NSERC_THREE_PROTOTYPE_DIRECTIONS_RATIONALE.md` | Audit and rationale for the three possible directions (2026-11-19) |
| `docs/FINAL_DECK_AUDIT.md` | Final per-step audit: takeaway, time, word counts, claims, removed or softened phrases |
| `docs/GENENV_FIT_MATRIX.md` | Evidence → capability → GenEnv need → limitation |
| `docs/PRESENTATION_SCRIPT.md` | Generated spoken script per step |
| `docs/TIMING_AUDIT.md` | Generated word counts and timing by section |
| `docs/PROJECT_EVIDENCE_AUDIT.md` | Every claim, its source, status and limitation |
| `docs/CLAIM_STATUS_MATRIX.md` | Implemented, tested, published, accepted, revised, proposed, placeholder, unexecuted |
| `docs/ASSET_MANIFEST.md` | Image origins and credits |
| `docs/PRESENTATION_CONTROLS.md` | Controls |
| `docs/MAPPING_LANGUAGE.md`, `docs/PROJECT_INTERACTION_SPEC.md`, `docs/DESIGN_REFERENCE_AUDIT.md` | History of the earlier map version; see the note at the top of each |

## Honesty rules

eCAADe 2023 is published. The ISS 2026 paper is accepted, and its DOI activates with the
proceedings. BioTerrarium is under revision. The Zoning Literacy Assistant uses ten clauses of
R1-1 and is not planning advice. The Parametric Massing Generator is a research prototype, not
compliance software. View-corridor base elevation and slope are placeholders, and the Grasshopper
step is written but not executed. Environmental Massing Agents uses simplified solar, benchmark
carbon and a wind proxy, its live LLM loop has not run, and guided search was not faster, only
more reliable. The PhD framework, scenario and pilot are proposals for discussion. GenEnv's
projects are attributed and kept in their own territory.
