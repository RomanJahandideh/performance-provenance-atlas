import { useEffect, useState } from 'react';
import { CHAPTERS, SECTIONS, SLIDES, START_AT, STEPS, noteWords } from '../data/steps';
import { onSync, send } from '../lib/sync';

const fmt = (sec: number) => {
  const r = Math.max(0, Math.round(sec));
  return `${Math.floor(r / 60)}:${String(r % 60).padStart(2, '0')}`;
};

/**
 * Presenter-only window (open with P). Shows the notes, the next step and
 * where the talk should be by now. Nothing here reaches the shared screen.
 * Arrow keys here drive the deck. T restarts the clock.
 */
export function PresenterView() {
  const [index, setIndex] = useState(0);
  const [t0, setT0] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let first = true;
    const off = onSync((m) => {
      if (m.type !== 'step') return;
      setIndex(m.index);
      // The reply to "hello" only reports where the deck is; the clock starts on a real move.
      if (!first) setT0((v) => v ?? Date.now());
      first = false;
    });
    send({ type: 'hello' });
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => {
      off();
      window.clearInterval(id);
    };
  }, []);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        send({ type: 'go', index: index + 1 });
      } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        send({ type: 'go', index: index - 1 });
      } else if (e.key === 't' || e.key === 'T') setT0(Date.now());
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [index]);

  const step = STEPS[index] ?? STEPS[0]!;
  const slide = SLIDES[index] ?? SLIDES[0]!;
  const next = STEPS[index + 1];
  const elapsed = t0 ? (now - t0) / 1000 : 0;
  const target = START_AT[index] ?? 0;
  const drift = elapsed - target;
  const end = (START_AT[STEPS.length - 1] ?? 0) + (noteWords(STEPS.length - 1) / 105) * 60;

  return (
    <div className="presenter">
      <header className="pv-head">
        <span>
          STEP {index + 1} / {STEPS.length} · {slide.chapter.toUpperCase()}
        </span>
        <span className="pv-clock">
          {t0 ? fmt(elapsed) : 'clock starts on the first step change'} · start this step by {fmt(target)}
          {t0 && <em className={Math.abs(drift) < 20 ? 'ok' : drift > 0 ? 'late' : 'early'}>{Math.abs(drift) < 20 ? ' on pace' : drift > 0 ? ` ${fmt(drift)} behind` : ` ${fmt(-drift)} ahead`}</em>}
        </span>
      </header>
      <div className="pv-sections">
        {CHAPTERS.map((c) => {
          const sec = SECTIONS.find((s) => s.name === c.name);
          const active = index >= c.first && index < c.first + c.count;
          return (
            <div key={c.name} className={`pv-sec ${active ? 'is-active' : ''} ${index >= c.first + c.count ? 'is-done' : ''}`} style={{ flex: `${c.count} 1 0` }}>
              <i />
              <span>
                {c.name} · {fmt(START_AT[c.first] ?? 0)}
                {sec ? ` · ${sec.target}` : ''}
              </span>
            </div>
          );
        })}
      </div>
      <h1>{step.title}</h1>
      <div className="pv-notes">
        {step.notes.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <footer className="pv-foot">
        <span>NEXT: {next ? `${index + 2} · ${next.title}` : 'end of talk'}</span>
        <span>Planned length {fmt(end)} · ←/→ move the deck · T restarts the clock</span>
      </footer>
    </div>
  );
}
