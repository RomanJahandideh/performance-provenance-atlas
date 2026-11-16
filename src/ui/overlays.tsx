import { sceneById } from '../data/scenes';
import { STEPS } from '../data/steps';
import { CITATIONS, cite } from '../data/citations';
import { ev } from '../data/evidence';
import { goToStep } from '../lib/stepper';
import { setState, useAppState } from '../state/store';

/** ── Speaker notes (N) ──────────────────────────────────────────────────── */
export function NotesDock() {
  const open = useAppState((s) => s.notesOpen);
  const stepIndex = useAppState((s) => s.stepIndex);
  const step = STEPS[stepIndex] ?? STEPS[0]!;
  const next = STEPS[stepIndex + 1];
  return (
    <aside className={`notes-dock ${open ? 'open' : ''}`} aria-hidden={!open} aria-label="Speaker notes">
      <h3>
        SPEAKER NOTES · {(step.title ?? step.id).toUpperCase()}
      </h3>
      {step.notes.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <p className="notes-meta">NEXT → {next ? `${stepIndex + 2} · ${next.title ?? next.id}` : 'END'}</p>
    </aside>
  );
}

/** ── Source / evidence drawer (S or C) ──────────────────────────────────── */
export function SourceDrawer() {
  const open = useAppState((s) => s.drawerOpen);
  const stepIndex = useAppState((s) => s.stepIndex);
  const scene = sceneById((STEPS[stepIndex] ?? STEPS[0]!).scene);
  const sceneCitations = scene.citationIds.map(cite);
  const rest = CITATIONS.filter((c) => !scene.citationIds.includes(c.id));
  const evidence = scene.evidenceIds.map(ev);

  return (
    <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open} aria-label="Sources and evidence">
      <div className="drawer-head">
        <span className="drawer-title">SOURCES AND EVIDENCE · {scene.title.toUpperCase()}</span>
        <button className="hud-btn" onClick={() => setState({ drawerOpen: false })} aria-label="Close drawer">
          ESC ✕
        </button>
      </div>
      <div className="drawer-body">
        {evidence.length > 0 && (
          <>
            <p className="cit-meta" style={{ marginTop: 0 }}>
              CLAIMS ON THIS SCENE
            </p>
            {evidence.map((e) => (
              <div className="cit" key={e.id}>
                <p className="cit-title">{e.presentationLabel}</p>
                <p className="cit-supports">{e.claim}</p>
                <p className="cit-meta">
                  {e.status.toUpperCase()} · {e.source}
                </p>
                {e.limitation && <p className="cit-verify flag">{e.limitation}</p>}
              </div>
            ))}
          </>
        )}
        <p className="cit-meta">{sceneCitations.length > 0 ? 'CITED ON THIS SCENE' : 'ALL SOURCES'}</p>
        {[...sceneCitations, ...(sceneCitations.length > 0 ? [] : rest)].map((c) => (
          <div className="cit" key={c.id}>
            <p className="cit-title">{c.title}</p>
            <p className="cit-meta">
              {c.authors} · {c.venue} · {c.year}
            </p>
            <p className="cit-supports">{c.supports}</p>
            <p className={`cit-verify ${c.verification.includes('blocked') || c.verification.includes('not yet') ? 'flag' : ''}`}>{c.verification}</p>
            <a href={c.url} target="_blank" rel="noopener noreferrer">
              {c.doi ? `doi:${c.doi}` : c.url} ↗
            </a>
          </div>
        ))}
      </div>
    </aside>
  );
}

/** ── Chapter map (M) ────────────────────────────────────────────────────── */
export function ChapterMap() {
  const open = useAppState((s) => s.chapterMapOpen);
  const stepIndex = useAppState((s) => s.stepIndex);
  if (!open) return null;
  return (
    <div className="overlay-screen" role="dialog" aria-modal="true" aria-label="All 20 steps" onClick={() => setState({ chapterMapOpen: false })}>
      <div className="overlay-card" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head" style={{ padding: 0, border: 'none' }}>
          <span className="drawer-title">ALL {STEPS.length} STEPS</span>
          <button className="hud-btn" onClick={() => setState({ chapterMapOpen: false })}>
            ESC ✕
          </button>
        </div>
        <div className="chapter-grid">
          {STEPS.map((s, i) => (
            <button
              key={s.id}
              className="chapter-cell"
              data-active={i === stepIndex}
              onClick={() => {
                setState({ chapterMapOpen: false });
                goToStep(i);
              }}
            >
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
              <span className="t">{s.title ?? s.id}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** ── Keyboard help (?) ──────────────────────────────────────────────────── */
export function HelpOverlay() {
  const open = useAppState((s) => s.helpOpen);
  if (!open) return null;
  const rows: [string, string][] = [
    ['one scroll / swipe', 'one sheet, 20 sheets in total'],
    ['↓ → Space PgDn', 'next step'],
    ['↑ ← Shift+Space PgUp', 'previous step'],
    ['Home / End', 'first / last step'],
    ['F', 'full screen'],
    ['N', 'speaker notes'],
    ['S or C', 'sources + evidence drawer'],
    ['M', 'all 20 sheets'],
    ['R', 'restart from the opening'],
    ['X', 'reduced-motion toggle'],
    ['Esc', 'close any panel'],
  ];
  return (
    <div className="overlay-screen" role="dialog" aria-modal="true" aria-label="Keyboard controls" onClick={() => setState({ helpOpen: false })}>
      <div className="overlay-card" style={{ maxWidth: 560 }} onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head" style={{ padding: 0, border: 'none' }}>
          <span className="drawer-title">CONTROLS</span>
          <button className="hud-btn" onClick={() => setState({ helpOpen: false })}>
            ESC ✕
          </button>
        </div>
        <table className="keys-table">
          <tbody>
            {rows.map(([k, v]) => (
              <tr key={k}>
                <td>{k}</td>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
