import { getState, setState, closeAllPanels, toggleReducedMotion } from '../state/store';
import { scrollStep, scrollToScene } from './scroll';
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
      scrollStep(1);
      break;
    case ' ':
      e.preventDefault();
      scrollStep(e.shiftKey ? -1 : 1);
      break;
    case 'ArrowUp':
    case 'ArrowLeft':
      e.preventDefault();
      scrollStep(-1);
      break;
    case 'PageDown':
      e.preventDefault();
      scrollToScene(Math.min(SCENES.length - 1, s.sceneIndex + 1));
      break;
    case 'PageUp':
      e.preventDefault();
      scrollToScene(Math.max(0, s.sceneIndex - 1));
      break;
    case 'Home':
      e.preventDefault();
      scrollToScene(0);
      break;
    case 'End':
      e.preventDefault();
      scrollToScene(MAIN_SCENES.length - 1);
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
    case 'r':
    case 'R':
      closeAllPanels();
      scrollToScene(0, 0);
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
      if (/^[0-9]$/.test(e.key)) {
        const n = e.key === '0' ? 10 : Number(e.key);
        if (n - 1 < SCENES.length) scrollToScene(n - 1);
      }
    }
  }
}
