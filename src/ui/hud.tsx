import { setState, useAppState } from '../state/store';
import { scrollToScene } from '../lib/scroll';
import { SCENES } from '../data/scenes';

/** Minimal HUD: brand, scene counter, and three quiet toggles. No timer. */
export function TopHUD() {
  const sceneIndex = useAppState((s) => s.sceneIndex);
  const notesOpen = useAppState((s) => s.notesOpen);
  const legendOpen = useAppState((s) => s.legendOpen);
  const scene = SCENES[sceneIndex] ?? SCENES[0]!;

  return (
    <header className="hud-top">
      <span className="hud-brand">
        <b>PERFORMANCE PROVENANCE</b> <span className="sub">· PARAMETRIC RESEARCH ATLAS</span>
      </span>
      <span className="hud-spacer" />
      <span className="hud-brand" aria-live="polite">
        {scene.chapter} <span className="sub">/ 11</span>
      </span>
      <button className="hud-btn" aria-pressed={legendOpen} onClick={() => setState({ legendOpen: !legendOpen })} title="Map legend (L)">
        LEGEND
      </button>
      <button className="hud-btn" aria-pressed={notesOpen} onClick={() => setState({ notesOpen: !notesOpen })} title="Speaker notes (N)">
        NOTES
      </button>
      <button className="hud-btn" onClick={() => setState({ helpOpen: true })} title="Keyboard help (?)">
        ?
      </button>
    </header>
  );
}

export function ProgressRail() {
  const sceneIndex = useAppState((s) => s.sceneIndex);
  const sceneP = useAppState((s) => s.sceneP);
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
            onClick={() => scrollToScene(i)}
          >
            {i === sceneIndex && <span className="rail-fill" style={{ width: `${sceneP * 100}%` }} />}
            <span className="tip">
              {s.chapter} · {s.title}
            </span>
          </button>
        ))}
      </div>
      <span className="rail-scene-label" style={{ textAlign: 'right', minWidth: 110 }}>
        SCROLL TO TELL
      </span>
    </nav>
  );
}
