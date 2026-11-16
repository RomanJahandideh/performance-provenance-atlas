# Presentation Script

Generated from `src/data/steps.ts` (the same text as the `N` notes). One section per scroll step.
Total: **36 steps, 1258 words, about 11.4 minutes** of speaking at 110 words per minute.


## 01 · 01 · Title · Performance Provenance (51 words)

Thank you for meeting with me. I started out designing buildings and landscapes, and then I began studying how people perceive space. My recent work asks a related question: when AI tools help with spatial design, how do we keep their decisions visible, testable and easy for a designer to change?

## 02 · 02 · Education · Three schools, one question (32 words)

My degrees are in different fields, but they connect. The same question runs through all of them: how does a space communicate, and how do people read it and act on it?

## 03 · 02 · Education · Tabriz Islamic Art University (19 words)

I trained as an architect at Tabriz Islamic Art University, working on spatial composition, public space and visual communication.

## 04 · 02 · Education · Istanbul Technical University (25 words)

At Istanbul Technical University I did my master’s in landscape architecture, and in the Virtual Landscape Lab I started testing how people perceive virtual environments.

## 05 · 02 · Education · Simon Fraser University (35 words)

At SFU I am doing my Master of Science in the iViz Lab with Professor Steve DiPaola. I build systems in Unity and C#, with sensors and networking, and I evaluate them with user studies.

## 06 · 03 · Dissertation · Zangar Museum (21 words)

This is my final thesis, the Zangar Museum. It ranked first in my graduating class and won the Best Dissertation Award.

## 07 · 03 · Dissertation · A museum about a century of history (32 words)

The museum tells the story of Tabriz people across three governments over about a century. I gave each period its own sharp-edged form, so the history is read through the building itself.

## 08 · 03 · Dissertation · Site and plans (22 words)

Here are the site plan and floor plans. The galleries, classrooms, amphitheater and restaurant are arranged inside and between the three forms.

## 09 · 03 · Dissertation · Elevations and section (25 words)

The elevations show the patterned screen on the gallery volumes, and the section shows how the galleries step around a green yard in the middle.

## 10 · 03 · Dissertation · Interiors (27 words)

These are the interior renders of the gallery entrance and temporary galleries. This project taught me how spatial decisions change the way people move through a building.

## 11 · 04 · Awards · Design and photography awards (9 words)

Alongside my studies I entered design and photography competitions.

## 12 · 04 · Awards · A cabin that unfolds (29 words)

This foldable cabin is temporary housing after a natural disaster. The panels hinge open and two people can set it up. It placed sixth in the Memar News competition.

## 13 · 04 · Awards · Abstract city photography (32 words)

These photographs won an abstract city photography competition. Working with blur and light taught me how framing and contrast change what people see, which came back later in my VR depth experiments.

## 14 · 05 · Landscape · Rain gardens for Büyükada (17 words)

This is a landscape project from my master’s at Istanbul Technical University, on the island of Büyükada.

## 15 · 05 · Landscape · Reading the site (32 words)

I started by mapping the slope and the roads. The streets are steep, so rainwater runs straight down and carries pollution with it. That made water the starting point of the design.

## 16 · 05 · Landscape · A system for water (28 words)

The design combines roof collectors, rain barrels, cisterns, permeable paving and rain gardens. Each element slows the water a little and lets it soak in or be stored.

## 17 · 05 · Landscape · Housing units on the slope (34 words)

Finally I applied the same techniques to each housing unit and connected them down the hill to shared storage tanks. Thinking in systems like this is something I still use in my computational work.

## 18 · 06 · Publications · Publications (18 words)

These are my three papers. One is published, one is accepted for November, and one is under revision.

## 19 · 06 · Publications · Creating Immersive Virtual Landscapes (52 words)

My first paper was published at eCAADe 2023 at Graz University of Technology. Sixty participants each made 264 depth judgments in VR across transparency, colour and brightness. At high transparency the usual rule reversed, and cool, dark colours looked closer. So rules that work for solid objects do not always carry over.

## 20 · 06 · Publications · Reading a Remote Teammate’s Body (68 words)

