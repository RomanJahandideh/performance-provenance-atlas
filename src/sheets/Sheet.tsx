import type { CSSProperties } from 'react';
import type { Focus, Panel as PanelT, Sheet as SheetT, SheetStep } from '../data/types';
import { SHEETS, STEPS } from '../data/steps';
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

function lines(spec: string): [number, number] {
  const [a, b] = spec.split('/').map((x) => Number(x.trim()));
  return [a ?? 1, b ?? 1];
}

function overlaps(p: PanelT, f: Focus): boolean {
  const [pc0, pc1] = lines(p.col);
  const [pr0, pr1] = lines(p.row);
  const [fc0, fc1] = lines(f.col);
  const [fr0, fr1] = lines(f.row);
  return pc0 < fc1 && fc0 < pc1 && pr0 < fr1 && fr0 < pr1;
}

/** Zoom transform that fits the focus rectangle into the board viewport. */
function boardTransform(sheet: SheetT, f?: Focus): string {
  if (!f) return 'translate(0%, 0%) scale(1)';
  const [c0, c1] = lines(f.col);
  const [r0, r1] = lines(f.row);
  const x0 = (c0 - 1) / sheet.cols;
  const x1 = (c1 - 1) / sheet.cols;
  const y0 = (r0 - 1) / sheet.rows;
  const y1 = (r1 - 1) / sheet.rows;
  const s = Math.max(1, Math.min(3, 0.95 / Math.max(x1 - x0, y1 - y0)));
  const clamp = (v: number) => Math.min(0, Math.max(1 - s, v));
  const tx = clamp(0.5 - s * ((x0 + x1) / 2));
  const ty = clamp(0.5 - s * ((y0 + y1) / 2));
  return `translate(${(tx * 100).toFixed(3)}%, ${(ty * 100).toFixed(3)}%) scale(${s.toFixed(4)})`;
}

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

function PanelBody({ p, replayKey }: { p: PanelT; replayKey: string }) {
  switch (p.kind) {
    case 'image':
      return (
        <div className={`pb-media pb-media--${p.fit ?? 'cover'}`}>
          <img src={p.src} alt={p.alt ?? ''} />
          {p.credit && <span className="pb-credit">{p.credit}</span>}
        </div>
      );
    case 'diagram':
      return <div className="pb-diagram">{p.diagram && <Diagram key={replayKey} id={p.diagram} />}</div>;
    case 'facts':
      return (
        <div className="pb-facts">
          {p.facts?.map((f) => (
            <div key={f.label} className="fact">
              <span className="fact-label">{f.label}</span>
              <span className="fact-value" style={{ color: TONE[f.tone ?? 'ink'] }}>
                {f.value}
              </span>
            </div>
          ))}
        </div>
      );
    case 'list':
      return (
        <ul className="pb-list">
          {p.items?.map((it) => (
            <li key={it.key + it.text}>
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
          {p.note && <p>{p.note}</p>}
        </div>
      );
    default:
      return null;
  }
}

function Board({ sheet, step, stepIndex }: { sheet: SheetT; step: SheetStep; stepIndex: number }) {
  const style = {
    gridTemplateColumns: `repeat(${sheet.cols}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${sheet.rows}, minmax(0, 1fr))`,
    transform: boardTransform(sheet, step.focus),
  } as CSSProperties;
  return (
    <div className="board-viewport">
      <div className="board" style={style}>
        {sheet.panels.map((p, i) => {
          const inFocus = !step.focus || overlaps(p, step.focus);
          const dim = !!step.focus && !inFocus;
          const replayKey = step.focus && inFocus ? `f${stepIndex}` : 'idle';
          return (
            <section
              key={`${sheet.id}-${i}`}
              className={`panel panel--${p.kind} ${dim ? 'is-dim' : ''} ${step.focus && inFocus ? 'is-focus' : ''}`}
              style={{ gridColumn: p.col, gridRow: p.row, '--i': i } as CSSProperties}
            >
              {p.label && (
                <header className="panel-head">
                  <span className="panel-dot" />
                  {p.label}
                </header>
              )}
              <div className="panel-body">
                <PanelBody p={p} replayKey={replayKey} />
              </div>
              <Ticks />
            </section>
          );
        })}
      </div>
    </div>
  );
}

function SideText({ sheet, step, stepInSheet }: { sheet: SheetT; step: SheetStep; stepInSheet: number }) {
  return (
    <aside className="side">
      <div className="side-inner" key={`${sheet.id}-${stepInSheet}`}>
        <span className="tp-rule" />
        <p className="tp-kicker">{sheet.section}</p>
        <h1 className={`tp-title ${stepInSheet === 0 ? 'tp-title--sheet' : ''}`}>{step.title}</h1>
        {step.lines?.map((l, i) => (
          <p key={i} className="tp-line" style={{ animationDelay: `${0.3 + i * 0.12}s` }}>
            {l}
          </p>
        ))}
        {step.facts && (
          <div className="side-facts">
            {step.facts.map((f) => (
              <div key={f.label} className="fact">
                <span className="fact-label">{f.label}</span>
                <span className="fact-value" style={{ color: TONE[f.tone ?? 'ink'] }}>
                  {f.value}
                </span>
              </div>
            ))}
          </div>
        )}
        {step.caveat && <p className="tp-caveat">{step.caveat}</p>}
        {step.links && (
          <p className="tp-links">
            {step.links.map((l) => (
              <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">
                {l.label} →
              </a>
            ))}
          </p>
        )}
      </div>
      <div className="side-steps" aria-label="Steps on this sheet">
        {sheet.steps.map((_, i) => (
          <span key={i} className={i === stepInSheet ? 'on' : i < stepInSheet ? 'done' : ''} />
        ))}
      </div>
    </aside>
  );
}

/** One presentation sheet: side text + zooming board, with the title block below. */
export function Sheet() {
  const stepIndex = useAppState((s) => s.stepIndex);
  const notesOpen = useAppState((s) => s.notesOpen);
  const drawerOpen = useAppState((s) => s.drawerOpen);
  const flat = STEPS[stepIndex] ?? STEPS[0]!;
  const sheet = SHEETS[flat.sheetIndex]!;
  const step = sheet.steps[flat.stepInSheet]!;
  const n = String(flat.sheetIndex + 1).padStart(2, '0');

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
            {stepIndex + 1} / {STEPS.length}
          </span>
        </nav>
      </header>

      <div className="sheet-body" key={sheet.id}>
        <SideText sheet={sheet} step={step} stepInSheet={flat.stepInSheet} />
        <Board sheet={sheet} step={step} stepIndex={stepIndex} />
      </div>

      <footer className="sheet-foot">
        <div className="rail" role="navigation" aria-label="All steps">
          {SHEETS.map((sh, si) => (
            <div key={sh.id} className="rail-group" style={{ flex: sh.steps.length }}>
              {sh.steps.map((_, k) => {
                const i = STEPS.findIndex((s) => s.sheetIndex === si && s.stepInSheet === k);
                return (
                  <button
                    key={k}
                    className="rail-tick"
                    data-done={i < stepIndex}
                    data-active={i === stepIndex}
                    aria-label={`Sheet ${si + 1}, step ${k + 1}`}
                    onClick={() => goToStep(i)}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="title-block">
          <span className="tb-cell tb-sheet">
            Sheet <b>{n}</b> / {String(SHEETS.length).padStart(2, '0')}
          </span>
          <span className="tb-cell tb-title">{sheet.title}</span>
          <span className="tb-cell tb-proj">
            Step {flat.stepInSheet + 1} of {sheet.steps.length}
          </span>
        </div>
      </footer>
    </main>
  );
}
