import { PARCELS } from '../data/projects';
import { axesToWorld } from '../data/atlas';
import { useAppState } from '../state/store';
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

/** Research parcels (the PhD site is drawn by PhDSite). No interaction — the scroll presents them. */
export function Parcels({ dim }: { dim: (layer: string) => boolean }) {
  const sceneIndex = useAppState((s) => s.sceneIndex);
  const sceneId = SCENES[sceneIndex]?.id;
  // These scenes replace the parcel's standard drawing with a full vignette.
  const hidden = sceneId === 'vcm' || sceneId === 'zla' ? sceneId : null;

  return (
    <g aria-hidden>
      {PARCELS.filter((p) => p.id !== 'phd' && p.id !== hidden).map((p) => {
        const pos = p.pos ?? axesToWorld(p.spatialScale, p.computationalAgency);
        const layer = ['ecaade', 'iss', 'bioterrarium'].includes(p.id) ? 'cluster' : p.id;
        const h = 24 + p.evidenceMaturity * 13;
        return (
          <g key={p.id} className="map-layer" data-dim={dim(layer)} transform={`translate(${pos.x},${pos.y})`}>
            <StatusGeometry status={p.status} h={h} label={STATUS_SHORT[p.status]} />
            <text y={-h - 46} textAnchor="middle" fontSize={17} className="map-label map-label--bright" style={{ letterSpacing: '0.1em' }}>
              {p.title.toUpperCase()}
            </text>
            <text y={-h - 26} textAnchor="middle" fontSize={12} className="map-coord">
              {p.kicker.toUpperCase()}
            </text>
          </g>
        );
      })}
    </g>
  );
}
