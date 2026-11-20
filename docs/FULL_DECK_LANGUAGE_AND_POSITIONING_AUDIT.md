# Full Deck Language and Positioning Audit

Written 2026-11-19, before editing. It covers the current 19 rendered steps, inspected at
1920×1080 and 1366×768 (screenshots from the last full run; the deck had not changed since).
Tests: A research, not sales · B alignment, not opportunism · C confidence without showing off ·
D provisional direction · E evidence and limits · F human voice.

## Per-step audit

| Step | Current title | Narrative purpose | Tone/positioning problem | Evidence or factual risk | Visual problem | Required action | Replacement wording | Target time |
|---|---|---|---|---|---|---|---|---|
| 1 | From environmental evidence to traceable agentic co-design | Present research identity | Passes A to F | None | Map's background territories small but legible | Keep; map gains a "Making" origin | (unchanged) | 0:30 |
| 2 | A proposal is only useful if a designer can check it | Question and direction | Passes; "The rest of the talk shows how I arrived there" sets up a biography that then barely appears | None | Lower half empty | Add the route diagram (making → form → systems → evidence → computation → agentic co-design) | "Here is the question I have arrived at, and how my design and research path brought me to it." | 0:40 |
| 3 | Form, then systems, then computation | Condensed trajectory | C: two awards stacked as facts with no learning attached | None | Images fill only the top half | Split into the restored background steps 3 to 9 | (replaced) | — |
| 4 | From an object to an environmental system | Object to system | Fine, but carries both Zangar and Büyükada in one breath | GIS claim kept general | Two boards, readable | Replace with full Zangar and Büyükada steps | (replaced) | — |
| 5 | Measuring spatial perception | eCAADe | "Published" as a kicker headline (C) | Correct | Fine | Move status to the fact field; kicker "Previous research" | Kicker: "From designing space to measuring perception" | 0:40 |
| 6 | Learning to build and study systems | SFU capability | Passes; connect to the preceding story | TA courses unconfirmed | Fine | Add the transition sentence | "At SFU I learned to build and evaluate the system myself." | 0:35 |
| 7 | Representation, trust and agency | ISS and BioTerrarium | C: kicker "Accepted and under revision" as headline; four facts stacked | Correct statuses | Text column dense at 1366 | Status into small facts; headline is the question | Kicker: "Previous research · HCI studies" | 0:45 |
| 8 | AI interprets and proposes. Verified code computes. The designer judges. | Transition to projects | "Four prototypes" (visible and notes) | None | Fine | Reword as exploratory research projects; chapter label RESEARCH PROJECTS | "I began several small research projects to understand different parts of the same problem." | 0:30 |
| 9 | Zoning Literacy Assistant | Project 1 | Kicker "Prototype 1"; "Problem / Built" reads as a product demo | Caveats attached | Fine | Kicker "Project 1"; rows Question, Approach, Evidence, Limit, Carries forward; "I explored whether…" | "Can an assistant answer zoning questions only from cited clauses, and say when the bylaw is silent?" | 0:35 |
| 10 | Parametric Massing Generator | Project 2 | "Prototype 2"; product wording | Caveats attached | Fine | Same pattern | "Can rules extracted by AI stay editable as geometry?" | 0:35 |
| 11 | Vancouver View Corridor Massing | Project 3 | "Prototype 3" | Placeholders attached | Fine | Same pattern | "How much does a flat-cap shortcut misstate a sloped view limit?" | 0:35 |
| 12 | Environmental Massing Agents | Project 4 | "Prototype 4" | "Not faster" in red, kept | Fine | Same pattern | "Do specialised agent roles over verified evaluators make performance search better?" | 0:35 |
| 13 | What exists, and what is missing | Synthesis | "Each prototype covers one link" | None | Fine | "Each project…" | "Each project covers one link of the chain." | 0:40 |
| 14 | Traceable agentic co-design | Provisional direction | Passes D (labelled provisional) | Agent link illustrative, noted | Fine | Keep; one wording tweak ("I would like to investigate") | (minor) | 0:45 |
| 15 | One framework, with adjustable agency | System concept | "This is the framework" sounds settled (D) | Agency grouping attributed | Fine | "One possible architecture" | "One possible architecture, to be shaped with the lab." | 0:45 |
| 16 | From a parcel to a recorded decision | Scenario | Passes | Labelled illustrative | Fine | Fold into step 15 notes to save time | (merged) | — |
| 17 | Questions, methods, contributions | Research plan | Passes; long central question on screen | None | Dense at 1366 | Keep | (unchanged) | 0:50 |
| 18 | Why GenEnv, and where to start | Fit | **Fails A, B, C, D**: recruitment notice as visible motivation; "What I bring"; "four prototypes I built myself"; "published and accepted studies"; fixed "One parcel, two modes, one record" | Recruitment claim is true but wrong as framing | Empty upper field, three equal sales cards | **Replace** (brief section 12): convergence diagram, shared question, starting point, what I hope to develop, small provisional first-study note | Title "Where my path meets GenEnv" | 0:55 |
| 19 | Thank you | Conversation | Passes | None | Fine | Keep three questions | (unchanged) | 0:25 |

## Repository search for risky phrases

| Phrase | Where | Classification | Action |
|---|---|---|---|
| "four prototypes" | steps.ts (step 8 line, notes, step 18), README, script, provenance.ts comment, types.ts comment | rewrite | "research projects" / "exploratory computational-design research projects" |
| "Prototypes" chapter label | steps.ts SECTIONS and chapters, README, timing doc | rewrite | "Research projects" |
| "Prototype 1 to 4" kickers | steps.ts | rewrite | "Project 1 to 4" |
| "prototypes I built myself", "built prototypes", "What I bring" | step 18 | remove | replaced page |
| "recruiting a PhD student to lead its agentic framework" | step 18 line and notes | move to evidence | stays only in `evidence.ts` (`genenv-phd-priority`) and citations, not on any slide |
| "published and accepted studies" | step 18 | remove | |
| "One parcel, two modes, one record", `PILOT` | step 18 column | rewrite | small "A possible first study · for discussion" note |
| "a research prototype, not code-compliance software" | PMG limit, evidence, README | keep | precise status term |
| "a prototype in Unity and C#" | step 6 notes | keep | accurate (working prototype inside a study) |
| "Verified prototype" | legend | rewrite | "Verified implementation" |
| "FOUR PROTOTYPES", "Computational prototypes" | old Site diagram (unused); atlas territory name | rewrite (atlas) | "Research projects" |
| "Prototype" node in capability chain | framework.tsx | keep | it is the step "working prototype" in a study |
| "optimization" | evidence limitation (NSGA-II) | keep | technical term for the search method |
| "recruiting" | citation title for Human-AI Co-Design | keep | the source's own status label, drawer only |
| "autonomous", "perfect fit", "exactly the work", "inspired by GenEnv", "ideal candidate", "fully verified", "complete framework" | none on slides | n/a | |
| "first-year pilot" | README, script | rewrite | "possible first study" |

Not caught by the search, also to fix:
- Step 7 notes "accepted for this month" leads with status. Rewrite around the question.
- Step 18 notes: "GenEnv already connects … and Human-AI Co-Design is recruiting…" sounds as if
  the vacancy is the reason. Removed.
- `GENENV_FIT_MATRIX.md` quotes the recruitment line as the fit for the proposed direction. Keep
  it as a source fact, but reword the row so the fit rests on the shared question.
