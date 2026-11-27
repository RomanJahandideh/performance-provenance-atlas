import type { ReactNode } from 'react';
import { useAppState, setState } from '../state/store';
import { STEPS } from '../data/steps';
import { systemFor, type SysBox, type SystemSpec, type Thumb } from '../data/systems';

/*
 * A system-workflow figure in the style of Figure 1 in Liu & Tian (2025):
 * light "paper" drawing, dotted regions, the designer and prompt cloud, input,
 * the LLM layer, the bridge, the tool environment with its component
 * repository, the model, the output, and the feedback loop to the designer.
 * Opened with D or the header button on the seven steps that have one.
 */

const INK = 'rgba(255,255,255,0.92)';
const MID = 'rgba(255,255,255,0.62)';
const LINE = 'rgba(255,255,255,0.35)';
const RED = 'var(--yellow)';
const BLUE = 'rgba(200,185,255,0.10)';
const PINK = 'rgba(242,207,85,0.06)';
const AI = 'rgb(200,185,255)';
const CYAN = 'var(--cyan)';
const CORAL = 'var(--coral)';
const PANEL = 'rgba(255,255,255,0.05)';
const DARK = 'rgb(16,49,118)';
const FONT = 'var(--font-body)';
const MONO = 'var(--font-mono)';

function wrap(text: string, max: number): string[] {
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

function Txt({ x, y, size = 13, fill = INK, anchor = 'middle', weight = 400, mono = false, lines, lh = 1.25 }: { x: number; y: number; size?: number; fill?: string; anchor?: 'start' | 'middle' | 'end'; weight?: number; mono?: boolean; lines: string[]; lh?: number }) {
  return (
    <text x={x} y={y} fontSize={size} fill={fill} textAnchor={anchor} fontWeight={weight} fontFamily={mono ? MONO : FONT}>
      {lines.map((l, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : size * lh}>
          {l}
        </tspan>
      ))}
    </text>
  );
}

/** A labelled box; text is vertically centred. */
function Box({ x, y, w, h, b, fill = PANEL, stroke = LINE, size = 13, dashed }: { x: number; y: number; w: number; h: number; b: SysBox; fill?: string; stroke?: string; size?: number; dashed?: boolean }) {
  const max = Math.floor(w / (size * 0.55));
  const label = wrap(b.label, max);
  const sub = b.sub ? wrap(b.sub, Math.floor(w / (11 * 0.55))) : [];
  const total = label.length * size * 1.2 + sub.length * 11 * 1.2;
  const y0 = y + h / 2 - total / 2 + size * 0.85;
  const d = dashed ?? b.dashed;
  return (
    <g className="sf-hov">
      <rect x={x} y={y} width={w} height={h} rx={4} fill={fill} stroke={stroke} strokeWidth={1.2} strokeDasharray={d ? '5 4' : undefined} />
      <Txt x={x + w / 2} y={y0} size={size} weight={600} lines={label} lh={1.2} />
      {sub.length > 0 && <Txt x={x + w / 2} y={y0 + label.length * size * 1.2} size={11} fill={MID} lines={sub} lh={1.2} />}
    </g>
  );
}

function Region({ x, y, w, h, title, fill = 'none', stroke = 'rgba(255,255,255,0.3)' }: { x: number; y: number; w: number; h: number; title: string; fill?: string; stroke?: string }) {
  return (
    <g className="sf-reg">
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke={stroke} strokeWidth={1.1} strokeDasharray="2 3" />
      <Txt x={x + w / 2} y={y + 16} size={11} fill={MID} lines={wrap(title, Math.floor(w / 6.2))} lh={1.2} />
    </g>
  );
}

function Arrow({ d, dashed }: { d: string; dashed?: boolean }) {
  return <path className="sf-flow" d={d} fill="none" stroke={INK} strokeWidth={1.2} strokeDasharray={dashed ? '3 3' : undefined} markerEnd="url(#sfArrow)" />;
}

