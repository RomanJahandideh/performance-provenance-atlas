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

/** The research-fit step: Roman's starting point, the shared question, what he hopes to develop. */
export const CONFLUENCE = {
  question: 'How can people and AI design constructed environments together while keeping design rules, performance evidence, editable operations and consequential human decisions visible?',
  background: 'Architecture and landscape-design judgment · GIS and environmental systems',
  projects: 'Interactive environments and VR · Unity and system development · HCI experiments and user studies · early zoning, massing, verification and environmental-agent projects',
  develop: 'Advanced Rhino and Grasshopper workflows · structured AI-to-tool communication · validated performance analysis · human-AI co-design theory · verification and provenance methods · one focused doctoral research system',
  developNote: 'The final direction, analytical tools and first design case would be refined through doctoral supervision, technical feasibility testing and the strongest identified research gap.',
  noteLabel: 'THREE POSSIBLE DIRECTIONS · FOR DISCUSSION',
  note: 'These are alternative starting positions rather than three promised dissertations. I would value your guidance in identifying which one offers the strongest foundation for a focused doctoral contribution.',
} as const;

/** Program title from the UBC NSERC Discovery announcement (7 July 2026). Kept for the source record; not shown on any slide. */
export const PROGRAM = 'Human-AI Co-Design Framework for Performance-Aware Constructed Environments';

/**
 * State of the art, organised by research capability (revised 2026-11-20).
 * The slide names works by title and venue; full authorship, DOIs and
 * verification notes are in citations.ts and the step 19 source drawer.
 * No row is coloured by institution. `edge` marks the least-resolved
 * capability, which leads into the open research problem (yellow).
 * FluX is not shown: it could not be verified.
 */
export const STATE_OF_ART: readonly { what: string; refs: string; edge?: boolean }[] = [
  { what: 'Environmental processes as interactive design feedback', refs: 'The Third Simulation, JoDLA 2020 · Reinventing Planting Design, JoDLA 2024' },
  { what: 'Natural language to structured parametric operations', refs: 'MCP-Driven Parametric Modeling, NeurIPS 2025 · LLM-MCP design, eSim 2026 · Req2CAD, CHI 2026' },
  { what: 'Agentic modelling and deterministic simulation', refs: 'EnergyPlus-MCP, SoftwareX 2025 · MCP energy workflow, JBPS 2026 · agent schema, AutoCon 2025' },
  { what: 'Structured text-to-CAD generation', refs: 'Text2CAD, NeurIPS 2024 · AIDL, CGF 2025 · Multi-Agent CAD Code Generation, SIGGRAPH 2026' },
  { what: 'Mixed-initiative human-AI co-creation', refs: 'Nonlinear human-AI co-design, CHI 2024 · model-led vs human-led co-creation, CHI 2026' },
  { what: 'Bidirectional interaction across design environments', refs: 'Grasshopper VR, Virtual Reality 2025' },
  { what: 'Traceability, verification and appropriate human control', refs: 'partial: co-creativity framework, CHI EA 2024 · agentic model debugging, E&B 2025', edge: true },
];

export const REMAINING_GAP = 'How can an AI-assisted design workflow preserve the continuity of valid performance evidence across changing geometry, assumptions and analytical tools, while leaving consequential decisions open to designer inspection, challenge and revision?';
export const GAP_NOTE = 'Recent systems address individual parts of this workflow, but their integration into a continuously verifiable, designer-governed co-design process remains insufficiently resolved.';

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

/**
 * Three alternative doctoral emphases on one shared platform for human-AI
 * performance co-design. The visible copy is field-level and problem-driven;
 * named authors and institutions appear only in the source drawer
 * (docs/PHD_DIRECTIONS_NEUTRAL_REVISION_2026-11-20.md). One direction would be
 * developed through supervised doctoral research.
 */

/** The shared doctoral platform, left to right. `emph` marks where each direction puts its research weight. */
export const PLATFORM: readonly { n: string; sub: string; role: Role; emph?: 1 | 2 | 3 }[] = [
  { n: 'Designer intent', sub: 'goals · constraints', role: 'human' },
  { n: 'Structured design representation', sub: 'JSON schema · parameters', role: 'operation' },
  { n: 'AI planner', sub: 'interprets · plans · explains', role: 'ai', emph: 2 },
  { n: 'MCP tool routing', sub: 'structured tool calls', role: 'operation' },
  { n: 'Rhino / Grasshopper model', sub: 'editable geometry', role: 'operation' },
  { n: 'Deterministic simulation', sub: 'calculates the numbers', role: 'compute' },
  { n: 'Evidence and verification', sub: 'links results to states', role: 'source', emph: 1 },
  { n: 'Comparison and revision interface', sub: 'approve · roll back', role: 'human', emph: 3 },
];

