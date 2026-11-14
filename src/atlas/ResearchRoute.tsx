import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ROUTE_POINTS } from '../data/trajectory';
import { useAppState, prefersReducedMotion } from '../state/store';

/** How far along the route each scene reaches (count of route points). */
const PROGRESS: Record<string, number> = {
  opening: 13,
  trajectory: 3,
  foundation: 6,
  pmg: 8,
  zla: 9,
  vcm: 10,
  ema: 11,
  synthesis: 11,
  phd: 12,
  genenv: 13,
  conversation: 13,
  'appendix-links': 13,
};

import { SCENES } from '../data/scenes';

function pathFrom(points: readonly { x: number; y: number }[]): string {
  if (points.length === 0) return '';
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ');
}

export function ResearchRoute() {
  const sceneIndex = useAppState((s) => s.sceneIndex);
  const stepIndex = useAppState((s) => s.stepIndex);
  const mode = useAppState((s) => s.mode);
  const scene = SCENES[sceneIndex] ?? SCENES[0]!;
  const activeRef = useRef<SVGPathElement>(null);

  let n = PROGRESS[scene.id] ?? 13;
  // The opening draws the route in on its second step.
  if (scene.id === 'opening' && stepIndex < 1 && mode === 'present') n = 0;
  const active = ROUTE_POINTS.slice(0, Math.max(0, n));
  const currentIdx = Math.max(0, n - 1);

  useEffect(() => {
    const el = activeRef.current;
    if (!el || prefersReducedMotion()) return;
    const len = el.getTotalLength();
    gsap.fromTo(el, { strokeDasharray: len, strokeDashoffset: len * 0.25 }, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.out' });
  }, [n]);

  return (
    <g aria-hidden>
      <path d={pathFrom(ROUTE_POINTS)} fill="none" className="route-base" strokeWidth={3} strokeDasharray="1 14" strokeLinecap="round" />
      {n > 1 && <path ref={activeRef} d={pathFrom(active)} fill="none" className="route-active" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />}
      {ROUTE_POINTS.map((p, i) => (
        <g key={i} transform={`translate(${p.x},${p.y})`}>
          <circle r={i === currentIdx ? 11 : 7} className={`route-node ${i < n ? 'route-node--done' : ''}`} strokeWidth={2} />
          {i === currentIdx && n > 0 && (
            <circle r={20} fill="none" stroke="var(--yellow)" strokeWidth={1.4} style={{ animation: 'haloPulse 2.4s ease-in-out infinite' }} />
          )}
          {p.label && (
            <text x={16} y={-12} fontSize={13} className="map-label" fill={i < n ? 'var(--yellow)' : 'var(--muted)'}>
              {p.label}
            </text>
          )}
        </g>
      ))}
    </g>
  );
}
