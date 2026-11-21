import type { Slide, Step } from './types';
import { DIRECTIONS } from './provenance';

/**
 * The talk for a PhD interview (Design, Technology and Society). It opens with Roman's present
 * research question, then follows the path that produced it: making, spatial
 * form at Tabriz, environmental systems at Istanbul, measured perception,
 * building and studying systems at SFU, exploratory computational-design
 * research projects, and finally the provisional PhD direction and where it
 * meets GenEnv. One scroll = one step. Slides carry one claim and brief
 * evidence; the spoken text lives in `notes`. Script and timing docs are
 * generated from this file (scripts/docs.mjs).
 * Writing rules: plain sentences, no dashes, MSc (not MA), "Tabriz Art
 * University", research projects (not "prototypes" as a label), no recruitment
 * notice on screen. Image credits: docs/ASSET_MANIFEST.md.
 */

/** Timing sections, in order, with their targets (docs/TIMING_AUDIT.md). */
export const SECTIONS = [
  { name: 'Opening', target: '1:10' },
  { name: 'Background', target: '3:30' },
  { name: 'Previous research', target: '2:15' },
  { name: 'Research projects', target: '2:30' },
  { name: 'PhD directions', target: '6:15' },
  { name: 'Research fit', target: '0:40' },
  { name: 'Conversation', target: '0:25' },
] as const;

/** Delivery pace used for every timing figure. */
export const PACE = { fastWpm: 110, midWpm: 105, slowWpm: 100, transitionSeconds: 3 } as const;

