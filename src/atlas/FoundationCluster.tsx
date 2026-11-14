import { useAppState } from '../state/store';

/**
 * D-02 mini-diagrams around the three foundation parcels.
 * Scene 3 keeps these brief by design — the four computational projects carry the talk.
 */
export function FoundationCluster({ active }: { active: boolean }) {
  const stepIndex = useAppState((s) => s.stepIndex);
  const on = (n: number) => active && stepIndex >= n;

  return (
    <g aria-hidden>
      {/* ── eCAADe: paired-sphere depth chamber (anchor 700,760) ── */}
      <g className={`vg-step ${on(0) ? 'is-on' : ''}`} transform="translate(330,520)">
        <rect x={0} y={0} width={300} height={190} fill="rgba(11,50,102,0.25)" stroke="var(--line-major)" strokeWidth={1} />
        <text x={12} y={22} fontSize={11.5} className="map-coord">
          EXPERIMENT CHAMBER · PAIRWISE DEPTH JUDGMENT
        </text>
        {/* depth contours */}
        {[0, 1, 2].map((i) => (
          <line key={i} x1={16} y1={60 + i * 42} x2={284} y2={60 + i * 42} stroke="var(--line-major)" strokeWidth={0.8} strokeDasharray="4 7" />
        ))}
        {/* warm/bright vs cool/dark spheres */}
        <circle cx={100} cy={112} r={30} fill="rgba(244,123,92,0.5)" stroke="var(--coral)" strokeWidth={1.4} />
        <circle cx={205} cy={112} r={30} fill="rgba(11,50,102,0.75)" stroke="var(--cyan)" strokeWidth={1.4} />
        <text x={100} y={162} textAnchor="middle" fontSize={10.5} className="map-coord">
          WARM · BRIGHT
        </text>
        <text x={205} y={162} textAnchor="middle" fontSize={10.5} className="map-coord">
          COOL · DARK
        </text>
        <g className={`vg-step ${on(0) ? 'is-on' : ''}`}>
          <path d="M205 70 L205 46" stroke="var(--cyan)" strokeWidth={1.6} markerEnd="url(#arrowCyan)" />
          <text x={210} y={40} fontSize={11} className="map-annotation" fill="var(--cyan)">
            perceived NEARER at 90% transparency
          </text>
        </g>
        <text x={12} y={182} fontSize={10.5} className="map-coord">
          60 PARTICIPANTS · 264 JUDGMENTS EACH · QUEST 2
        </text>
      </g>

      {/* ── ISS: physiological halo + conditions (anchor 980,560) ── */}
      <g className={`vg-step ${on(1) ? 'is-on' : ''}`} transform="translate(330,286)">
        <text x={0} y={-10} fontSize={11.5} className="map-coord">
          HR → PULSE / GLOW · HRV → RING COHERENCE
        </text>
        <g transform="translate(40,50)">
          <circle r={20} fill="rgba(242,207,85,0.6)" style={{ animation: 'haloPulse 1.1s ease-in-out infinite' }} />
          <circle r={30} fill="none" stroke="var(--yellow)" strokeWidth={2.4} strokeDasharray="10 7" style={{ animation: 'haloPulse 1.1s ease-in-out infinite' }} />
          <text y={58} textAnchor="middle" fontSize={10.5} className="map-coord">
            ICON CUE
          </text>
        </g>
        <g transform="translate(130,50)">
          <rect x={-28} y={-16} width={56} height={32} fill="rgba(11,50,102,0.5)" stroke="var(--muted)" strokeWidth={1} />
          <text textAnchor="middle" dy={4} fontSize={11} className="map-annotation">
            96 bpm
          </text>
          <text y={58} textAnchor="middle" fontSize={10.5} className="map-coord">
            NUMERIC
          </text>
        </g>
        <g transform="translate(0,128)">
          <text fontSize={11} className="map-annotation" fill="var(--cyan)">
            support 3.90 s faster vs no cue
          </text>
          <text y={18} fontSize={11} className="map-annotation">
            HR 66.3% · HRV 58.2% vs 25% chance
          </text>
          <text y={36} fontSize={11} className="map-annotation" fill="var(--orange)">
            numeric stayed more trusted — a trade-off
          </text>
        </g>
      </g>

      {/* ── BioTerrarium: signal → environment field (anchor 760,980) ── */}
      <g className={`vg-step ${on(1) ? 'is-on' : ''}`} transform="translate(470,1010)">
        <text x={0} y={-8} fontSize={11.5} className="map-coord">
          WATCH → SWIFT BRIDGE → WEBSOCKET → UNITY 6 · &lt;200 MS
        </text>
        {['WATCH', 'BRIDGE', 'UNITY'].map((t, i) => (
          <g key={t} transform={`translate(${i * 108},16)`}>
            <rect width={84} height={30} fill="rgba(11,50,102,0.45)" stroke="var(--line-major)" />
            <text x={42} y={19} textAnchor="middle" fontSize={10.5} className="map-coord">
              {t}
            </text>
            {i < 2 && <line x1={84} y1={15} x2={108} y2={15} stroke="var(--cyan)" strokeWidth={1.6} strokeDasharray="6 5" className="flow-dash" markerEnd="url(#arrowCyan)" />}
          </g>
        ))}
        {/* fog / vegetation field */}
        <g transform="translate(0,66)">
          {[0, 1, 2, 3].map((i) => (
            <ellipse key={i} cx={150} cy={26} rx={120 - i * 24} ry={22 - i * 4} fill="none" stroke="var(--lime)" strokeOpacity={0.35 + i * 0.12} strokeWidth={1} />
          ))}
          <text x={150} y={70} textAnchor="middle" fontSize={10.5} className="map-coord">
            FOG · LIGHT · VEGETATION · CLARITY — CONCEPTUAL VISUALIZATION
          </text>
        </g>
      </g>
    </g>
  );
}
