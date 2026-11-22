import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../state/store';

/** Progress 0 → 1 played once when the sheet mounts (ease-out cubic). */
export function useT(requested = 2600, requestedDelay = 450): number {
  // Essential content must be readable within about half a second of arrival,
  // including deep links and reloads, so every timeline is capped.
  const duration = Math.min(requested, 850);
  const delay = Math.min(requestedDelay, 80);
  const [t, setT] = useState(() => (prefersReducedMotion() ? 1 : 0));
  useEffect(() => {
    if (prefersReducedMotion()) {
      setT(1);
      return;
    }
    let raf = 0;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const x = Math.min(1, Math.max(0, (now - start) / duration));
      setT(1 - Math.pow(1 - x, 3));
      if (x < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, delay]);
  return t;
}

/** 0 before a, 1 after b, linear between. */
export function win(t: number, a: number, b: number): number {
  return Math.max(0, Math.min(1, (t - a) / (b - a)));
}