export const SLIDES: readonly Slide[] = [
  // ── Opening ────────────────────────────────────────────────────────────────
  {
    id: 'title',
    chapter: 'Opening',
    scene: 'opening',
    layout: 'title',
    kicker: 'PhD interview · Design, Technology and Society · Fall 2027',
    title: 'From environmental evidence to performance-aware co-design',
    lines: ['My work asks how AI can help designers explore built environments without losing the rules, performance evidence, editable geometry and human judgment that make a proposal accountable.'],
    facts: [
      { label: 'Roman Jahandideh', value: 'MSc, Interactive Arts and Technology, SFU' },
      { label: 'Today', value: 'Previous work and three possible PhD directions' },
    ],
    media: [{ diagram: 'atlas-open' }],
    purpose: 'Title, research identity, and the research map with the proposed PhD territory (three possible directions) drawn faintly.',
    notes: [
      'Thank you for having me. I am Roman Jahandideh, an MSc student in Interactive Arts and Technology at SFU.',
      'My work asks how AI can help designers explore built environments without losing the rules, the performance evidence and the human judgment that make a proposal accountable.',
    ],
  },
  {
    id: 'question',
    chapter: 'Opening',
    scene: 'phd',
    layout: 'band',
    kicker: 'The question, and the route to it',
    title: 'A proposal is only useful if a designer can check it',
    lines: ['AI can generate convincing spatial proposals. Designers still need the rules, calculations, assumptions and decisions behind them to stay valid as the design changes.'],
    facts: [{ label: 'Research area', value: 'Human-AI co-design for performance-aware constructed environments', tone: 'proposal' }],
    media: [{ diagram: 'route', caption: 'Each stage, and what it carried forward' }],
    purpose: 'The question and the research area, then the route from making to human-AI co-design with one capability carried from each stage.',
    notes: [
      'AI can already produce convincing massing proposals. But a designer can only use one if they can see which rule it followed, how its performance was calculated, and what was assumed.',
      'I will end with three possible doctoral directions in human-AI co-design for performance-aware design. First, the route that led me here.',
    ],
  },

  // ── Background ─────────────────────────────────────────────────────────────
  {
    id: 'making',
    chapter: 'Background',
    scene: 'trajectory',
    layout: 'cantilever',
    kicker: 'Background · Making',
    title: 'I learn by making',
    lines: ['I build something, test where it works and where it fails, and revise it.'],
    media: [{ src: 'assets/photos/childhood.jpg', caption: 'Already taking things apart', alt: 'Roman as a child in a kitchen, opening a drawer to see what is inside.' }],
    purpose: 'One childhood photograph and one idea: making as a way of understanding.',
    notes: [
      'I have always learned by making: as a child I took things apart to see how they worked, and my schooling pushed mathematics and science early. I still build something, test where it fails, and revise it.',
    ],
  },
  {
    id: 'tabriz',
    chapter: 'Background',
    scene: 'trajectory',
    layout: 'cantilever',
    kicker: 'Background · Spatial form',
    title: 'From making things to designing places',
    lines: ['Architecture let me make new things that change how people live together.'],
    facts: [
      { label: 'Tabriz Art University', value: 'Bachelor of Architecture' },
      { label: 'Years', value: '2011 to 2016' },
    ],
    media: [{ src: 'assets/photos/tabriz-2.jpg', caption: 'Tabriz Art University', credit: 'Ashkan najar · CC BY-SA 4.0', alt: 'Brick buildings and a blossoming tree on the campus.' }],
    purpose: 'Tabriz campus; the degree; why architecture.',
    notes: [
      'That led me to architecture at Tabriz Art University. Architecture let me make new things with real effects on how people live together. I learned to think about space through form, narrative and social purpose, and tested my work in interschool design competitions.',
    ],
  },
  {
    id: 'zangar',
    chapter: 'Background',
    scene: 'trajectory',
    layout: 'band',
    kicker: 'Background · Dissertation',
    title: 'Zangar Museum: history translated into space',
    lines: ['A museum about the people of Tabriz under three governments across about a century. Each period became one sharp, angled form.'],
    facts: [
      { label: 'Supervisor', value: 'Prof. Parisa Hashempour' },
      { label: 'Recognition', value: 'Best Dissertation, 2016', tone: 'yellow' },
    ],
    media: [
      { src: 'assets/portfolio/p019.jpg', caption: 'Night view', alt: 'Portfolio page: night aerial render of the museum in the city.' },
      { src: 'assets/portfolio/p018.jpg', caption: 'Three periods, three forms', alt: 'Portfolio page: concept text and the three historical periods as three forms.' },
    ],
    purpose: 'The night render and the concept board: three periods, three forms.',
    notes: [
      'My dissertation was the Zangar Museum, about the people of Tabriz under three governments across roughly a century. Each period became one sharp, angled form, so visitors read the history through the building itself.',
      'It was supervised by Prof. Parisa Hashempour and named the best dissertation of my class.',
    ],
  },
  {
    id: 'zangar-development',
    chapter: 'Background',
    scene: 'trajectory',
    layout: 'gallery',
    kicker: 'Background · Design development',
    title: 'From narrative to plan and section',
    lines: ['Galleries, classrooms, an amphitheater and a library sit inside and between the three forms. The section steps around a green yard.'],
    media: [
      { src: 'assets/portfolio/p023.jpg', caption: 'Floor plans', alt: 'Portfolio page: floor plans with galleries, depot, parking and amphitheater.' },
      { src: 'assets/portfolio/p027.jpg', caption: 'Section', alt: 'Portfolio page: section through the galleries and green yard.' },
    ],
    purpose: 'Plans and section at a readable scale.',
    notes: [
      'Developing it taught me to carry one idea from a cultural story through geometry, program and circulation, so the plan and section still tell the history.',
    ],
  },
  {
    id: 'competitions',
    chapter: 'Background',
    scene: 'trajectory',
    layout: 'gallery',
    kicker: 'Background · Competitions',
    title: 'Construction, framing and light',
    lines: ['Competitions let me test how construction, framing and light change the way a space is experienced.'],
    facts: [
      { label: 'Foldable disaster cabin · Memar News national competition, 2018', value: 'Sixth prize' },
      { label: 'Landscape design · Tabriz Art University, 2015', value: 'Second prize' },
      { label: 'Long-exposure photographs · Abstract Photo of City, 2018', value: 'Winner' },
    ],
    media: [
      { src: 'assets/portfolio/p101.jpg', caption: 'Foldable cabin', alt: 'Portfolio page: foldable A-frame cabins in a mountain valley.' },
      { src: 'assets/portfolio/p105.jpg', caption: 'A Tunnel To Heaven', alt: 'Portfolio page: winning photograph “A Tunnel To Heaven”.' },
      { src: 'assets/portfolio/p106.jpg', caption: 'The Ghost of Playground', alt: 'Portfolio page: winning photograph “The Ghost of Playground”.' },
    ],
    purpose: 'One strip: the foldable cabin and the two winning photographs, with the three results as small facts.',
    notes: [
      'I kept testing ideas in competitions: a foldable cabin for people displaced by disasters, a landscape design, and long exposures of the city at night. Each was about how construction, framing and light change the way a space is experienced.',
    ],
  },
  {
    id: 'istanbul',
    chapter: 'Background',
    scene: 'trajectory',
    layout: 'cantilever',
    kicker: 'Background · Environmental systems',
    title: 'From objects to environmental systems',
    lines: ['Architecture taught me to compose space. Landscape architecture taught me that space is also terrain, water, ecology, infrastructure, time and collective use.'],
    facts: [
      { label: 'Istanbul Technical University', value: 'Master’s, Landscape Architecture' },
      { label: 'Years', value: '2020 to 2024' },
    ],
    media: [
      { src: 'assets/photos/tabriz-1.jpg', caption: 'Tabriz Art University', credit: 'Zahra Multimedia · CC BY-SA 4.0', alt: 'A brick tower on the Tabriz Art University campus at sunset.' },
      { src: 'assets/photos/itu-2.jpg', caption: 'Istanbul Technical University', credit: 'CeeGee · CC BY-SA 3.0', alt: 'The Taşkışla building of Istanbul Technical University.' },
    ],
    purpose: 'Tabriz and Istanbul side by side: the move from composing objects to reading systems.',
    notes: [
      'Over time I felt my architecture paid too little attention to society and nature, so I studied landscape architecture at Istanbul Technical University. Landscape taught me that space is also terrain, water, ecology and time. At ITU I also started using GIS.',
    ],
  },
  {
    id: 'buyukada',
    chapter: 'Background',
    scene: 'trajectory',
    layout: 'band',
    kicker: 'Background · Büyükada',
    title: 'A water system, not an object',
    lines: ['On a steep island, the design began from slope, roads and runoff, and became connected interventions linked down the hill to shared storage.'],
    media: [
      { src: 'assets/portfolio/p109.jpg', caption: 'Slope and roads', alt: 'Portfolio page: topography analysis and existing roads.' },
      { src: 'assets/portfolio/p117.jpg', caption: 'Where the water goes', alt: 'Portfolio page: section with water harvesting pools and terraces.' },
      { src: 'assets/portfolio/p122.jpg', caption: 'Two connected units', alt: 'Portfolio page: two housing units with rain gardens and storage tanks.' },
    ],
    purpose: 'Analysis, water section and connected units: from site reading to a connected system.',
    notes: [
      'On Büyükada, a steep island, rainwater runs straight down the streets. The design began from slope, roads and runoff, and became a system of collectors, cisterns and planted basins linked down the hill to shared storage. Design became a network of relationships I could represent and measure.',
    ],
  },
  {
    id: 'generative-images',
    chapter: 'Background',
    scene: 'trajectory',
    layout: 'gallery',
    kicker: 'Background · Generative images, 2022',
    title: 'First experiments with generative AI',
    lines: ['I used Midjourney to explore landscapes and atmospheres from text prompts. The images came quickly and looked convincing, but none carried a scale, a site or evidence a designer could check.'],
    facts: [
      { label: 'Tool', value: 'Midjourney' },
      { label: 'Period', value: 'August to September 2022' },
    ],
    media: [
      { src: 'assets/photos/mj-jar.jpg', caption: 'A landscape in a glass jar', alt: 'Midjourney image by Roman: a miniature landscape with towers and trees inside a glass jar.' },
      { src: 'assets/photos/mj-rails.jpg', caption: 'Mist, moon and rails', alt: 'Midjourney image by Roman: a train on overgrown rails in a misty landscape under a full moon.' },
      { src: 'assets/photos/mj-roots.jpg', caption: 'Roots as space', alt: 'Midjourney image by Roman: a hall whose floor and vaults are made of tangled roots.' },
    ],
    purpose: 'Three of Roman’s own Midjourney images from 2022: an exploratory use of generative AI for landscape and atmosphere, and the limit it exposed.',
    notes: [
      'During my master’s in Istanbul I also experimented with Midjourney, generating landscapes and atmospheres from text prompts. It was exciting how fast the images came, but they had no scale, no site and nothing I could verify. That limit is part of why I now study AI that stays connected to evidence.',
    ],
  },

  // ── Previous research ──────────────────────────────────────────────────────
  {
    id: 'ecaade',
    chapter: 'Previous research',
    scene: 'foundation',
    layout: 'figure-left',
    kicker: 'Toward better VR design tools',
    title: 'Designing depth in virtual landscapes',
    lines: ['I tested how colour and transparency change perceived depth in VR. At high transparency, cool and dark colours looked nearer, reversing the usual cue: how space is represented changes how it is judged.'],
    callout: { label: 'For a designer’s toolset', text: 'These findings could become guidance inside a VR design tool, suggesting colour and transparency so a landscape reads at the depth the designer intends.' },
    facts: [
      { label: 'Participants', value: '60' },
      { label: 'Judgments each', value: '264' },
      { label: 'Education and Research in Computer Aided Architectural Design in Europe', value: 'eCAADe 41, Graz, 2023 · published', tone: 'cyan' },
    ],
    caveat: 'One white background, six hues, four transparency levels. Results may differ in other scenes.',
    links: [{ label: 'DOI', url: 'https://doi.org/10.52842/conf.ecaade.2023.1.149' }],
    media: [
      { diagram: 'spheres', caption: 'Four transparency levels' },
      { diagram: 'colours', caption: 'Twelve colour conditions' },
    ],
    purpose: 'Study design redrawn as vectors: four transparency levels, twelve colour conditions.',
    notes: [
      'In the Virtual Landscape Lab with Dr. Ikhwan Kim, I studied a problem designers face in VR: depth does not always read as intended. Sixty people each made 264 depth judgments. At high transparency the usual rule reversed. The finding is bounded, but it could guide colour and transparency in a VR design tool.',
    ],
  },
  {
    id: 'build-and-study',
    chapter: 'Previous research',
    scene: 'trajectory',
    layout: 'band',
    kicker: 'Previous research · SFU, iViz Lab',
    title: 'Learning how AI systems are built and run',
    lines: ['To use AI in design responsibly, I needed to understand how AI systems are built and run, not only how to prompt them. That led me to SFU and the iViz Lab, which works on AI, while I kept building architectural systems and prototypes.'],
    facts: [
      { label: 'Degree', value: 'MSc, Interactive Arts and Technology' },
      { label: 'Teaching assistant', value: 'IAT 313 · IAT 343 · IAT 102' },
    ],
    media: [
      { diagram: 'capability', caption: 'One question, carried end to end' },
      { src: 'assets/photos/sfu-2.jpg', caption: 'SFU Surrey', credit: 'Canmenwalker · CC BY 4.0', alt: 'The multi-storey atrium of the Simon Fraser University Surrey campus, with a timber roof structure.' },
      { src: 'assets/photos/teach-iat343.jpg', caption: 'Teaching Maya · IAT 343', alt: 'Roman teaching 3D modeling in Maya in front of a projected screen.' },
    ],
    purpose: 'Why SFU: learning how AI systems are built and run. Capability chain from question to publication, the SFU Surrey atrium and one teaching photo.',
    notes: [
      'Midjourney showed me what AI could produce, but not how it works. To use AI responsibly in design, I needed to learn how these systems are built and run. That led me to SFU and Prof. Steve DiPaola’s iViz Lab, which works on AI. Alongside the lab, I kept building small architectural systems and prototypes.',
      'There I learned to carry a question the whole way: a prototype in Unity and C#, a data pipeline in Python and JavaScript, then the study and the paper. I also teach as a TA in three SIAT courses, and last week ran a Unity workshop.',
    ],
  },
  {
    id: 'hci',
    chapter: 'Previous research',
    scene: 'foundation',
    layout: 'figure',
    kicker: 'Previous research · HCI studies',
    title: 'How a representation shapes trust',
    lines: ['A teammate’s heart rate shown as a halo was read above chance, and teams helped each other faster. People still trusted plain numbers more.'],
    facts: [
      { label: 'Halo states recognised (chance 25%)', value: '66.3%' },
      { label: 'Faster help', value: '3.90 s', tone: 'cyan' },
      { label: 'ACM International Conference on Interactive Surfaces and Spaces', value: 'ISS 2026, Turin · accepted' },
      { label: 'BioTerrarium', value: 'Under revision', tone: 'orange' },
    ],
    caveat: 'The ISS DOI activates with the proceedings, 23 to 26 November 2026. BioTerrarium results are provisional.',
    media: [
      { src: 'assets/papers/iss-halos.jpg', caption: 'ISS · 16 halo states', alt: 'Sixteen halo icons combining heart rate and heart rate variability.' },
      { src: 'assets/papers/bio-zones.jpg', caption: 'BioTerrarium · four body states', alt: 'Four terrarium scenes from calm to overdrive.' },
    ],
    purpose: 'Halo states and BioTerrarium zones; the trust trade-off as the headline, statuses kept small.',
    notes: [
      'In one study, a remote teammate’s heart rate appeared as a halo instead of numbers. People read it above chance and helped faster, but trusted the numbers more. BioTerrarium is still under revision.',
      'These studies taught me to build a complete research system and examine how people understand, trust and use it. I now want to bring that back into architecture and landscape design, where AI recommendations must stay connected to real performance evidence.',
    ],
  },

  // ── Research projects ──────────────────────────────────────────────────────
  {
    id: 'division',
    chapter: 'Research projects',
    scene: 'synthesis',
    layout: 'band',
    kicker: 'Research projects',
    title: 'AI interprets and proposes. Verified code computes. The designer judges.',
    lines: ['Several small research projects, each exploring one part of the same problem: regulation, editable geometry, a spatial constraint and performance critique.'],
    media: [{ diagram: 'roles', caption: 'Who does what in each project' }],
    purpose: 'Matrix of the three roles (AI, verified code, designer) across the four projects, each role with its own line style.',
    notes: [
      'Then I began several small research projects on parts of one problem: how rules become spatial knowledge, how that becomes editable geometry, how constraints are calculated, and how AI might support performance critique. In each, AI proposes, code computes, and the designer judges.',
    ],
  },
  {
    id: 'zla',
    chapter: 'Research projects',
    scene: 'zla',
    layout: 'figure-left',
    kicker: 'Project 1 · Regulation',
    title: 'Zoning Literacy Assistant',
    project: {
      problem: 'Can an assistant answer zoning questions only from cited clauses, and say when the bylaw is silent?',
      built: 'Retrieval of the relevant clauses, an answer limited to them, then a check.',
      evidence: 'Asked about laneway storeys, it says “not covered” and stops. Site area is computed in code: 162.6 m².',
      limit: 'Ten clauses of Vancouver’s R1-1 zone. Not planning advice.',
      lesson: 'Urban knowledge must keep its sources, uncertainty and non-answers.',
    },
    links: [
      { label: 'Live system', url: 'https://romanjahandideh.github.io/zoning-literacy-assistant/' },
      { label: 'GitHub', url: 'https://github.com/RomanJahandideh/zoning-literacy-assistant' },
    ],
    media: [{ diagram: 'notcovered', caption: 'Silence is reported, not guessed' }],
    purpose: 'The retrieve, answer, verify pipeline stopping at “not covered”.',
    notes: [
      'First, regulation. I explored whether an assistant could answer zoning questions only from cited clauses. Asked how many storeys a laneway house may have, it says the source does not cover it, and stops. It uses ten clauses of one zone. The lesson: urban knowledge has to keep its sources and its non-answers.',
    ],
  },
  {
    id: 'pmg',
    chapter: 'Research projects',
    scene: 'pmg',
    layout: 'figure',
    kicker: 'Project 2 · Editable geometry',
    title: 'Parametric Massing Generator',
    project: {
      problem: 'Can rules read by AI stay editable once they become geometry?',
      built: 'AI extracts eight rules with their source phrases; code builds the envelope.',
      evidence: 'Change one value, the rental condition, and every dependent part updates: FSR 0.70 to 1.00.',
      limit: 'A research prototype, not code-compliance software.',
      lesson: 'AI output should be symbolic and editable, not a finished model.',
    },
    links: [
      { label: 'Live system', url: 'https://romanjahandideh.github.io/parametric-massing-generator/' },
      { label: 'GitHub', url: 'https://github.com/RomanJahandideh/parametric-massing-generator' },
    ],
    media: [
      { diagram: 'envelope', caption: 'Envelope from extracted rules' },
      { src: 'assets/projects/pmg-hero.webp', caption: 'Live system, captured', alt: 'Massing volumes on an urban block with a plan inset.' },
    ],
    purpose: 'Rules becoming an editable envelope, plus a captured interface state.',
    notes: [
      'Second, geometry. Here the AI extracts eight rules from the bylaw, each with its source sentence, and code builds the envelope. Change one value, like the rental condition, and everything that depends on it updates. It is a research prototype, not compliance software. The lesson: AI output should stay editable.',
    ],
  },
  {
    id: 'vcm',
    chapter: 'Research projects',
    scene: 'vcm',
    layout: 'figure-left',
    kicker: 'Project 3 · Spatial constraint',
    title: 'Vancouver View Corridor Massing',
    project: {
      problem: 'How much does a flat-cap shortcut misstate a sloped view limit?',
      built: 'Floor-by-floor clipping against the City’s corridor geometry, exported to Rhino .3dm.',
      evidence: '18 floors instead of 10, and 39.5% more floor area, in the documented test case.',
      limit: 'Base elevation and slope are placeholders. The Grasshopper step is written, not executed.',
      lesson: 'Methods and assumptions must travel with the result.',
    },
    links: [{ label: 'GitHub', url: 'https://github.com/RomanJahandideh/vancouver-view-corridor-massing' }],
    media: [{ diagram: 'corridor', caption: 'Flat cap against floor-by-floor trim' }],
    purpose: 'Section: the sloped view ceiling, the flat cap, then floor-by-floor trimming with live counts.',
    notes: [
      'Third, a spatial constraint. Protected views in Vancouver are sloped, but quick checks use a flat cap. Clipping floor by floor against the City’s corridor data gives eighteen floors instead of ten. But the base elevation and slope are placeholders, so the number only means something with its assumptions attached.',
    ],
  },
  {
    id: 'ema',
    chapter: 'Research projects',
    scene: 'ema',
    layout: 'figure',
    kicker: 'Project 4 · Performance critique',
    title: 'Environmental Massing Agents',
    project: {
      problem: 'Do agent critics make performance search better?',
      built: 'Generator, critic and orchestrator agents over deterministic evaluators.',
      evidence: 'Guided search was more reliable, not faster.',
      limit: 'Simplified solar, benchmark carbon, a wind proxy. Live LLM loop not run.',
      lesson: 'More agents are not better design. Test autonomy and verification.',
    },
    facts: [
      { label: 'Faster search', value: 'Not confirmed', tone: 'red' },
      { label: 'Runs reaching the target', value: '4/5 vs 1/5', tone: 'cyan' },
    ],
    links: [{ label: 'GitHub', url: 'https://github.com/RomanJahandideh/environmental-massing-agents' }],
    media: [
      { diagram: 'agents', caption: 'Agents argue, code scores' },
      { diagram: 'seeds', caption: 'Two searches' },
    ],
    purpose: 'Agent roles around one evaluator box; search runs against the target, with “not faster” in red.',
    notes: [
      'Fourth, performance critique. Agents propose and critique; deterministic evaluators score. I expected guided search to be faster. It was not, but it was more reliable: four of five runs against one of five. The models are simplified and the live language-model loop has not run. More agents do not automatically give better design.',
    ],
  },

  // ── Directions ─────────────────────────────────────────────────────────────
  {
    id: 'state-of-art',
    chapter: 'PhD directions',
    scene: 'stateofart',
    layout: 'band',
    kicker: 'State of the art → open research problem',
    title: 'What already exists—and the missing link',
    lines: ['Existing systems can translate design intentions into parametric operations, connect language models to professional design tools, and invoke environmental or building-performance analysis. The unresolved challenge is maintaining valid, traceable and contestable evidence while the design, assumptions and tools continue to change.'],
    media: [{ diagram: 'soa', caption: 'Selected precedents, 2020 to 2026, grouped by research capability' }],
    purpose: 'A neutral map of the field by capability, with works named by title and venue (full citations in the drawer), leading to a cautiously worded open research problem.',
    notes: [
      'I arrived at these directions by looking across computational design, building-performance simulation and HCI. What I found interesting is that the individual capabilities increasingly exist: language connected to parametric operations, agents that configure and run energy simulation, structured text-to-CAD, mixed-initiative co-creation, and links between design environments.',
      'But the connection between them is still fragile. Recent systems address individual parts of this workflow. Keeping performance evidence valid and traceable while geometry, assumptions and tools change, and leaving consequential decisions open to the designer, remains insufficiently resolved.',
    ],
  },
  {
    id: 'platform',
    chapter: 'PhD directions',
    scene: 'phd',
    layout: 'band',
    kicker: 'Proposed PhD research · one shared platform',
    title: 'Between the designer’s intention and the final decision',
    lines: ['Three possible doctoral directions built on one shared platform for human-AI performance co-design. The language model interprets, plans and explains; validated tools calculate.'],
    media: [{ diagram: 'platform', caption: 'Shared doctoral platform; the numbers mark where each direction puts its weight' }],
    purpose: 'The shared pipeline from designer intent to the comparison and revision interface, the three emphases marked, the rule that the language model does not calculate, and a bounded first case.',
    notes: [
      'The important research space is not only the generated form. It is the system between a designer’s intention and the final decision: how intentions become structured operations, how tools calculate performance, how evidence stays attached to the right model state, and how designers keep the ability to question and revise the result.',
      'I do not want the language model to replace the performance engine or the designer. It interprets intention, coordinates tools and explains alternatives; validated software calculates. These are not three systems I am promising to build together, but three possible doctoral emphases on one shared foundation.',
    ],
  },
  {
    id: 'direction-1',
    chapter: 'PhD directions',
    scene: 'phd',
    layout: 'band',
    kicker: 'Proposed PhD research · Direction 1 · strongest start',
    title: DIRECTIONS[0]!.name,
    lines: [DIRECTIONS[0]!.question],
    facts: [{ label: 'Working title', value: DIRECTIONS[0]!.workingTitle, tone: 'proposal' }],
    media: [{ diagram: 'dir1', caption: 'Proposed system with the evidence graph highlighted; evaluation; contribution' }],
    purpose: 'Direction 1: the seven-part system with the evidence graph highlighted, what is new, technical benchmark and designer study, proposed contribution and its research foundation.',
    notes: [
      'The first direction is an evidence-aware co-designer, and it is my strongest starting point because it connects editable geometry, deterministic calculation, AI planning and the designer’s ability to verify and revise. If the AI changes the geometry, the system should know which previous simulation results are no longer valid, and not explain an old result as if it still belongs to the current design.',
      'So every performance claim would link to its geometry, parameters, weather file, tool version, settings and units. If a designer asks to make a courtyard more open but keep summer comfort, the AI proposes editable changes, the designer approves, the model updates, the analysis reruns, and the old result is marked stale with a reason.',
      'I would test it with a benchmark of edits, failed tool calls and stale results, then with designers, against an ordinary chat-and-simulation workflow.',
    ],
  },
  {
    id: 'direction-2',
    chapter: 'PhD directions',
    scene: 'phd',
    layout: 'band',
    kicker: 'Proposed PhD research · Direction 2',
    title: DIRECTIONS[1]!.name,
    lines: [DIRECTIONS[1]!.question],
    facts: [{ label: 'Working title', value: DIRECTIONS[1]!.workingTitle, tone: 'proposal' }],
    media: [{ diagram: 'dir2', caption: 'Proposed system with the agency controller highlighted; evaluation; contribution' }],
    purpose: 'Direction 2: the seven-part system with the agency controller highlighted; permissions that shift with consequence, reversibility, confidence, evidence quality, stage and preference; three agency conditions; proposed contribution.',
    notes: [
      'The second direction asks when the AI should act and when it should stop and ask. I want the designer to be able to negotiate the AI’s role instead of giving it one fixed level of autonomy.',
      'Fixed modes, from inspecting to executing, already exist in design tools, so the modes themselves are not the contribution. The question is whether permissions can shift with consequence, reversibility, confidence, evidence quality, design stage and the designer’s preference. For example, the AI may explore shading depths freely but must ask before changing the footprint.',
      'I would compare fixed low autonomy, fixed high autonomy and negotiated agency, on real models with real analysis.',
    ],
  },
  {
    id: 'direction-3',
    chapter: 'PhD directions',
    scene: 'phd',
    layout: 'band',
    kicker: 'Proposed PhD research · Direction 3',
    title: DIRECTIONS[2]!.name,
    lines: [DIRECTIONS[2]!.question],
    facts: [{ label: 'Working title', value: DIRECTIONS[2]!.workingTitle, tone: 'proposal' }],
    media: [{ diagram: 'dir3', caption: 'Proposed system with the deliberation interface highlighted; evaluation; contribution' }],
    purpose: 'Direction 3: the seven-part system with the deliberation and conflict view highlighted; what separates it from an ordinary multi-agent workflow; three deliberation conditions; proposed contribution.',
    notes: [
      'The third direction treats performance design as a real disagreement between priorities. Instead of hiding that disagreement inside one score, specialist agents would show their evidence and let the designer decide how the trade-off should shape the project.',
      'Multi-agent design systems already exist, so more agents is not the point. Here every agent must call a deterministic tool and cite its result. I would start with two domains, for example daylight and energy. If the daylight agent wants a larger opening and the energy agent warns about cooling, the system shows both claims, links them to the opening size, generates bounded alternatives, and asks the designer how to weigh them.',
      'I would compare a single agent, hidden multi-agent agreement and visible deliberation. It is the most ambitious of the three, and the riskiest technically.',
    ],
  },
  {
    id: 'compare',
    chapter: 'PhD directions',
    scene: 'phd',
    layout: 'band',
    kicker: 'Three alternatives · for discussion',
    title: 'Comparing the three directions',
    lines: ['My strongest current starting point is Direction 1, but I would value your perspective on which research question has the greatest doctoral potential and where a focused first system should begin.'],
    media: [{ diagram: 'compare', caption: 'Nine criteria; three alternative dissertation emphases' }],
    purpose: 'Side-by-side comparison; Direction 1 marked as the current starting point without being chosen permanently.',
    notes: [
      'Side by side: the first is about whether evidence stays valid, the second about who holds control, the third about competing objectives. All three share one platform and end with a human decision.',
      'My strongest current starting point is evidence continuity, but I am open to refining the question based on supervisory guidance, feasibility and the most valuable research gap.',
    ],
  },

  // ── Research fit ───────────────────────────────────────────────────────────
  {
    id: 'genenv',
    chapter: 'Research fit',
    scene: 'genenv',
    layout: 'band',
    kicker: 'Research fit',
    title: 'Where my research path converges',
    lines: ['My path has moved from architecture and landscape systems to interactive environments, HCI and AI-assisted design. I now want to bring these areas together in one rigorous research direction focused on how designers and computational systems can reason through performance without hiding evidence or removing human judgment.'],
    media: [{ diagram: 'confluence', caption: 'My starting point, the shared question, what I hope to develop' }],
    purpose: 'Convergence: Roman’s starting point (design and systems; interactive systems and projects) into the shared question, then what he hopes to develop; the three directions as alternative starting positions.',
    notes: [
      'I bring design judgment from architecture and landscape, GIS and systems thinking, VR and Unity development, HCI studies and early research projects. What I hope to develop is deeper Rhino and Grasshopper work, structured AI-to-tool communication, validated performance analysis and verification methods, so that one of these directions becomes a focused doctoral system.',
    ],
  },

  // ── Conversation ───────────────────────────────────────────────────────────
  {
    id: 'conversation',
    chapter: 'Conversation',
    scene: 'conversation',
    layout: 'questions',
    title: 'Thank you',
    lines: ['I would value your guidance on where to begin.'],
    links: [
      { label: 'romanjahandideh.com', url: 'https://romanjahandideh.com' },
      { label: 'github.com/RomanJahandideh', url: 'https://github.com/RomanJahandideh' },
    ],
    questions: [
      'Which emphasis has the greatest doctoral potential: evidence, agency or deliberation?',
      'Which performance tools, datasets and design cases would make the strongest first testbed?',
      'Which first contribution would be most valuable: the benchmark and protocol, a validated domain prototype, or the human-AI study?',
    ],
    media: [{ diagram: 'atlas-full' }],
    purpose: 'Three questions beside the resolved research map.',
    notes: [
      'Thank you. Three questions. Which of the three emphases, evidence, agency or deliberation, has the greatest doctoral potential? Which tools, datasets and design cases would make the strongest first testbed? And which first contribution would be most valuable: the protocol, a validated prototype, or the study with designers?',
    ],
  },
] as const;

