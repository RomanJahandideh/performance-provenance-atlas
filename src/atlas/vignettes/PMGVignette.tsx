import { useSceneP, win } from '../useSceneP';
import { iso, pts, isoBoxFaces } from '../iso';

/** Representative R1-1 session data (README + portfolio; see PROJECT_EVIDENCE_AUDIT.md). */
const CONSTRAINTS = [
  { name: 'front setback', value: '4.9 m', conf: 3, srcd: true, plane: 'front' },
  { name: 'side setbacks', value: '1.2 m', conf: 3, srcd: true, plane: 'side' },
  { name: 'rear setback', value: '10.7 m', conf: 3, srcd: true, plane: 'rear' },
  { name: 'max height', value: '11.5 m · 3 st', conf: 3, srcd: true, plane: 'height' },
  { name: 'max FAR', value: '0.70 → 1.00*', conf: 3, srcd: true, plane: 'far' },
  { name: 'lot width', value: '10.0 m', conf: 0, srcd: false, plane: 'none' },
  { name: 'lot depth', value: '37.0 m', conf: 0, srcd: false, plane: 'none' },
  { name: 'floor-to-floor', value: 'system input', conf: 0, srcd: false, plane: 'none' },
] as const;

const K = 6.4;
const LOT_W = 10 * K;
const LOT_D = 37 * K;
const IN_F = 4.9 * K;
const IN_S = 1.2 * K;
const IN_R = 10.7 * K;
const BW = LOT_W - 2 * IN_S;
const BD = LOT_D - IN_F - IN_R;
const FLOOR_H = 3.83 * K;

/**
 * The scroll demonstrates the system: text parses row by row, the constraint
 * planes rise, the envelope extrudes floor by floor, the parcel turns irregular,
 * the block classifies, and the independent review stamps the result.
 */
export function PMGVignette() {
  const p = useSceneP('pmg');
  const on = p >= 0;
  if (!on) return null;
  const parse = on ? win(p, 0.03, 0.3) : 1;
  const planes = on ? win(p, 0.32, 0.46) : 1;
  const extrude = on ? win(p, 0.38, 0.56) : 1;
  const mode = !on ? 'lot' : p >= 0.72 ? 'block' : p >= 0.58 ? 'irregular' : 'lot';
  const activeRow = on && parse < 1 ? Math.min(7, Math.floor(parse * 8)) : -1;
  const review = !on || p >= 0.86;

  return (
    <g aria-hidden transform="translate(-200,210)">
      {/* ── Parsed constraint table ── */}
      <g transform="translate(1870,1010)">
        <text y={-16} fontSize={12} className="map-coord">
          PARSED TEXT → 8 STRUCTURED CONSTRAINTS · SOURCE PHRASE + CONFIDENCE
        </text>
        {CONSTRAINTS.map((c, i) => {
          const visible = !on || parse * 8 >= i + 0.5;
          const hi = i === activeRow || (planes > 0 && planes < 1 && c.plane !== 'none');
          return (
            <g key={c.name} transform={`translate(0,${i * 40})`} className={`vg-step ${visible ? 'is-on' : ''}`}>
              <rect width={360} height={34} fill={hi ? 'rgba(242,207,85,0.12)' : 'rgba(11,50,102,0.3)'} stroke={hi ? 'var(--yellow)' : 'var(--line-major)'} strokeWidth={hi ? 1.6 : 1} />
              <text x={12} y={22} fontSize={13} className="map-annotation">
                {c.name}
              </text>
              <text x={210} y={22} fontSize={13} className="map-annotation" fill={c.srcd ? 'var(--cyan)' : 'var(--muted)'}>
                {c.value}
              </text>
              {c.conf > 0 ? (
                <g transform="translate(330,11)">
                  {[0, 1, 2].map((b) => (
                    <rect key={b} x={b * 7} y={-(b + 1) * 3 + 12} width={5} height={(b + 1) * 3} fill={b < c.conf ? 'var(--yellow)' : 'rgba(152,167,184,0.3)'} />
                  ))}
                </g>
              ) : (
                <text x={352} y={22} fontSize={10} textAnchor="end" className="map-coord">
                  INPUT
                </text>
              )}
            </g>
          );
        })}
        <g className={`vg-step ${parse > 0.95 ? 'is-on' : ''}`}>
          <text y={8 * 40 + 20} fontSize={11} className="map-annotation" fill="var(--orange)">
            * FAR 0.70 → 1.00 under the rental / below-market condition (kept explicit)
          </text>
          <text y={8 * 40 + 38} fontSize={11} className="map-coord">
            SOURCED: VANCOUVER R1-1 PRESET · INPUTS ARE NOT BYLAW-SOURCED
          </text>
        </g>
      </g>

      {/* ── Envelope drawing ── */}
      <g transform="translate(3030,1180)">
        <text x={-130} y={-320} fontSize={12} className="map-coord" opacity={p >= 0.3 ? 1 : 0} style={{ transition: 'opacity .4s' }}>
          DETERMINISTIC ENVELOPE · HALF-PLANE CLIPPING
        </text>
        {mode !== 'block' ? (
          <Envelope irregular={mode === 'irregular'} planes={planes} extrude={extrude} fsr={p >= 0.52} />
        ) : (
          <UrbanBlock grow={on ? win(p, 0.72, 0.86) : 1} />
        )}
      </g>

      {/* ── Reviewer stamp ── */}
      <g className={`vg-step ${review ? 'is-on' : ''}`} transform="translate(2470,1090)">
        <circle cx={30} cy={26} r={34} fill="none" stroke="var(--cyan)" strokeWidth={1.6} strokeDasharray="8 6" />
        <text x={30} y={22} textAnchor="middle" fontSize={10} className="map-coord" fill="var(--cyan)">
          REVIEW
        </text>
        <text x={30} y={36} textAnchor="middle" fontSize={10} className="map-coord" fill="var(--cyan)">
          PASS
        </text>
        <text x={30} y={82} textAnchor="middle" fontSize={10.5} className="map-annotation">
          independent second call
        </text>
        <text x={30} y={98} textAnchor="middle" fontSize={10.5} className="map-annotation">
          text ↔ values ↔ massing
        </text>
      </g>
    </g>
  );
}

