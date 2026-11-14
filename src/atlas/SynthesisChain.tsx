import { useAppState } from '../state/store';
import { CHAIN_STAGES } from '../data/atlas';
import { parcel } from '../data/projects';

/** Scene 8: the six-stage chain assembles across the grid, with projects under their stages. */
const CHAIN_POS = [
  { x: 1660, y: 1620 },
  { x: 2140, y: 1500 },
  { x: 2680, y: 1380 },
  { x: 3240, y: 1260 },
  { x: 3790, y: 1140 },
  { x: 4240, y: 1020 },
] as const;

const PROJECT_FOR_STAGE: Record<string, string[]> = {
  regulation: ['zla'],
  evidence: ['zla', 'pmg'],
  geometry: ['pmg', 'vcm'],
  performance: ['vcm', 'ema'],
  critique: ['ema'],
  judgment: [],
};

export function SynthesisChain({ active }: { active: boolean }) {
  const step = useAppState((s) => s.stepIndex);
  const on = (n: number) => !active || step >= n;

  return (
    <g aria-hidden>
      {/* chain segments */}
      {CHAIN_POS.map((p, i) => {
        if (i === CHAIN_POS.length - 1) return null;
        const q = CHAIN_POS[i + 1]!;
        return (
          <line
            key={i}
            className={`vg-step ${on(0) ? 'is-on' : ''}`}
            x1={p.x + 70}
            y1={p.y - 24}
            x2={q.x - 70}
            y2={q.y + 24}
            stroke="var(--yellow)"
            strokeWidth={2.4}
            markerEnd="url(#arrowYellow)"
          />
        );
      })}
      {CHAIN_STAGES.map((s, i) => {
        const p = CHAIN_POS[i]!;
        const human = s.id === 'judgment';
        return (
          <g key={s.id} className={`vg-step ${on(0) ? 'is-on' : ''}`} transform={`translate(${p.x},${p.y})`}>
            <rect x={-82} y={-26} width={164} height={52} fill={human ? 'rgba(244,123,92,0.1)' : 'rgba(7,24,46,0.9)'} stroke={human ? 'var(--coral)' : 'var(--yellow)'} strokeWidth={1.6} />
            <text textAnchor="middle" dy={5} fontSize={14} className="map-label" fill={human ? 'var(--coral)' : 'var(--yellow)'}>
              {s.label.toUpperCase()}
            </text>
          </g>
        );
      })}
      {/* leader lines from stages to contributing parcels */}
      <g className={`vg-step ${on(1) ? 'is-on' : ''}`}>
        {CHAIN_STAGES.flatMap((s, i) =>
          (PROJECT_FOR_STAGE[s.id] ?? []).map((pid) => {
            const pp = parcel(pid).pos!;
            const cp = CHAIN_POS[i]!;
            return (
              <line
                key={`${s.id}-${pid}`}
                x1={cp.x}
                y1={cp.y + 28}
                x2={pp.x}
                y2={pp.y - 40}
                stroke="var(--muted)"
                strokeWidth={1}
                strokeDasharray="3 7"
              />
            );
          }),
        )}
      </g>
    </g>
  );
}
