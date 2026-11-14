import { useEffect } from 'react';
import { SCENES } from '../data/scenes';
import { measureSections } from '../lib/scroll';

/** Invisible tall sections: they only give the story its scroll length. */
export function StorySections() {
  useEffect(() => {
    measureSections();
  }, []);
  return (
    <div className="scroll-track" aria-hidden>
      {SCENES.map((s) => (
        <section key={s.id} id={`scene-${s.id}`} style={{ height: `${s.lengthVh}vh` }} />
      ))}
    </div>
  );
}
