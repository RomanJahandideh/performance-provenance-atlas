import { useEffect, useRef, useState, type KeyboardEvent as RKeyboardEvent, type ReactNode } from 'react';
import { BG, Glyph, RoleBox, Svg, T, W, W1, W3, W6, col, wrap } from './framework';
import { win, useT } from './useT';
import { prefersReducedMotion, useAppState } from '../state/store';
import { goToStep } from '../lib/stepper';
import { STEPS } from '../data/steps';
import type { Role } from '../data/provenance';
import {
  AGENDA_TRAIL,
  BRANCHES,
  EX_ALTS,
  EX_ALT_NOTE,
  EX_EFFECTS,
  EX_LAYERS,
  EX_PARCELS,
  LV_INDICATORS,
  LV_STOPS,
  RT_INTENTIONS,
  RT_MODES,
  RT_SCENARIOS,
  type ExLayer,
} from '../data/branches';

/*
 * The future-research section: an interactive overview and three proposed
 * directions. Each view plays a short reveal on arrival (300 to 600 ms per
 * element) and settles on a complete state, which is also the static
 * fallback under reduced motion. The presenter can change state with number
 * keys on the active step, by clicking, or with Tab and Enter; arrow keys
 * keep moving between steps. All values are illustrative.
 */

const HEADER = 'PROPOSED RESEARCH DIRECTION · CONCEPTUAL ILLUSTRATION · VALUES ILLUSTRATIVE';
const FADE = { transition: 'opacity 450ms ease, fill 450ms ease, stroke 450ms ease' };

/** True while this view's step is the current one. */
function useActive(stepId: string): boolean {
  return useAppState((s) => STEPS[s.stepIndex]?.id === stepId);
}

/** Number keys for the active view only; arrow keys and the global map are untouched. */
function useKeys(active: boolean, map: Record<string, () => void>) {
  const ref = useRef(map);
  ref.current = map;
  useEffect(() => {
    if (!active) return;
    const on = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const fn = ref.current[e.key];
      if (fn) {
        e.preventDefault();
        fn();
      }
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [active]);
}

/** Plays a short scripted sequence once, then hands control to the presenter. */
function useScript(times: readonly number[]): [number, boolean, () => void] {
  const last = times.length - 1;
  const [i, setI] = useState(() => (prefersReducedMotion() ? last : 0));
  const [manual, setManual] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion() || manual) return;
    const ids = times.map((ms, k) => window.setTimeout(() => setI(k), ms));
    return () => ids.forEach((id) => window.clearTimeout(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manual]);
  return [manual ? last : i, manual, () => setManual(true)];
}

/** A focusable SVG button. Enter and Space act on it and do not change the step. */
function Chip({ x, y, w, h = 36, label, on, onSelect, kind = 'state', size = 15, title }: { x: number; y: number; w: number; h?: number; label: string; on: boolean; onSelect: () => void; kind?: 'state' | 'ai' | 'layer' | 'time'; size?: number; title?: string }) {
  const key = (e: RKeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      onSelect();
    }
  };
  const stroke = kind === 'ai' ? col('ai') : kind === 'layer' ? 'var(--cyan)' : kind === 'time' ? 'var(--orange)' : W;
  return (
    <g className="dg-btn" role="button" tabIndex={0} aria-pressed={on} aria-label={title ?? label} onClick={onSelect} onKeyDown={key}>
      <rect className="dg-ring" x={x - 4} y={y - 4} width={w + 8} height={h + 8} rx={kind === 'ai' ? 14 : 3} fill="none" stroke="var(--yellow)" strokeWidth={2.5} />
      <rect x={x} y={y} width={w} height={h} rx={kind === 'ai' ? 12 : 2} fill={on ? (kind === 'ai' ? 'rgba(200,185,255,0.22)' : 'rgba(255,255,255,0.18)') : 'rgba(255,255,255,0.03)'} stroke={stroke} strokeWidth={on ? 2.2 : 1.2} strokeDasharray={kind === 'ai' ? '6 5' : undefined} style={FADE} />
      <T x={x + w / 2} y={y + h / 2 + size * 0.36} size={size} anchor="middle" weight={on ? 700 : 400} fill={on ? W : W6}>
        {label}
      </T>
    </g>
  );
}

/** The seven-step workflow trail across the top; `hl` marks the steps in play. */
function Trail({ steps, hl, y = 44 }: { steps: readonly { n: string; role: Role }[]; hl: (i: number) => boolean; y?: number }) {
  const w = 1560 / steps.length;
  return (
    <g>
      {steps.map((s, i) => {
        const x = 20 + i * w;
        const on = hl(i);
        return (
          <g key={s.n} opacity={on ? 1 : 0.38} style={FADE}>
            {i < steps.length - 1 && <line x1={x + w - 22} y1={y + 22} x2={x + w - 6} y2={y + 22} stroke={W6} strokeWidth={1.6} markerEnd="url(#fwArrow)" />}
            <Glyph x={x + 12} y={y + 22} role={s.role} s={16} />
            <T x={x + 28} y={y + (wrap(s.n, 17).length > 1 ? 18 : 28)} size={15} weight={on ? 600 : 400} lh={1.18}>
              {wrap(s.n, 17).join('\n')}
            </T>
          </g>
        );
      })}
    </g>
  );
}

