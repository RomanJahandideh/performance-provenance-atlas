import { SCENES } from '../data/scenes';
import { getState, prefersReducedMotion, setState } from '../state/store';
import { camera } from './camera';
import type { CameraKey } from '../data/types';

/**
 * The scroll engine: scrolling is the storyteller.
 * It maps window scroll to (sceneIndex, sceneP), drives the camera every frame
 * (with soft damping; instant under reduced motion), and never hijacks the wheel.
 */

interface SectionMetric {
  top: number;
  height: number;
}

let metrics: SectionMetric[] = [];
let raf = 0;
let running = false;

export function measureSections() {
  metrics = SCENES.map((s) => {
    const el = document.getElementById(`scene-${s.id}`);
    if (!el) return { top: 0, height: 1 };
    const r = el.getBoundingClientRect();
    return { top: r.top + window.scrollY, height: r.height };
  });
}

/** Current scene + progress from scroll position. */
function locate(): { index: number; p: number } {
  const y = window.scrollY;
  const vh = window.innerHeight;
  for (let i = metrics.length - 1; i >= 0; i--) {
    const m = metrics[i]!;
    if (y >= m.top - vh * 0.5) {
      // progress: section scrolls from its top hitting viewport top to its bottom leaving
      const span = Math.max(1, m.height - vh);
      const p = Math.max(0, Math.min(1, (y - m.top) / span));
      return { index: i, p };
    }
  }
  return { index: 0, p: 0 };
}

function cameraAt(keys: readonly CameraKey[], p: number): { x: number; y: number; w: number } {
  if (keys.length === 1) return keys[0]!;
  let a = keys[0]!;
  let b = keys[keys.length - 1]!;
  for (let i = 0; i < keys.length - 1; i++) {
    if (p >= keys[i]!.p && p <= keys[i + 1]!.p) {
      a = keys[i]!;
      b = keys[i + 1]!;
      break;
    }
  }
  if (p <= a.p) return a;
  if (p >= b.p) return b;
  const t = (p - a.p) / Math.max(1e-6, b.p - a.p);
  const e = t * t * (3 - 2 * t); // smoothstep
  return {
    x: a.x + (b.x - a.x) * e,
    y: a.y + (b.y - a.y) * e,
    w: Math.exp(Math.log(a.w) + (Math.log(b.w) - Math.log(a.w)) * e),
  };
}

/** Camera target for the global scroll state, blending across scene boundaries. */
function targetCamera(index: number, p: number): { x: number; y: number; w: number } {
  const scene = SCENES[index]!;
  const cur = cameraAt(scene.camera, p);
  const next = SCENES[index + 1];
  if (next && p > 0.82) {
    // glide toward the next scene's opening frame over the section's tail
    const t = (p - 0.82) / 0.18;
    const e = t * t * (3 - 2 * t);
    const nx = cameraAt(next.camera, 0);
    return {
      x: cur.x + (nx.x - cur.x) * e,
      y: cur.y + (nx.y - cur.y) * e,
      w: Math.exp(Math.log(cur.w) + (Math.log(nx.w) - Math.log(cur.w)) * e),
    };
  }
  return cur;
}

let lastT = 0;

function tick(t: number) {
  raf = requestAnimationFrame(tick);
  const dt = Math.min(0.05, (t - lastT) / 1000) || 0.016;
  lastT = t;

  const { index, p } = locate();
  const q = Math.round(p * 200) / 200; // quantize for React updates
  const s = getState();
  if (s.sceneIndex !== index || s.sceneP !== q) setState({ sceneIndex: index, sceneP: q });

  const tgt = targetCamera(index, p);
  if (prefersReducedMotion()) {
    camera.set(tgt);
  } else {
    const k = Math.min(1, dt * 7);
    camera.setRaw({
      cx: camera.current.cx + (tgt.x - camera.current.cx) * k,
      cy: camera.current.cy + (tgt.y - camera.current.cy) * k,
      w: camera.current.w + (tgt.w - camera.current.w) * k,
    });
  }
}

export function startScrollEngine() {
  if (running) return;
  running = true;
  measureSections();
  window.addEventListener('resize', measureSections);
  raf = requestAnimationFrame(tick);
}

export function stopScrollEngine() {
  running = false;
  window.removeEventListener('resize', measureSections);
  cancelAnimationFrame(raf);
}

// ── Navigation helpers (keyboard / rail / hash) ────────────────────────────

export function scrollToScene(index: number, atP = 0.02) {
  const m = metrics[index];
  if (!m) return;
  const vh = window.innerHeight;
  const y = m.top + (m.height - vh) * atP;
  window.scrollTo({ top: y, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

export function scrollStep(dir: 1 | -1) {
  window.scrollBy({ top: dir * window.innerHeight * 0.72, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}