export const PLATFORM_TOOLS = 'POSSIBLE TOOLS, NOT ALL AT ONCE: RHINO · GRASSHOPPER · MCP · LADYBUG TOOLS · HONEYBEE · RADIANCE · ENERGYPLUS · JSON SCHEMAS · EVIDENCE GRAPH · WEB INTERFACE';
export const PLATFORM_START = 'Start bounded: one Vancouver parcel, public space, courtyard or block · one modelling environment · one or two validated performance domains';

/** One possible doctoral direction. Every field is proposed work, not built work. */
export interface Direction {
  n: number;
  name: string;
  workingTitle: string;
  /** The research emphasis highlighted in its diagram. */
  emphasis: string;
  /** Optional reason shown in the diagram header. */
  why?: string;
  /** Short name for the comparison table header. */
  short: string;
  /** One-line question shown on the slide. */
  question: string;
  /** Seven-part system: designer → AI → tool interface → model → engine → key mechanism → decision. */
  system: { n: string; sub: string; role: Role; key?: boolean }[];
  /** Three short phrases about the highlighted mechanism. */
  keyPoints: string[];
  technical: string;
  study: string;
  contribution: string;
  /** Field-level research foundation shown on the slide (citations live in the drawer). */
  foundation: string;
  questions: string[];
  risk: string;
}

export const DIRECTIONS: readonly Direction[] = [
  {
    n: 1,
    name: 'Performance EvidenceGraph Co‑Designer',
    short: 'EvidenceGraph co-designer',
    workingTitle: 'Performance EvidenceGraph: A Traceable Human-AI Co-Design System for Early-Stage Constructed Environments',
    emphasis: 'Evidence graph',
    why: 'STRONGEST START: JOINS GEOMETRY, CALCULATION, AI PLANNING, EVIDENCE AND REVISION',
    question: 'When the design changes, which performance results are still true?',
    system: [
      { n: 'Designer intent', sub: '“more open, keep comfort”', role: 'human' },
      { n: 'Intent parser + planner', sub: 'plans · explains', role: 'ai' },
      { n: 'MCP bridge', sub: 'structured tool calls', role: 'operation' },
      { n: 'Rhino / Grasshopper', sub: 'editable parameters', role: 'operation' },
      { n: 'Validated simulation', sub: 'one or two domains', role: 'compute' },
      { n: 'Evidence graph + verifier', sub: 'flags stale results', role: 'proposal', key: true },
      { n: 'Designer decides', sub: 'accept · refine · roll back', role: 'human' },
    ],
    keyPoints: [
      'Every claim links to geometry, inputs, weather, tool version, settings, units and state',
      'An edit that invalidates a result marks it stale; the AI may not present it as current',
      'Failed calls and missing data are detected and rerun within the designer’s permissions',
    ],
    technical: 'Benchmark of edit sequences: geometry, weather and setting changes, failed calls, missing data, wrong units, stale results',
    study: 'Chat-and-simulation workflow vs EvidenceGraph co-designer: error detection, reliance, control, workload',
    contribution: 'An evidence-aware co-design architecture in which verified performance dependencies constrain what the AI may claim',
    foundation: 'Protocol-based parametric modelling · deterministic performance simulation · provenance-aware computing · human-AI co-design',
    questions: [
      'How can performance evidence remain valid and understandable during iterative human-AI design?',
      'How should an AI system detect and communicate stale, incomplete or contradictory performance evidence?',
      'Does evidence-linked interaction improve designers’ ability to identify errors and make informed performance decisions?',
      'How does traceable evidence affect appropriate reliance on AI recommendations?',
    ],
    risk: 'Moderate',
  },
  {
    n: 2,
    name: 'Negotiable‑Agency Performance Co‑Designer',
    short: 'Negotiable agency',
    workingTitle: 'Negotiable Agency: A Mixed-Initiative AI System for Performance-Aware Design',
    emphasis: 'Agency controller',
    question: 'When should the AI act, and when should it stop and ask?',
    system: [
      { n: 'Designer sets permissions', sub: 'roles can change', role: 'human' },
      { n: 'Intent interpreter + critic', sub: 'suggests · critiques', role: 'ai' },
      { n: 'Agency controller', sub: 'consequence · confidence · reversibility', role: 'proposal', key: true },
      { n: 'MCP → Grasshopper', sub: 'protected branches', role: 'operation' },
      { n: 'Validated simulation', sub: 'daylight or energy', role: 'compute' },
      { n: 'Interaction history', sub: 'why authority changed', role: 'source' },
      { n: 'Designer approves', sub: 'or restores a state', role: 'human' },
    ],
    keyPoints: [
      'Not one fixed level: inspect, suggest, coach, generate, execute, critique, compare',
      'Permissions shift with consequence, reversibility, confidence, evidence quality, design stage and designer preference',
      'Consequential or hard-to-reverse actions need explicit approval; every change can be rolled back',
    ],
    technical: 'Unsupported actions, correction frequency, rollback success, on real models with real analysis',
    study: 'Fixed low autonomy vs fixed high autonomy vs negotiated, evidence-aware agency',
    contribution: 'A built-environment model of negotiable agency, grounded in geometric consequences and verified performance evidence',
    foundation: 'Mixed-initiative interaction · adjustable autonomy · consequence-aware tool use · appropriate human reliance',
    questions: [
      'How should agency be distributed between human and AI during different stages of performance-aware design?',
      'Can agency be adjusted using evidence quality, uncertainty, consequence and reversibility?',
      'When should the AI ask, suggest, execute, critique or remain silent?',
      'How do different agency arrangements affect exploration, performance outcomes, workload, authorship and appropriate reliance?',
    ],
    risk: 'Moderate',
  },
  {
    n: 3,
    name: 'Multi‑Agent Performance Deliberation Studio',
    short: 'Deliberation studio',
    workingTitle: 'Performance Deliberation Studio: Evidence-Grounded Multi-Agent Negotiation for Constructed-Environment Design',
    emphasis: 'Deliberation interface',
    question: 'How can specialist agents show their disagreements instead of hiding them in one score?',
    system: [
      { n: 'Designer sets priorities', sub: 'and can change them', role: 'human' },
      { n: 'Orchestrator + 2 specialists', sub: 'cite outputs · state gaps', role: 'ai' },
      { n: 'MCP → Grasshopper', sub: 'shared design state', role: 'operation' },
      { n: 'Two validated engines', sub: 'e.g. daylight + energy', role: 'compute' },
      { n: 'Evidence broker', sub: 'no claim without a result', role: 'source' },
      { n: 'Deliberation + conflict view', sub: 'trade-offs kept visible', role: 'proposal', key: true },
      { n: 'Designer resolves', sub: 'combine · reject · keep options', role: 'human' },
    ],
    keyPoints: [
      'Every agent calls a deterministic analysis tool and cites its output, assumptions and gaps',
      'Disagreements stay visible and link to the affected design variables; nothing is silently averaged',
      'The designer resolves each trade-off or preserves the alternatives side by side',
    ],
    technical: 'Unsupported claims, simulation consistency, trade-off coverage, reproducibility',
    study: 'Single agent vs hidden multi-agent agreement vs visible, evidence-grounded deliberation',
    contribution: 'Visible, evidence-grounded negotiation among performance specialists inside an editable professional design workflow',
    foundation: 'Multi-agent design systems · tool-grounded reasoning · multi-objective performance analysis · explainable trade-offs',
    questions: [
      'How can specialised AI agents deliberate over competing constructed-environment performance goals without hiding conflict?',
      'How should deterministic simulation evidence be represented and exchanged among agents?',
      'Does visible agent disagreement improve designers’ understanding of performance trade-offs?',
      'Can a human-directed deliberation system produce more diverse and defensible alternatives than a single-agent or silent optimisation workflow?',
    ],
    risk: 'High',
  },
];

