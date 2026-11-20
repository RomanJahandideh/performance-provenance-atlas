import { STEPS } from '../data/steps';
import { getState, setState, anyPanelOpen } from '../state/store';
import { onSync, send } from './sync';

/**
 * One wheel gesture, swipe, or key press = one step (STEPS.length in total).
 * Each slide animates its own drawing on arrival. Every step change is also
 * sent to the presenter window (P), which can drive the deck back.
 */

export function goToStep(index: number) {
  const i = Math.max(0, Math.min(STEPS.length - 1, index));
  if (i === getState().stepIndex && window.location.hash === `#step-${i + 1}`) return;
  setState({ stepIndex: i });
  send({ type: 'step', index: i });
  const hash = `#step-${i + 1}`;
  if (window.location.hash !== hash) window.history.replaceState(null, '', hash);
}

export function nextStep() {
  goToStep(getState().stepIndex + 1);
}

export function prevStep() {
  goToStep(getState().stepIndex - 1);
}

// ── Input: one gesture = one sheet ─────────────────────────────────────────

let lastStepAt = 0;
let lastWheelAt = 0;
const MIN_GAP_MS = 650; // never two sheets closer than this
const QUIET_MS = 220; // a gesture ends after this much wheel silence

function onWheel(e: WheelEvent) {
  if (anyPanelOpen()) return;
  e.preventDefault();
  const now = performance.now();
  const newGesture = now - lastWheelAt > QUIET_MS;
  lastWheelAt = now;
  if (!newGesture || now - lastStepAt < MIN_GAP_MS) return;
  if (Math.abs(e.deltaY) < 4 && Math.abs(e.deltaX) < 4) return;
  lastStepAt = now;
  if ((Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX) > 0) nextStep();
  else prevStep();
}

let touchY: number | null = null;
function onTouchStart(e: TouchEvent) {
  touchY = e.touches[0]?.clientY ?? null;
}
function onTouchEnd(e: TouchEvent) {
  if (touchY === null || anyPanelOpen()) return;
  const dy = touchY - (e.changedTouches[0]?.clientY ?? touchY);
  touchY = null;
  if (Math.abs(dy) < 40) return;
  if (dy > 0) nextStep();
  else prevStep();
}

function stepFromHash(): number | null {
  const m = /^#step-(\d+)$/.exec(window.location.hash);
  return m ? Number(m[1]) - 1 : null;
}

function onHashChange() {
  const i = stepFromHash();
  if (i !== null && i !== getState().stepIndex) goToStep(i);
}

let offSync: (() => void) | null = null;

export function startStepper() {
  offSync = onSync((m) => {
    if (m.type === 'go') goToStep(m.index);
    if (m.type === 'hello') send({ type: 'step', index: getState().stepIndex });
  });
  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchend', onTouchEnd, { passive: true });
  window.addEventListener('hashchange', onHashChange);
  goToStep(stepFromHash() ?? 0);
}

export function stopStepper() {
  offSync?.();
  window.removeEventListener('wheel', onWheel);
  window.removeEventListener('touchstart', onTouchStart);
  window.removeEventListener('touchend', onTouchEnd);
  window.removeEventListener('hashchange', onHashChange);
}
