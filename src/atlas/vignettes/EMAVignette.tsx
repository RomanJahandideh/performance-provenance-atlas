import { useAppState } from '../../state/store';
import { isoBoxFaces } from '../iso';

const ROLES = [
  { id: 'orch', label: 'ORCHESTRATOR', sub: 'integrates · redirects', x: 3960, y: 290, color: 'var(--yellow)' },
  { id: 'gen', label: 'GENERATOR', sub: 'proposes massing', x: 3620, y: 400, color: 'var(--geom)' },
  { id: 'solar', label: 'CRITIC · SOLAR', sub: '', x: 3570, y: 620, color: 'var(--lime)' },
  { id: 'carbon', label: 'CRITIC · CARBON', sub: '', x: 3780, y: 688, color: 'var(--lime)' },
  { id: 'wind', label: 'CRITIC · WIND', sub: '', x: 4140, y: 688, color: 'var(--lime)' },
  { id: 'yield', label: 'CRITIC · YIELD', sub: '', x: 4330, y: 620, color: 'var(--lime)' },
] as const;

const CENTER = { x: 3960, y: 560 };

export function EMAVignette({ active }: { active: boolean }) {
  const step = useAppState((s) => s.stepIndex);
  const sceneIndex = useAppState((s) => s.sceneIndex);
  if (!active) return null;
  const inScene = sceneIndex === 6;
  const on = (n: number) => !inScene || step >= n;

  return (
    <g aria-hidden>
      {/* candidate massing already drawn by Parcels; add site ring */}
      <circle cx={CENTER.x} cy={CENTER.y} r={104} fill="none" stroke="var(--line-major)" strokeWidth={1} strokeDasharray="4 8" />

      {/* roles + agent paths */}
      {ROLES.map((r, i) => {
        const vis = r.id === 'gen' || r.id === 'orch' ? on(0) : on(1);
        const talk = on(2);
        return (
          <g key={r.id} className={`vg-step ${vis ? 'is-on' : ''}`}>
            <line
              x1={r.x}
              y1={r.y}
              x2={CENTER.x + (CENTER.x > r.x ? -70 : 70) * 0.9}
              y2={CENTER.y + (CENTER.y > r.y ? -40 : 50)}
              stroke={r.color}
              strokeWidth={1.2}
              strokeOpacity={talk ? 0.85 : 0.3}
              strokeDasharray="7 6"
              className={talk ? 'flow-dash' : ''}
            />
            <circle cx={r.x} cy={r.y} r={34} fill="rgba(7,24,46,0.85)" stroke={r.color} strokeWidth={1.6} />
            <circle cx={r.x} cy={r.y} r={41} fill="none" stroke={r.color} strokeWidth={0.8} strokeOpacity={0.4} strokeDasharray={i === 0 ? '3 5' : undefined} />
            <text x={r.x} y={r.y - 52} textAnchor="middle" fontSize={11.5} className="map-label" fill={r.color}>
              {r.label}
            </text>
            {r.sub && (
              <text x={r.x} y={r.y + 58} textAnchor="middle" fontSize={10} className="map-coord">
                {r.sub}
              </text>
            )}
          </g>
        );
      })}

      {/* search comparison panel */}
      <g className={`vg-step ${on(3) ? 'is-on' : ''}`} transform="translate(3020,500)">
        <text y={-14} fontSize={12} className="map-coord">
          SEARCH · 1,080-DESIGN REFERENCE GRID · 200-EVALUATION BUDGET
        </text>
        <rect width={340} height={212} fill="rgba(11,50,102,0.3)" stroke="var(--line-major)" strokeWidth={1} />
        {/* reference grid as dot field */}
        {Array.from({ length: 11 }, (_, i) =>
          Array.from({ length: 7 }, (_, j) => (
            <circle key={`${i}-${j}`} cx={16 + i * 22} cy={182 - j * 14} r={1.4} fill="var(--muted)" opacity={0.5} />
          )),
        )}
        <line x1={14} y1={44} x2={326} y2={44} stroke="var(--yellow)" strokeWidth={1.2} strokeDasharray="8 6" />
        <text x={18} y={36} fontSize={10} className="map-coord" fill="var(--yellow)">
          95% OF REFERENCE HYPERVOLUME
        </text>
        {/* seed tracks: 5 NSGA (cyan, 4 cross), 5 random (grey, 1 crosses) — schematic */}
        {[0, 1, 2, 3, 4].map((i) => {
          const crosses = i < 4;
          const x = 46 + i * 28;
          return <path key={`n${i}`} d={`M${x} 198 C ${x + 6} 150, ${x - 6} ${crosses ? 80 : 116}, ${x} ${crosses ? 34 : 68}`} fill="none" stroke="var(--cyan)" strokeWidth={1.5} strokeOpacity={0.85} />;
        })}
        {[0, 1, 2, 3, 4].map((i) => {
          const crosses = i === 2;
          const x = 196 + i * 26;
          return <path key={`r${i}`} d={`M${x} 198 C ${x - 8} ${crosses ? 104 : 164}, ${x + 8} ${crosses ? 60 : 130}, ${x} ${crosses ? 32 : 94}`} fill="none" stroke="var(--muted)" strokeWidth={1.4} strokeOpacity={0.8} />;
        })}
        <text x={82} y={230} fontSize={10.5} className="map-coord" fill="var(--cyan)" textAnchor="middle">
          NSGA-II · 4 / 5 SEEDS
        </text>
        <text x={248} y={230} fontSize={10.5} className="map-coord" textAnchor="middle">
          RANDOM · 1 / 5 SEEDS
        </text>
        <text x={0} y={252} fontSize={10} className="map-coord">
          SEED TRACKS ARE SCHEMATIC — COUNTS AND BUDGET ARE THE REPOSITORY'S
        </text>
      </g>

      {/* Pareto + hypotheses panel */}
      <g className={`vg-step ${on(4) ? 'is-on' : ''}`} transform="translate(3020,130)">
        <text y={-12} fontSize={12} className="map-coord">
          REMAINING TRADE-OFF · WIND ↔ CORRIDOR YIELD
        </text>
        <rect width={250} height={200} fill="rgba(11,50,102,0.3)" stroke="var(--line-major)" strokeWidth={1} />
        <line x1={28} y1={22} x2={228} y2={180} stroke="var(--cyan)" strokeWidth={1} strokeOpacity={0.5} />
        {Array.from({ length: 10 }, (_, i) => (
          <circle key={i} cx={28 + i * 22} cy={22 + i * 17.5} r={4} fill="var(--bg)" stroke="var(--cyan)" strokeWidth={1.6} />
        ))}
        <text x={126} y={222} fontSize={10.5} className="map-coord" textAnchor="middle">
          10-MEMBER PARETO SET · r = −1.000
        </text>
      </g>

      {/* verdict banners */}
      <g className={`vg-step ${on(5) ? 'is-on' : ''}`} transform="translate(3380,130)">
        <rect width={300} height={34} fill="rgba(224,82,82,0.1)" stroke="var(--red)" strokeWidth={1.4} />
        <text x={12} y={22} fontSize={12} className="map-coord" fill="var(--red)">
          H1 FASTER CONVERGENCE — NOT CONFIRMED
        </text>
        <rect y={44} width={300} height={34} fill="rgba(112,215,206,0.08)" stroke="var(--cyan)" strokeWidth={1.4} />
        <text x={12} y={66} fontSize={12} className="map-coord" fill="var(--cyan)">
          SUPPORTED — RELIABILITY · 4/5 vs 1/5
        </text>
        <g transform="translate(0,96)" fontSize={10.5}>
          <text className="map-annotation" fill="var(--cyan)">
            H2 ✓ timber weakly dominates — 200/200 matched geometries
          </text>
          <text y={18} className="map-annotation" fill="var(--cyan)">
            H3 ✓ floor formula within ±1 floor · 19 orientations · MAE 0.16
          </text>
          <text y={36} className="map-annotation">
            H4 exploratory — structure after removing dominant variables
          </text>
        </g>
      </g>
    </g>
  );
}

/** Small decorative massing used by the explore legend (kept for reuse). */
export function MiniMass() {
  const f = isoBoxFaces(40, 32, 34);
  return (
    <g>
      <polygon points={f.left} fill="rgba(237,242,247,0.15)" stroke="var(--geom)" />
      <polygon points={f.right} fill="rgba(237,242,247,0.28)" stroke="var(--geom)" />
      <polygon points={f.top} fill="rgba(237,242,247,0.4)" stroke="var(--geom)" />
    </g>
  );
}
