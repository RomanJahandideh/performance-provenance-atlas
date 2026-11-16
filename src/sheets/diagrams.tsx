import type { ReactElement } from 'react';
import type { DiagramId } from '../data/types';
import { useT, win } from './useT';
import { iso, isoBoxFaces, pts } from './iso';

/*
 * Diagrams drawn in the GenEnv language: thin white linework on blue, yellow
 * for the active path, cyan for computed results, orange for limits.
 * Every diagram fits its own viewBox, so nothing can spill into other panels.
 */

const Y = 'var(--yellow)';
const C = 'var(--cyan)';
const O = 'var(--orange)';
const R = 'var(--red)';
const W = 'rgba(255,255,255,0.9)';
const W5 = 'rgba(255,255,255,0.45)';
const W2 = 'rgba(255,255,255,0.18)';
const FILL = 'rgba(255,255,255,0.06)';

function Label({ x, y, children, fill = W5, size = 15, anchor = 'start', weight = 400 }: { x: number; y: number; children: React.ReactNode; fill?: string; size?: number; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
  return (
    <text x={x} y={y} fill={fill} fontSize={size} textAnchor={anchor} fontWeight={weight} className="dg-mono">
      {children}
    </text>
  );
}

function Box({ x, y, w, h, stroke = W5, fill = FILL, dash }: { x: number; y: number; w: number; h: number; stroke?: string; fill?: string; dash?: string }) {
  return <rect x={x} y={y} width={w} height={h} fill={fill} stroke={stroke} strokeWidth={1.4} strokeDasharray={dash} />;
}

function Svg({ vb, children }: { vb: string; children: React.ReactNode }) {
  return (
    <svg viewBox={vb} className="dg" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <defs>
        <marker id="arY" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={7} markerHeight={7} orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill={Y} />
        </marker>
        <marker id="arW" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={7} markerHeight={7} orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill={W5} />
        </marker>
        <pattern id="hatchO" width={8} height={8} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1={0} y1={0} x2={0} y2={8} stroke={O} strokeWidth={1.4} opacity={0.7} />
        </pattern>
      </defs>
      {children}
    </svg>
  );
}

// ── 01 · Research site plan (title + closing) ───────────────────────────────
function Site() {
  const t = useT(3200, 300);
  const plots = [
    { x: 0, y: 0, w: 150, d: 150, label: 'FOUNDATIONS', sub: 'Tabriz · Istanbul · SFU', h: 18, color: W },
    { x: 190, y: 0, w: 150, d: 150, label: 'PERCEPTION + BODY', sub: 'eCAADe · ISS · BioTerrarium', h: 34, color: C },
    { x: 380, y: 0, w: 150, d: 150, label: 'FOUR PROTOTYPES', sub: 'rules → geometry → evidence', h: 50, color: C },
    { x: 570, y: 0, w: 150, d: 150, label: 'PROPOSED PHD', sub: 'performance provenance', h: 0, color: Y },
  ];
  const ox = 128;
  const oy = 120;
  return (
    <Svg vb="0 0 760 600">
      <g transform={`translate(${ox},${oy}) scale(0.84)`}>
        {plots.map((p, i) => {
          const g = win(t, i * 0.18, i * 0.18 + 0.3);
          const proposed = p.h === 0;
          const base = [iso(p.x, p.y), iso(p.x + p.w, p.y), iso(p.x + p.w, p.y + p.d), iso(p.x, p.y + p.d)];
          const mass = isoBoxFaces(p.w * 0.55, p.d * 0.55, p.h * g);
          const o = iso(p.x + p.w * 0.22, p.y + p.d * 0.22);
          const tag = iso(p.x + p.w, p.y - 6);
          return (
            <g key={p.label} opacity={0.15 + 0.85 * g}>
              <polygon points={pts(base)} fill={proposed ? 'rgba(242,207,85,0.06)' : 'rgba(255,255,255,0.05)'} stroke={proposed ? Y : W5} strokeWidth={1.3} strokeDasharray={proposed ? '4 7' : '7 6'} />
              {!proposed && (
                <g transform={`translate(${o.x},${o.y})`}>
                  <polygon points={mass.left} fill="rgba(255,255,255,0.10)" stroke={W} strokeWidth={1.3} />
                  <polygon points={mass.right} fill="rgba(255,255,255,0.20)" stroke={W} strokeWidth={1.3} />
                  <polygon points={mass.top} fill="rgba(255,255,255,0.28)" stroke={p.color} strokeWidth={1.5} />
                </g>
              )}
              {proposed && (
                <g transform={`translate(${o.x},${o.y})`}>
                  <polygon points={isoBoxFaces(p.w * 0.55, p.d * 0.55, 0).base} fill="none" stroke={Y} strokeWidth={1.6} strokeDasharray="3 6" />
                </g>
              )}
              <g transform={`translate(${tag.x + 6},${tag.y - 44}) rotate(-30)`}>
                <rect x={-4} y={-15} width={p.label.length * 9.4 + 8} height={21} fill="rgba(13,40,96,0.95)" stroke={p.color} strokeWidth={1.1} />
                <Label x={0} y={1} fill={p.color} size={13} weight={500}>
                  {p.label}
                </Label>
              </g>
            </g>
          );
        })}
        {/* yellow route linking the platforms */}
        <polyline
          points={pts(plots.map((p) => iso(p.x + p.w / 2, p.y + p.d / 2, p.h * 0.6)))}
          fill="none"
          stroke={Y}
          strokeWidth={2.4}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - win(t, 0.55, 1)}
        />
        {plots.map((p, i) => {
          const c = iso(p.x + p.w / 2, p.y + p.d / 2, p.h * 0.6);
          return <circle key={i} cx={c.x} cy={c.y} r={6} fill={Y} opacity={win(t, 0.6 + i * 0.08, 0.7 + i * 0.08)} />;
        })}
      </g>
      <Label x={36} y={575} size={13}>
        SPATIAL DESIGN → INTERACTIVE SYSTEMS → COMPUTATIONAL DESIGN → PROPOSED
      </Label>
    </Svg>
  );
}

