import { setIx, useAppState } from '../../state/store';
import { iso, pts, isoBoxFaces } from '../iso';

/** Representative R1-1 session data (README + portfolio; see PROJECT_EVIDENCE_AUDIT.md). */
export const PMG_CONSTRAINTS = [
  { name: 'front setback', value: '4.9 m', conf: 3, srcd: true, plane: 'front' },
  { name: 'side setbacks', value: '1.2 m', conf: 3, srcd: true, plane: 'side' },
  { name: 'rear setback', value: '10.7 m', conf: 3, srcd: true, plane: 'rear' },
  { name: 'max height', value: '11.5 m · 3 st', conf: 3, srcd: true, plane: 'height' },
  { name: 'max FAR', value: '0.70 → 1.00*', conf: 3, srcd: true, plane: 'far' },
  { name: 'lot width', value: '10.0 m', conf: 0, srcd: false, plane: 'none' },
  { name: 'lot depth', value: '37.0 m', conf: 0, srcd: false, plane: 'none' },
  { name: 'floor-to-floor', value: 'system input', conf: 0, srcd: false, plane: 'none' },
] as const;

const K = 6.4; // world units per plan metre
const LOT_W = 10 * K;
const LOT_D = 37 * K;
const IN_F = 4.9 * K;
const IN_S = 1.2 * K;
const IN_R = 10.7 * K;
const BW = LOT_W - 2 * IN_S; // buildable width
const BD = LOT_D - IN_F - IN_R; // buildable depth
const FLOOR_H = 3.83 * K; // 11.5 m / 3 storeys

