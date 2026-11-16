import gsap from 'gsap';
import { WORLD } from '../data/atlas';
import { prefersReducedMotion } from '../state/store';

export interface CameraRect {
  cx: number;
  cy: number;
  w: number;
}

/** Imperative camera: tweens a target and writes the SVG viewBox directly. */
class Camera {
  current: CameraRect = { cx: WORLD.w / 2, cy: WORLD.h / 2, w: WORLD.w + 200 };
  private svg: SVGSVGElement | null = null;
  private tween: gsap.core.Tween | null = null;
  aspect = 16 / 9;

  attach(svg: SVGSVGElement) {
    this.svg = svg;
    this.measure();
  }

  measure() {
    this.aspect = window.innerWidth / Math.max(1, window.innerHeight);
    this.apply();
  }

  private apply() {
    if (!this.svg) return;
    const w = this.current.w;
    const h = w / this.aspect;
    this.svg.setAttribute(
      'viewBox',
      `${(this.current.cx - w / 2).toFixed(1)} ${(this.current.cy - h / 2).toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`,
    );
  }

  /** Glide to a target; any new target interrupts the running glide. */
  flyTo(target: { x: number; y: number; w: number }, instant = false) {
    this.tween?.kill();
    if (instant || prefersReducedMotion()) {
      this.current = { cx: target.x, cy: target.y, w: target.w };
      this.apply();
      return;
    }
    const dist = Math.hypot(target.x - this.current.cx, target.y - this.current.cy);
    const zoom = Math.abs(Math.log(target.w / this.current.w));
    this.tween = gsap.to(this.current, {
      cx: target.x,
      cy: target.y,
      w: target.w,
      duration: Math.min(1.4, 0.6 + dist / 5000 + zoom * 0.3),
      ease: 'power2.inOut',
      onUpdate: () => this.apply(),
    });
  }
}

export const camera = new Camera();
