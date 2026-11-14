import { useAppState } from '../state/store';
import { SCENES } from '../data/scenes';

/** The title as a site designation on the map, not a floating hero heading. */
export function OpeningTitle() {
  const sceneIndex = useAppState((s) => s.sceneIndex);
  const stepIndex = useAppState((s) => s.stepIndex);
  const explore = useAppState((s) => s.mode === 'explore');
  const scene = SCENES[sceneIndex] ?? SCENES[0]!;
  const big = scene.id === 'opening' && (stepIndex >= 2 || explore);

  return (
    <g className="map-layer" transform="translate(2400,70)" aria-hidden data-dim={false}>
      <g style={{ opacity: scene.id === 'opening' || scene.id === 'conversation' ? 1 : 0.45, transition: 'opacity .6s var(--ease)' }}>
        <line x1={-560} y1={18} x2={-290} y2={18} stroke="var(--yellow)" strokeWidth={1.4} />
        <line x1={290} y1={18} x2={560} y2={18} stroke="var(--yellow)" strokeWidth={1.4} />
        <text textAnchor="middle" y={-12} fontSize={14} className="map-coord">
          SITE DESIGNATION · RESEARCH TERRITORY OF ROMAN JAHANDIDEH
        </text>
        <text textAnchor="middle" y={30} fontSize={big ? 42 : 36} className="map-label map-label--bright" style={{ letterSpacing: '0.26em', transition: 'font-size .5s var(--ease)' }}>
          PERFORMANCE PROVENANCE
        </text>
        <text textAnchor="middle" y={58} fontSize={13.5} className="map-coord">
          EVIDENCE-BEARING HUMAN–AI CO-DESIGN FOR PERFORMANCE-AWARE CONSTRUCTED ENVIRONMENTS
        </text>
      </g>
    </g>
  );
}
