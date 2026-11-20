/**
 * The proposed doctoral direction, as data. Performance provenance is the
 * verification layer inside a broader agentic co-design framework; nothing
 * here is a built system. Slides and diagrams read from this file only.
 * Status: provisional, for discussion with a supervisor.
 */

export const DIRECTION = {
  title: 'Traceable Agentic Co-Design for Performance-Aware Constructed Environments',
  shortTitle: 'Traceable agentic co-design',
  status: 'Provisional, for discussion with a supervisor',
  layer: 'Performance provenance',
  definition:
    'A structured, versioned record that links a design change to the intent behind it, the source rule or evidence, the computational method, the assumptions and uncertainty, the agent action, the evaluated result and the designer’s response.',
  principle: 'AI interprets, coordinates and proposes; verified tools calculate; the designer sets the agent’s permissions and remains responsible for judgment.',
  question:
    'How can agentic AI translate design intent and urban evidence into editable parametric alternatives, integrate verified performance feedback during early-stage design, and preserve a provenance record that lets designers inspect, challenge and revise consequential AI actions?',
} as const;

/**
 * Visual roles. Each role has a colour AND a geometry, so AI reasoning,
 * deterministic calculation and human judgment differ even in greyscale.
 */
export type Role = 'human' | 'source' | 'operation' | 'compute' | 'uncertain' | 'ai' | 'proposal' | 'failed';

export const ROLE_STYLE: Record<Role, { name: string; shape: string; colour: string }> = {
  source: { name: 'Source or provenance', shape: 'flagged square, solid', colour: 'var(--yellow)' },
  compute: { name: 'Verified computation', shape: 'square, solid', colour: 'var(--cyan)' },
  operation: { name: 'Editable parametric operation', shape: 'square, solid white', colour: 'rgba(255,255,255,0.9)' },
  uncertain: { name: 'Assumption or uncertainty', shape: 'hatched', colour: 'var(--orange)' },
  ai: { name: 'AI interpretation', shape: 'rounded, dashed', colour: 'var(--lilac)' },
  human: { name: 'Human judgment', shape: 'diamond', colour: 'var(--coral)' },
  proposal: { name: 'Provisional doctoral framework', shape: 'dotted outline', colour: 'var(--proposal)' },
  failed: { name: 'Failed check or falsified expectation', shape: 'struck through', colour: 'var(--red)' },
};

export interface ProvenanceLink {
  id: string;
  label: string;
  value: string;
  role: Role;
}

/**
 * One revision from the Vancouver View Corridor study, written as a
 * provenance chain. Values are the real study figures; the AI step and the
 * decision step show what the record would hold, not a logged session.
 */
export const PROVENANCE_LINKS: readonly ProvenanceLink[] = [
  { id: 'intent', label: 'Intent', value: 'recover usable floor area under the view', role: 'human' },
  { id: 'rule', label: 'Source rule', value: 'Creekside Park view J1, City open data', role: 'source' },
  { id: 'change', label: 'Parameter change', value: 'flat cap → floor-by-floor trim', role: 'operation' },
  { id: 'method', label: 'Method', value: 'deterministic clipping per floor', role: 'compute' },
  { id: 'result', label: 'Result', value: '18 floors, +39.5% floor area', role: 'compute' },
  { id: 'uncertainty', label: 'Uncertainty', value: 'base elevation and slope are placeholders', role: 'uncertain' },
  { id: 'ai', label: 'Agent reading', value: 'suggests fewer, larger floors', role: 'ai' },
  { id: 'decision', label: 'Decision', value: 'designer accepts, revises or rejects', role: 'human' },
] as const;

/** The framework, layer by layer (the architecture diagram). */
export const ARCHITECTURE: readonly { id: string; name: string; items: string; role: Role }[] = [
  { id: 'inputs', name: 'Inputs', items: 'intent · site geometry · bylaws · climate data', role: 'human' },
  { id: 'knowledge', name: 'Knowledge layer', items: 'cited retrieval · conditional rules · design lexicon', role: 'source' },
  { id: 'agents', name: 'Bounded agents', items: 'act only within the permissions the designer sets', role: 'ai' },
  { id: 'state', name: 'Parametric design state', items: 'live Grasshopper operations, not frozen geometry', role: 'operation' },
  { id: 'evaluators', name: 'Verified evaluators', items: 'geometry checks · solar · carbon · zoning yield', role: 'compute' },
  { id: 'critique', name: 'Critique and comparison', items: 'trade-offs and disagreements, never one score', role: 'ai' },
  { id: 'decision', name: 'Human decision', items: 'accept · reject · revise · annotate · change mode', role: 'human' },
] as const;

