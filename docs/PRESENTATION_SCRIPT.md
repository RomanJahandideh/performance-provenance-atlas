# Presentation Script

One section per step, generated from `src/data/steps.ts` (the same text as the `N` notes).
Total narration: **1188 words ≈ 10.8 min** at 110 wpm. With pauses and
the drawings, that lands around 13 to 16 minutes, inside the 20-minute slot.

## 01 · Performance Provenance, 74 words (~40 s)

Thank you for meeting with me. I started out designing buildings and landscapes, and then I began studying how people perceive space. My recent work asks a related question: when AI tools help with spatial design, how do we keep their decisions visible, testable and easy for a designer to change?

I will go through where I studied, four prototypes I built, and a PhD direction I would like to talk about with you.

## 02 · Tabriz Islamic Art University, 30 words (~16 s)

My degrees are in different fields, but they connect. I trained as an architect at Tabriz Islamic Art University, where I worked on spatial composition, public space and visual communication.

## 03 · Zangar Museum, 37 words (~20 s)

This is my final thesis project, the Zangar Museum, which won the Best Dissertation Award. Projects like this taught me how to argue for a design with drawings, models and images, years before I started writing code.

## 04 · Design and photography awards, 43 words (~23 s)

I also took part in competitions. This foldable cabin for disaster areas placed sixth, and my photographs won an abstract city photography competition. Photography taught me how framing, contrast and blur change what people see, which became important later in my VR experiments.

## 05 · Istanbul Technical University, 42 words (~23 s)

At Istanbul Technical University I did my master’s in landscape architecture. This project on Büyükada collects rainwater from roofs and streets into rain gardens and storage tanks down the slope. It is also where I started testing how people perceive virtual environments.

## 06 · Transparency changes perceived depth, 48 words (~26 s)

This is my published eCAADe study. Sixty participants each made 264 depth judgments in VR, comparing transparency, colour and brightness. At high transparency the usual rule reversed, and cool, dark colours looked closer. So rules that work for solid objects do not always carry over to transparent ones.

## 07 · Simon Fraser University, 38 words (~21 s)

At SFU I am doing my Master of Science in the iViz Lab. There I learned to build complete interactive systems in Unity and C#, with physiological sensors and multiplayer networking, and to evaluate them with user studies.

## 08 · Reading the body, 106 words (~58 s)

My paper accepted at ACM ISS shows a remote teammate’s heart rate as a glowing halo instead of a number. In live three-player games, teammates helped each other almost four seconds faster than with no cue. But players still trusted plain numbers more, so it is a trade-off.

BioTerrarium goes the other direction. An Apple Watch changes the fog, light and plants of a game world in under 200 milliseconds. That paper is under revision, so I treat its results as preliminary. These projects taught me to think of an environment as something that responds, and the next four projects bring that idea into urban design.

## 09 · Zoning Literacy Assistant, 53 words (~29 s)

My first project is about reliable zoning answers. A general AI chatbot will often give a confident answer even when the bylaw does not say anything. So I split the system into three steps: it finds the relevant clauses, answers using only those, and then checks whether the clauses really support the answer.

## 10 · Saying “not covered”, 80 words (~44 s)

Here someone asks how many storeys a laneway house can have. The bylaw allows laneway houses but never gives a storey limit, so the system answers “not covered by the provided source” and stops. That refusal is on purpose. The site calculations are done in normal code, so the same lot always gives the same numbers, and the AI only explains them.

Once the rules are clear and traceable, the next question is how to turn them into building form.

## 11 · Parametric Massing Generator, 71 words (~39 s)

The Massing Generator goes from bylaw text to building form. The AI pulls out eight rules, like setbacks and height, and keeps the original sentence and a confidence level for each one. Then normal code applies those rules to the lot and builds the massing. Because it is parametric, changing one value updates everything that depends on it. Here, the rental condition raises the floor space ratio and adds a storey.

## 12 · From one lot to a whole block, 67 words (~37 s)

The same method works for irregular lots and for whole city blocks, where the AI sorts each parcel by use. A separate AI call reviews the result. What interests me most is not generating forms automatically. It is keeping the source, the rule, the geometry and every change connected.

But a building that meets the rules may still not perform well. The next project looks at that.

## 13 · Vancouver View Corridor Massing, 72 words (~39 s)

Vancouver’s protected views work like a sloped ceiling over the city, not a flat height limit. The usual shortcut caps the whole building at the lowest point, which gives ten floors and about 18,000 square metres. Checking each floor against the real slope gives eighteen floors and about 25,600 square metres, which is 39.5 percent more. The geometry proposes a design, and the calculation tells us what it achieves.

## 14 · Orientation is a free choice, 62 words (~34 s)

When I rotate the building footprint, the total floor area hardly changes, so the angle can be chosen for the program or the skyline instead. To be clear about the data, the corridor shape is real, but the base height and slope values are placeholders.

The last project looks at several goals at once, where no single design is best at everything.

## 15 · Environmental Massing Agents, 50 words (~27 s)

Environmental Massing Agents looks at several goals at once. One AI agent proposes designs, four agents review sunlight, carbon, wind and floor area, and one coordinates the next step. The important rule is that the agents never calculate the scores themselves. Normal code calculates them, and the agents interpret them.

## 16 · What the test showed, 74 words (~40 s)

I compared a guided search method, NSGA-II, with random search. Each ran five times with 200 tries, checked against a full grid of 1,080 designs. I expected the guided search to be faster, and it was not. It was more reliable, though: four out of five runs reached the target, compared with one out of five for random search. I think it is important to report what I expected and what actually happened.

## 17 · How the four projects connect, 41 words (~22 s)

Together these projects build one chain. The Zoning Assistant gives reliable rules, the Massing Generator turns them into editable form, the View Corridor project measures what that form achieves, and the agents discuss the trade-offs. The designer makes the final decision.

## 18 · Performance Provenance, 81 words (~44 s)

This is the direction I would like to discuss: performance provenance. Each line here is something the record would keep for one design change: the goal, the rule, the change, the calculation, the result, what is uncertain, what the AI said, and what the designer decided.

The methods could include building the system, testing it technically, comparing design with and without it, and interviewing designers. I have left this open on purpose, because I would like to shape it with you.

## 19 · Why GenEnv, 72 words (~39 s)

These four are GenEnv’s projects, not mine. The NSERC program runs from 2026 to 2031 and aims for AI design tools that stay editable, traceable and open to human judgment. My prototypes are closest to Decoding Urban Form and the Grasshopper MCP work.

I bring design training, computational prototyping and user studies. I would really like to learn from Professor Liu and the team how to grow these prototypes into a PhD.

## 20 · Three questions, 47 words (~26 s)

I would like to end with questions. Which part of this could help GenEnv’s current work the most? Should it start from an existing GenEnv case or a new design problem? And what should I strengthen before I start?

Thank you. I would really value your thoughts.
