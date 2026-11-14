# Presentation Script

Spoken script per scene (same text as the in-app notes, `N`). Targets total **17:30** inside the
20-minute slot, leaving margin for transitions and interruptions. Timings were tightened from the
original deck notes (which summed to ~20:35) — pacing is Roman's to adjust in
`src/data/scenes.ts`.

Cumulative targets appear in the HUD; the drift readout tells you ahead/behind live.

---

## 01 · From Spatial Design to Accountable Co-Design — 1:00 (cum. 1:00)

Thank you for meeting with me. I began by designing spaces and studying how people perceive
them. My recent work asks a related question at a different level: when computational and AI
systems participate in spatial design, how can their decisions remain visible, testable, and
open to human revision?

Everything I will show sits on this one map. Left to right is spatial scale, from a single bylaw
clause to a district. Bottom to top is computational agency, from deterministic calculation to
multi-agent negotiation. The yellow route is my trajectory through it — and it ends at a
proposed site called performance provenance.

## 02 · Research Trajectory — 2:00 (cum. 3:00)

My degrees look different, but they build one research profile. At Tabriz I trained as an
architect — spatial composition, public life, and visual communication. The awards here,
including the Zangar Museum dissertation prize and a photography award, taught me to make and
defend a spatial idea before I had a codebase.

At Istanbul Technical University I added landscape systems — and began testing perception inside
virtual environments, in Unreal, with head-mounted displays.

At SFU, in the iViz Lab, I learned to build complete interactive systems — Unity, C#,
physiological sensing, multiplayer networking — and to evaluate them with HCI methods.

The constant question across all three: how does an environment communicate, and how do people
interpret and act on it?

## 03 · Perception and Interactive Environments — 1:30 (cum. 4:30)

Three systems anchor this district. The published eCAADe study: sixty participants, two hundred
sixty-four pairwise depth judgments each, across transparency, hue, and luminance in VR. At high
transparency the familiar rules reversed — cool and dark colours read as nearer. Visual rules
for opaque graphics do not simply transfer.

The accepted ACM ISS paper renders a remote teammate's heart rate and heart-rate variability as
one label-free halo. Readable above chance; in live three-player teams it brought support three
point nine seconds faster than no cue. But the numeric display stayed more trusted — a measured
trade-off, not a win for ambience. BioTerrarium runs that loop in the other direction: the
wearable drives fog, light, and vegetation in under two hundred milliseconds. Its manuscript is
under revision, so I treat the analysis as provisional.

These projects taught me to treat an environment as a responsive system. The four projects that
follow transfer that thinking from immersive environments to computational urban design.

## 04 · Parametric Massing Generator — 2:00 (cum. 6:30)

First of the four computational projects. The massing generator reads bylaw-style text and
returns eight structured constraints — setbacks, height, floor-to-floor, floor-area ratio — each
carrying the exact phrase it came from and a confidence level.

The geometry is deterministic: half-plane clipping computes the buildable footprint, and the
same tested method handles rectangles, irregular parcels, and an urban block whose parcels the
AI classifies by use. The Vancouver R1-1 preset keeps the conditional rule explicit — the
floor-space ratio moves from zero point seven to one point zero under the rental condition.

A second, separate model call reviews the result against the original text, and every revision
stays in a visible history. The division of responsibility is the point: deterministic code
computes the form; AI extracts, critiques, and explains the evidence behind it. This is a
research prototype, not compliance advice.

## 05 · Zoning Literacy Assistant — 1:30 (cum. 8:00)

The zoning assistant is for people who do not speak planning language. Every question passes
through three separate model calls: retrieval selects clauses, synthesis sees only the retrieved
text, and a verification pass checks the answer against its own evidence.

The deliberate failure case matters most. The bylaw excerpt permits a laneway house but never
states its storey limit — so the correct behaviour is to stop and say "not covered", and the
system does. Restraint becomes observable rather than claimed.

Site arithmetic never touches the model. For a ten-by-thirty-seven-metre lot, code computes a
one-sixty-two-point-six square-metre footprint, and toggling the rental condition moves the
floor-space ratio from zero point seven to one point zero — one floor to two. The model only
explains numbers the code already produced.

## 06 · Vancouver View Corridor Massing — 2:00 (cum. 10:00)

A protected view corridor is not a flat height limit — it is a ceiling that rises with distance
from the viewpoint. I modelled Creekside Park view J-one from the City's open data and asked
what precision is worth.

The conservative shortcut caps the whole site at the lowest corridor elevation: ten floors,
eighteen thousand three hundred sixty square metres. Trimming floor by floor against the rising
ceiling: eighteen floors, twenty-five thousand six hundred eight — thirty-nine point five
percent more floor area, recovered purely by doing the geometry precisely.

Sweeping the footprint across seven rotations, total floor area varies by two hundredths of a
percent while the floor count shifts from eighteen to seventeen. The explanation is geometric:
under a linear ceiling, average permissible volume depends on the footprint centroid, not
orientation — so orientation becomes a free design variable.

Two honest flags: the corridor plan geometry is real, but the base elevation and slope are
placeholders; and the Grasshopper component's final step is written against the RhinoCommon API
but unexecuted, because Rhino was unavailable. The AI layer only interprets these verified
results against a brief — it never computes them.

