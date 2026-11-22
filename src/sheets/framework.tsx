import type { ReactNode } from 'react';
import { useT, win } from './useT';
import { ARCHITECTURE, AUTONOMY, CONDITIONS, CONFLUENCE, DIRECTIONS, GAPS, LOOP, GAP_NOTE, PLATFORM, PLATFORM_START, PLATFORM_TOOLS, PROVENANCE_LINKS, PROVENANCE_RECORD, REMAINING_GAP, RESEARCH_QUESTIONS, ROLE_STYLE, SCENARIO, STATE_OF_ART, type Role } from '../data/provenance';
import { GENENV_TERRITORY, PHD_DISTRICTS, TERRITORIES } from '../data/atlas';
import type { EvidenceStatus } from '../data/types';

/*
 * Diagrams for the refocused argument: the research map, the capability
 * chain, the division of roles, the missing layer, the proposed framework,
 * the Vancouver scenario and the RQ, method, contribution map.
 *
 * Every role has a colour AND a geometry, so the difference between AI
 * reasoning, verified computation and human judgment survives greyscale,
 * screen sharing and colour blindness:
 *   source       yellow, solid square with a flag corner
 *   compute      cyan, solid square
 *   operation    white, solid square
 *   uncertain    orange, hatched
 *   ai           lilac, rounded and dashed
 *   human        coral, with a diamond
 *   proposal     proposal blue, dotted
 * Animations only reveal order: rule → geometry, evidence → evaluation,
 * agent → tool action, uncertainty → decision, version → provenance.
 */

export const W = 'rgba(255,255,255,0.92)';
export const W6 = 'rgba(255,255,255,0.62)';
export const W3 = 'rgba(255,255,255,0.3)';
export const W1 = 'rgba(255,255,255,0.12)';
export const BG = 'rgb(16,49,118)';
export const col = (r: Role) => ROLE_STYLE[r].colour;

export function wrap(text: string, max: number): string[] {
  const out: string[] = [];
  let line = '';
  for (const w of text.split(' ')) {
    if (line && (line + ' ' + w).length > max) {
      out.push(line);
      line = w;
    } else line = line ? line + ' ' + w : w;
  }
  if (line) out.push(line);
  return out;
}

export function T({ x, y, children, size = 20, fill = W, anchor = 'start', weight = 400, mono = false, lh = 1.3 }: { x: number; y: number; children: string; size?: number; fill?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number; mono?: boolean; lh?: number }) {
  const parts = children.split('\n');
  return (
    <text x={x} y={y} fontSize={size} fill={fill} textAnchor={anchor} fontWeight={weight} className={mono ? 'dg-mono' : 'dg-sans'}>
      {parts.map((p, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : size * lh}>
          {p}
        </tspan>
      ))}
    </text>
  );
}

