import { useSyncExternalStore } from 'react';

export interface AppState {
  /** Current sheet, 0..19. */
  stepIndex: number;
  notesOpen: boolean;
  drawerOpen: boolean;
  chapterMapOpen: boolean;
  helpOpen: boolean;
  /** null → follow the media query; true/false → manual override. */
  reducedMotionOverride: boolean | null;
}

const initialState: AppState = {
  stepIndex: 0,
  notesOpen: false,
  drawerOpen: false,
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

const rmQuery = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

export function prefersReducedMotion(): boolean {
  if (state.reducedMotionOverride !== null) return state.reducedMotionOverride;
  return rmQuery?.matches ?? false;
}

rmQuery?.addEventListener?.('change', emit);

export function toggleReducedMotion() {
  setState({ reducedMotionOverride: !prefersReducedMotion() });
}

export function closeAllPanels() {
  setState({ notesOpen: false, drawerOpen: false, chapterMapOpen: false, helpOpen: false });
}

export function anyPanelOpen(): boolean {
  return state.notesOpen || state.drawerOpen || state.chapterMapOpen || state.helpOpen;
}
