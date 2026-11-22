import type { Role } from './provenance';

/**
 * The future-research section (revised 2026-11-21): one shared research agenda
 * and three possible branches. All three are PROPOSED research directions,
 * shown as conceptual illustrations; every value in their diagrams is
 * illustrative, not a measurement or finding. The branches are entry points
 * into one agenda, not competing proposals, and are never ranked or compared.
 */

export const AGENDA =
  'Developing performance-aware human-AI co-design systems that connect design intentions, professional design tools, environmental simulations, verified evidence and human judgment.';

export const PRINCIPLE = 'AI suggests. Simulation calculates. People decide.';

/** The shared foundation, as one trail every branch uses. */
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
  /** The one sentence revealed on hover or focus. */
  sentence: string;
}

export const BRANCHES: readonly Branch[] = [
  { id: 'redteam', step: 'redteam', name: 'AI Design Red-Team', scale: 'Design risk', sentence: 'Searching for plausible conditions a design was never tested against, then repairing verified weaknesses without losing design intent.' },
  { id: 'externality', step: 'externality', name: 'Neighbourhood Externality Co‑Designer', scale: 'Neighbourhood effects', sentence: 'Making the shadow, heat, glare, wind and runoff a project sends across its boundary visible, so people can negotiate them.' },
  { id: 'living', step: 'living', name: 'Living Environment Co-Designer', scale: 'Change over time', sentence: 'Treating a place as something that changes, with thresholds to monitor and interventions to prepare, rather than one optimal design.' },
];

/** Three presentation states per direction: the problem, the proposed system, the human decision. */
export interface DirectionState {
  key: string;
  label: string;
  heading: string;
  text: string;
}

export const RT_STATES: readonly DirectionState[] = [
  { key: '1', label: 'Problem', heading: 'THE PROBLEM', text: 'Simulations usually test the scenarios designers already know to examine. Combinations of heat, use, drought, wind, equipment failure or occupancy may stay untested.' },
  { key: '2', label: 'Proposed system', heading: 'THE PROPOSED SYSTEM', text: 'AI proposes plausible stress scenarios. Verified simulation tools calculate their effects. The system finds a weakness and proposes a limited repair that protects the designer’s intentions.' },
  { key: '3', label: 'Designer decides', heading: 'THE HUMAN DECISION', text: 'The designer inspects the assumptions, evidence, uncertainty, protected intentions and proposed repair, then accepts, revises or rejects it.' },
];

export const RT_SCENARIOS = ['Heatwave during an evening event', 'Drought with irrigation off', 'Cooling failure at peak occupancy', 'Winter wind at the corner'] as const;

export const EX_STATES: readonly DirectionState[] = [
  { key: '1', label: 'Proposal', heading: 'ONE PROPOSAL, MANY NEIGHBOURS', text: 'A tall tower meets its own targets, but simulation shows shadow on the garden, glare on the school yard, and wind and runoff at the plaza.' },
  { key: '2', label: 'Conflicts', heading: 'WHERE PRIORITIES CONFLICT', text: 'The project’s floor area conflicts with the garden’s sun hours, the school’s safe play and the plaza’s outdoor comfort.' },
  { key: '3', label: 'Alternative', heading: 'AN ALTERNATIVE TO DISCUSS', text: 'AI suggests stepped massing, a green roof and a matte façade. Simulation shows fewer transferred burdens. People decide whether the trade-off is acceptable.' },
];

export const EX_LAYERS = ['Shadow', 'Heat', 'Glare', 'Wind', 'Runoff'] as const;
export type ExLayer = (typeof EX_LAYERS)[number];

export const EX_PARCELS: readonly { id: string; name: string; priority: string; x: number; y: number; w: number; h: number }[] = [
  { id: 'housing', name: 'Housing', priority: 'winter daylight', x: 20, y: 116, w: 450, h: 204 },
  { id: 'garden', name: 'Community garden', priority: 'sun for crops', x: 530, y: 116, w: 210, h: 204 },
  { id: 'school', name: 'School yard', priority: 'safe, shaded play', x: 750, y: 116, w: 230, h: 204 },
  { id: 'shops', name: 'Shops', priority: 'street activity', x: 20, y: 380, w: 210, h: 210 },
  { id: 'site', name: 'Project site', priority: 'floor area, own targets', x: 240, y: 380, w: 230, h: 210 },
  { id: 'plaza', name: 'Public plaza', priority: 'outdoor comfort', x: 530, y: 380, w: 450, h: 210 },
];

/** Illustrative effect on each neighbour: positive = burden, negative = benefit. Not measured. */
export const EX_EFFECTS: Record<'tower' | 'alternative', Record<ExLayer, Partial<Record<string, number>>>> = {
  tower: {
    Shadow: { garden: 0.9, housing: 0.3 },
    Heat: { plaza: 0.3 },
    Glare: { school: 0.7 },
    Wind: { plaza: 0.8 },
    Runoff: { plaza: 0.5, shops: 0.2 },
  },
  alternative: {
    Shadow: { garden: 0.25, housing: 0.15 },
    Heat: { plaza: -0.3 },
    Glare: {},
    Wind: { plaza: 0.25 },
    Runoff: { plaza: -0.2 },
  },
};

export const LV_STOPS: readonly { label: string; year: number; note: string }[] = [
  { label: 'Today', year: 0, note: 'Young trees, new paving, current climate' },
  { label: '10 years', year: 10, note: 'Warmer summers; the canopy is still small' },
  { label: 'Threshold', year: 18, note: 'Heat stress crosses the limit the designer set' },
  { label: 'Intervention', year: 20, note: 'Temporary shade, permeable paving, irrigation' },
  { label: '40 years', year: 40, note: 'A mature canopy carries the shade' },
];
