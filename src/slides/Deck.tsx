import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import type { Fact, Media, Slide } from '../data/types';
import { CHAPTERS, SLIDES } from '../data/steps';
import { IMG } from '../data/media';
import { apaEntry, parenCite } from '../data/citations';
import { setState, useAppState } from '../state/store';
import { goToStep } from '../lib/stepper';
import { Diagram, DIAGRAM_RATIO } from '../sheets/diagrams';

const TONE: Record<string, string> = {
  yellow: 'var(--yellow)',
  cyan: 'var(--cyan)',
  orange: 'var(--orange)',
  coral: 'var(--coral)',
  red: 'var(--red)',
  ink: 'var(--ink)',
  proposal: 'var(--proposal)',
};

const GAP = 22;
const CAPTION = 34;

function ratioOf(m: Media): number {
  if (m.diagram) return DIAGRAM_RATIO[m.diagram];
  const d = m.src ? IMG[m.src] : undefined;
  return d ? d[0] / d[1] : 1.5;
}

/** Native height of an image, so it is never drawn larger than its pixels. */
function maxHeightOf(m: Media): number {
  if (m.diagram) return Infinity;
  const d = m.src ? IMG[m.src] : undefined;
  return d ? d[1] : Infinity;
}

/**
 * A row of media sized to fit its box exactly: every item keeps its own
 * proportions, shares one height, and is never cropped, cut or upscaled.
 */
