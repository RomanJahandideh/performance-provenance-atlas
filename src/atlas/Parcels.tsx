import { PARCELS } from '../data/projects';
import { axesToWorld } from '../data/atlas';
import { setState, useAppState } from '../state/store';
import { StatusGeometry } from './StatusGeometry';
import { SCENES } from '../data/scenes';

const STATUS_SHORT: Record<string, string> = {
  published: 'PUBLISHED',
  accepted: 'ACCEPTED',
  'under-revision': 'UNDER REVISION',
  'verified-computation': 'VERIFIED COMPUTATION',
  implemented: 'PROTOTYPE',
  proposed: 'PROPOSED',
};

/** All research parcels except the PhD site (drawn by PhDSite with its spine). */
export function Parcels({ dim }: { dim: (layer: string) => boolean }) {
  const statusFilter = useAppState((s) => s.statusFilter);
  const mode = useAppState((s) => s.mode);
  const sceneIndex = useAppState((s) => s.sceneIndex);
  const sceneId = SCENES[sceneIndex]?.id;
  // These scenes replace the parcel's standard drawing with a full vignette.
  const hidden = mode === 'present' && (sceneId === 'vcm' || sceneId === 'zla') ? sceneId : null;

  return (
    <g>
      {PARCELS.filter((p) => p.id !== 'phd' && p.id !== hidden).map((p) => {
        const pos = p.pos ?? axesToWorld(p.spatialScale, p.computationalAgency);
        const filtered = mode === 'explore' && statusFilter.length > 0 && !statusFilter.includes(p.status);
        const layer = ['ecaade', 'iss', 'bioterrarium'].includes(p.id) ? 'cluster' : p.id;
        const h = 24 + p.evidenceMaturity * 13;
        return (
          <g key={p.id} className="map-layer" data-dim={dim(layer) || filtered} transform={`translate(${pos.x},${pos.y})`}>
            <g
              className="parcel"
              tabIndex={0}
              role="button"
              aria-label={`${p.title} — ${STATUS_SHORT[p.status] ?? p.status}. Open project sheet.`}
              onClick={() => setState({ sheetParcel: p.id })}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setState({ sheetParcel: p.id });
                }
              }}
            >
              <circle r={120} fill="transparent" className="parcel-hit" stroke="transparent" strokeWidth={2} />
              <StatusGeometry status={p.status} h={h} label={STATUS_SHORT[p.status]} />
              <text y={-h - 46} textAnchor="middle" fontSize={17} className="map-label map-label--bright" style={{ letterSpacing: '0.1em' }}>
                {p.title.toUpperCase()}
              </text>
              <text y={-h - 26} textAnchor="middle" fontSize={12} className="map-coord">
                {p.kicker.toUpperCase()}
              </text>
            </g>
          </g>
        );
      })}
    </g>
  );
}
