import { useState, type ReactNode } from 'react';
import { BG, Glyph, RoleBox, Svg, T, W, W1, W3, W6, col, wrap } from './framework';
import { Chip, FADE, activate, useActive, useKeys } from './interact';
import { win, useT } from './useT';
import { goToStep } from '../lib/stepper';
import { STEPS } from '../data/steps';
import { AGENDA_TRAIL, BRANCHES, EX_EFFECTS, EX_LAYERS, EX_PARCELS, EX_STATES, LV_STOPS, PRINCIPLE, RT_SCENARIOS, RT_STATES, type DirectionState, type ExLayer } from '../data/branches';

/*
 * The future-research section: a navigational overview and three proposed
 * directions. Each direction has at most three presentation states (the
 * problem, the proposed system, the human decision); the problem and the human
 * role stay visible in every state, and nothing essential is hidden or faint.
 * Everything appears within about half a second of arrival, including deep
 * links and reduced motion. All values are illustrative.
 */

const HEADER = 'PROPOSED RESEARCH DIRECTION · CONCEPTUAL ILLUSTRATION · VALUES ILLUSTRATIVE';

function StateChips({ states, s, set }: { states: readonly DirectionState[]; s: number; set: (k: number) => void }) {
  return (
    <>
      {states.map((st, k) => (
        <Chip key={st.key} x={20 + k * 250} y={48} w={236} label={st.label} keyHint={st.key} on={s === k} onSelect={() => set(k)} title={`State ${st.key}: ${st.label}`} />
      ))}
    </>
  );
}

/** The state text panel on the right: one heading, one short paragraph. */
function StatePanel({ x, w, st, colour }: { x: number; w: number; st: DirectionState; colour: string }) {
  return (
    <g key={st.key}>
      <T x={x} y={140} size={18} fill={colour} weight={700} mono>
        {st.heading}
      </T>
      <T x={x} y={180} size={25} lh={1.32}>
        {wrap(st.text, Math.floor(w / 12.6)).join('\n')}
      </T>
    </g>
  );
}

/** The human role, always visible. */
function HumanStrip({ x, y, w, h = 64, text }: { x: number; y: number; w: number; h?: number; text: string }) {
  return (
    <g>
      <RoleBox x={x} y={y} w={w} h={h} role="human" />
      <T x={x + 22} y={y + h / 2 + 8} size={22} weight={600}>
        {text}
      </T>
    </g>
  );
}

// ── Overview: a navigational map, not a comparison ─────────────────────────
const NODE_GLYPH: Record<string, (cx: number, cy: number) => ReactNode> = {
  redteam: (cx, cy) => (
    <g>
      <rect x={cx - 34} y={cy - 22} width={68} height={44} fill="none" stroke={W6} />
      <ellipse cx={cx + 6} cy={cy + 8} rx={24} ry={10} fill="var(--orange)" opacity={0.6} />
      <path d={`M${cx - 26} ${cy - 14} l6 6 l-6 6 l-6 -6 z`} fill="var(--coral)" />
    </g>
  ),
  externality: (cx, cy) => (
    <g>
      {[-1, 0, 1].map((c) => [-1, 0].map((r) => <rect key={`${c}${r}`} x={cx + c * 24 - 11} y={cy + r * 24 - 1} width={22} height={22} fill={c === 0 && r === 0 ? 'rgba(255,255,255,0.3)' : 'none'} stroke={W6} />))}
      <path d={`M${cx} ${cy - 2} L${cx} ${cy - 30}`} stroke="var(--orange)" strokeWidth={3} markerEnd="url(#fwArrow)" />
    </g>
  ),
  living: (cx, cy) => (
    <g>
      {[0, 1, 2].map((k) => (
        <circle key={k} cx={cx} cy={cy} r={10 + k * 11} fill="none" stroke={W6} opacity={1 - k * 0.25} />
      ))}
    </g>
  ),
};

