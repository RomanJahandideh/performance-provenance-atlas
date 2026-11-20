# Mapping Language

> **Note (2026-11-16):** this document describes the earlier zooming map version. That engine
> (`src/lib/scroll.ts`, `src/atlas/`, `StatusGeometry.tsx`) was removed when Roman found the zoom
> blurry and parts cut off. The current deck is 25 composed steps; the map survives as the vector
> research map on steps 1 and 19 (`src/data/atlas.ts`), and the colour and line roles are defined
> in `src/data/provenance.ts` (`ROLE_STYLE`). See `README.md` and `docs/GENENV_REFOCUS_AUDIT.md`.

The atlas is not decoration: position, height, line type, and colour all carry defined meaning.
Geometry is derived from structured data (`src/data/*`), not hand-placed per scene (pinned world
positions exist only to keep labels legible, and always respect the semantic bands).

## Coordinate system

World space: 4800 × 2700 units. Semantic grid region: x 1320–4680, y 180–2520, 5 × 5 bands.

**Horizontal axis — spatial scale** (left → right):
`CLAUSE → PARCEL → BUILDING → URBAN BLOCK → DISTRICT`

**Vertical axis — computational agency** (bottom → top):
`DETERMINISTIC CALCULATION → AI INTERPRETATION → AI GENERATION → AI CRITIQUE → MULTI-AGENT NEGOTIATION`

`axesToWorld(spatialScale, computationalAgency)` (src/data/atlas.ts) converts band coordinates
(fractional allowed) to world positions.

The **foundations margin** (x < 1320) is deliberately off-grid: the pre-computational territory
(campuses, awards) predates the coordinate system, and the perception/embodied district sits at
its top edge where the route enters the grid.

## Parcel placement (from `ResearchParcel` data)

| Parcel | spatialScale | computationalAgency | Why |
|---|---|---|---|
| Zoning Literacy Assistant | 1 (clause) | 2 (interpretation over deterministic arithmetic) | reads clauses, explains computed numbers |
| Parametric Massing Generator | 2.5 (parcel→block) | 3 (generation over deterministic geometry) | generates editable envelopes |
| View Corridor Massing | 3.5 (building under a district sightline) | 1.5 (deterministic + result interpretation) | precise computation first |
| Environmental Massing Agents | 4.5 (block→district) | 5 (multi-agent negotiation) | council of critics |
| Performance Provenance (proposed) | 3.2 | 4 | the connective infrastructure between them |

## Height = evidence maturity (never quality)

`height = 24 + evidenceMaturity × 13` world units, maturity 1–5:
conceptual → implemented → computationally verified → evaluated with participants → published/accepted.

## Status drawing language (StatusGeometry.tsx)

| Status | Drawing |
|---|---|
| published / accepted | solid light mass; **evidence plinth** beneath; circled **DOI** tick |
| under revision | translucent mass with **orange diagonal hatch**; top face dashed; **open (dashed) base boundary**; label `UNDER REVISION` |
| verified computation / prototype | **white wireframe** mass, faint cyan top, **square control points** on the top corners |
| proposed | **dotted yellow footprint**, corner **survey stakes**, faint dashed forming volume, label `PROPOSED` |
| external funded (GenEnv) | **yellow foundation slab**, muted mass, **double boundary** on the district, attribution line, district note `NOT MY PROJECTS — ATTRIBUTED EXTERNAL TERRITORY` |
| written but not executed | grey **dashed** linework only |
| falsified / failed check | **red** banner or tag, kept visible (EMA H1) |
| provisional decision | dashed connector + circled `?` + `TO BE REFINED WITH SUPERVISOR` |

## Colour semantics (tokens.css)

| Colour | Token | Meaning |
|---|---|---|
| Yellow `#F2CF55` | `--yellow` | provenance, the research route, evidence traces, funded foundations |
| Cyan `#70D7CE` | `--cyan` | verified computational output |
| Orange `#E8924A` | `--orange` | assumption, placeholder, simplified proxy |
| Coral `#F47B5C` | `--coral` | human decision / judgment |
| Lime `#CBE56B` | `--lime` | environmental performance (EMA critics, terrarium field) |
| Proposal blue `#89A7FF` | `--proposal` | doctoral framing, provisional connectors |
| Red `#E05252` | `--red` | falsified hypothesis, failed check |
| Warm white `#EDF2F7` | `--geom` | executed deterministic geometry |
| Muted `#98A7B8` | `--muted` | annotation, context, external attribution |

Colour is never the only indicator — every status also differs in line type, fill treatment, and
a text label.

## Grid & annotation conventions

24-unit minor grid (≈6–8% opacity) and 96-unit module grid as SVG patterns; coordinate letters
A–J across the top and 01–06 down the side; a north/“research orientation” marker; a 96-unit
scale bar; district boundaries in long-dash; the PhD district dotted; GenEnv double-lined.
IBM Plex Mono for coordinates, metadata, statuses, and measurements; Inter Tight for titles;
Inter for prose.

## The route

One yellow polyline connects Tabriz → Istanbul → SFU → the embodied cluster → grid entry →
PMG → ZLA → VCM → EMA → the provenance site → the GenEnv boundary. Scene progress controls how
far the route is drawn (`PROGRESS` in ResearchRoute.tsx); the current stop pulses. The route dims
to context inside project scenes so it never crosses an active drawing.
