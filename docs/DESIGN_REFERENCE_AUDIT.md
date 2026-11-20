# Design Reference Audit

> **Note (2026-11-16):** this document describes the earlier zooming map version. That engine
> (`src/lib/scroll.ts`, `src/atlas/`, `StatusGeometry.tsx`) was removed when Roman found the zoom
> blurry and parts cut off. The current deck is 25 composed steps; the map survives as the vector
> research map on steps 1 and 19 (`src/data/atlas.ts`), and the colour and line roles are defined
> in `src/data/provenance.ts` (`ROLE_STYLE`). See `README.md` and `docs/GENENV_REFOCUS_AUDIT.md`.

What was studied from GenEnv's public language, what was adapted as shared *conventions of the
discipline*, and what was deliberately **not** copied. All six genenv.ai pages were fetched on
2026-11-13 (homepage, human-ai-co-design, decoding-urban-form, digital-thermal-sandbox,
grasshopper-mcp, openings).

## What the audit found

GenEnv's own site organizes research as **blocks on a site plan** ("Back to map", "Back to
plan"), and its stated form language says: *"Every block's massing comes from the kind of work it
holds — the family carries the meaning, the data sets the size"* and *"Status is drawn, not
badged"* — funded work *"stands on a full-plot plinth"*, archive work is *"a dashed ghost"*.
Conceptually the lab's framing is *"keeping outcomes editable, traceable, and open to human
judgment"*. The visual rendering itself is JS-driven and was not observable in fetched HTML, so
no pixel-level styling was available (or used).

## Adapted as shared conventions (with different execution)

- Status expressed through drawing conventions, not badges — because the interview audience reads
  drawings; our vocabulary (orange hatch for revision, wireframe + control points for prototypes,
  dotted survey footprints for proposals, red for falsified) is our own and is documented in
  MAPPING_LANGUAGE.md.
- Form from data: parcel height = evidence maturity; position = semantic axes.
- Plan/atlas as information architecture; fine construction grids, coordinate labels, scale bar.
- AI shown as workflows, roles, parameters, and evaluators — never robot imagery.

## Deliberately NOT copied

- **Palette**: deep navy + yellow/cyan/orange/coral/lime on warm off-white type — not sampled
  from GenEnv.
- **The organizing metaphor differs**: GenEnv's map is a project index; this atlas is an
  *argument* — a semantic coordinate field (spatial scale × computational agency) crossed by a
  personal research route that ends at a proposed site. No GenEnv layout, copy, lettering, or
  block styling was reproduced.
- **The plinth meaning differs and is attributed**: here the plinth marks *published evidence*;
  the yellow *foundation* appears only inside the clearly bounded GenEnv territory, labelled
  "NOT MY PROJECTS — ATTRIBUTED EXTERNAL TERRITORY", with per-project attribution lines
  (including Digital Thermal Sandbox's UM PI, Yuhao Lu).

## What keeps it identifiably Roman's

The research route through Tabriz → Istanbul → SFU; physiological signal traces (ISS halo,
BioTerrarium pipeline); the four computational prototypes with their real verified numbers —
including the kept negative result; architectural board imagery from his own awards; and
performance provenance drawn as the connective infrastructure of his own map.

## Decision noted for approval

React Three Fiber was **not** used: every drawing is SVG. Reliability on a projector and the
"master map must render even if WebGL fails" rule outweighed 3D massing views; the axonometric
system communicates rule → geometry without a WebGL dependency. Easy to revisit if a 3D massing
moment is wanted.
