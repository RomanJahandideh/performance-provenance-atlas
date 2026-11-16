import { STEPS } from '../data/steps';
import { SCENES } from '../data/scenes';
import { getState, prefersReducedMotion, setState, anyPanelOpen } from '../state/store';
import { camera } from './camera';

/**
 * Exactly 20 steps. One wheel gesture, swipe, or key press = one step.
 * Arriving at a step flies the camera and plays that step's drawing
 * (scene progress p[0] → p[1]) — no further scrolling needed.
 */

const PLAY_SECONDS = 3.2;
let raf = 0;

function sceneIndexOf(id: string): number {
  const i = SCENES.findIndex((s) => s.id === id);
  return i < 0 ? 0 : i;
}

function play(from: number, to: number) {
  cancelAnimationFrame(raf);
  if (prefersReducedMotion() || from === to) {
    setState({ sceneP: to });
    return;
  }
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / (PLAY_SECONDS * 1000));
    // ease-out so the drawing settles calmly
    const e = 1 - Math.pow(1 - t, 2);
    setState({ sceneP: Math.round((from + (to - from) * e) * 1000) / 1000 });
    if (t < 1) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
}

export function goToStep(index: number, opts: { instant?: boolean } = {}) {
  const i = Math.max(0, Math.min(STEPS.length - 1, index));
  const step = STEPS[i]!;
  setState({ stepIndex: i, sceneIndex: sceneIndexOf(step.scene), sceneP: step.p[0] });
  camera.flyTo(step.camera, opts.instant);
  play(step.p[0], step.p[1]);
  const hash = `#step-${i + 1}`;
  if (window.location.hash !== hash) window.history.replaceState(null, '', hash);
}

export function nextStep() {
  goToStep(getState().stepIndex + 1);
}

export function prevStep() {
  goToStep(getState().stepIndex - 1);
}

// ── Input: one gesture = one step ──────────────────────────────────────────

let lastStepAt = 0;
let lastWheelAt = 0;
const MIN_GAP_MS = 550; // never two steps closer than this
const QUIET_MS = 200; // a gesture ends after this much wheel silence

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

export function startStepper() {
  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('touchstart', onTouchStart, { passive: true });
  window.addEventListener('touchend', onTouchEnd, { passive: true });
  window.addEventListener('hashchange', onHashChange);
  goToStep(stepFromHash() ?? 0, { instant: true });
}

export function stopStepper() {
  window.removeEventListener('wheel', onWheel);
  window.removeEventListener('touchstart', onTouchStart);
  window.removeEventListener('touchend', onTouchEnd);
  window.removeEventListener('hashchange', onHashChange);
  cancelAnimationFrame(raf);
}
