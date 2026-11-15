# Presentation Script

The spoken script per scene — identical to the in-app notes (`N`). Scrolling drives the
drawings; speak each paragraph roughly as its drawing plays. `[OPTIONAL]` passages add depth
when time allows; `[SKIP IF SHORT ON TIME]` passages go first when behind. Timing math:
`docs/TIMING_AUDIT.md`. The app deliberately shows no clock — rehearse with a phone timer.

---

## 01 · From Spatial Design to Accountable Co-Design (≈50 s)

Thank you for meeting with me. I began by designing spaces and studying how people perceive
them. My recent work asks a related question at a different level: when computational and AI
systems participate in spatial design, how can their decisions remain visible, testable, and
open to human revision?

Everything I will show sits on this one map. Left to right is spatial scale; bottom to top is
computational agency. The yellow route is my trajectory through it — and it ends at a proposed
site called performance provenance.

## 02 · Research Trajectory (≈55 s)

My degrees look different, but they build one research profile. At Tabriz I trained as an
architect — the awards here, including the Zangar Museum dissertation prize, taught me to make
and defend a spatial idea before I had a codebase.

At Istanbul Technical University I added landscape systems, and began testing perception inside
virtual environments.

At SFU, in the iViz Lab, I learned to build complete interactive systems and evaluate them with
HCI methods.

The constant question: how does an environment communicate, and how do people interpret and act
on it?

## 03 · Perception and Interactive Environments (≈1:00)

Three systems anchor this district. The published eCAADe study: sixty participants, two hundred
sixty-four pairwise depth judgments each. At high transparency the familiar rules reversed.

The accepted ACM ISS paper renders a teammate's heart rate and variability as one label-free
halo — readable above chance, support three point nine seconds faster, while numbers stayed
more trusted. BioTerrarium runs the loop the other way: the wearable drives the environment in
under two hundred milliseconds; its manuscript is under revision, so the analysis stays
provisional.

These projects taught me to treat an environment as a responsive system. The four that follow
transfer that thinking to computational urban design.

## 04 · Zoning Literacy Assistant — MAX 1:15 · core ≈95 words

My first project is about trustworthy regulatory knowledge. A general-purpose language model
will happily give a confident answer even when the information is not there. So I separated the
system into retrieval, synthesis, and independent verification: it finds the relevant clauses,
answers only from those clauses, then checks whether the evidence supports the answer — or
whether a clause was missed.

When the source does not contain enough information, it stops instead of guessing: "Not covered
by the provided source." Refusing an unsupported answer is designed behaviour, not a failure.

[OPTIONAL] A second mode computes site feasibility in deterministic code — same inputs, same
result — and the AI only explains those numbers. [SKIP IF SHORT ON TIME] The prototype uses a
simplified ten-clause R1-1 knowledge base, not the complete Vancouver code.

TRANSITION — Once regulation becomes structured and traceable, the next question is how it
becomes editable spatial geometry.

## 05 · Parametric Massing Generator — MAX 1:35 · core ≈130 words

The Massing Generator moves from regulatory language to spatial form. AI extracts eight
structured constraints and keeps the supporting phrase and a confidence level for every value,
and a separate reviewer checks the interpretation. Then deterministic code takes over: it
offsets the parcel, applies the setbacks, computes footprint and floor area, and generates the
massing.

It is procedural because it follows a defined sequence, parametric because changing one value
updates the dependent geometry — parametric design stores relationships, not just a final shape
— and generative because it can produce alternatives. Watch the rental condition: the
floor-space ratio moves from zero point seven to one point zero, and the envelope gains a
storey.

[OPTIONAL] The same clipping method scales from rectangular lots to irregular parcels and
AI-classified urban blocks. My real interest is not automatic form generation — it is keeping
source, parameter, geometry, and revision connected.

TRANSITION — A regulation-compliant envelope still does not tell us whether the geometry
performs well, or what simplifying a constraint costs.

## 06 · Vancouver View Corridor Massing — MAX 1:35 · core ≈105 words

