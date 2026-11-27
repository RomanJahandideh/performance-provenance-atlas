/**
 * System-workflow figures, one per project and per proposed direction, drawn in
 * the style of Figure 1 in Liu & Tian (2025): designer prompt → input → LLM
 * layer → bridge (MCP or pipeline) → professional tool environment with a
 * component repository → model → output, with a feedback loop to the designer.
 *
 * Project figures describe what each repository's README documents
 * (checked 2026-11-26). Anything written but not executed is marked `dashed`.
 * Direction figures are proposals: every part is dashed and labelled as such.
 */

export type Thumb = 'text' | 'plan' | 'massing' | 'section' | 'agents' | 'chart' | 'map' | 'heat' | 'timeline' | 'sun' | 'terrain';

export interface SysBox {
  label: string;
  sub?: string;
  dashed?: boolean;
}

export interface SysCard {
  title: string;
  lines: string[];
  thumb: Thumb;
  dashed?: boolean;
}

export interface SystemSpec {
  step: string;
  figure: number;
  caption: string;
  status: 'built' | 'proposed';
  statusNote: string;
  prompt: string;
  input: string;
  left: { title: string; agents: SysBox[]; llm: SysBox; brand: string; dashed?: boolean };
  bridge: { title: string; a: SysBox; b: SysBox };
  right: { title: string; commands: string[]; core: SysBox; store: string; canvas: string; cards: SysCard[]; modelThumb: Thumb; model: string };
  output: string;
  feedback: string;
  notes: string[];
}

const PROPOSED = 'Proposed research direction · conceptual system · not yet built';

