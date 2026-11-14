import { useSceneP, win } from './useSceneP';
import { PROVENANCE_LINKS } from '../data/provenance';
import { StatusGeometry } from './StatusGeometry';

const SITE = { x: 4080, y: 940 };

/**
 * D-03: the proposed site and its provenance spine. As the scroll advances the
 * links light up one by one, each showing what the record would hold — using
 * the real corridor-study revision, labelled a conceptual demonstration.
 */
export function PhDSite() {
  const p = useSceneP('phd');
  const on = p >= 0;

  const spine = PROVENANCE_LINKS.map((_, i) => ({
    x: 3150 + i * 150,
    y: 1172 - Math.sin((i / 7) * Math.PI) * 48,
  }));
  const litCount = !on ? PROVENANCE_LINKS.length : Math.floor(win(p, 0.14, 0.72) * PROVENANCE_LINKS.length + 0.0001);
  const activeIdx = on ? Math.min(PROVENANCE_LINKS.length - 1, litCount - 1) : -1;
  const marker = !on || p >= 0.76;

  return (
    <g aria-hidden>
      <g transform={`translate(${SITE.x},${SITE.y - 100})`}>
        <StatusGeometry status="proposed" w={140} d={104} h={60} label="PROPOSED · FOR DISCUSSION" />
        <text y={-112} textAnchor="middle" fontSize={17} className="map-label map-label--bright" style={{ letterSpacing: '0.12em' }}>
          PERFORMANCE PROVENANCE
        </text>
        <text y={-90} textAnchor="middle" fontSize={11.5} className="map-coord">
          WORKING TITLE · HUMAN–AI CO-DESIGN OF URBAN ENVIRONMENTS
        </text>
      </g>

      {/* provisional marker */}
      <g className={`vg-step ${marker ? 'is-on' : ''}`} transform="translate(3920,1282)">
        <circle r={13} fill="none" stroke="var(--proposal)" strokeWidth={1.4} strokeDasharray="4 4" />
        <text textAnchor="middle" dy={4.5} fontSize={12} fill="var(--proposal)" className="map-label">
          ?
        </text>
        <text x={20} y={4} fontSize={10.5} className="map-coord" fill="var(--proposal)">
          TO BE REFINED WITH SUPERVISOR
        </text>
      </g>

      {/* spine — drawn only while its scene tells it */}
      {on && (
      <g>
        {spine.map((pt, i) => {
          if (i === spine.length - 1) return null;
          const q = spine[i + 1]!;
          const lit = litCount > i + 1;
          return (
            <line
              key={i}
              x1={pt.x + 16}
              y1={pt.y}
              x2={q.x - 16}
              y2={q.y}
              stroke={lit ? 'var(--yellow)' : 'rgba(242,207,85,0.25)'}
              strokeWidth={lit ? 1.8 : 1.2}
              strokeDasharray={lit ? undefined : '3 8'}
              markerEnd={lit ? 'url(#arrowYellow)' : undefined}
            />
          );
        })}
        {spine.map((pt, i) => {
          const link = PROVENANCE_LINKS[i]!;
          const lit = litCount > i;
          const active = i === activeIdx;
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
            <g key={link.id} transform={`translate(${pt.x},${pt.y})`}>
              <circle r={active ? 16 : 12} fill={lit ? (active ? col : 'var(--bg)') : 'var(--bg)'} stroke={col} strokeOpacity={lit ? 1 : 0.35} strokeWidth={2.2} style={{ transition: 'all .25s var(--ease)' }} />
              <text y={i % 2 === 0 ? 40 : -28} textAnchor="middle" fontSize={11.5} className="map-coord" fill={lit ? col : undefined} opacity={lit ? 1 : 0.5}>
                {link.label.toUpperCase()}
              </text>
            </g>
          );
        })}
        {/* active link readout — large, on the map, no clicking */}
        {on && activeIdx >= 0 && (
          <g transform="translate(3150,1000)">
            <text fontSize={15} className="map-label map-label--bright" style={{ letterSpacing: '0.1em' }}>
              {String(activeIdx + 1).padStart(2, '0')} · {PROVENANCE_LINKS[activeIdx]!.label.toUpperCase()}
            </text>
            <text y={26} fontSize={13} className="map-annotation" fill="var(--ink-dim)">
              {PROVENANCE_LINKS[activeIdx]!.short}
            </text>
          </g>
        )}
        <text x={3150} y={1268} fontSize={10.5} className="map-coord" fill="var(--muted)">
          CONCEPTUAL DEMONSTRATION — BUILT FROM THE REAL VIEW-CORRIDOR STUDY, NOT THE PROPOSED SYSTEM RUNNING
        </text>
      </g>
      )}
    </g>
  );
}