// ── 05 · eCAADe transparency sweep ──────────────────────────────────────────
function Depth() {
  const t = useT(4200, 500);
  const tr = Math.round(10 + 80 * t);
  const flipped = tr >= 60;
  return (
    <Svg vb="0 0 700 820">
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={60} y1={230 + i * 90} x2={640} y2={230 + i * 90} stroke={W2} strokeDasharray="4 8" />
      ))}
      <Label x={60} y={200} size={14}>
        DEPTH JUDGED BY 60 PEOPLE · WHICH ONE IS NEARER?
      </Label>
      <circle cx={220} cy={410} r={92} fill="rgb(244,123,92)" fillOpacity={(100 - tr) / 100} stroke="var(--coral)" strokeWidth={2} />
      <circle cx={480} cy={410} r={92} fill="rgb(20,45,110)" fillOpacity={Math.max(0.15, (100 - tr) / 100)} stroke={C} strokeWidth={2} />
      <Label x={220} y={540} anchor="middle" size={15} fill={W}>
        WARM · BRIGHT
      </Label>
      <Label x={480} y={540} anchor="middle" size={15} fill={W}>
        COOL · DARK
      </Label>
      <g style={{ transition: 'transform .6s var(--ease)' }} transform={`translate(${flipped ? 480 : 220},0)`}>
        <line x1={0} y1={300} x2={0} y2={262} stroke={flipped ? C : 'var(--coral)'} strokeWidth={3} markerEnd="url(#arY)" />
        <Label x={0} y={250} anchor="middle" size={16} fill={flipped ? C : 'var(--coral)'} weight={600}>
          NEARER
        </Label>
      </g>
      {/* transparency meter */}
      <line x1={60} y1={660} x2={640} y2={660} stroke={W2} strokeWidth={6} strokeLinecap="round" />
      <line x1={60} y1={660} x2={60 + 580 * ((tr - 10) / 80)} y2={660} stroke={Y} strokeWidth={6} strokeLinecap="round" />
      <line x1={60 + 580 * (50 / 80)} y1={645} x2={60 + 580 * (50 / 80)} y2={675} stroke={W5} strokeWidth={1.5} />
      <Label x={60 + 580 * (50 / 80)} y={700} anchor="middle" size={13}>
        60%
      </Label>
      <Label x={60} y={740} size={22} fill={W} weight={600}>
        Transparency {tr}%
      </Label>
      <Label x={640} y={740} anchor="end" size={16} fill={flipped ? Y : W5} weight={600}>
        {flipped ? 'the rule flips' : 'warm reads nearer'}
      </Label>
    </Svg>
  );
}

// ── 09 · Retrieve → answer → verify ─────────────────────────────────────────
function Pipeline() {
  const t = useT(3200, 400);
  const stages = ['RETRIEVE', 'ANSWER', 'VERIFY'];
  const sub = ['finds relevant clauses', 'uses only those clauses', 'checks its own evidence'];
  const clauses = ['USES', 'LOT', 'SETBACKS', 'HEIGHT', 'STOREYS', 'FSR', 'SIZE', 'OPEN SPACE', 'PARKING', 'TREES'];
  return (
    <Svg vb="0 0 1160 540">
      {/* question */}
      <g opacity={win(t, 0, 0.12)}>
        <Box x={30} y={60} w={230} h={96} stroke={W5} />
        <Label x={46} y={92} size={13}>
          QUESTION
        </Label>
        <Label x={46} y={122} size={15} fill={W}>
          What is the max
        </Label>
        <Label x={46} y={142} size={15} fill={W}>
          building height?
        </Label>
      </g>
      {stages.map((s, i) => {
        const x = 320 + i * 270;
        const on = win(t, 0.12 + i * 0.16, 0.24 + i * 0.16);
        return (
          <g key={s} opacity={0.2 + 0.8 * on}>
            <line x1={x - 58} y1={108} x2={x - 6} y2={108} stroke={Y} strokeWidth={2} markerEnd="url(#arY)" opacity={on} />
            <Box x={x} y={60} w={210} h={96} stroke={on > 0.5 ? C : W5} fill="rgba(112,215,206,0.08)" />
            <Label x={x + 105} y={104} anchor="middle" size={18} fill={on > 0.5 ? C : W5} weight={600}>
              {s}
            </Label>
            <Label x={x + 105} y={134} anchor="middle" size={13}>
              {sub[i]}
            </Label>
          </g>
        );
      })}
      {/* clause shelf */}
      <Label x={320} y={200} size={13}>
        BYLAW · 10 ADDRESSABLE CLAUSES
      </Label>
      {clauses.map((c, i) => {
        const x = 320 + (i % 5) * 112;
        const y = 244 + Math.floor(i / 5) * 62;
        const hit = i === 3 && t > 0.3;
        return (
          <g key={c} opacity={win(t, 0.05 + i * 0.02, 0.2 + i * 0.02)}>
            <Box x={x} y={y} w={100} h={48} stroke={hit ? Y : W2} fill={hit ? 'rgba(242,207,85,0.18)' : FILL} />
            <Label x={x + 10} y={y + 20} size={11}>
              C{String(i + 1).padStart(2, '0')}
            </Label>
            <Label x={x + 10} y={y + 38} size={12} fill={hit ? Y : W5}>
              {c}
            </Label>
          </g>
        );
      })}
      {/* answer */}
      <g opacity={win(t, 0.7, 0.9)}>
        <Box x={900} y={244} w={240} h={150} stroke={C} fill="rgba(112,215,206,0.10)" />
        <Label x={916} y={274} size={13} fill={C}>
          ANSWER · GROUNDED ✓
        </Label>
        <Label x={916} y={306} size={16} fill={W}>
          11.5 m and
        </Label>
        <Label x={916} y={328} size={16} fill={W}>
          three storeys
        </Label>
        <Label x={916} y={356} size={13}>
          quoted from clause C04
        </Label>
        <Label x={916} y={378} size={13}>
          verified · nothing missed
        </Label>
        {/* evidence link: answer → clause C04, routed above the shelf */}
        <polyline points="1020,244 1020,212 706,212 706,240" fill="none" stroke={Y} strokeWidth={1.6} strokeDasharray="5 6" markerEnd="url(#arY)" />
      </g>
      <Label x={30} y={500} size={14}>
        THREE SEPARATE AI CALLS. THE ANSWER CAN ONLY USE THE CLAUSES THAT WERE FOUND.
      </Label>
    </Svg>
  );
}