export function Svg({ vb, children, label }: { vb: string; children: ReactNode; label: string }) {
  return (
    <svg viewBox={vb} className="dg" preserveAspectRatio="xMidYMid meet" role="img" aria-label={label}>
      <defs>
        <pattern id="fwHatch" width={10} height={10} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1={0} y1={0} x2={0} y2={10} stroke="var(--orange)" strokeWidth={2} opacity={0.55} />
        </pattern>
        <marker id="fwArrow" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={7} markerHeight={7} orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill={W6} />
        </marker>
        <marker id="fwArrowY" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={7} markerHeight={7} orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill="var(--yellow)" />
        </marker>
        <marker id="fwArrowC" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={7} markerHeight={7} orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill="var(--coral)" />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

/** A box drawn in its role's geometry. */
export function RoleBox({ x, y, w, h, role, on = 1 }: { x: number; y: number; w: number; h: number; role: Role; on?: number }) {
  const c = col(role);
  const common = { x, y, width: w, height: h, opacity: on };
  if (role === 'ai') return <rect {...common} rx={18} fill="rgba(200,185,255,0.08)" stroke={c} strokeWidth={2.2} strokeDasharray="9 7" />;
  if (role === 'proposal') return <rect {...common} fill="rgba(137,167,255,0.07)" stroke={c} strokeWidth={2.2} strokeDasharray="2 7" strokeLinecap="round" />;
  if (role === 'uncertain')
    return (
      <g opacity={on}>
        <rect x={x} y={y} width={w} height={h} fill="url(#fwHatch)" />
        <rect x={x} y={y} width={w} height={h} fill="rgba(232,146,74,0.08)" stroke={c} strokeWidth={2.2} />
      </g>
    );
  const fill = role === 'compute' ? 'rgba(112,215,206,0.10)' : role === 'source' ? 'rgba(242,207,85,0.09)' : role === 'human' ? 'rgba(244,123,92,0.10)' : 'rgba(255,255,255,0.06)';
  return (
    <g opacity={on}>
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke={c} strokeWidth={2.2} />
      {role === 'source' && <path d={`M${x} ${y} h18 L${x} ${y + 18} z`} fill={c} />}
      {role === 'human' && <path d={`M${x + w / 2} ${y - 9} l9 9 l-9 9 l-9 -9 z`} fill={c} />}
    </g>
  );
}

/** Small role glyph for legends and markers. */
export function Glyph({ x, y, role, s = 22 }: { x: number; y: number; role: Role; s?: number }) {
  const c = col(role);
  if (role === 'human') return <path d={`M${x} ${y - s / 2} l${s / 2} ${s / 2} l${-s / 2} ${s / 2} l${-s / 2} ${-s / 2} z`} fill={c} />;
  if (role === 'ai') return <rect x={x - s / 2} y={y - s / 2} width={s} height={s} rx={s / 3} fill="none" stroke={c} strokeWidth={2.4} strokeDasharray="4 3" />;
  if (role === 'uncertain') return <rect x={x - s / 2} y={y - s / 2} width={s} height={s} fill="url(#fwHatch)" stroke={c} strokeWidth={2.4} />;
  return <rect x={x - s / 2} y={y - s / 2} width={s} height={s} fill={c} />;
}

// ── Research map (title: proposed territory faint · closing: resolved) ─────

function statusParcel(status: EvidenceStatus, x: number, y: number, w: number, h: number, key: string) {
  switch (status) {
    case 'published':
      return (
        <g key={key}>
          <rect x={x - 6} y={y + h} width={w + 12} height={8} fill={W6} />
          <rect x={x} y={y} width={w} height={h} fill="rgba(255,255,255,0.82)" />
        </g>
      );
    case 'accepted':
      return (
        <g key={key}>
          <rect x={x - 6} y={y + h} width={w + 12} height={8} fill={W3} />
          <rect x={x} y={y} width={w} height={h} fill="rgba(255,255,255,0.55)" />
        </g>
      );
    case 'under-revision':
      return (
        <g key={key}>
          <rect x={x} y={y} width={w} height={h} fill="url(#fwHatch)" />
          <rect x={x} y={y} width={w} height={h} fill="none" stroke="var(--orange)" strokeWidth={2} strokeDasharray="6 5" />
        </g>
      );
    case 'verified-computation':
      return (
        <g key={key}>
          <rect x={x} y={y} width={w} height={h} fill="rgba(112,215,206,0.10)" stroke={W} strokeWidth={1.8} />
          {[
            [x, y],
            [x + w, y],
          ].map(([a, b], i) => (
            <rect key={i} x={a! - 4} y={b! - 4} width={8} height={8} fill="var(--cyan)" />
          ))}
        </g>
      );
    default:
      return <rect key={key} x={x} y={y} width={w} height={h} fill="rgba(255,255,255,0.18)" stroke={W6} strokeWidth={1.6} />;
  }
}

function Atlas({ full }: { full: boolean }) {
  const t = useT(full ? 2400 : 3000, 300);
  const ground = 330;
  const top = 110;
  const pts: [number, number][] = [];
  return (
    <Svg vb="0 0 1600 560" label="Research map: my territories from form to computation, the proposed PhD territory, and selected precedents from the wider field.">
      <line x1={20} y1={ground} x2={1580} y2={ground} stroke={W3} strokeWidth={1.5} />
      {TERRITORIES.map((tr, i) => {
        const on = win(t, i * 0.12, i * 0.12 + 0.25);
        const phd = tr.id === 'phd';
        const gap = 14;
        const total = tr.parcels.reduce((a, p) => a + p.w, 0) + gap * (tr.parcels.length - 1);
        let px = tr.x + (tr.w - total) / 2;
        const heights: Record<string, number> = { form: 70, systems: 80, perception: 120, prototypes: 150 };
        const h = heights[tr.id] ?? 0;
        return (
          <g key={tr.id} opacity={phd ? (full ? on : 0.2 + 0.25 * on) : 0.25 + 0.75 * on}>
            {phd ? (
              <RoleBox x={tr.x} y={top - 40} w={tr.w} h={ground - top + 40} role="proposal" />
            ) : (
              <rect x={tr.x} y={top} width={tr.w} height={ground - top} fill="none" stroke={W1} strokeWidth={1.5} strokeDasharray="5 6" />
            )}
            {tr.parcels.map((p) => {
              const x = px;
              px += p.w + gap;
              pts.push([x + p.w / 2, ground - h]);
              return (
                <g key={p.label}>
                  {statusParcel(p.status, x, ground - h, p.w, h, p.label)}
                  <T x={x + p.w / 2} y={ground + 34} size={18} fill={W6} anchor="middle" mono>
                    {p.label}
                  </T>
                </g>
              );
            })}
            <T x={tr.x + (phd ? 24 : tr.w / 2)} y={phd ? top - 4 : ground + 78} size={phd ? 34 : 23} fill={phd ? 'var(--proposal)' : W} anchor={phd ? 'start' : 'middle'} weight={700} lh={1.15}>
              {phd ? tr.name : wrap(tr.name, 14).join('\n')}
            </T>
            {phd && (
              <T x={tr.x + 24} y={top + 26} size={20} fill={W6} mono>
                {tr.sub}
              </T>
            )}
            {phd && full && (
              <g opacity={win(t, 0.7, 1)}>
                {PHD_DISTRICTS.map((d, k) => {
                  const dx = tr.x + 30 + k * ((tr.w - 60) / 3);
                  const role: Role = k === 0 ? 'source' : k === 1 ? 'ai' : 'compute';
                  return (
                    <g key={d}>
                      <RoleBox x={dx + 6} y={top + 60} w={(tr.w - 60) / 3 - 18} h={ground - top - 80} role={role} />
                      <T x={dx + (tr.w - 60) / 6} y={top + 60 + (ground - top - 80) / 2 + 8} size={22} fill={col(role)} anchor="middle" weight={700}>
                        {d}
                      </T>
                    </g>
                  );
                })}
              </g>
            )}
            {phd && !full && (
              <T x={tr.x + tr.w / 2} y={top + (ground - top) / 2 + 30} size={56} fill="var(--proposal)" anchor="middle" weight={300}>
                ?
              </T>
            )}
          </g>
        );
      })}
      {/* route through my work toward the proposed territory */}
      {pts.length > 1 && (
        <g>
          {full ? (
            <polyline points={[...pts, [1010, ground - 110] as [number, number]].map((p) => p.join(',')).join(' ')} fill="none" stroke="var(--yellow)" strokeWidth={3} pathLength={1} strokeDasharray={`${t} 1`} />
          ) : (
            <polyline points={[...pts, [1010, ground - 110] as [number, number]].map((p) => p.join(',')).join(' ')} fill="none" stroke="var(--yellow)" strokeWidth={3} strokeDasharray="10 8" opacity={t} />
          )}
        </g>
      )}
      {/* The wider field: separately bounded, others' work */}
      <g opacity={full ? 0.25 + 0.75 * win(t, 0.5, 0.9) : 0.35}>
        <rect x={980} y={ground + 50} width={580} height={150} fill="none" stroke={W6} strokeWidth={1.5} />
        <rect x={986} y={ground + 56} width={568} height={138} fill="none" stroke={W3} strokeWidth={1} />
        <T x={1000} y={ground + 86} size={18} fill={W6} mono>
          {GENENV_TERRITORY.label.toUpperCase()}
        </T>
        <T x={1000} y={ground + 120} size={20} fill={W} lh={1.4}>
          {[GENENV_TERRITORY.projects.slice(0, 2).join(' · '), GENENV_TERRITORY.projects.slice(2, 4).join(' · '), GENENV_TERRITORY.projects[4]].join('\n')}
        </T>
      </g>
    </Svg>
  );
}

export const AtlasOpen = () => <Atlas full={false} />;
export const AtlasFull = () => <Atlas full />;

// ── Capability chain: one question carried end to end ──────────────────────
export function Capability() {
  const t = useT(2600, 300);
  const nodes = [
    { n: 'Design question', s: '' },
    { n: 'Prototype', s: 'Unity · C#' },
    { n: 'Data pipeline', s: 'Python · JavaScript' },
    { n: 'Interaction', s: 'sensing · interface' },
    { n: 'Study', s: 'participants' },
    { n: 'Analysis', s: 'statistics · interviews' },
    { n: 'Publication', s: 'eCAADe · ISS' },
  ];
  const pos = (i: number): [number, number] => (i < 4 ? [110 + i * 260, 120] : [110 + (7 - 1 - i) * 260 + 260, 330]);
  return (
    <Svg vb="0 0 1000 520" label="Capability chain from a design question to publication.">
      {nodes.map((nd, i) => {
        const [x, y] = pos(i);
        const on = win(t, i * 0.11, i * 0.11 + 0.18);
        const next = i < nodes.length - 1 ? pos(i + 1) : null;
        return (
          <g key={nd.n} opacity={0.2 + 0.8 * on}>
            {next && (
              <path
                d={i === 3 ? `M${x + 60} ${y} C ${x + 130} ${y}, ${x + 130} ${next[1]}, ${next[0] + 60} ${next[1]}` : `M${x + (next[0] > x ? 60 : -60)} ${y} L${next[0] + (next[0] > x ? -64 : 64)} ${next[1]}`}
                fill="none"
                stroke="var(--yellow)"
                strokeWidth={2.5}
                markerEnd="url(#fwArrowY)"
                opacity={win(t, i * 0.11 + 0.1, i * 0.11 + 0.2)}
              />
            )}
            <circle cx={x} cy={y} r={56} fill={BG} stroke={i === 6 ? 'var(--cyan)' : W} strokeWidth={2.4} />
            <T x={x} y={y + 7} size={20} anchor="middle" weight={700}>
              {String(i + 1).padStart(2, '0')}
            </T>
            <T x={x} y={y + 92} size={23} anchor="middle" weight={600}>
              {nd.n}
            </T>
            {nd.s && (
              <T x={x} y={y + 120} size={17} anchor="middle" fill={W6} mono>
                {nd.s}
              </T>
            )}
          </g>
        );
      })}
      <T x={30} y={505} size={17} fill={W6} mono>
        SPATIAL TOOLS: RHINO · GRASSHOPPER · LADYBUG · GIS
      </T>
    </Svg>
  );
}

// ── Division of roles across the four research projects ────────────────────────
export function Roles() {
  const t = useT(3000, 300);
  const projects = [
    { n: 'Zoning Literacy\nAssistant', k: 'regulation', ai: 'retrieves clauses,\ndrafts the answer', code: 'site arithmetic', human: 'reads a cited\nanswer' },
    { n: 'Parametric Massing\nGenerator', k: 'editable geometry', ai: 'extracts rules with\nsource phrases', code: 'envelope geometry', human: 'edits parameters' },
    { n: 'View Corridor\nMassing', k: 'spatial constraint', ai: 'reads results\nagainst the brief', code: 'floor-by-floor\nclipping', human: 'chooses the form' },
    { n: 'Environmental\nMassing Agents', k: 'performance critique', ai: 'proposes and\ncritiques', code: 'scores every\ndesign', human: 'weighs trade-offs' },
  ];
  const rows: { role: Role; label: string; key: 'ai' | 'code' | 'human' }[] = [
    { role: 'ai', label: 'AI interprets\nand proposes', key: 'ai' },
    { role: 'compute', label: 'Verified code\ncomputes', key: 'code' },
    { role: 'human', label: 'The designer\njudges', key: 'human' },
  ];
  const x0 = 300;
  const cw = 318;
  return (
    <Svg vb="0 0 1600 600" label="Who does what in each research project: AI, verified code, the designer.">
      {projects.map((p, i) => (
        <g key={p.n} opacity={win(t, i * 0.15, i * 0.15 + 0.2)}>
          <T x={x0 + i * cw + 14} y={44} size={22} weight={700}>
            {p.n}
          </T>
          <T x={x0 + i * cw + 14} y={110} size={16} fill="var(--yellow)" mono>
            {p.k.toUpperCase()}
          </T>
        </g>
      ))}
      {rows.map((r, j) => {
        const y = 140 + j * 150;
        return (
          <g key={r.key}>
            <Glyph x={30} y={y + 50} role={r.role} />
            <T x={58} y={y + 44} size={21} fill={col(r.role)} weight={700}>
              {r.label}
            </T>
            {projects.map((p, i) => {
              const on = win(t, i * 0.15 + j * 0.05 + 0.05, i * 0.15 + j * 0.05 + 0.25);
              return (
                <g key={p.n} opacity={on}>
                  <RoleBox x={x0 + i * cw} y={y + 8} w={cw - 22} h={118} role={r.role} />
                  <T x={x0 + i * cw + 20} y={y + 58} size={21}>
                    {p[r.key]}
                  </T>
                </g>
              );
            })}
          </g>
        );
      })}
    </Svg>
  );
}

// ── What exists and what is missing ─────────────────────────────────────────
export function Gap() {
  const t = useT(3600, 300);
  const chain = ['Regulation', 'Evidence', 'Editable geometry', 'Performance', 'Critique', 'Human judgment'];
  const x0 = 150;
  const dx = 260;
  const cover = [
    { n: 'Zoning Literacy Assistant', a: 0, b: 1 },
    { n: 'Parametric Massing Generator', a: 0, b: 2 },
    { n: 'View Corridor Massing', a: 2, b: 3 },
    { n: 'Environmental Massing Agents', a: 3, b: 4 },
  ];
  return (
    <Svg vb="0 0 1600 640" label="The chain from regulation to judgment, the research projects covering parts of it, and the missing layer.">
      <line x1={x0} y1={70} x2={x0 + dx * 5} y2={70} stroke={W3} strokeWidth={3} />
      {chain.map((c, i) => {
        const human = i === 5;
        return (
          <g key={c} opacity={win(t, i * 0.05, i * 0.05 + 0.15)}>
            {human ? <Glyph x={x0 + i * dx} y={70} role="human" s={30} /> : <circle cx={x0 + i * dx} cy={70} r={13} fill="var(--yellow)" />}
            <T x={x0 + i * dx} y={30} size={21} anchor="middle" weight={700} fill={human ? 'var(--coral)' : W}>
              {c}
            </T>
          </g>
        );
      })}
      {cover.map((c, j) => {
        const y = 118 + j * 54;
        const on = win(t, 0.25 + j * 0.08, 0.4 + j * 0.08);
        const xa = x0 + c.a * dx - 30;
        const xb = x0 + c.b * dx + 30;
        return (
          <g key={c.n} opacity={on}>
            <line x1={x0 + c.a * dx} y1={83} x2={x0 + c.a * dx} y2={y} stroke={W1} strokeDasharray="3 5" />
            <rect x={xa} y={y} width={(xb - xa) * on} height={38} fill="rgba(112,215,206,0.14)" stroke="var(--cyan)" strokeWidth={1.8} />
            <T x={xa + 14} y={y + 26} size={19}>
              {c.n}
            </T>
          </g>
        );
      })}
      <g opacity={win(t, 0.72, 0.95)}>
        <RoleBox x={20} y={360} w={1560} h={260} role="proposal" />
        <T x={50} y={404} size={20} fill="var(--proposal)" weight={700} mono>
          MISSING ACROSS ALL FOUR
        </T>
        {GAPS.map((g, i) => (
          <g key={g}>
            <rect x={50 + (i % 2) * 770} y={448 + Math.floor(i / 2) * 82} width={12} height={12} fill="var(--proposal)" />
            <T x={78 + (i % 2) * 770} y={460 + Math.floor(i / 2) * 82} size={24}>
              {wrap(g.charAt(0).toUpperCase() + g.slice(1), 52).join('\n')}
            </T>
          </g>
        ))}
      </g>
    </Svg>
  );
}

// ── Provenance record of one view-corridor revision ─────────────────────────
export function ProvenanceChain() {
  const t = useT(4800, 300);
  const n = PROVENANCE_LINKS.length;
  const dy = 100;
  return (
    <Svg vb="0 0 1160 860" label="One design revision written as a provenance record, link by link.">
      <line x1={70} y1={60} x2={70} y2={60 + (n - 1) * dy} stroke={W1} strokeWidth={3} />
      <line x1={70} y1={60} x2={70} y2={60 + (n - 1) * dy * t} stroke="var(--yellow)" strokeWidth={3} />
      {PROVENANCE_LINKS.map((l, i) => {
        const on = win(t, i / n - 0.02, i / n + 0.08);
        const y = 60 + i * dy;
        return (
          <g key={l.id} opacity={0.15 + 0.85 * on}>
            <Glyph x={70} y={y} role={l.role} s={26} />
            <RoleBox x={120} y={y - 38} w={1010} h={76} role={l.role} />
            <T x={146} y={y + 8} size={22} fill={col(l.role)} weight={700} mono>
              {l.label.toUpperCase()}
            </T>
            <T x={430} y={y + 8} size={25}>
              {l.value}
            </T>
          </g>
        );
      })}
    </Svg>
  );
}

// ── The proposed framework ─────────────────────────────────────────────────
export function Architecture() {
  const t = useT(4200, 300);
  const n = ARCHITECTURE.length;
  const bw = 200;
  const gap = 26;
  const x0 = 20;
  const y = 20;
  const bh = 190;
  const agentsX = x0 + 2 * (bw + gap);
  return (
    <Svg vb="0 0 1600 560" label="Layers of the proposed framework, the provenance graph beneath them, and the autonomy levels the designer sets.">
      {ARCHITECTURE.map((a, i) => {
        const x = x0 + i * (bw + gap);
        const on = win(t, i * 0.08, i * 0.08 + 0.16);
        return (
          <g key={a.id} opacity={0.15 + 0.85 * on}>
            {i < n - 1 && <line x1={x + bw + 2} y1={y + bh / 2} x2={x + bw + gap - 4} y2={y + bh / 2} stroke={W6} strokeWidth={2} markerEnd="url(#fwArrow)" />}
            <RoleBox x={x} y={y} w={bw} h={bh} role={a.role} />
            <T x={x + 16} y={y + 40} size={21} fill={col(a.role)} weight={700}>
              {wrap(a.name, 15).join('\n')}
            </T>
            <T x={x + 14} y={y + 104} size={18} fill={W} lh={1.3}>
              {wrap(a.items, 19).join('\n')}
            </T>
            {/* every layer writes into the provenance graph */}
            <line x1={x + bw / 2} y1={y + bh} x2={x + bw / 2} y2={470} stroke="var(--yellow)" strokeWidth={1.6} strokeDasharray="3 5" opacity={win(t, 0.75, 0.9)} />
            <rect x={x + bw / 2 - 6} y={464} width={12} height={12} fill="var(--yellow)" opacity={win(t, 0.75, 0.9)} />
          </g>
        );
      })}
      {/* autonomy control, set by the designer */}
      <g opacity={win(t, 0.45, 0.65)}>
        <T x={agentsX} y={262} size={18} fill="var(--coral)" mono>
          AGENCY SET BY THE DESIGNER
        </T>
        {AUTONOMY.map((a, i) => {
          const x = agentsX + i * 268;
          const sel = i === 2;
          return (
            <g key={a.name}>
              <rect x={x} y={278} width={256} height={100} rx={14} fill={BG} />
              <rect x={x} y={278} width={256} height={100} rx={14} fill={sel ? 'rgba(200,185,255,0.22)' : 'rgba(200,185,255,0.05)'} stroke="var(--lilac)" strokeWidth={sel ? 3 : 1.6} strokeDasharray={sel ? undefined : '7 6'} />
              <T x={x + 16} y={310} size={18} fill="var(--lilac)" weight={700}>
                {`${a.level} · ${a.name}`}
              </T>
              <T x={x + 16} y={352} size={18} fill={W6}>
                {a.what}
              </T>
            </g>
          );
        })}
        <path d={`M${x0 + 6 * (bw + gap) + bw / 2} ${y + bh + 12} C ${x0 + 6 * (bw + gap) + bw / 2} 330, ${agentsX + 4 * 268 + 40} 328, ${agentsX + 4 * 268 - 6} 328`} fill="none" stroke="var(--coral)" strokeWidth={2.2} markerEnd="url(#fwArrowC)" />
      </g>
      <g opacity={win(t, 0.75, 0.95)}>
        <line x1={x0} y1={470} x2={x0 + n * (bw + gap) - gap} y2={470} stroke="var(--yellow)" strokeWidth={4} />
        <T x={x0} y={516} size={20} fill="var(--yellow)" weight={700} mono>
          PERFORMANCE-PROVENANCE GRAPH
        </T>
        <T x={x0 + 400} y={516} size={18} fill={W}>
          intent, sources, operations, assumptions, results, agent actions and decisions, linked across versions
        </T>
      </g>
    </Svg>
  );
}

// ── One Vancouver scenario ─────────────────────────────────────────────────
export function Scenario() {
  const t = useT(5200, 300);
  const fw = 182;
  const gap = 15;
  const x0 = 16;
  const y = 50;
  const fh = 270;
  return (
    <Svg vb="0 0 1600 440" label="Eight steps of one illustrative Vancouver design session.">
      {SCENARIO.map((s, i) => {
        const x = x0 + i * (fw + gap);
        const on = win(t, i * 0.1, i * 0.1 + 0.14);
        return (
          <g key={s.n} opacity={0.12 + 0.88 * on}>
            <RoleBox x={x} y={y} w={fw} h={fh} role={s.role} />
            <T x={x + 18} y={y + 42} size={30} fill={col(s.role)} weight={700}>
              {String(s.n)}
            </T>
            <T x={x + 16} y={y + 90} size={24} weight={700} lh={1.2}>
              {wrap(s.what, 11).join('\n')}
            </T>
            <T x={x + 16} y={y + 172} size={20} fill={W} lh={1.3}>
              {wrap(s.detail, 15).join('\n')}
            </T>
            {i < SCENARIO.length - 1 && <line x1={x + fw + 1} y1={y + fh / 2} x2={x + fw + gap - 3} y2={y + fh / 2} stroke={W6} strokeWidth={2} markerEnd="url(#fwArrow)" />}
          </g>
        );
      })}
      {/* version record */}
      <g opacity={win(t, 0.85, 1)}>
        <line x1={x0} y1={378} x2={x0 + 8 * (fw + gap) - gap} y2={378} stroke="var(--yellow)" strokeWidth={3} />
        {SCENARIO.map((s, i) => (
          <rect key={s.n} x={x0 + i * (fw + gap) + fw / 2 - 7} y={371} width={14} height={14} fill="var(--yellow)" />
        ))}
        <T x={x0} y={426} size={21} fill="var(--yellow)" mono>
          V1 → V2 · EVERY STEP RECORDED, EVERY ONE REVERSIBLE
        </T>
      </g>
    </Svg>
  );
}

// ── Research questions, methods, contributions ─────────────────────────────
export function RqMap() {
  const t = useT(3600, 300);
  const cols = [
    { x: 20, w: 760, h: 'QUESTION' },
    { x: 820, w: 360, h: 'METHOD' },
    { x: 1220, w: 360, h: 'CONTRIBUTION' },
  ];
  const rh = 128;
  return (
    <Svg vb="0 0 1600 600" label="Three research questions, each with its method and contribution.">
      {cols.map((c) => (
        <T key={c.h} x={c.x} y={28} size={19} fill={W6} mono>
          {c.h}
        </T>
      ))}
      {RESEARCH_QUESTIONS.map((q, i) => {
        const y = 46 + i * (rh + 14);
        const on = win(t, i * 0.2, i * 0.2 + 0.25);
        return (
          <g key={q.id} opacity={0.15 + 0.85 * on}>
            <RoleBox x={cols[0]!.x} y={y} w={cols[0]!.w} h={rh} role="proposal" />
            <T x={cols[0]!.x + 18} y={y + 36} size={24} fill="var(--proposal)" weight={700}>
              {`${q.id} · ${q.name}`}
            </T>
            <T x={cols[0]!.x + 18} y={y + 72} size={21} lh={1.28}>
              {wrap(q.question, 64).join('\n')}
            </T>
            <line x1={cols[0]!.x + cols[0]!.w + 4} y1={y + rh / 2} x2={cols[1]!.x - 6} y2={y + rh / 2} stroke={W6} strokeWidth={2} markerEnd="url(#fwArrow)" />
            <RoleBox x={cols[1]!.x} y={y} w={cols[1]!.w} h={rh} role="operation" />
            <T x={cols[1]!.x + 18} y={y + 46} size={22} lh={1.28}>
              {wrap(q.method, 28).join('\n')}
            </T>
            <line x1={cols[1]!.x + cols[1]!.w + 4} y1={y + rh / 2} x2={cols[2]!.x - 6} y2={y + rh / 2} stroke={W6} strokeWidth={2} markerEnd="url(#fwArrow)" />
            <RoleBox x={cols[2]!.x} y={y} w={cols[2]!.w} h={rh} role="source" />
            <T x={cols[2]!.x + 24} y={y + 46} size={22} lh={1.28}>
              {wrap(q.contribution, 27).join('\n')}
            </T>
          </g>
        );
      })}
      <g opacity={win(t, 0.7, 0.95)}>
        <T x={20} y={500} size={19} fill={W6} mono>
          {`RQ2 CONDITIONS: ${CONDITIONS.join(' · ').toUpperCase()}`}
        </T>
        <T x={20} y={550} size={24} fill="var(--yellow)" weight={700}>
          Across all three: an editable agentic co-design framework connected to Rhino, Grasshopper and analysis tools.
        </T>
      </g>
    </Svg>
  );
}

// ── The route: each stage, drawn in its own language, and what it carried ──
export function Route() {
  const t = useT(3000, 300);
  const stages = [
    { n: 'Spatial design', p: 'Tabriz · architecture', c: 'space, narrative, form' },
    { n: 'Environmental systems', p: 'Istanbul · landscape', c: 'terrain, water, ecology' },
    { n: 'Human perception', p: 'eCAADe · VR', c: 'how people read space' },
    { n: 'Interactive systems', p: 'SFU · HCI', c: 'build and evaluate' },
    { n: 'Computational design', p: '4 research projects', c: 'rules, geometry, agents' },
    { n: 'Possible PhD research', p: '3 directions to discuss', c: 'performance-aware co-design' },
  ];
  const x0 = 130;
  const dx = 268;
  const ly = 190;
  const glyph = (i: number, x: number) => {
    const y = 95;
    switch (i) {
      case 0: // making: loose blocks
        return (
          <g stroke={W} strokeWidth={2.2} fill="none">
            <rect x={x - 38} y={y + 4} width={34} height={34} />
            <rect x={x + 4} y={y + 4} width={34} height={34} />
            <rect x={x - 16} y={y - 34} width={34} height={34} transform={`rotate(-12 ${x} ${y - 17})`} />
          </g>
        );
      case 1: // form: three sharp angled masses
        return (
          <g fill="rgba(255,255,255,0.85)">
            <polygon points={`${x - 52},${y + 38} ${x - 30},${y - 30} ${x - 14},${y + 38}`} />
            <polygon points={`${x - 10},${y + 38} ${x + 12},${y - 44} ${x + 22},${y + 38}`} />
            <polygon points={`${x + 26},${y + 38} ${x + 50},${y - 18} ${x + 56},${y + 38}`} />
          </g>
        );
      case 2: // systems: contours and runoff
        return (
          <g fill="none" strokeWidth={2.2}>
            {[0, 1, 2].map((k) => (
              <path key={k} d={`M${x - 56} ${y - 26 + k * 24} C ${x - 20} ${y - 46 + k * 24}, ${x + 20} ${y - 6 + k * 24}, ${x + 56} ${y - 26 + k * 24}`} stroke={W6} />
            ))}
            <path d={`M${x - 30} ${y - 40} L${x} ${y + 4} L${x + 26} ${y + 40}`} stroke="var(--cyan)" strokeDasharray="5 5" />
          </g>
        );
      case 3: // evidence: transparency circles and data points
        return (
          <g>
            {[0.85, 0.5, 0.2].map((o, k) => (
              <circle key={k} cx={x - 34 + k * 34} cy={y - 8} r={20} fill="var(--cyan)" fillOpacity={o} stroke={W6} />
            ))}
            {[0, 1, 2, 3, 4].map((k) => (
              <circle key={k} cx={x - 44 + k * 22} cy={y + 34 - ((k * 7) % 13)} r={3.5} fill={W} />
            ))}
          </g>
        );
      case 4: // computation: a small node graph
        return (
          <g stroke="var(--cyan)" strokeWidth={2}>
            <line x1={x - 44} y1={y + 20} x2={x} y2={y - 28} />
            <line x1={x} y1={y - 28} x2={x + 44} y2={y + 20} />
            <line x1={x - 44} y1={y + 20} x2={x + 44} y2={y + 20} />
            {[[x - 44, y + 20], [x, y - 28], [x + 44, y + 20]].map(([a, b], k) => (
              <rect key={k} x={a! - 9} y={b! - 9} width={18} height={18} fill="rgba(112,215,206,0.25)" />
            ))}
          </g>
        );
      default: // proposed: dotted territory with the designer's diamond
        return (
          <g>
            <rect x={x - 56} y={y - 40} width={112} height={80} fill="rgba(137,167,255,0.08)" stroke="var(--proposal)" strokeWidth={2.2} strokeDasharray="2 7" strokeLinecap="round" />
            <path d={`M${x} ${y - 14} l14 14 l-14 14 l-14 -14 z`} fill="var(--coral)" />
          </g>
        );
    }
  };
  return (
    <Svg vb="0 0 1600 370" label="The route from making to agentic co-design, with the capability each stage carried forward.">
      <line x1={x0} y1={ly} x2={x0 + dx * 4} y2={ly} stroke={W1} strokeWidth={3} />
      <line x1={x0} y1={ly} x2={x0 + dx * 4 * Math.min(1, t / 0.8)} y2={ly} stroke="var(--yellow)" strokeWidth={3} />
      <line x1={x0 + dx * 4} y1={ly} x2={x0 + dx * 5} y2={ly} stroke="var(--proposal)" strokeWidth={3} strokeDasharray="3 8" strokeLinecap="round" opacity={win(t, 0.75, 0.95)} />
      {stages.map((st, i) => {
        const x = x0 + i * dx;
        const on = win(t, i * 0.13, i * 0.13 + 0.2);
        const last = i === stages.length - 1;
        return (
          <g key={st.n} opacity={0.15 + 0.85 * on}>
            {glyph([1, 2, 3, 0, 4, 5][i]!, x)}
            {last ? <path d={`M${x} ${ly - 11} l11 11 l-11 11 l-11 -11 z`} fill="var(--coral)" /> : <circle cx={x} cy={ly} r={9} fill="var(--yellow)" />}
            <T x={x} y={ly + 46} size={21} anchor="middle" weight={700} fill={last ? 'var(--proposal)' : W} lh={1.15}>
              {wrap(st.n, 13).join('\n')}
            </T>
            <T x={x} y={ly + 100} size={15} anchor="middle" fill={W6} mono>
              {st.p.toUpperCase()}
            </T>
            <T x={x} y={ly + 130} size={18} anchor="middle" fill={last ? 'var(--proposal)' : 'var(--cyan)'} lh={1.25}>
              {wrap(st.c, 20).join('\n')}
            </T>
          </g>
        );
      })}
    </Svg>
  );
}

// ── Where the research path converges: two routes, one shared question ─────
export function Confluence() {
  const t = useT(800, 60);
  const col1 = win(t, 0, 0.35);
  const q = win(t, 0.25, 0.6);
  const col3 = win(t, 0.5, 0.9);
  const list = (items: readonly string[], x: number, y0: number, max: number) => {
    let y = y0;
    return items.map((it) => {
      const ls = wrap(it, max);
      const node = (
        <g key={it}>
          <rect x={x} y={y - 13} width={9} height={9} fill={W6} />
          <T x={x + 22} y={y} size={22} lh={1.25}>
            {ls.join('\n')}
          </T>
        </g>
      );
      y += ls.length * 27.5 + 14;
      return node;
    });
  };
  return (
    <Svg vb="0 0 1600 560" label="Research fit: what I bring, the shared research question, and what I hope to develop.">
      <g opacity={col1}>
        <T x={20} y={34} size={19} fill={W6} weight={700} mono>
          WHAT I BRING
        </T>
        {list(CONFLUENCE.bring, 20, 82, 34)}
      </g>
      <g opacity={q}>
        <path d="M478 270 L 556 270" stroke={W6} strokeWidth={2.4} markerEnd="url(#fwArrow)" />
        <rect x={566} y={20} width={468} height={520} fill="rgba(242,207,85,0.08)" stroke="var(--yellow)" strokeWidth={3} />
        <T x={596} y={66} size={19} fill="var(--yellow)" weight={700} mono>
          THE SHARED QUESTION
        </T>
        <T x={596} y={124} size={28} weight={600} lh={1.3}>
          {wrap(CONFLUENCE.question, 26).join('\n')}
        </T>
        <path d="M1044 270 L 1112 270" stroke={W6} strokeWidth={2.4} markerEnd="url(#fwArrow)" />
      </g>
      <g opacity={col3}>
        <T x={1122} y={34} size={19} fill="var(--proposal)" weight={700} mono>
          WHAT I HOPE TO DEVELOP
        </T>
        {list(CONFLUENCE.develop, 1122, 82, 34)}
      </g>
    </Svg>
  );
}

// ── State of the art, then the remaining gap ────────────────────────────────
export function Soa() {
  const t = useT(3000, 300);
  const rowH = 66;
  return (
    <Svg vb="0 0 1600 560" label="Selected precedents organised by research capability, leading to the open research problem.">
      <T x={20} y={28} size={18} fill={W6} mono>
        ALREADY EXISTS · BY CAPABILITY
      </T>
      {STATE_OF_ART.map((r, i) => {
        const y = 48 + i * rowH;
        const on = win(t, i * 0.08, i * 0.08 + 0.15);
        return (
          <g key={r.what} opacity={0.15 + 0.85 * on}>
            <rect x={20} y={y} width={1000} height={rowH - 10} fill={r.edge ? 'rgba(242,207,85,0.05)' : 'rgba(255,255,255,0.04)'} stroke={r.edge ? 'var(--yellow)' : W3} strokeWidth={1.4} strokeDasharray={r.edge ? '7 6' : undefined} />
            <T x={38} y={y + 25} size={21} weight={600}>
              {r.what}
            </T>
            <T x={38} y={y + 47} size={15} fill={r.edge ? 'var(--yellow)' : W6} mono>
              {r.refs}
            </T>
          </g>
        );
      })}
      <T x={20} y={544} size={15} fill={W6} mono>
        SELECTED PRECEDENTS ACROSS COMPUTATIONAL DESIGN, HCI AND PERFORMANCE SIMULATION
      </T>
      <g opacity={win(t, 0.6, 0.9)}>
        <path d="M1020 467 C 1050 467, 1050 300, 1084 300" fill="none" stroke="var(--yellow)" strokeWidth={2.5} markerEnd="url(#fwArrowY)" />
        <rect x={1090} y={48} width={490} height={470} fill="rgba(242,207,85,0.05)" stroke="var(--yellow)" strokeWidth={2.2} strokeDasharray="9 7" />
        <T x={1114} y={88} size={19} fill="var(--yellow)" weight={700} mono>
          OPEN RESEARCH PROBLEM
        </T>
        <T x={1114} y={134} size={23} weight={600} lh={1.3}>
          {wrap(REMAINING_GAP, 35).join('\n')}
        </T>
        <T x={1114} y={392} size={18} fill={W6} lh={1.35}>
          {wrap(GAP_NOTE, 44).join('\n')}
        </T>
      </g>
    </Svg>
  );
}

// ── The shared loop, with performance provenance as its supporting record ───
export function Loop() {
  const t = useT(3200, 300);
  const n = LOOP.length;
  const bw = 230;
  const gap = 30;
  const x0 = 25;
  const y = 70;
  const bh = 150;
  return (
    <Svg vb="0 0 1600 430" label="Designer intention, AI interpretation, parametric change, verified calculation, evidence, designer decision, and the provenance record beneath.">
      {LOOP.map((l, i) => {
        const x = x0 + i * (bw + gap);
        const on = win(t, i * 0.1, i * 0.1 + 0.15);
        return (
          <g key={l.n} opacity={0.15 + 0.85 * on}>
            {i < n - 1 && <line x1={x + bw + 2} y1={y + bh / 2} x2={x + bw + gap - 4} y2={y + bh / 2} stroke={W6} strokeWidth={2} markerEnd="url(#fwArrow)" />}
            <RoleBox x={x} y={y} w={bw} h={bh} role={l.role} />
            <T x={x + 18} y={y + 46} size={16} fill={col(l.role)} mono>
              {String(i + 1).padStart(2, '0')}
            </T>
            <T x={x + 18} y={y + 84} size={22} weight={600} lh={1.22}>
              {wrap(l.n, 18).join('\n')}
            </T>
          </g>
        );
      })}
      <path d={`M${x0 + (n - 1) * (bw + gap) + bw / 2} ${y} C ${x0 + (n - 1) * (bw + gap) + bw / 2} 12, ${x0 + bw / 2} 12, ${x0 + bw / 2} ${y - 4}`} fill="none" stroke="var(--coral)" strokeWidth={2} strokeDasharray="6 6" markerEnd="url(#fwArrowC)" opacity={win(t, 0.65, 0.8)} />
      <g opacity={win(t, 0.75, 0.95)}>
        <line x1={x0} y1={y + bh + 60} x2={x0 + n * (bw + gap) - gap} y2={y + bh + 60} stroke="var(--yellow)" strokeWidth={4} />
        {LOOP.map((l, i) => (
          <rect key={l.n} x={x0 + i * (bw + gap) + bw / 2 - 6} y={y + bh + 54} width={12} height={12} fill="var(--yellow)" />
        ))}
        <T x={x0} y={y + bh + 112} size={20} fill="var(--yellow)" weight={700} mono>
          PERFORMANCE PROVENANCE · SUPPORTING RECORD
        </T>
        <T x={x0} y={y + bh + 148} size={20}>
          {PROVENANCE_RECORD}
        </T>
      </g>
    </Svg>
  );
}

// ── One program, three possible directions (kept for reuse; not on a step) ──
export function Branches() {
  const t = useT(3000, 300);
  const ys = [20, 195, 370];
  return (
    <Svg vb="0 0 1600 540" label="One shared research problem branching into three possible directions.">
      <g opacity={win(t, 0, 0.2)}>
        <rect x={20} y={170} width={470} height={210} fill="rgba(242,207,85,0.07)" stroke="var(--yellow)" strokeWidth={3} />
        <T x={44} y={208} size={16} fill="var(--yellow)" mono>
          ONE SHARED RESEARCH PROBLEM
        </T>
        <T x={44} y={248} size={22} weight={700} lh={1.25}>
          {wrap(GAP_NOTE, 34).join('\n')}
        </T>
      </g>
      {DIRECTIONS.map((d, i) => {
        const y = ys[i]!;
        const on = win(t, 0.25 + i * 0.18, 0.45 + i * 0.18);
        return (
          <g key={d.n} opacity={0.15 + 0.85 * on}>
            <path d={`M490 275 C 560 275, 560 ${y + 75}, 630 ${y + 75}`} fill="none" stroke="var(--proposal)" strokeWidth={2.5} strokeDasharray="3 8" strokeLinecap="round" />
            <RoleBox x={630} y={y} w={950} h={150} role="proposal" />
            <T x={656} y={y + 38} size={26} weight={700} fill="var(--proposal)">
              {`${d.n} · ${d.name}`}
            </T>
            <T x={656} y={y + 72} size={20}>
              {d.question}
            </T>
            <T x={656} y={y + 110} size={16} fill={W6} mono>
              {`EMPHASIS: ${d.emphasis.toUpperCase()}`}
            </T>
          </g>
        );
      })}
    </Svg>
  );
}

const PROPOSED = 'PROPOSED PHD RESEARCH · NOT YET BUILT';

/** A row of role boxes joined by arrows; `hl` boxes are drawn heavier. */
function SystemRow({ items, x0, y, bw, bh, gap, t, label }: { items: readonly { n: string; sub: string; role: Role; key?: boolean }[]; x0: number; y: number; bw: number; bh: number; gap: number; t: number; label: number }) {
  return (
    <>
      {items.map((c, i) => {
        const x = x0 + i * (bw + gap);
        const on = win(t, i * 0.06, i * 0.06 + 0.14);
        return (
          <g key={c.n} opacity={0.15 + 0.85 * on}>
            {i < items.length - 1 && <line x1={x + bw + 2} y1={y + bh / 2} x2={x + bw + gap - 3} y2={y + bh / 2} stroke={W6} strokeWidth={2} markerEnd="url(#fwArrow)" />}
            {c.key && <rect x={x - 7} y={y - 7} width={bw + 14} height={bh + 14} fill="rgba(137,167,255,0.10)" stroke="var(--proposal)" strokeWidth={4} />}
            <RoleBox x={x} y={y} w={bw} h={bh} role={c.role} />
            <T x={x + 14} y={y + 34} size={label} weight={c.key ? 700 : 600} lh={1.2} fill={W}>
              {wrap(c.n, Math.floor((bw - 28) / (label * 0.55))).join('\n')}
            </T>
            <T x={x + 14} y={y + bh - 16 - (wrap(c.sub, Math.floor((bw - 26) / 8.7)).length - 1) * 17.5} size={14} fill={W6} mono lh={1.25}>
              {wrap(c.sub, Math.floor((bw - 26) / 8.7)).join('\n')}
            </T>
          </g>
        );
      })}
    </>
  );
}

/** Return path from the last box to the first: the designer's revision loop. */
function Feedback({ x1, x2, y, t, label }: { x1: number; x2: number; y: number; t: number; label: string }) {
  return (
    <g opacity={win(t, 0.5, 0.7)}>
      <path d={`M${x2} ${y} C ${x2} ${y + 46}, ${x1} ${y + 46}, ${x1} ${y + 4}`} fill="none" stroke="var(--coral)" strokeWidth={2} strokeDasharray="6 6" markerEnd="url(#fwArrowC)" />
      <rect x={(x1 + x2) / 2 - 190} y={y + 24} width={380} height={28} fill={BG} />
      <T x={(x1 + x2) / 2} y={y + 44} size={15} fill="var(--coral)" anchor="middle" mono>
        {label}
      </T>
    </g>
  );
}

// ── The shared doctoral platform ───────────────────────────────────────────
export function Platform() {
  const t = useT(3200, 300);
  const bw = 176;
  const gap = 21;
  const x0 = 20;
  const y = 60;
  const bh = 150;
  const tags: Record<number, string> = { 1: 'EVIDENCE GRAPH', 2: 'AGENCY CONTROLLER', 3: 'DELIBERATION' };
  return (
    <Svg vb="0 0 1600 520" label="The shared platform: designer intent, structured representation, AI planner, MCP tool routing, Rhino and Grasshopper, deterministic simulation, evidence and verification, comparison and revision interface.">
      <T x={20} y={30} size={16} fill="var(--proposal)" weight={700} mono>
        {PROPOSED}
      </T>
      <SystemRow items={PLATFORM} x0={x0} y={y} bw={bw} bh={bh} gap={gap} t={t} label={19} />
      <Feedback x1={x0 + bw / 2} x2={x0 + 7 * (bw + gap) + bw / 2} y={y + bh} t={t} label="REVISE · APPROVE · ROLL BACK" />
      {PLATFORM.map((p, i) =>
        p.emph ? (
          <g key={p.n} opacity={win(t, 0.6 + p.emph * 0.08, 0.75 + p.emph * 0.08)}>
            <line x1={x0 + i * (bw + gap) + bw / 2} y1={y + bh + 62} x2={x0 + i * (bw + gap) + bw / 2} y2={y + bh + 92} stroke="var(--proposal)" strokeWidth={2} strokeDasharray="2 5" />
            <circle cx={x0 + i * (bw + gap) + bw / 2} cy={y + bh + 112} r={18} fill="none" stroke="var(--proposal)" strokeWidth={2.4} />
            <T x={x0 + i * (bw + gap) + bw / 2} y={y + bh + 119} size={19} weight={700} anchor="middle" fill="var(--proposal)">
              {String(p.emph)}
            </T>
            <T x={x0 + i * (bw + gap) + bw / 2} y={y + bh + 156} size={14} anchor="middle" fill="var(--proposal)" mono>
              {tags[p.emph]!}
            </T>
          </g>
        ) : null,
      )}
      <g opacity={win(t, 0.8, 1)}>
        <rect x={20} y={394} width={1560} height={1} fill={W3} />
        <Glyph x={32} y={425} role="ai" s={18} />
        <T x={52} y={432} size={20} weight={600}>
          The language model interprets, plans, calls tools and explains. It does not calculate performance numbers.
        </T>
        <Glyph x={32} y={461} role="compute" s={18} />
        <T x={52} y={468} size={20} fill={W6}>
          {PLATFORM_START}
        </T>
        <T x={20} y={508} size={14} fill={W6} mono>
          {PLATFORM_TOOLS}
        </T>
      </g>
    </Svg>
  );
}

// ── One direction: its system, what is new, how it would be evaluated ──────
function DirectionView({ index }: { index: number }) {
  const d = DIRECTIONS[index]!;
  const t = useT(3600, 300);
  const bw = 204;
  const gap = 22;
  const x0 = 20;
  const y = 56;
  const bh = 140;
  return (
    <Svg vb="0 0 1600 560" label={`${d.name}: proposed system, highlighted ${d.emphasis}, evaluation and contribution.`}>
      <T x={20} y={28} size={16} fill="var(--proposal)" weight={700} mono>
        {`${PROPOSED} · DIRECTION ${d.n} OF 3`}
      </T>
      {d.why && (
        <T x={1580} y={28} size={14} fill="var(--yellow)" anchor="end" mono>
          {d.why}
        </T>
      )}
      <SystemRow items={d.system} x0={x0} y={y} bw={bw} bh={bh} gap={gap} t={t} label={20} />
      <Feedback x1={x0 + bw / 2} x2={x0 + 6 * (bw + gap) + bw / 2} y={y + bh} t={t} label="REVISE · APPROVE · ROLL BACK" />
      <g opacity={win(t, 0.45, 0.65)}>
        <T x={20} y={286} size={17} fill="var(--proposal)" weight={700} mono>
          {`WHAT IS NEW · ${d.emphasis.toUpperCase()}`}
        </T>
        {d.keyPoints.map((k, i) => {
          const y = 306 + d.keyPoints.slice(0, i).reduce((a, p) => a + wrap(p, 44).length * 25.6 + 18, 0);
          return (
            <g key={k}>
              <rect x={20} y={y} width={10} height={10} fill="var(--proposal)" />
              <T x={42} y={y + 11} size={20} lh={1.28}>
                {wrap(k, 44).join('\n')}
              </T>
            </g>
          );
        })}
      </g>
      <g opacity={win(t, 0.6, 0.8)}>
        <T x={560} y={286} size={17} fill={W6} mono>
          EVALUATION
        </T>
        <T x={560} y={320} size={16} fill="var(--cyan)" mono>
          TECHNICAL
        </T>
        <T x={560} y={346} size={19} lh={1.28}>
          {wrap(d.technical, 44).join('\n')}
        </T>
        <T x={560} y={440} size={16} fill="var(--coral)" mono>
          WITH DESIGNERS
        </T>
        <T x={560} y={466} size={19} lh={1.28}>
          {wrap(d.study, 44).join('\n')}
        </T>
      </g>
      <g opacity={win(t, 0.75, 0.95)}>
        <rect x={1090} y={266} width={490} height={284} fill="rgba(242,207,85,0.05)" stroke="var(--yellow)" strokeWidth={2.2} strokeDasharray="9 7" />
        <T x={1112} y={302} size={17} fill="var(--yellow)" weight={700} mono>
          PROPOSED CONTRIBUTION
        </T>
        <T x={1112} y={340} size={21} weight={600} lh={1.3}>
          {wrap(d.contribution, 36).join('\n')}
        </T>
        <T x={1112} y={466} size={14} fill={W6} mono lh={1.35}>
          RESEARCH FOUNDATION
        </T>
        <T x={1112} y={490} size={16} fill={W} lh={1.3}>
          {wrap(d.foundation, 48).join('\n')}
        </T>
      </g>
    </Svg>
  );
}

export const Dir1 = () => <DirectionView index={0} />;
export const Dir2 = () => <DirectionView index={1} />;
export const Dir3 = () => <DirectionView index={2} />;


export const FRAMEWORK_RATIO = {
  'atlas-open': 1600 / 560,
  'atlas-full': 1600 / 560,
  capability: 1000 / 520,
  roles: 1600 / 600,
  gap: 1600 / 640,
  architecture: 1600 / 560,
  scenario: 1600 / 440,
  rqmap: 1600 / 600,
  route: 1600 / 370,
  confluence: 1600 / 560,
  soa: 1600 / 560,
  loop: 1600 / 430,
  branches: 1600 / 540,
  platform: 1600 / 520,
  dir1: 1600 / 560,
  dir2: 1600 / 560,
  dir3: 1600 / 560,
} as const;
