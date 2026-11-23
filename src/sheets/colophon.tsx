import { useState } from 'react';
import { RoleBox, Svg, T, W, W3, W6, col } from './framework';
import { FADE, activate } from './interact';
import { useT, win } from './useT';
import { goToStep } from '../lib/stepper';
import { CHAPTERS, SLIDES } from '../data/steps';
import { EVIDENCE } from '../data/evidence';
import { sceneById } from '../data/scenes';
import type { Role } from '../data/provenance';

/*
 * Closing page: the talk shown as data. Every count is computed from the
 * presentation's own records, and every square jumps to its step.
 */

const INTERACTIVE = new Set(['zla', 'pmg', 'agenda', 'redteam', 'externality', 'living', 'colophon']);

export function Colophon() {
  const t = useT(700, 60);
  const [hover, setHover] = useState<number | null>(null);
  const cited = new Set(SLIDES.flatMap((s) => s.refs ?? []));
  const stats: { n: number; label: string }[] = [
    { n: SLIDES.length, label: 'STEPS' },
    { n: cited.size, label: 'PUBLISHED WORKS CITED' },
    { n: EVIDENCE.length, label: 'EVIDENCE RECORDS' },
    { n: SLIDES.filter((s) => INTERACTIVE.has(s.id)).length, label: 'INTERACTIVE STEPS' },
  ];
  const trail: { n: string; role: Role }[] = [
    { n: 'Claim on a slide', role: 'operation' },
    { n: 'Evidence record', role: 'source' },
    { n: 'Paper, README or dataset', role: 'compute' },
    { n: 'Checked, with a date', role: 'human' },
  ];
  const n = SLIDES.length;
  const cw = 1560 / n;
  const sq = Math.min(48, cw - 8);
  return (
    <Svg vb="0 0 1600 560" label={`This presentation as data: ${SLIDES.length} steps, ${cited.size} published works cited, ${EVIDENCE.length} evidence records. Each step is a square you can open.`}>
      <T x={20} y={26} size={16} fill={W6} mono>
        THE TALK AS DATA · COUNTED FROM ITS OWN RECORDS
      </T>
      {stats.map((s, i) => (
        <g key={s.label} opacity={win(t, i * 0.08, 0.3 + i * 0.08)}>
          <T x={20 + i * 395} y={96} size={56} weight={700} fill={i === 1 ? 'var(--yellow)' : W}>
            {String(s.n)}
          </T>
          <T x={20 + i * 395} y={126} size={16} fill={W6} mono>
            {s.label}
          </T>
        </g>
      ))}
      <g opacity={win(t, 0.3, 0.6)}>
        {trail.map((s, i) => (
          <g key={s.n}>
            {i < trail.length - 1 && <line x1={20 + i * 395 + 350} y1={202} x2={20 + (i + 1) * 395 - 8} y2={202} stroke={W6} strokeWidth={2} markerEnd="url(#fwArrow)" />}
            <RoleBox x={20 + i * 395} y={172} w={350} h={60} role={s.role} />
            <T x={40 + i * 395} y={209} size={21} weight={600}>
              {s.n}
            </T>
          </g>
        ))}
      </g>
      <g opacity={win(t, 0.5, 0.85)}>
        <T x={20} y={298} size={16} fill={W6} mono>
          EVERY STEP · CLICK, OR TAB AND ENTER, TO OPEN
        </T>
        {SLIDES.map((s, i) => {
          const x = 20 + i * cw + (cw - sq) / 2;
          const y = 316;
          const h = hover === i;
          const hasRefs = !!s.refs?.length;
          const hasEvidence = sceneById(s.scene).evidenceIds.length > 0;
          const inter = INTERACTIVE.has(s.id);
          return (
            <g key={s.id} className="dg-btn" role="button" tabIndex={0} aria-label={`Step ${i + 1}: ${s.title}`} onClick={() => goToStep(i)} onKeyDown={activate(() => goToStep(i))} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)} onFocus={() => setHover(i)} onBlur={() => setHover(null)}>
              <rect className="dg-ring" x={x - 4} y={y - 4} width={sq + 8} height={sq + 8} fill="none" stroke="var(--yellow)" strokeWidth={2.5} />
              <rect x={x} y={y} width={sq} height={sq} fill={hasEvidence ? 'rgba(112,215,206,0.22)' : 'rgba(255,255,255,0.06)'} stroke={inter ? col('ai') : h ? W : W3} strokeWidth={inter || h ? 2.2 : 1.2} strokeDasharray={inter ? '5 4' : undefined} style={FADE} />
              {hasRefs && <path d={`M${x} ${y} h14 L${x} ${y + 14} z`} fill="var(--yellow)" />}
              <T x={x + sq / 2} y={y + sq / 2 + 7} size={18} anchor="middle" weight={h ? 700 : 500} fill={W}>
                {String(i + 1)}
              </T>
            </g>
          );
        })}
        {CHAPTERS.map((c) => {
          const x0 = 20 + c.first * cw + 4;
          const x1 = 20 + (c.first + c.count) * cw - 4;
          return (
            <g key={c.name}>
              <line x1={x0} y1={380} x2={x1} y2={380} stroke={W3} strokeWidth={2} />
              {c.count * cw > 70 && (
                <T x={(x0 + x1) / 2} y={402} size={14} anchor="middle" fill={W6} mono>
                  {c.name.toUpperCase()}
                </T>
              )}
            </g>
          );
        })}
        <T x={20} y={456} size={hover === null ? 19 : 24} weight={hover === null ? 400 : 600} fill={hover === null ? W6 : W}>
          {hover === null ? 'Hover or focus a square to see its title' : `${hover + 1} · ${SLIDES[hover]!.title}`}
        </T>
        <g>
          <path d="M20 500 h14 L20 514 z" fill="var(--yellow)" />
          <T x={44} y={514} size={16} fill={W6} mono>
            CITES PUBLISHED WORK
          </T>
          <rect x={290} y={500} width={16} height={16} fill="rgba(112,215,206,0.22)" stroke={W3} />
          <T x={316} y={514} size={16} fill={W6} mono>
            LINKED TO EVIDENCE RECORDS
          </T>
          <rect x={620} y={500} width={16} height={16} fill="none" stroke={col('ai')} strokeWidth={2} strokeDasharray="4 3" />
          <T x={646} y={514} size={16} fill={W6} mono>
            INTERACTIVE
          </T>
          <T x={1580} y={514} size={16} fill={W6} anchor="end" mono>
            REACT · TYPESCRIPT · SVG · WORKS OFFLINE
          </T>
        </g>
      </g>
    </Svg>
  );
}

export const COLOPHON_RATIO = { colophon: 1600 / 560 } as const;