function Header({ right }: { right?: string }) {
  return (
    <>
      <T x={20} y={24} size={14} fill="var(--proposal)" weight={700} mono>
        {HEADER}
      </T>
      {right && (
        <T x={1580} y={24} size={14} fill={W6} anchor="end" mono>
          {right}
        </T>
      )}
    </>
  );
}

// ── Overview: one agenda, three branches ───────────────────────────────────
const SCALE_GLYPH: Record<string, (x: number, y: number) => ReactNode> = {
  redteam: (x, y) => (
    <g>
      <rect x={x} y={y} width={150} height={90} fill="none" stroke={W3} />
      <rect x={x + 10} y={y + 10} width={52} height={40} fill="rgba(255,255,255,0.08)" stroke={W6} />
      {[0, 1, 2, 3].map((k) => (
        <circle key={k} cx={x + 80 + k * 20} cy={y + 24} r={8} fill="none" stroke={W6} />
      ))}
      <ellipse cx={x + 100} cy={y + 70} rx={42} ry={14} fill="var(--orange)" opacity={0.45} />
    </g>
  ),
  externality: (x, y) => (
    <g>
      {[0, 1, 2].map((c) =>
        [0, 1].map((r) => <rect key={`${c}${r}`} x={x + c * 52} y={y + r * 48} width={46} height={42} fill={c === 1 && r === 1 ? 'rgba(255,255,255,0.14)' : 'none'} stroke={W6} />),
      )}
      <path d={`M${x + 75} ${y + 66} C ${x + 75} ${y + 40}, ${x + 75} ${y + 30}, ${x + 75} ${y + 20}`} stroke="var(--orange)" strokeWidth={2.4} markerEnd="url(#fwArrow)" fill="none" />
      <path d={`M${x + 98} ${y + 70} L ${x + 128} ${y + 70}`} stroke="var(--cyan)" strokeWidth={2.4} markerEnd="url(#fwArrow)" fill="none" />
    </g>
  ),
  living: (x, y) => (
    <g>
      {[0, 1, 2, 3].map((k) => (
        <circle key={k} cx={x + 45} cy={y + 45} r={10 + k * 10} fill="none" stroke={W6} opacity={1 - k * 0.2} />
      ))}
      <line x1={x + 100} y1={y + 80} x2={x + 150} y2={y + 80} stroke={W6} />
      <path d={`M${x + 100} ${y + 72} C ${x + 120} ${y + 40}, ${x + 130} ${y + 60}, ${x + 150} ${y + 20}`} stroke="var(--orange)" strokeWidth={2.2} fill="none" />
    </g>
  ),
};

