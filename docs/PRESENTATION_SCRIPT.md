# Presentation Script

Generated from `src/data/steps.ts`. This is the text on the slides, which is also what the `N` notes show. One section per scroll.
Total: **28 slides, 1306 words, about 11.9 minutes** of speaking at 110 words per minute.


## 01 · GenEnv · Designing environments with people and AI (22 words)

How I came to the question GenEnv is asking: how people and AI can design constructed environments together, with performance in view.

## 02 · Making · It started with making things (36 words)

I have been making things since I was a child.

Building something new always made me wonder how it works and how people will use it. That question is still at the center of my work.

## 03 · Making · NODET schools (40 words)

For elementary and high school I studied at NODET, Iran’s national schools for exceptionally talented students. Getting in meant passing competitive national exams.

This is where I started learning hard algebra, physics, chemistry and differential calculus, from elementary school on.

## 04 · Designing places · From making things to designing places (37 words)

I love creating things that are completely new, so I chose architecture. It gave me the agency to make new things that have new effects on society.

At Tabriz Art University I won several interschool design competitions.

## 05 · Designing places · Zangar Museum (31 words)

A museum about the people of Tabriz under three governments over about a hundred years.

Each period became one sharp, angled form, so visitors read the history through the building itself.

## 06 · Designing places · Concept, site and plans (17 words)

Galleries, art classes, an amphitheater, a library and a restaurant sit inside and between the three forms.

## 07 · Designing places · Elevations, section and interiors (28 words)

A patterned screen wraps the galleries, and the section steps around a green yard.

Supervised by Prof. Parisa Hashempour, it was named the best dissertation of my class.

## 08 · Designing places · A cabin that unfolds (34 words)

After graduating I entered architecture and design competitions. This one asked for temporary housing for people after a natural disaster.

The panels fold out on hinges, and two people can lift them into place.

## 09 · Designing places · How framing changes what we see (28 words)

Long exposures of the city at night. The blur hides objects and leaves only light, colour and depth.

Competitions like these kept me focused on form and aesthetics.

## 10 · Reading environments · Why landscape architecture (48 words)

In Tabriz I was so into form and aesthetic theory that I had forgotten how society and nature shape design.

That is why I chose landscape architecture at Istanbul Technical University, where our focus was developing systems that help architects and landscape designers design with more effective tools.

## 11 · Reading environments · Designing with water (39 words)

At ITU I started using GIS to analyze environments and their data.

On Büyükada, steep streets send rainwater and pollution straight down the slope, so the design starts from an analysis of the slope, the roads and the water.

## 12 · Reading environments · A system, not an object (36 words)

Roof collectors, rain barrels, cisterns, permeable paving and planted basins work together.

Every housing unit uses the same techniques and connects down the hill to shared storage. I began to think of design as a system.

## 13 · Reading environments · Seeing depth in virtual landscapes (41 words)

In the Virtual Landscape Lab with Dr. Ikhwan Kim, I tested how people judge depth in VR.

When objects became very transparent, cool and dark colours looked closer than warm and bright ones. That is the opposite of the usual rule.

## 14 · Reading environments · Why I turned to computation (42 words)

GIS and VR showed me that environments can be analyzed, tested and measured as data.

I felt a deep need to learn coding and how to develop systems myself before continuing my research in design and architecture. That led me to SFU.

## 15 · Building systems · Learning to build (79 words)

In 2025 I started a Master of Science at SFU’s School of Interactive Arts and Technology. I studied AI systems and learned to build prototypes and complete systems with Python, JavaScript, Unity and C#, and parametric tools with Grasshopper and Ladybug.

I also teach. As a teaching assistant for IAT 313 Narrative and New Media, IAT 343 Animation and IAT 102 Graphic Design, I teach interactive environments, 3D modeling and animation. Last week I ran a workshop on Unity.

## 16 · Building systems · Two research areas (55 words)

In the iViz Lab with Prof. Steve DiPaola I worked on AI projects. Many of them were inspired by GenEnv’s work; I was following your lab closely at that time.

They grew into the two areas I am researching now: how people read information in space, and how AI can help design within real constraints.

