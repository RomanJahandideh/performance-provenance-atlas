import gsap from 'gsap';
import { WORLD } from '../data/atlas';
import { prefersReducedMotion } from '../state/store';

export interface CameraRect {
  cx: number;
  cy: number;
  w: number;
}

type Listener = (c: CameraRect, viewportAspect: number) => void;

/**
 * Imperative camera: tweens a {cx, cy, w} target and writes the SVG viewBox
 * directly, outside React renders. Every transition is interruptible — a new
 * target overwrites the running tween.
 */
class Camera {
  current: CameraRect = { cx: WORLD.w / 2, cy: WORLD.h / 2, w: WORLD.w + 200 };
  private svg: SVGSVGElement | null = null;
  private tween: gsap.core.Tween | null = null;
  private listeners = new Set<Listener>();
  aspect = 16 / 9;

  attach(svg: SVGSVGElement) {
    this.svg = svg;
    this.measure();
    this.apply();
  }

  measure() {
    this.aspect = window.innerWidth / Math.max(1, window.innerHeight);
    this.apply();
  }

  onChange(fn: Listener): () => void {
    this.listeners.add(fn);
    fn(this.current, this.aspect);
    return () => this.listeners.delete(fn);
  }

  private apply() {
    if (!this.svg) return;
    const w = this.current.w;
    const h = w / this.aspect;
    const x = this.current.cx - w / 2;
    const y = this.current.cy - h / 2;
    this.svg.setAttribute('viewBox', `${x.toFixed(1)} ${y.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`);
    for (const l of this.listeners) l(this.current, this.aspect);
  }

  /** Smoothly travel to a target; duration scales gently with distance. */
  flyTo(target: CameraRect) {
    this.tween?.kill();
    if (prefersReducedMotion()) {
      this.current = { ...target };
      this.apply();
      return;
    }
    const dist = Math.hypot(target.cx - this.current.cx, target.cy - this.current.cy);
    const zoomChange = Math.abs(Math.log(target.w / this.current.w));
    const dur = Math.min(1.6, 0.55 + dist / 4200 + zoomChange * 0.35);
    this.tween = gsap.to(this.current, {
      cx: target.cx,
      cy: target.cy,
      w: target.w,
      duration: dur,
      ease: 'power2.inOut',
      onUpdate: () => this.apply(),
    });
  }

  /** Immediate set (explore-mode pan/zoom). */
  set(target: Partial<CameraRect>) {
    this.tween?.kill();
    Object.assign(this.current, target);
    this.clamp();
    this.apply();
  }

  panBy(dxScreen: number, dyScreen: number, viewportWpx: number) {
    const unitsPerPx = this.current.w / Math.max(1, viewportWpx);
    this.set({ cx: this.current.cx - dxScreen * unitsPerPx, cy: this.current.cy - dyScreen * unitsPerPx });
  }

  zoomAt(factor: number, screenX: number, screenY: number, vw: number, vh: number) {
    const w0 = this.current.w;
    const w1 = Math.max(500, Math.min(WORLD.w * 1.6, w0 * factor));
    const h0 = w0 / this.aspect;
    // World point under the cursor stays fixed.
    const wx = this.current.cx - w0 / 2 + (screenX / vw) * w0;
    const wy = this.current.cy - h0 / 2 + (screenY / vh) * h0;
    const k = w1 / w0;
    this.set({ w: w1, cx: wx + (this.current.cx - wx) * k, cy: wy + (this.current.cy - wy) * k });
  }

  private clamp() {
    const margin = 600;
    this.current.cx = Math.max(-margin, Math.min(WORLD.w + margin, this.current.cx));
    this.current.cy = Math.max(-margin, Math.min(WORLD.h + margin, this.current.cy));
    this.current.w = Math.max(500, Math.min(WORLD.w * 1.6, this.current.w));
  }
}

export const camera = new Camera();
