import { useEffect, useRef, type KeyboardEvent as RKeyboardEvent } from 'react';
import { T, W, W6, col } from './framework';
import { useAppState } from '../state/store';
import { STEPS } from '../data/steps';

/*
 * Shared controls for the interactive sheets (project and research-direction
 * steps). Number keys act only on the current step and never change the step;
 * arrow keys keep their global meaning. Every control is also clickable and
 * reachable with Tab, and Enter or Space on a focused control does not advance
 * the deck. State changes fade in about 300 ms.
 */

export const FADE = { transition: 'opacity 300ms ease, fill 300ms ease, stroke 300ms ease' };

/** True while this sheet's step is the current one. */
export function useActive(stepId: string): boolean {
  return useAppState((s) => STEPS[s.stepIndex]?.id === stepId);
}

/** Number keys for the active sheet only. */
export function useKeys(active: boolean, map: Record<string, () => void>) {
  const ref = useRef(map);
  ref.current = map;
  useEffect(() => {
    if (!active) return;
    const on = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA')) return;
      const fn = ref.current[e.key];
      if (fn) {
        e.preventDefault();
        e.stopPropagation();
        fn();
      }
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [active]);
}

/** Enter and Space activate a focused control without moving the deck. */
export function activate(fn: () => void) {
  return (e: RKeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      fn();
    }
  };
}

/** A focusable SVG button with a visible focus ring. */
export function Chip({ x, y, w, h = 44, label, on, onSelect, kind = 'state', size = 20, title, keyHint }: { x: number; y: number; w: number; h?: number; label: string; on: boolean; onSelect: () => void; kind?: 'state' | 'ai' | 'layer' | 'time'; size?: number; title?: string; keyHint?: string }) {
  const stroke = kind === 'ai' ? col('ai') : kind === 'layer' ? 'var(--cyan)' : kind === 'time' ? 'var(--orange)' : W;
  return (
    <g className="dg-btn" role="button" tabIndex={0} aria-pressed={on} aria-label={title ?? label} onClick={onSelect} onKeyDown={activate(onSelect)}>
      <rect className="dg-ring" x={x - 5} y={y - 5} width={w + 10} height={h + 10} rx={kind === 'ai' ? 14 : 4} fill="none" stroke="var(--yellow)" strokeWidth={3} />
      <rect x={x} y={y} width={w} height={h} rx={kind === 'ai' ? 12 : 3} fill={on ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)'} stroke={stroke} strokeWidth={on ? 2.6 : 1.4} strokeDasharray={kind === 'ai' ? '7 5' : undefined} style={FADE} />
      {keyHint && (
        <T x={x + 12} y={y + h / 2 + 6} size={16} fill={on ? 'var(--yellow)' : W6} mono>
          {keyHint}
        </T>
      )}
      <T x={keyHint ? x + w / 2 + 10 : x + w / 2} y={y + h / 2 + size * 0.36} size={size} anchor="middle" weight={on ? 700 : 500} fill={on ? W : 'rgba(255,255,255,0.82)'}>
        {label}
      </T>
    </g>
  );
}
