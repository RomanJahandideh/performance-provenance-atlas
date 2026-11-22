import { sceneById } from '../data/scenes';
import { SLIDES, STEPS } from '../data/steps';
import { CITATIONS, cite } from '../data/citations';
import { ev } from '../data/evidence';
import { goToStep } from '../lib/stepper';
import { setState, useAppState } from '../state/store';
import { ROLE_STYLE } from '../data/provenance';

/** Presenter cue: recommended time, what to demonstrate, what to skip. */
export function Cue({ c }: { c: { sec: number; demo: string; skip: string } }) {
  return (
    <dl className="cue">
      <div><dt>TIME</dt><dd>{`${Math.floor(c.sec / 60)}:${String(c.sec % 60).padStart(2, '0')}`}</dd></div>
      <div><dt>SHOW</dt><dd>{c.demo}</dd></div>
      <div><dt>SKIP</dt><dd>{c.skip}</dd></div>
    </dl>
  );
}

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
      {SLIDES[stepIndex]?.cue && <Cue c={SLIDES[stepIndex]!.cue!} />}
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
            <p className={`cit-verify ${c.verification.includes('blocked') || c.verification.includes('not yet') || c.verification.includes('Not independently verified') ? 'flag' : ''}`}>{c.verification}</p>
            {c.url && (
              <a href={c.url} target="_blank" rel="noopener noreferrer">
                {c.doi ? `doi:${c.doi}` : c.url} ↗
              </a>
            )}
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
    <div className="overlay-screen" role="dialog" aria-modal="true" aria-label={`All ${STEPS.length} steps`} onClick={() => setState({ chapterMapOpen: false })}>
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
    ['one scroll / swipe', `one step, ${STEPS.length} in total`],
    ['↓ → Space PgDn', 'next step'],
    ['↑ ← Shift+Space PgUp', 'previous step'],
    ['Home / End', 'first / last step'],
    ['F', 'full screen'],
    ['N', 'speaker notes'],
    ['S or C', 'sources + evidence drawer'],
    ['M', 'list of all steps'],
    ['L', 'legend: colours and line styles'],
    ['P', 'presenter window: notes, next step, target times'],
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

/** ── Legend (L): what each colour and line style means ─────────────────── */
export function Legend() {
  const open = useAppState((s) => s.legendOpen);
  if (!open) return null;
  const status: [string, string][] = [
    ['Published', 'solid block on a plinth'],
    ['Accepted', 'lighter block on a plinth'],
    ['Under revision', 'orange hatch, dashed outline'],
    ['Verified implementation', 'wireframe with cyan control points'],
    ['Proposed', 'dotted outline, proposal blue'],
    ['Field precedents', 'double outline, others’ work, not mine'],
  ];
  return (
    <div className="overlay-screen" role="dialog" aria-modal="true" aria-label="Legend" onClick={() => setState({ legendOpen: false })}>
      <div className="overlay-card" style={{ maxWidth: 720 }} onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head" style={{ padding: 0, border: 'none' }}>
          <span className="drawer-title">LEGEND</span>
          <button className="hud-btn" onClick={() => setState({ legendOpen: false })}>
            ESC ✕
          </button>
        </div>
        <table className="keys-table">
          <tbody>
            {Object.values(ROLE_STYLE).map((r) => (
              <tr key={r.name}>
                <td>
                  <span className="legend-swatch" style={{ background: r.colour }} />
                  {r.name}
                </td>
                <td>{r.shape}</td>
              </tr>
            ))}
            {status.map(([k, v]) => (
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
