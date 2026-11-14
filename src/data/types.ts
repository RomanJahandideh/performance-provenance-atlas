/** Shared content types for the Parametric Research Atlas. */

/** Evidence-state drawing language (see MAPPING_LANGUAGE.md). */
export type EvidenceStatus =
  | 'published' // solid geometry on an evidence plinth, DOI marker
  | 'accepted' // solid geometry on a plinth; DOI registered but may not be active yet
  | 'under-revision' // semi-transparent volume, diagonal hatch
  | 'verified-computation' // solid white/cyan geometry: executed + checked deterministic computation
  | 'implemented' // wireframe mass with control points (working prototype)
  | 'reported' // value stated in portfolio/README but not independently re-derived here
  | 'placeholder' // orange hatch: assumption, simplified proxy, placeholder value
  | 'not-executed' // grey dashed: written but not executed
  | 'not-confirmed' // red marker: hypothesis tested and not confirmed in its strict form
  | 'proposed' // dotted yellow footprint: proposed doctoral work
  | 'provisional' // dashed connector + question marker: to be refined with the supervisor
  | 'external-funded'; // distinct boundary + attribution: GenEnv / third-party research

export type ProjectId =
  | 'pmg' // Parametric Massing Generator
  | 'zla' // Zoning Literacy Assistant
  | 'vcm' // Vancouver View Corridor Massing
  | 'ema' // Environmental Massing Agents
  | 'ecaade'
  | 'iss'
  | 'bioterrarium'
  | 'phd';

/** One displayed research claim. Every number shown in the UI must come from one of these. */
export interface EvidenceRecord {
  id: string;
  project: ProjectId | 'genenv' | 'cv';
  claim: string;
  /** Machine-usable value where one exists (for drawing geometry from data). */
  value?: number | string;
  unit?: string;
  status: EvidenceStatus;
  /** Where the claim comes from (named source, not a URL dump). */
  source: string;
  /** How the value was produced (method), when that matters for honesty. */
  method?: string;
  /** The honest limitation that must stay attached to the claim. */
  limitation?: string;
  /** Short label used on the map/panels. */
  presentationLabel: string;
}

export interface Citation {
  id: string;
  authors: string;
  title: string;
  venue: string;
  year: string;
  url: string;
  doi?: string;
  /** How this source supports the presentation. */
  supports: string;
  /** Verification note shown in the source drawer. */
  verification: string;
}

export interface ProjectLink {
  label: 'GitHub' | 'Portfolio' | 'Live system' | 'Paper' | 'Video';
  url: string;
  verified: boolean;
}

/** A research parcel drawn on the atlas. */
export interface ResearchParcel {
  id: ProjectId;
  title: string;
  kicker: string;
  district: 'foundations' | 'perception-embodied' | 'computational' | 'phd' | 'genenv';
  /** Atlas semantic axes (see MAPPING_LANGUAGE.md). x: spatial scale 1–5, y: computational agency 1–5. */
  spatialScale: number;
  computationalAgency: number;
  /** 1–5: conceptual → implemented → computationally verified → evaluated with participants → published/accepted. */
  evidenceMaturity: number;
  status: EvidenceStatus;
  date: string;
  researchQuestion: string;
  inputs: string[];
  process: string[];
  evidenceIds: string[];
  limitations: string[];
  genenvConnection: string;
  links: ProjectLink[];
  citationIds: string[];
  image?: string;
  imageAlt?: string;
  /** World-space position override (centre), computed from axes by default. */
  pos?: { x: number; y: number };
}

/** One large typographic stat shown on the story layer (no boxes). */
export interface StoryStat {
  value: string;
  label: string;
  color?: 'yellow' | 'cyan' | 'orange' | 'coral' | 'red' | 'ink';
}

/** A story block: fades in/out over a scroll-progress window. Content must fit without scrolling. */
export interface StoryBlock {
  id: string;
  /** Visible while scene progress is inside [p0, p1]. */
  p0: number;
  p1: number;
  side: 'left' | 'right' | 'center' | 'bottom';
  kicker?: string;
  title?: string;
  lines?: string[];
  stats?: StoryStat[];
  /** One orange honesty line, prefixed ▨. */
  caveat?: string;
  image?: { src: string; alt: string; credit?: string };
  links?: { label: string; url: string }[];
}

/** Camera keyframe inside a scene (p = scene progress 0..1). */
export interface CameraKey {
  p: number;
  x: number;
  y: number;
  w: number;
}

export interface Scene {
  id: string;
  index: number;
  chapter: string;
  title: string;
  /** Section height driving how long the scene's story lasts. */
  lengthVh: number;
  /** Camera keyframes over scene progress (first at p=0, last ≤1). */
  camera: CameraKey[];
  blocks: StoryBlock[];
  /** Spoken script (presenter notes, N key). */
  script: string[];
  appendix?: boolean;
  citationIds: string[];
  evidenceIds: string[];
}