## 07 · Environmental Massing Agents — 2:30 (cum. 12:30)

This is the strongest technical bridge to GenEnv, and it extends the lab's MCP-driven parametric
modelling. Six functional roles: one generator, four domain critics — solar access, embodied
carbon, pedestrian wind, and corridor yield — and one orchestrator, all working through a real
MCP server. Every score the agents argue about comes from deterministic evaluators.

I wrote four falsifiable hypotheses before running anything, anchored to an exhaustive
one-thousand-eighty-design reference grid. NSGA-two and random sampling each ran five seeds at a
matched two-hundred-evaluation budget.

The strict speed hypothesis failed — random sampling's one success was actually fast. What held
was reliability: NSGA-two reached ninety-five percent of the reference threshold in four of five
seeds; random in one of five. Mass timber weakly dominated concrete and steel in all two hundred
matched geometries. A closed-form floor-count prediction held within one floor across nineteen
orientations. And after removing dominant variables, wind and yield collapse to a clean
one-dimensional trade-off.

I kept the falsified hypothesis in the repository on purpose. The limitations are equally
explicit: simplified solar, benchmark carbon, a wind proxy rather than CFD, placeholder corridor
elevations, and no live unscripted LLM loop without an API key. The deterministic evaluators,
MCP server, optimization, and hypothesis tests are what I verified — so that is what I claim.

## 08 · One Connected Research Infrastructure — 1:00 (cum. 13:30)

Zooming out, the four projects stop being separate demonstrations. The zoning assistant holds
regulation and evidence. The massing generator carries evidence into editable geometry. The
corridor study connects geometry to verified performance. The massing agents add critique and
multi-objective exploration over that performance.

The common contribution is not simply using AI to generate forms. It is designing an accountable
path through which regulatory sources, geometric transformations, performance calculations,
uncertainty, and human decisions remain connected.

## 09 · Proposed Direction: Performance Provenance — 2:00 (cum. 15:30)

The dotted site on the map is the direction I would like to discuss. Working title: performance
provenance for human–AI co-design of urban environments. The central question: how can co-design
systems preserve traceable provenance between design intent, regulatory evidence, parametric
geometry, environmental performance, AI critique, and human judgment — across iterations, not
just inside one response?

The subquestions are where I expect your guidance to matter: what provenance designers actually
need in order to challenge an AI proposal; how to represent evidence, uncertainty, and
assumptions inside a live workflow; when agent specialization helps and when it manufactures
false confidence; and how editable performance visualizations affect trust, agency, and decision
quality.

The system I can already sketch from my prototypes: regulatory retrieval, parametric geometry,
an editable design state, deterministic evaluators, agent critique, a provenance graph with an
explicit uncertainty layer, and a versioned decision history.

Methodologically: research-through-design, technical validation, a controlled comparison of
provenance conditions, think-aloud sessions and interviews, and qualitative analysis — with
participant numbers deliberately left provisional. I want to shape this with you, not arrive
with it closed.

## 10 · Why GenEnv — 1:00 (cum. 16:30)

The destination territory is drawn with its own boundary because it is not mine. The NSERC
Discovery project — Human-AI Co-Design Framework for Performance-Aware Constructed Environments
— runs twenty-twenty-six to twenty-thirty-one; I verified the title, holder, and five-year term
on NSERC's funding-decisions page. Around it sit Decoding Urban Form, Grasshopper MCP, and the
Digital Thermal Sandbox, each attributed.

What I bring: architecture and landscape architecture; Rhino, Grasshopper, Unity, Three.js,
Python and C#; independently built research systems; and HCI studies that measured how a
representation changes behaviour.

What I hope to learn: advanced computational-design research, human–AI co-design theory,
performance-informed workflows, and how to grow these prototypes into a coherent doctoral
contribution. I would be excited to learn from Professor Liu and the GenEnv team while
contributing the combination of spatial-design experience, interactive-system development, and
human-centred evaluation I have built across my previous research.

## 11 · Conversation — 1:00 (cum. 17:30)

I would rather end with questions than conclusions. Which part of this direction could
contribute most meaningfully to GenEnv's current research? Would it be stronger to develop the
provenance infrastructure through an existing GenEnv case study, or to begin with a focused new
spatial-design problem? And which technical and theoretical areas should I strengthen before
beginning doctoral research?

Thank you. I would really value your thoughts on where this direction could become most useful
and rigorous within GenEnv.

## Appendix (outside timing)

Backup material: verified links to the papers, repositories, portfolio pages, GenEnv, and the
DTS program — plus the claim-status matrix if methods questions go deep.

---

### Rehearsal checklist

- [ ] Full run with the timer: finish Conversation at ≤ 19:00 twice in a row
- [ ] Practice the four interactive moments: PMG constraint click, ZLA NOT COVERED, VCM method slider, EMA verdict step
- [ ] Practice one provenance-spine inspection (scene 09) in under 20 seconds
- [ ] One offline run (network disabled)
- [ ] Decide N (notes) policy for screen sharing; `Esc` closes everything fast
- [ ] Pre-open the two live demos in background tabs as backup, but never depend on them
