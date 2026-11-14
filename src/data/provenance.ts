/**
 * The provenance chain inspector (Scene 9) — a conceptual demonstration built
 * from the REAL Vancouver View Corridor study facts. It is not the proposed
 * doctoral system running; the label in the UI says so.
 */
export interface ProvenanceLink {
  id: string;
  label: string;
  short: string;
  detail: string;
  stateColor: 'yellow' | 'cyan' | 'orange' | 'coral' | 'muted';
}

export const PROVENANCE_LINKS: readonly ProvenanceLink[] = [
  {
    id: 'intent',
    label: 'Design intent',
    short: 'maximize usable floor area',
    detail: 'The recorded goal for this revision: recover usable floor area on the Creekside Park site without violating the protected view.',
    stateColor: 'yellow',
  },
  {
    id: 'rule',
    label: 'Applicable rule',
    short: 'view corridor J1 ceiling',
    detail: 'Creekside Park view J1 — a sloped geodetic ceiling from the City of Vancouver Open Data Portal. The record keeps the source and its state: plan geometry real; base elevation and slope placeholders.',
    stateColor: 'yellow',
  },
  {
    id: 'delta',
    label: 'Editable change',
    short: 'flat cap → per-floor trim',
    detail: 'The parameter-level delta: replace the flat cap at the lowest corridor elevation with floor-by-floor clipping against the rising ceiling. The change is reversible and stored as a delta, not a new black-box model.',
    stateColor: 'cyan',
  },
  {
    id: 'method',
    label: 'Computation',
    short: 'deterministic per-floor clipping',
    detail: 'The method that produced the evidence: tested half-plane footprint clipping, applied floor by floor against the ceiling. Code, not model confidence.',
    stateColor: 'cyan',
  },
  {
    id: 'result',
    label: 'Result',
    short: '18 vs 10 floors · +39.5% GFA',
    detail: 'The computed outcome bound to this revision: 18 floors and 25,608 m² against 10 floors and 18,360 m² — 39.5% more gross floor area.',
    stateColor: 'cyan',
  },
  {
    id: 'uncertainty',
    label: 'Uncertainty',
    short: 'placeholder elevations declared',
    detail: 'What the record admits it does not know: BASE_ELEV_M and SLOPE are placeholders, and the comparative finding is argued to be robust to them. Uncertainty travels with the result instead of disappearing.',
    stateColor: 'orange',
  },
  {
    id: 'ai',
    label: 'AI interpretation',
    short: 'recommends against the brief',
    detail: 'The AI layer reads the already-computed rotation results and argues a choice against the design brief (for example, fewer larger floors). Its role is recorded as interpretation — it cannot edit the figures.',
    stateColor: 'muted',
  },
  {
    id: 'decision',
    label: 'Human decision',
    short: 'accept · revise · reject · annotate',
    detail: 'The designer’s recorded response closes the link: accept, revise, reject, or annotate with reasons. Across iterations these decisions become a queryable history of judgment — the part current systems drop.',
    stateColor: 'coral',
  },
] as const;

/** The ten components of the possible doctoral system (Scene 9, step “system”). */
export const PHD_SYSTEM = [
  'regulatory + contextual retrieval',
  'parametric geometry',
  'editable design state',
  'deterministic environmental evaluators',
  'agent-generated alternatives + critique',
  'provenance graph',
  'uncertainty + assumption layer',
  'multi-view spatial interface',
  'human revision + comparison',
  'versioned decision history',
] as const;

export const PHD_SUBQUESTIONS = [
  'What provenance information do designers need to understand and challenge AI-generated spatial proposals?',
  'How should regulatory evidence, model uncertainty, and environmental assumptions be represented inside a live design workflow?',
  'When does agent specialization improve exploration — and when does it create unnecessary complexity or false confidence?',
  'How do editable performance visualizations affect designer trust, agency, and decision quality?',
  'How can design alternatives remain open to human interpretation rather than being reduced to a single optimized answer?',
] as const;

export const PHD_METHODS = [
  'research-through-design + system development',
  'technical validation of geometry and evaluation modules',
  'controlled comparison of provenance / interface conditions',
  'think-aloud design sessions',
  'semi-structured interviews with designers and planning professionals',
  'interaction-log analysis (never logs alone as evidence of intention)',
  'qualitative thematic analysis',
  'design principles for accountable human–AI spatial co-design',
] as const;
