import type { CSSProperties } from 'react';
import type { Panel as PanelT, Step } from '../data/types';
import { STEPS } from '../data/steps';
import { setState, useAppState } from '../state/store';
import { goToStep } from '../lib/stepper';
import { Diagram } from './diagrams';

const TONE: Record<string, string> = {
  yellow: 'var(--yellow)',
  cyan: 'var(--cyan)',
  orange: 'var(--orange)',
  coral: 'var(--coral)',
  red: 'var(--red)',
  ink: 'var(--ink)',
};

function Ticks() {
  return (
    <>
      <i className="tick tl" />
      <i className="tick tr" />
      <i className="tick bl" />
      <i className="tick br" />
    </>
  );
}

function TextPanel({ p }: { p: PanelT }) {
  return (
    <div className="tp">
      <span className="tp-rule" />
      {p.kicker && <p className="tp-kicker">{p.kicker}</p>}
      {p.title && <h1 className="tp-title">{p.title}</h1>}
      {p.lines?.map((l, i) => (
        <p key={i} className="tp-line" style={{ animationDelay: `${0.35 + i * 0.12}s` }}>
          {l}
        </p>
      ))}
      {p.caveat && <p className="tp-caveat">{p.caveat}</p>}
      {p.links && (
        <p className="tp-links">
          {p.links.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">
              {l.label} →
            </a>
          ))}
        </p>
      )}
    </div>
  );
}

function PanelBody({ p }: { p: PanelT }) {
  switch (p.kind) {
    case 'image':
      return (
        <div className={`pb-media pb-media--${p.fit ?? 'cover'}`}>
          <img src={p.src} alt={p.alt ?? ''} />
          {p.credit && <span className="pb-credit">{p.credit}</span>}
        </div>
      );
    case 'diagram':
      return <div className="pb-diagram">{p.diagram && <Diagram id={p.diagram} />}</div>;
    case 'facts':
      return (
        <div className="pb-facts">
          {p.facts?.map((f, i) => (
            <div key={f.label} className="fact" style={{ animationDelay: `${0.45 + i * 0.12}s` }}>
              <span className="fact-label">{f.label}</span>
              <span className={`fact-value ${f.num ? 'fact-value--num' : ''}`} style={{ color: TONE[f.tone ?? 'ink'] }}>
                {f.value}
              </span>
            </div>
          ))}
        </div>
      );
    case 'list':
      return (
        <ul className="pb-list">
          {p.items?.map((it, i) => (
            <li key={it.key + it.text} style={{ animationDelay: `${0.45 + i * 0.12}s` }}>
              <span className="li-key" style={{ color: TONE[it.tone ?? 'yellow'] }}>
                {it.key}
              </span>
              <span className="li-text">{it.text}</span>
            </li>
          ))}
        </ul>
      );
    case 'card':
      return (
        <div className="pb-card">
          <h3>{p.title}</h3>
          <p>{p.note}</p>
        </div>
      );
    default:
      return null;
  }
}

function span(lines: string): number {
  const [a, b] = lines.split('/').map((x) => Number(x.trim()));
  return (b ?? 0) - (a ?? 0);
}

function Panel({ p, i }: { p: PanelT; i: number }) {
  const style = { gridColumn: p.col, gridRow: p.row, '--i': i } as CSSProperties;
  const dims = { 'data-cols': span(p.col), 'data-rows': span(p.row) };
  if (p.kind === 'text') {
    return (
      <section className="panel panel--text" style={style} {...dims}>
        <TextPanel p={p} />
      </section>
    );
  }
  return (
    <section className={`panel panel--${p.kind}`} style={style} {...dims}>
      {p.label && (
        <header className="panel-head">
          <span className="panel-dot" />
          {p.label}
        </header>
      )}
      <div className="panel-body">
        <PanelBody p={p} />
      </div>
      <Ticks />
    </section>
  );
}

function SheetGrid({ step }: { step: Step }) {
  return (
    <div className="sheet-grid" key={step.id}>
      {step.panels.map((p, i) => (
        <Panel key={`${step.id}-${i}`} p={p} i={i} />
      ))}
    </div>
  );
}

/** The drawing-sheet frame: top bar, panel grid, and the title block. */
export function Sheet() {
  const stepIndex = useAppState((s) => s.stepIndex);
  const notesOpen = useAppState((s) => s.notesOpen);
  const drawerOpen = useAppState((s) => s.drawerOpen);
  const step = STEPS[stepIndex] ?? STEPS[0]!;
  const n = String(stepIndex + 1).padStart(2, '0');

  return (
    <main className="sheet" aria-live="polite">
      <header className="sheet-top">
        <span className="brand">Roman Jahandideh</span>
        <nav className="top-nav">
          <button aria-pressed={notesOpen} onClick={() => setState({ notesOpen: !notesOpen })}>
            Notes
          </button>
          <button aria-pressed={drawerOpen} onClick={() => setState({ drawerOpen: !drawerOpen })}>
            Sources
          </button>
          <span className="top-count">
            {n} / {STEPS.length}
          </span>
        </nav>
      </header>

      <SheetGrid step={step} />

      <footer className="sheet-foot">
        <div className="rail" role="navigation" aria-label="20 sheets">
          {STEPS.map((s, i) => (
            <button key={s.id} className="rail-tick" data-done={i < stepIndex} data-active={i === stepIndex} aria-label={`Sheet ${i + 1}: ${s.title}`} onClick={() => goToStep(i)} />
          ))}
        </div>
        <div className="title-block">
          <span className="tb-cell tb-sheet">
            Sheet <b>{n}</b>
          </span>
          <span className="tb-cell tb-title">{step.title}</span>
          <span className="tb-cell tb-proj">Performance Provenance · GenEnv PhD interview</span>
        </div>
      </footer>
    </main>
  );
}
