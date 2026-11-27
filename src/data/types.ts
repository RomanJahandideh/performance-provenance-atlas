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

export type Tone = 'yellow' | 'cyan' | 'orange' | 'coral' | 'red' | 'ink' | 'proposal';

export type DiagramId =
  | 'site'
  | 'depth'
  | 'pipeline'
  | 'notcovered'
  | 'sitecheck'
  | 'constraints'
  | 'envelope'
  | 'block'
  | 'corridor'
  | 'rotation'
  | 'agents'
  | 'seeds'
  | 'pareto'
  | 'chain'
  | 'provenance'
  | 'spheres'
  | 'colours'
  | 'journey'
  | 'atlas-open'
  | 'atlas-full'
  | 'capability'
  | 'roles'
  | 'gap'
  | 'architecture'
  | 'scenario'
  | 'rqmap'
  | 'route'
  | 'confluence'
  | 'soa'
  | 'loop'
  | 'branches'
  | 'platform'
  | 'agenda'
  | 'colophon'
  | 'zlaflow'
  | 'pmgflow'
  | 'redteam'
  | 'externality'
  | 'living'
  | 'dir1'
  | 'dir2'
  | 'dir3';

/**
 * Slide compositions. Each is a fixed arrangement of horizontal bands and
 * planes; media are always shown whole, never cropped or upscaled.
 */
export type LayoutId = 'title' | 'cover' |'cantilever' | 'statement' | 'band' | 'gallery' | 'figure' | 'figure-left' | 'columns' | 'questions' | 'references' | 'system';

/** One image or vector diagram on a slide. */
export interface Media {
  src?: string;
  diagram?: DiagramId;
  alt?: string;
  caption?: string;
  credit?: string;
}

export interface Fact {
  label: string;
  value: string;
  tone?: Tone;
}

/** One scroll: one complete slide. */
export interface Slide {
  id: string;
  /** Story chapter, shown in the bottom navigation and in the transition curtain. */
  chapter: string;
  /** Chapter whose sources the drawer shows. */
  scene: string;
  layout: LayoutId;
  kicker?: string;
  title: string;
  lines?: string[];
  /** A highlighted line under the text, with its own small label. */
  callout?: { label: string; text: string };
  /** The shared five-part reading of each research project (question, approach, evidence, limit, lesson). */
  project?: { problem: string; built: string; evidence: string; limit: string; lesson: string };
  /** What the slide shows, for the generated script (not displayed). */
  purpose?: string;
  facts?: Fact[];
  caveat?: string;
  links?: { label: string; url: string }[];
  media?: Media[];
  columns?: { head: string; title: string; text: string; media?: Media }[];
  questions?: string[];
  /** Spoken notes (N key). Defaults to the on-screen lines. */
  notes?: string[];
  /** In-slide citations (ids in citations.ts), shown author-date; `refsSee` prefixes "see" for related, not supporting, work. */
  refs?: string[];
  refsSee?: boolean;
  /** For layout 'system': the step id whose system diagram this page shows. */
  system?: string;
  /** Presenter cue: recommended time in seconds (including any demonstration), what to show, what to skip. */
  cue?: { sec: number; demo: string; skip: string };
}

/** One scroll position. */
export interface Step {
  id: string;
  scene: string;
  title: string;
  notes: string[];
}
