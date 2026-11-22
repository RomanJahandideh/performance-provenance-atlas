import type { Role } from './provenance';

/**
 * The future-research section (revised 2026-11-21): one shared research agenda
 * and three possible branches. All three are PROPOSED research directions,
 * shown as conceptual illustrations. Every value drawn in their diagrams is
 * illustrative, not a measurement or a finding. Novelty is a research
 * opportunity to be confirmed by a formal prior-art review.
 */

export const AGENDA =
  'Developing performance-aware human-AI co-design systems that connect design intentions, professional design tools, environmental simulations, verified evidence and human judgment.';

/** The shared problem, as one trail every branch uses. */
export const AGENDA_TRAIL: readonly { n: string; role: Role }[] = [
  { n: 'Design intention', role: 'human' },
  { n: 'Professional design tools', role: 'operation' },
  { n: 'Environmental simulation', role: 'compute' },
  { n: 'Verified evidence', role: 'source' },
  { n: 'Human judgment', role: 'human' },
];

export interface Branch {
  id: 'redteam' | 'externality' | 'living';
  /** Step id the branch opens. */
  step: string;
  name: string;
  scale: string;
  scaleDetail: string;
  problem: string;
  contribution: string;
  evaluation: string;
  workflow: readonly { n: string; role: Role }[];
}

export const BRANCHES: readonly Branch[] = [
  {
    id: 'redteam',
    step: 'redteam',
    name: 'AI Design Red-Team',
    scale: 'Design risk',
    scaleDetail: 'building, landscape or site',
    problem: 'Simulations test the scenarios designers choose; unknown failures stay hidden',
    contribution: 'Scenario search, verified weaknesses, minimal repairs that protect design intent',
    evaluation: 'Against designer-selected scenario testing; expert review; design studies',
    workflow: [
      { n: 'Designer sets intentions', role: 'human' },
      { n: 'AI proposes stress cases', role: 'ai' },
      { n: 'Simulation tests them', role: 'compute' },
      { n: 'Weakness verified', role: 'source' },
      { n: 'AI proposes a repair', role: 'ai' },
      { n: 'Simulation retests', role: 'compute' },
      { n: 'Designer decides', role: 'human' },
    ],
  },
  {
    id: 'externality',
    step: 'externality',
    name: 'Neighbourhood Externality Co-Designer',
    scale: 'Neighbourhood',
    scaleDetail: 'parcels and public space',
    problem: 'Performance effects cross the project boundary; fixing one parcel can move the problem',
    contribution: 'Cross-parcel simulation that maps gains and burdens and supports negotiation',
    evaluation: 'Parcel-only vs neighbourhood-level design; realistic sites; stakeholder workshops',
    workflow: [
      { n: 'Import parcels and rules', role: 'source' },
      { n: 'People set priorities', role: 'human' },
      { n: 'AI proposes alternatives', role: 'ai' },
      { n: 'Simulation measures effects', role: 'compute' },
      { n: 'Gains and burdens mapped', role: 'source' },
      { n: 'AI suggests compromises', role: 'ai' },
      { n: 'People decide', role: 'human' },
    ],
  },
  {
    id: 'living',
    step: 'living',
    name: 'Living Environment Co-Designer',
    scale: 'Time',
    scaleDetail: 'seasons to decades',
    problem: 'Designs are judged as static, but trees, materials, use and climate change',
    contribution: 'Temporal simulation and adaptive pathways with thresholds and intervention points',
    evaluation: 'Static optimisation vs adaptive pathways; long-term cases; sensitivity analysis',
    workflow: [
      { n: 'Designer sets priorities', role: 'human' },
      { n: 'Models imported', role: 'source' },
      { n: 'AI proposes futures', role: 'ai' },
      { n: 'Simulation over years', role: 'compute' },
      { n: 'Thresholds found', role: 'uncertain' },
      { n: 'AI suggests actions', role: 'ai' },
      { n: 'Designer chooses path', role: 'human' },
    ],
  },
];

// ── Red-Team: illustrative site, stress scenarios and repairs ──────────────
export const RT_MODES = ['Original design', 'Verified failure', 'Proposed repair'] as const;

export interface StressScenario {
  chip: string;
  name: string;
  weakness: string;
  repair: string;
  metric: string;
  /** Hotspot centre and radius on the illustrative plan. */
  hot: { x: number; y: number; rx: number; ry: number };
  /** Illustrative bar lengths 0 to 1: under stress before and after the repair. */
  before: number;
  after: number;
}

