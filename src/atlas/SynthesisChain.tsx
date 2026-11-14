import { useSceneP } from './useSceneP';
import { CHAIN_STAGES } from '../data/atlas';
import { parcel } from '../data/projects';

/** A single clean band: six stages on one line, leaders dropping to the projects. */
const CHAIN_POS = [
  { x: 1700, y: 1080 },
  { x: 2160, y: 1040 },
  { x: 2620, y: 1000 },
  { x: 3080, y: 960 },
  { x: 3540, y: 920 },
  { x: 4000, y: 880 },
] as const;

const PROJECT_FOR_STAGE: Record<string, string[]> = {
  regulation: ['zla'],
  evidence: ['zla', 'pmg'],
  geometry: ['pmg', 'vcm'],
  performance: ['vcm', 'ema'],
  critique: ['ema'],
  judgment: [],
};

export function SynthesisChain() {
  const p = useSceneP('synthesis');
  const on = p >= 0;
  const stageOn = (i: number) => !on || p >= 0.06 + i * 0.09;
  const leaders = !on || p >= 0.5;

  return (
    <g aria-hidden>
      {CHAIN_POS.map((pt, i) => {
        if (i === CHAIN_POS.length - 1) return null;
        const q = CHAIN_POS[i + 1]!;
        return (
          <line
            key={i}
            className={`vg-step ${stageOn(i + 1) ? 'is-on' : ''}`}
            x1={pt.x + 24}
            y1={pt.y - 5}
            x2={q.x - 24}
            y2={q.y + 5}
            stroke="var(--yellow)"
            strokeWidth={2.2}
            markerEnd="url(#arrowYellow)"
          />
        );
      })}
      {CHAIN_STAGES.map((s, i) => {
        const pt = CHAIN_POS[i]!;
        const human = s.id === 'judgment';
        return (
          <g key={s.id} className={`vg-step ${stageOn(i) ? 'is-on' : ''}`} transform={`translate(${pt.x},${pt.y})`}>
            <circle r={9} fill={human ? 'var(--coral)' : 'var(--bg)'} stroke={human ? 'var(--coral)' : 'var(--yellow)'} strokeWidth={2.2} />
            <text textAnchor="middle" y={-20} fontSize={14} className="map-label" fill={human ? 'var(--coral)' : 'var(--yellow)'}>
              {s.label.toUpperCase()}
            </text>
          </g>
        );
      })}
      <g className={`vg-step ${leaders ? 'is-on' : ''}`}>
        {CHAIN_STAGES.flatMap((s, i) =>
          (PROJECT_FOR_STAGE[s.id] ?? []).map((pid) => {
            const pp = parcel(pid).pos!;
            const cp = CHAIN_POS[i]!;
            return <line key={`${s.id}-${pid}`} x1={cp.x} y1={cp.y + 12} x2={pp.x} y2={pp.y - 110} stroke="var(--muted)" strokeWidth={1} strokeDasharray="3 7" />;
          }),
        )}
      </g>
    </g>
  );
}