export function Agenda() {
  const t = useT(700, 60);
  const active = useActive('agenda');
  const [focus, setFocus] = useState<number | null>(null);
  const open = (i: number) => {
    const idx = STEPS.findIndex((s) => s.id === BRANCHES[i]!.step);
    if (idx >= 0) goToStep(idx);
  };
  useKeys(active, { '1': () => setFocus(0), '2': () => setFocus(1), '3': () => setFocus(2), '0': () => setFocus(null) });
  const tw = 1560 / AGENDA_TRAIL.length;
  const xs = [300, 800, 1300];
  return (
    <Svg vb="0 0 1600 600" label="One research agenda: design intention, professional design tools, environmental simulation, verified evidence and human judgment. AI suggests, simulation calculates, people decide. Three possible branches: design risk, neighbourhood effects and change over time.">
      <T x={20} y={28} size={17} fill="var(--proposal)" weight={700} mono>
        PROPOSED PHD RESEARCH · ONE SHARED FOUNDATION
      </T>
      {AGENDA_TRAIL.map((s, i) => {
        const x = 20 + i * tw;
        return (
          <g key={s.n} opacity={win(t, i * 0.06, i * 0.06 + 0.3)}>
            {i < AGENDA_TRAIL.length - 1 && <line x1={x + tw - 30} y1={82} x2={x + tw - 8} y2={82} stroke={W6} strokeWidth={2.4} markerEnd="url(#fwArrow)" />}
            <RoleBox x={x} y={48} w={tw - 40} h={68} role={s.role} />
            <T x={x + 18} y={89} size={19} weight={600}>
              {s.n}
            </T>
          </g>
        );
      })}
      <g opacity={win(t, 0.3, 0.6)}>
        <Glyph x={40} y={178} role="ai" s={22} />
        <T x={64} y={190} size={34} weight={700}>
          {PRINCIPLE}
        </T>
      </g>
      {/* three selectable map nodes on one branching line */}
      <g opacity={win(t, 0.4, 0.75)}>
        <path d={`M800 116 L800 250 M${xs[0]} 250 L${xs[2]} 250`} fill="none" stroke={W3} strokeWidth={2} strokeDasharray="4 7" />
        {BRANCHES.map((b, i) => {
          const cx = xs[i]!;
          const f = focus === i;
          return (
            <g key={b.id} className="dg-btn" role="button" tabIndex={0} aria-label={`${b.scale}: ${b.name}. ${b.sentence} Press Enter to open.`} onMouseEnter={() => setFocus(i)} onMouseLeave={() => setFocus(null)} onFocus={() => setFocus(i)} onBlur={() => setFocus(null)} onClick={() => open(i)} onKeyDown={activate(() => open(i))}>
              <rect x={cx - 240} y={256} width={480} height={234} fill="transparent" />
              <line x1={cx} y1={250} x2={cx} y2={286} stroke={f ? 'var(--yellow)' : W3} strokeWidth={f ? 3 : 2} style={FADE} />
              <circle className="dg-ring" cx={cx} cy={346} r={70} fill="none" stroke="var(--yellow)" strokeWidth={3} />
              <circle cx={cx} cy={346} r={60} fill={f ? 'rgba(137,167,255,0.18)' : 'rgba(255,255,255,0.04)'} stroke="var(--proposal)" strokeWidth={f ? 3.4 : 2} strokeDasharray="3 7" strokeLinecap="round" style={FADE} />
              {NODE_GLYPH[b.id]!(cx, 346)}
              <T x={cx} y={442} size={19} anchor="middle" fill="var(--proposal)" weight={700} mono>
                {b.scale.toUpperCase()}
              </T>
              <T x={cx} y={474} size={24} anchor="middle" weight={600} fill={W}>
                {b.name}
              </T>
            </g>
          );
        })}
      </g>
      <g opacity={win(t, 0.6, 0.9)}>
        <rect x={20} y={510} width={1560} height={1} fill={W1} />
        <T x={800} y={556} size={focus === null ? 20 : 24} anchor="middle" fill={focus === null ? W6 : W} weight={focus === null ? 400 : 500}>
          {focus === null ? 'Three possible ways into the same agenda · hover, Tab or keys 1 · 2 · 3 · Enter or click opens a branch' : BRANCHES[focus]!.sentence}
        </T>
      </g>
    </Svg>
  );
}

// ── Direction: AI Design Red-Team ──────────────────────────────────────────
const RT_INTENT: readonly { label: string; x: number; y: number }[] = [
  { label: 'Trees', x: 770, y: 186 },
  { label: 'View axis', x: 520, y: 392 },
  { label: 'Public seating', x: 610, y: 506 },
  { label: 'Stone paving', x: 650, y: 446 },
  { label: 'Library access', x: 262, y: 300 },
];