/** Chapters in story order, each with the index of its first slide. */
export const CHAPTERS: readonly { name: string; first: number; count: number }[] = SLIDES.reduce<{ name: string; first: number; count: number }[]>((acc, s, i) => {
  const last = acc[acc.length - 1];
  if (last && last.name === s.chapter) last.count += 1;
  else acc.push({ name: s.chapter, first: i, count: 1 });
  return acc;
}, []);

/** All scroll positions, in order. */
export const STEPS: readonly Step[] = SLIDES.map((s) => ({
  id: s.id,
  scene: s.scene,
  title: s.title,
  notes: s.notes ?? [...(s.lines ?? []), ...(s.callout ? [s.callout.text] : []), ...(s.caveat ? [s.caveat] : [])],
}));

export const STEP_COUNT = STEPS.length;

/** Words in a step's notes (same counter as scripts/docs.mjs). */
export function noteWords(i: number): number {
  return (STEPS[i]?.notes ?? []).reduce((a, p) => a + (p.match(/[\p{L}\p{N}][\p{L}\p{N}’'.%,-]*/gu) ?? []).length, 0);
}

/** Target start time of each step in seconds, at the middle pace plus transitions. */
export const START_AT: readonly number[] = STEPS.reduce<number[]>((acc, _s, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1]! + (noteWords(i - 1) / PACE.midWpm) * 60 + PACE.transitionSeconds);
  return acc;
}, []);