// ── 10 · Unsupported question stops ─────────────────────────────────────────
function NotCovered() {
  const t = useT(3000, 400);
  return (
    <Svg vb="0 0 560 860">
      <g opacity={win(t, 0, 0.12)}>
        <Box x={60} y={40} w={440} h={96} />
        <Label x={80} y={74} size={13}>
          QUESTION
        </Label>
        <Label x={80} y={110} size={17} fill={W}>
          How many storeys may a
        </Label>
        <Label x={80} y={130} size={17} fill={W}>
          laneway house have?
        </Label>
      </g>
      <line x1={280} y1={140} x2={280} y2={190} stroke={Y} strokeWidth={2} markerEnd="url(#arY)" opacity={win(t, 0.12, 0.2)} />
      <g opacity={win(t, 0.15, 0.3)}>
        <Box x={110} y={196} w={340} h={84} stroke={C} fill="rgba(112,215,206,0.08)" />
        <Label x={280} y={228} anchor="middle" size={18} fill={C} weight={600}>
          RETRIEVE
        </Label>
        <Label x={280} y={256} anchor="middle" size={13}>
          laneway house: allowed,
        </Label>
        <Label x={280} y={272} anchor="middle" size={13}>
          but no storey limit stated
        </Label>
      </g>
      {/* severed path */}
      <g opacity={win(t, 0.35, 0.5)}>
        <line x1={280} y1={284} x2={280} y2={340} stroke={O} strokeWidth={2} strokeDasharray="5 6" />
        <line x1={258} y1={300} x2={302} y2={340} stroke={O} strokeWidth={4} />
        <line x1={302} y1={300} x2={258} y2={340} stroke={O} strokeWidth={4} />
      </g>
      {['ANSWER', 'VERIFY'].map((s, i) => (
        <g key={s} opacity={0.5 * win(t, 0.4, 0.55)}>
          <Box x={110} y={360 + i * 110} w={340} h={84} stroke={W2} fill="none" dash="6 6" />
          <Label x={280} y={408 + i * 110} anchor="middle" size={17} fill={W5}>
            {s}: not reached
          </Label>
        </g>
      ))}
      {/* stamp */}
      <g opacity={win(t, 0.62, 0.8)} transform={`translate(280,${700}) rotate(-5) scale(${0.9 + 0.1 * win(t, 0.62, 0.8)})`}>
        <rect x={-210} y={-58} width={420} height={116} fill="rgba(232,146,74,0.12)" stroke={O} strokeWidth={3} />
        <Label x={0} y={-6} anchor="middle" size={40} fill={O} weight={700}>
          NOT COVERED
        </Label>
        <Label x={0} y={32} anchor="middle" size={15} fill={W}>
          “not covered by the provided source”
        </Label>
      </g>
    </Svg>
  );
}

