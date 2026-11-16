import { useEffect } from 'react';
import { AtlasMap } from './atlas/AtlasMap';
import { StepLayer, Preload } from './ui/StepLayer';
import { TopHUD, ProgressRail } from './ui/hud';
import { ChapterMap, HelpOverlay, LegendPanel, NotesDock, SourceDrawer } from './ui/overlays';
import { handleKey } from './lib/keys';
import { startStepper, stopStepper } from './lib/stepper';
import { prefersReducedMotion, subscribe } from './state/store';

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
      <AtlasMap />
      <StepLayer />
      <TopHUD />
      <ProgressRail />
      <NotesDock />
      <SourceDrawer />
      <LegendPanel />
      <ChapterMap />
      <HelpOverlay />
      <Preload />
    </>
  );
}
