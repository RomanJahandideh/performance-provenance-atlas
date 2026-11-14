import { SCENES } from '../data/scenes';
import type { StoryBlock } from '../data/types';
import { useAppState } from '../state/store';

const COLOR: Record<string, string> = {
  yellow: 'var(--yellow)',
  cyan: 'var(--cyan)',
  orange: 'var(--orange)',
  coral: 'var(--coral)',
  red: 'var(--red)',
  ink: 'var(--ink)',
};

/** Visibility 0..1 for a block at scene progress p, with soft fade edges. */
function vis(b: StoryBlock, p: number): number {
  const fade = 0.045;
  if (p < b.p0 || p > b.p1) return 0;
  const inE = Math.min(1, (p - b.p0) / fade);
  const outE = Math.min(1, (b.p1 - p) / fade);
  return Math.min(inE, outE);
}

/**
 * The story layer: large, unboxed typography that the scroll fades through.
 * No internal scrolling, no clicks required — links are optional footnotes.
 */
export function StoryLayer() {
  const sceneIndex = useAppState((s) => s.sceneIndex);
  const p = useAppState((s) => s.sceneP);
  const scene = SCENES[sceneIndex] ?? SCENES[0]!;

  return (
    <div className="story-layer" aria-live="polite">
      {scene.blocks.map((b) => {
        const v = vis(b, p);
        if (v <= 0.01) return null;
        return (
          <div
            key={b.id}
            className={`story-block story-block--${b.side}`}
            style={{ opacity: v, transform: b.side === 'bottom' ? undefined : `translateY(${(1 - v) * 14}px)` }}
          >
            {b.kicker && <p className="story-kicker">{b.kicker}</p>}
            {b.title && <h2 className="story-title">{b.title}</h2>}
            {b.image && (
              <figure className="story-figure">
                <img src={b.image.src} alt={b.image.alt} />
                {b.image.credit && <figcaption>{b.image.credit}</figcaption>}
              </figure>
            )}
            {b.lines?.map((l, i) => (
              <p key={i} className="story-line">
                {l}
              </p>
            ))}
            {b.stats && (
              <div className="story-stats">
                {b.stats.map((s) => (
                  <div key={s.label} className="story-stat">
                    <span className="story-stat-value" style={{ color: COLOR[s.color ?? 'ink'] }}>
                      {s.value}
                    </span>
                    <span className="story-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            )}
            {b.caveat && <p className="story-caveat">▨ {b.caveat}</p>}
            {b.links && (
              <p className="story-links">
                {b.links.map((l) => (
                  <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">
                    {l.label} ↗
                  </a>
                ))}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