// ── 11 · Deterministic site check ───────────────────────────────────────────
function SiteCheck() {
  const t = useT(3600, 400);
  const k = 9.5;
  const Wl = 10 * k;
  const D = 37 * k;
  const ss = 1.2 * k;
  const fs = 4.9 * k;
  const rs = 10.7 * k;
  const floors = t > 0.62 ? 2 : 1;
  const grow = win(t, 0.25, 0.5);
  const h = (floors === 2 ? 2 : grow) * 38;
  const mass = isoBoxFaces(Wl - 2 * ss, D - fs - rs, Math.max(2, h));
  const o = iso(ss, fs);
  return (
    <Svg vb="0 0 560 860">
      <g transform="translate(340,150)">
        <polygon points={pts([iso(0, 0), iso(Wl, 0), iso(Wl, D), iso(0, D)])} fill={FILL} stroke={W} strokeWidth={1.5} />
        <polygon
          points={pts([iso(ss, fs), iso(Wl - ss, fs), iso(Wl - ss, D - rs), iso(ss, D - rs)])}
          fill="none"
          stroke={C}
          strokeWidth={1.4}
          strokeDasharray="6 5"
          opacity={win(t, 0.05, 0.25)}
        />
        <g transform={`translate(${o.x},${o.y})`} opacity={win(t, 0.2, 0.3)}>
          <polygon points={mass.left} fill="rgba(112,215,206,0.18)" stroke={C} strokeWidth={1.4} />
          <polygon points={mass.right} fill="rgba(112,215,206,0.30)" stroke={C} strokeWidth={1.4} />
          <polygon points={mass.top} fill={floors === 2 ? 'rgba(242,207,85,0.35)' : 'rgba(112,215,206,0.45)'} stroke={floors === 2 ? Y : C} strokeWidth={1.6} />
        </g>
        <Label x={-310} y={-90} size={13}>
          LOT 10 × 37 M · SETBACKS 4.9 / 1.2 / 10.7
        </Label>
      </g>
      <g transform="translate(40,560)">
        <Label x={0} y={0} size={15}>
          (10 − 2×1.2) × (37 − 4.9 − 10.7)
        </Label>
        <Label x={0} y={34} size={15}>
          = 7.6 × 21.4
        </Label>
        <Label x={0} y={82} size={34} fill={C} weight={700}>
          {(162.6 * win(t, 0.1, 0.4)).toFixed(1)} m²
        </Label>
        <Label x={0} y={128} size={16} fill={floors === 2 ? Y : W5}>
          FSR {floors === 2 ? '1.00 · rental condition' : '0.70 · base'}
        </Label>
        <Label x={0} y={160} size={22} fill={W} weight={600}>
          → {floors === 2 ? 'two floors' : 'one floor'}
        </Label>
        <Label x={0} y={210} size={13}>
          COMPUTED IN CODE. THE AI ONLY EXPLAINS IT.
        </Label>
      </g>
    </Svg>
  );
}

// ── 12 · Bylaw → 8 constraints ──────────────────────────────────────────────
function Constraints() {
  const t = useT(3200, 300);
  const rows = [
    ['front setback', '4.9 m', 3],
    ['side setbacks', '1.2 m', 3],
    ['rear setback', '10.7 m', 3],
    ['max height', '11.5 m', 3],
    ['max FSR', '0.70 / 1.00', 3],
    ['lot width', '10.0 m', 0],
    ['lot depth', '37.0 m', 0],
    ['floor height', 'input', 0],
  ] as const;
  return (
    <Svg vb="0 0 560 860">
      <Label x={30} y={50} size={13}>
        AI EXTRACTS · EACH VALUE KEEPS ITS SOURCE + CONFIDENCE
      </Label>
      {rows.map(([name, val, conf], i) => {
        const on = win(t, i * 0.09, i * 0.09 + 0.12);
        const active = on > 0 && on < 1;
        return (
          <g key={name} opacity={on} transform={`translate(${30 + (1 - on) * 20},${80 + i * 82})`}>
            <Box x={0} y={0} w={500} h={66} stroke={active ? Y : W2} fill={active ? 'rgba(242,207,85,0.12)' : FILL} />
            <Label x={20} y={40} size={18} fill={W}>
              {name}
            </Label>
            <Label x={300} y={40} size={18} fill={conf ? C : W5} weight={600}>
              {val}
            </Label>
            {conf > 0 ? (
              [0, 1, 2].map((b) => <rect key={b} x={448 + b * 12} y={42 - (b + 1) * 8} width={8} height={(b + 1) * 8} fill={Y} />)
            ) : (
              <Label x={484} y={40} size={11} anchor="end">
                INPUT
              </Label>
            )}
          </g>
        );
      })}
      <Label x={30} y={760} size={14} fill={W5}>
        Sourced from the Vancouver R1-1 preset.
      </Label>
      <Label x={30} y={790} size={14} fill={W5}>
        A second AI call reviews every value.
      </Label>
    </Svg>
  );
}

