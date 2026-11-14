import { useEffect, useRef } from 'react';
import { camera } from '../lib/camera';
import { WORLD, GRID, COL_W, SCALE_LABELS, DISTRICTS } from '../data/atlas';
import { SCENES } from '../data/scenes';
import { useAppState } from '../state/store';
import { ResearchRoute } from './ResearchRoute';
import { CampusAwards } from './CampusAwards';
import { FoundationCluster } from './FoundationCluster';
import { Parcels } from './Parcels';
import { PMGVignette } from './vignettes/PMGVignette';
import { ZLAVignette } from './vignettes/ZLAVignette';
import { VCMVignette } from './vignettes/VCMVignette';
import { EMAVignette } from './vignettes/EMAVignette';
import { SynthesisChain } from './SynthesisChain';
import { PhDSite } from './PhDSite';
import { GenEnvTerritory } from './GenEnvTerritory';
import { OpeningTitle } from './OpeningTitle';

/** Which map layers stay bright in which scene (everything else drops to quiet context). */
const BRIGHT: Record<string, string[]> = {
  opening: ['*'],
  trajectory: ['foundations', 'route'],
  foundation: ['cluster', 'route'],
  pmg: ['pmg'],
  zla: ['zla'],
  vcm: ['vcm'],
  ema: ['ema'],
  synthesis: ['pmg', 'zla', 'vcm', 'ema', 'chain'],
  phd: ['phd'],
  genenv: ['genenv', 'route'],
  conversation: ['*'],
  'appendix-links': ['*'],
};

function dimmed(layer: string, sceneId: string): boolean {
  const bright = BRIGHT[sceneId] ?? ['*'];
  return !(bright.includes('*') || bright.includes(layer));
}