export function Agenda() {
  const t = useT(1400, 150);
  const active = useActive('agenda');
  const [focus, setFocus] = useState<number | null>(null);
  const open = (i: number) => {
    const idx = STEPS.findIndex((s) => s.id === BRANCHES[i]!.step);
    if (idx >= 0) goToStep(idx);
  };
  useKeys(active, { '1': () => setFocus(0), '2': () => setFocus(1), '3': () => setFocus(2), '0': () => setFocus(null) });
  const tw = 1560 / AGENDA_TRAIL.length;
  const cw = 500;
  const gap = 30;
  return (
    <Svg vb="0 0 1600 600" label="One research agenda: design intention, professional tools, environmental simulation, verified evidence and human judgment, branching into three proposed directions: design risk, neighbourhood and time.">
      <T x={20} y={24} size={14} fill="var(--proposal)" weight={700} mono>
        PROPOSED PHD RESEARCH · ONE AGENDA · THREE POSSIBLE BRANCHES
      </T>
      <T x={1580} y={24} size={14} fill={W6} anchor="end" mono>
        HOVER, TAB OR KEYS 1 · 2 · 3 TO INSPECT · ENTER OR CLICK TO OPEN
      </T>
      {/* the shared problem, as one trail */}
      {AGENDA_TRAIL.map((s, i) => {
        const x = 20 + i * tw;
        return (
          <g key={s.n} opacity={win(t, i * 0.08, i * 0.08 + 0.3)}>
            {i < AGENDA_TRAIL.length - 1 && <line x1={x + tw - 30} y1={78} x2={x + tw - 8} y2={78} stroke={W6} strokeWidth={2} markerEnd="url(#fwArrow)" />}
            <RoleBox x={x} y={50} w={tw - 40} h={56} role={s.role} />
            <T x={x + 18} y={85} size={19} weight={600}>
              {s.n}
            </T>
          </g>
        );
      })}
      <g opacity={win(t, 0.4, 0.7)}>
        <T x={20} y={140} size={14} fill={W6} mono>
          SHARED RESEARCH PROBLEM · AI SUGGESTS · SIMULATION CALCULATES · PEOPLE DECIDE
        </T>
      </g>
      {/* three branches as map layers */}
      {BRANCHES.map((b, i) => {
        const x = 20 + i * (cw + gap);
        const y = 190;
        const f = focus === i;
        const dim = focus !== null && !f;
        const key = (e: RKeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            e.stopPropagation();
            open(i);
          }
        };
        return (
          <g key={b.id} opacity={win(t, 0.45 + i * 0.1, 0.8 + i * 0.1) * (dim ? 0.45 : 1)} style={FADE}>
            <path d={`M${20 + 2 * tw + (tw - 40) / 2} 106 C ${20 + 2 * tw + (tw - 40) / 2} 160, ${x + cw / 2} 150, ${x + cw / 2} ${y - 4}`} fill="none" stroke={f ? 'var(--yellow)' : W3} strokeWidth={f ? 2.6 : 1.6} strokeDasharray="4 6" style={FADE} />
            <g className="dg-btn" role="button" tabIndex={0} aria-label={`${b.name}: ${b.problem}. Open this direction.`} onMouseEnter={() => setFocus(i)} onMouseLeave={() => setFocus(null)} onFocus={() => setFocus(i)} onBlur={() => setFocus(null)} onClick={() => open(i)} onKeyDown={key}>
              <rect className="dg-ring" x={x - 5} y={y - 5} width={cw + 10} height={400} fill="none" stroke="var(--yellow)" strokeWidth={2.5} />
              <rect x={x} y={y} width={cw} height={390} fill={f ? 'rgba(137,167,255,0.10)' : 'rgba(255,255,255,0.03)'} stroke="var(--proposal)" strokeWidth={f ? 3 : 1.6} strokeDasharray="2 7" strokeLinecap="round" style={FADE} />
              {/* faint contours: each branch is one map layer */}
              {[0, 1, 2].map((k) => (
                <path key={k} d={`M${x} ${y + 40 + k * 22} C ${x + 160} ${y + 10 + k * 22}, ${x + 330} ${y + 70 + k * 22}, ${x + cw} ${y + 30 + k * 22}`} fill="none" stroke={W1} />
              ))}
              {SCALE_GLYPH[b.id]!(x + cw - 180, y + 22)}
              <T x={x + 22} y={y + 42} size={15} fill="var(--proposal)" weight={700} mono>
                {b.scale.toUpperCase()}
              </T>
              <T x={x + 22} y={y + 66} size={14} fill={W6} mono>
                {b.scaleDetail.toUpperCase()}
              </T>
              <T x={x + 22} y={y + 150} size={24} weight={700} lh={1.2}>
                {wrap(b.name, 26).join('\n')}
              </T>
              <T x={x + 22} y={y + 222} size={14} fill="var(--orange)" mono>
                PROBLEM
              </T>
              <T x={x + 22} y={y + 246} size={18} lh={1.3}>
                {wrap(b.problem, 46).join('\n')}
              </T>
              <g opacity={f ? 1 : 0.55} style={FADE}>
                <T x={x + 22} y={y + 322} size={14} fill={col('ai')} mono>
                  PROPOSED SYSTEM
                </T>
                <T x={x + 22} y={y + 346} size={17} lh={1.3}>
                  {wrap(b.contribution, 50).join('\n')}
                </T>
              </g>
            </g>
          </g>
        );
      })}
      <g opacity={win(t, 0.8, 1)}>
        <rect x={20} y={588} width={1560} height={1} fill={W1} />
      </g>
      {focus !== null && (
        <T x={20} y={180} size={15} fill="var(--yellow)" mono>
          {`EVALUATED BY: ${BRANCHES[focus]!.evaluation.toUpperCase()}`}
        </T>
      )}
    </Svg>
  );
}