// ── 13 · Envelope with the rental storey ────────────────────────────────────
function Envelope() {
  const t = useT(4000, 500);
  const K = 10;
  const LW = 10 * K;
  const LD = 37 * K;
  const IF = 4.9 * K;
  const IS = 1.2 * K;
  const IR = 10.7 * K;
  const BW = LW - 2 * IS;
  const BD = LD - IF - IR;
  const FH = 3.83 * K;
  const planes = win(t, 0.05, 0.3);
  const ext = win(t, 0.3, 0.6);
  const third = win(t, 0.72, 0.92);
  const mass = isoBoxFaces(BW, BD, Math.max(2, FH * 2 * ext));
  const top3 = isoBoxFaces(BW, BD, FH * 2 + FH * third);
  const o = iso(IS, IF);
  const plane = (a: { x: number; y: number }, b: { x: number; y: number }, label: string) => (
    <g>
      <polygon points={`${a.x},${a.y} ${b.x},${b.y} ${b.x},${b.y - FH * 3.2 * planes} ${a.x},${a.y - FH * 3.2 * planes}`} fill="rgba(112,215,206,0.07)" stroke={C} strokeWidth={1.1} strokeDasharray="8 6" />
      <Label x={a.x - 8} y={a.y - FH * 3.2 * planes + 4} size={13} fill={C} anchor="end">
        {label}
      </Label>
    </g>
  );
  return (
    <Svg vb="0 0 560 860">
      <g transform="translate(380,250)">
        <polygon points={pts([iso(0, 0), iso(LW, 0), iso(LW, LD), iso(0, LD)])} fill={FILL} stroke={W} strokeWidth={1.5} />
        {plane(iso(0, IF), iso(LW, IF), 'front 4.9 m')}
        {plane(iso(0, LD - IR), iso(LW, LD - IR), 'rear 10.7 m')}
        <g transform={`translate(${o.x},${o.y})`}>
          {third > 0 && (
            <g>
              <polygon points={top3.left} fill="rgba(242,207,85,0.16)" stroke={Y} strokeWidth={1.4} />
              <polygon points={top3.right} fill="rgba(242,207,85,0.24)" stroke={Y} strokeWidth={1.4} />
              <polygon points={top3.top} fill="rgba(242,207,85,0.38)" stroke={Y} strokeWidth={1.6} />
            </g>
          )}
          <polygon points={mass.left} fill="rgba(255,255,255,0.14)" stroke={W} strokeWidth={1.4} />
          <polygon points={mass.right} fill="rgba(255,255,255,0.26)" stroke={W} strokeWidth={1.4} />
          {third === 0 && <polygon points={mass.top} fill="rgba(112,215,206,0.25)" stroke={W} strokeWidth={1.4} />}
        </g>
      </g>
      <g transform="translate(40,640)">
        <Label x={0} y={0} size={13}>
          FLOOR-SPACE RATIO
        </Label>
        <Label x={0} y={44} size={36} fill={third > 0.5 ? Y : W} weight={700}>
          {third > 0.5 ? '1.00' : '0.70'}
        </Label>
        <Label x={130} y={44} size={18} fill={third > 0.5 ? Y : W5}>
          {third > 0.5 ? 'rental condition → +1 storey' : 'base · two storeys'}
        </Label>
        <Label x={0} y={96} size={13}>
          SETBACKS, FOOTPRINT AND AREA ARE COMPUTED BY CODE
        </Label>
      </g>
    </Svg>
  );
}

// ── 14 · AI-classified urban block ──────────────────────────────────────────
function Block() {
  const t = useT(3000, 500);
  const uses = [
    ['res', 'res', 'com'],
    ['res', 'park', 'com'],
    ['res', 'res', 'adm'],
  ] as const;
  const col: Record<string, string> = { res: W, com: C, adm: 'var(--proposal)', park: 'var(--lime)' };
  const ht: Record<string, number> = { res: 44, com: 70, adm: 92, park: 4 };
  const cell = 66;
  return (
    <Svg vb="0 0 430 560">
      <g transform="translate(215,90)">
        {uses.flatMap((row, j) =>
          row.map((u, i) => {
            const g = win(t, (i + j) * 0.08, (i + j) * 0.08 + 0.4);
            const f = isoBoxFaces(cell - 14, cell - 14, Math.max(2, ht[u]! * g));
            const o = iso(i * cell, j * cell);
            const c = col[u]!;
            return (
              <g key={`${i}${j}`} transform={`translate(${o.x},${o.y})`} opacity={0.2 + 0.8 * g}>
                <polygon points={f.left} fill="rgba(255,255,255,0.08)" stroke={c} strokeWidth={1.2} />
                <polygon points={f.right} fill="rgba(255,255,255,0.16)" stroke={c} strokeWidth={1.2} />
                <polygon points={f.top} fill="rgba(255,255,255,0.22)" stroke={c} strokeWidth={1.4} />
              </g>
            );
          }),
        )}
      </g>
      {[
        ['residential', W],
        ['commercial', C],
        ['administrative', 'var(--proposal)'],
        ['park', 'var(--lime)'],
      ].map(([n, c], i) => (
        <g key={n} transform={`translate(30,${420 + i * 30})`}>
          <rect width={14} height={14} fill="none" stroke={c} strokeWidth={2} />
          <Label x={24} y={12} size={14} fill={W}>
            {n}
          </Label>
        </g>
      ))}
    </Svg>
  );
}

