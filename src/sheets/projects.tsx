import { useState } from 'react';
import { RoleBox, Svg, T, W, W1, W3, W6, col, wrap } from './framework';
import { Chip, FADE, useActive, useKeys } from './interact';
import { useT, win } from './useT';
import type { Role } from '../data/provenance';

/*
 * Project demonstrations (steps for the Zoning Literacy Assistant and the
 * Parametric Massing Generator). Values come from the project READMEs and the
 * evidence records: ten R1-1 clauses; the laneway-storeys question returning
 * "not covered"; 4.9 m front setback; FSR 0.70 rising to 1.00 with the rental
 * condition; the 10 × 37 m worked example (162.6 m² footprint, one floor
 * becoming two), re-derived for this presentation.
 */

// ── Zoning Literacy Assistant: two questions, one pipeline ──────────────────
const ZLA_CASES = [
  {
    chip: 'Answered',
    question: 'What is the front setback?',
    retrieve: 'R1-1 · Setbacks clause',
    source: '“…front yard of 4.9 m…”',
    ai: 'Front setback: 4.9 m, quoted from the clause',
    compute: 'Buildable footprint, 10 × 37 m lot: 162.6 m², computed in code',
    verify: 'Reviewer pass: the answer matches the clause',
    result: 'Answered, with the clause cited',
  },
  {
    chip: 'Not covered',
    question: 'How many storeys can a laneway house have?',
    retrieve: 'Laneway houses are mentioned',
    source: 'but no clause sets their height',
    ai: 'No answer is written',
    compute: 'Nothing to compute',
    verify: 'The pipeline stops before guessing',
    result: 'Not covered',
  },
] as const;

export function ZlaFlow() {
  const t = useT(700, 60);
  const active = useActive('zla');
  const [k, setK] = useState(0);
  useKeys(active, { '1': () => setK(0), '2': () => setK(1) });
  const c = ZLA_CASES[k]!;
  const silent = k === 1;
  const rows: { role: Role; label: string; text: string; dim?: boolean }[] = [
    { role: 'source', label: '1 · RETRIEVE A CLAUSE', text: `${c.retrieve}${k === 1 ? ', ' : '. '}${c.source}` },
    { role: 'ai', label: '2 · ANSWER ONLY FROM IT', text: c.ai, dim: silent },
    { role: 'compute', label: 'DETERMINISTIC CODE', text: c.compute, dim: silent },
    { role: silent ? 'uncertain' : 'operation', label: '3 · VERIFY', text: c.verify },
  ];
  return (
    <Svg vb="0 0 560 860" label={`Zoning Literacy Assistant pipeline. Case: ${c.question} Result: ${c.result}.`}>
      <T x={10} y={26} size={15} fill={W6} mono>
        KEYS 1 · 2 OR CLICK
      </T>
      <Chip x={10} y={40} w={262} label="Answered" keyHint="1" on={k === 0} onSelect={() => setK(0)} title="Case 1: answered from a clause" />
      <Chip x={288} y={40} w={262} label="Not covered" keyHint="2" kind="time" on={k === 1} onSelect={() => setK(1)} title="Case 2: the bylaw is silent" />
      <g opacity={win(t, 0, 0.4)}>
        <T x={10} y={128} size={15} fill={W6} mono>
          QUESTION
        </T>
        <T x={10} y={158} size={23} weight={700} lh={1.22}>
          {wrap(c.question, 34).join('\n')}
        </T>
      </g>
      {rows.map((r, i) => {
        const y = 230 + i * 128;
        return (
          <g key={r.label} opacity={win(t, 0.1 + i * 0.12, 0.4 + i * 0.12) * (r.dim ? 0.45 : 1)} style={FADE}>
            {i > 0 && <line x1={40} y1={y - 22} x2={40} y2={y - 4} stroke={W6} strokeWidth={2} markerEnd="url(#fwArrow)" />}
            <RoleBox x={10} y={y} w={540} h={104} role={r.role} />
            <T x={30} y={y + 32} size={15} fill={r.role === 'operation' ? W6 : col(r.role)} weight={700} mono>
              {r.label}
            </T>
            <T x={30} y={y + 62} size={19} lh={1.25}>
              {wrap(r.text, 48).join('\n')}
            </T>
          </g>
        );
      })}
      <g opacity={win(t, 0.6, 0.9)}>
        <rect x={10} y={754} width={540} height={70} fill={silent ? 'rgba(232,146,74,0.18)' : 'rgba(112,215,206,0.14)'} stroke={silent ? 'var(--orange)' : 'var(--cyan)'} strokeWidth={2.4} style={FADE} />
        <T x={280} y={798} size={26} weight={700} anchor="middle" fill={silent ? 'var(--orange)' : W}>
          {c.result}
        </T>
      </g>
      <T x={10} y={850} size={14} fill={W6} mono>
        TEN R1-1 CLAUSES · NOT PLANNING ADVICE
      </T>
    </Svg>
  );
}

// ── Parametric Massing Generator: phrase → rule → parameter → geometry ─────
const LOT = 370; // 10 × 37 m
const FOOT = 162.6; // buildable footprint after setbacks, m²

