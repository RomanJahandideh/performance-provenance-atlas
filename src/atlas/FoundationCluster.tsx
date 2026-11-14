import { useSceneP, win } from './useSceneP';

/**
 * D-01 upper cluster: the three foundation systems demonstrate themselves as the
 * scroll advances — the eCAADe transparency sweep, the ISS halo, the BioTerrarium loop.
 */
export function FoundationCluster() {
  const p = useSceneP('foundation');
  const on = p >= 0;
  if (!on) return null;

  // eCAADe live demo: transparency sweeps 10% → 90%; past 60% the "nearer" arrow flips.
  const sweep = on ? win(p, 0.04, 0.36) : 1;
  const transparency = Math.round(10 + sweep * 80);
  const flipped = transparency >= 60;

  // BioTerrarium: fog thins as the loop settles.
  const fogClear = on ? win(p, 0.8, 0.98) : 0;

  return (
    <g aria-hidden>
      <text x={300} y={338} fontSize={13} className="district-label">
        PERCEPTION + EMBODIED SYSTEMS
      </text>

      {/* ── ISS halo (plays while its part of the story is up) ── */}
      <g className={`vg-step ${!on || p >= 0.42 ? 'is-on' : ''}`} transform="translate(300,372)">
        <text x={0} y={-10} fontSize={11.5} className="map-coord">
          HR → PULSE / GLOW · HRV → RING COHERENCE
        </text>
        <g transform="translate(40,50)">
          <circle r={20} fill="rgba(242,207,85,0.6)" style={{ animation: 'haloPulse 1.1s ease-in-out infinite' }} />
          <circle r={30} fill="none" stroke="var(--yellow)" strokeWidth={2.4} strokeDasharray="10 7" style={{ animation: 'haloPulse 1.1s ease-in-out infinite' }} />
          <text y={54} textAnchor="middle" fontSize={10.5} className="map-coord">
            ICON CUE
          </text>
        </g>
        <g transform="translate(130,50)">
          <rect x={-28} y={-16} width={56} height={32} fill="rgba(11,50,102,0.5)" stroke="var(--muted)" strokeWidth={1} />
          <text textAnchor="middle" dy={4} fontSize={11} className="map-annotation">
            96 bpm
          </text>
          <text y={54} textAnchor="middle" fontSize={10.5} className="map-coord">
            NUMERIC
          </text>
        </g>
        <text x={210} y={44} fontSize={11} className="map-annotation" fill="var(--orange)">
          numbers stayed more trusted — a trade-off
        </text>
      </g>

      {/* ── eCAADe chamber: live transparency sweep ── */}
      <g className={`vg-step ${!on || p < 0.46 ? 'is-on' : ''}`} transform="translate(300,520)">
        <rect x={0} y={0} width={320} height={200} fill="rgba(11,50,102,0.25)" stroke="var(--line-major)" strokeWidth={1} />
        <text x={12} y={22} fontSize={11.5} className="map-coord">
          PAIRWISE DEPTH JUDGMENT · LIVE TRANSPARENCY SWEEP
        </text>
        {[0, 1, 2].map((i) => (
          <line key={i} x1={16} y1={66 + i * 42} x2={304} y2={66 + i * 42} stroke="var(--line-major)" strokeWidth={0.8} strokeDasharray="4 7" />
        ))}
        {/* warm/bright vs cool/dark — fill opacity follows transparency */}
        <circle cx={105} cy={118} r={30} fill="rgba(244,123,92,0.85)" fillOpacity={1 - transparency / 110} stroke="var(--coral)" strokeWidth={1.4} />
        <circle cx={215} cy={118} r={30} fill="rgba(11,50,102,0.95)" fillOpacity={1 - transparency / 140} stroke="var(--cyan)" strokeWidth={1.4} />
        <text x={105} y={166} textAnchor="middle" fontSize={10.5} className="map-coord">
          WARM · BRIGHT
        </text>
        <text x={215} y={166} textAnchor="middle" fontSize={10.5} className="map-coord">
          COOL · DARK
        </text>
        {/* the nearer arrow flips at 60% */}
        <g style={{ transition: 'transform .5s var(--ease)' }} transform={`translate(${flipped ? 215 : 105},0)`}>
          <path d="M0 76 L0 56" stroke={flipped ? 'var(--cyan)' : 'var(--coral)'} strokeWidth={1.8} markerEnd={flipped ? 'url(#arrowCyan)' : 'url(#arrowYellow)'} />
          <text y={48} textAnchor="middle" fontSize={11} className="map-annotation" fill={flipped ? 'var(--cyan)' : 'var(--coral)'}>
            perceived NEARER
          </text>
        </g>
        <text x={308} y={192} textAnchor="end" fontSize={13} className="map-annotation" fill={flipped ? 'var(--cyan)' : 'var(--ink-dim)'}>
          transparency {transparency}%{flipped ? ' — the rule flips' : ''}
        </text>
      </g>

      {/* ── BioTerrarium loop ── */}
      <g className={`vg-step ${!on || p >= 0.72 ? 'is-on' : ''}`} transform="translate(300,1040)">
        <text x={0} y={-8} fontSize={11.5} className="map-coord">
          WATCH → SWIFT BRIDGE → WEBSOCKET → UNITY 6 · &lt;200 MS
        </text>
        {['WATCH', 'BRIDGE', 'UNITY'].map((t, i) => (
          <g key={t} transform={`translate(${i * 108},14)`}>
            <rect width={84} height={30} fill="rgba(11,50,102,0.45)" stroke="var(--line-major)" />
            <text x={42} y={19} textAnchor="middle" fontSize={10.5} className="map-coord">
              {t}
            </text>
            {i < 2 && <line x1={84} y1={15} x2={108} y2={15} stroke="var(--cyan)" strokeWidth={1.6} strokeDasharray="6 5" className="flow-dash" markerEnd="url(#arrowCyan)" />}
          </g>
        ))}
        <g transform="translate(0,62)">
          {[0, 1, 2, 3].map((i) => (
            <ellipse
              key={i}
              cx={150}
              cy={26}
              rx={120 - i * 24}
              ry={22 - i * 4}
              fill="none"
              stroke="var(--lime)"
              strokeOpacity={(0.3 + i * 0.12) * (1 - fogClear * 0.6)}
              strokeWidth={1}
            />
          ))}
          <text x={150} y={68} textAnchor="middle" fontSize={10.5} className="map-coord">
            FOG · LIGHT · VEGETATION — CONCEPTUAL VISUALIZATION
          </text>
        </g>
      </g>
    </g>
  );
}
