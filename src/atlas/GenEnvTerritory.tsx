import { GENENV_ITEMS } from '../data/atlas';
import { StatusGeometry } from './StatusGeometry';
import { useSceneP, win } from './useSceneP';

/** D-04: attributed GenEnv work — a neighbouring territory, never presented as mine. */
export function GenEnvTerritory() {
  const p = useSceneP('genenv');
  const on = p >= 0;
  const itemOn = (i: number) => !on || p >= 0.04 + i * 0.1;
  const connector = !on || p >= 0.52;

  return (
    <g aria-hidden>
      {/* NSERC banner */}
      <g className={`vg-step ${!on || p >= 0.04 ? 'is-on' : ''}`} transform="translate(4570,1478)">
        <rect x={-172} y={-30} width={344} height={62} fill="rgba(242,207,85,0.07)" stroke="var(--yellow)" strokeWidth={1.3} />
        <text textAnchor="middle" y={-8} fontSize={10.5} className="map-coord" fill="var(--yellow)">
          NSERC DISCOVERY · 2026 · 5-YEAR TERM · LIU, XUN · UBC SALA
        </text>
        <text textAnchor="middle" y={10} fontSize={9.5} className="map-coord">
          “HUMAN-AI CO-DESIGN FRAMEWORK FOR
        </text>
        <text textAnchor="middle" y={24} fontSize={9.5} className="map-coord">
          PERFORMANCE-AWARE CONSTRUCTED ENVIRONMENTS”
        </text>
      </g>

      {GENENV_ITEMS.map((it, i) => (
        <g key={it.id} transform={`translate(${it.pos.x},${it.pos.y})`} className={`vg-step ${itemOn(i) ? 'is-on' : ''}`}>
          <StatusGeometry status="external-funded" w={84} d={64} h={44} />
          <text y={-74} textAnchor="middle" fontSize={12.5} className="map-label map-label--bright">
            {it.title.toUpperCase()}
          </text>
          <text y={64} textAnchor="middle" fontSize={9.5} className="map-coord">
            {it.attribution.toUpperCase()}
          </text>
        </g>
      ))}

      {/* provisional connector from the proposed site into the program */}
      <g className={`vg-step ${connector ? 'is-on' : ''}`}>
        <line
          x1={4190}
          y1={930}
          x2={4190 + 190 * (on ? win(p, 0.52, 0.68) : 1)}
          y2={930 - 40 * (on ? win(p, 0.52, 0.68) : 1)}
          stroke="var(--proposal)"
          strokeWidth={1.6}
          strokeDasharray="8 8"
          markerEnd="url(#arrowMuted)"
        />
        <text x={4196} y={968} fontSize={10.5} className="map-coord" fill="var(--proposal)">
          PROPOSED CONTRIBUTION — WITHIN THE FUNDED PROGRAM
        </text>
      </g>
    </g>
  );
}
