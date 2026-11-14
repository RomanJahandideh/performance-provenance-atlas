import { SCENES } from '../data/scenes';
import { CITATIONS, cite } from '../data/citations';
import { ev } from '../data/evidence';
import { scrollToScene } from '../lib/scroll';
import { setState, useAppState } from '../state/store';

/** ── Speaker notes (N) ──────────────────────────────────────────────────── */
export function NotesDock() {
  const open = useAppState((s) => s.notesOpen);
  const sceneIndex = useAppState((s) => s.sceneIndex);
  const scene = SCENES[sceneIndex] ?? SCENES[0]!;
  const next = SCENES[sceneIndex + 1];
  return (
    <aside className={`notes-dock ${open ? 'open' : ''}`} aria-hidden={!open} aria-label="Speaker notes">
      <h3>
        SPEAKER NOTES — {scene.chapter} {scene.title.toUpperCase()}
      </h3>
      {scene.script.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <p className="notes-meta">NEXT → {next ? `${next.chapter} · ${next.title}` : 'END'}</p>
    </aside>
  );
}

/** ── Source / evidence drawer (S or C) ──────────────────────────────────── */
export function SourceDrawer() {
  const open = useAppState((s) => s.drawerOpen);
  const sceneIndex = useAppState((s) => s.sceneIndex);
  const scene = SCENES[sceneIndex] ?? SCENES[0]!;
  const sceneCitations = scene.citationIds.map(cite);
  const rest = CITATIONS.filter((c) => !scene.citationIds.includes(c.id));
  const evidence = scene.evidenceIds.map(ev);

  return (
    <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open} aria-label="Sources and evidence">
      <div className="drawer-head">
        <span className="drawer-title">SOURCES + EVIDENCE — {scene.chapter}</span>
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

/** ── Map legend (L) ─────────────────────────────────────────────────────── */
export function LegendPanel() {
  const open = useAppState((s) => s.legendOpen);
  return (
    <aside className={`legend-panel ${open ? 'open' : ''}`} aria-hidden={!open} aria-label="Map legend">
      <h3>MAP LEGEND — STATUS IS DRAWN, NOT BADGED</h3>
      <div className="legend-row">
        <svg width="46" height="22">
          <rect x="3" y="4" width="34" height="12" fill="rgba(237,242,247,0.5)" stroke="var(--geom)" />
          <rect x="1" y="17" width="40" height="3" fill="rgba(112,215,206,0.4)" />
        </svg>
        published / accepted — solid mass on an evidence plinth, DOI tick
      </div>
      <div className="legend-row">
        <svg width="46" height="22">
          <pattern id="lg-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="var(--orange)" strokeWidth="1.2" />
          </pattern>
          <rect x="3" y="4" width="34" height="14" fill="url(#lg-hatch)" stroke="var(--geom)" strokeDasharray="6 4" />
        </svg>
        under revision — hatched translucent volume, open boundary
      </div>
      <div className="legend-row">
        <svg width="46" height="22">
          <rect x="3" y="4" width="34" height="14" fill="none" stroke="var(--geom)" />
          <rect x="0" y="1" width="6" height="6" fill="var(--bg)" stroke="var(--cyan)" />
          <rect x="34" y="1" width="6" height="6" fill="var(--bg)" stroke="var(--cyan)" />
        </svg>
        working prototype / verified computation — wireframe with control points
      </div>
      <div className="legend-row">
        <svg width="46" height="22">
          <rect x="3" y="6" width="34" height="12" fill="none" stroke="var(--yellow)" strokeWidth="1.6" strokeDasharray="2 6" />
          <line x1="3" y1="6" x2="3" y2="0" stroke="var(--yellow)" />
          <line x1="37" y1="6" x2="37" y2="0" stroke="var(--yellow)" />
        </svg>
        proposed PhD work — dotted yellow footprint with survey stakes
      </div>
      <div className="legend-row">
        <svg width="46" height="22">
          <rect x="1" y="12" width="42" height="7" fill="rgba(242,207,85,0.25)" stroke="var(--yellow)" />
          <rect x="8" y="3" width="28" height="10" fill="rgba(152,167,184,0.25)" stroke="var(--muted)" />
        </svg>
        external funded research (GenEnv) — yellow foundation, attributed, not mine
      </div>
      <div className="legend-row">
        <svg width="46" height="22">
          <line x1="2" y1="11" x2="42" y2="11" stroke="var(--muted)" strokeWidth="1.6" strokeDasharray="7 5" />
        </svg>
        written but not executed — grey dashed
      </div>
      <div className="legend-row">
        <svg width="46" height="22">
          <rect x="4" y="5" width="36" height="12" fill="rgba(224,82,82,0.12)" stroke="var(--red)" />
        </svg>
        falsified hypothesis — red, kept visible
      </div>
      <p className="legend-sub">COLOUR = MEANING</p>
      <div className="legend-row">
        <svg width="46" height="10">
          <line x1="2" y1="5" x2="42" y2="5" stroke="var(--yellow)" strokeWidth="3" />
        </svg>
        provenance · route · evidence
      </div>
      <div className="legend-row">
        <svg width="46" height="10">
          <line x1="2" y1="5" x2="42" y2="5" stroke="var(--cyan)" strokeWidth="3" />
        </svg>
        verified computational output
      </div>
      <div className="legend-row">
        <svg width="46" height="10">
          <line x1="2" y1="5" x2="42" y2="5" stroke="var(--orange)" strokeWidth="3" />
        </svg>
        assumption · placeholder · proxy
      </div>
      <div className="legend-row">
        <svg width="46" height="10">
          <line x1="2" y1="5" x2="42" y2="5" stroke="var(--coral)" strokeWidth="3" />
        </svg>
        human decision · judgment
      </div>
      <p className="legend-sub">AXES</p>
      <div className="legend-row">x — spatial scale: clause → district · y — computational agency: deterministic → negotiation · height — evidence maturity</div>
    </aside>
  );
}

/** ── Chapter map (M) ────────────────────────────────────────────────────── */
export function ChapterMap() {
  const open = useAppState((s) => s.chapterMapOpen);
  const sceneIndex = useAppState((s) => s.sceneIndex);
  if (!open) return null;
  return (
    <div className="overlay-screen" role="dialog" aria-modal="true" aria-label="Chapter map" onClick={() => setState({ chapterMapOpen: false })}>
      <div className="overlay-card" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head" style={{ padding: 0, border: 'none' }}>
          <span className="drawer-title">CHAPTER MAP</span>
          <button className="hud-btn" onClick={() => setState({ chapterMapOpen: false })}>
            ESC ✕
          </button>
        </div>
        <div className="chapter-grid">
          {SCENES.map((s, i) => (
            <button
              key={s.id}
              className="chapter-cell"
              data-active={i === sceneIndex}
              onClick={() => {
                setState({ chapterMapOpen: false });
                scrollToScene(i);
              }}
            >
              <span className="n">
                {s.chapter}
                {s.appendix ? ' · APPENDIX' : ''}
              </span>
              <span className="t">{s.title}</span>
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
    ['scroll', 'tells the story — camera, drawings, and text follow'],
    ['↓ ↑ · ← → · Space', 'scroll the story forward / back'],
    ['PgDn / PgUp', 'next / previous scene'],
    ['Home / End', 'first / last main scene'],
    ['1–9, 0', 'jump to a scene (0 = Why GenEnv)'],
    ['F', 'full screen'],
    ['N', 'speaker notes'],
    ['S or C', 'sources + evidence drawer'],
    ['L', 'map legend'],
    ['M', 'chapter map'],
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
