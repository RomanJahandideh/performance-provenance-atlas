/** Shared content types for the Parametric Research Atlas. */

/** Evidence-state drawing language (see MAPPING_LANGUAGE.md). */
export type EvidenceStatus =
  | 'published'
  | 'accepted'
  | 'under-revision'
  | 'verified-computation'
  | 'implemented'
  | 'reported'
  | 'placeholder'
  | 'not-executed'
  | 'not-confirmed'
  | 'proposed'
  | 'provisional'
  | 'external-funded';

export type ProjectId = 'pmg' | 'zla' | 'vcm' | 'ema' | 'ecaade' | 'iss' | 'bioterrarium' | 'phd';

/** One displayed research claim. */
export interface EvidenceRecord {
  id: string;
  project: ProjectId | 'genenv' | 'cv';
  claim: string;
  value?: number | string;
  unit?: string;
  status: EvidenceStatus;
  source: string;
  method?: string;
  limitation?: string;
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
  supports: string;
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
  spatialScale: number;
  computationalAgency: number;
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
  pos?: { x: number; y: number };
}

/**
 * A scene is a chapter of the map: it owns the map's drawings (vignettes read
 * the active scene id + its progress) and the sources shown in the drawer.
 */
export interface Scene {
  id: string;
  title: string;
  citationIds: string[];
  evidenceIds: string[];
}

/** One large typographic stat (no boxes). */
export interface StoryStat {
  value: string;
  label: string;
  color?: 'yellow' | 'cyan' | 'orange' | 'coral' | 'red' | 'ink';
}

export interface StepImage {
  src: string;
  alt: string;
  /** 'cover' fills its frame (photos); 'contain' shows the whole board on dark. */
  fit?: 'cover' | 'contain';
  caption?: string;
}

/**
 * One of exactly 20 presentation steps. One scroll / key / swipe = one step.
 * Each step plays its own animation (scene progress p[0] → p[1]) on arrival.
 */
export interface Step {
  id: string;
  /** Map chapter whose drawings and sources this step uses. */
  scene: string;
  kind: 'map' | 'images';
  /** Scene progress animated on arrival. */
  p: [number, number];
  /** Map camera target (world units). */
  camera: { x: number; y: number; w: number };
  layout?: 'single' | 'pair' | 'trio' | 'board';
  images?: StepImage[];
  kicker?: string;
  title?: string;
  lines?: string[];
  stats?: StoryStat[];
  caveat?: string;
  links?: { label: string; url: string }[];
  /** Where the text sits on map steps. */
  textAt?: 'bottom' | 'center' | 'left';
  /** Spoken notes for this step (N key). */
  notes: string[];
}