export function PmgFlow() {
  const t = useT(700, 60);
  const active = useActive('pmg');
  const [rental, setRental] = useState(false);
  useKeys(active, { '1': () => setRental(false), '2': () => setRental(true) });
  const fsr = rental ? 1.0 : 0.7;
  const gfa = fsr * LOT;
  const floors = Math.min(3, Math.floor(gfa / FOOT));
  const steps: { role: Role; label: string; text: string }[] = [
    { role: 'source', label: 'BYLAW PHRASE (PARAPHRASED)', text: 'Base floor space ratio 0.70; 1.00 where a unit is secured rental or below-market' },
    { role: 'ai', label: 'EXTRACTED RULE, WITH ITS SOURCE', text: 'max FSR = 0.70, or 1.00 if the rental condition holds' },
    { role: 'operation', label: 'EDITABLE PARAMETER', text: `Rental condition ${rental ? 'on' : 'off'}  →  FSR ${fsr.toFixed(2)}` },
  ];
  const ox = 790;
  const oy = 470;
  const fw = 170;
  const fd = 80;
  const fh = 56;
  return (
    <Svg vb="0 0 1000 600" label={`Parametric Massing Generator: the rental condition is ${rental ? 'on' : 'off'}, FSR ${fsr.toFixed(2)}, ${floors} floor${floors > 1 ? 's' : ''} on the worked example lot.`}>
      <T x={10} y={24} size={16} fill={W6} mono>
        RENTAL CONDITION · KEYS 1 · 2 OR CLICK
      </T>
      <Chip x={10} y={38} w={236} label="Off · FSR 0.70" keyHint="1" on={!rental} onSelect={() => setRental(false)} title="Rental condition off, FSR 0.70" />
      <Chip x={262} y={38} w={236} label="On · FSR 1.00" keyHint="2" on={rental} onSelect={() => setRental(true)} title="Rental condition on, FSR 1.00" />
      {steps.map((s, i) => {
        const y = 110 + i * 132;
        return (
          <g key={s.label} opacity={win(t, i * 0.12, 0.3 + i * 0.12)}>
            {i > 0 && <line x1={40} y1={y - 22} x2={40} y2={y - 4} stroke={W6} strokeWidth={2} markerEnd="url(#fwArrow)" />}
            <RoleBox x={10} y={y} w={520} h={108} role={s.role} />
            <T x={30} y={y + 32} size={16} fill={s.role === 'operation' ? W6 : col(s.role)} weight={700} mono>
              {s.label}
            </T>
            <T x={30} y={y + 66} size={21} weight={i === 2 ? 700 : 400} lh={1.25} fill={i === 2 ? 'var(--yellow)' : W}>
              {wrap(s.text, 44).join('\n')}
            </T>
          </g>
        );
      })}
      <line x1={530} y1={428} x2={600} y2={428} stroke={W6} strokeWidth={2} markerEnd="url(#fwArrow)" opacity={win(t, 0.45, 0.8)} />
      <g opacity={win(t, 0.45, 0.8)}>
        <T x={610} y={130} size={16} fill="var(--cyan)" weight={700} mono>
          GEOMETRY, COMPUTED IN CODE
        </T>
        <T x={610} y={162} size={19} lh={1.3}>
          {`Lot 10 × 37 m · footprint ${FOOT} m²\nallowed floor area ${Math.round(gfa)} m²`}
        </T>
        <path d={`M${ox - 210} ${oy} L${ox} ${oy + 80} L${ox + 210} ${oy} L${ox} ${oy - 80} z`} fill={W1} stroke={W3} />
        {Array.from({ length: 3 }, (_, f) => {
          const on = f < floors;
          const y0 = oy - 10 - f * fh;
          return (
            <g key={f} opacity={on ? 1 : 0.18} style={FADE}>
              <path d={`M${ox - fw} ${y0} L${ox} ${y0 + fd} L${ox} ${y0 + fd - fh} L${ox - fw} ${y0 - fh} z`} fill="rgba(112,215,206,0.22)" stroke="var(--cyan)" strokeWidth={1.8} strokeDasharray={on ? undefined : '4 5'} />
              <path d={`M${ox} ${y0 + fd} L${ox + fw} ${y0} L${ox + fw} ${y0 - fh} L${ox} ${y0 + fd - fh} z`} fill="rgba(112,215,206,0.12)" stroke="var(--cyan)" strokeWidth={1.8} strokeDasharray={on ? undefined : '4 5'} />
              <path d={`M${ox - fw} ${y0 - fh} L${ox} ${y0 + fd - fh} L${ox + fw} ${y0 - fh} L${ox} ${y0 - fd - fh} z`} fill={on && f === floors - 1 ? 'rgba(255,255,255,0.2)' : 'none'} stroke="var(--cyan)" strokeWidth={1.8} strokeDasharray={on ? undefined : '4 5'} />
            </g>
          );
        })}
        <T x={990} y={236} size={40} weight={700} anchor="end" fill={W}>
          {`${floors} floor${floors > 1 ? 's' : ''}`}
        </T>
        <T x={990} y={262} size={15} fill={W6} anchor="end" mono>
          DASHED: 3-STOREY HEIGHT LIMIT
        </T>
      </g>
      <T x={10} y={594} size={15} fill={W6} mono>
        WORKED EXAMPLE RE-DERIVED FROM THE R1-1 PRESET
      </T>
    </Svg>
  );
}

export const PROJECT_RATIO = { zlaflow: 560 / 860, pmgflow: 1000 / 600 } as const;