function Envelope({ irregular, planes, extrude, fsr }: { irregular: boolean; planes: number; extrude: number; fsr: boolean }) {
  const lot = irregular
    ? [iso(0, 0), iso(LOT_W, 0), iso(LOT_W, LOT_D * 0.72), iso(LOT_W * 0.55, LOT_D), iso(0, LOT_D)]
    : [iso(0, 0), iso(LOT_W, 0), iso(LOT_W, LOT_D), iso(0, LOT_D)];
  const bd = irregular ? BD * 0.82 : BD;
  const h = Math.max(4, FLOOR_H * 2 * extrude);
  const mass = isoBoxFaces(BW, bd, h);
  const third = isoBoxFaces(BW, bd, FLOOR_H * 3);

  return (
    <g>
      <polygon points={pts(lot)} fill="rgba(11,50,102,0.28)" stroke="var(--geom)" strokeWidth={1.4} />
      <g style={{ opacity: planes, transition: 'opacity .3s linear' }}>
        <Plane a={iso(0, IN_F)} b={iso(LOT_W, IN_F)} h={FLOOR_H * 2.4 * planes} color="var(--cyan)" label="front 4.9" />
        <Plane a={iso(IN_S, 0)} b={iso(IN_S, LOT_D)} h={FLOOR_H * 2.4 * planes} color="var(--cyan)" label="side 1.2" />
        <Plane a={iso(0, LOT_D - IN_R)} b={iso(LOT_W, LOT_D - IN_R)} h={FLOOR_H * 2.4 * planes} color="var(--cyan)" label="rear 10.7" />
      </g>
      <g transform={`translate(${iso(IN_S, IN_F).x},${iso(IN_S, IN_F).y})`}>
        <polygon points={mass.left} fill="rgba(237,242,247,0.14)" stroke="var(--geom)" strokeWidth={1.2} />
        <polygon points={mass.right} fill="rgba(237,242,247,0.26)" stroke="var(--geom)" strokeWidth={1.2} />
        <polygon points={mass.top} fill="rgba(112,215,206,0.18)" stroke="var(--geom)" strokeWidth={1.2} />
        {extrude > 0.55 && <polygon points={isoBoxFaces(BW, bd, FLOOR_H).top} fill="none" stroke="var(--geom)" strokeWidth={0.8} strokeOpacity={0.6} />}
        {extrude > 0.9 && !fsr && (
          <>
            <polygon points={third.top} fill="none" stroke="var(--muted)" strokeWidth={1.2} strokeDasharray="7 6" />
            <text x={iso(BW, bd * 0.4, FLOOR_H * 3 + 14).x} y={iso(BW, bd * 0.4, FLOOR_H * 3 + 14).y} fontSize={11} className="map-annotation" fill="var(--muted)">
              FSR 0.70 · 3rd storey headroom under the 11.5 m cap
            </text>
          </>
        )}
        {extrude > 0.9 && fsr && (
          <>
            {/* the rental condition adds the third storey: FSR 0.70 → 1.00 */}
            <polygon
              points={pts([iso(0, bd, FLOOR_H * 2), iso(BW, bd, FLOOR_H * 2), iso(BW, bd, FLOOR_H * 3), iso(0, bd, FLOOR_H * 3)])}
              fill="rgba(242,207,85,0.10)"
              stroke="var(--yellow)"
              strokeWidth={1.2}
            />
            <polygon
              points={pts([iso(BW, 0, FLOOR_H * 2), iso(BW, bd, FLOOR_H * 2), iso(BW, bd, FLOOR_H * 3), iso(BW, 0, FLOOR_H * 3)])}
              fill="rgba(242,207,85,0.16)"
              stroke="var(--yellow)"
              strokeWidth={1.2}
            />
            <polygon points={third.top} fill="rgba(242,207,85,0.22)" stroke="var(--yellow)" strokeWidth={1.2} />
            <text x={iso(BW, bd * 0.4, FLOOR_H * 3 + 14).x} y={iso(BW, bd * 0.4, FLOOR_H * 3 + 14).y} fontSize={11} className="map-annotation" fill="var(--yellow)">
              FSR 0.70 → 1.00 (rental condition) · +1 storey
            </text>
          </>
        )}
      </g>
      <g style={{ opacity: planes }}>
        <polygon
          points={pts([iso(0, 0, FLOOR_H * 3), iso(LOT_W, 0, FLOOR_H * 3), iso(LOT_W, LOT_D, FLOOR_H * 3), iso(0, LOT_D, FLOOR_H * 3)])}
          fill="rgba(112,215,206,0.06)"
          stroke="var(--cyan)"
          strokeWidth={1}
          strokeDasharray="12 8"
        />
      </g>
      {irregular && (
        <text x={iso(LOT_W * 0.6, LOT_D * 1.06).x} y={iso(LOT_W * 0.6, LOT_D * 1.06).y} fontSize={11} className="map-annotation" fill="var(--cyan)">
          irregular parcel — same verified clipping method
        </text>
      )}
    </g>
  );
}

