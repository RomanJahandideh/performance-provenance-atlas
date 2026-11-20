# Presentation Controls

The talk is **25 steps, one per scroll** (count and timing: `docs/TIMING_AUDIT.md`, generated
from `src/data/steps.ts`). Each step is one composed slide; drawings play once on arrival, in
causal order, and run the same forwards and backwards. Reduced motion shows the final state at
once with the same information.

| Input | Action |
|---|---|
| one wheel gesture, swipe or key press | one step |
| down, right, Space, PageDown | next step |
| up, left, Shift+Space, PageUp | previous step |
| Home / End | first / last step |
| bottom bar | sections; click one to jump |
| `#step-N` in the URL | open at step N |
| F | full screen |
| P | presenter window (notes, next step, target times); share only the deck window |
| N | speaker notes on the deck screen (avoid while sharing) |
| S or C | sources and evidence for this step |
| L | legend: colours and line styles |
| M | list of all steps |
| R | restart |
| X | reduced motion |
| Esc | close any panel |

In the presenter window: arrow keys move the deck; T restarts the clock. The clock starts on the
first step change after the window opens.