/** Small drawings for component cards and the model, in the paper's grey tones. */
function ThumbArt({ t, x, y, w, h }: { t: Thumb; x: number; y: number; w: number; h: number }): ReactNode {
  const cx = x + w / 2;
  const cy = y + h / 2;
  switch (t) {
    case 'text':
      return (
        <g>
          {[0, 1, 2, 3].map((k) => (
            <rect key={k} x={x + 6} y={y + 6 + k * (h / 5)} width={(w - 12) * (k === 3 ? 0.55 : 1)} height={h / 9} fill={k === 1 ? 'rgba(244,123,92,0.55)' : 'rgba(255,255,255,0.28)'} />
          ))}
        </g>
      );
    case 'plan':
      return (
        <g>
          <rect x={x + 4} y={y + 4} width={w - 8} height={h - 8} fill="rgba(255,255,255,0.06)" stroke={MID} />
          <rect x={x + w * 0.22} y={y + h * 0.28} width={w * 0.56} height={h * 0.44} fill="rgba(112,215,206,0.25)" stroke={INK} strokeDasharray="3 2" />
        </g>
      );
    case 'massing':
      return (
        <g stroke={INK} strokeWidth={0.8}>
          {[0, 1, 2].map((k) => {
            const yy = cy + h * 0.2 - k * h * 0.2;
            return (
              <g key={k}>
                <path d={`M${cx - w * 0.3} ${yy} L${cx} ${yy + h * 0.12} L${cx + w * 0.3} ${yy} L${cx} ${yy - h * 0.12} z`} fill={k === 2 ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.18)'} />
              </g>
            );
          })}
        </g>
      );
    case 'section':
      return (
        <g>
          <line x1={x + 4} y1={y + h - 6} x2={x + w - 4} y2={y + h - 6} stroke={INK} />
          <line x1={x + 4} y1={y + h * 0.15} x2={x + w - 4} y2={y + h * 0.55} stroke={RED} strokeWidth={1.4} strokeDasharray="4 3" />
          {Array.from({ length: 6 }, (_, k) => {
            const top = y + h * 0.15 + (h * 0.4 * (k + 0.5)) / 6;
            return <rect key={k} x={x + w * 0.3 + k * 0} y={y + h - 6 - (k + 1) * ((h - 12) / 7)} width={w * 0.4} height={(h - 12) / 7 - 1} fill={top < y + h - 6 - (k + 1) * ((h - 12) / 7) ? 'rgba(112,215,206,0.25)' : 'rgba(255,255,255,0.06)'} stroke={MID} strokeWidth={0.6} />;
          })}
        </g>
      );
    case 'agents':
      return (
        <g>
          {[0, 1, 2, 3].map((k) => (
            <circle key={k} cx={x + w * (0.2 + k * 0.2)} cy={cy + (k % 2 ? -6 : 6)} r={6} fill="none" stroke={AI} />
          ))}
        </g>
      );
    case 'chart':
      return (
        <g>
          {[0.8, 0.45, 0.65, 0.3].map((v, k) => (
            <rect key={k} x={x + 8 + k * ((w - 16) / 4)} y={y + h - 4 - v * (h - 10)} width={(w - 16) / 4 - 4} height={v * (h - 10)} fill={k === 0 ? 'rgba(244,123,92,0.55)' : 'rgba(255,255,255,0.25)'} />
          ))}
        </g>
      );
    case 'map':
      return (
        <g>
          {[0, 1, 2].map((c) => [0, 1].map((r) => <rect key={`${c}${r}`} x={x + 4 + c * ((w - 8) / 3)} y={y + 4 + r * ((h - 8) / 2)} width={(w - 8) / 3 - 3} height={(h - 8) / 2 - 3} fill={c === 1 && r === 1 ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.06)'} stroke={MID} strokeWidth={0.6} />))}
          <path d={`M${cx} ${cy + h * 0.2} Q ${cx + w * 0.15} ${y + 6}, ${x + w - 12} ${y + 10}`} fill="none" stroke={RED} strokeWidth={1.3} markerEnd="url(#sfArrowR)" />
        </g>
      );
    case 'heat':
      return (
        <g>
          <rect x={x + 4} y={y + 4} width={w - 8} height={h - 8} fill="rgba(255,255,255,0.06)" stroke={MID} />
          <ellipse cx={cx + w * 0.1} cy={cy + h * 0.1} rx={w * 0.25} ry={h * 0.22} fill="url(#sfHeat)" />
        </g>
      );
    case 'timeline':
      return (
        <g>
          <line x1={x + 4} y1={y + h - 6} x2={x + w - 4} y2={y + h - 6} stroke={INK} />
          <line x1={x + 4} y1={y + h * 0.35} x2={x + w - 4} y2={y + h * 0.35} stroke={RED} strokeDasharray="3 2" />
          <path d={`M${x + 4} ${y + h * 0.75} L${x + w * 0.55} ${y + h * 0.3} L${x + w * 0.7} ${y + h * 0.6} L${x + w - 4} ${y + h * 0.62}`} fill="none" stroke={INK} strokeWidth={1.3} />
        </g>
      );
    case 'sun':
      return (
        <g>
          <circle cx={x + w * 0.3} cy={y + h * 0.4} r={h * 0.18} fill="rgba(242,207,85,0.7)" stroke={INK} strokeWidth={0.8} />
          <rect x={x + w * 0.55} y={y + h * 0.3} width={w * 0.15} height={h * 0.55} fill="rgba(255,255,255,0.18)" stroke={INK} strokeWidth={0.8} />
          <path d={`M${x + w * 0.7} ${y + h * 0.85} L${x + w - 4} ${y + h * 0.95} L${x + w * 0.7} ${y + h * 0.95} z`} fill="rgba(255,255,255,0.3)" />
        </g>
      );
    case 'terrain':
    default:
      return (
        <g>
          {[0, 1, 2].map((k) => (
            <path key={k} d={`M${x + 4} ${y + h * (0.35 + k * 0.2)} C ${x + w * 0.35} ${y + h * (0.15 + k * 0.2)}, ${x + w * 0.65} ${y + h * (0.55 + k * 0.2)}, ${x + w - 4} ${y + h * (0.3 + k * 0.2)}`} fill="none" stroke={k === 1 ? RED : MID} strokeWidth={1.1} />
          ))}
        </g>
      );
  }
}

function Figure({ s }: { s: SystemSpec }) {
  const L = s.left;
  const n = L.agents.length;
  const ah = Math.min(56, (250 - (n - 1) * 8) / n);
  const prompt = wrap(s.prompt, 30);
  return (
    <svg viewBox="0 0 1400 800" className="sf-svg" role="img" aria-label={`Figure ${s.figure}: ${s.caption}`} preserveAspectRatio="xMidYMid meet">
      <defs>
        <marker id="sfArrow" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={7} markerHeight={7} orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill={INK} />
        </marker>
        <marker id="sfArrowR" viewBox="0 0 10 10" refX={9} refY={5} markerWidth={6} markerHeight={6} orient="auto">
          <path d="M0 0L10 5L0 10z" fill={RED} />
        </marker>
        <radialGradient id="sfHeat">
          <stop offset="0" stopColor="#e2553a" stopOpacity={0.85} />
          <stop offset="1" stopColor="#e2553a" stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* feedback loop from the output back to the designer */}
      <path className="sf-flow" d="M1380 735 H1392 V22 H96 V40" fill="none" stroke={INK} strokeWidth={1.2} markerEnd="url(#sfArrow)" />
      <rect x={560} y={12} width={280} height={20} fill={DARK} />
      <Txt x={700} y={27} size={12} fill={MID} lines={[s.feedback]} />

      {/* designer and prompt cloud */}
      <g className="sf-hov" stroke={CORAL} strokeWidth={1.6} fill="none">
        <circle cx={96} cy={56} r={9} />
        <line x1={96} y1={65} x2={96} y2={92} />
        <line x1={80} y1={74} x2={112} y2={74} />
        <line x1={96} y1={92} x2={84} y2={110} />
        <line x1={96} y1={92} x2={108} y2={110} />
      </g>
      <Txt x={96} y={128} size={11} fill={MID} lines={['Designer']} />
      <g className="sf-hov">
      <path d="M150 70 C 140 40, 190 26, 215 40 C 235 18, 300 18, 320 40 C 360 30, 395 55, 380 82 C 400 108, 350 130, 320 118 C 300 140, 230 140, 215 120 C 180 132, 140 110, 150 70 z" fill="rgba(255,255,255,0.04)" stroke={LINE} strokeWidth={1.2} />
      <Txt x={268} y={78 - (prompt.length - 1) * 8} size={13} fill={RED} lines={prompt} lh={1.25} />
      </g>

      {/* input */}
      <Arrow d="M96 136 V196" />
      <Region x={22} y={180} w={200} h={96} title="Input" />
      <Box x={42} y={214} w={160} h={44} b={{ label: s.input }} fill="rgba(244,123,92,0.10)" stroke={CORAL} size={12} />
      <Arrow d="M122 276 V318" />

      {/* LLM layer */}
      <Region x={22} y={320} w={320} h={450} title={L.title} />
      {L.agents.map((a, i) => (
        <Box key={a.label} x={48} y={366 + i * (ah + 8)} w={268} h={ah} b={a} fill={BLUE} stroke={AI} size={n > 4 ? 12 : 13} dashed={a.dashed ?? L.dashed} />
      ))}
      <path className="sf-flow" d={`M182 ${366 + n * (ah + 8)} V650`} stroke={INK} strokeWidth={1.2} markerEnd="url(#sfArrow)" markerStart="url(#sfArrow)" />
      <Box x={48} y={656} w={268} h={64} b={L.llm} fill={BLUE} stroke={AI} size={13} dashed={L.llm.dashed ?? L.dashed} />
      <Txt x={182} y={748} size={14} weight={700} fill={AI} lines={[L.brand]} />

      {/* bridge */}
      <path className="sf-flow" d="M342 520 H368" stroke={INK} strokeWidth={1.2} markerEnd="url(#sfArrow)" markerStart="url(#sfArrow)" />
      <Region x={370} y={436} w={250} h={150} title={s.bridge.title} fill={PINK} stroke="var(--yellow)" />
      <Box x={384} y={478} w={102} h={86} b={s.bridge.a} size={11} />
      <path className="sf-flow" d="M488 521 H506" stroke={INK} strokeWidth={1.2} markerEnd="url(#sfArrow)" markerStart="url(#sfArrow)" />
      <Box x={508} y={478} w={102} h={86} b={s.bridge.b} size={11} />
      <Arrow d="M620 521 H650 V163 H895" />

      {/* tool environment */}
      <Region x={640} y={60} w={740} h={600} title={s.right.title} />
      {s.right.commands.map((c, i) => (
        <g key={c} className="sf-hov">
          <rect x={662} y={92 + i * 38} width={214} height={28} rx={14} fill="rgba(200,185,255,0.08)" stroke={AI} strokeDasharray="4 3" />
          <Txt x={769} y={111 + i * 38} size={11} fill={RED} mono lines={[c.length > 30 ? c.slice(0, 29) + '…' : c]} />
          <path d={`M876 ${106 + i * 38} H895`} stroke={INK} strokeDasharray="2 3" />
        </g>
      ))}
      <rect x={898} y={88} width={176} height={96} fill="rgba(112,215,206,0.10)" stroke={CYAN} />
      <Box x={912} y={102} w={148} h={68} b={s.right.core} stroke={CYAN} size={12} />
      <path className="sf-flow" d="M986 184 V208" stroke={INK} strokeWidth={1.2} markerEnd="url(#sfArrow)" markerStart="url(#sfArrow)" />
      {/* knowledge store cylinder */}
      <g className="sf-hov">
        <path d="M906 222 V292 A80 14 0 0 0 1066 292 V222" fill="rgba(242,207,85,0.10)" stroke="var(--yellow)" />
        <ellipse cx={986} cy={222} rx={80} ry={14} fill={DARK} stroke="var(--yellow)" />
        <Txt x={986} y={256} size={12} weight={700} fill={INK} lines={wrap(s.right.store, 22)} lh={1.2} />
      </g>
      {/* tool canvas (Grasshopper or interface) */}
      <Txt x={1265} y={104} size={11} fill={MID} lines={[s.right.canvas]} />
      <rect x={1180} y={112} width={170} height={110} fill={PANEL} stroke={LINE} />
      {[[1196, 128], [1240, 128], [1196, 176], [1240, 176], [1290, 152]].map(([x, y], k) => (
        <g key={k} className="sf-hov">
          <rect x={x} y={y} width={34} height={22} fill="rgba(112,215,206,0.12)" stroke={CYAN} />
        </g>
      ))}
      <path d="M1230 139 H1240 M1230 187 H1240 M1274 139 L1290 160 M1274 187 L1290 166" stroke={CYAN} />
      <path className="sf-flow" d="M1066 250 H1150 V170 H1178" fill="none" stroke={INK} strokeWidth={1.2} markerEnd="url(#sfArrow)" markerStart="url(#sfArrow)" />
      {/* component repository */}
      <rect x={662} y={330} width={596} height={208} fill={PANEL} stroke={LINE} />
      <Txt x={960} y={350} size={11} fill={MID} mono lines={['COMPONENTS']} />
      <path className="sf-flow" d="M986 306 V328" stroke={INK} strokeWidth={1.2} markerEnd="url(#sfArrow)" />
      {s.right.cards.map((c, i) => {
        const x = 680 + i * 194;
        return (
          <g key={c.title} className="sf-hov">
            <rect x={x} y={362} width={176} height={162} rx={4} fill={DARK} stroke={c.dashed ? 'rgb(137,167,255)' : CYAN} strokeDasharray={c.dashed ? '3 6' : undefined} />
            <Txt x={x + 12} y={384} size={12} weight={700} anchor="start" lines={wrap(c.title, 22)} />
            {c.lines.map((l, k) => (
              <Txt key={l} x={x + 12} y={412 + k * 17} size={11} fill={MID} anchor="start" lines={[l]} />
            ))}
            <rect x={x + 158} y={398} width={6} height={52} fill="none" stroke={LINE} />
            <ThumbArt t={c.thumb} x={x + 10} y={466} w={156} h={50} />
          </g>
        );
      })}
      {/* model */}
      <g className="sf-hov">
        <ThumbArt t={s.right.modelThumb} x={700} y={560} w={300} h={84} />
      </g>
      <Arrow d="M1010 602 H1148" />
      <Box x={1150} y={578} w={190} h={48} b={{ label: s.right.model }} stroke={CYAN} size={12} />
      <path className="sf-flow" d="M1265 222 V576" fill="none" stroke={INK} strokeWidth={1.2} markerEnd="url(#sfArrow)" />
      <Arrow d="M1320 626 V706" dashed />

      {/* output */}
      <Region x={1080} y={684} w={300} h={102} title="Output" />
      <Box x={1104} y={710} w={252} h={60} b={{ label: s.output }} fill="rgba(244,123,92,0.10)" stroke={CORAL} size={12} />

      {s.status === 'proposed' && (
        <g className="sf-hov">
          <rect x={360} y={640} width={290} height={40} fill="rgba(137,167,255,0.08)" stroke="rgb(137,167,255)" strokeDasharray="3 6" />
          <Txt x={505} y={665} size={12} weight={700} fill="rgb(137,167,255)" mono lines={['PROPOSED · NOT YET BUILT']} />
        </g>
      )}
    </svg>
  );
}

export function SystemFigureOverlay() {
  const open = useAppState((s) => s.systemOpen);
  const stepIndex = useAppState((s) => s.stepIndex);
  const s = systemFor(STEPS[stepIndex]?.id);
  if (!open || !s) return null;
  return (
    <div className="overlay-screen sf-screen" role="dialog" aria-modal="true" aria-label={`System diagram, figure ${s.figure}`} onClick={() => setState({ systemOpen: false })}>
      <div className="sf-paper" onClick={(e) => e.stopPropagation()}>
        <div className="sf-head">
          <span className={`sf-status sf-status--${s.status}`}>{s.statusNote}</span>
          <button className="sf-close" onClick={() => setState({ systemOpen: false })} aria-label="Close system diagram">
            ESC ✕
          </button>
        </div>
        <Figure s={s} />
        <p className="sf-caption">
          <b>Figure {s.figure}:</b> {s.caption}
        </p>
        <p className="sf-notes">
          {s.notes.join(' ')} Dashed outlines: written but not executed, or proposed. Diagram style after Liu &amp; Tian (2025, Fig. 1).
        </p>
      </div>
    </div>
  );
}

/** A full slide page for one system diagram (layout 'system'). */
export function SystemPage({ id }: { id: string }) {
  const s = systemFor(id);
  if (!s) return null;
  return (
    <div className="sys-page">
      <div className="sf-head">
        <span className={`sf-status sf-status--${s.status}`}>{s.statusNote}</span>
        <span className="sf-credit">Diagram style after Liu &amp; Tian (2025, Fig. 1)</span>
      </div>
      <Figure s={s} />
      <p className="sf-caption">
        <b>Figure {s.figure}:</b> {s.caption}
      </p>
      <p className="sf-notes">{s.notes.join(' ')} Dashed outlines: written but not executed, or proposed.</p>
    </div>
  );
}