function FitRow({ media, align = 'start', className = '' }: { media: Media[]; align?: 'start' | 'center' | 'end'; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const ratios = media.map(ratioOf);
  const maxH = media.map(maxHeightOf);
  const n = media.length;
  const hasCap = media.some((m) => m.caption || m.credit);
  const cap = hasCap ? CAPTION : 0;
  // Side by side: one shared height.
  const rowH = Math.max(0, Math.floor(Math.min((box.w - GAP * (n - 1)) / ratios.reduce((a, b) => a + b, 0), box.h - cap, ...maxH)));
  // Stacked: one shared width.
  const colW = Math.max(0, Math.floor(Math.min(box.w, (box.h - GAP * (n - 1) - cap * n) / ratios.reduce((a, r) => a + 1 / r, 0), ...ratios.map((r, i) => r * maxH[i]!))));
  const rowArea = rowH * rowH * ratios.reduce((a, b) => a + b, 0);
  const colArea = colW * colW * ratios.reduce((a, r) => a + 1 / r, 0);
  const stacked = n >= 2 && n <= 3 && colArea > rowArea * 1.08;
  const cross = { start: 'flex-start', center: 'center', end: 'flex-end' }[align];
  return (
    <div ref={ref} className={`fitrow fitrow--${align} ${stacked ? 'is-stacked' : ''} ${className}`} style={stacked ? { flexDirection: 'column', alignItems: cross, justifyContent: 'center' } : undefined}>
      {box.w > 0 &&
        media.map((m, i) => {
          const w = stacked ? colW : Math.floor(ratios[i]! * rowH);
          const h = stacked ? Math.floor(colW / ratios[i]!) : rowH;
          return (
            <figure key={(m.src ?? m.diagram ?? '') + i} className={`fig ${m.diagram ? 'fig--vector' : ''}`} style={{ width: w, '--d': `${0.1 + i * 0.06}s` } as CSSProperties}>
              <div className="fig-media" style={{ height: h }}>
                {m.diagram ? <Diagram id={m.diagram} /> : <img src={m.src} alt={m.alt ?? ''} width={m.src ? IMG[m.src]?.[0] : undefined} height={m.src ? IMG[m.src]?.[1] : undefined} decoding="async" draggable={false} />}
              </div>
              {(m.caption || m.credit) && (
                <figcaption>
                  <span>{m.caption}</span>
                  {m.credit && <em>{m.credit}</em>}
                </figcaption>
              )}
            </figure>
          );
        })}
    </div>
  );
}

const preloaded = new Set<string>();
function preload(src: string) {
  if (preloaded.has(src)) return;
  preloaded.add(src);
  const im = new Image();
  im.decoding = 'async';
  im.src = src;
}

/** Renders a value exactly as written: verified numbers are never animated from zero. */
function CountUp({ value }: { value: string }) {
  return <>{value}</>;
}

function Facts({ facts, className = '' }: { facts?: Fact[]; className?: string }) {
  if (!facts?.length) return null;
  return (
    <dl className={`facts ${className}`}>
      {facts.map((f, i) => (
        <div key={f.label} className="fact" style={{ '--d': `${0.12 + i * 0.05}s` } as CSSProperties}>
          <dt>{f.label}</dt>
          <dd style={{ color: TONE[f.tone ?? 'ink'] }}>
            <CountUp value={f.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Head({ s, big = false }: { s: Slide; big?: boolean }) {
  return (
    <div className="head">
      <p className="kicker">{s.kicker ?? s.chapter}</p>
      <h1 className={big ? 'title title--big' : 'title'}>
        <span>{s.title}</span>
      </h1>
    </div>
  );
}

function Lines({ s, from = 0 }: { s: Slide; from?: number }) {
  return (
    <>
      {s.lines?.map((l, i) => (
        <p key={i} className="line" style={{ '--d': `${0.1 + (from + i) * 0.05}s` } as CSSProperties}>
          {l}
        </p>
      ))}
      {s.callout && (
        <p className="line use" style={{ '--d': `${0.1 + (from + (s.lines?.length ?? 0)) * 0.05 + 0.05}s` } as CSSProperties}>
          <span className="use-label">{s.callout.label}</span>
          {s.callout.text}
        </p>
      )}
      {s.project && <Pattern p={s.project} />}
    </>
  );
}

/** The shared five-part reading of each research project. */
function Pattern({ p }: { p: NonNullable<Slide['project']> }) {
  const rows: [string, string, string][] = [
    ['Question', p.problem, ''],
    ['Approach', p.built, ''],
    ['Evidence', p.evidence, 'is-evidence'],
    ['Limit', p.limit, 'is-limit'],
    ['Carries forward', p.lesson, 'is-lesson'],
  ];
  return (
    <dl className="pattern">
      {rows.map(([k, v, c], i) => (
        <div key={k} className={`pattern-row ${c}`} style={{ '--d': `${0.1 + i * 0.05}s` } as CSSProperties}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** In-slide citations, APA 7 parenthetical: (Khan et al., 2024; Liu & Tian, 2025). */
function Cites({ s }: { s: Slide }) {
  if (!s.refs?.length) return null;
  return (
    <p className="cites">{parenCite(s.refs, s.refsSee)}</p>
  );
}

/** All works cited on the slides, alphabetical by first author. */
const CITED_IDS: readonly string[] = [...new Set(SLIDES.flatMap((sl) => sl.refs ?? []))].sort((x, y) => apaEntry(x).sortKey.localeCompare(apaEntry(y).sortKey));

function Extras({ s }: { s: Slide }) {
  return (
    <>
      <Cites s={s} />
      {s.caveat && <p className="caveat">{s.caveat}</p>}
      {s.links && (
        <p className="links">
          {s.links.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">
              {l.label} →
            </a>
          ))}
        </p>
      )}
    </>
  );
}

const Rule = ({ className = '' }: { className?: string }) => <i className={`rule ${className}`} aria-hidden />;

/** One slide, in one of the compositions. */
function SlideView({ s }: { s: Slide }) {
  const media = s.media ?? [];
  switch (s.layout) {
    case 'title':
      return (
        <div className="slide l-title">
          <Head s={s} big />
          <Rule className="rule--bleed" />
          <div className="body">
            <Lines s={s} from={4} />
          </div>
          <Facts facts={s.facts} className="facts--col" />
          <FitRow media={media} align="center" className="area-media" />
        </div>
      );
    case 'cover':
      return (
        <div className="slide l-cover">
          <Head s={s} big />
          <div className="aside">
            <Lines s={s} />
            <Extras s={s} />
          </div>
          <Rule className="rule--bleed" />
          <FitRow media={media} align="center" className="area-media" />
        </div>
      );
    case 'cantilever':
      return (
        <div className="slide l-cantilever">
          <FitRow media={media} align="end" className="area-media" />
          <Rule className="rule--bleed" />
          <div className="text">
            <Head s={s} />
            <Lines s={s} />
            <Facts facts={s.facts} className="facts--row" />
            <Extras s={s} />
          </div>
        </div>
      );
    case 'statement':
      return (
        <div className="slide l-statement">
          <Head s={s} big />
          <Rule className="rule--bleed" />
          <div className="body">
            <Lines s={s} />
            <Extras s={s} />
          </div>
          <Facts facts={s.facts} className="facts--col" />
        </div>
      );
    case 'band':
      return (
        <div className="slide l-band">
          <Head s={s} />
          <div className="aside">
            <Lines s={s} />
            <Facts facts={s.facts} className="facts--row" />
            <Extras s={s} />
          </div>
          <Rule className="rule--bleed" />
          <FitRow media={media} align="start" className="area-media" />
        </div>
      );
    case 'gallery':
      return (
        <div className="slide l-gallery">
          <FitRow media={media} align="end" className="area-media" />
          <Rule className="rule--bleed" />
          <Head s={s} />
          <div className="aside">
            <Lines s={s} />
            <Extras s={s} />
          </div>
          <Facts facts={s.facts} className="facts--col" />
        </div>
      );
    case 'figure':
    case 'figure-left':
      return (
        <div className={`slide l-figure ${s.layout === 'figure-left' ? 'l-figure--flip' : ''}`}>
          <FitRow media={media} align={s.layout === 'figure-left' ? 'start' : 'end'} className="area-media" />
          <div className="text">
            <Head s={s} />
            <Lines s={s} />
            <Facts facts={s.facts} className="facts--grid" />
            <Extras s={s} />
          </div>
        </div>
      );
    case 'columns':
      return (
        <div className="slide l-columns">
          <Head s={s} />
          <div className="aside">
            <Lines s={s} />
          </div>
          <Rule className="rule--bleed" />
          <div className="cols" style={{ gridTemplateColumns: `repeat(${s.columns?.length ?? 3}, minmax(0, 1fr))` }}>
            {s.columns?.map((c, i) => (
              <section key={c.head} className="col" style={{ '--d': `${0.1 + i * 0.06}s` } as CSSProperties}>
                <p className="col-head">{c.head}</p>
                <h2>{c.title}</h2>
                <p>{c.text}</p>
                {c.media && <FitRow media={[c.media]} align="start" className="col-media" />}
              </section>
            ))}
          </div>
        </div>
      );
    case 'references':
      return (
        <div className="slide l-references">
          <div className="text">
            <Head s={s} />
          </div>
          <ol className="refs">
            {CITED_IDS.map((id) => {
              const e = apaEntry(id);
              return (
                <li key={id}>
                  {e.authors} ({e.year}). {e.title}. <em>{e.venue}</em>.{' '}
                  {e.link && (
                    <a href={e.link} target="_blank" rel="noopener noreferrer">
                      {e.link.includes('doi.org') ? e.link.replace(/^https?:\/\//, '') : new URL(e.link).hostname}
                    </a>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      );
    case 'questions':
      return (
        <div className="slide l-questions">
          <div className="text">
            <Head s={s} big />
            <Lines s={s} />
            <Extras s={s} />
          </div>
          <FitRow media={media} align="start" className="area-media" />
          {!!s.questions?.length && (
          <ol className="qs">
            {s.questions.map((q, i) => (
              <li key={q} style={{ '--d': `${0.1 + i * 0.05}s` } as CSSProperties}>
                <span className="q-n">{i + 1}</span>
                <span className="q-t">{q}</span>
              </li>
            ))}
          </ol>
          )}
        </div>
      );
  }
}

/** The whole talk: top bar, the current slide with its transitions, chapter navigation. */
export function Deck() {
  const stepIndex = useAppState((s) => s.stepIndex);
  const drawerOpen = useAppState((s) => s.drawerOpen);
  const idx = Math.min(Math.max(stepIndex, 0), SLIDES.length - 1);
  const slide = SLIDES[idx]!;

  const [view, setView] = useState<{ cur: number; prev: number | null; dir: 1 | -1 }>({ cur: idx, prev: null, dir: 1 });
  useEffect(() => {
    if (idx === view.cur) return;
    setView({ cur: idx, prev: view.cur, dir: idx > view.cur ? 1 : -1 });
    const t = window.setTimeout(() => setView((v) => ({ ...v, prev: null })), 520);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  // Preload the neighbouring steps' images now, and every other image once the
  // deck is idle, so the talk keeps working if the network drops mid-interview.
  useEffect(() => {
    for (const k of [idx - 1, idx + 1]) for (const m of SLIDES[k]?.media ?? []) if (m.src) preload(m.src);
  }, [idx]);
  useEffect(() => {
    const t = window.setTimeout(() => SLIDES.forEach((sl) => sl.media?.forEach((m) => m.src && preload(m.src))), 2500);
    return () => window.clearTimeout(t);
  }, []);

  const prev = view.prev !== null ? SLIDES[view.prev] : undefined;
  const chapterChanged = !!prev && prev.chapter !== slide.chapter;
  const chapterIndex = CHAPTERS.findIndex((c) => c.name === slide.chapter);

  return (
    <main className="deck" aria-live="polite" data-dir={view.dir}>
      <header className="deck-top">
        <span className="brand">Roman Jahandideh</span>
        <nav className="top-nav">
          <button aria-pressed={drawerOpen} onClick={() => setState({ drawerOpen: !drawerOpen })}>
            Sources
          </button>
        </nav>
      </header>

      <div className="stage">
        {[prev, slide].map((s) =>
          s ? (
            <div className={`slide-wrap ${s === slide ? 'is-entering' : 'is-leaving'}`} key={s.id} aria-hidden={s !== slide}>
              <SlideView s={s} />
            </div>
          ) : null,
        )}
        {chapterChanged && (
          <div className="curtain" key={`c-${slide.id}`} aria-hidden>
            <span className="curtain-label">{slide.chapter}</span>
          </div>
        )}
      </div>

      <footer className="deck-foot" role="navigation" aria-label="Chapters">
        {CHAPTERS.map((c, ci) => {
          const done = idx >= c.first + c.count;
          const active = ci === chapterIndex;
          const fill = active ? (idx - c.first + 1) / c.count : done ? 1 : 0;
          return (
            <button key={c.name} className={`chap ${active ? 'is-active' : ''}`} style={{ flex: `${c.count} 1 0` }} onClick={() => goToStep(c.first)}>
              <span className="chap-bar">
                <i style={{ transform: `scaleX(${fill})` }} />
              </span>
              <span className="chap-name">{c.name}</span>
            </button>
          );
        })}
      </footer>
    </main>
  );
}
