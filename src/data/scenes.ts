import type { Scene } from './types';

/**
 * Map chapters. The 20 presentation steps (src/data/steps.ts) point at these;
 * vignettes draw only while their chapter is active.
 */
export const SCENES: readonly Scene[] = [
  { id: 'opening', title: 'Performance Provenance', citationIds: [], evidenceIds: [] },
  { id: 'trajectory', title: 'Research Trajectory', citationIds: [], evidenceIds: [] },
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
  { id: 'synthesis', title: 'One Connected Path', citationIds: [], evidenceIds: [] },
  {
    id: 'phd',
    title: 'Proposed Direction: Performance Provenance',
    citationIds: ['genenv-hacd', 'xu-chi2025', 'compositional-chi2025', 'earlyarchi-chi2026', 'energai-2025'],
    evidenceIds: [],
  },
  {
    id: 'genenv',
    title: 'Why GenEnv',
    citationIds: ['nserc-939', 'genenv-home', 'genenv-hacd', 'sala-liu', 'sala-dts', 'lacf-sandbox'],
    evidenceIds: ['genenv-nserc', 'genenv-principle'],
  },
  { id: 'conversation', title: 'Conversation', citationIds: [], evidenceIds: [] },
] as const;

export function sceneById(id: string): Scene {
  return SCENES.find((s) => s.id === id) ?? SCENES[0]!;
}