## 17 · Current research · Reading a remote teammate’s body (38 words)

A teammate’s heart rate shown as a glowing halo instead of numbers.

People recognised the halo states well above chance, and teams helped each other faster with it.

*Caveat:* Players still trusted plain numbers more than the halo.

## 18 · Current research · When the body shapes the space (50 words)

In BioTerrarium an Apple Watch changes the fog, light and plants of a game world in under 200 milliseconds.

The player’s physiological state becomes a force that shapes the environment around them.

*Caveat:* Submitted to SIGGRAPH 2026 and not accepted. I am revising it, so the results are not final.

## 19 · Current research · AI that works within rules and performance (32 words)

My ongoing projects ask how AI can work with designers on real constraints: zoning, protected views and environmental performance.

In each one, AI reads and suggests, code calculates, and the designer decides.

## 20 · Current research · Reading zoning rules (54 words)

The Zoning Literacy Assistant finds the bylaw clauses that matter, answers only from them and checks its own answer.

If the bylaw is silent, it says “not covered” and stops. Site areas are calculated in code, and the AI only explains them.

*Caveat:* Uses ten clauses of Vancouver’s R1-1 zone, not the full bylaw.

## 21 · Current research · From rules to form (49 words)

In the Parametric Massing Generator, AI reads the bylaw and pulls out eight rules, each with its source sentence.

Code turns them into a building envelope the designer can edit. Change one value and everything that depends on it updates.

*Caveat:* A research prototype, not advice on code compliance.

## 22 · Current research · Protected views as a design constraint (52 words)

Vancouver’s protected views are a sloped limit, not a flat cap. Checking each floor against the slope gives 18 floors instead of 10.

Turning the footprint barely changes the area, so its angle can follow the program instead.

*Caveat:* The corridor shape is real City data. Base height and slope are placeholders.

## 23 · Current research · Agents that critique performance (61 words)

Six AI roles suggest and critique designs for sun, carbon, wind and floor area, but code calculates every score.

I expected guided search to be faster. It was not, but it was more reliable. I report both.

*Caveat:* Wind is a rough estimate, not CFD. Carbon uses benchmarks, not a full LCA. The live AI loop has not been run yet.

## 24 · Toward GenEnv · Performance Provenance (52 words)

Together, my projects point to what is still missing: a record that links each AI-assisted design change to its rule, its evidence and the designer’s decision.

This is the direction I would like to develop at GenEnv.

*Caveat:* A direction for discussion. The scope and methods would be shaped with my supervisor.

## 25 · Toward GenEnv · How it could be studied (79 words)

Four steps, each building on work I have already started.

**Build:** A co-design system. Join my current projects into one tool where every AI suggestion carries its record.

**Test:** Correct calculations. Check every computed value against known cases before anyone relies on it.

**Compare:** With and without. Study how designers work when the record is visible and when it is not.

**Interview:** Designers who use it. Learn where the record helps judgment and where it gets in the way.

## 26 · Toward GenEnv · Where my path meets GenEnv (86 words)

GenEnv works on human and AI co-design for performance-aware constructed environments. Three parts of my path lead there.

**Constructed environments:** Reading sites as a designer. Architecture in Tabriz and landscape architecture in Istanbul, from a museum to a water system on a steep slope.

**Performance:** Constraints computed in code. Zoning, protected views, sun, carbon and wind turned into geometry and scores that can be checked.

**Human and AI co-design:** How people read and trust information. 132 participants across two peer-reviewed studies of perception, speed and trust.

## 27 · Toward GenEnv · Why I want to join GenEnv (57 words)

From making things as a child to AI for spatial design, one question has stayed with me: how people, nature and the things we design shape each other.

I see several projects running in your lab that are exactly the work I mean, and the researcher I want to become. I would really like to join you.

## 28 · Questions · Thank you (83 words)

I would really value your thoughts.

Q: Would I join a project that is already running, or would we shape a new direction for me?

Q: How do you like PhD students to balance building tools with studying how designers use them?

Q: When an AI suggestion and a performance result disagree, how should a tool show that to the designer?

Q: Could I test tools with practising designers or planners during the PhD?

Q: What should I strengthen before starting a PhD?
