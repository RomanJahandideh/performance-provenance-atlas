import { CAMPUSES, AWARDS } from '../data/trajectory';
import { useAppState, setState } from '../state/store';
import { SCENES } from '../data/scenes';
import { isoBoxFaces } from './iso';

/** D-01 Foundations: campus anchors, survey route ticks, award structures. */
export function CampusAwards({ detail }: { detail: boolean }) {
  const sceneIndex = useAppState((s) => s.sceneIndex);
  const stepIndex = useAppState((s) => s.stepIndex);
  const scene = SCENES[sceneIndex] ?? SCENES[0]!;
  const inTrajectory = scene.id === 'trajectory';
  const activeCampus = inTrajectory ? ['tabriz', 'itu', 'sfu'][Math.min(stepIndex, 2)] : null;

  return (
    <g>
      {CAMPUSES.map((c) => {
        const active = activeCampus === c.id;
        return (
          <g key={c.id} transform={`translate(${c.pos.x},${c.pos.y})`}>
            {/* survey territory ring */}
            <circle r={active ? 118 : 86} fill={active ? 'rgba(242,207,85,0.05)' : 'none'} stroke={active ? 'var(--yellow)' : 'var(--line-major)'} strokeWidth={active ? 1.6 : 1} strokeDasharray="12 8" style={{ transition: 'all .5s var(--ease)' }} />
            <circle r={8} fill="var(--bg)" stroke={active ? 'var(--yellow)' : 'var(--ink-dim)'} strokeWidth={2.2} />
            <line x1={0} y1={-8} x2={0} y2={-30} stroke={active ? 'var(--yellow)' : 'var(--muted)'} strokeWidth={1.2} />
            <text x={0} y={-44} textAnchor="middle" fontSize={16} className="map-label map-label--bright">
              {c.institution.toUpperCase()}
            </text>
            <text x={0} y={-22} textAnchor="middle" fontSize={12} className="map-coord">
              {c.period}
            </text>
            <text x={0} y={34} textAnchor="middle" fontSize={12.5} className="map-annotation">
              {c.degree}
            </text>
          </g>
        );
      })}

      {/* Award structures: small designed objects beside the Tabriz / early period */}
      <g>
        <text x={AWARDS[0]!.pos.x - 40} y={AWARDS[0]!.pos.y + 92} fontSize={12} className="map-coord">
          DESIGN + PHOTOGRAPHY AWARDS · CLICK TO OPEN
        </text>
        {AWARDS.map((a) => {
          const f = isoBoxFaces(42, 34, 30);
          return (
            <g
              key={a.id}
              transform={`translate(${a.pos.x},${a.pos.y})`}
              className="parcel"
              tabIndex={0}
              role="button"
              aria-label={`${a.title}, ${a.year}. Open details.`}
              onClick={() => setState({ sheetAward: a.id })}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setState({ sheetAward: a.id });
                }
              }}
            >
              <polygon points={f.left} fill="rgba(237,242,247,0.12)" stroke="var(--geom)" strokeWidth={1} className="parcel-hit" />
              <polygon points={f.right} fill="rgba(237,242,247,0.22)" stroke="var(--geom)" strokeWidth={1} />
              <polygon points={f.top} fill="rgba(242,207,85,0.25)" stroke="var(--geom)" strokeWidth={1} />
              {detail && (
                <text x={34} y={16} fontSize={11} className="map-annotation">
                  {a.title.split('·')[0]!.trim()} · {a.year}
                </text>
              )}
            </g>
          );
        })}
      </g>
    </g>
  );
}
