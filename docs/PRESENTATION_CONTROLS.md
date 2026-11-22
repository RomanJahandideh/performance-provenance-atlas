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

## Interactive steps

Number keys act only on the current step and never change the step. The arrow keys still move
between steps. Every control can also be clicked, or reached with Tab and pressed with Enter or
Space without changing the step. Every step shows its essential content within about half a
second, including when it is opened from a link or reloaded. Reduced motion (X) shows the final
state at once.

| Step | Keys | Effect |
|---|---|---|
| 14 Zoning Literacy Assistant | 1 · 2 | answered from a clause · not covered |
| 15 Parametric Massing Generator | 1 · 2 | rental condition off (FSR 0.70, one floor) · on (FSR 1.00, two floors) |
| 18 Overview | 1 · 2 · 3 (0 clears) | show one branch's sentence; Enter or click opens it |
| 19 AI Design Red-Team | 1 · 2 · 3 | problem · proposed system · designer decides |
| 20 Neighbourhood Externality | 1 · 2 · 3 | proposal · conflicts · alternative |
| | 4 to 8 | turn shadow, heat, glare, wind or runoff on or off |
| 21 Living Environment | 1 to 5 | today · 10 years · threshold · intervention · 40 years |
| | 6 · 7 | static design · adaptive pathway |

The presenter window (P) and the notes panel (N) show each step's cue: the recommended time, what
to show and what to skip.
