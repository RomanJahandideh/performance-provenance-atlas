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

## Future-research steps (19 to 22)

Number keys act only on the current step and never move between steps. Arrow keys still move
between steps. Every control can also be clicked, or reached with Tab and pressed with Enter or
Space without changing the step. Each view plays a short reveal on arrival and settles on a
complete state; with reduced motion (X) it shows that state at once.

| Step | Keys | Effect |
|---|---|---|
| 19 Overview | 1 · 2 · 3 (0 clears) | highlight a branch; hover or Tab does the same; Enter or click opens it |
| 20 AI Design Red-Team | 1 · 2 · 3 | original design · verified failure · proposed repair |
| | 4 to 7 | stress scenario: heatwave and event · drought · cooling failure · winter wind |
| 21 Neighbourhood Externality | 1 · 2 · 3 | tall tower · low wide block · negotiated compromise |
| | 4 to 8 | toggle shadow · heat · glare · wind · runoff layers |
| 22 Living Environment | 1 to 5 | today · 10 years · threshold · intervention · 40 years |
| | 6 · 7 | static design · adaptive pathway |

Suggested live sequence: 20 press 1, 2, 3; 21 press 1, 2, 3; 22 press 6 then 3, then 7 and 5.