/**
 * Adjustable agency. Builds on GenEnv's Grasshopper MCP scenario modes and
 * the three tiers in Liu and Tian's computational lexicalization (attributed
 * on the slide); these four levels are Roman's own grouping.
 */
export const AUTONOMY = [
  { level: 1, name: 'Inspect', what: 'reads and explains' },
  { level: 2, name: 'Suggest', what: 'coaches, proposes edits' },
  { level: 3, name: 'Execute with approval', what: 'edits after a yes' },
  { level: 4, name: 'Author in a lexicon', what: 'builds within set limits' },
] as const;

/** One illustrative Vancouver sequence (not a running system). */
export const SCENARIO: readonly { n: number; what: string; detail: string; role: Role }[] = [
  { n: 1, what: 'Parcel and program', detail: 'designer asks to explore massing', role: 'human' },
  { n: 2, what: 'Clauses retrieved', detail: 'one rule flagged as ambiguous', role: 'source' },
  { n: 3, what: 'Mode chosen', detail: 'execute with approval', role: 'human' },
  { n: 4, what: 'Visible operations', detail: 'agent edits the Grasshopper graph', role: 'ai' },
  { n: 5, what: 'Verified results', detail: 'envelope, floor area, solar hours', role: 'compute' },
  { n: 6, what: 'Critics disagree', detail: 'floor area against sun on the park', role: 'ai' },
  { n: 7, what: 'Designer revises', detail: 'rejects one action, moves a setback', role: 'human' },
  { n: 8, what: 'Version 2 recorded', detail: 'with its full provenance chain', role: 'source' },
] as const;

/** Three sub-questions, each paired with its method and contribution. */
export const RESEARCH_QUESTIONS = [
  {
    id: 'RQ1',
    name: 'Provenance and verification',
    question: 'What must the record keep so rules, assumptions, operations, results and decisions stay inspectable across revisions?',
    method: 'System design, benchmark cases, expert review',
    contribution: 'A provenance model and benchmark cases',
  },
  {
    id: 'RQ2',
    name: 'Calibrated agency',
    question: 'How do autonomy levels change error detection, correction, workload, perceived control and trust calibration?',
    method: 'Three-condition comparison with think-aloud design tasks',
    contribution: 'Evidence and guidelines for calibrated agency',
  },
  {
    id: 'RQ3',
    name: 'Performance-informed exploration',
    question: 'How does early, verified feedback change the alternatives designers explore and the trade-offs they negotiate?',
    method: 'Design tasks, interaction logs and interviews',
    contribution: 'Evidence on exploration, trade-offs and judgment',
  },
] as const;

export const CONDITIONS = ['conventional parametric workflow', 'agentic, without provenance', 'agentic, with provenance and adjustable agency'] as const;

export const CONTRIBUTIONS = [
  'A conceptual model of performance provenance for agentic spatial design',
  'An editable agentic co-design framework connected to professional parametric and analysis tools',
  'Verification protocols and benchmark cases for AI-assisted early-stage design',
  'Empirical evidence and design guidelines for calibrated agency, traceability and performance-informed exploration',
] as const;

/** What the four research projects do not yet do together (the synthesis step). */
export const GAPS = [
  'no provenance model that survives design revisions',
  'no systematic comparison of autonomy levels',
  'no verification protocol linking AI actions to professional analysis tools',
  'little evidence on how designers inspect, correct and calibrate trust',
] as const;

/** A possible first study (kept for reference; no longer shown). */
export const FIRST_STUDY =
  'Begin with one bounded Vancouver case, connect a verified rule set and one or two performance checks to editable parametric geometry, and study how designers inspect and revise AI suggestions.';