export const SYSTEMS: readonly SystemSpec[] = [
  {
    step: 'zla',
    figure: 1,
    caption: 'Zoning Literacy Assistant: a question passes through three narrow model calls (retrieve, synthesise, verify), grounded only in ten R1-1 clauses; site arithmetic is computed in code.',
    status: 'built',
    statusNote: 'Built and live · static web app',
    prompt: 'How many storeys can a laneway house have?',
    input: 'Zoning question',
    left: {
      title: 'Large Language Model calls (Claude) · three narrow roles',
      agents: [
        { label: 'Retrieval', sub: 'sees clause titles only, picks IDs' },
        { label: 'Synthesis', sub: 'sees retrieved text only, quotes it' },
        { label: 'Verification', sub: 'checks quotes and missed clauses' },
      ],
      llm: { label: 'Large Language Model', sub: 'Claude · Anthropic API' },
      brand: 'Claude',
    },
    bridge: { title: 'Pipeline in the browser (no backend)', a: { label: 'Clause-scoped prompt' }, b: { label: 'Structured JSON answer' } },
    right: {
      title: 'Web application · JavaScript',
      commands: ['retrieve(clause IDs)', 'quote(exact sentences)', 'stop: “not covered”'],
      core: { label: 'Deterministic site checker' },
      store: 'R1-1 bylaw excerpt · 10 clauses',
      canvas: 'Browser interface',
      cards: [
        { title: 'Ask a question', lines: ['question', 'clauses retrieved', 'quotes used'], thumb: 'text' },
        { title: 'Check my site', lines: ['lot width, depth', 'secured rental', 'footprint 162.6 m²'], thumb: 'plan' },
        { title: 'Trace view', lines: ['retrieved', 'verified', 'not covered'], thumb: 'chart' },
      ],
      modelThumb: 'text',
      model: 'Answer + citations',
    },
    output: 'Cited answer or “not covered”',
    feedback: 'Ask a follow-up',
    notes: ['Ten clauses of Vancouver’s R1-1 zone; simplified; not planning advice.', 'If retrieval finds nothing relevant, the pipeline stops before synthesis.'],
  },
  {
    step: 'pmg',
    figure: 2,
    caption: 'Parametric Massing Generator: Claude extracts each rule with its source phrase and confidence, an independent reviewer checks the result, and code builds the envelope; conversational refinement changes only the affected fields.',
    status: 'built',
    statusNote: 'Built and live · static web app',
    prompt: 'R1-1 lot, secured rental: make it one storey taller',
    input: 'Bylaw text or instruction',
    left: {
      title: 'Large Language Model calls (Claude, the user’s own key)',
      agents: [
        { label: 'Parser', sub: 'value + source phrase + confidence' },
        { label: 'Reviewer', sub: 'independent check, one suggested fix' },
        { label: 'Refiner', sub: 'edits only the fields asked for' },
        { label: 'Zoner', sub: 'fuzzy directions → parcel zones' },
      ],
      llm: { label: 'Large Language Model', sub: 'Claude · direct browser call' },
      brand: 'Claude',
    },
    bridge: { title: 'Browser ↔ Anthropic API (no backend)', a: { label: 'JSON request (prefill)' }, b: { label: 'Map + clamp to sliders' } },
    right: {
      title: 'Web application · JavaScript + Three.js',
      commands: ['set FAR 0.70 → 1.00', 'height + 1 storey', 'zone: park, north-east'],
      core: { label: 'Deterministic envelope engine' },
      store: 'R1-1 preset · eight constraints',
      canvas: 'Sliders + 3D + plan',
      cards: [
        { title: 'Lot and setbacks', lines: ['front 4.9 m', 'side 1.2 m', 'rear 10.7 m'], thumb: 'plan' },
        { title: 'Height and FAR', lines: ['11.5 m / 3 storeys', 'FAR 0.70 or 1.00', 'rental condition'], thumb: 'massing' },
        { title: 'Irregular parcel', lines: ['half-plane clipping', 'per-edge setbacks', 'true inward offset'], thumb: 'map' },
      ],
      modelThumb: 'massing',
      model: '3D massing + plan',
    },
    output: 'Massing, stats, generation history',
    feedback: 'Refine conversationally',
    notes: ['Every parse and applied fix is written to a visible generation history.', 'A research prototype, not code-compliance software.'],
  },
  {
    step: 'vcm',
    figure: 3,
    caption: 'Vancouver View Corridor Massing: real corridor geometry from open data, floor-by-floor clipping in tested Python, a Rhino .3dm output, and an AI layer that reasons over the computed numbers without recomputing them.',
    status: 'built',
    statusNote: 'Core built and tested · AI layer and Grasshopper extrusion written, not executed',
    prompt: 'Which orientation suits a slender tower here?',
    input: 'Design brief',
    left: {
      title: 'AI-directed layer (written; not run without an API key)',
      agents: [{ label: 'Recommender', sub: 'reasons over results, never recomputes', dashed: true }],
      llm: { label: 'Large Language Model', sub: 'Claude · Messages API', dashed: true },
      brand: 'Claude',
      dashed: true,
    },
    bridge: { title: 'Python pipeline', a: { label: 'Study results (RQ1, RQ2)' }, b: { label: 'rhino3dm writer' } },
    right: {
      title: 'Rhino 3D / Grasshopper',
      commands: ['fetch view-cone J1', 'clip floor by floor', 'write .3dm'],
      core: { label: 'rhino3dm / RhinoCommon' },
      store: 'Vancouver Open Data · view-cones (J1)',
      canvas: 'Grasshopper (GhPython)',
      cards: [
        { title: 'Corridor ceiling', lines: ['apex and axis', 'BASE_ELEV placeholder', 'SLOPE placeholder'], thumb: 'section' },
        { title: 'Floor-by-floor clip', lines: ['half-plane clip', '18 floors vs 10', '+39.5% floor area'], thumb: 'massing' },
        { title: 'GhPython component', lines: ['same tested core', 'extrusion step', 'not executed'], thumb: 'terrain', dashed: true },
      ],
      modelThumb: 'section',
      model: '.3dm · 18 floors',
    },
    output: 'preview.png + model in Rhino',
    feedback: 'Revise the brief',
    notes: ['Corridor geometry is real; base elevation and slope are placeholders.', 'Dashed parts were written but not executed.'],
  },
  {
    step: 'ema',
    figure: 4,
    caption: 'Environmental Massing Agents: a generator, four domain critics and an orchestrator share one live MCP session; deterministic evaluators calculate every score.',
    status: 'built',
    statusNote: 'MCP server and scripted loop tested · live multi-agent run not executed',
    prompt: 'Keep the park in sun and embodied carbon low',
    input: 'Design directive',
    left: {
      title: 'Agent roles (Claude, native tool use)',
      agents: [
        { label: 'Generator', sub: 'propose_design' },
        { label: 'Solar critic', sub: 'submit_critique' },
        { label: 'Carbon critic', sub: 'submit_critique' },
        { label: 'Wind critic', sub: 'submit_critique' },
        { label: 'Yield critic', sub: 'submit_critique' },
        { label: 'Orchestrator', sub: 'submit_directive' },
      ],
      llm: { label: 'Large Language Model', sub: 'Claude · live run needs a key', dashed: true },
      brand: 'Claude',
    },
    bridge: { title: 'MCP infrastructure (stdio, official SDK)', a: { label: 'MCP client (orchestrator)' }, b: { label: 'MCP server (mcp_server.py)' } },
    right: {
      title: 'Deterministic core + Rhino',
      commands: ['generate_massing', 'evaluate_design', 'compare_structural_materials'],
      core: { label: 'evaluate_design() · one source of truth' },
      store: 'Creekside J1 corridor + carbon benchmarks',
      canvas: 'Grasshopper (GhPython)',
      cards: [
        { title: 'Solar', lines: ['sun-position model', 'three days', 'park target point'], thumb: 'sun' },
        { title: 'Carbon', lines: ['GFA × benchmark', 'concrete / timber', '/ steel'], thumb: 'chart' },
        { title: 'Wind + yield', lines: ['slenderness proxy', 'SW storm wind', 'corridor yield'], thumb: 'section' },
      ],
      modelThumb: 'massing',
      model: '.3dm · 18 floors',
    },
    output: 'Pareto set, critiques, directives',
    feedback: 'Next round',
    notes: ['NSGA-II stands in for the agent search: 4 of 5 runs reached the target, random 1 of 5.', 'Simplified solar, benchmark carbon, wind proxy (not CFD).'],
  },
  {
    step: 'redteam',
    figure: 5,
    caption: 'AI Design Red-Team (proposed): agents propose plausible stress scenarios and minimal repairs; simulation tools calculate; the designer protects intentions and decides.',
    status: 'proposed',
    statusNote: PROPOSED,
    prompt: 'Protect the canopy, seating and view. Where could this plaza fail?',
    input: 'Design + protected intentions',
    left: {
      title: 'Agent layer (proposed)',
      agents: [
        { label: 'Scenario agent', sub: 'plausible stress cases', dashed: true },
        { label: 'Repair agent', sub: 'smallest change, keeps intentions', dashed: true },
        { label: 'Explainer', sub: 'evidence, assumptions, uncertainty', dashed: true },
      ],
      llm: { label: 'Large Language Model', sub: 'interprets and plans; never calculates', dashed: true },
      brand: 'LLM',
      dashed: true,
    },
    bridge: { title: 'MCP infrastructure (proposed)', a: { label: 'MCP client · approval gate', dashed: true }, b: { label: 'MCP server on Rhino', dashed: true } },
    right: {
      title: 'Rhino 3D / Grasshopper + simulation (proposed)',
      commands: ['set scenario: heatwave + event', 'add canopy over seating', 're-run comfort analysis'],
      core: { label: 'RhinoCommon SDK', dashed: true },
      store: 'Protected-intent register + scenario library',
      canvas: 'Grasshopper',
      cards: [
        { title: 'Stress scenario', lines: ['weather, occupancy', 'equipment failure', 'maintenance'], thumb: 'heat', dashed: true },
        { title: 'Simulation', lines: ['e.g. comfort, energy', 'validated tools', 'calculate'], thumb: 'chart', dashed: true },
        { title: 'Minimal repair', lines: ['changed elements', 'kept intentions', 'before / after'], thumb: 'plan', dashed: true },
      ],
      modelThumb: 'heat',
      model: 'Plaza + failure map',
    },
    output: 'Weakness, repair, retest evidence',
    feedback: 'Designer accepts, revises or rejects',
    notes: ['Conceptual; no part is built. Tools named as examples only.', 'Novelty to be confirmed through a formal prior-art review.'],
  },
  {
    step: 'externality',
    figure: 6,
    caption: 'Neighbourhood Externality Co-Designer (proposed): simulation maps effects that cross parcel boundaries; agents suggest alternatives and compromises; people deliberate and decide.',
    status: 'proposed',
    statusNote: PROPOSED,
    prompt: 'Who gains and who loses if this tower goes here?',
    input: 'Parcels, rules, priorities',
    left: {
      title: 'Agent layer (proposed)',
      agents: [
        { label: 'Alternatives agent', sub: 'parcel-level options', dashed: true },
        { label: 'Negotiation agent', sub: 'conflicts and compromises', dashed: true },
        { label: 'Explainer', sub: 'results, preferences, suggestions apart', dashed: true },
      ],
      llm: { label: 'Large Language Model', sub: 'interprets and plans; never calculates', dashed: true },
      brand: 'LLM',
      dashed: true,
    },
    bridge: { title: 'MCP infrastructure (proposed)', a: { label: 'MCP client · approval gate', dashed: true }, b: { label: 'MCP server on Rhino', dashed: true } },
    right: {
      title: 'Rhino 3D / Grasshopper + GIS (proposed)',
      commands: ['load parcels + context', 'run shadow, heat, wind', 'map gains and burdens'],
      core: { label: 'RhinoCommon SDK', dashed: true },
      store: 'GIS parcels + stakeholder priorities',
      canvas: 'Grasshopper',
      cards: [
        { title: 'Cross-boundary effects', lines: ['shadow, heat, glare', 'wind, runoff', 'validated tools'], thumb: 'map', dashed: true },
        { title: 'Gains and burdens', lines: ['per parcel', 'per layer', 'not a fairness score'], thumb: 'chart', dashed: true },
        { title: 'Alternatives', lines: ['tower', 'low block', 'stepped compromise'], thumb: 'massing', dashed: true },
      ],
      modelThumb: 'map',
      model: 'Neighbourhood + effect fields',
    },
    output: 'Trade-off map for deliberation',
    feedback: 'People decide; fairness is not computed',
    notes: ['Conceptual; no part is built. Tools named as examples only.', 'Novelty to be confirmed through a formal prior-art review.'],
  },
  {
    step: 'living',
    figure: 7,
    caption: 'Living Environment Co-Designer (proposed): temporal simulation follows a place over seasons and decades; agents propose futures and adaptive pathways; the designer sets the limit and chooses the pathway.',
    status: 'proposed',
    statusNote: PROPOSED,
    prompt: 'Keep summer use comfortable for forty years',
    input: 'Project, priorities, chosen limit',
    left: {
      title: 'Agent layer (proposed)',
      agents: [
        { label: 'Futures agent', sub: 'climate, growth, use scenarios', dashed: true },
        { label: 'Pathway agent', sub: 'thresholds and interventions', dashed: true },
        { label: 'Explainer', sub: 'assumptions and sensitivity', dashed: true },
      ],
      llm: { label: 'Large Language Model', sub: 'interprets and plans; never calculates', dashed: true },
      brand: 'LLM',
      dashed: true,
    },
    bridge: { title: 'MCP infrastructure (proposed)', a: { label: 'MCP client · approval gate', dashed: true }, b: { label: 'MCP server on Rhino', dashed: true } },
    right: {
      title: 'Rhino 3D / Grasshopper + temporal models (proposed)',
      commands: ['grow canopy + 10 years', 'set climate scenario', 'add temporary shade'],
      core: { label: 'RhinoCommon SDK', dashed: true },
      store: 'Climate, vegetation, material and use models',
      canvas: 'Grasshopper',
      cards: [
        { title: 'Temporal simulation', lines: ['seasons to decades', 'canopy growth', 'weathering'], thumb: 'terrain', dashed: true },
        { title: 'Threshold monitor', lines: ['designer’s limit', 'indicators', 'uncertainty band'], thumb: 'timeline', dashed: true },
        { title: 'Adaptive pathway', lines: ['intervention points', 'options kept open', 'static vs adaptive'], thumb: 'timeline', dashed: true },
      ],
      modelThumb: 'terrain',
      model: 'Courtyard over time',
    },
    output: 'Pathway with intervention points',
    feedback: 'Designer chooses the pathway',
    notes: ['Conceptual; no part is built. Prepares for change, does not predict it.', 'Novelty to be confirmed through a formal prior-art review.'],
  },
];

export function systemFor(stepId: string | undefined): SystemSpec | undefined {
  return SYSTEMS.find((s) => s.step === stepId);
}