/** The comparison step. Column 1 is Roman's strongest current starting point; none is chosen permanently. */
export const COMPARISON: readonly { criterion: string; cells: [string, string, string] }[] = [
  { criterion: 'Central issue', cells: ['Valid performance evidence', 'Distribution of human and AI control', 'Competing performance objectives'] },
  { criterion: 'Main prototype', cells: ['Evidence-aware co-designer', 'Mixed-initiative co-designer', 'Multi-agent deliberation studio'] },
  { criterion: 'AI role', cells: ['Plan, modify, verify, explain', 'Acts within negotiated permissions', 'Coordinate and debate specialist advice'] },
  { criterion: 'Professional tools', cells: ['Rhino/Grasshopper + simulator', 'Rhino/Grasshopper + simulator', 'Rhino/Grasshopper + two simulators'] },
  { criterion: 'Human role', cells: ['Inspect evidence and decide', 'Define permissions, keep authorship', 'Set priorities, resolve trade-offs'] },
  { criterion: 'Main evaluation', cells: ['Technical benchmark + designer study', 'Three agency conditions', 'Three deliberation conditions'] },
  { criterion: 'Coherence with the shared research problem', cells: ['Very strong', 'Strong', 'Very strong'] },
  { criterion: 'Technical risk', cells: ['Moderate', 'Moderate', 'High'] },
  { criterion: 'My strongest starting point', cells: ['Yes', 'Possible HCI emphasis', 'Ambitious, later-stage'] },
];
