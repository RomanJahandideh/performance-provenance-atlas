import { useEffect } from 'react';
import { AtlasMap } from './atlas/AtlasMap';
import { SceneSections } from './scenes/SceneSections';
import { TopHUD, ProgressRail } from './ui/hud';
import { AwardSheet, ChapterMap, ExploreBar, HelpOverlay, LegendPanel, MiniMap, NotesDock, ProjectSheet, SourceDrawer } from './ui/overlays';
import { handleKey } from './lib/keys';
import { getState, goToScene, prefersReducedMotion, subscribe, useAppState } from './state/store';
import { SCENES } from './data/scenes';

export default function App() {
  const mode = useAppState((s) => s.mode);

  // Global keyboard controls.
  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // URL hashes: #scene-<id> deep-links a scene; the hash follows navigation.
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.replace(/^#scene-/, '');
      const idx = SCENES.findIndex((s) => s.id === id);
      if (idx >= 0 && idx !== getState().sceneIndex) goToScene(idx);
    };
    // After first paint the sections exist, so the initial hash can resolve.
    const t = window.setTimeout(fromHash, 60);
    window.addEventListener('hashchange', fromHash);
    const off = subscribe(() => {
      const s = SCENES[getState().sceneIndex];
      if (s && window.location.hash !== `#scene-${s.id}`) {
        window.history.replaceState(null, '', `#scene-${s.id}`);
      }
    });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('hashchange', fromHash);
      off();
    };
  }, []);

  // Reflect reduced motion on <html> so CSS can flatten every transition.
  useEffect(() => {
    const apply = () => document.documentElement.setAttribute('data-reduced', String(prefersReducedMotion()));
    apply();
    return subscribe(apply);
  }, []);

  return (
    <>
      <AtlasMap />
      <SceneSections />
      {mode === 'explore' && (
        <main style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }} aria-label="Explore mode — the map is interactive" />
      )}
      <TopHUD />
      <ProgressRail />
      <MiniMap />
      <ExploreBar />
      <NotesDock />
      <SourceDrawer />
      <LegendPanel />
      <ChapterMap />
      <HelpOverlay />
      <ProjectSheet />
      <AwardSheet />
    </>
  );
}
