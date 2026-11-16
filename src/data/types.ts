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

export type Tone = 'yellow' | 'cyan' | 'orange' | 'coral' | 'red' | 'ink';

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
  | 'provenance';

/**
 * One panel on a sheet. Sheets are a 12 × 6 grid; `col` / `row` are CSS grid
 * lines (e.g. '1 / 5'). Panels on one sheet never share cells.
 */
export interface Panel {
  col: string;
  row: string;
  kind: 'text' | 'image' | 'diagram' | 'facts' | 'list' | 'card';
  /** Mono header strip, like a drawing-sheet label. */
  label?: string;
  // text
  kicker?: string;
  title?: string;
  lines?: string[];
  caveat?: string;
  links?: { label: string; url: string }[];
  // image
  src?: string;
  alt?: string;
  fit?: 'cover' | 'contain';
  credit?: string;
  // diagram
  diagram?: DiagramId;
  // facts
  facts?: { label: string; value: string; tone?: Tone; num?: boolean }[];
  // list
  items?: { key: string; text: string; tone?: Tone }[];
  // card
  note?: string;
}

/** A region of the board in grid lines, e.g. { col: '1 / 7', row: '1 / 4' }. */
export interface Focus {
  col: string;
  row: string;
}

/** One scroll inside a sheet: what the side column says and where the board zooms. */
export interface SheetStep {
  /** Omit to show the whole board. */
  focus?: Focus;
  title: string;
  lines?: string[];
  facts?: { label: string; value: string; tone?: Tone }[];
  caveat?: string;
  links?: { label: string; url: string }[];
  /** Spoken notes (N key). */
  notes: string[];
}

/** A presentation sheet: one topic, one board, several scroll steps. */
export interface Sheet {
  id: string;
  /** Chapter whose sources the drawer shows. */
  scene: string;
  /** Section label shown above the title, e.g. "Education". */
  section: string;
  title: string;
  cols: number;
  rows: number;
  panels: Panel[];
  steps: SheetStep[];
}

/** One scroll position, flattened across all sheets. */
export interface Step {
  id: string;
  sheetIndex: number;
  stepInSheet: number;
  scene: string;
  title: string;
  notes: string[];
}
