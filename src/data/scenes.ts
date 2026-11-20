import type { Scene } from './types';

/**
 * Source groups for the drawer (S). Each step in src/data/steps.ts names one.
 */
export const SCENES: readonly Scene[] = [
  { id: 'opening', title: 'Opening', citationIds: ['genenv-hacd', 'sala-liu'], evidenceIds: ['phd-provisional'] },
  { id: 'trajectory', title: 'Background: making, form, environmental systems', citationIds: [], evidenceIds: [] },
  {
    id: 'foundation',
    title: 'Perception and Interactive Environments',
    citationIds: ['ecaade2023', 'iss2026'],
    evidenceIds: ['ecaade-design', 'ecaade-finding', 'iss-study1', 'iss-study2', 'iss-tradeoff', 'bio-pipeline', 'bio-study'],
  },
  {
    id: 'zla',
    title: 'Zoning Literacy Assistant',
    citationIds: ['genenv-decoding'],
    evidenceIds: ['zla-ten-clauses', 'zla-pipeline', 'zla-laneway', 'zla-deterministic-example'],
  },
  {
    id: 'pmg',
    title: 'Parametric Massing Generator',
    citationIds: ['genenv-decoding'],
    evidenceIds: ['pmg-eight-constraints', 'pmg-source-confidence', 'pmg-review-pass', 'pmg-three-modes', 'pmg-r11-preset', 'pmg-geometry-method'],
  },
  {
    id: 'vcm',
    title: 'Vancouver View Corridor Massing',
    citationIds: [],
    evidenceIds: ['vcm-corridor', 'vcm-flat-cap', 'vcm-trimmed', 'vcm-gfa-recovery', 'vcm-rotation-study', 'vcm-placeholders', 'vcm-gh-unexecuted'],
  },
  {
    id: 'ema',
    title: 'Environmental Massing Agents',
    citationIds: ['liu-tian-2025'],
    evidenceIds: ['ema-roles', 'ema-reference-grid', 'ema-search-setup', 'ema-h1-not-confirmed', 'ema-reliability', 'ema-h2-timber', 'ema-h3-floor-formula', 'ema-h4-pareto', 'ema-limitations'],
  },
  {
    id: 'stateofart',
    title: 'State of the art and the remaining gap',
    citationIds: ['liu-flux-2016', 'liu-third-simulation-2020', 'liu-planting-2024', 'liu-tian-2025', 'genenv-ghmcp', 'jin-esim2026', 'lam-archsim', 'text2cad', 'aidl', 'mac-siggraph2026', 'eplus-agent', 'gh-vr', 'optimuse', 'moruzzi-chi2024'],
    evidenceIds: [],
  },
  { id: 'synthesis', title: 'Research projects and the missing layer', citationIds: [], evidenceIds: ['zla-pipeline', 'pmg-geometry-method', 'vcm-gfa-recovery', 'vcm-placeholders', 'ema-h1-not-confirmed', 'ema-reliability', 'ema-limitations'] },
  {
    id: 'phd',
    title: 'Three possible directions within the Human-AI Co-Design program',
    citationIds: ['ubc-nserc-2026', 'genenv-hacd', 'genenv-ghmcp', 'liu-tian-2025', 'jin-esim2026', 'lam-archsim', 'genenv-sandbox', 'gh-vr', 'eplus-agent'],
    evidenceIds: ['phd-provisional', 'genenv-modes', 'vcm-trimmed', 'vcm-gfa-recovery', 'vcm-placeholders'],
  },
  {
    id: 'genenv',
    title: 'Why GenEnv',
    citationIds: ['genenv-hacd', 'genenv-decoding', 'genenv-ghmcp', 'genenv-lexicalization', 'genenv-sandbox', 'genenv-openings', 'nserc-939', 'sala-liu', 'sala-dts'],
    evidenceIds: ['genenv-nserc', 'genenv-phd-priority', 'genenv-principle', 'phd-provisional'],
  },
  { id: 'conversation', title: 'Conversation', citationIds: [], evidenceIds: [] },
] as const;

export function sceneById(id: string): Scene {
  return SCENES.find((s) => s.id === id) ?? SCENES[0]!;
}