// ── Direction: AI Design Red-Team ──────────────────────────────────────────
export function RedTeam() {
  const active = useActive('redteam');
  const [stage, manual, takeOver] = useScript([0, 600, 1500, 2400, 3300]);
  const [mode, setMode] = useState(2);
  const [sc, setSc] = useState(0);
  const m = manual ? mode : stage < 2 ? 0 : stage < 4 ? 1 : 2;
  const showScen = manual || stage >= 1;
  const showIntent = manual || stage >= 3;
  const pick = (k: number) => {
    takeOver();
    setMode(k);
  };
  const pickSc = (k: number) => {
    takeOver();
    setSc(k);
    setMode((v) => (v === 0 ? 1 : v));
  };
  useKeys(active, { '1': () => pick(0), '2': () => pick(1), '3': () => pick(2), '4': () => pickSc(0), '5': () => pickSc(1), '6': () => pickSc(2), '7': () => pickSc(3) });
  const s = RT_SCENARIOS[sc]!;
  const hl = (i: number) => (m === 0 ? i === 0 : m === 1 ? i >= 1 && i <= 3 : i >= 4);
  const heat = m === 0 ? 0 : m === 1 ? 1 : 0.35;
  return (
    <Svg vb="0 0 1600 610" label="AI Design Red-Team, a proposed research direction: an illustrative plaza, AI-proposed stress scenarios, a simulated weakness, protected design intentions and a minimal repair, with before and after comparison.">
      <defs>
        <radialGradient id="rtHot">
          <stop offset="0" stopColor="#ff5a36" stopOpacity={0.85} />
          <stop offset="0.55" stopColor="#e8924a" stopOpacity={0.45} />
          <stop offset="1" stopColor="#e8924a" stopOpacity={0} />
        </radialGradient>
      </defs>
      <Header right="KEYS 1 · 2 · 3 STATE · 4 TO 7 SCENARIO" />
      <Trail steps={BRANCHES[0]!.workflow} hl={hl} />
      {RT_MODES.map((label, k) => (
        <Chip key={label} x={20 + k * 168} y={110} w={160} label={label} on={m === k} onSelect={() => pick(k)} />
      ))}
      <g opacity={showScen ? 1 : 0} style={FADE}>
        <T x={530} y={133} size={13} fill={col('ai')} mono>
          AI STRESS SCENARIOS
        </T>
        {RT_SCENARIOS.map((r, k) => (
          <Chip key={r.chip} x={724 + k * 214} y={110} w={206} label={r.chip} kind="ai" on={sc === k} onSelect={() => pickSc(k)} title={`Scenario: ${r.name}`} />
        ))}
      </g>
      {/* illustrative site plan */}
      <g>
        <rect x={20} y={166} width={870} height={436} fill="rgba(255,255,255,0.02)" stroke={W3} />
        {[0, 1, 2, 3, 4].map((k) => (
          <path key={k} d={`M20 ${200 + k * 90} C 260 ${170 + k * 90}, 560 ${240 + k * 90}, 890 ${190 + k * 90}`} fill="none" stroke={W1} />
        ))}
        <rect x={40} y={186} width={250} height={196} fill="rgba(255,255,255,0.07)" stroke={W6} strokeWidth={1.5} />
        <T x={60} y={216} size={16} fill={W6} mono>
          LIBRARY
        </T>
        <rect x={310} y={186} width={560} height={396} fill="none" stroke={W6} strokeWidth={1.2} />
        {Array.from({ length: 13 }, (_, k) => (
          <line key={k} x1={310 + k * 43} y1={186} x2={310 + k * 43} y2={582} stroke={W1} />
        ))}
        <rect x={360} y={300} width={200} height={96} fill="rgba(112,215,206,0.06)" stroke="var(--cyan)" strokeWidth={1} strokeDasharray="3 4" />
        <rect x={610} y={300} width={200} height={96} fill="rgba(112,215,206,0.06)" stroke="var(--cyan)" strokeWidth={1} strokeDasharray="3 4" />
        {[380, 480, 580, 680, 780].map((cx) => (
          <circle key={cx} cx={cx} cy={240} r={30} fill="rgba(112,215,206,0.10)" stroke="var(--cyan)" strokeWidth={1.4} />
        ))}
        {[370, 530, 690].map((bx) => (
          <rect key={bx} x={bx} y={540} width={140} height={14} fill="rgba(255,255,255,0.25)" />
        ))}
        <line x1={870} y1={470} x2={292} y2={300} stroke="var(--coral)" strokeWidth={1.6} strokeDasharray="8 7" opacity={showIntent ? 0.9 : 0.25} style={FADE} />
        <T x={846} y={598} size={13} fill={W6} anchor="end" mono>
          ILLUSTRATIVE SITE · N ↑
        </T>
      </g>
      {/* simulated weakness under the selected scenario */}
      <ellipse cx={s.hot.x} cy={s.hot.y} rx={s.hot.rx * (m === 2 ? 0.55 : 1)} ry={s.hot.ry * (m === 2 ? 0.55 : 1)} fill="url(#rtHot)" opacity={heat} style={{ transition: 'all 500ms ease' }} />
      {sc === 3 && m >= 1 && [0, 1, 2].map((k) => <path key={k} d={`M ${300 + k * 6} ${520 + k * 22} q 50 -14 110 4`} fill="none" stroke="var(--cyan)" strokeWidth={2} markerEnd="url(#fwArrow)" opacity={m === 2 ? 0.35 : 0.9} />)}
      {/* minimal repair, drawn as an AI proposal re-tested by simulation */}
      <g opacity={m === 2 ? 1 : 0} style={FADE}>
        {sc === 0 && <rect x={364} y={512} width={470} height={52} rx={10} fill="rgba(200,185,255,0.12)" stroke={col('ai')} strokeWidth={2.2} strokeDasharray="8 6" />}
        {sc === 1 && [360, 610].map((bx) => <rect key={bx} x={bx} y={300} width={200} height={96} fill="rgba(200,185,255,0.14)" stroke={col('ai')} strokeWidth={2.2} strokeDasharray="8 6" />)}
        {sc === 2 && Array.from({ length: 10 }, (_, k) => <line key={k} x1={26} y1={196 + k * 18} x2={40} y2={196 + k * 18} stroke={col('ai')} strokeWidth={3} />)}
        {sc === 3 && <rect x={314} y={500} width={70} height={20} rx={10} fill="rgba(200,185,255,0.2)" stroke={col('ai')} strokeWidth={2.2} strokeDasharray="6 5" />}
      </g>
      {/* protected design intentions */}
      <g opacity={showIntent ? 1 : 0} style={FADE}>
        {RT_INTENTIONS.map((p) => (
          <g key={p.label}>
            <Glyph x={p.x} y={p.y} role="human" s={18} />
            <rect x={p.x + 12} y={p.y - 13} width={p.label.length * 9.2 + 12} height={24} fill={BG} opacity={0.85} />
            <T x={p.x + 18} y={p.y + 5} size={15} fill="var(--coral)" mono>
              {p.label.toUpperCase()}
            </T>
          </g>
        ))}
      </g>
      {/* evidence and decision */}
      <g>
        <T x={930} y={186} size={14} fill={col('ai')} mono>
          AI-PROPOSED SCENARIO · PLAUSIBLE, NOT PREDICTED
        </T>
        <T x={930} y={214} size={21} weight={600}>
          {s.name}
        </T>
        <g opacity={m >= 1 ? 1 : 0.25} style={FADE}>
          <T x={930} y={256} size={14} fill="var(--cyan)" mono>
            SIMULATION · VERIFIED WEAKNESS
          </T>
          <T x={930} y={282} size={18} lh={1.3}>
            {wrap(s.weakness, 58).join('\n')}
          </T>
        </g>
        <g opacity={m === 2 ? 1 : 0.25} style={FADE}>
          <T x={930} y={330} size={14} fill={col('ai')} mono>
            AI-PROPOSED MINIMAL REPAIR · RE-SIMULATED
          </T>
          <T x={930} y={356} size={18} lh={1.3}>
            {wrap(s.repair, 58).join('\n')}
          </T>
        </g>
        <T x={930} y={412} size={14} fill={W6} mono>
          {`UNDER STRESS · ${s.metric.toUpperCase()}`}
        </T>
        <rect x={930} y={424} width={560 * s.before} height={18} fill="var(--orange)" opacity={m >= 1 ? 0.85 : 0.2} style={FADE} />
        <T x={930 + 560 * s.before + 10} y={439} size={14} fill={W6} mono>
          BEFORE
        </T>
        <rect x={930} y={452} width={560 * s.after} height={18} fill="var(--cyan)" opacity={m === 2 ? 0.85 : 0.15} style={FADE} />
        <T x={930 + 560 * s.after + 10} y={467} size={14} fill={W6} mono>
          AFTER REPAIR
        </T>
        <T x={930} y={492} size={13} fill="var(--orange)" mono>
          ILLUSTRATIVE BARS · NOT A RESULT
        </T>
        <RoleBox x={930} y={512} w={650} h={78} role="human" />
        <T x={954} y={545} size={15} fill="var(--coral)" weight={700} mono>
          DESIGNER DECIDES
        </T>
        <T x={954} y={572} size={17}>
          Reviews the evidence and the kept intentions; accepts, adjusts or rejects.
        </T>
      </g>
    </Svg>
  );
}

