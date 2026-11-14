import {
  advance,
  retreat,
  goToScene,
  getState,
  setState,
  toggleMode,
  toggleTimer,
  resetPresentation,
  closeAllPanels,
  toggleReducedMotion,
} from '../state/store';
import { SCENES, MAIN_SCENES } from '../data/scenes';

function toggleFullscreen() {
  if (document.fullscreenElement) void document.exitFullscreen();
  else void document.documentElement.requestFullscreen?.();
}

/** Global keyboard map — documented in docs/PRESENTATION_CONTROLS.md. */
export function handleKey(e: KeyboardEvent): void {
  const target = e.target as HTMLElement | null;
  if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;

  const s = getState();
  switch (e.key) {
    case 'ArrowDown':
    case 'ArrowRight':
      e.preventDefault();
      advance();
      break;
    case ' ':
      e.preventDefault();
      if (e.shiftKey) retreat();
      else advance();
      break;
    case 'ArrowUp':
    case 'ArrowLeft':
      e.preventDefault();
      retreat();
      break;
    case 'PageDown':
      e.preventDefault();
      goToScene(s.sceneIndex + 1);
      break;
    case 'PageUp':
      e.preventDefault();
      goToScene(s.sceneIndex - 1);
      break;
    case 'Home':
      e.preventDefault();
      goToScene(0);
      break;
    case 'End':
      e.preventDefault();
      goToScene(MAIN_SCENES.length - 1);
      break;
    case 'f':
    case 'F':
      toggleFullscreen();
      break;
    case 'n':
    case 'N':
      setState({ notesOpen: !s.notesOpen });
      break;
    case 's':
    case 'S':
    case 'c':
    case 'C':
      setState({ drawerOpen: !s.drawerOpen });
      break;
    case 'l':
    case 'L':
      setState({ legendOpen: !s.legendOpen });
      break;
    case 'm':
    case 'M':
      setState({ chapterMapOpen: !s.chapterMapOpen });
      break;
    case 'd':
    case 'D':
    case 'e':
    case 'E':
      toggleMode();
      break;
    case 't':
    case 'T':
      toggleTimer();
      break;
    case 'r':
    case 'R':
      resetPresentation();
      break;
    case 'x':
    case 'X':
      toggleReducedMotion();
      break;
    case '?':
      setState({ helpOpen: !s.helpOpen });
      break;
    case 'Escape':
      closeAllPanels();
      break;
    default: {
      // 1–9 → scenes 1–9; 0 → scene 10 (Why GenEnv).
      if (/^[0-9]$/.test(e.key)) {
        const n = e.key === '0' ? 10 : Number(e.key);
        if (n - 1 < SCENES.length) goToScene(n - 1);
      }
    }
  }
}