function Plane({ a, b, h, color, label }: { a: { x: number; y: number }; b: { x: number; y: number }; h: number; color: string; label: string }) {
  return (
    <g>
      <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${b.x},${b.y - h} ${a.x},${a.y - h}`} fill="rgba(112,215,206,0.07)" stroke={color} strokeWidth={1} strokeDasharray="10 7" />
      <text x={a.x - 6} y={a.y - h - 8} fontSize={10.5} className="map-coord" fill={color}>
        {label}
      </text>
    </g>
  );
}

function UrbanBlock({ grow }: { grow: number }) {
  const uses = [
    ['res', 'res', 'com'],
    ['res', 'park', 'com'],
    ['res', 'res', 'admin'],
  ] as const;
  const color: Record<string, string> = {
    res: 'rgba(237,242,247,0.25)',
    com: 'rgba(112,215,206,0.3)',
    admin: 'rgba(137,167,255,0.3)',
    park: 'rgba(203,229,107,0.3)',
  };
  const stroke: Record<string, string> = { res: 'var(--geom)', com: 'var(--cyan)', admin: 'var(--proposal)', park: 'var(--lime)' };
  const cell = 74;
  return (
    <g transform="translate(-40,40)">
      {uses.flatMap((row, j) =>
        row.map((u, i) => {
          const base = u === 'park' ? 3 : u === 'com' ? 64 : u === 'admin' ? 86 : 44;
          const h = Math.max(2, base * Math.max(0.1, Math.min(1, grow * 1.4 - (i + j) * 0.08)));
          const f = isoBoxFaces(cell - 14, cell - 14, h);
          const o = iso(i * cell, j * cell);
          return (
            <g key={`${i}${j}`} transform={`translate(${o.x},${o.y})`}>
              <polygon points={f.left} fill={color[u]} fillOpacity={0.5} stroke={stroke[u]} strokeWidth={1} />
              <polygon points={f.right} fill={color[u]} fillOpacity={0.75} stroke={stroke[u]} strokeWidth={1} />
              <polygon points={f.top} fill={color[u]} stroke={stroke[u]} strokeWidth={1} />
            </g>
          );
        }),
      )}
      <text x={-470} y={150} fontSize={11.5} className="map-annotation">
        urban block mode — parcels AI-classified: residential · commercial · administrative · park
      </text>
      <text x={-470} y={170} fontSize={11} className="map-coord">
        GEOMETRY + AREAS REMAIN DETERMINISTIC PER PARCEL
      </text>
    </g>
  );
}
