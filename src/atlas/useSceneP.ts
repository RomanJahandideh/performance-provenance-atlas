import { useAppState } from '../state/store';
import { SCENES } from '../data/scenes';

/** Scene progress 0..1 while `id` is the active scene, −1 otherwise (and re-renders only then). */
export function useSceneP(id: string): number {
  return useAppState((s) => ((SCENES[s.sceneIndex] ?? SCENES[0]!).id === id ? s.sceneP : -1));
}

/** Window helper: 0 before a, 1 after b, linear between. */
export function win(p: number, a: number, b: number): number {
  return Math.max(0, Math.min(1, (p - a) / (b - a)));
}