/** The GenEnv step: one shared question, Roman's starting point, what he hopes to develop. */
export const CONFLUENCE = {
  question: 'How can people and AI design constructed environments together while keeping rules, performance evidence, editable operations and human decisions visible?',
  background: 'Architecture and landscape judgment · GIS and environmental systems',
  projects: 'Unity, VR and interactive systems · HCI studies · early zoning, massing, verification and environmental-agent projects',
  develop: 'Advanced Rhino, Grasshopper and MCP integration · validated performance simulation · human and AI co-design theory · professional verification protocols · one focused doctoral system',
  developNote: 'Which direction, tools and first case to begin with would be shaped with the lab.',
  noteLabel: 'THREE POSSIBLE DIRECTIONS · FOR DISCUSSION',
  note: 'A verified performance contract, calibrated climate co-design, or embodied performance reasoning. One would become the dissertation, chosen with your guidance.',
} as const;

/** The program all three directions belong to (UBC NSERC Discovery announcement, 7 July 2026). */
export const PROGRAM = 'Human-AI Co-Design Framework for Performance-Aware Constructed Environments';

/**
 * State of the art, then the remaining gap. Only sources verified on
 * 2026-11-19 are shown (docs/NSERC_THREE_PROTOTYPE_DIRECTIONS_AUDIT.md §5).
 * Text-to-Park and CAD-Assistant could not be verified and are left out. The
 * thermal-comfort / digital-twin row was removed on 2026-11-20: no specific
 * verified source for it exists in the repository. It was replaced by Xun Liu's
 * earlier environmental-feedback work at Roman's request (FluX not verified online).
 */
export const STATE_OF_ART: readonly { what: string; refs: string; genenv?: boolean }[] = [
  { what: 'Environmental processes as interactive design feedback', refs: 'FluX (2016) · The Third Simulation (Liu, 2020) · Reinventing Planting Design (Liu et al., 2024)', genenv: true },
  { what: 'Language to parametric operations through MCP', refs: 'Liu and Tian, NeurIPS 2025 · GenEnv rhino-gh-mcp · Jin et al., eSim 2026', genenv: true },
  { what: 'Specialist agents with simulation and a rationale log', refs: 'Lam, ArchSim, UBC M.Arch thesis 2026', genenv: true },
  { what: 'Text to CAD and structured CAD code', refs: 'Text2CAD, NeurIPS 2024 · AIDL, CGF 2025 · Multi-Agent CAD Code Generation, SIGGRAPH 2026' },
  { what: 'Agents that configure and debug building simulation', refs: 'Zhang et al., Energy and Buildings 2025' },
  { what: 'Bidirectional Grasshopper and VR', refs: 'Crolla and Sheikh, Virtual Reality 2025' },
  { what: 'Agency and reliance in human-AI co-creation', refs: 'Zhou et al. (OptiMuse), CHI 2024 · Moruzzi and Margarido, CHI EA 2024' },
];

export const REMAINING_GAP = 'Human-governed continuity of valid, traceable performance evidence across changing geometry, assumptions and tools.';

/** The shared loop all three directions use. */
export const LOOP: readonly { n: string; role: Role }[] = [
  { n: 'Designer intention', role: 'human' },
  { n: 'AI interprets and co-ordinates', role: 'ai' },
  { n: 'Parametric model changes', role: 'operation' },
  { n: 'Verified tool calculates', role: 'compute' },
  { n: 'Evidence returns, with uncertainty', role: 'uncertain' },
  { n: 'Designer inspects, revises, decides', role: 'human' },
];

export const PROVENANCE_RECORD = 'intention · source or goal · operation · tool and version · assumptions and units · result · uncertainty · designer response';

/** Three possible directions within the same program; one would become the dissertation. */
export interface Direction {
  n: number;
  name: string;
  subtitle: string;
  branch: string;
  closestGenEnv: string;
  myEvidence: string;
  chain: { n: string; role: Role }[];
  twoWay?: boolean;
  test: string;
  questions: string[];
  methods: string[];
  contribution: string;
}

