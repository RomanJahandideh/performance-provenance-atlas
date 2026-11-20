/**
 * Keeps the presenter window (P) and the audience deck on the same step.
 * BroadcastChannel where available; a localStorage event as the fallback
 * (file:// pages in some browsers have no shared BroadcastChannel origin).
 * Each message carries an id so a copy arriving by both routes counts once.
 */
type Msg = { type: 'step'; index: number } | { type: 'go'; index: number } | { type: 'hello' };
type Envelope = { m: Msg; id: string };

const KEY = 'ppa-sync';
const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel(KEY) : null;
const listeners = new Set<(m: Msg) => void>();
const seen: string[] = [];

function deliver(e: Envelope | undefined) {
  if (!e?.m || !e.id || seen.includes(e.id)) return;
  seen.push(e.id);
  if (seen.length > 50) seen.shift();
  for (const l of listeners) l(e.m);
}

channel?.addEventListener('message', (e: MessageEvent<Envelope>) => deliver(e.data));
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key !== KEY || !e.newValue) return;
    try {
      deliver(JSON.parse(e.newValue) as Envelope);
    } catch {
      /* ignore malformed */
    }
  });
}

export function send(m: Msg) {
  const env: Envelope = { m, id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}` };
  seen.push(env.id); // never handle our own message
  channel?.postMessage(env);
  try {
    localStorage.setItem(KEY, JSON.stringify(env));
  } catch {
    /* storage unavailable: BroadcastChannel alone */
  }
}

export function onSync(fn: (m: Msg) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export const isPresenter = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('presenter');

export function openPresenter() {
  const url = `${window.location.pathname}?presenter`;
  window.open(url, 'ppa-presenter', 'width=980,height=760');
}
