/** World geometry of the atlas: coordinate system, districts, axes. */

export const WORLD = { w: 4800, h: 2700 } as const;

/** Semantic grid region (the five × five coordinate field). */
export const GRID = {
  x0: 1320,
  y0: 180,
  x1: 4680,
  y1: 2520,
  cols: 5,
  rows: 5,
} as const;

export const COL_W = (GRID.x1 - GRID.x0) / GRID.cols;
export const ROW_H = (GRID.y1 - GRID.y0) / GRID.rows;

/** Horizontal axis — spatial scale (left → right). */
export const SCALE_LABELS = ['CLAUSE', 'PARCEL', 'BUILDING', 'URBAN BLOCK', 'DISTRICT'] as const;
/** Vertical axis — computational agency (bottom → top). */
export const AGENCY_LABELS = [
  'DETERMINISTIC CALCULATION',
  'AI INTERPRETATION',
  'AI GENERATION',
  'AI CRITIQUE',
  'MULTI-AGENT NEGOTIATION',
] as const;

/** Convert semantic axes (1-based, fractional allowed) to world coordinates. */
export function axesToWorld(spatialScale: number, computationalAgency: number): { x: number; y: number } {
  return {
    x: GRID.x0 + (spatialScale - 0.5) * COL_W,
    y: GRID.y1 - (computationalAgency - 0.5) * ROW_H,
  };
}

export interface DistrictShape {
  id: string;
  name: string;
  note?: string;
  /** Boundary polygon in world coordinates. */
  points: readonly { x: number; y: number }[];
  labelPos: { x: number; y: number };
}

export const DISTRICTS: readonly DistrictShape[] = [
  {
    id: 'foundations',
    name: 'D-01 · FOUNDATIONS',
    note: 'pre-computational territory',
    points: [
      { x: 150, y: 920 },
      { x: 1180, y: 920 },
      { x: 1180, y: 2560 },
      { x: 150, y: 2560 },
    ],
    labelPos: { x: 180, y: 2520 },
  },
  {
    id: 'perception-embodied',
    name: 'D-02 · PERCEPTION + EMBODIED SYSTEMS',
    points: [
      { x: 460, y: 380 },
      { x: 1180, y: 380 },
      { x: 1180, y: 1060 },
      { x: 460, y: 1060 },
    ],
    labelPos: { x: 470, y: 352 },
  },
  {
    id: 'computational',
    name: 'D-03 · COMPUTATIONAL URBAN DESIGN',
    points: [
      { x: 1400, y: 300 },
      { x: 4280, y: 300 },
      { x: 4280, y: 2440 },
      { x: 1400, y: 2440 },
    ],
    labelPos: { x: 1430, y: 2400 },
  },
  {
    id: 'phd',
    name: 'D-04 · PROPOSED PHD — PERFORMANCE PROVENANCE',
    note: 'dotted boundary: proposed, for discussion',
    points: [
      { x: 2980, y: 760 },
      { x: 3680, y: 760 },
      { x: 3680, y: 1280 },
      { x: 2980, y: 1280 },
    ],
    labelPos: { x: 2990, y: 742 },
  },
  {
    id: 'genenv',
    name: 'D-05 · GENENV RESEARCH CONTEXT',
    note: 'NOT MY PROJECTS — attributed external territory',
    points: [
      { x: 4380, y: 240 },
      { x: 4760, y: 240 },
      { x: 4760, y: 1560 },
      { x: 4380, y: 1560 },
    ],
    labelPos: { x: 4396, y: 452 },
  },
] as const;

/** Attributed GenEnv work drawn inside the GenEnv territory. */
export interface GenEnvItem {
  id: string;
  title: string;
  attribution: string;
  url: string;
  pos: { x: number; y: number };
}

export const GENENV_ITEMS: readonly GenEnvItem[] = [
  {
    id: 'hacd',
    title: 'Human-AI Co-Design',
    attribution: 'GenEnv Lab · NSERC 2026–2031 · work in progress, recruiting',
    url: 'https://genenv.ai/human-ai-co-design',
    pos: { x: 4570, y: 570 },
  },
  {
    id: 'decoding',
    title: 'Decoding Urban Form',
    attribution: 'GenEnv Lab · SSHRC-supported · Vancouver test bed',
    url: 'https://genenv.ai/decoding-urban-form',
    pos: { x: 4570, y: 810 },
  },
  {
    id: 'ghmcp',
    title: 'Grasshopper MCP v2',
    attribution: 'GenEnv Lab · open-source tool · 2026',
    url: 'https://genenv.ai/grasshopper-mcp',
    pos: { x: 4570, y: 1050 },
  },
  {
    id: 'thermal',
    title: 'Digital Thermal Sandbox',
    attribution: 'Yuhao Lu (PI, UM) with GenEnv · LACF grant #207',
    url: 'https://genenv.ai/digital-thermal-sandbox',
    pos: { x: 4570, y: 1290 },
  },
] as const;

/** The six-stage provenance chain (Scene 8 synthesis + Scene 9 spine). */
export const CHAIN_STAGES = [
  { id: 'regulation', label: 'regulation', projects: ['zla'] },
  { id: 'evidence', label: 'evidence', projects: ['zla', 'pmg'] },
  { id: 'geometry', label: 'geometry', projects: ['pmg', 'vcm'] },
  { id: 'performance', label: 'performance', projects: ['vcm', 'ema'] },
  { id: 'critique', label: 'critique', projects: ['ema'] },
  { id: 'judgment', label: 'human judgment', projects: [] },
] as const;
