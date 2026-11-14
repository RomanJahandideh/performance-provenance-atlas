import { useSceneP, win } from '../useSceneP';

/**
 * The corridor study runs itself as the scroll advances: the ceiling draws, the
 * flat-cap building rises, the floor-by-floor trim recovers area, and the
 * footprint sweeps its seven orientations. Numbers are the repository's.
 */
export function VCMVignette() {
  const p = useSceneP('vcm');
  const on = p >= 0;
  if (!on) return null;

  const ceil = on ? win(p, 0.02, 0.16) : 1; // ceiling draw
  const flat = on ? win(p, 0.2, 0.32) : 0; // flat-cap building rise
  const t = on ? win(p, 0.4, 0.6) : 1; // flat → floor-by-floor
  const rotT = on ? win(p, 0.64, 0.84) : 0.5;
  const rotDeg = Math.round(rotT * 90);
  const evid = !on || p >= 0.86;

  // Section frame (world coords; wrapper shifts the original drawing)
  const gx0 = 2520;
  const gx1 = 4080;
  const ground = 2140;
  const ceil0 = 2090;
  const ceil1 = 1700;
  const siteX0 = 3540;
  const siteX1 = 3930;
  const ceilAt = (x: number) => ceil0 + ((x - gx0) / (gx1 - gx0)) * (ceil1 - ceil0);
  const flatY = ceilAt(siteX0);
  const floorsFlat = 10;
  const floorsTrim = 18;
  const fh = (ground - flatY) / floorsFlat;
  const strips = 8;
  const stripW = (siteX1 - siteX0) / strips;
  const flatH = (ground - flatY) * Math.max(0.04, flat);

  return (
    <g aria-hidden transform="translate(-280,-340)">
      <text x={gx0} y={1505} fontSize={12} className="map-coord">
        SECTION · PROTECTED VIEW CORRIDOR — CREEKSIDE PARK, VIEW J1 (CITY OPEN DATA)
      </text>

      {/* evidence-state list */}
      <g className={`vg-step ${evid ? 'is-on' : ''}`} transform="translate(2520,1565)" fontSize={11}>
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

      {/* sloped ceiling draws in */}
      <g style={{ opacity: ceil > 0 ? 1 : 0 }}>
        <line x1={gx0} y1={ceil0} x2={gx0 + (gx1 - gx0) * ceil} y2={ceil0 + (ceil1 - ceil0) * ceil} stroke="var(--yellow)" strokeWidth={2} />
        {ceil > 0.9 && (
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
        )}
        <g className={`vg-step ${evid ? 'is-on' : ''}`} transform={`translate(${gx0 + 580},${ceilAt(gx0 + 580) + 18})`}>
          <rect width={226} height={26} fill="url(#hatchOrange)" fillOpacity={0.35} stroke="var(--orange)" strokeWidth={1.1} />
          <text x={9} y={17} fontSize={10.5} className="map-coord" fill="var(--orange)">
            ELEVATION VALUES: PLACEHOLDER
          </text>
        </g>
      </g>

      {/* flat-cap line */}
      <g style={{ opacity: flat > 0.5 ? Math.max(0.25, 1 - t * 0.75) : 0, transition: 'opacity .3s' }}>
        <line x1={siteX0 - 40} y1={flatY} x2={siteX1 + 40} y2={flatY} stroke="var(--muted)" strokeWidth={1.4} strokeDasharray="12 7" />
        <text x={siteX0 - 48} y={flatY + 4} fontSize={11} className="map-annotation" fill="var(--muted)" textAnchor="end">
          flat cap at lowest corridor elevation
        </text>
      </g>

      {/* building: flat-cap rise, then floor-by-floor recovery */}
      <g style={{ opacity: flat > 0 ? 1 : 0 }}>
        <g style={{ opacity: 1 - t }}>
          <rect x={siteX0} y={ground - flatH} width={siteX1 - siteX0} height={flatH} fill="rgba(237,242,247,0.10)" stroke="var(--geom)" strokeWidth={1.3} />
          {Array.from({ length: floorsFlat - 1 }, (_, i) =>
            (i + 1) * fh < flatH ? (
              <line key={i} x1={siteX0} y1={ground - (i + 1) * fh} x2={siteX1} y2={ground - (i + 1) * fh} stroke="var(--geom)" strokeWidth={0.6} strokeOpacity={0.5} />
            ) : null,
          )}
        </g>
        <g style={{ opacity: t }}>
          {Array.from({ length: strips }, (_, i) => {
            const x = siteX0 + i * stripW;
            const yFull = ceilAt(x + stripW);
            const yTop = flatY + (yFull - flatY) * t;
            return <rect key={i} x={x} y={yTop} width={stripW} height={ground - yTop} fill="rgba(112,215,206,0.14)" stroke="var(--cyan)" strokeWidth={1.1} />;
          })}
          {Array.from({ length: floorsTrim - 1 }, (_, i) => {
            const y = ground - ((i + 1) * (ground - ceilAt(siteX1))) / floorsTrim;
            const xAtCeil = gx0 + ((y - ceil0) / (ceil1 - ceil0)) * (gx1 - gx0);
            const x2 = Math.min(siteX1, Math.max(siteX0, xAtCeil));
            return y > ceilAt(siteX1) - 2 ? <line key={i} x1={siteX0} y1={y} x2={x2} y2={y} stroke="var(--cyan)" strokeWidth={0.6} strokeOpacity={0.55 * t} /> : null;
          })}
        </g>
        {/* live floor counter beside the site */}
        <g transform={`translate(${siteX1 + 24},${ceilAt(siteX1) + 60})`} fontSize={13}>
          <text className="map-annotation" fill={t > 0.5 ? 'var(--cyan)' : 'var(--ink-dim)'}>
            {Math.round(floorsFlat + (floorsTrim - floorsFlat) * t)} floors
          </text>
          <text y={22} className="map-annotation" fill={t > 0.5 ? 'var(--cyan)' : 'var(--ink-dim)'}>
            {Math.round(18360 + (25608 - 18360) * t).toLocaleString()} m²
          </text>
          <text y={50} className="map-annotation" fill="var(--yellow)" style={{ opacity: t }}>
            +{(39.5 * t).toFixed(1)}% GFA
          </text>
        </g>
      </g>

      {/* rotation sweep */}
      <g className={`vg-step ${!on || p >= 0.62 ? 'is-on' : ''}`} transform="translate(3430,1500)">
        <text fontSize={11.5} className="map-coord">
          ROTATION · 7 ORIENTATIONS (0°–90°) — SCHEMATIC OF REPORTED RESULT
        </text>
        <g transform="translate(46,96)">
          <rect x={-30} y={-21} width={60} height={42} fill="rgba(237,242,247,0.10)" stroke="var(--geom)" strokeWidth={1.2} transform={`rotate(${rotDeg})`} />
          <text y={62} textAnchor="middle" fontSize={11} className="map-coord">
            {rotDeg}°
          </text>
        </g>
        <g transform="translate(130,34)">
          <line x1={0} y1={92} x2={260} y2={92} stroke="var(--line-major)" strokeWidth={1} />
          {Array.from({ length: 7 }, (_, i) => (
            <line key={i} x1={(i * 260) / 6} y1={92} x2={(i * 260) / 6} y2={96} stroke="var(--muted)" strokeWidth={1} />
          ))}
          <rect x={0} y={22} width={260 * Math.max(0.08, rotT)} height={4} fill="rgba(112,215,206,0.4)" />
          <text x={266} y={29} fontSize={10.5} className="map-annotation" fill="var(--cyan)">
            GFA Δ 0.02%
          </text>
          <path d={`M0 50 H150 V62 H260`} fill="none" stroke="var(--geom)" strokeWidth={1.4} strokeDasharray={260} strokeDashoffset={260 * (1 - rotT)} />
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