My second paper was accepted at ACM ISS 2026 in Turin, with Aran Jahandideh and Steve DiPaola. In the first study 36 people recognised the halo states well above chance. In the second, twelve teams of three played a cooperative game, and with the halo they helped each other almost four seconds faster than with no cue. But they still trusted numbers more, so it is a trade-off.

## 21 · 06 · Publications · BioTerrarium (52 words)

The third project, BioTerrarium, connects an Apple Watch to a Unity world in under 200 milliseconds, so the fog, light and plants respond to your heart. I ran a study with 24 people. The paper was not accepted at SIGGRAPH, and I am revising it, so I treat the results as preliminary.

## 22 · 06 · Publications · Where they meet GenEnv (45 words)

Why this matters for GenEnv: a co-design tool is only useful if designers read its information correctly and trust it the right amount. My papers measured exactly that, in VR, in games and in live data. I want to bring those methods into design tools.

## 23 · 07 · Prototypes · Four prototypes (23 words)

These are four prototypes I built after reading about GenEnv’s work. Each one adds a step: rules, then form, then performance, then critique.

## 24 · 07 · Prototypes · Zoning Literacy Assistant (47 words)

The Zoning Assistant answers zoning questions only from the clauses it finds, then checks itself. Here someone asks about laneway house storeys. The bylaw does not say, so it answers “not covered” and stops. Site areas are calculated in normal code, and the AI only explains them.

## 25 · 07 · Prototypes · Parametric Massing Generator (42 words)

The Massing Generator goes from bylaw text to form. The AI extracts eight rules and keeps the original sentence for each, and code builds the envelope. Because it is parametric, changing one value updates everything. Here the rental condition adds a storey.

## 26 · 07 · Prototypes · View Corridor Massing (44 words)

Vancouver’s protected views work like a sloped ceiling. The usual shortcut gives ten floors. Checking each floor against the real slope gives eighteen, 39.5 percent more floor area. Rotating the footprint barely changes the area, so the angle can follow the program instead.

## 27 · 07 · Prototypes · Environmental Massing Agents (57 words)

In the last prototype, AI agents propose and critique designs, but code calculates all the scores. I expected a guided search to be faster than random search. It was not faster, but it was more reliable: four of five runs reached the target, compared with one of five. I report both what I expected and what happened.

## 28 · 08 · Direction · Performance Provenance (17 words)

This is the PhD direction I would like to discuss with you. I call it performance provenance.

## 29 · 08 · Direction · From rule to decision (30 words)

The four prototypes together form a chain from the rule to the designer’s decision. What is missing is a record that keeps the whole chain together across many design changes.

## 30 · 08 · Direction · What the record keeps (38 words)

For each design change, the record would keep the goal, the rule, the change, the calculation, the result, what is uncertain, what the AI said, and what the designer decided. This example uses the real view corridor study.

## 31 · 08 · Direction · How it could be studied (36 words)

The methods could include building the system, testing it technically, comparing design with and without the record, and interviewing designers. I have left this open on purpose, because I would like to shape it with you.

## 32 · 09 · Fit · Why I fit this research (38 words)

GenEnv describes its work as AI that interprets complex environments, reasons through constraints, works inside professional design tools, and keeps outcomes open to human judgment. I want to show how my background lines up with each of these.

## 33 · 09 · Fit · Reading places and their rules (35 words)

Interpreting environments and reasoning through constraints is where my architecture and landscape training meets my prototypes. I have read sites as a designer, and I have turned zoning and view rules into geometry in code.

## 34 · 09 · Fit · Tools that people can trust (35 words)

Working inside design tools and keeping humans in charge is where my HCI side comes in. I build working systems, and I have run studies with 132 people on how they read and trust information.

## 35 · 09 · Fit · Why I can succeed here (42 words)

So I bring three things that rarely come together: design training, the ability to build working AI and spatial tools, and experience testing them with people. I would be excited to grow these into a PhD with Professor Liu and the lab.

## 36 · 10 · Questions · Thank you (69 words)

Thank you. I have a few questions. Would I join a project that is already running, or would we shape a new direction for me? How do you like students to balance building tools with studying how designers use them? When an AI suggestion and a performance result disagree, how should a tool show that? Could I test tools with practising designers? And what should I strengthen before starting?
