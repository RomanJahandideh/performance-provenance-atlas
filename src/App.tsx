import { useEffect } from 'react';
import { Deck } from './slides/Deck';
import { ChapterMap, HelpOverlay, Legend, NotesDock, SourceDrawer } from './ui/overlays';
import { SystemFigureOverlay } from './ui/systemFigure';
import { PresenterView } from './ui/presenter';
import { isPresenter } from './lib/sync';
import { handleKey } from './lib/keys';
import { startStepper, stopStepper } from './lib/stepper';
import { prefersReducedMotion, subscribe } from './state/store';
import { SLIDES } from './data/steps';

/** Preload every image once so slides never pop in during the talk. */
function Preload() {
  const srcs = Array.from(new Set(SLIDES.flatMap((s) => (s.media ?? []).flatMap((m) => (m.src ? [m.src] : [])))));
  return (
    <div aria-hidden style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
      {srcs.map((s) => (
        <img key={s} src={s} alt="" />
      ))}
    </div>
  );
}

export default function App() {
  return isPresenter ? <PresenterView /> : <Audience />;
}

function Audience() {
  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    startStepper();
    return () => {
      window.removeEventListener('keydown', handleKey);
      stopStepper();
    };
  }, []);

  useEffect(() => {
    const apply = () => document.documentElement.setAttribute('data-reduced', String(prefersReducedMotion()));
    apply();
    return subscribe(apply);
  }, []);

  return (
    <>
      <Deck />
      <NotesDock />
      <SourceDrawer />
      <ChapterMap />
      <HelpOverlay />
      <Legend />
      <SystemFigureOverlay />
      <Preload />
    </>
  );
}
