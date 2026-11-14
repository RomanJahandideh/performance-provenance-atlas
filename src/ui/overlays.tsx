import { useEffect, useRef } from 'react';
import { camera } from '../lib/camera';
import { WORLD, DISTRICTS } from '../data/atlas';
import { ROUTE_POINTS } from '../data/trajectory';
import { SCENES } from '../data/scenes';
import { CITATIONS, cite } from '../data/citations';
import { AWARDS } from '../data/trajectory';
import { PARCELS, parcel } from '../data/projects';
import { ev } from '../data/evidence';
import { closeAllPanels, goToScene, setState, useAppState } from '../state/store';

/** ── Mini-map ───────────────────────────────────────────────────────────── */
export function MiniMap() {
  const ref = useRef<SVGRectElement>(null);
  const mode = useAppState((s) => s.mode);
  useEffect(
    () =>
      camera.onChange((c, aspect) => {
        const el = ref.current;
        if (!el) return;
        const w = c.w;
        const h = w / aspect;
        el.setAttribute('x', String(c.cx - w / 2));
        el.setAttribute('y', String(c.cy - h / 2));
        el.setAttribute('width', String(w));
        el.setAttribute('height', String(h));
      }),
    [],
  );
  return (
    <div
      className="minimap"
      aria-hidden
      onClick={(e) => {
        if (mode !== 'explore') return;
        const r = (e.currentTarget.querySelector('svg') as SVGSVGElement).getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * WORLD.w;
        const y = ((e.clientY - r.top) / r.height) * WORLD.h;
        camera.set({ cx: x, cy: y });
      }}
      title={mode === 'explore' ? 'Click to move the camera' : 'Current map position'}
    >
      <svg viewBox={`0 0 ${WORLD.w} ${WORLD.h}`}>
        <rect width={WORLD.w} height={WORLD.h} fill="rgba(11,50,102,0.35)" stroke="var(--line-major)" strokeWidth={6} />
        {DISTRICTS.map((d) => (
          <polygon key={d.id} points={d.points.map((p) => `${p.x},${p.y}`).join(' ')} fill="none" stroke="var(--muted)" strokeWidth={5} opacity={0.5} />
        ))}
        <polyline points={ROUTE_POINTS.map((p) => `${p.x},${p.y}`).join(' ')} fill="none" stroke="var(--yellow)" strokeWidth={10} opacity={0.7} />
        <rect ref={ref} fill="rgba(112,215,206,0.12)" stroke="var(--cyan)" strokeWidth={14} />
      </svg>
    </div>
  );
}

