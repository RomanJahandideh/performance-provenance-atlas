import { useEffect, useRef } from 'react';
import { SCENES } from '../data/scenes';
import { sceneInView, useAppState } from '../state/store';
import {
  AppendixPanel,
  ConversationPanel,
  EMAPanel,
  FoundationPanel,
  GenEnvPanel,
  OpeningPanel,
  PhDPanel,
  PMGPanel,
  SynthesisPanel,
  TrajectoryPanel,
  VCMPanel,
  ZLAPanel,
} from '../ui/panels';

const SIDE: Record<string, 'left' | 'right' | 'center' | 'bottom'> = {
  opening: 'center',
  trajectory: 'right',
  foundation: 'right',
  pmg: 'bottom',
  zla: 'bottom',
  vcm: 'bottom',
  ema: 'bottom',
  synthesis: 'bottom',
  phd: 'bottom',
  genenv: 'left',
  conversation: 'center',
  'appendix-links': 'center',
};

const PANEL: Record<string, (p: { scene: (typeof SCENES)[number]; step: number }) => JSX.Element> = {
  opening: OpeningPanel,
  trajectory: TrajectoryPanel,
  foundation: FoundationPanel,
  pmg: PMGPanel,
  zla: ZLAPanel,
  vcm: VCMPanel,
  ema: EMAPanel,
  synthesis: SynthesisPanel,
  phd: PhDPanel,
  genenv: GenEnvPanel,
  conversation: ConversationPanel,
  'appendix-links': AppendixPanel,
};

export function SceneSections() {
  const mode = useAppState((s) => s.mode);
  const sceneIndex = useAppState((s) => s.sceneIndex);
  const stepIndex = useAppState((s) => s.stepIndex);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode !== 'present') return;
    const sections = Array.from(trackRef.current?.querySelectorAll('[data-scene-index]') ?? []);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.sceneIndex);
            sceneInView(idx);
          }
        }
      },
      { threshold: 0.5 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [mode]);

  if (mode !== 'present') return null;

  return (
    <div className="scroll-track" ref={trackRef}>
      {SCENES.map((scene, i) => {
        const Panel = PANEL[scene.id] ?? OpeningPanel;
        const active = i === sceneIndex;
        return (
          <section
            key={scene.id}
            id={`scene-${scene.id}`}
            data-scene-index={i}
            data-side={SIDE[scene.id] ?? 'left'}
            className="scene-section"
            aria-label={`${scene.chapter} — ${scene.title}`}
          >
            <Panel scene={scene} step={active ? stepIndex : 0} />
          </section>
        );
      })}
    </div>
  );
}