// ── Direction: Neighbourhood Externality Co-Designer ───────────────────────
const LAYER_COLOUR: Record<ExLayer, string> = { Shadow: 'rgba(5,18,52,0.55)', Heat: 'var(--orange)', Glare: 'rgba(255,255,255,0.85)', Wind: 'var(--cyan)', Runoff: 'var(--proposal)' };

export function Externality() {
  const active = useActive('externality');
  const [stage, manual, takeOver] = useScript([0, 500, 900, 1300, 1700, 2100, 2900, 3700]);
  const [alt, setAlt] = useState(2);
  const [layers, setLayers] = useState<Record<ExLayer, boolean>>({ Shadow: true, Heat: true, Glare: true, Wind: true, Runoff: true });
  const [hover, setHover] = useState<string | null>(null);
  const a = manual ? alt : stage < 6 ? 0 : stage < 7 ? 1 : 2;
  const layerOn = (l: ExLayer, k: number) => (manual ? layers[l] : stage >= k + 1);
  const pickAlt = (k: number) => {
    takeOver();
    setAlt(k);
  };
  const toggle = (l: ExLayer) => {
    takeOver();
    setLayers((v) => ({ ...v, [l]: !v[l] }));
  };
  useKeys(active, { '1': () => pickAlt(0), '2': () => pickAlt(1), '3': () => pickAlt(2), '4': () => toggle('Shadow'), '5': () => toggle('Heat'), '6': () => toggle('Glare'), '7': () => toggle('Wind'), '8': () => toggle('Runoff') });
  const altName = EX_ALTS[a]!;
  const fx = EX_EFFECTS[altName]!;
  const site = EX_PARCELS.find((p) => p.id === 'site')!;
  const sc = { x: site.x + site.w / 2, y: site.y + 70 };
  const shadowLen = a === 0 ? 250 : a === 1 ? 120 : 150;
  const fw = a === 0 ? 90 : a === 1 ? 220 : 170;
  const fh = a === 0 ? 90 : a === 1 ? 140 : 120;
  const net = (pid: string) => EX_LAYERS.reduce((acc, l, k) => acc + (layerOn(l, k) ? (fx[l][pid] ?? 0) : 0), 0);
  const rows = EX_PARCELS.filter((p) => p.id !== 'site');
  const hl = (i: number) => (!manual && stage < 6 ? i <= 4 : a === 2 ? i >= 5 : i >= 2 && i <= 4);
  return (
    <Svg vb="0 0 1600 610" label="Neighbourhood Externality Co-Designer, a proposed research direction: six illustrative parcels, environmental effects crossing parcel boundaries for three alternatives, a ledger of who gains and who carries burdens, and human deliberation as the final stage.">
      <defs>
        <marker id="exArrow" viewBox="0 0 10 10" refX={8} refY={5} markerUnits="userSpaceOnUse" markerWidth={14} markerHeight={14} orient="auto">
          <path d="M0 0L10 5L0 10z" fill={W} />
        </marker>
      </defs>
      <Header right="KEYS 1 · 2 · 3 ALTERNATIVE · 4 TO 8 LAYERS" />
      <Trail steps={BRANCHES[1]!.workflow} hl={hl} />
      {EX_ALTS.map((label, k) => (
        <Chip key={label} x={20 + k * 168} y={110} w={160} label={label} kind={k === 2 ? 'ai' : 'state'} on={a === k} onSelect={() => pickAlt(k)} title={`Alternative ${label}`} />
      ))}
      <T x={540} y={133} size={13} fill="var(--cyan)" mono>
        SIMULATED LAYERS
      </T>
      {EX_LAYERS.map((l, k) => (
        <Chip key={l} x={680 + k * 104} y={110} w={96} label={l} kind="layer" on={layerOn(l, k)} onSelect={() => toggle(l)} title={`${l} layer`} />
      ))}
      {/* parcels */}
      <rect x={20} y={156} width={960} height={446} fill="none" stroke={W3} />
      <rect x={20} y={322} width={960} height={48} fill="rgba(255,255,255,0.03)" />
      <T x={500} y={352} size={13} fill={W3} anchor="middle" mono>
        STREET
      </T>
      {EX_PARCELS.map((p) => {
        const h = hover === p.id;
        const v = p.id === 'site' ? 0 : net(p.id);
        return (
          <g key={p.id} onMouseEnter={() => setHover(p.id)} onMouseLeave={() => setHover(null)}>
            <rect x={p.x} y={p.y} width={p.w} height={p.h} fill={p.id === 'site' ? 'rgba(255,255,255,0.06)' : v > 0.05 ? `rgba(232,146,74,${Math.min(0.28, v * 0.22)})` : v < -0.05 ? 'rgba(112,215,206,0.16)' : 'rgba(255,255,255,0.02)'} stroke={h ? 'var(--yellow)' : W6} strokeWidth={h ? 2.6 : 1.2} style={FADE} />
            <path d={`M${p.x} ${p.y} h14 L${p.x} ${p.y + 14} z`} fill="var(--yellow)" opacity={p.id === 'site' ? 0 : 0.9} />
            <T x={p.x + 18} y={p.y + 30} size={17} weight={600}>
              {p.name}
            </T>
            <T x={p.x + 18} y={p.y + 52} size={13} fill={h ? 'var(--yellow)' : W6} mono>
              {p.priority.toUpperCase()}
            </T>
          </g>
        );
      })}
      {/* the project massing for the current alternative */}
      <rect x={sc.x - fw / 2} y={sc.y} width={fw} height={fh} fill="rgba(255,255,255,0.22)" stroke={a === 2 ? col('ai') : W} strokeWidth={2} strokeDasharray={a === 2 ? '7 5' : undefined} style={{ transition: 'all 500ms ease' }} />
      {/* effects that cross the boundary */}
      <g opacity={layerOn('Shadow', 0) ? 1 : 0} style={FADE}>
        <path d={`M${sc.x - fw / 2} ${sc.y} L ${sc.x - fw / 2 - 40} ${sc.y - shadowLen} L ${sc.x + fw / 2 - 40} ${sc.y - shadowLen} L ${sc.x + fw / 2} ${sc.y} z`} fill={LAYER_COLOUR.Shadow} style={{ transition: 'all 500ms ease' }} />
      </g>
      {EX_LAYERS.filter((l) => l !== 'Shadow').map((l) => {
        const k = EX_LAYERS.indexOf(l);
        return (
          <g key={l} opacity={layerOn(l, k) ? 1 : 0} style={FADE}>
            {Object.entries(fx[l]).map(([pid, v]) => {
              const p = EX_PARCELS.find((q) => q.id === pid)!;
              const tx = p.x + p.w / 2 + (k - 2) * 26;
              const ty = p.y + p.h / 2 + 30;
              const benefit = (v ?? 0) < 0;
              return (
                <path key={pid} d={`M${sc.x + (k - 2) * 14} ${sc.y + fh / 2} Q ${(sc.x + tx) / 2} ${(sc.y + ty) / 2 - 60}, ${tx} ${ty}`} fill="none" stroke={LAYER_COLOUR[l]} strokeWidth={1.5 + Math.abs(v ?? 0) * 4} strokeDasharray={benefit ? '3 6' : l === 'Glare' ? '2 5' : undefined} strokeLinecap="round" markerEnd="url(#exArrow)" opacity={0.85} style={{ transition: 'all 500ms ease' }} />
              );
            })}
          </g>
        );
      })}
      {/* ledger: who gains, who carries burdens */}
      <T x={1020} y={176} size={14} fill={W6} mono>
        WHO GAINS · WHO CARRIES BURDENS
      </T>
      <line x1={1330} y1={190} x2={1330} y2={404} stroke={W3} />
      <T x={1322} y={420} size={13} fill="var(--cyan)" anchor="end" mono>
        ← GAINS
      </T>
      <T x={1338} y={420} size={13} fill="var(--orange)" mono>
        BURDENS →
      </T>
      {rows.map((p, i) => {
        const v = net(p.id);
        const y = 200 + i * 42;
        const h = hover === p.id;
        return (
          <g key={p.id} onMouseEnter={() => setHover(p.id)} onMouseLeave={() => setHover(null)}>
            <T x={1020} y={y + 20} size={16} weight={h ? 700 : 400} fill={h ? 'var(--yellow)' : W}>
              {p.name}
            </T>
            <rect x={v >= 0 ? 1330 : 1330 + v * 120} y={y + 6} width={Math.abs(v) * 120} height={20} fill={v >= 0 ? 'var(--orange)' : 'var(--cyan)'} opacity={0.85} style={{ transition: 'all 500ms ease' }} />
          </g>
        );
      })}
      <T x={1020} y={446} size={13} fill="var(--orange)" mono>
        ILLUSTRATIVE · NOT MEASURED
      </T>
      <T x={1020} y={470} size={14} fill={a === 2 ? col('ai') : W6} mono>
        {wrap(EX_ALT_NOTE[altName]!.toUpperCase(), 60).join('\n')}
      </T>
      <RoleBox x={1020} y={514} w={560} h={78} role="human" />
      <T x={1044} y={546} size={15} fill="var(--coral)" weight={700} mono>
        HUMAN DELIBERATION DECIDES
      </T>
      <T x={1044} y={572} size={16}>
        The system shows trade-offs; it does not compute fairness.
      </T>
    </Svg>
  );
}