export const RT_SCENARIOS: readonly StressScenario[] = [
  { chip: 'Heatwave, event', name: 'Heatwave during an evening event', weakness: 'South seating edge overheats while the plaza is most used', repair: 'A light canopy over the seating edge; trees, paving and view kept', metric: 'time outside the comfort range', hot: { x: 590, y: 540, rx: 230, ry: 90 }, before: 0.84, after: 0.36 },
  { chip: 'Drought', name: 'Drought with irrigation switched off', weakness: 'Lawn beds fail and lose their cooling effect', repair: 'Two lawn beds become drought-tolerant planting; layout kept', metric: 'plant water stress', hot: { x: 580, y: 350, rx: 260, ry: 80 }, before: 0.78, after: 0.3 },
  { chip: 'Cooling failure', name: 'Cooling failure at peak occupancy', weakness: 'West reading room overheats in the afternoon', repair: 'Operable shading on the west façade; plaza unchanged', metric: 'indoor overheating hours', hot: { x: 170, y: 290, rx: 150, ry: 110 }, before: 0.8, after: 0.34 },
  { chip: 'Winter wind', name: 'Winter wind channelled at the corner', weakness: 'Entrance corner becomes uncomfortable to cross', repair: 'A short planted screen at the corner; view axis left open', metric: 'uncomfortable wind hours', hot: { x: 360, y: 555, rx: 120, ry: 60 }, before: 0.7, after: 0.32 },
];

export const RT_INTENTIONS: readonly { label: string; x: number; y: number }[] = [
  { label: 'Tree canopy', x: 780, y: 222 },
  { label: 'View axis', x: 560, y: 392 },
  { label: 'Public seating', x: 700, y: 512 },
  { label: 'Stone paving', x: 820, y: 446 },
];

// ── Externality: illustrative parcels, layers and alternatives ─────────────
export const EX_LAYERS = ['Shadow', 'Heat', 'Glare', 'Wind', 'Runoff'] as const;
export type ExLayer = (typeof EX_LAYERS)[number];
export const EX_ALTS = ['A · Tall tower', 'B · Low wide block', 'Negotiated'] as const;

export const EX_PARCELS: readonly { id: string; name: string; priority: string; x: number; y: number; w: number; h: number }[] = [
  { id: 'housing', name: 'Housing', priority: 'winter daylight', x: 30, y: 166, w: 300, h: 150 },
  { id: 'garden', name: 'Community garden', priority: 'sun hours for crops', x: 340, y: 166, w: 300, h: 150 },
  { id: 'school', name: 'School yard', priority: 'summer shade, safe play', x: 650, y: 166, w: 320, h: 150 },
  { id: 'shops', name: 'Shops', priority: 'street activity', x: 30, y: 376, w: 300, h: 214 },
  { id: 'site', name: 'Project site', priority: 'own performance targets', x: 340, y: 376, w: 300, h: 214 },
  { id: 'plaza', name: 'Public plaza', priority: 'outdoor comfort', x: 650, y: 376, w: 320, h: 214 },
];

/** Illustrative effect on each neighbour: positive = burden, negative = benefit. Not measured. */
export const EX_EFFECTS: Record<string, Record<ExLayer, Partial<Record<string, number>>>> = {
  'A · Tall tower': {
    Shadow: { garden: 0.9, housing: 0.4 },
    Heat: { plaza: 0.2 },
    Glare: { school: 0.7 },
    Wind: { plaza: 0.8, shops: 0.3 },
    Runoff: { plaza: 0.3 },
  },
  'B · Low wide block': {
    Shadow: { garden: 0.4 },
    Heat: { plaza: 0.8, shops: 0.4 },
    Glare: { school: 0.2 },
    Wind: { plaza: 0.2 },
    Runoff: { plaza: 0.8, shops: 0.5 },
  },
  Negotiated: {
    Shadow: { garden: 0.3, housing: 0.1 },
    Heat: { plaza: -0.3 },
    Glare: {},
    Wind: { plaza: 0.3 },
    Runoff: { plaza: -0.2, shops: 0.1 },
  },
};

export const EX_ALT_NOTE: Record<string, string> = {
  'A · Tall tower': 'AI alternative · long shadow on the garden, glare on the school, wind at the plaza',
  'B · Low wide block': 'AI alternative · less shadow, but heat and runoff move onto the plaza and shops',
  Negotiated: 'AI-suggested compromise · stepped massing, green roof, matte façade',
};

// ── Living environment: illustrative timeline ──────────────────────────────
export const LV_STOPS: readonly { label: string; year: number; note: string }[] = [
  { label: 'Today', year: 0, note: 'Young trees, new paving, current climate' },
  { label: '10 years', year: 10, note: 'Warmer summers; canopy still small' },
  { label: 'Threshold', year: 18, note: 'Heat stress crosses the limit the designer set' },
  { label: 'Intervention', year: 20, note: 'Temporary shade, permeable paving, irrigation' },
  { label: '40 years', year: 40, note: 'Mature canopy carries the shade' },
];

export const LV_INDICATORS = 'MONITOR: CANOPY COVER · SURFACE TEMPERATURE · SOIL MOISTURE · SUMMER AFTERNOON USE';