export function RedTeam() {
  const t = useT(600, 40);
  const active = useActive('redteam');
  const [s, setS] = useState(0);
  useKeys(active, { '1': () => setS(0), '2': () => setS(1), '3': () => setS(2) });
  const st = RT_STATES[s]!;
  return (
    <Svg vb="0 0 1600 600" label={`AI Design Red-Team, a proposed research direction. ${st.heading}: ${st.text}`}>
      <defs>
        <radialGradient id="rtHot">
          <stop offset="0" stopColor="#ff5a36" stopOpacity={0.85} />
          <stop offset="0.55" stopColor="#e8924a" stopOpacity={0.45} />
          <stop offset="1" stopColor="#e8924a" stopOpacity={0} />
        </radialGradient>
      </defs>
      <T x={20} y={28} size={16} fill="var(--proposal)" weight={700} mono>
        {HEADER}
      </T>
      <StateChips states={RT_STATES} s={s} set={setS} />
      {/* illustrative plaza plan */}
      <g opacity={win(t, 0, 0.4)}>
        <rect x={20} y={116} width={800} height={474} fill="rgba(255,255,255,0.02)" stroke={W3} />
        {[0, 1, 2, 3].map((k) => (
          <path key={k} d={`M20 ${160 + k * 120} C 260 ${130 + k * 120}, 520 ${200 + k * 120}, 820 ${150 + k * 120}`} fill="none" stroke={W1} />
        ))}
        <rect x={40} y={136} width={210} height={210} fill="rgba(255,255,255,0.1)" stroke={W6} strokeWidth={1.6} />
        <T x={60} y={172} size={20} fill={W} weight={600}>
          Library
        </T>
        <rect x={270} y={136} width={530} height={434} fill="none" stroke={W6} strokeWidth={1.2} />
        {Array.from({ length: 12 }, (_, k) => (
          <line key={k} x1={270 + k * 44} y1={136} x2={270 + k * 44} y2={570} stroke={W1} />
        ))}
        {[330, 430, 530, 630, 730].map((cx) => (
          <circle key={cx} cx={cx} cy={196} r={34} fill="rgba(112,215,206,0.14)" stroke="var(--cyan)" strokeWidth={1.6} />
        ))}
        {[330, 480, 630].map((bx) => (
          <rect key={bx} x={bx} y={520} width={130} height={16} fill="rgba(255,255,255,0.35)" />
        ))}
        <line x1={800} y1={470} x2={252} y2={292} stroke="var(--coral)" strokeWidth={2} strokeDasharray="9 7" />
        <rect x={244} y={276} width={12} height={32} fill="var(--coral)" />
        <T x={804} y={584} size={15} fill={W6} anchor="end" mono>
          ILLUSTRATIVE SITE
        </T>
      </g>
      {/* state 1: the scenarios designers usually test, and what stays untested */}
      <g opacity={s === 0 ? 1 : 0} style={FADE}>
        <rect x={420} y={246} width={300} height={40} fill={BG} opacity={0.92} />
        <T x={432} y={273} size={20} fill={W}>
          ✓ Tested: typical summer day
        </T>
        {([[400, 470, 'heat + crowd'], [700, 340, 'drought'], [90, 400, 'cooling failure'], [300, 560, 'wind']] as const).map(([x, y, l]) => (
          <g key={l}>
            <circle cx={x} cy={y} r={18} fill="rgba(232,146,74,0.2)" stroke="var(--orange)" strokeWidth={2} strokeDasharray="4 4" />
            <T x={x} y={y + 7} size={20} anchor="middle" weight={700} fill="var(--orange)">
              ?
            </T>
            <rect x={x + 22} y={y - 12} width={l.length * 9.8 + 8} height={24} fill={BG} opacity={0.85} />
            <T x={x + 26} y={y + 6} size={16} fill="var(--orange)" mono>
              {l.toUpperCase()}
            </T>
          </g>
        ))}
      </g>
      {/* states 2 and 3: an AI-proposed scenario, a simulated weakness, a minimal repair */}
      <g opacity={s >= 1 ? 1 : 0} style={FADE}>
        <ellipse cx={545} cy={528} rx={s === 1 ? 240 : 130} ry={s === 1 ? 90 : 48} fill="url(#rtHot)" opacity={s === 1 ? 1 : 0.4} style={{ transition: 'all 300ms ease' }} />
        <rect x={322} y={498} width={446} height={52} rx={10} fill="rgba(200,185,255,0.14)" stroke={col('ai')} strokeWidth={2.4} strokeDasharray="8 6" />
        <rect x={330} y={466} width={250} height={28} fill={BG} opacity={0.9} />
        <T x={338} y={487} size={17} fill={col('ai')} mono>
          AI REPAIR: LIGHT CANOPY
        </T>
      </g>
      {/* protected intentions: always visible, emphasised in state 3 */}
      {RT_INTENT.map((p) => (
        <g key={p.label} opacity={s === 2 ? 1 : 0.8} style={FADE}>
          <Glyph x={p.x} y={p.y} role="human" s={s === 2 ? 22 : 18} />
          <rect x={p.x + 14} y={p.y - 15} width={p.label.length * 10.6 + 14} height={28} fill={BG} opacity={0.9} />
          <T x={p.x + 20} y={p.y + 7} size={18} fill="var(--coral)" weight={s === 2 ? 700 : 400} mono>
            {p.label.toUpperCase()}
          </T>
        </g>
      ))}
      {/* right panel: one state at a time */}
      <StatePanel x={860} w={720} st={st} colour={s === 0 ? 'var(--orange)' : s === 1 ? col('ai') : 'var(--coral)'} />
      <g opacity={s >= 1 ? 1 : 0} style={FADE}>
        <T x={860} y={352} size={17} fill={W6} mono>
          {`SCENARIO: ${RT_SCENARIOS[0].toUpperCase()}`}
        </T>
        <T x={860} y={388} size={19} fill={W}>
          Time outside comfort, before repair
        </T>
        <rect x={860} y={398} width={600} height={26} fill="var(--orange)" opacity={0.9} />
        <T x={860} y={452} size={19} fill={W}>
          After the repair, re-simulated
        </T>
        <rect x={860} y={462} width={260} height={26} fill="var(--cyan)" opacity={0.9} />
        <T x={1480} y={512} size={16} fill="var(--orange)" anchor="end" mono>
          ILLUSTRATIVE BARS · NOT A RESULT
        </T>
      </g>
      <g opacity={s === 0 ? 1 : 0} style={FADE}>
        <T x={860} y={352} size={17} fill={W6} mono>
          STRESS SCENARIOS THE AI COULD PROPOSE
        </T>
        <T x={860} y={388} size={20} fill={W} lh={1.4}>
          {RT_SCENARIOS.map((r) => `· ${r}`).join('\n')}
        </T>
      </g>
      <HumanStrip x={860} y={526} w={720} text="Designer decides: accept, revise or reject" />
    </Svg>
  );
}

