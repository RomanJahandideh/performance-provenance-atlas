import { useEffect } from 'react';
import { Sheet } from './sheets/Sheet';
import { ChapterMap, HelpOverlay, NotesDock, SourceDrawer } from './ui/overlays';
import { handleKey } from './lib/keys';
import { startStepper, stopStepper } from './lib/stepper';
import { prefersReducedMotion, subscribe } from './state/store';
import { SHEETS } from './data/steps';

/** Preload every image once so sheets never pop in during the talk. */
function Preload() {
  const srcs = Array.from(new Set(SHEETS.flatMap((s) => s.panels.flatMap((p) => (p.src ? [p.src] : [])))));
  return (
    <div aria-hidden style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
      {srcs.map((s) => (
        <img key={s} src={s} alt="" />
      ))}
    </div>
  );
}

export default function App() {
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
      <Sheet />
      <NotesDock />
      <SourceDrawer />
      <ChapterMap />
      <HelpOverlay />
      <Preload />
    </>
  );
}