/** ── Speaker notes (N) ──────────────────────────────────────────────────── */
export function NotesDock() {
  const open = useAppState((s) => s.notesOpen);
  const sceneIndex = useAppState((s) => s.sceneIndex);
  const stepIndex = useAppState((s) => s.stepIndex);
  const scene = SCENES[sceneIndex] ?? SCENES[0]!;
  const next = SCENES[sceneIndex + 1];
  return (
    <aside className={`notes-dock ${open ? 'open' : ''}`} aria-hidden={!open} aria-label="Speaker notes">
      <h3>
        SPEAKER NOTES — {scene.chapter} {scene.title.toUpperCase()} · TARGET {Math.floor(scene.targetSeconds / 60)}:
        {String(scene.targetSeconds % 60).padStart(2, '0')}
      </h3>
      {scene.script.map((p, i) => (
        <p key={i} style={{ opacity: i <= stepIndex + 1 ? 1 : 0.55 }}>
          {p}
        </p>
      ))}
      <p className="notes-meta">
        NEXT → {next ? `${next.chapter} · ${next.title}` : 'END'} · step {stepIndex + 1}/{scene.steps.length} ·{' '}
        {scene.steps[Math.min(stepIndex, scene.steps.length - 1)]?.label}
      </p>
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
          <rect x="3" y="4" width="34" height="14" fill="url(#lg-hatch)" stroke="var(--geom)" strokeDasharray="6 4" />
          <pattern id="lg-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="var(--orange)" strokeWidth="1.2" />
          </pattern>
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
        falsified hypothesis / failed check — red, kept visible
      </div>
      <p className="legend-sub">COLOUR = MEANING</p>
      <div className="legend-row">
        <svg width="46" height="10">
          <line x1="2" y1="5" x2="42" y2="5" stroke="var(--yellow)" strokeWidth="3" />
        </svg>
        provenance · route · evidence trace
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
      <div className="legend-row">
        <svg width="46" height="10">
          <line x1="2" y1="5" x2="42" y2="5" stroke="var(--lime)" strokeWidth="3" />
        </svg>
        environmental performance
      </div>
      <p className="legend-sub">AXES</p>
      <div className="legend-row">x — spatial scale: clause → parcel → building → urban block → district</div>
      <div className="legend-row">y — computational agency: deterministic → interpretation → generation → critique → negotiation</div>
      <div className="legend-row">height — evidence maturity (never research quality)</div>
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
          <span className="drawer-title">CHAPTER MAP — THE 20-MINUTE ROUTE + APPENDIX</span>
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
                goToScene(i);
              }}
            >
              <span className="n">
                {s.chapter}
                {s.appendix ? ' · APPENDIX' : ''}
              </span>
              <span className="t">{s.title}</span>
              <span className="d">
                {s.appendix ? 'outside timing' : `target ${Math.floor(s.targetSeconds / 60)}:${String(s.targetSeconds % 60).padStart(2, '0')}`}
              </span>
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
    ['↓ → Space', 'next step, then next scene'],
    ['↑ ← Shift+Space', 'previous step / scene'],
    ['PgDn / PgUp', 'next / previous scene'],
    ['Home / End', 'first / last main scene'],
    ['1–9, 0', 'jump to scene (0 = Why GenEnv)'],
    ['F', 'full screen'],
    ['N', 'speaker notes'],
    ['S or C', 'sources + evidence drawer'],
    ['L', 'map legend'],
    ['M', 'chapter map'],
    ['D or E', 'presentation ↔ explore mode'],
    ['T', 'start / pause the 20-minute timer'],
    ['R', 'restart presentation + timer'],
    ['X', 'reduced-motion toggle'],
    ['Esc', 'close any panel'],
  ];
  return (
    <div className="overlay-screen" role="dialog" aria-modal="true" aria-label="Keyboard controls" onClick={() => setState({ helpOpen: false })}>
      <div className="overlay-card" style={{ maxWidth: 560 }} onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head" style={{ padding: 0, border: 'none' }}>
          <span className="drawer-title">PRESENTATION CONTROLS</span>
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
        <p className="cit-verify" style={{ marginTop: 10 }}>
          Explore mode: drag to pan, wheel to zoom, click any parcel for its project sheet. Nothing in the presentation requires
          hover or a network connection.
        </p>
      </div>
    </div>
  );
}

