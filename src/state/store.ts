import { useSyncExternalStore } from 'react';
import { SCENES } from '../data/scenes';
import type { ProjectId } from '../data/types';

export type Mode = 'present' | 'explore';
export type ZlaCase = 'supported' | 'laneway' | 'site';

export interface IxState {
  /** PMG: highlighted constraint row (−1 = none). */
  pmgActive: number;
  /** VCM: 0 = flat cap … 1 = floor-by-floor (continuous for the slider). */
  vcmMethod: number;
  /** VCM: rotation index 0..6 (7 orientations, 0°–90°). */
  vcmRot: number;
  /** ZLA: which demonstration case is shown. */
  zlaCase: ZlaCase;
  /** PhD: which provenance link is inspected (−1 = none). */
  phdLink: number;
}

export interface AppState {
  sceneIndex: number;
  stepIndex: number;
  mode: Mode;
  notesOpen: boolean;
  drawerOpen: boolean;
  legendOpen: boolean;
  chapterMapOpen: boolean;
  helpOpen: boolean;
  /** null → follow the media query; true/false → manual override. */
  reducedMotionOverride: boolean | null;
  timerRunning: boolean;
  /** Accumulated elapsed ms while paused + epoch start while running. */
  timerBaseMs: number;
  timerStartedAt: number | null;
  sheetParcel: ProjectId | null;
  sheetAward: string | null;
  /** Explore-mode status filter (empty set = show everything). */
  statusFilter: string[];
  ix: IxState;
}

const initialState: AppState = {
  sceneIndex: 0,
  stepIndex: 0,
  mode: 'present',
  notesOpen: false,
  drawerOpen: false,
  legendOpen: false,
  chapterMapOpen: false,
  helpOpen: false,
  reducedMotionOverride: null,
  timerRunning: false,
  timerBaseMs: 0,
  timerStartedAt: null,
  sheetParcel: null,
  sheetAward: null,
  statusFilter: [],
  ix: { pmgActive: -1, vcmMethod: 0, vcmRot: 0, zlaCase: 'supported', phdLink: -1 },
};

let state: AppState = initialState;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

export function getState(): AppState {
  return state;
}

export function setState(patch: Partial<AppState>) {
  state = { ...state, ...patch };
  emit();
}

export function setIx(patch: Partial<IxState>) {
  state = { ...state, ix: { ...state.ix, ...patch } };
  emit();
}

export function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function useAppState<T>(selector: (s: AppState) => T): T {
  return useSyncExternalStore(subscribe, () => selector(state), () => selector(initialState));
}

// ── Navigation ──────────────────────────────────────────────────────────────

export function sceneCount(): number {
  return SCENES.length;
}

export function goToScene(index: number, opts: { scroll?: boolean } = {}) {
  const clamped = Math.max(0, Math.min(SCENES.length - 1, index));
  if (clamped === state.sceneIndex) return;
  // Start the timer on the first forward navigation out of the opening scene.
  const timerPatch =
    !state.timerRunning && state.timerStartedAt === null && clamped > 0 && state.mode === 'present'
      ? { timerRunning: true, timerStartedAt: Date.now() }
      : {};
  setState({ sceneIndex: clamped, stepIndex: 0, ...timerPatch });
  if (opts.scroll !== false) scrollToScene(clamped);
}

export function scrollToScene(index: number) {
  const el = document.getElementById(`scene-${SCENES[index]?.id ?? ''}`);
  if (el) el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
}

/** Advance one step inside the scene; past the last step, go to the next scene. */
export function advance() {
  const scene = SCENES[state.sceneIndex];
  if (!scene) return;
  if (state.stepIndex < scene.steps.length - 1) {
    setState({ stepIndex: state.stepIndex + 1 });
  } else {
    goToScene(state.sceneIndex + 1);
  }
}

export function retreat() {
  if (state.stepIndex > 0) {
    setState({ stepIndex: state.stepIndex - 1 });
  } else if (state.sceneIndex > 0) {
    const prev = SCENES[state.sceneIndex - 1];
    setState({ sceneIndex: state.sceneIndex - 1, stepIndex: Math.max(0, (prev?.steps.length ?? 1) - 1) });
    scrollToScene(state.sceneIndex);
  }
}

/** Scene entered via scrolling (IntersectionObserver) — no re-scroll. */
export function sceneInView(index: number) {
  if (index !== state.sceneIndex) {
    const timerPatch =
      !state.timerRunning && state.timerStartedAt === null && index > 0 && state.mode === 'present'
        ? { timerRunning: true, timerStartedAt: Date.now() }
        : {};
    setState({ sceneIndex: index, stepIndex: 0, ...timerPatch });
  }
}

// ── Timer ───────────────────────────────────────────────────────────────────

export function timerElapsedMs(): number {
  return state.timerBaseMs + (state.timerRunning && state.timerStartedAt ? Date.now() - state.timerStartedAt : 0);
}

export function toggleTimer() {
  if (state.timerRunning) {
    setState({ timerRunning: false, timerBaseMs: timerElapsedMs(), timerStartedAt: null });
  } else {
    setState({ timerRunning: true, timerStartedAt: Date.now() });
  }
}

export function resetPresentation() {
  setState({
    sceneIndex: 0,
    stepIndex: 0,
    timerRunning: false,
    timerBaseMs: 0,
    timerStartedAt: null,
    sheetParcel: null,
  });
  scrollToScene(0);
}

// ── Reduced motion ──────────────────────────────────────────────────────────

const rmQuery = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

export function prefersReducedMotion(): boolean {
  if (state.reducedMotionOverride !== null) return state.reducedMotionOverride;
  return rmQuery?.matches ?? false;
}

rmQuery?.addEventListener?.('change', emit);

export function toggleReducedMotion() {
  setState({ reducedMotionOverride: !prefersReducedMotion() });
}

// ── Panels ──────────────────────────────────────────────────────────────────

export function closeAllPanels() {
  setState({
    notesOpen: false,
    drawerOpen: false,
    legendOpen: false,
    chapterMapOpen: false,
    helpOpen: false,
    sheetParcel: null,
    sheetAward: null,
  });
}

export function toggleMode() {
  const next: Mode = state.mode === 'present' ? 'explore' : 'present';
  setState({ mode: next, sheetParcel: null });
}
