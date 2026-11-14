import { GENENV_ITEMS } from '../data/atlas';
import { StatusGeometry } from './StatusGeometry';
import { useAppState } from '../state/store';

/** D-05: attributed GenEnv work — a neighbouring territory, never presented as mine. */
export function GenEnvTerritory({ active }: { active: boolean }) {
  const step = useAppState((s) => s.stepIndex);
  const sceneIndex = useAppState((s) => s.sceneIndex);
  const inScene = sceneIndex === 9;
  const on = (n: number) => !inScene || step >= n;

  return (
    <g>
      {/* NSERC banner */}
      <g className={`vg-step ${!inScene || on(0) ? 'is-on' : ''}`} transform="translate(4570,1478)">
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

      {GENENV_ITEMS.map((it) => (
        <g key={it.id} transform={`translate(${it.pos.x},${it.pos.y})`} className={`vg-step ${!inScene || on(0) ? 'is-on' : ''}`}>
          <StatusGeometry status="external-funded" w={84} d={64} h={44} />
          <text y={-74} textAnchor="middle" fontSize={12.5} className="map-label map-label--bright">
            {it.title.toUpperCase()}
          </text>
          <text y={64} textAnchor="middle" fontSize={9.5} className="map-coord">
            {it.attribution.toUpperCase()}
          </text>
        </g>
      ))}

      {/* alignment connector from my provenance site toward the territory, drawn as provisional */}
      <g className={`vg-step ${inScene && on(0) ? 'is-on' : ''}`}>
        <line x1={3470} y1={1000} x2={4370} y2={900} stroke="var(--proposal)" strokeWidth={1.6} strokeDasharray="8 8" markerEnd="url(#arrowMuted)" />
        <text x={3920} y={930} textAnchor="middle" fontSize={10.5} className="map-coord" fill="var(--proposal)">
          PROPOSED CONTRIBUTION — WITHIN THE FUNDED PROGRAM
        </text>
      </g>

      {active && (
        <text x={4570} y={200} textAnchor="middle" fontSize={11} className="district-note">
          EXTERNAL ATTRIBUTED RESEARCH — GENENV LAB / PARTNERS
        </text>
      )}
    </g>
  );
}
