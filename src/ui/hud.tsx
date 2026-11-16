import { setState, useAppState } from '../state/store';
import { goToStep } from '../lib/stepper';
import { STEPS } from '../data/steps';

/** Minimal HUD: title, step counter, two quiet buttons. */
export function TopHUD() {
  const stepIndex = useAppState((s) => s.stepIndex);
  const notesOpen = useAppState((s) => s.notesOpen);
  const legendOpen = useAppState((s) => s.legendOpen);
  return (
    <header className="hud-top">
      <span className="hud-brand">
        <b>PERFORMANCE PROVENANCE</b> <span className="sub">· ROMAN JAHANDIDEH</span>
      </span>
      <span className="hud-spacer" />
      <span className="hud-count" aria-live="polite">
        {String(stepIndex + 1).padStart(2, '0')} <span>/ {STEPS.length}</span>
      </span>
      <button className="hud-btn" aria-pressed={legendOpen} onClick={() => setState({ legendOpen: !legendOpen })} title="Map legend (L)">
        LEGEND
      </button>
      <button className="hud-btn" aria-pressed={notesOpen} onClick={() => setState({ notesOpen: !notesOpen })} title="Speaker notes (N)">
        NOTES
      </button>
    </header>
  );
}

/** Twenty ticks — one per scroll. */
export function ProgressRail() {
  const stepIndex = useAppState((s) => s.stepIndex);
  return (
    <nav className="progress-rail" aria-label="Presentation progress">
      <div className="rail-stops">
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            className="rail-stop"
            data-done={i < stepIndex}
            data-active={i === stepIndex}
            aria-label={`Go to step ${i + 1}: ${s.title ?? s.id}`}
            onClick={() => goToStep(i)}
          />
        ))}
      </div>
    </nav>
  );
}
