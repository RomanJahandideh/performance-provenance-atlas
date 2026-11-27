import { getState, setState, closeAllPanels, toggleReducedMotion } from '../state/store';
import { goToStep, nextStep, prevStep } from './stepper';
import { STEPS } from '../data/steps';
import { openPresenter } from './sync';

function toggleFullscreen() {
  if (document.fullscreenElement) void document.exitFullscreen();
  else void document.documentElement.requestFullscreen?.();
}

/** Global keyboard map — docs/PRESENTATION_CONTROLS.md. */
export function handleKey(e: KeyboardEvent): void {
  const target = e.target as HTMLElement | null;
  if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;
  const s = getState();
  switch (e.key) {
    case 'ArrowDown':
    case 'ArrowRight':
    case 'PageDown':
      e.preventDefault();
      nextStep();
      break;
    case ' ':
      e.preventDefault();
      if (e.shiftKey) prevStep();
      else nextStep();
      break;
    case 'ArrowUp':
    case 'ArrowLeft':
    case 'PageUp':
      e.preventDefault();
      prevStep();
      break;
    case 'Home':
      e.preventDefault();
      goToStep(0);
      break;
    case 'End':
      e.preventDefault();
      goToStep(STEPS.length - 1);
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
    case 'p':
    case 'P':
      openPresenter();
      break;
    case 'm':
    case 'M':
      setState({ chapterMapOpen: !s.chapterMapOpen });
      break;
    case 'r':
    case 'R':
      closeAllPanels();
      goToStep(0);
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
  }
}
