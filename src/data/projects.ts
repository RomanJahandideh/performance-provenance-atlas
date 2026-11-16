import type { ResearchParcel } from './types';

/**
 * Research parcels drawn on the atlas.
 * Positions come from the semantic axes (see MAPPING_LANGUAGE.md); `pos` pins the
 * final world coordinate so the route and districts stay legible.
 */
export const PARCELS: readonly ResearchParcel[] = [
  // ── Foundation research (perception + embodied systems) ──────────────────
  {
    id: 'ecaade',
    title: 'Creating Immersive Virtual Landscapes',
    kicker: 'Published · eCAADe 2023',
    district: 'perception-embodied',
    spatialScale: 0, // foundations margin (pre-grid)
    computationalAgency: 0,
    evidenceMaturity: 5,
    status: 'published',
    date: '2023',
    researchQuestion: 'How do transparency, colour, and luminance interact as depth cues in VR head-mounted displays?',
    inputs: ['60 participants', '4 transparency levels × 6 hues × 2 luminance conditions', 'Oculus Quest 2 · Unreal Engine 4.27'],
    process: ['Forced-choice pairwise comparison (264 judgments per participant)', 'Latin-square ordering', 'Kendall agreement + consistency analysis'],
    evidenceIds: ['ecaade-design', 'ecaade-finding'],
    limitations: ['Six hues, four transparency levels, white background only — the paper states results may differ under other backgrounds.'],
    genenvConnection: 'Trained me to treat perception as measurable design evidence — the habit the later computational projects inherit.',
    links: [
      { label: 'Paper', url: 'https://doi.org/10.52842/conf.ecaade.2023.1.149', verified: true },
      { label: 'Portfolio', url: 'https://romanjahandideh.com/projects/immersive-virtual-landscapes.html', verified: true },
    ],
    citationIds: ['ecaade2023'],
    image: 'assets/figures/ecaade-results.png',
    imageAlt: 'Results figure from the eCAADe 2023 paper: bar graphs of colour scores for each transparency level.',
    pos: { x: 900, y: 700 },
  },
  {
    id: 'iss',
    title: 'Reading a Remote Teammate’s Body',
    kicker: 'Accepted · ACM ISS Companion 2026',
    district: 'perception-embodied',
    spatialScale: 0,
    computationalAgency: 0,
    evidenceMaturity: 5,
    status: 'accepted',
    date: '2026',
    researchQuestion: 'Can a remote teammate’s physiological state stay readable — and useful for coordination — without becoming an explicit emotional or diagnostic label?',
    inputs: ['Study 1: N = 36 online', 'Study 2: 12 three-player teams, live Apple Watch sensing', 'HR → pulse/glow · HRV → ring coherence'],
    process: ['Chance-referenced legibility test (16 halo states)', 'Latin-square multiplayer missions: No Cue / Numeric / Icon', 'Team-level ANOVA + paired contrasts'],
    evidenceIds: ['iss-study1', 'iss-study2', 'iss-tradeoff'],
    limitations: ['Scripted pressure events; 12 team-level units without a priori power analysis; the Icon–Numeric awareness difference is not significant.'],
    genenvConnection: 'Evidence that I can run multi-user system studies where a representation changes behaviour — the evaluation habit the PhD would bring to co-design tools.',
    links: [
      { label: 'Paper', url: 'https://doi.org/10.1145/3845796.3859311', verified: false },
      { label: 'Portfolio', url: 'https://romanjahandideh.com/projects/reading-a-remote-teammates-body.html', verified: true },
    ],
    citationIds: ['iss2026'],
    image: 'assets/figures/iss-teaser.png',
    imageAlt: 'The Unity cooperative-cooking game with one glowing physiological halo per teammate in the status bar, annotated.',
    pos: { x: 1150, y: 560 },
  },
  {
    id: 'bioterrarium',
    title: 'BioTerrarium',
    kicker: 'Manuscript under revision',
    district: 'perception-embodied',
    spatialScale: 0,
    computationalAgency: 0,
    evidenceMaturity: 3,
    status: 'under-revision',
    date: '2025–2026',
    researchQuestion: 'Can physiological feedback become part of the environment itself — fog, light, vegetation — rather than another dashboard?',
    inputs: ['Apple Watch (HR + beat-to-beat)', 'HealthKit → Swift bridge → Bluetooth/WebSocket → Unity 6', 'Four baseline-relative regulation zones'],
    process: ['End-to-end latency held below 200 ms', 'Counterbalanced within-subjects study, n = 24', 'PANAS · Flow Short Scale · MAAS · interviews'],
    evidenceIds: ['bio-pipeline', 'bio-study'],
    limitations: ['Submitted to SIGGRAPH 2026; not accepted after review and revision; being reworked. Analysis is provisional until the manuscript lands.'],
    genenvConnection: 'Shows I can carry sensing, real-time simulation, ethics, and mixed-methods evaluation in one independently built system.',
    links: [
      { label: 'Portfolio', url: 'https://romanjahandideh.com/projects/embedding-physiological-environments.html', verified: true },
      { label: 'GitHub', url: 'https://github.com/RomanJahandideh/embedding-physiological-environments', verified: false },
    ],
    citationIds: [],
    image: 'assets/projects/bioterrarium-hero.webp',
    imageAlt: 'The BioTerrarium: a glass-enclosed ecosystem with glowing crystal vegetation, fog, and a small lighthouse.',
    pos: { x: 660, y: 900 },
  },

  // ── The four computational-design projects (core constellation) ───────────
  {
    id: 'zla',
    title: 'Zoning Literacy Assistant',
    kicker: 'Prototype · regulation → evidence',
    district: 'computational',
    spatialScale: 1, // clause
    computationalAgency: 2, // AI interpretation over deterministic arithmetic
    evidenceMaturity: 3,
    status: 'verified-computation',
    date: '2026',
    researchQuestion: 'How can a conversational system make zoning understandable without replacing missing evidence with plausible-sounding answers?',
    inputs: ['Vancouver R1-1 base provisions as 10 addressable clauses', 'Plain-language questions', 'Lot width · depth · rental condition'],
    process: ['retrieve → answer → independently verify (three separate model calls)', 'Synthesis sees only retrieved clause text', 'Site arithmetic computed in deterministic code; the model only explains it'],
    evidenceIds: ['zla-ten-clauses', 'zla-pipeline', 'zla-laneway', 'zla-deterministic-example'],
    limitations: ['Single bylaw excerpt (R1-1 base provisions); a research prototype, not planning advice.'],
    genenvConnection: 'Adds the social/communication layer of Decoding Urban Form’s territory: regulation made interpretable to non-specialists while evidence and refusal stay visible.',
    links: [
      { label: 'Live system', url: 'https://romanjahandideh.github.io/zoning-literacy-assistant/', verified: true },
      { label: 'GitHub', url: 'https://github.com/RomanJahandideh/zoning-literacy-assistant', verified: true },
      { label: 'Portfolio', url: 'https://romanjahandideh.com/projects/zoning-literacy-assistant.html', verified: true },
    ],
    citationIds: ['genenv-decoding'],
    image: 'assets/projects/zla-hero.webp',
    imageAlt: 'Zoning Literacy Assistant interface: example questions, a lot width and depth form, and the bylaw excerpt it answers from.',
    pos: { x: 1800, y: 1700 },
  },
  {
    id: 'pmg',
    title: 'Parametric Massing Generator',
    kicker: 'Prototype · constraints → editable geometry',
    district: 'computational',
    spatialScale: 2.5, // parcel → urban block
    computationalAgency: 3, // AI generation over deterministic geometry
    evidenceMaturity: 3,
    status: 'verified-computation',
    date: '2026',
    researchQuestion: 'Can AI assist early zoning-to-form translation while keeping every extracted constraint, source, confidence level, revision, and result inspectable?',
    inputs: ['Bylaw-style text or the built-in Vancouver R1-1 preset', 'Lot dimensions and parcel shape', 'Conversational revision requests'],
    process: ['Parser returns 8 structured constraints, each with its supporting phrase + confidence', 'Deterministic half-plane clipping builds the envelope; Three.js + north-up plan views', 'Independent reviewer pass; generation and revision history'],
    evidenceIds: ['pmg-eight-constraints', 'pmg-source-confidence', 'pmg-review-pass', 'pmg-three-modes', 'pmg-r11-preset', 'pmg-geometry-method'],
    limitations: ['Research prototype, not code-compliance advice. AI interpretation is optional; geometry and measurements are deterministic. Irregular parcels are handled algorithmically, not parsed by AI.'],
    genenvConnection: 'Editable parametric geometry with traceable zoning interpretation — the same commitments GenEnv states for Decoding Urban Form and Human-AI Co-Design, tested at prototype scale.',
    links: [
      { label: 'Live system', url: 'https://romanjahandideh.github.io/parametric-massing-generator/', verified: true },
      { label: 'GitHub', url: 'https://github.com/RomanJahandideh/parametric-massing-generator', verified: true },
      { label: 'Portfolio', url: 'https://romanjahandideh.com/projects/parametric-massing-generator.html', verified: true },
    ],
    citationIds: ['genenv-decoding'],
    image: 'assets/projects/pmg-hero.webp',
    imageAlt: 'Parametric Massing Generator in urban block mode: a 3×3 grid of white massing volumes with a plan view inset.',
    pos: { x: 2420, y: 1560 },
  },
  {
    id: 'vcm',
    title: 'Vancouver View Corridor Massing',
    kicker: 'Verified study · geometry → performance',
    district: 'computational',
    spatialScale: 3.5, // building within a district-scale sightline
    computationalAgency: 1.5, // deterministic computation + AI interpretation of results
    evidenceMaturity: 3,
    status: 'verified-computation',
    date: '2026',
    researchQuestion: 'What design capacity becomes visible when a sloped regulatory constraint is modelled precisely rather than simplified into a flat height cap?',
    inputs: ['City of Vancouver protected view corridor — Creekside Park, view J1 (Open Data Portal, verified offline copy)', 'Zoning footprint via the same tested half-plane method', 'Seven rotation angles (0°–90°)'],
    process: ['Floor-by-floor clipping against the rising geodetic ceiling', 'Flat-cap vs per-floor comparison', 'Rhino 3DM export: corridor, site, one mesh per compliant floor'],
    evidenceIds: ['vcm-flat-cap', 'vcm-trimmed', 'vcm-gfa-recovery', 'vcm-rotation-study', 'vcm-corridor', 'vcm-placeholders', 'vcm-gh-unexecuted'],
    limitations: ['BASE_ELEV_M and SLOPE are placeholders, not official survey values. The Grasshopper component’s final geometry step is written but unexecuted (Rhino unavailable). AI interprets verified results against a brief; it does not calculate or alter figures.'],
    genenvConnection: 'Performance-informed form under regulatory geometry: checkable computation that lets design alternatives be judged against explicit evidence.',
    links: [
      { label: 'GitHub', url: 'https://github.com/RomanJahandideh/vancouver-view-corridor-massing', verified: true },
      { label: 'Portfolio', url: 'https://romanjahandideh.com/projects/vancouver-view-corridor-massing.html', verified: true },
    ],
    citationIds: [],
    image: 'assets/projects/vcm-hero.webp',
    imageAlt: 'Stepped massing trimmed diagonally where the protected view corridor’s sloped ceiling crosses it, with the corridor triangle shown from its apex.',
    pos: { x: 3040, y: 1420 },
  },
  {
    id: 'ema',
    title: 'Environmental Massing Agents',
    kicker: 'Verified study · evidence → critique',
    district: 'computational',
    spatialScale: 4.5, // urban block → district
    computationalAgency: 5, // multi-agent negotiation
    evidenceMaturity: 3,
    status: 'verified-computation',
    date: '2026',
    researchQuestion: 'Can specialized AI roles support environmental design decisions when every score they argue about is computed deterministically?',
    inputs: ['Creekside Park view-corridor site', 'Rotation · setback · floor height · structural material', 'Four falsifiable hypotheses written before the runs'],
    process: ['One Generator, four domain Critics (solar, embodied carbon, pedestrian wind, corridor/zoning yield), one Orchestrator — over a real MCP server', 'Deterministic evaluators score every objective; agents propose, interpret, critique, redirect', 'NSGA-II vs random sampling: 5 + 5 seeds, 200-evaluation budget, 1,080-design reference grid'],
    evidenceIds: ['ema-roles', 'ema-reference-grid', 'ema-search-setup', 'ema-h1-not-confirmed', 'ema-reliability', 'ema-h2-timber', 'ema-h3-floor-formula', 'ema-h4-pareto', 'ema-limitations'],
    limitations: ['Solar simplified; carbon from published benchmarks, not project LCA; wind is a screening proxy, not CFD; corridor elevations include placeholders; the live unscripted LLM loop was not executed without an API key.'],
    genenvConnection: 'Extends MCP-driven parametric modelling (Liu & Tian 2025) toward specialized roles, deterministic evaluation, critique grounded in computed evidence, and human review of Pareto alternatives — without claiming live-LLM effectiveness it has not measured.',
    links: [
      { label: 'GitHub', url: 'https://github.com/RomanJahandideh/environmental-massing-agents', verified: true },
      { label: 'Portfolio', url: 'https://romanjahandideh.com/projects/environmental-massing-agents.html', verified: true },
    ],
    citationIds: ['liu-tian-2025'],
    image: 'assets/projects/ema-hero.webp',
    imageAlt: 'Plan of a corridor-trimmed massing footprint with its winter-solstice shadow reaching a park point, beside a stepped section.',
    pos: { x: 3660, y: 1160 },
  },

  // ── Proposed doctoral work ────────────────────────────────────────────────
  {
    id: 'phd',
    title: 'Performance Provenance',
    kicker: 'Proposed PhD direction · for discussion',
    district: 'phd',
    spatialScale: 3.2,
    computationalAgency: 4,
    evidenceMaturity: 1,
    status: 'proposed',
    date: '2027 →',
    researchQuestion: 'How can human–AI co-design systems preserve traceable provenance between design intent, regulatory evidence, parametric geometry, environmental performance, AI critique, and human judgment across iterative urban-design workflows?',
    inputs: ['The four prototypes as working substrate', 'GenEnv’s editable/traceable framing', 'HCI evaluation methods from my MSc research'],
    process: ['Research-through-design + system development', 'Technical validation of geometry and evaluators', 'Controlled comparison of provenance/interface conditions', 'Think-aloud sessions · interviews · thematic analysis'],
    evidenceIds: [],
    limitations: ['A direction for discussion — not a finalized proposal, and not a topic Professor Liu has approved. Studies, cases, and participant numbers remain provisional.'],
    genenvConnection: 'A focused contribution within the funded Human-AI Co-Design program — not a separate AI application beside it.',
    links: [],
    citationIds: ['genenv-hacd', 'xu-chi2025', 'compositional-chi2025', 'earlyarchi-chi2026', 'energai-2025'],
    pos: { x: 4080, y: 940 },
  },
] as const;

const pIndex = new Map(PARCELS.map((p) => [p.id, p]));

export function parcel(id: string): ResearchParcel {
  const p = pIndex.get(id as ResearchParcel['id']);
  if (!p) throw new Error(`Unknown parcel id: ${id}`);
  return p;
}