// ── Direction: Neighbourhood Externality Co-Designer ───────────────────────
const LAYER_COLOUR: Record<ExLayer, string> = { Shadow: 'rgba(5,18,52,0.62)', Heat: 'var(--orange)', Glare: 'rgba(255,255,255,0.9)', Wind: 'var(--cyan)', Runoff: 'var(--proposal)' };
const PRIORITY_CONFLICT: Record<string, boolean> = { garden: true, school: true, plaza: true, site: true };

export function Externality() {
  const t = useT(600, 40);
  const active = useActive('externality');
  const [s, setS] = useState(0);
  const [layers, setLayers] = useState<Record<ExLayer, boolean>>({ Shadow: true, Heat: true, Glare: true, Wind: true, Runoff: true });
  const toggle = (l: ExLayer) => setLayers((v) => ({ ...v, [l]: !v[l] }));
  useKeys(active, { '1': () => setS(0), '2': () => setS(1), '3': () => setS(2), '4': () => toggle('Shadow'), '5': () => toggle('Heat'), '6': () => toggle('Glare'), '7': () => toggle('Wind'), '8': () => toggle('Runoff') });
  const alt = s === 2;
  const fx = EX_EFFECTS[alt ? 'alternative' : 'tower'];
  const st = EX_STATES[s]!;
  const site = EX_PARCELS.find((p) => p.id === 'site')!;
  const sc = { x: site.x + site.w / 2, y: site.y + 60 };
  const net = (pid: string) => EX_LAYERS.reduce((acc, l) => acc + (layers[l] ? (fx[l][pid] ?? 0) : 0), 0);
  const target = (pid: string) => {
    const p = EX_PARCELS.find((q) => q.id === pid)!;
    return { x: p.x + p.w / 2, y: p.y + p.h / 2 + 30 };
  };
  return (
    <Svg vb="0 0 1600 600" label={`Neighbourhood Externality Co-Designer, a proposed research direction. ${st.heading}: ${st.text} The system shows trade-offs; it does not calculate fairness.`}>
      <defs>
        <marker id="exArrow" viewBox="0 0 10 10" refX={8} refY={5} markerUnits="userSpaceOnUse" markerWidth={16} markerHeight={16} orient="auto">
          <path d="M0 0L10 5L0 10z" fill={W} />
        </marker>
      </defs>
      <T x={20} y={28} size={16} fill="var(--proposal)" weight={700} mono>
        {HEADER}
      </T>
      <StateChips states={EX_STATES} s={s} set={setS} />
      {EX_LAYERS.map((l, k) => (
        <Chip key={l} x={790 + k * 158} y={48} w={148} label={l} keyHint={String(k + 4)} kind="layer" size={18} on={layers[l]} onSelect={() => toggle(l)} title={`${l} layer`} />
      ))}
      {/* neighbourhood map: streets, parcels, footprints */}
      <g opacity={win(t, 0, 0.4)}>
        <rect x={20} y={116} width={960} height={474} fill="rgba(255,255,255,0.02)" stroke={W3} />
        <rect x={20} y={320} width={960} height={60} fill="rgba(255,255,255,0.07)" />
        <rect x={470} y={116} width={60} height={474} fill="rgba(255,255,255,0.07)" />
        <line x1={20} y1={350} x2={980} y2={350} stroke={W3} strokeDasharray="12 10" />
        <line x1={500} y1={116} x2={500} y2={590} stroke={W3} strokeDasharray="12 10" />
        <T x={960} y={344} size={15} fill={W6} anchor="end" mono>
          MAIN STREET
        </T>
        {/* building footprints and landscape */}
        <path d="M60 220 h160 v36 h-110 v54 h-50 z M280 220 h150 v90 h-50 v-54 h-100 z" fill="rgba(255,255,255,0.16)" stroke={W6} />
        {[0, 1, 2, 3].map((k) => (
          <line key={k} x1={556} y1={226 + k * 22} x2={716} y2={226 + k * 22} stroke="var(--cyan)" strokeWidth={6} opacity={0.35} />
        ))}
        <rect x={866} y={210} width={96} height={96} fill="rgba(255,255,255,0.16)" stroke={W6} />
        {[40, 100, 160].map((x) => (
          <rect key={x} x={x} y={470} width={46} height={100} fill="rgba(255,255,255,0.16)" stroke={W6} />
        ))}
        {[640, 740, 840, 940].map((x) => (
          <circle key={x} cx={x} cy={540} r={20} fill="rgba(112,215,206,0.14)" stroke="var(--cyan)" />
        ))}
        {EX_PARCELS.map((p) => {
          const v = p.id === 'site' ? 0 : net(p.id);
          const conflict = s === 1 && PRIORITY_CONFLICT[p.id];
          return (
            <g key={p.id}>
              <rect x={p.x} y={p.y} width={p.w} height={p.h} fill={p.id === 'site' ? 'rgba(255,255,255,0.06)' : v > 0.05 ? `rgba(232,146,74,${Math.min(0.32, 0.1 + v * 0.18)})` : v < -0.05 ? 'rgba(112,215,206,0.2)' : 'rgba(255,255,255,0.02)'} stroke={conflict ? 'var(--coral)' : W6} strokeWidth={conflict ? 3.2 : 1.3} strokeDasharray={p.id === 'site' ? undefined : '6 5'} style={FADE} />
              <path d={`M${p.x} ${p.y} h16 L${p.x} ${p.y + 16} z`} fill="var(--yellow)" opacity={0.9} />
              <rect x={p.x + 8} y={p.y + 8} width={Math.min(p.w - 16, Math.max(p.name.length * 10.4, p.priority.length * 9.4) + 20)} height={60} fill={BG} opacity={0.82} />
              <T x={p.x + 18} y={p.y + 34} size={20} weight={600}>
                {p.name}
              </T>
              <T x={p.x + 18} y={p.y + 58} size={15} fill={conflict ? 'var(--coral)' : W6} mono>
                {p.priority.toUpperCase()}
              </T>
            </g>
          );
        })}
      </g>
      {/* the project: a tall tower, or the AI-suggested stepped alternative */}
      {!alt ? (
        <rect x={sc.x - 45} y={sc.y + 30} width={90} height={90} fill="rgba(255,255,255,0.3)" stroke={W} strokeWidth={2.4} />
      ) : (
        <g>
          <rect x={sc.x - 95} y={sc.y + 30} width={190} height={110} fill="rgba(112,215,206,0.18)" stroke={col('ai')} strokeWidth={2.4} strokeDasharray="8 6" />
          <rect x={sc.x - 30} y={sc.y + 66} width={110} height={66} fill="rgba(255,255,255,0.24)" stroke={col('ai')} strokeDasharray="8 6" />
        </g>
      )}
      {/* effects that cross the boundary */}
      <path d={`M${sc.x - 45} ${sc.y + 30} L${sc.x + (alt ? 60 : 170)} ${sc.y - (alt ? 110 : 250)} L${sc.x + (alt ? 150 : 270)} ${sc.y - (alt ? 110 : 250)} L${sc.x + 45} ${sc.y + 30} z`} fill={LAYER_COLOUR.Shadow} opacity={layers.Shadow ? 1 : 0} style={{ transition: 'all 300ms ease' }} />
      {EX_LAYERS.filter((l) => l !== 'Shadow').map((l, k) => (
        <g key={l} opacity={layers[l] ? 1 : 0} style={FADE}>
          {Object.entries(fx[l]).map(([pid, v]) => {
            const to = target(pid);
            const off = (k - 1.5) * 22;
            return <path key={pid} d={`M${sc.x + off} ${sc.y + 80} Q ${(sc.x + to.x) / 2} ${Math.min(sc.y, to.y) - 40}, ${to.x + off} ${to.y}`} fill="none" stroke={LAYER_COLOUR[l]} strokeWidth={2 + Math.abs(v ?? 0) * 5} strokeDasharray={(v ?? 0) < 0 ? '3 7' : l === 'Glare' ? '2 6' : undefined} strokeLinecap="round" markerEnd="url(#exArrow)" style={{ transition: 'all 300ms ease' }} />;
          })}
        </g>
      ))}
      {/* right panel */}
      <StatePanel x={1010} w={570} st={st} colour={s === 0 ? 'var(--orange)' : s === 1 ? 'var(--coral)' : col('ai')} />
      <T x={1010} y={356} size={16} fill={W6} mono>
        GAINS ← · → BURDENS · ILLUSTRATIVE
      </T>
      {EX_PARCELS.filter((p) => p.id !== 'site').map((p, i) => {
        const v = net(p.id);
        const y = 370 + i * 30;
        return (
          <g key={p.id}>
            <T x={1010} y={y + 20} size={18}>
              {p.name}
            </T>
            <line x1={1330} y1={y} x2={1330} y2={y + 28} stroke={W3} />
            <rect x={v >= 0 ? 1330 : 1330 + v * 150} y={y + 6} width={Math.abs(v) * 150} height={18} fill={v >= 0 ? 'var(--orange)' : 'var(--cyan)'} style={{ transition: 'all 300ms ease' }} />
          </g>
        );
      })}
      <HumanStrip x={1010} y={526} w={570} text="Shows trade-offs, not fairness: people decide" />
    </Svg>
  );
}

