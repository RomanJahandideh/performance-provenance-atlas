import { useAppState } from '../../state/store';
import { iso, pts, isoBoxFaces } from '../iso';

const CLAUSES = ['USES', 'LOT / FRONTAGE', 'SETBACKS', 'HEIGHT', 'STOREYS', 'FSR', 'DIMENSIONS', 'OUTDOOR SPACE', 'PARKING', 'TREE RETENTION'];

export function ZLAVignette({ active }: { active: boolean }) {
  const step = useAppState((s) => s.stepIndex);
  const sceneIndex = useAppState((s) => s.sceneIndex);
  const zlaCase = useAppState((s) => s.ix.zlaCase);
  if (!active) return null;
  const inScene = sceneIndex === 4;
  const on = (n: number) => !inScene || step >= n;

  const retrievedIdx = zlaCase === 'supported' ? 3 : zlaCase === 'laneway' ? 0 : -1;
  const stopped = zlaCase === 'laneway';

  return (
    <g aria-hidden>
      {/* ── Regulatory archive: ten clause slabs ── */}
      <g transform="translate(1380,1588)">
        <text y={-20} fontSize={12} className="map-coord">
          REGULATORY ARCHIVE · 10 ADDRESSABLE CLAUSES
        </text>
        {CLAUSES.map((c, i) => {
          const hi = on(1) && i === retrievedIdx;
          return (
            <g key={c} transform={`translate(0,${i * 52})`}>
              <polygon
                points={pts([iso(0, 0, 0), iso(150, 0, 0), iso(150, 36, 0), iso(0, 36, 0)])}
                fill={hi ? 'rgba(242,207,85,0.22)' : 'rgba(11,50,102,0.42)'}
                stroke={hi ? 'var(--yellow)' : 'var(--line-major)'}
                strokeWidth={hi ? 1.8 : 1}
              />
              <text x={150} y={32} fontSize={10.5} className="map-coord" fill={hi ? 'var(--yellow)' : undefined}>
                C{String(i + 1).padStart(2, '0')} · {c}
              </text>
            </g>
          );
        })}
      </g>

      {/* ── Pipeline ── */}
      <g className={`vg-step ${on(0) ? 'is-on' : ''}`} transform="translate(1380,1398)">
        {['RETRIEVE', 'ANSWER', 'VERIFY'].map((t, i) => {
          const dead = stopped && i > 0;
          return (
            <g key={t} transform={`translate(${i * 190},0)`}>
              <rect width={150} height={44} fill={dead ? 'rgba(11,50,102,0.2)' : 'rgba(11,50,102,0.5)'} stroke={dead ? 'var(--muted)' : 'var(--cyan)'} strokeWidth={1.2} strokeDasharray={dead ? '6 6' : undefined} />
              <text x={75} y={27} textAnchor="middle" fontSize={11.5} className="map-coord" fill={dead ? 'var(--muted)' : 'var(--cyan)'}>
                {t}
              </text>
              <text x={75} y={60} textAnchor="middle" fontSize={9.5} className="map-coord">
                {i === 0 ? 'selects clauses' : i === 1 ? 'sees only retrieved text' : 'checks its own evidence'}
              </text>
              {i < 2 && (
                <line x1={150} y1={22} x2={190} y2={22} stroke={stopped && i >= 0 ? 'var(--muted)' : 'var(--cyan)'} strokeWidth={1.6} strokeDasharray="6 5" className={stopped ? '' : 'flow-dash'} markerEnd="url(#arrowCyan)" opacity={stopped && i >= 0 ? 0.35 : 1} />
              )}
            </g>
          );
        })}
        <text x={0} y={92} fontSize={11} className="map-annotation">
          three separate model calls — synthesis never sees the whole bylaw, and retrieval can stop the pipeline
        </text>
      </g>

      {/* ── Case panel ── */}
      <g transform="translate(2130,1430)">
        {zlaCase === 'supported' && on(1) && (
          <g className="vg-step is-on">
            <text fontSize={12} className="map-coord">
              Q: “WHAT IS THE MAXIMUM BUILDING HEIGHT?”
            </text>
            <rect y={14} width={380} height={96} fill="rgba(11,50,102,0.45)" stroke="var(--cyan)" strokeWidth={1.2} />
            <text x={14} y={40} fontSize={12.5} className="map-annotation">
              11.5 m and three storeys (R1-1 base provisions)
            </text>
            <text x={14} y={62} fontSize={11} className="map-annotation" fill="var(--cyan)">
              grounded ✓ · supporting sentence quoted from C04 HEIGHT
            </text>
            <text x={14} y={84} fontSize={11} className="map-annotation" fill="var(--muted)">
              verification pass: evidence supports answer · no missed clause
            </text>
            <line x1={-40} y1={60} x2={-560} y2={330} stroke="var(--yellow)" strokeWidth={1.2} strokeDasharray="5 6" markerEnd="url(#arrowYellow)" />
          </g>
        )}
        {zlaCase === 'laneway' && (
          <g className="vg-step is-on">
            <text fontSize={12} className="map-coord">
              Q: “HOW MANY STOREYS MAY A LANEWAY HOUSE HAVE?”
            </text>
            <rect y={14} width={400} height={112} fill="rgba(232,146,74,0.08)" stroke="var(--orange)" strokeWidth={1.6} />
            <text x={14} y={44} fontSize={16} className="map-label" fill="var(--orange)" style={{ letterSpacing: '0.2em' }}>
              NOT COVERED
            </text>
            <text x={14} y={68} fontSize={11.5} className="map-annotation">
              the clause permits a laneway house but never
            </text>
            <text x={14} y={86} fontSize={11.5} className="map-annotation">
              states its storey limit — so the pipeline stops
            </text>
            <text x={14} y={104} fontSize={11.5} className="map-annotation">
              instead of letting a second call guess
            </text>
          </g>
        )}
        {zlaCase === 'site' && (
          <SitePlan rental={step >= 3 || !inScene} />
        )}
      </g>
    </g>
  );
}

