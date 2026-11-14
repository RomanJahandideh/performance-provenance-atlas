import { WORLD } from '../data/atlas';

export interface CameraRect {
  cx: number;
  cy: number;
  w: number;
}

/**
 * Imperative camera: the scroll engine writes it every frame and it sets the
 * SVG viewBox directly, outside React renders.
 */
class Camera {
  current: CameraRect = { cx: WORLD.w / 2, cy: WORLD.h / 2, w: WORLD.w + 200 };
  private svg: SVGSVGElement | null = null;
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

  private apply() {
    if (!this.svg) return;
    const w = this.current.w;
    const h = w / this.aspect;
    const x = this.current.cx - w / 2;
    const y = this.current.cy - h / 2;
    this.svg.setAttribute('viewBox', `${x.toFixed(1)} ${y.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`);
  }

  /** Immediate set from a {x,y,w} target. */
  set(target: { x: number; y: number; w: number }) {
    this.current.cx = target.x;
    this.current.cy = target.y;
    this.current.w = target.w;
    this.clamp();
    this.apply();
  }

  /** Immediate set with raw rect fields (scroll-engine damping). */
  setRaw(target: Partial<CameraRect>) {
    Object.assign(this.current, target);
    this.clamp();
    this.apply();
  }

  private clamp() {
    const margin = 600;
    this.current.cx = Math.max(-margin, Math.min(WORLD.w + margin, this.current.cx));
    this.current.cy = Math.max(-margin, Math.min(WORLD.h + margin, this.current.cy));
    this.current.w = Math.max(500, Math.min(WORLD.w * 1.6, this.current.w));
  }
}

export const camera = new Camera();