// ── Direction: Living Environment Co-Designer ──────────────────────────────
/** Illustrative heat-stress curves, 0 (comfortable) to 1, over 40 years. */
const staticCurve = (y: number) => 0.28 + 0.62 * (y / 40) - 0.12 * Math.max(0, (y - 28) / 12);
const adaptCurve = (y: number) => (y < 20 ? staticCurve(y) : y < 24 ? staticCurve(20) - (y - 20) * 0.07 : Math.max(0.3, staticCurve(20) - 0.28 - (y - 24) * 0.006));

export function Living() {
  const t = useT(600, 40);
  const active = useActive('living');
  const [s, setS] = useState(0);
  const [adaptive, setAdaptive] = useState(true);
  useKeys(active, { '1': () => setS(0), '2': () => setS(1), '3': () => setS(2), '4': () => setS(3), '5': () => setS(4), '6': () => setAdaptive(false), '7': () => setAdaptive(true) });
  const year = LV_STOPS[s]!.year;
  const growth = Math.min(1, year / 40);
  const ad = adaptive;
  const intervened = ad && year >= 20;
  const stress = (ad ? adaptCurve : staticCurve)(year);
  const moisture = intervened ? 0.75 : Math.max(0.2, 0.7 - year * 0.02);
  const people = stress > 0.66 ? 1 : stress > 0.5 ? 2 : 4;
  const cx0 = 870;
  const cx1 = 1540;
  const cy0 = 160;
  const cy1 = 400;
  const X = (yr: number) => cx0 + ((cx1 - cx0) * yr) / 40;
  const Y = (v: number) => cy1 - (cy1 - cy0) * v;
  const line = (f: (y: number) => number) => Array.from({ length: 81 }, (_, k) => k / 2).map((yr, k) => `${k ? 'L' : 'M'}${X(yr).toFixed(1)} ${Y(f(yr)).toFixed(1)}`).join(' ');
  const band = (f: (y: number) => number) => {
    const ys = Array.from({ length: 81 }, (_, k) => k / 2);
    const up = ys.map((yr) => `${X(yr).toFixed(1)} ${Y(Math.min(1, f(yr) + 0.02 + yr * 0.005)).toFixed(1)}`);
    const dn = [...ys].reverse().map((yr) => `${X(yr).toFixed(1)} ${Y(Math.max(0, f(yr) - 0.02 - yr * 0.005)).toFixed(1)}`);
    return `M${up.join(' L')} L${dn.join(' L')} z`;
  };
  const threshold = 0.66;
  return (
    <Svg vb="0 0 1600 600" label={`Living Environment Co-Designer, a proposed research direction. ${LV_STOPS[s]!.label}: ${LV_STOPS[s]!.note}. ${ad ? 'Adaptive pathway' : 'Static design'}. The system does not predict the future; it helps designers monitor change and prepare interventions.`}>
      <defs>
        <pattern id="lvHatch" width={10} height={10} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1={0} y1={0} x2={0} y2={10} stroke="var(--orange)" strokeWidth={2.4} opacity={0.5} />
        </pattern>
      </defs>
      <T x={20} y={28} size={16} fill="var(--proposal)" weight={700} mono>
        {HEADER}
      </T>
      {LV_STOPS.map((st, k) => (
        <Chip key={st.label} x={20 + k * 156} y={48} w={146} label={st.label} keyHint={String(k + 1)} kind="time" size={18} on={s === k} onSelect={() => setS(k)} title={`Time: ${st.label}`} />
      ))}
      <Chip x={830} y={48} w={200} label="Static design" keyHint="6" size={18} on={!ad} onSelect={() => setAdaptive(false)} />
      <Chip x={1042} y={48} w={236} label="Adaptive pathway" keyHint="7" kind="ai" size={18} on={ad} onSelect={() => setAdaptive(true)} />
      {/* illustrative courtyard section */}
      <g opacity={win(t, 0, 0.4)}>
        <rect x={20} y={116} width={800} height={474} fill="rgba(255,255,255,0.02)" stroke={W3} />
        <T x={40} y={150} size={22} fill={W} weight={600}>
          {`${LV_STOPS[s]!.label} · ${LV_STOPS[s]!.note}`}
        </T>
        <rect x={30} y={240} width={110} height={280} fill="rgba(255,255,255,0.08)" stroke={W6} />
        <rect x={700} y={270} width={110} height={250} fill="rgba(255,255,255,0.08)" stroke={W6} />
        <line x1={140} y1={520} x2={700} y2={520} stroke={W} strokeWidth={2.4} />
        <rect x={140} y={520} width={560} height={12} fill={`rgba(255,255,255,${0.4 - growth * 0.25})`} style={FADE} />
        <rect x={140} y={482} width={560} height={38} fill="url(#lvHatch)" opacity={Math.min(1, Math.max(0, (stress - 0.35) * 2.4))} style={FADE} />
        <rect x={140} y={540} width={560 * moisture} height={14} fill="var(--proposal)" opacity={0.75} style={{ transition: 'all 300ms ease' }} />
        <T x={140} y={578} size={16} fill={W6} mono>
          {`SOIL MOISTURE · ${intervened ? 'PERMEABLE PAVING' : year >= 18 ? 'WEATHERED PAVING STORES HEAT' : 'NEW PAVING'}`}
        </T>
        {[250, 420, 590].map((tx) => {
          const r = 22 + 58 * growth;
          const trunk = 40 + 70 * growth;
          return (
            <g key={tx}>
              <line x1={tx} y1={520} x2={tx} y2={520 - trunk} stroke={W6} strokeWidth={3} />
              <ellipse cx={tx} cy={520 - trunk - r * 0.6} rx={r} ry={r * 0.7} fill="rgba(112,215,206,0.18)" stroke="var(--cyan)" strokeWidth={1.6} style={{ transition: 'all 300ms ease' }} />
            </g>
          );
        })}
        {Array.from({ length: people }, (_, k) => (
          <g key={k} transform={`translate(${330 + k * 46} 500)`}>
            <circle cx={0} cy={-26} r={6} fill="var(--coral)" />
            <line x1={0} y1={-20} x2={0} y2={0} stroke="var(--coral)" strokeWidth={3} />
          </g>
        ))}
        <circle cx={760} cy={200} r={18} fill="none" stroke="var(--yellow)" strokeWidth={2.4} />
        <g opacity={intervened && year < 40 ? 1 : 0} style={FADE}>
          <rect x={300} y={350} width={250} height={14} rx={7} fill="rgba(200,185,255,0.3)" stroke={col('ai')} strokeDasharray="6 5" strokeWidth={2.2} />
          <T x={425} y={340} size={16} fill={col('ai')} anchor="middle" mono>
            TEMPORARY SHADE · DESIGNER-APPROVED
          </T>
        </g>
      </g>
      {/* illustrative heat-stress chart */}
      <T x={cx0} y={140} size={17} fill={W6} mono>
        HEAT STRESS IN SUMMER USE · ILLUSTRATIVE
      </T>
      <line x1={cx0} y1={cy1} x2={cx1} y2={cy1} stroke={W6} />
      <line x1={cx0} y1={cy0} x2={cx0} y2={cy1} stroke={W6} />
      {[0, 10, 20, 30, 40].map((yr) => (
        <T key={yr} x={X(yr)} y={cy1 + 26} size={16} fill={W6} anchor={yr === 40 ? 'end' : yr === 0 ? 'start' : 'middle'} mono>
          {yr === 0 ? 'NOW' : `${yr} YR`}
        </T>
      ))}
      <path d={band(ad ? adaptCurve : staticCurve)} fill="url(#lvHatch)" opacity={0.6} style={FADE} />
      <line x1={cx0} y1={Y(threshold)} x2={cx1} y2={Y(threshold)} stroke="var(--coral)" strokeWidth={2.4} strokeDasharray="9 6" />
      <T x={cx0 + 12} y={Y(threshold) - 10} size={16} fill="var(--coral)" mono>
        LIMIT CHOSEN BY THE DESIGNER
      </T>
      <path d={line(staticCurve)} fill="none" stroke={W} strokeWidth={ad ? 1.6 : 3.4} opacity={ad ? 0.45 : 1} style={FADE} />
      <path d={line(adaptCurve)} fill="none" stroke={col('ai')} strokeWidth={ad ? 3.4 : 1.6} strokeDasharray="10 6" opacity={ad ? 1 : 0.45} style={FADE} />
      <circle cx={X(18)} cy={Y(staticCurve(18))} r={8} fill="none" stroke="var(--coral)" strokeWidth={2.6} />
      <line x1={X(20)} y1={cy0} x2={X(20)} y2={cy1} stroke={col('ai')} strokeDasharray="3 5" opacity={ad ? 1 : 0.4} />
      <T x={X(20) + 10} y={cy0 + 18} size={16} fill={col('ai')} mono>
        INTERVENTION
      </T>
      <line x1={X(year)} y1={cy0 - 4} x2={X(year)} y2={cy1} stroke="var(--yellow)" strokeWidth={2.4} style={{ transition: 'all 300ms ease' }} />
      <circle cx={X(year)} cy={Y(stress)} r={8} fill="var(--yellow)" style={{ transition: 'all 300ms ease' }} />
      <T x={cx0} y={456} size={17} fill="var(--orange)" mono>
        HATCH = UNCERTAINTY, WIDER FURTHER AHEAD
      </T>
      <T x={cx0} y={484} size={18} fill={W} lh={1.28}>
        {wrap('Not a prediction: it helps designers monitor change, see when a chosen threshold is crossed, and prepare interventions.', 66).join('\n')}
      </T>
      <HumanStrip x={cx0} y={538} w={cx1 - cx0 + 40} h={52} text="Designer sets the limit and chooses the pathway" />
    </Svg>
  );
}

export const BRANCH_RATIO = { agenda: 1600 / 600, redteam: 1600 / 600, externality: 1600 / 600, living: 1600 / 600 } as const;
