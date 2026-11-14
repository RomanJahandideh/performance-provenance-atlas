import { CAMPUSES, AWARDS } from '../data/trajectory';
import { useAppState } from '../state/store';
import { SCENES } from '../data/scenes';
import { isoBoxFaces } from './iso';

/** D-01 Foundations: campus anchors and award structures — no clicks, the scroll highlights them. */
export function CampusAwards() {
  const sceneIndex = useAppState((s) => s.sceneIndex);
  const p = useAppState((s) => s.sceneP);
  const inTrajectory = (SCENES[sceneIndex] ?? SCENES[0]!).id === 'trajectory';
  const activeCampus = !inTrajectory ? null : p < 0.28 ? 'tabriz' : p < 0.58 ? 'itu' : p < 0.86 ? 'sfu' : null;
  const awardsLit = inTrajectory && p < 0.3;

  return (
    <g aria-hidden>
      {CAMPUSES.map((c) => {
        const active = activeCampus === c.id;
        return (
          <g key={c.id} transform={`translate(${c.pos.x},${c.pos.y})`}>
            <circle
              r={active ? 120 : 86}
              fill={active ? 'rgba(242,207,85,0.05)' : 'none'}
              stroke={active ? 'var(--yellow)' : 'var(--line-major)'}
              strokeWidth={active ? 1.6 : 1}
              strokeDasharray="12 8"
              style={{ transition: 'all .5s var(--ease)' }}
            />
            <circle r={8} fill="var(--bg)" stroke={active ? 'var(--yellow)' : 'var(--ink-dim)'} strokeWidth={2.2} />
            <text x={0} y={-44} textAnchor="middle" fontSize={16} className="map-label map-label--bright">
              {c.institution.toUpperCase()}
            </text>
            <text x={0} y={-24} textAnchor="middle" fontSize={12} className="map-coord">
              {c.period}
            </text>
            <text x={0} y={36} textAnchor="middle" fontSize={12.5} className="map-annotation">
              {c.degree}
            </text>
          </g>
        );
      })}

      <text x={330 - 32} y={2270} fontSize={11} className="map-coord">
        DESIGN + PHOTOGRAPHY AWARDS
      </text>
      {AWARDS.map((a) => {
        const f = isoBoxFaces(42, 34, 30);
        return (
          <g key={a.id} transform={`translate(${a.pos.x},${a.pos.y})`}>
            <polygon points={f.left} fill="rgba(237,242,247,0.12)" stroke="var(--geom)" strokeWidth={1} />
            <polygon points={f.right} fill="rgba(237,242,247,0.22)" stroke="var(--geom)" strokeWidth={1} />
            <polygon points={f.top} fill={awardsLit ? 'rgba(242,207,85,0.4)' : 'rgba(242,207,85,0.22)'} stroke="var(--geom)" strokeWidth={1} style={{ transition: 'fill .4s' }} />
            <text x={5} y={46} fontSize={10.5} textAnchor="middle" className="map-annotation">
              {a.title}
            </text>
            <text x={5} y={62} fontSize={9.5} textAnchor="middle" className="map-coord">
              {a.year}
            </text>
          </g>
        );
      })}
    </g>
  );
}
