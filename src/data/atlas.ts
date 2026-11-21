/**
 * The research map drawn on the first and last steps. A plan, read left to
 * right: territories sized by their role in the argument (the proposed PhD
 * territory is the largest), parcels drawn by evidence status, one route
 * through Roman's work, and GenEnv's projects in a separate, attributed
 * territory. The zooming world map of earlier versions was removed at
 * Roman's request; this file now holds only this plan's data.
 */
import type { EvidenceStatus } from './types';

export interface Territory {
  id: string;
  name: string;
  sub: string;
  x: number;
  w: number;
  parcels: { label: string; status: EvidenceStatus; w: number }[];
}

/** viewBox 1600 × 560. Territories share one ground line; x and w in viewBox units. */
export const TERRITORIES: readonly Territory[] = [
  {
    id: 'form',
    name: 'Form',
    sub: 'Tabriz',
    x: 40,
    w: 150,
    parcels: [{ label: 'Zangar', status: 'implemented', w: 70 }],
  },
  {
    id: 'systems',
    name: 'Systems',
    sub: 'Istanbul',
    x: 210,
    w: 150,
    parcels: [{ label: 'Büyükada', status: 'implemented', w: 70 }],
  },
  {
    id: 'perception',
    name: 'People and representation',
    sub: 'eCAADe · ISS · BioTerrarium',
    x: 380,
    w: 250,
    parcels: [
      { label: 'eCAADe', status: 'published', w: 60 },
      { label: 'ISS', status: 'accepted', w: 60 },
      { label: 'Bio', status: 'under-revision', w: 60 },
    ],
  },
  {
    id: 'prototypes',
    name: 'Research projects',
    sub: 'rules · geometry · constraint · critique',
    x: 650,
    w: 300,
    parcels: [
      { label: 'ZLA', status: 'verified-computation', w: 52 },
      { label: 'PMG', status: 'verified-computation', w: 52 },
      { label: 'VCM', status: 'verified-computation', w: 52 },
      { label: 'EMA', status: 'verified-computation', w: 52 },
    ],
  },
  {
    id: 'phd',
    name: 'Proposed PhD',
    sub: 'three possible directions · for discussion',
    x: 980,
    w: 580,
    parcels: [],
  },
] as const;

/** Inside the proposed territory, resolved on the closing step. */
export const PHD_DISTRICTS = ['Evidence', 'Agency', 'Deliberation'] as const;

/** The wider field, bounded separately from Roman's projects (others' work, cited in the source drawer). */
export const GENENV_TERRITORY = {
  label: 'Related field · selected precedents, not my work',
  projects: ['Language to parametric operations', 'Agentic simulation', 'Text-to-CAD', 'Mixed-initiative co-creation', 'Bidirectional design environments'],
} as const;
