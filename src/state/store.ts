import { useSyncExternalStore } from 'react';

export interface AppState {
  sceneIndex: number;
  /** Scroll progress inside the active scene, 0..1, quantized. */
  sceneP: number;
  notesOpen: boolean;
  drawerOpen: boolean;
  legendOpen: boolean;
  chapterMapOpen: boolean;
  helpOpen: boolean;
  /** null → follow the media query; true/false → manual override. */
  reducedMotionOverride: boolean | null;
}

const initialState: AppState = {
  sceneIndex: 0,
  sceneP: 0,
  notesOpen: false,
  drawerOpen: false,
  legendOpen: false,
  chapterMapOpen: false,
  helpOpen: false,
  reducedMotionOverride: null,
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

export function subscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function useAppState<T>(selector: (s: AppState) => T): T {
  return useSyncExternalStore(subscribe, () => selector(state), () => selector(initialState));
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
  setState({ notesOpen: false, drawerOpen: false, legendOpen: false, chapterMapOpen: false, helpOpen: false });
}