// ── 15 · View-corridor section ──────────────────────────────────────────────
function Corridor() {
  const t = useT(4600, 500);
  const gx0 = 90;
  const gx1 = 1080;
  const ground = 700;
  const c0 = 650;
  const c1 = 170;
  const s0 = 640;
  const s1 = 980;
  const ceilAt = (x: number) => c0 + ((x - gx0) / (gx1 - gx0)) * (c1 - c0);
  const draw = win(t, 0, 0.18);
  const flat = win(t, 0.2, 0.42);
  const trim = win(t, 0.5, 0.85);
  const flatY = ceilAt(s0);
  const strips = 10;
  const sw = (s1 - s0) / strips;
  const floors = Math.round(10 + 8 * trim);
  const area = Math.round(18360 + (25608 - 18360) * trim);
  return (
    <Svg vb="0 0 1160 860">
      <line x1={40} y1={ground} x2={1120} y2={ground} stroke={W} strokeWidth={2} />
      <circle cx={gx0} cy={ground - 14} r={12} fill="none" stroke={Y} strokeWidth={2} />
      <circle cx={gx0} cy={ground - 14} r={4} fill={Y} />
      <Label x={gx0 + 20} y={ground - 8} size={14} fill={Y}>
        PROTECTED VIEWPOINT
      </Label>
      {/* sloped ceiling */}
      <line x1={gx0} y1={c0} x2={gx0 + (gx1 - gx0) * draw} y2={c0 + (c1 - c0) * draw} stroke={Y} strokeWidth={2.6} />
      <g opacity={win(t, 0.12, 0.2)} transform={`rotate(-25.9 ${gx0 + 90} ${ceilAt(gx0 + 90) - 16})`}>
        <Label x={gx0 + 90} y={ceilAt(gx0 + 90) - 16} size={15} fill={Y}>
          the protected view rises away from the viewpoint
        </Label>
      </g>
      {/* flat cap line */}
      <g opacity={flat > 0 ? 1 - 0.6 * trim : 0}>
        <line x1={s0 - 20} y1={flatY} x2={s1 + 30} y2={flatY} stroke={W5} strokeWidth={2} strokeDasharray="12 8" />
        <Label x={s1 + 40} y={flatY + 5} size={14} fill={W5}>
          flat cap
        </Label>
      </g>
      {/* building */}
      <rect x={s0} y={ground - (ground - flatY) * flat} width={s1 - s0} height={(ground - flatY) * flat} fill="rgba(255,255,255,0.10)" stroke={W} strokeWidth={1.6} opacity={1 - trim} />
      {Array.from({ length: strips }, (_, i) => {
        const x = s0 + i * sw;
        const top = flatY + (ceilAt(x + sw) - flatY) * trim;
        return trim > 0 ? <rect key={i} x={x} y={top} width={sw} height={ground - top} fill="rgba(112,215,206,0.16)" stroke={C} strokeWidth={1.3} /> : null;
      })}
      {Array.from({ length: 17 }, (_, i) => {
        const y = ground - ((i + 1) * (ground - ceilAt(s1))) / 18;
        const xEnd = Math.min(s1, Math.max(s0, gx0 + ((y - c0) / (c1 - c0)) * (gx1 - gx0)));
        return trim > 0.3 ? <line key={i} x1={s0} y1={y} x2={xEnd} y2={y} stroke={C} strokeWidth={0.8} opacity={0.6} /> : null;
      })}
      {/* live counters */}
      <g transform="translate(90,90)">
        <Label x={0} y={0} size={14}>
          FLOORS
        </Label>
        <Label x={0} y={56} size={56} fill={trim > 0 ? C : W} weight={700}>
          {flat > 0 ? floors : '0'}
        </Label>
        <Label x={190} y={0} size={14}>
          FLOOR AREA
        </Label>
        <Label x={190} y={56} size={56} fill={trim > 0 ? C : W} weight={700}>
          {flat > 0 ? `${area.toLocaleString()} m²` : '0 m²'}
        </Label>
      </g>
      <g opacity={win(t, 0.86, 1)} transform="translate(90,230)">
        <Label x={0} y={0} size={44} fill={Y} weight={700}>
          +39.5% recovered
        </Label>
      </g>
      <Label x={40} y={780} size={14}>
        CORRIDOR SHAPE FROM CITY OF VANCOUVER OPEN DATA. BASE HEIGHT AND SLOPE ARE PLACEHOLDERS.
      </Label>
    </Svg>
  );
}

// ── 16 · Rotation study ─────────────────────────────────────────────────────
function Rotation() {
  const t = useT(4200, 500);
  const deg = Math.round(90 * t);
  const step = Math.min(6, Math.floor(t * 7));
  return (
    <Svg vb="0 0 560 860">
      <g transform="translate(280,250)">
        <circle r={150} fill="none" stroke={W2} strokeDasharray="4 8" />
        {Array.from({ length: 7 }, (_, i) => {
          const a = ((i * 15 - 90) * Math.PI) / 180;
          return <circle key={i} cx={Math.cos(a) * 150} cy={Math.sin(a) * 150} r={5} fill={i <= step ? Y : W2} />;
        })}
        <rect x={-110} y={-70} width={220} height={140} fill="rgba(112,215,206,0.14)" stroke={C} strokeWidth={2} transform={`rotate(${deg})`} />
        <Label x={0} y={8} anchor="middle" size={26} fill={W} weight={700}>
          {deg}°
        </Label>
      </g>
      <g transform="translate(40,480)">
        <Label x={0} y={0} size={13}>
          TOTAL FLOOR AREA
        </Label>
        <line x1={0} y1={36} x2={480} y2={36} stroke={W2} strokeWidth={6} />
        <line x1={0} y1={36} x2={480 * t} y2={36} stroke={C} strokeWidth={6} />
        <Label x={480} y={70} anchor="end" size={16} fill={C}>
          changes by only 0.02%
        </Label>
        <Label x={0} y={130} size={13}>
          FLOOR COUNT
        </Label>
        <Label x={0} y={186} size={48} fill={W} weight={700}>
          {t > 0.55 ? '17' : '18'}
        </Label>
        <Label x={90} y={186} size={16} fill={W5}>
          floors, arranged differently
        </Label>
        <Label x={0} y={260} size={14} fill={W5}>
          So the angle can be chosen for program,
        </Label>
        <Label x={0} y={286} size={14} fill={W5}>
          silhouette or daylight instead.
        </Label>
      </g>
    </Svg>
  );
}