export const DIRECTIONS: readonly Direction[] = [
  {
    n: 1,
    name: 'Verified Performance Co-Designer',
    subtitle: 'A human-governed contract between design intent, parametric models and building simulation',
    branch: 'performance contract · early massing · building simulation',
    closestGenEnv: 'MCP parametric modelling; agent-driven public-space design',
    myEvidence: 'all four research projects',
    chain: [
      { n: 'Designer intent + verified inputs', role: 'human' },
      { n: 'LLM / MCP proposal', role: 'ai' },
      { n: 'Rhino / Grasshopper state', role: 'operation' },
      { n: 'Validated simulation', role: 'compute' },
      { n: 'Performance contract', role: 'source' },
      { n: 'Preview, commit, rollback', role: 'human' },
    ],
    test: 'one parcel and rule family · editable massing · solar or daylight plus energy or carbon',
    questions: [
      'Can a performance contract detect invalid, stale or inconsistent evidence?',
      'Does it keep intent, geometry, configuration and result consistent across revisions?',
      'Do preview, commit and rollback improve trade-off reasoning and reliance?',
    ],
    methods: ['Benchmark cases with known outcomes', 'Rule, geometry, unit and stale-evidence tests', 'Ablations without contract or approval gate', 'Workflow comparison with designers'],
    contribution: 'A machine-checkable performance contract, a benchmark, and evidence on how it changes design reasoning and reliance',
  },
  {
    n: 2,
    name: 'Evidence-Calibrated Climate Co-Designer',
    subtitle: 'Human-AI design of thermally responsive public spaces',
    branch: 'calibrated landscape evidence · microclimate intervention',
    closestGenEnv: 'Digital Thermal Sandbox (LACF; PI Yuhao Lu)',
    myEvidence: 'landscape training, Büyükada, Environmental Massing Agents',
    chain: [
      { n: 'GIS, weather, measurements', role: 'source' },
      { n: 'Calibrated model', role: 'compute' },
      { n: 'Parametric landscape', role: 'operation' },
      { n: 'Engine or surrogate + uncertainty gate', role: 'uncertain' },
      { n: 'AI / MCP alternatives', role: 'ai' },
      { n: 'Reversible intervention', role: 'human' },
    ],
    test: 'one courtyard, plaza or campus space · a few interventions: canopy, material, shade',
    questions: [
      'How can measured and simulated evidence become editable interventions without hiding uncertainty?',
      'Can an uncertainty gate decide when to recommend, rerun or defer to the designer?',
      'Does situated evidence beat static heatmaps or optimisation-only tools?',
    ],
    methods: ['Field or reference calibration', 'Surrogate error and out-of-range tests', 'Optimisation baseline', 'Static evidence vs co-designer, with designers'],
    contribution: 'An evidence-calibrated, uncertainty-gated protocol linking microclimate evidence, reversible interventions and human decisions',
  },
  {
    n: 3,
    name: 'Embodied Performance Reasoning Studio',
    subtitle: 'Inspecting, challenging and revising AI-supported performance decisions in space',
    branch: 'situated evidence · immersive performance reasoning',
    closestGenEnv: 'rhino-gh-mcp platform',
    myEvidence: 'eCAADe VR study, Unity, HCI studies',
    twoWay: true,
    chain: [
      { n: 'Rhino / Grasshopper state', role: 'operation' },
      { n: 'Validated simulation', role: 'compute' },
      { n: 'Evidence + uncertainty record', role: 'uncertain' },
      { n: 'Unity / VR what-if comparison', role: 'source' },
      { n: 'AI explains and proposes', role: 'ai' },
      { n: 'Preview, commit, rollback', role: 'human' },
    ],
    test: 'one room, courtyard or gallery · one problem only, such as daylight and glare',
    questions: [
      'Does situated evidence improve diagnosis beyond 2D reports and ordinary VR views?',
      'Do uncertainty and reversible what-ifs help designers reject spatially harmful proposals?',
      'Can geometry, IDs, units and evidence validity stay synchronised across tools?',
    ],
    methods: ['Fidelity, latency and round-trip tests', 'Ablations without uncertainty or approval', '2D report vs desktop 3D vs evidence-aware VR', 'Diagnosis, correction, reliance, workload'],
    contribution: 'An embodied performance-reasoning protocol that preserves evidence, exposes uncertainty and supports reversible decisions',
  },
];