The View Corridor project moves from generation to evidence. Vancouver's protected views create
sloped, three-dimensional ceilings — not flat height limits. I compared the conservative
flat-cap shortcut with precise floor-by-floor clipping: ten floors and eighteen thousand three
hundred sixty square metres against eighteen floors and twenty-five thousand six hundred eight —
a thirty-nine point five percent recovery, from precision alone.

This is performance-informed design in the simplest sense: geometry proposes an alternative, and
evaluation provides evidence about its consequences — no AI is needed for the core calculation.

[OPTIONAL] A rotation study showed total area holds within two hundredths of a percent while the
floor configuration reshuffles — so orientation could serve silhouette or program instead of
yield. [SKIP IF SHORT ON TIME] The honest flags: real corridor plan geometry and verified
clipping, but placeholder elevation values and an unexecuted Rhino-dependent step.

TRANSITION — The final project extends this evidence-based approach to several competing
objectives, where no single design wins everywhere.

## 07 · Environmental Massing Agents — MAX 2:15 · core ≈150 words

Environmental Massing Agents extends the workflow into multi-objective exploration. A Generator
proposes design parameters; four Critics examine the solar, carbon, wind, and yield results; an
Orchestrator directs the next iteration. The crucial rule: the agents never calculate the
scores. Deterministic evaluators provide the evidence; the agents interpret it and suggest
directions.

Three terms, briefly: generative design produces alternatives from encoded rules; optimization
searches among them against defined objectives; and a Pareto-optimal design simply cannot
improve one objective without worsening another — a trade-off, not an automatically perfect
answer.

I compared NSGA-II with random sampling: five seeds each, an equal two-hundred-evaluation
budget, against an exhaustive reference grid. My hypothesis predicted faster directed search —
it was not supported. What the experiment showed instead was reliability: four of five runs
reached the threshold, against one of five. Reporting that distinction matters — it separates
what I expected from what the results support.

[OPTIONAL] Timber weakly dominated in all two hundred matched comparisons; the floor formula
held within one floor; the remaining wind–yield trade-off is a clean line. [SKIP IF SHORT ON
TIME] Limitations live in the evidence drawer: simplified solar, benchmark carbon, heuristic
wind, placeholder corridor values, no live unscripted LLM run.

## 08 · Synthesis — MAX 0:20 · ≈60 words, read briskly

Together, these projects form one developing research direction. The Zoning Literacy Assistant
establishes trustworthy regulatory knowledge. The Parametric Massing Generator converts that
knowledge into editable geometry. The View Corridor project evaluates geometry against
measurable evidence. And the Environmental Massing Agents let specialized agents discuss
verified trade-offs — while the final judgment stays with the designer.

## 09 · Proposed Direction: Performance Provenance (≈55 s)

The dotted site is the direction I would like to discuss: performance provenance for human–AI
co-design of urban environments.

As the spine lights up, each link is one thing the record keeps — intent, the applicable rule,
the editable change, the computation, the result, its uncertainty, the AI's interpretation, and
the human decision — demonstrated here with the real corridor revision.

The system grows from my prototypes; the methods are a mixed program of research-through-design,
technical validation, controlled comparison, and qualitative work — deliberately provisional. I
want to shape this with you, not arrive with it closed.

## 10 · Why GenEnv (≈40 s)

The destination territory is drawn with its own boundary because it is not mine. The NSERC
Discovery project runs twenty-twenty-six to twenty-thirty-one; I verified the title, holder, and
term on NSERC's funding-decisions page.

What I bring is the combination this program needs: spatial design plus computational
prototyping plus human-centred evaluation. What I hope to learn is how to grow these prototypes
into a coherent doctoral contribution with Professor Liu and the GenEnv team.

## 11 · Conversation (≈25 s)

I would rather end with questions than conclusions: which part contributes most meaningfully;
whether to grow the infrastructure through an existing GenEnv case or a new focused problem; and
what I should strengthen first.

Thank you — I would really value your thoughts.

## Appendix (untimed)

Backup material: verified links to the papers, repositories, GenEnv, and the program.
