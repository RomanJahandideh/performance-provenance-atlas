import { useEffect, useState } from 'react';
import {
  getState,
  goToScene,
  resetPresentation,
  setState,
  timerElapsedMs,
  toggleMode,
  toggleReducedMotion,
  toggleTimer,
  useAppState,
  prefersReducedMotion,
} from '../state/store';
import { SCENES, MAIN_SCENES, CUMULATIVE_TARGETS, TOTAL_TARGET_SECONDS } from '../data/scenes';

function fmt(ms: number): string {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export function TopHUD() {
  const sceneIndex = useAppState((s) => s.sceneIndex);
  const mode = useAppState((s) => s.mode);
  const notesOpen = useAppState((s) => s.notesOpen);
  const drawerOpen = useAppState((s) => s.drawerOpen);
  const legendOpen = useAppState((s) => s.legendOpen);
  const running = useAppState((s) => s.timerRunning);
  const rm = useAppState((s) => s.reducedMotionOverride);
  const [, tick] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => tick((n) => n + 1), 1000);
    return () => window.clearInterval(t);
  }, []);

  const elapsed = timerElapsedMs();
  const scene = SCENES[sceneIndex] ?? SCENES[0]!;
  const mainIdx = Math.min(sceneIndex, MAIN_SCENES.length - 1);
  // Ahead/behind vs the cumulative target at the END of the previous scene.
  const targetSoFar = mainIdx > 0 ? CUMULATIVE_TARGETS[mainIdx - 1]! : 0;
  const delta = Math.round(elapsed / 1000) - targetSoFar;
  const started = getState().timerStartedAt !== null || elapsed > 0;

  return (
    <header className="hud-top">
      <span className="hud-brand">
        <b>PERFORMANCE PROVENANCE</b> <span className="sub">· PARAMETRIC RESEARCH ATLAS</span>
      </span>
      <span className="hud-brand" aria-live="polite">
        {scene.chapter} / {scene.appendix ? 'APPENDIX' : String(MAIN_SCENES.length).padStart(2, '0')}
      </span>
      <span className="hud-spacer" />
      <span className="hud-timer" title="Elapsed · target 19:10 of 20:00 — T to start/pause">
        <span>{fmt(elapsed)}</span>
        <span style={{ color: 'var(--muted)' }}>/ {fmt(TOTAL_TARGET_SECONDS * 1000)}</span>
        {started && !scene.appendix && (
          <span className={delta <= 0 ? 'delta--ahead' : 'delta--behind'}>
            {delta <= 0 ? '−' : '+'}
            {fmt(Math.abs(delta) * 1000)}
          </span>
        )}
      </span>
      <button className="hud-btn" aria-pressed={running} onClick={toggleTimer} title="Start/pause timer (T)">
        {running ? 'PAUSE' : 'TIMER'}
      </button>
      <button className="hud-btn" aria-pressed={mode === 'explore'} onClick={toggleMode} title="Presentation ↔ explore (D)">
        {mode === 'explore' ? 'EXPLORE ●' : 'EXPLORE'}
      </button>
      <button className="hud-btn" aria-pressed={legendOpen} onClick={() => setState({ legendOpen: !legendOpen })} title="Map legend (L)">
        LEGEND
      </button>
      <button className="hud-btn" aria-pressed={drawerOpen} onClick={() => setState({ drawerOpen: !drawerOpen })} title="Sources (S)">
        SOURCES
      </button>
      <button className="hud-btn" aria-pressed={notesOpen} onClick={() => setState({ notesOpen: !notesOpen })} title="Speaker notes (N)">
        NOTES
      </button>
      <button className="hud-btn" aria-pressed={rm === true || (rm === null && prefersReducedMotion())} onClick={toggleReducedMotion} title="Reduced motion (X)">
        MOTION−
      </button>
      <button className="hud-btn" onClick={resetPresentation} title="Restart (R)">
        RESTART
      </button>
      <button className="hud-btn" onClick={() => setState({ helpOpen: true })} title="Keyboard help (?)">
        ?
      </button>
    </header>
  );
}

export function ProgressRail() {
  const sceneIndex = useAppState((s) => s.sceneIndex);
  const scene = SCENES[sceneIndex] ?? SCENES[0]!;
  return (
    <nav className="progress-rail" aria-label="Presentation progress">
      <span className="rail-scene-label">
        <b>{scene.chapter}</b> · {scene.title.toUpperCase()}
      </span>
      <div className="rail-stops">
        {SCENES.map((s, i) => (
          <button
            key={s.id}
            className="rail-stop"
            data-done={i < sceneIndex}
            data-active={i === sceneIndex}
            data-appendix={!!s.appendix}
            aria-label={`Go to scene ${s.chapter}: ${s.title}`}
            onClick={() => goToScene(i)}
          >
            <span className="tip">
              {s.chapter} · {s.title}
            </span>
          </button>
        ))}
      </div>
      <span className="rail-scene-label" style={{ textAlign: 'right', minWidth: 120 }}>
        <b>M</b> MAP · <b>?</b> KEYS
      </span>
    </nav>
  );
}
