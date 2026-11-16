import { STEPS } from '../data/steps';
import type { Step } from '../data/types';
import { useAppState } from '../state/store';

const COLOR: Record<string, string> = {
  yellow: 'var(--yellow)',
  cyan: 'var(--cyan)',
  orange: 'var(--orange)',
  coral: 'var(--coral)',
  red: 'var(--red)',
  ink: 'var(--ink)',
};

function Text({ step }: { step: Step }) {
  return (
    <>
      {step.kicker && <p className="st-kicker">{step.kicker}</p>}
      {step.title && <h2 className="st-title">{step.title}</h2>}
      {step.lines?.map((l, i) => (
        <p key={i} className="st-line">
          {l}
        </p>
      ))}
      {step.stats && (
        <div className="st-stats">
          {step.stats.map((s) => (
            <div key={s.label} className="st-stat">
              <span className="st-stat-value" style={{ color: COLOR[s.color ?? 'ink'] }}>
                {s.value}
              </span>
              <span className="st-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      )}
      {step.caveat && <p className="st-caveat">{step.caveat}</p>}
      {step.links && (
        <p className="st-links">
          {step.links.map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">
              {l.label} ↗
            </a>
          ))}
        </p>
      )}
    </>
  );
}

/** Current step on top of the atlas. Keyed by step so every arrival fades in fresh. */
export function StepLayer() {
  const stepIndex = useAppState((s) => s.stepIndex);
  const step = STEPS[stepIndex] ?? STEPS[0]!;

  if (step.kind === 'images') {
    return (
      <div className="photo-stage" key={step.id} aria-live="polite">
        <div className={`photo-grid photo-grid--${step.layout ?? 'single'}`}>
          {step.images?.map((im) => (
            <figure key={im.src} className={`photo-cell photo-cell--${im.fit ?? 'cover'}`}>
              <img src={im.src} alt={im.alt} />
              {im.caption && <figcaption>{im.caption}</figcaption>}
            </figure>
          ))}
        </div>
        <div className="photo-text">
          <Text step={step} />
        </div>
      </div>
    );
  }

  return (
    <div className={`map-text map-text--${step.textAt ?? 'bottom'}`} key={step.id} aria-live="polite">
      <div className="map-text-inner">
        <Text step={step} />
      </div>
    </div>
  );
}

/** Preload every step image once, so steps never pop in during the talk. */
export function Preload() {
  const srcs = Array.from(new Set(STEPS.flatMap((s) => s.images?.map((i) => i.src) ?? [])));
  return (
    <div aria-hidden style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
      {srcs.map((s) => (
        <img key={s} src={s} alt="" />
      ))}
    </div>
  );
}