export function PMGVignette({ active }: { active: boolean }) {
  const step = useAppState((s) => s.stepIndex);
  const sceneId = useAppState((s) => s.sceneIndex);
  const activeRow = useAppState((s) => s.ix.pmgActive);
  if (!active) return null;
  const on = (n: number) => step >= n || sceneId !== 3; // explore mode shows all
  const mode = step >= 4 ? 'block' : step === 3 ? 'irregular' : 'lot';

  return (
    <g aria-hidden>
      {/* ── Parsed constraint table (left) ── */}
      <g className={`vg-step ${on(1) ? 'is-on' : ''}`} transform="translate(1870,1010)">
        <text y={-16} fontSize={12} className="map-coord">
          PARSED TEXT → 8 STRUCTURED CONSTRAINTS · EACH WITH SOURCE PHRASE + CONFIDENCE
        </text>
        {PMG_CONSTRAINTS.map((c, i) => {
          const hi = activeRow === i;
          return (
            <g
              key={c.name}
              transform={`translate(0,${i * 40})`}
              onClick={() => setIx({ pmgActive: hi ? -1 : i })}
              style={{ cursor: 'pointer' }}
            >
              <rect width={360} height={34} fill={hi ? 'rgba(242,207,85,0.12)' : 'rgba(11,50,102,0.3)'} stroke={hi ? 'var(--yellow)' : 'var(--line-major)'} strokeWidth={hi ? 1.6 : 1} />
              <text x={12} y={22} fontSize={13} className="map-annotation">
                {c.name}
              </text>
              <text x={210} y={22} fontSize={13} className="map-annotation" fill={c.srcd ? 'var(--cyan)' : 'var(--muted)'}>
                {c.value}
              </text>
              {/* confidence bars or input tag */}
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
        <text y={8 * 40 + 20} fontSize={11} className="map-annotation" fill="var(--orange)">
          * FAR 0.70 → 1.00 under the rental / below-market condition (kept explicit)
        </text>
        <text y={8 * 40 + 38} fontSize={11} className="map-coord">
          SOURCED VALUES: VANCOUVER R1-1 PRESET · INPUTS ARE NOT BYLAW-SOURCED
        </text>
      </g>

      {/* ── Envelope drawing (right) ── */}
      <g transform="translate(3030,1280)">
        <text x={-130} y={-320} fontSize={12} className="map-coord">
          DETERMINISTIC ENVELOPE · HALF-PLANE CLIPPING
        </text>
        {mode !== 'block' ? <Envelope irregular={mode === 'irregular'} planesOn={on(2)} activeRow={activeRow} /> : <UrbanBlock />}
      </g>

      {/* ── Reviewer stamp (between table and envelope) ── */}
      <g className={`vg-step ${on(5) ? 'is-on' : ''}`} transform="translate(2470,1090)">
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

function Envelope({ irregular, planesOn, activeRow }: { irregular: boolean; planesOn: boolean; activeRow: number }) {
  // Lot outline
  const lot = irregular
    ? [iso(0, 0), iso(LOT_W, 0), iso(LOT_W, LOT_D * 0.72), iso(LOT_W * 0.55, LOT_D), iso(0, LOT_D)]
    : [iso(0, 0), iso(LOT_W, 0), iso(LOT_W, LOT_D), iso(0, LOT_D)];
  // Buildable footprint (after insets) — drawn as a 2-storey mass with a 3rd dashed (FAR-dependent)
  const bx = IN_S;
  const by = IN_F;
  const bd = irregular ? BD * 0.82 : BD;
  const planeAlpha = planesOn ? 1 : 0;
  const hi = (p: string) => PMG_CONSTRAINTS[activeRow]?.plane === p;

  const mass = isoBoxFaces(BW, bd, FLOOR_H * 2);
  const third = isoBoxFaces(BW, bd, FLOOR_H * 3);

  return (
    <g>
      {/* lot */}
      <polygon points={pts(lot)} fill="rgba(11,50,102,0.28)" stroke="var(--geom)" strokeWidth={1.4} />
      {/* setback planes */}
      <g style={{ opacity: planeAlpha, transition: 'opacity .6s var(--ease)' }}>
        <Plane a={iso(0, IN_F)} b={iso(LOT_W, IN_F)} h={FLOOR_H * 2.4} color={hi('front') ? 'var(--yellow)' : 'var(--cyan)'} label="front 4.9" />
        <Plane a={iso(IN_S, 0)} b={iso(IN_S, LOT_D)} h={FLOOR_H * 2.4} color={hi('side') ? 'var(--yellow)' : 'var(--cyan)'} label="side 1.2" />
        <Plane a={iso(0, LOT_D - IN_R)} b={iso(LOT_W, LOT_D - IN_R)} h={FLOOR_H * 2.4} color={hi('rear') ? 'var(--yellow)' : 'var(--cyan)'} label="rear 10.7" />
      </g>
      {/* mass */}
      <g transform={`translate(${iso(bx, by).x},${iso(bx, by).y})`}>
        <polygon points={mass.left} fill="rgba(237,242,247,0.14)" stroke="var(--geom)" strokeWidth={1.2} />
        <polygon points={mass.right} fill="rgba(237,242,247,0.26)" stroke="var(--geom)" strokeWidth={1.2} />
        <polygon points={mass.top} fill="rgba(112,215,206,0.18)" stroke="var(--geom)" strokeWidth={1.2} />
        {/* floor division */}
        <polygon points={isoBoxFaces(BW, bd, FLOOR_H).top} fill="none" stroke="var(--geom)" strokeWidth={0.8} strokeOpacity={0.6} />
        {/* potential 3rd storey under rental FAR */}
        <polygon
          points={third.top}
          fill="none"
          stroke={hi('far') || hi('height') ? 'var(--yellow)' : 'var(--muted)'}
          strokeWidth={1.2}
          strokeDasharray="7 6"
        />
        <text {...labelAt(iso(BW, bd * 0.4, FLOOR_H * 3 + 14))} fontSize={11} className="map-annotation" fill="var(--muted)">
          3rd storey headroom · 11.5 m cap
        </text>
      </g>
      {/* height plane */}
      <g style={{ opacity: planeAlpha, transition: 'opacity .6s var(--ease)' }}>
        <polygon
          points={pts([iso(0, 0, FLOOR_H * 3), iso(LOT_W, 0, FLOOR_H * 3), iso(LOT_W, LOT_D, FLOOR_H * 3), iso(0, LOT_D, FLOOR_H * 3)])}
          fill={hi('height') ? 'rgba(242,207,85,0.12)' : 'rgba(112,215,206,0.06)'}
          stroke={hi('height') ? 'var(--yellow)' : 'var(--cyan)'}
          strokeWidth={1}
          strokeDasharray="12 8"
        />
      </g>
      {irregular && (
        <text {...labelAt(iso(LOT_W * 0.6, LOT_D * 1.06))} fontSize={11} className="map-annotation" fill="var(--cyan)">
          irregular parcel — same verified clipping method
        </text>
      )}
    </g>
  );
}

function Plane({ a, b, h, color, label }: { a: { x: number; y: number }; b: { x: number; y: number }; h: number; color: string; label: string }) {
  return (
    <g>
      <polygon
        points={`${a.x},${a.y} ${b.x},${b.y} ${b.x},${b.y - h} ${a.x},${a.y - h}`}
        fill={color === 'var(--yellow)' ? 'rgba(242,207,85,0.10)' : 'rgba(112,215,206,0.07)'}
        stroke={color}
        strokeWidth={1}
        strokeDasharray="10 7"
      />
      <text x={a.x - 6} y={a.y - h - 8} fontSize={10.5} className="map-coord" fill={color}>
        {label}
      </text>
    </g>
  );
}

function UrbanBlock() {
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
          const h = u === 'park' ? 3 : u === 'com' ? 64 : u === 'admin' ? 86 : 44;
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

function labelAt(p: { x: number; y: number }) {
  return { x: p.x, y: p.y };
}