export function AtlasMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const sceneIndex = useAppState((s) => s.sceneIndex);
  const scene = SCENES[sceneIndex] ?? SCENES[0]!;

  useEffect(() => {
    if (svgRef.current) camera.attach(svgRef.current);
    const onResize = () => camera.measure();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const dim = (layer: string) => dimmed(layer, scene.id);

  return (
    <div className="atlas-stage" aria-hidden={false}>
      <svg
        ref={svgRef}
        role="img"
        aria-label="Parametric research atlas: a mapped territory of Roman Jahandideh's research, from foundations in architecture and landscape, through four computational urban-design prototypes, to a proposed PhD on performance provenance, beside an attributed GenEnv research territory."
      >
        <Defs />

        {/* ── Construction grid (quiet) ── */}
        <rect x={-800} y={-800} width={WORLD.w + 1600} height={WORLD.h + 1600} fill="url(#grid24)" />
        <rect x={-800} y={-800} width={WORLD.w + 1600} height={WORLD.h + 1600} fill="url(#grid96)" />
        <rect x={0} y={0} width={WORLD.w} height={WORLD.h} fill="none" stroke="var(--line-major)" strokeWidth={1.4} />
        <CoordinateLabels />

        {/* ── Semantic frame: one clean axis each way ── */}
        <g className="map-layer">
          <rect x={GRID.x0} y={GRID.y0} width={GRID.x1 - GRID.x0} height={GRID.y1 - GRID.y0} fill="none" stroke="var(--line-major)" strokeWidth={1} strokeDasharray="20 14" opacity={0.55} />
          {SCALE_LABELS.map((l, i) => (
            <text key={l} x={GRID.x0 + (i + 0.5) * COL_W} y={GRID.y1 + 56} textAnchor="middle" fontSize={16} className="map-label">
              {l}
            </text>
          ))}
          <line x1={GRID.x0} y1={GRID.y1 + 86} x2={GRID.x1} y2={GRID.y1 + 86} stroke="var(--muted)" strokeWidth={1} markerEnd="url(#arrowMuted)" opacity={0.6} />
          <text x={GRID.x0} y={GRID.y1 + 112} fontSize={12} className="map-coord">
            SPATIAL SCALE →
          </text>
          <line x1={GRID.x0 - 56} y1={GRID.y1} x2={GRID.x0 - 56} y2={GRID.y0} stroke="var(--muted)" strokeWidth={1} markerEnd="url(#arrowMuted)" opacity={0.6} />
          <text
            x={GRID.x0 - 70}
            y={GRID.y0 + (GRID.y1 - GRID.y0) / 2}
            textAnchor="middle"
            fontSize={12}
            className="map-coord"
            transform={`rotate(-90 ${GRID.x0 - 70} ${GRID.y0 + (GRID.y1 - GRID.y0) / 2})`}
          >
            COMPUTATIONAL AGENCY →
          </text>
        </g>

        {/* ── Districts ── */}
        {DISTRICTS.map((d) => (
          <g key={d.id} className="map-layer" data-dim={dim(d.id === 'foundations' ? 'foundations' : d.id)}>
            <polygon
              points={d.points.map((p) => `${p.x},${p.y}`).join(' ')}
              fill={d.id === 'genenv' ? 'rgba(242,207,85,0.03)' : d.id === 'phd' ? 'rgba(242,207,85,0.02)' : 'rgba(11,50,102,0.10)'}
              stroke={d.id === 'phd' ? 'var(--yellow)' : d.id === 'genenv' ? 'var(--muted)' : 'var(--line-major)'}
              strokeWidth={d.id === 'genenv' ? 2 : 1.3}
              strokeDasharray={d.id === 'phd' ? '3 10' : d.id === 'genenv' ? undefined : '18 10'}
            />
            {d.id === 'genenv' && (
              <polygon points={d.points.map((p) => `${p.x},${p.y}`).join(' ')} fill="none" stroke="var(--muted)" strokeWidth={0.8} transform="translate(7,7)" />
            )}
            <text x={d.labelPos.x} y={d.labelPos.y} fontSize={15} className="district-label">
              {d.name}
            </text>
            {d.note && (
              <text x={d.labelPos.x} y={d.labelPos.y + 24} fontSize={12} className={d.id === 'genenv' ? 'district-note' : 'map-coord'}>
                {d.note.toUpperCase()}
              </text>
            )}
          </g>
        ))}

        <NorthMarker />
        <ScaleBar />

        {/* ── Content layers ── */}
        <g className="map-layer" data-dim={dim('route')}>
          <ResearchRoute />
        </g>
        <g className="map-layer" data-dim={dim('foundations')}>
          <CampusAwards />
        </g>
        <g className="map-layer" data-dim={dim('cluster')}>
          <FoundationCluster />
        </g>
        <g className="map-layer" data-dim={dim('chain')} data-hide={!['synthesis', 'conversation', 'appendix-links'].includes(scene.id)}>
          <SynthesisChain />
        </g>
        <Parcels dim={dim} />
        <g className="map-layer" data-dim={dim('pmg')}>
          <PMGVignette />
        </g>
        <g className="map-layer" data-dim={dim('zla')}>
          <ZLAVignette />
        </g>
        <g className="map-layer" data-dim={dim('vcm')}>
          <VCMVignette />
        </g>
        <g className="map-layer" data-dim={dim('ema')}>
          <EMAVignette />
        </g>
        <g className="map-layer" data-dim={dim('phd')}>
          <PhDSite />
        </g>
        <g className="map-layer" data-dim={dim('genenv')}>
          <GenEnvTerritory />
        </g>
        <OpeningTitle />
      </svg>
    </div>
  );
}

function Defs() {
  return (
    <defs>
      <pattern id="grid24" width={24} height={24} patternUnits="userSpaceOnUse">
        <path d="M24 0H0V24" fill="none" stroke="var(--line-fine)" strokeWidth={0.6} />
      </pattern>
      <pattern id="grid96" width={96} height={96} patternUnits="userSpaceOnUse">
        <path d="M96 0H0V96" fill="none" stroke="var(--line-major)" strokeWidth={0.7} opacity={0.45} />
      </pattern>
      <pattern id="hatchOrange" width={9} height={9} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1={0} y1={0} x2={0} y2={9} stroke="var(--orange)" strokeWidth={1.4} opacity={0.65} />
      </pattern>
      <pattern id="hatchGrey" width={9} height={9} patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
        <line x1={0} y1={0} x2={0} y2={9} stroke="var(--muted)" strokeWidth={1} opacity={0.4} />
      </pattern>
      <marker id="arrowYellow" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={7} markerHeight={7} orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="var(--yellow)" />
      </marker>
      <marker id="arrowCyan" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={7} markerHeight={7} orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="var(--cyan)" />
      </marker>
      <marker id="arrowMuted" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={6} markerHeight={6} orient="auto-start-reverse">
        <path d="M0 0L10 5L0 10z" fill="var(--muted)" />
      </marker>
    </defs>
  );
}

function CoordinateLabels() {
  const cols = 10;
  const rows = 6;
  const cw = WORLD.w / cols;
  const rh = WORLD.h / rows;
  return (
    <g>
      {Array.from({ length: cols }, (_, i) => (
        <text key={`t${i}`} x={cw * (i + 0.5)} y={-26} textAnchor="middle" fontSize={14} className="map-coord">
          {String.fromCharCode(65 + i)}
        </text>
      ))}
      {Array.from({ length: rows }, (_, i) => (
        <text key={`l${i}`} x={-30} y={rh * (i + 0.5) + 5} textAnchor="middle" fontSize={14} className="map-coord">
          {String(i + 1).padStart(2, '0')}
        </text>
      ))}
    </g>
  );
}

function NorthMarker() {
  return (
    <g transform={`translate(${WORLD.w - 130},110)`} className="map-layer">
      <circle r={44} fill="none" stroke="var(--line-major)" strokeWidth={1.2} />
      <path d="M0 26 L0 -30" stroke="var(--muted)" strokeWidth={1.4} markerEnd="url(#arrowMuted)" />
      <text y={-52} textAnchor="middle" fontSize={15} className="map-label map-label--bright">
        N
      </text>
      <text y={70} textAnchor="middle" fontSize={11} className="map-coord">
        RESEARCH ORIENTATION
      </text>
    </g>
  );
}

function ScaleBar() {
  return (
    <g transform={`translate(140,${WORLD.h - 70})`} className="map-layer">
      <line x1={0} y1={0} x2={192} y2={0} stroke="var(--muted)" strokeWidth={2} />
      {[0, 96, 192].map((x) => (
        <line key={x} x1={x} y1={-5} x2={x} y2={5} stroke="var(--muted)" strokeWidth={1.6} />
      ))}
      <rect x={0} y={-4} width={96} height={4} fill="var(--muted)" opacity={0.55} />
      <text x={0} y={24} fontSize={12} className="map-coord">
        0
      </text>
      <text x={96} y={24} fontSize={12} className="map-coord" textAnchor="middle">
        96
      </text>
      <text x={192} y={24} fontSize={12} className="map-coord" textAnchor="middle">
        192 u
      </text>
    </g>
  );
}
