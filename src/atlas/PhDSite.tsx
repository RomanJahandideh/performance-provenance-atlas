import { setIx, useAppState } from '../state/store';
import { PROVENANCE_LINKS } from '../data/provenance';
import { StatusGeometry } from './StatusGeometry';

const SITE = { x: 3310, y: 1010 };

/** D-04: the proposed site plus the provenance spine with inspectable links. */
export function PhDSite({ active }: { active: boolean }) {
  const step = useAppState((s) => s.stepIndex);
  const phdLink = useAppState((s) => s.ix.phdLink);
  const on = (n: number) => !active || step >= n;

  // Spine: 8 link nodes in a shallow arc below the proposed site
  const spine = PROVENANCE_LINKS.map((_, i) => ({
    x: 2800 + i * 150,
    y: 1140 - Math.sin((i / 7) * Math.PI) * 55,
  }));

  return (
    <g>
      <g transform={`translate(${SITE.x},${SITE.y - 120})`}>
        <StatusGeometry status="proposed" w={150} d={110} h={64} label="PROPOSED · FOR DISCUSSION" />
        <text y={-120} textAnchor="middle" fontSize={17} className="map-label map-label--bright" style={{ letterSpacing: '0.12em' }}>
          PERFORMANCE PROVENANCE
        </text>
        <text y={-98} textAnchor="middle" fontSize={11.5} className="map-coord">
          WORKING TITLE · HUMAN–AI CO-DESIGN OF URBAN ENVIRONMENTS
        </text>
      </g>

      {/* provisional marker */}
      <g className={`vg-step ${on(0) ? 'is-on' : ''}`} transform="translate(3640,1221)">
        <circle r={13} fill="none" stroke="var(--proposal)" strokeWidth={1.4} strokeDasharray="4 4" />
        <text textAnchor="middle" dy={4.5} fontSize={12} fill="var(--proposal)" className="map-label">
          ?
        </text>
        <text x={20} y={4} fontSize={10.5} className="map-coord" fill="var(--proposal)">
          TO BE REFINED WITH SUPERVISOR
        </text>
      </g>

      {/* provenance spine (visible from the start of the PhD scene) */}
      <g className={`vg-step ${active || on(0) ? 'is-on' : ''}`} aria-hidden={!active}>
        {spine.map((p, i) => {
          if (i === spine.length - 1) return null;
          const q = spine[i + 1]!;
          return <line key={i} x1={p.x + 16} y1={p.y} x2={q.x - 16} y2={q.y} stroke="var(--yellow)" strokeWidth={1.8} markerEnd="url(#arrowYellow)" />;
        })}
        {spine.map((p, i) => {
          const link = PROVENANCE_LINKS[i]!;
          const hi = phdLink === i;
          const col =
            link.stateColor === 'cyan'
              ? 'var(--cyan)'
              : link.stateColor === 'orange'
                ? 'var(--orange)'
                : link.stateColor === 'coral'
                  ? 'var(--coral)'
                  : link.stateColor === 'muted'
                    ? 'var(--muted)'
                    : 'var(--yellow)';
          return (
            <g
              key={link.id}
              transform={`translate(${p.x},${p.y})`}
              className="parcel"
              tabIndex={active ? 0 : -1}
              role="button"
              aria-label={`Provenance link: ${link.label}. Inspect.`}
              onClick={() => setIx({ phdLink: hi ? -1 : i })}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIx({ phdLink: hi ? -1 : i });
                }
              }}
            >
              <circle r={hi ? 16 : 12} fill={hi ? col : 'var(--bg)'} stroke={col} strokeWidth={2.2} style={{ transition: 'all .25s var(--ease)' }} />
              <text y={i % 2 === 0 ? 40 : -28} textAnchor="middle" fontSize={11.5} className="map-coord" fill={hi ? col : undefined}>
                {link.label.toUpperCase()}
              </text>
            </g>
          );
        })}
        <text x={2800} y={1226} fontSize={10.5} className="map-coord" fill="var(--muted)">
          CONCEPTUAL DEMONSTRATION — BUILT FROM THE REAL VIEW-CORRIDOR STUDY, NOT THE PROPOSED SYSTEM RUNNING
        </text>
      </g>
    </g>
  );
}