/** ── Project sheet (click a parcel) ─────────────────────────────────────── */
export function ProjectSheet() {
  const id = useAppState((s) => s.sheetParcel);
  if (!id) return null;
  const p = parcel(id);
  const evidence = p.evidenceIds.map(ev);
  return (
    <div className="overlay-screen" role="dialog" aria-modal="true" aria-label={`Project sheet: ${p.title}`} onClick={closeAllPanels}>
      <div className="overlay-card sheet" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head" style={{ padding: 0, border: 'none' }}>
          <span className="drawer-title">
            RESEARCH PARCEL · {p.kicker.toUpperCase()} · {p.date}
          </span>
          <button className="hud-btn" onClick={closeAllPanels}>
            ESC ✕
          </button>
        </div>
        <h2>{p.title}</h2>
        <p className="panel-statement" style={{ marginTop: 6 }}>
          {p.researchQuestion}
        </p>
        {p.image && <img className="sheet-img" src={p.image} alt={p.imageAlt ?? p.title} loading="lazy" />}
        <div className="sheet-grid">
          <div>
            <h4>Inputs</h4>
            <ul>
              {p.inputs.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <h4>Process</h4>
            <ul>
              {p.process.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Evidence</h4>
            <ul>
              {evidence.map((e) => (
                <li key={e.id}>{e.presentationLabel}</li>
              ))}
            </ul>
            <h4>Honest limitation</h4>
            <ul>
              {p.limitations.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
        <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.18em', color: 'var(--muted)', margin: '12px 0 4px' }}>
          WHAT THIS DEMONSTRATES FOR GENENV
        </h4>
        <p style={{ fontSize: 14, color: 'var(--ink-dim)', margin: 0 }}>{p.genenvConnection}</p>
        <div className="panel-links" style={{ marginTop: 14 }}>
          {p.links.map((l) => (
            <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer">
              {l.label} ↗{l.verified ? '' : ' *'}
            </a>
          ))}
        </div>
        {p.links.some((l) => !l.verified) && (
          <p className="cit-verify flag" style={{ marginTop: 6 }}>
            * link could not be automatically verified on 2026-11-13 — see docs/PROJECT_EVIDENCE_AUDIT.md.
          </p>
        )}
      </div>
    </div>
  );
}

/** ── Award sheet ────────────────────────────────────────────────────────── */
export function AwardSheet() {
  const id = useAppState((s) => s.sheetAward);
  if (!id) return null;
  const a = AWARDS.find((x) => x.id === id);
  if (!a) return null;
  return (
    <div className="overlay-screen" role="dialog" aria-modal="true" aria-label={`Award: ${a.title}`} onClick={closeAllPanels}>
      <div className="overlay-card" style={{ maxWidth: 640 }} onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head" style={{ padding: 0, border: 'none' }}>
          <span className="drawer-title">ARCHITECTURAL BOARD · {a.year}</span>
          <button className="hud-btn" onClick={closeAllPanels}>
            ESC ✕
          </button>
        </div>
        <h2 style={{ fontFamily: 'var(--font-head)', margin: '4px 0' }}>{a.title}</h2>
        <p className="cit-meta">{a.context}</p>
        {a.image ? (
          <img className="sheet-img" src={a.image} alt={a.imageAlt ?? a.title} />
        ) : (
          <div
            className="sheet-img"
            role="img"
            aria-label={`Placeholder — no image supplied for ${a.title}`}
            style={{ padding: '40px 20px', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)', background: 'rgba(11,50,102,0.3)' }}
          >
            IMAGE PLACEHOLDER — NOT SUPPLIED IN SOURCE MATERIALS
          </div>
        )}
        <p className="cit-verify">Source: {a.source}</p>
      </div>
    </div>
  );
}

/** ── Explore mode filter bar ────────────────────────────────────────────── */
const FILTERS: [string, string][] = [
  ['published', 'PUBLISHED'],
  ['accepted', 'ACCEPTED'],
  ['under-revision', 'UNDER REVISION'],
  ['verified-computation', 'VERIFIED PROTOTYPE'],
  ['proposed', 'PROPOSED'],
];

export function ExploreBar() {
  const mode = useAppState((s) => s.mode);
  const filter = useAppState((s) => s.statusFilter);
  if (mode !== 'explore') return null;
  const toggle = (f: string) =>
    setState({ statusFilter: filter.includes(f) ? filter.filter((x) => x !== f) : [...filter, f] });
  return (
    <div className="explore-bar" role="toolbar" aria-label="Explore filters">
      <span className="hint">EXPLORE — DRAG · WHEEL · CLICK PARCELS</span>
      {FILTERS.map(([f, label]) => (
        <button key={f} className="hud-btn" aria-pressed={filter.includes(f)} onClick={() => toggle(f)}>
          {label}
        </button>
      ))}
      {PARCELS.filter((p) => p.id !== 'phd').length > 0 && (
        <button className="hud-btn" onClick={() => setState({ statusFilter: [] })}>
          CLEAR
        </button>
      )}
    </div>
  );
}
