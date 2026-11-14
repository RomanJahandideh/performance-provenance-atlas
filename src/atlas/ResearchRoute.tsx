import { useMemo } from 'react';
import { ROUTE_POINTS, ROUTE_TARGETS } from '../data/trajectory';
import { SCENES } from '../data/scenes';
import { useAppState } from '../state/store';

function pathFrom(points: readonly { x: number; y: number }[]): string {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ');
}

const smooth = (t: number) => {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
};

/** The route draws continuously as the story scrolls. */
export function ResearchRoute() {
  const sceneIndex = useAppState((s) => s.sceneIndex);
  const p = useAppState((s) => s.sceneP);
  const scene = SCENES[sceneIndex] ?? SCENES[0]!;
  const d = useMemo(() => pathFrom(ROUTE_POINTS), []);

  const [startF, endF] = ROUTE_TARGETS[scene.id] ?? [1, 1];
  const frac = startF + (endF - startF) * smooth(p * 1.12);
  const nodesDone = frac * (ROUTE_POINTS.length - 1) + 0.0001;
  const currentIdx = Math.min(ROUTE_POINTS.length - 1, Math.floor(nodesDone));

  return (
    <g aria-hidden>
      <path d={d} fill="none" className="route-base" strokeWidth={3} strokeDasharray="1 14" strokeLinecap="round" />
      {frac > 0.001 && (
        <path
          d={d}
          fill="none"
          className="route-active"
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - frac}
        />
      )}
      {ROUTE_POINTS.map((pt, i) => (
        <g key={i} transform={`translate(${pt.x},${pt.y})`}>
          <circle r={i === currentIdx && frac > 0.001 ? 10 : 7} className={`route-node ${i <= nodesDone && frac > 0.001 ? 'route-node--done' : ''}`} strokeWidth={2} />
          {i === currentIdx && frac > 0.001 && frac < 1 && (
            <circle r={19} fill="none" stroke="var(--yellow)" strokeWidth={1.3} style={{ animation: 'haloPulse 2.4s ease-in-out infinite' }} />
          )}
          {pt.label && (
            <text x={0} y={30} textAnchor="middle" fontSize={12} className="map-label" fill={i <= nodesDone && frac > 0 ? 'var(--yellow)' : 'var(--muted)'}>
              {pt.label}
            </text>
          )}
        </g>
      ))}
    </g>
  );
}