// ── 17 · Six roles over shared evaluators ───────────────────────────────────
function Agents() {
  const t = useT(3600, 400);
  const roles = [
    { n: 'ORCHESTRATOR', s: 'picks next direction', a: -90, c: Y },
    { n: 'GENERATOR', s: 'proposes designs', a: -150, c: W },
    { n: 'SOLAR', s: 'critic', a: 150, c: 'var(--lime)' },
    { n: 'CARBON', s: 'critic', a: 110, c: 'var(--lime)' },
    { n: 'WIND', s: 'critic', a: 70, c: 'var(--lime)' },
    { n: 'FLOOR AREA', s: 'critic', a: 30, c: 'var(--lime)' },
  ];
  const cx = 350;
  const cy = 430;
  const r = 250;
  return (
    <Svg vb="0 0 700 860">
      {/* links first, so the evaluator box sits on top of them */}
      {roles.map((ro, i) => {
        const a = (ro.a * Math.PI) / 180;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r * 0.9;
        return (
          <line key={ro.n} x1={x} y1={y} x2={cx} y2={cy} stroke={ro.c} strokeWidth={1.4} strokeDasharray="6 6" opacity={win(t, 0.15 + i * 0.1, 0.3 + i * 0.1)} className={t >= 1 ? 'dg-flow' : undefined} />
        );
      })}
      <rect x={cx - 120} y={cy - 60} width={240} height={120} fill="rgb(17,52,124)" opacity={win(t, 0, 0.2)} />
      <g opacity={win(t, 0, 0.2)}>
        <rect x={cx - 120} y={cy - 60} width={240} height={120} fill="rgba(112,215,206,0.10)" stroke={C} strokeWidth={2} />
        <Label x={cx} y={cy - 18} anchor="middle" size={14} fill={C}>
          DETERMINISTIC
        </Label>
        <Label x={cx} y={cy + 6} anchor="middle" size={14} fill={C}>
          EVALUATORS
        </Label>
        <Label x={cx} y={cy + 36} anchor="middle" size={13} fill={W5}>
          where every score comes from
        </Label>
      </g>
      {roles.map((ro, i) => {
        const a = (ro.a * Math.PI) / 180;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r * 0.9;
        const on = win(t, 0.15 + i * 0.1, 0.3 + i * 0.1);
        return (
          <g key={ro.n} opacity={on}>
            <circle cx={x} cy={y} r={46} fill="rgba(13,40,96,0.95)" stroke={ro.c} strokeWidth={2} />
            <Label x={x} y={y + 5} anchor="middle" size={ro.n.length > 8 ? 11 : 13} fill={ro.c} weight={600}>
              {ro.n}
            </Label>
            <Label x={x} y={y + 70} anchor="middle" size={12}>
              {ro.s}
            </Label>
          </g>
        );
      })}
      <Label x={cx} y={820} anchor="middle" size={14} fill={W5}>
        AGENTS READ THE SCORES. CODE CALCULATES THEM.
      </Label>
    </Svg>
  );
}

// ── 18 · Seed tracks to the target ──────────────────────────────────────────
function Seeds() {
  const t = useT(4200, 500);
  const left = 60;
  const right = 520;
  const top = 160;
  const bottom = 700;
  const target = 240;
  const track = (x: number, reach: boolean, i: number, color: string) => {
    const endY = reach ? target - 20 : target + 90 + (i % 3) * 40;
    const p = win(t, i * 0.05, 0.75 + i * 0.04);
    return (
      <path
        key={`${color}${i}`}
        d={`M${x} ${bottom} C ${x + 8} ${bottom - 200}, ${x - 8} ${endY + 140}, ${x} ${endY}`}
        fill="none"
        stroke={color}
        strokeWidth={3}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - p}
      />
    );
  };
  return (
    <Svg vb="0 0 560 860">
      <rect x={left} y={top} width={right - left} height={bottom - top} fill={FILL} stroke={W2} />
      <line x1={left} y1={target} x2={right} y2={target} stroke={Y} strokeWidth={2} strokeDasharray="10 7" />
      <Label x={left} y={top - 14} size={13} fill={Y}>
        TARGET: 95% OF THE BEST DESIGNS (DASHED LINE)
      </Label>
      {[0, 1, 2, 3, 4].map((i) => track(100 + i * 36, i < 4, i, C))}
      {[0, 1, 2, 3, 4].map((i) => track(320 + i * 36, i === 2, i, W5))}
      <Label x={172} y={740} anchor="middle" size={17} fill={C} weight={600}>
        NSGA-II · 4 of 5
      </Label>
      <Label x={392} y={740} anchor="middle" size={17} fill={W} weight={600}>
        Random · 1 of 5
      </Label>
      <Label x={left} y={100} size={14}>
        200 EVALUATIONS EACH · 1,080-DESIGN GRID
      </Label>
      <g opacity={win(t, 0.85, 1)}>
        <Label x={left} y={800} size={15} fill={R} weight={600}>
          Not faster,
        </Label>
        <Label x={left + 120} y={800} size={15} fill={C} weight={600}>
          but more reliable
        </Label>
      </g>
    </Svg>
  );
}

// ── 19 · Pareto line ────────────────────────────────────────────────────────
function Pareto() {
  const t = useT(3000, 600);
  return (
    <Svg vb="0 0 560 420">
      <line x1={70} y1={360} x2={520} y2={360} stroke={W5} markerEnd="url(#arW)" />
      <line x1={70} y1={360} x2={70} y2={40} stroke={W5} markerEnd="url(#arW)" />
      <Label x={520} y={392} anchor="end" size={13}>
        BETTER WIND COMFORT →
      </Label>
      <Label x={60} y={32} size={13}>
        ↑ MORE FLOOR AREA
      </Label>
      <line x1={110} y1={80} x2={110 + 360 * t} y2={80 + 240 * t} stroke={C} strokeWidth={1.4} strokeDasharray="4 6" />
      {Array.from({ length: 10 }, (_, i) => (
        <circle key={i} cx={110 + i * 40} cy={80 + i * 26.7} r={8} fill="rgba(13,40,96,1)" stroke={C} strokeWidth={2.4} opacity={win(t, i * 0.08, i * 0.08 + 0.15)} />
      ))}
      <Label x={300} y={78} size={15} fill={W}>
        10 best trade-offs
      </Label>
      <Label x={300} y={102} size={15} fill={C}>
        r = −1.000
      </Label>
    </Svg>
  );
}

