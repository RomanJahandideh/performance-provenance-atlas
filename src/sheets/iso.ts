/** Tiny isometric projection for architectural axonometric drawings. */

export interface P {
  x: number;
  y: number;
}

const COS = 0.866;
const SIN = 0.5;

/** Project local iso coords (plan x→right-down, plan y→left-down, z→up) to drawing space. */
export function iso(x: number, y: number, z = 0): P {
  return { x: (x - y) * COS, y: (x + y) * SIN - z };
}

export function pts(list: P[]): string {
  return list.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
}

/** The three visible faces of an iso box with footprint w×d and height h, base at local origin. */
export function isoBoxFaces(w: number, d: number, h: number) {
  const a = iso(0, 0, 0);
  const b = iso(w, 0, 0);
  const c = iso(w, d, 0);
  const dd = iso(0, d, 0);
  const A = iso(0, 0, h);
  const B = iso(w, 0, h);
  const C = iso(w, d, h);
  const D = iso(0, d, h);
  return {
    top: pts([A, B, C, D]),
    left: pts([dd, c, C, D]), // front-left face (plan +y side)
    right: pts([b, c, C, B]), // front-right face (plan +x side)
    base: pts([a, b, c, dd]),
    corners: { a, b, c, d: dd, A, B, C, D },
  };
}

/** Iso footprint polygon (flat). */
export function isoRect(w: number, d: number, z = 0): string {
  return pts([iso(0, 0, z), iso(w, 0, z), iso(w, d, z), iso(0, d, z)]);
}
