import { useEffect } from 'react';
import { AtlasMap } from './atlas/AtlasMap';
import { StorySections } from './scenes/StorySections';
import { StoryLayer } from './ui/StoryLayer';
import { TopHUD, ProgressRail } from './ui/hud';
import { ChapterMap, HelpOverlay, LegendPanel, NotesDock, SourceDrawer } from './ui/overlays';
import { handleKey } from './lib/keys';
import { measureSections, scrollToScene, startScrollEngine, stopScrollEngine } from './lib/scroll';
import { getState, prefersReducedMotion, subscribe } from './state/store';
import { SCENES } from './data/scenes';

export default function App() {
  // Global keyboard controls.
  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // The scroll engine drives scene, progress, and camera.
  useEffect(() => {
    measureSections();
    startScrollEngine();
    return stopScrollEngine;
  }, []);

  // Reflect reduced motion on <html>.
  useEffect(() => {
    const apply = () => document.documentElement.setAttribute('data-reduced', String(prefersReducedMotion()));
    apply();
    return subscribe(apply);
  }, []);

  // URL hashes: #scene-<id> deep-links; the hash follows the active scene.
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.replace(/^#scene-/, '');
      const idx = SCENES.findIndex((s) => s.id === id);
      if (idx >= 0 && idx !== getState().sceneIndex) scrollToScene(idx);
    };
    const t = window.setTimeout(fromHash, 80);
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

  return (
    <>
      <AtlasMap />
      <StorySections />
      <StoryLayer />
      <TopHUD />
      <ProgressRail />
      <NotesDock />
      <SourceDrawer />
      <LegendPanel />
      <ChapterMap />
      <HelpOverlay />
    </>
  );
}