// ── 20 · The chain ──────────────────────────────────────────────────────────
function Chain() {
  const t = useT(3600, 400);
  const stages = [
    { n: 'REGULATION', p: 'Zoning Assistant' },
    { n: 'EVIDENCE', p: 'Zoning Assistant' },
    { n: 'GEOMETRY', p: 'Massing Generator' },
    { n: 'PERFORMANCE', p: 'View Corridor' },
    { n: 'CRITIQUE', p: 'Massing Agents' },
    { n: 'DECISION', p: 'the designer' },
  ];
  const x0 = 110;
  const step = 290;
  return (
    <Svg vb="0 0 1780 560">
      {stages.map((s, i) => {
        const x = x0 + i * step;
        const on = win(t, i * 0.13, i * 0.13 + 0.15);
        const human = i === 5;
        const c = human ? 'var(--coral)' : Y;
        return (
          <g key={s.n} opacity={0.15 + 0.85 * on}>
            {i < 5 && (
              <line x1={x + 70} y1={200} x2={x + 70 + (step - 140) * win(t, i * 0.13 + 0.1, i * 0.13 + 0.2)} y2={200} stroke={Y} strokeWidth={3} markerEnd="url(#arY)" />
            )}
            <circle cx={x} cy={200} r={58} fill="rgba(13,40,96,0.95)" stroke={c} strokeWidth={3} />
            <Label x={x} y={207} anchor="middle" size={15} fill={c} weight={700}>
              {String(i + 1).padStart(2, '0')}
            </Label>
            <Label x={x} y={120} anchor="middle" size={20} fill={c} weight={700}>
              {s.n}
            </Label>
            <line x1={x} y1={262} x2={x} y2={330} stroke={W2} strokeDasharray="4 6" />
            <rect x={x - 118} y={334} width={236} height={64} fill={FILL} stroke={W5} />
            <Label x={x} y={373} anchor="middle" size={16} fill={W}>
              {s.p}
            </Label>
          </g>
        );
      })}
      <Label x={x0 - 58} y={500} size={15} fill={W5}>
        EACH PROJECT ADDS ONE LINK. THE DESIGNER MAKES THE FINAL DECISION.
      </Label>
    </Svg>
  );
}

// ── 21 · Provenance record ──────────────────────────────────────────────────
function Provenance() {
  const t = useT(5200, 400);
  const links = [
    { n: 'Intent', v: 'recover usable floor area', c: Y },
    { n: 'Rule', v: 'view corridor J1 ceiling', c: Y },
    { n: 'Change', v: 'flat cap → per-floor trim', c: C },
    { n: 'Calculation', v: 'tested clipping, in code', c: C },
    { n: 'Result', v: '18 floors · +39.5% area', c: C },
    { n: 'Uncertainty', v: 'elevations are placeholders', c: O },
    { n: 'AI reading', v: 'recommends against the brief', c: W },
    { n: 'Decision', v: 'accept · revise · reject', c: 'var(--coral)' },
  ];
  const lit = Math.min(links.length, Math.floor(t * links.length + 0.0001));
  return (
    <Svg vb="0 0 1160 860">
      <line x1={110} y1={70} x2={110} y2={70 + 7 * 98} stroke={W2} strokeWidth={3} />
      <line x1={110} y1={70} x2={110} y2={70 + 7 * 98 * Math.min(1, t * 1.05)} stroke={Y} strokeWidth={3} />
      {links.map((l, i) => {
        const on = i < lit || t >= 1;
        const y = 70 + i * 98;
        return (
          <g key={l.n} opacity={on ? 1 : 0.25}>
            <circle cx={110} cy={y} r={18} fill={on ? l.c : 'rgba(13,40,96,1)'} stroke={l.c} strokeWidth={2.4} />
            <Label x={110} y={y + 5} anchor="middle" size={13} fill={on ? '#0d2860' : l.c} weight={700}>
              {i + 1}
            </Label>
            <rect x={160} y={y - 34} width={900} height={68} fill={on ? 'rgba(255,255,255,0.06)' : 'none'} stroke={on ? W2 : 'none'} />
            <Label x={184} y={y + 7} size={20} fill={l.c} weight={700}>
              {l.n.toUpperCase()}
            </Label>
            <Label x={470} y={y + 7} size={20} fill={W}>
              {l.v}
            </Label>
          </g>
        );
      })}
    </Svg>
  );
}

const MAP: Record<DiagramId, () => ReactElement> = {
  site: Site,
  depth: Depth,
  pipeline: Pipeline,
  notcovered: NotCovered,
  sitecheck: SiteCheck,
  constraints: Constraints,
  envelope: Envelope,
  block: Block,
  corridor: Corridor,
  rotation: Rotation,
  agents: Agents,
  seeds: Seeds,
  pareto: Pareto,
  chain: Chain,
  provenance: Provenance,
};

export function Diagram({ id }: { id: DiagramId }) {
  const D = MAP[id];
  return <D />;
}
