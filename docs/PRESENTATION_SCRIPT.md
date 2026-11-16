# Presentation Script

One section per step, generated from `src/data/steps.ts` (the same text as the `N` notes).
Total narration: **1021 words ≈ 9.3 min** at 110 wpm. With pauses and
the drawings, that lands around 13–16 minutes — inside the 20-minute slot.

## 01 · Performance Provenance — 71 words (~39 s)

Thank you for meeting with me. I began by designing spaces and studying how people perceive them. My recent work asks a related question at a different level: when computational and AI systems take part in spatial design, how can their decisions stay visible, testable, and open to human revision?

I will walk through where I trained, four prototypes I built, and a direction I would like to discuss with you.

## 02 · Tabriz Islamic Art University — 27 words (~15 s)

My degrees look different, but they build one research profile. I trained as an architect at Tabriz Islamic Art University: spatial composition, public life, and visual communication.

## 03 · Zangar Museum — 37 words (~20 s)

This is my final architecture thesis, the Zangar Museum. It won the Best Dissertation Award. Projects like this taught me to argue for a spatial idea with drawings, models, and images — long before I had a codebase.

## 04 · Design and photography awards — 45 words (~25 s)

Competitions pushed me to communicate fast: a foldable cabin for disaster areas, which placed sixth, and a winning entry in an abstract city-photography competition. Photography taught me how framing, contrast, and ambiguity change what people see — a question that came back in my VR experiments.

## 05 · Istanbul Technical University — 25 words (~14 s)

At Istanbul Technical University I studied landscape architecture: dynamic systems, water, and site conditions. It is also where I began testing perception inside virtual environments.

## 06 · Transparency reverses depth — 46 words (~25 s)

My published eCAADe study: sixty participants, two hundred sixty-four pairwise depth judgments each, across transparency, hue, and luminance in VR. Watch the spheres: at high transparency the familiar rule reverses — cool and dark colours read as nearer. Visual rules for opaque graphics do not simply transfer.

## 07 · Simon Fraser University · iViz Lab — 26 words (~14 s)

At SFU, in the iViz Lab, I learned to build complete interactive systems — Unity, C#, physiological sensing, multiplayer networking — and to evaluate them with HCI methods.

## 08 · Bodies in the loop — 92 words (~50 s)

My accepted ACM ISS paper shows a remote teammate’s heart rate as one label-free halo. In live three-player teams, support came almost four seconds faster than with no cue — but plain numbers stayed more trusted. A real trade-off.

BioTerrarium runs the loop the other way: an Apple Watch drives fog, light, and plants in under two hundred milliseconds. Its manuscript is under revision, so I treat the analysis as provisional. These projects taught me to treat an environment as a responsive system — and the next four move that thinking into urban design.

## 09 · Zoning Literacy Assistant — 51 words (~28 s)

My first project is about trustworthy regulatory knowledge. A general-purpose language model will happily answer confidently even when the information is not there. So I split the system into retrieval, answering, and independent verification: it finds the clauses, answers only from those, then checks whether the evidence really supports the answer.

## 10 · When the rule is silent, it says so — 68 words (~37 s)

When the source does not contain the answer — here, how many storeys a laneway house may have — it stops: “not covered by the provided source.” Refusing is designed behaviour, not a failure. Site arithmetic is done in ordinary code, so the same inputs always give the same result; the AI only explains it.

Once regulation is structured and traceable, the next question is how it becomes editable geometry.

## 11 · Parametric Massing Generator — 56 words (~31 s)

The Massing Generator moves from regulatory language to form. AI extracts eight constraints and keeps the source phrase and a confidence level for each. Then deterministic code applies them: setbacks, footprint, floor area, and the massing. It is parametric because changing one value updates everything that depends on it — watch the rental condition add a storey.

## 12 · Same method, bigger sites — 54 words (~29 s)

The same clipping method scales to irregular parcels and AI-classified urban blocks, and a separate reviewer checks the interpretation. My interest is not automatic form generation — it is keeping source, parameter, geometry, and revision connected.

But a compliant envelope does not tell us whether the geometry performs well, or what simplifying a rule costs.

## 13 · Vancouver View Corridor Massing — 58 words (~32 s)

Vancouver’s protected views create sloped ceilings, not flat height limits. The usual shortcut caps the whole site at the lowest point: ten floors, about eighteen thousand square metres. Trimming floor by floor against the real slope gives eighteen floors and over twenty-five thousand — thirty-nine and a half percent more, from precision alone. Geometry proposes; evaluation provides the evidence.

## 14 · Orientation becomes a free choice — 45 words (~25 s)

Rotating the footprint barely changes total area, so orientation can serve silhouette or program instead of yield. Honest flags: the corridor geometry is real, but the elevation values are placeholders.

The last project extends this to several competing objectives, where no single design wins everywhere.

## 15 · Environmental Massing Agents — 49 words (~27 s)

Environmental Massing Agents extends the workflow to many objectives at once. A Generator proposes designs; four Critics read the solar, carbon, wind, and floor-area results; an Orchestrator picks the next direction. The key rule: the agents never calculate the scores. Ordinary code provides the evidence; the agents interpret it.

## 16 · The honest result — 63 words (~34 s)

I compared a genetic optimizer, NSGA-II, with random search: five runs each, two hundred evaluations, against a full grid of one thousand eighty designs. I expected it to be faster — it was not. What it showed was reliability: four of five runs reached the target, against one of five. Reporting that difference matters: it separates what I expected from what the results support.

## 17 · Rule → geometry → performance → judgment — 26 words (~14 s)

Together these form one direction: trustworthy regulatory knowledge, editable geometry, measurable evidence, and agents that discuss verified trade-offs — while the final judgment stays with the designer.

## 18 · Performance Provenance — 70 words (~38 s)

This is the direction I would like to discuss: performance provenance. As the chain lights up, each link is something the record keeps — the intent, the rule, the change, the calculation, the result and its uncertainty, the AI’s reading, and the designer’s decision.

Methods would combine building the system, technical validation, controlled comparison, and interviews — deliberately left open. I want to shape this with you, not arrive with it closed.

## 19 · Why GenEnv — 62 words (~34 s)

This territory is drawn separately because it is not mine. GenEnv’s funded NSERC program, running 2026 to 2031, aims for AI-assisted design that stays editable, traceable, and open to human judgment.

I bring spatial design, computational prototyping, and human-centred evaluation. I would be excited to learn from Professor Liu and the team how to grow these prototypes into a coherent doctoral contribution.

## 20 · Three questions — 50 words (~27 s)

I would rather end with questions than conclusions. Which part of this direction could contribute most to GenEnv’s current work? Would it grow best through an existing GenEnv case, or a new focused problem? And what should I strengthen before I begin?

Thank you — I would really value your thoughts.