// ── Direction: Living Environment Co-Designer ──────────────────────────────
/** Illustrative heat-stress curves, 0 (comfortable) to 1, over 40 years. */
const staticCurve = (y: number) => 0.28 + 0.62 * (y / 40) - 0.12 * Math.max(0, (y - 28) / 12);
const adaptCurve = (y: number) => (y < 20 ? staticCurve(y) : y < 24 ? staticCurve(20) - (y - 20) * 0.07 : Math.max(0.3, staticCurve(20) - 0.28 - (y - 24) * 0.006));

export function Living() {
  const active = useActive('living');
  const [stage, manual, takeOver] = useScript([0, 700, 1400, 2100, 2800, 3500]);
  const [stop, setStop] = useState(4);
  const [adaptive, setAdaptive] = useState(true);
  const s = manual ? stop : Math.max(0, Math.min(4, stage - 1));
  const ad = manual ? adaptive : stage >= 5 || s >= 3;
  const pick = (k: number) => {
    takeOver();
    setStop(k);
  };
  const mode = (v: boolean) => {
    takeOver();
    setAdaptive(v);
  };
  useKeys(active, { '1': () => pick(0), '2': () => pick(1), '3': () => pick(2), '4': () => pick(3), '5': () => pick(4), '6': () => mode(false), '7': () => mode(true) });
  const year = LV_STOPS[s]!.year;
  const growth = Math.min(1, year / 40);
  const intervened = ad && year >= 20;
  // chart frame
  const cx0 = 840;
  const cx1 = 1570;
  const cy0 = 200;
  const cy1 = 500;
  const X = (yr: number) => cx0 + ((cx1 - cx0) * yr) / 40;
  const Y = (v: number) => cy1 - (cy1 - cy0) * v;
  const line = (f: (y: number) => number, upTo: number) =>
    Array.from({ length: Math.round(upTo * 2) + 1 }, (_, k) => k / 2)
      .map((yr, k) => `${k ? 'L' : 'M'}${X(yr).toFixed(1)} ${Y(f(yr)).toFixed(1)}`)
      .join(' ');
  const band = (f: (y: number) => number) => {
    const ys = Array.from({ length: 81 }, (_, k) => k / 2);
    const up = ys.map((yr) => `${X(yr).toFixed(1)} ${Y(f(yr) + 0.02 + yr * 0.004).toFixed(1)}`);
    const dn = ys.reverse().map((yr) => `${X(yr).toFixed(1)} ${Y(f(yr) - 0.02 - yr * 0.004).toFixed(1)}`);
    return `M${up.join(' L')} L${dn.join(' L')} z`;
  };
  const threshold = 0.66;
  const stress = (ad ? adaptCurve : staticCurve)(year);
  return (
    <Svg vb="0 0 1600 610" label="Living Environment Co-Designer, a proposed research direction: an illustrative courtyard section changing over forty years, an illustrative heat-stress chart with a threshold, an intervention point, a static design and an adaptive pathway with widening uncertainty.">
      <defs>
        <pattern id="lvHatch" width={10} height={10} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1={0} y1={0} x2={0} y2={10} stroke="var(--orange)" strokeWidth={2} opacity={0.4} />
        </pattern>
      </defs>
      <Header right="KEYS 1 TO 5 TIME · 6 STATIC · 7 ADAPTIVE" />
      <Trail steps={BRANCHES[2]!.workflow} hl={(i) => (s <= 1 ? i <= 3 : s === 2 ? i === 4 : i >= 5)} />
      {LV_STOPS.map((st, k) => (
        <Chip key={st.label} x={20 + k * 132} y={110} w={124} label={st.label} kind="time" on={s === k} onSelect={() => pick(k)} title={`Time: ${st.label}`} />
      ))}
      <Chip x={700} y={110} w={130} label="Static design" on={!ad} onSelect={() => mode(false)} />
      <Chip x={838} y={110} w={170} label="Adaptive pathway" kind="ai" on={ad} onSelect={() => mode(true)} />
      {/* illustrative courtyard section */}
      <rect x={20} y={166} width={780} height={436} fill="rgba(255,255,255,0.02)" stroke={W3} />
      <rect x={30} y={250} width={120} height={300} fill="rgba(255,255,255,0.07)" stroke={W6} />
      <rect x={670} y={290} width={120} height={260} fill="rgba(255,255,255,0.07)" stroke={W6} />
      <line x1={150} y1={550} x2={670} y2={550} stroke={W} strokeWidth={2} />
      <rect x={150} y={550} width={520} height={10} fill={`rgba(255,255,255,${0.35 - growth * 0.2})`} style={FADE} />
      <T x={410} y={584} size={13} fill={W6} anchor="middle" mono>
        {intervened ? 'PERMEABLE PAVING · WEATHERED' : year >= 18 ? 'PAVING WEATHERED · STORES HEAT' : 'NEW PAVING'}
      </T>
      {[260, 410, 560].map((tx) => {
        const r = 22 + 60 * growth;
        const trunk = 40 + 70 * growth;
        return (
          <g key={tx}>
            <line x1={tx} y1={550} x2={tx} y2={550 - trunk} stroke={W6} strokeWidth={3} />
            <ellipse cx={tx} cy={550 - trunk - r * 0.6} rx={r} ry={r * 0.7} fill="rgba(112,215,206,0.16)" stroke="var(--cyan)" strokeWidth={1.4} style={{ transition: 'all 500ms ease' }} />
          </g>
        );
      })}
      {/* sun and heat on the ground */}
      <circle cx={720} cy={210} r={16} fill="none" stroke="var(--yellow)" strokeWidth={2} />
      <rect x={150} y={512} width={520} height={38} fill="url(#lvHatch)" opacity={Math.min(1, Math.max(0, (stress - 0.35) * 2.2))} style={FADE} />
      {/* intervention: temporary shade (until the canopy takes over) and water */}
      <g opacity={intervened && year < 40 ? 1 : 0} style={FADE}>
        <rect x={300} y={380} width={250} height={12} rx={6} fill="rgba(200,185,255,0.25)" stroke={col('ai')} strokeDasharray="6 5" strokeWidth={2} />
        <T x={425} y={372} size={13} fill={col('ai')} anchor="middle" mono>
          TEMPORARY SHADE · AI-SUGGESTED, DESIGNER-APPROVED
        </T>
      </g>
      <path d="M160 548 q 40 -10 80 0 t 80 0" fill="none" stroke="var(--proposal)" strokeWidth={2} opacity={intervened ? 1 : 0} style={FADE} />
      <T x={40} y={196} size={16} fill={W} weight={600}>
        {`${LV_STOPS[s]!.label} · ${LV_STOPS[s]!.note}`}
      </T>
      <T x={40} y={222} size={13} fill={W6} mono>
        ILLUSTRATIVE SECTION
      </T>
      {/* chart */}
      <T x={cx0} y={186} size={14} fill={W6} mono>
        HEAT STRESS IN SUMMER USE · ILLUSTRATIVE
      </T>
      <line x1={cx0} y1={cy1} x2={cx1} y2={cy1} stroke={W6} />
      <line x1={cx0} y1={cy0} x2={cx0} y2={cy1} stroke={W6} />
      {[0, 10, 20, 30, 40].map((yr) => (
        <T key={yr} x={X(yr)} y={cy1 + 22} size={13} fill={W6} anchor="middle" mono>
          {yr === 0 ? 'NOW' : `${yr} YR`}
        </T>
      ))}
      <path d={band(ad ? adaptCurve : staticCurve)} fill="url(#lvHatch)" opacity={0.55} style={FADE} />
      <line x1={cx0} y1={Y(threshold)} x2={cx1} y2={Y(threshold)} stroke="var(--coral)" strokeWidth={2} strokeDasharray="8 6" />
      <T x={cx0 + 10} y={Y(threshold) - 8} size={13} fill="var(--coral)" mono>
        LIMIT SET BY THE DESIGNER
      </T>
      <path d={line(staticCurve, 40)} fill="none" stroke={W} strokeWidth={ad ? 1.4 : 3} opacity={ad ? 0.35 : 1} style={FADE} />
      <path d={line(adaptCurve, 40)} fill="none" stroke={col('ai')} strokeWidth={ad ? 3 : 1.4} strokeDasharray="9 6" opacity={ad ? 1 : 0.35} style={FADE} />
      <g opacity={s >= 2 ? 1 : 0.2} style={FADE}>
        <circle cx={X(18)} cy={Y(staticCurve(18))} r={7} fill="none" stroke="var(--coral)" strokeWidth={2.4} />
        <T x={X(18) + 12} y={Y(staticCurve(18)) + 24} size={13} fill="var(--coral)" mono>
          THRESHOLD
        </T>
      </g>
      <g opacity={s >= 3 && ad ? 1 : 0.2} style={FADE}>
        <line x1={X(20)} y1={cy0} x2={X(20)} y2={cy1} stroke={col('ai')} strokeDasharray="3 5" />
        <T x={X(20) + 8} y={cy0 + 16} size={13} fill={col('ai')} mono>
          INTERVENTION POINT
        </T>
      </g>
      <line x1={X(year)} y1={cy0 - 6} x2={X(year)} y2={cy1} stroke="var(--yellow)" strokeWidth={2} style={{ transition: 'all 500ms ease' }} />
      <circle cx={X(year)} cy={Y(stress)} r={7} fill="var(--yellow)" style={{ transition: 'all 500ms ease' }} />
      <T x={cx0} y={552} size={13} fill="var(--orange)" mono>
        HATCH = UNCERTAINTY, WIDENING WITH TIME · PREPARES FOR CHANGE, DOES NOT PREDICT IT
      </T>
      <T x={cx0} y={578} size={13} fill={W6} mono>
        {LV_INDICATORS}
      </T>
      <T x={cx0} y={602} size={13} fill="var(--coral)" mono>
        THE DESIGNER COMPARES PATHWAYS AND KEEPS FINAL CONTROL
      </T>
    </Svg>
  );
}

export const BRANCH_RATIO = { agenda: 1600 / 600, redteam: 1600 / 610, externality: 1600 / 610, living: 1600 / 610 } as const;
