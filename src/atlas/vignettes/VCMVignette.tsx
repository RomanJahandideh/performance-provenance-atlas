import { useAppState } from '../../state/store';

/**
 * Section through the Creekside Park J1 corridor study.
 * Geometry is schematic; the numbers are the repository's verified results.
 */
export function VCMVignette({ active }: { active: boolean }) {
  const step = useAppState((s) => s.stepIndex);
  const sceneIndex = useAppState((s) => s.sceneIndex);
  const method = useAppState((s) => s.ix.vcmMethod); // 0 flat … 1 floor-by-floor
  const rot = useAppState((s) => s.ix.vcmRot); // 0..6
  if (!active) return null;
  const inScene = sceneIndex === 5;
  const on = (n: number) => !inScene || step >= n;
  const t = inScene && step < 1 ? 0 : method;

  // Section frame (world coords)
  const gx0 = 2520; // viewpoint x
  const gx1 = 4080; // far x
  const ground = 2140;
  const ceil0 = 2090; // ceiling at viewpoint
  const ceil1 = 1700; // ceiling at far end
  const siteX0 = 3540;
  const siteX1 = 3930;
  const ceilAt = (x: number) => ceil0 + ((x - gx0) / (gx1 - gx0)) * (ceil1 - ceil0);
  const flatY = ceilAt(siteX0); // lowest corridor elevation over the site
  const floorsFlat = 10;
  const floorsTrim = 18;
  const fh = (ground - flatY) / floorsFlat;
  const strips = 8;
  const stripW = (siteX1 - siteX0) / strips;

  return (
    <g aria-hidden>
      <text x={gx0} y={1505} fontSize={12} className="map-coord">
        SECTION · PROTECTED VIEW CORRIDOR — CREEKSIDE PARK, VIEW J1 (CITY OPEN DATA)
      </text>

      {/* evidence-state list (top left) */}
      <g className={`vg-step ${on(3) ? 'is-on' : ''}`} transform="translate(2520,1565)" fontSize={11}>
        <text className="map-annotation" fill="var(--geom)">
          ■ corridor plan geometry — real City open data
        </text>
        <text y={20} className="map-annotation" fill="var(--cyan)">
          ■ clipping + floor arithmetic — deterministic, tested
        </text>
        <text y={40} className="map-annotation" fill="var(--orange)">
          ▨ BASE_ELEV_M · SLOPE — placeholder values
        </text>
        <text y={60} className="map-annotation" fill="var(--muted)">
          ╌ Grasshopper final step — written, not executed (no Rhino)
        </text>
        <text y={80} className="map-annotation" fill="var(--muted)">
          AI interprets these verified results — it never calculates them
        </text>
      </g>

      {/* ground + viewpoint */}
      <line x1={gx0 - 60} y1={ground} x2={gx1 + 40} y2={ground} stroke="var(--geom)" strokeWidth={1.6} />
      <g transform={`translate(${gx0},${ground - 14})`}>
        <circle r={10} fill="none" stroke="var(--yellow)" strokeWidth={1.8} />
        <circle r={3} fill="var(--yellow)" />
        <text x={18} y={4} fontSize={11} className="map-coord">
          PROTECTED VIEWPOINT
        </text>
      </g>

      {/* sloped ceiling */}
      <g className={`vg-step ${on(0) ? 'is-on' : ''}`}>
        <line x1={gx0} y1={ceil0} x2={gx1} y2={ceil1} stroke="var(--yellow)" strokeWidth={2} />
        <text
          x={gx0 + 360}
          y={ceilAt(gx0 + 360) - 14}
          fontSize={11.5}
          className="map-annotation"
          fill="var(--yellow)"
          transform={`rotate(-14 ${gx0 + 360} ${ceilAt(gx0 + 360) - 14})`}
        >
          corridor ceiling — rises with distance from the viewpoint
        </text>
        <g className={`vg-step ${on(3) ? 'is-on' : ''}`} transform={`translate(${gx0 + 580},${ceilAt(gx0 + 580) + 18})`}>
          <rect width={226} height={26} fill="url(#hatchOrange)" fillOpacity={0.35} stroke="var(--orange)" strokeWidth={1.1} />
          <text x={9} y={17} fontSize={10.5} className="map-coord" fill="var(--orange)">
            ELEVATION VALUES: PLACEHOLDER
          </text>
        </g>
      </g>

      {/* flat-cap line */}
      <g className={`vg-step ${on(1) ? 'is-on' : ''}`} style={{ opacity: on(1) ? Math.max(0.25, 1 - t * 0.75) : 0 }}>
        <line x1={siteX0 - 40} y1={flatY} x2={siteX1 + 40} y2={flatY} stroke="var(--muted)" strokeWidth={1.4} strokeDasharray="12 7" />
        <text x={siteX0 - 48} y={flatY + 4} fontSize={11} className="map-annotation" fill="var(--muted)" textAnchor="end">
          flat cap at lowest corridor elevation
        </text>
      </g>

      {/* building mass: crossfade flat ↔ trimmed */}
      <g className={`vg-step ${on(1) ? 'is-on' : ''}`}>
        <g style={{ opacity: 1 - t, transition: 'opacity .2s linear' }}>
          <rect x={siteX0} y={flatY} width={siteX1 - siteX0} height={ground - flatY} fill="rgba(237,242,247,0.10)" stroke="var(--geom)" strokeWidth={1.3} />
          {Array.from({ length: floorsFlat - 1 }, (_, i) => (
            <line key={i} x1={siteX0} y1={ground - (i + 1) * fh} x2={siteX1} y2={ground - (i + 1) * fh} stroke="var(--geom)" strokeWidth={0.6} strokeOpacity={0.5} />
          ))}
        </g>
        <g style={{ opacity: t, transition: 'opacity .2s linear' }}>
          {Array.from({ length: strips }, (_, i) => {
            const x = siteX0 + i * stripW;
            const yTop = ceilAt(x + stripW);
            return <rect key={i} x={x} y={yTop} width={stripW} height={ground - yTop} fill="rgba(112,215,206,0.14)" stroke="var(--cyan)" strokeWidth={1.1} />;
          })}
          {Array.from({ length: floorsTrim - 1 }, (_, i) => {
            const y = ground - ((i + 1) * (ground - ceilAt(siteX1))) / floorsTrim;
            const xAtCeil = gx0 + ((y - ceil0) / (ceil1 - ceil0)) * (gx1 - gx0);
            const x2 = Math.min(siteX1, Math.max(siteX0, xAtCeil));
            return <line key={i} x1={siteX0} y1={y} x2={x2} y2={y} stroke="var(--cyan)" strokeWidth={0.6} strokeOpacity={0.55} />;
          })}
        </g>
      </g>

      {/* measured annotation (right of the site) */}
      <g className={`vg-step ${on(1) ? 'is-on' : ''}`} transform={`translate(${siteX1 + 24},${ceilAt(siteX1) + 60})`} fontSize={12.5}>
        <text className="map-annotation" fill="var(--muted)" style={{ opacity: 1 - t }}>
          10 floors
        </text>
        <text y={20} className="map-annotation" fill="var(--muted)" style={{ opacity: 1 - t }}>
          18,360 m²
        </text>
        <g style={{ opacity: t }}>
          <text className="map-annotation" fill="var(--cyan)">
            18 floors
          </text>
          <text y={20} className="map-annotation" fill="var(--cyan)">
            25,608 m²
          </text>
          <text y={48} className="map-annotation" fill="var(--yellow)">
            +39.5% GFA
          </text>
        </g>
      </g>

      {/* rotation study inset (top right, above the ceiling line) */}
      <g className={`vg-step ${on(2) ? 'is-on' : ''}`} transform="translate(3430,1500)">
        <text fontSize={11.5} className="map-coord">
          ROTATION · 7 ORIENTATIONS (0°–90°) — SCHEMATIC OF REPORTED RESULT
        </text>
        <g transform="translate(46,96)">
          <rect x={-30} y={-21} width={60} height={42} fill="rgba(237,242,247,0.10)" stroke="var(--geom)" strokeWidth={1.2} transform={`rotate(${rot * 15})`} style={{ transition: 'transform .35s var(--ease)' }} />
          <text y={62} textAnchor="middle" fontSize={11} className="map-coord">
            {rot * 15}°
          </text>
        </g>
        <g transform="translate(130,34)">
          <line x1={0} y1={92} x2={260} y2={92} stroke="var(--line-major)" strokeWidth={1} />
          {Array.from({ length: 7 }, (_, i) => (
            <line key={i} x1={(i * 260) / 6} y1={92} x2={(i * 260) / 6} y2={96} stroke="var(--muted)" strokeWidth={1} />
          ))}
          <rect x={0} y={22} width={260} height={4} fill="rgba(112,215,206,0.4)" />
          <text x={266} y={29} fontSize={10.5} className="map-annotation" fill="var(--cyan)">
            GFA Δ 0.02%
          </text>
          <path d={`M0 50 H150 V62 H260`} fill="none" stroke="var(--geom)" strokeWidth={1.4} />
          <text x={266} y={58} fontSize={10.5} className="map-annotation">
            floors 18 → 17
          </text>
          <text x={0} y={116} fontSize={10} className="map-coord">
            LINEAR CEILING → VOLUME FOLLOWS FOOTPRINT AREA + CENTROID
          </text>
        </g>
      </g>
    </g>
  );
}