/** Deterministic lot check: 10 × 37 m → 162.6 m², FSR 0.70 → 1.00 (1 → 2 floors). */
function SitePlan({ rental }: { rental: boolean }) {
  const k = 7.4;
  const W = 10 * k;
  const D = 37 * k;
  const fs = 4.9 * k;
  const rs = 10.7 * k;
  const ss = 1.2 * k;
  const mass = isoBoxFaces(W - 2 * ss, D - fs - rs, rental ? 46 : 23);
  const o = iso(ss, fs);
  return (
    <g className="vg-step is-on" transform="translate(0,-40)">
      <text fontSize={12} className="map-coord">
        DETERMINISTIC SITE CHECK · 10 × 37 M LOT
      </text>
      <g transform="translate(40,60)">
        <polygon points={pts([iso(0, 0), iso(W, 0), iso(W, D), iso(0, D)])} fill="rgba(11,50,102,0.3)" stroke="var(--geom)" strokeWidth={1.3} />
        <g transform={`translate(${o.x},${o.y})`}>
          <polygon points={mass.left} fill="rgba(112,215,206,0.16)" stroke="var(--cyan)" strokeWidth={1.2} />
          <polygon points={mass.right} fill="rgba(112,215,206,0.26)" stroke="var(--cyan)" strokeWidth={1.2} />
          <polygon points={mass.top} fill="rgba(112,215,206,0.4)" stroke="var(--cyan)" strokeWidth={1.2} />
        </g>
      </g>
      <g transform="translate(16,262)" fontSize={11.5}>
        <text className="map-annotation">(10 − 2×1.2) × (37 − 4.9 − 10.7)</text>
        <text y={20} className="map-annotation">= 7.6 × 21.4 = <tspan fill="var(--cyan)">162.6 m² footprint</tspan></text>
        <text y={48} className="map-annotation">
          FSR {rental ? '1.00 (rental condition ON)' : '0.70 (base)'} → <tspan fill="var(--cyan)">{rental ? 'two floors' : 'one floor'}</tspan>
        </text>
        <text y={70} className="map-annotation" fill="var(--muted)">
          computed in code — the model only explains these numbers
        </text>
      </g>
    </g>
  );
}
