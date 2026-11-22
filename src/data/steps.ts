import type { Slide, Step } from './types';
import { AGENDA } from './branches';

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
  { name: 'PhD directions', target: '5:15' },
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
    id: 'agenda',
    chapter: 'PhD directions',
    scene: 'phd',
    layout: 'band',
    kicker: 'Proposed PhD research · shared research problem',
    title: 'One research agenda, three possible branches',
    lines: [AGENDA, 'Carefully developed possibilities, not commitments; their novelty would be confirmed through a formal prior-art review.'],
    media: [{ diagram: 'agenda', caption: 'Branches are possibilities, not a ranking · each opens its own step' }],
    purpose: 'The shared problem as one trail (intention, tools, simulation, evidence, judgment) branching into three proposed directions shown as map layers: design risk, neighbourhood, time. Hover, Tab or keys 1 to 3 reveal each; Enter or click opens it.',
    notes: [
      'I arrived at these directions by looking across computational design, building-performance simulation and HCI. The individual capabilities increasingly exist, but the connection between design intention, professional tools, simulation, verified evidence and human judgment is still fragile. That connection is the shared research problem.',
      'From it I see three possible branches: risk, neighbourhood and time. They are carefully developed possibilities, not three commitments, and their novelty would need a formal prior-art review. I would value your view on which could best support your group’s ongoing research.',
    ],
  },
  {
    id: 'redteam',
    chapter: 'PhD directions',
    scene: 'phd',
    layout: 'band',
    kicker: 'Proposed research direction · design risk',
    title: 'AI Design Red-Team',
    lines: ['Simulations test the scenarios designers think to try. A red team searches for plausible ones they did not, then repairs verified weaknesses while protecting design intent.'],
    media: [{ diagram: 'redteam', caption: 'Evaluated against designer-selected scenario testing · expert review · design studies · interviews' }],
    purpose: 'Risk discovery: an apparently successful plaza, AI-proposed stress scenarios, a simulated weakness, protected intentions and a minimal repair, with illustrative before and after bars. Keys 1 to 3 switch original, failure and repair; 4 to 7 pick a scenario.',
    notes: [
      'The first branch is an AI Design Red-Team. Simulations usually test the scenarios a designer thinks to try, but a design can fail under combinations nobody chose: a heatwave during an evening event, a drought with irrigation off, a cooling failure at peak occupancy.',
      'The designer first marks what must be protected, such as the tree canopy, the view axis or the public seating. The AI proposes plausible stress scenarios; the simulation, not the language model, calculates what happens. If a weakness is verified, the AI proposes the smallest repair that fixes it without touching the protected intentions, and the simulation tests it again. The designer reviews the evidence and decides.',
      'I would compare it with ordinary designer-selected scenario testing, through expert review and design studies, looking at risk discovery, design quality, workload, trust and whether design intent survives.',
    ],
  },
  {
    id: 'externality',
    chapter: 'PhD directions',
    scene: 'phd',
    layout: 'band',
    kicker: 'Proposed research direction · neighbourhood',
    title: 'Neighbourhood Externality Co-Designer',
    lines: ['Improving one parcel can move shadow, heat, glare, wind or runoff onto its neighbours. This system makes those effects visible so people can negotiate them.'],
    media: [{ diagram: 'externality', caption: 'Evaluated by parcel-only vs neighbourhood-level design · realistic sites · stakeholder workshops' }],
    purpose: 'Six illustrative parcels; effects crossing boundaries for two AI alternatives and an AI-suggested compromise; a ledger of gains and burdens; human deliberation as the last stage. Keys 1 to 3 switch alternatives; 4 to 8 toggle layers.',
    notes: [
      'The second branch works at the scale of the neighbourhood. Most performance tools evaluate one building or parcel at a time, but a design can move shadow, heat, glare, wind or runoff onto its neighbours. Improving one parcel can move the problem somewhere else.',
      'This system would import several parcels and their priorities, let AI propose alternatives, simulate the effects across boundaries, and map who gains and who carries burdens. Negotiation agents could suggest compromises, like this stepped massing with a green roof. But the system does not decide what is fair: it keeps measured results, stakeholder preferences, AI suggestions and human decisions separate, and people make the final choice.',
      'I would compare parcel-only and neighbourhood-level design on realistic sites, and run workshops with designers, planners or community participants, including the disagreements that stay unresolved.',
    ],
  },
  {
    id: 'living',
    chapter: 'PhD directions',
    scene: 'phd',
    layout: 'band',
    kicker: 'Proposed research direction · time',
    title: 'Living Environment Co-Designer',
    lines: ['Trees grow, materials weather, use changes and climate shifts. Instead of one optimal design, the system proposes an adaptive pathway with thresholds and intervention points.'],
    media: [{ diagram: 'living', caption: 'Evaluated by static vs adaptive pathways · long-term cases · expert review · sensitivity analysis' }],
    purpose: 'An illustrative courtyard section across forty years beside an illustrative heat-stress chart: threshold, intervention point, static design vs adaptive pathway, widening uncertainty. Keys 1 to 5 move in time; 6 and 7 switch static and adaptive.',
    notes: [
      'The third branch is about time. Projects are usually designed and evaluated as if they were static, but trees grow, materials weather, use changes and the climate shifts. A design that performs well today may not in twenty years.',
      'Instead of one optimal design, this system would propose an adaptive pathway: how the place may change, when performance may cross a limit the designer sets, which indicators to monitor, and when to act. Here young trees cannot keep up with warmer summers, so around the threshold the pathway adds temporary shade and permeable paving until the canopy matures. The hatching shows uncertainty growing with time: the aim is to prepare for change, not to predict it.',
      'I would compare static optimisation with adaptive pathways on long-term cases, with sensitivity analysis and studies with designers.',
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
      'Which branch has the greatest doctoral potential: risk, neighbourhood or time?',
      'Which performance tools, datasets and design cases would make the strongest first testbed?',
      'Which first contribution would be most valuable: the benchmark and protocol, a validated domain prototype, or the human-AI study?',
    ],
    media: [{ diagram: 'atlas-full' }],
    purpose: 'Three questions beside the resolved research map.',
    notes: [
      'Thank you. Three questions. Which of the three branches, risk, neighbourhood or time, has the greatest doctoral potential? Which tools, datasets and design cases would make the strongest first testbed? And which first contribution would be most valuable: the protocol, a validated prototype, or the study with designers?',
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
