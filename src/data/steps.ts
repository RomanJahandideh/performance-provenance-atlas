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
  { name: 'Opening', target: '1:30' },
  { name: 'Background', target: '4:08' },
  { name: 'Previous research', target: '3:50' },
  { name: 'Research projects', target: '4:20' },
  { name: 'PhD directions', target: '4:10' },
  { name: 'Research fit', target: '0:50' },
  { name: 'Conversation', target: '1:12' },
  { name: 'References', target: '0:00' },
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
      { label: 'Today', value: 'My research development · four research projects · three possible directions for discussion' },
    ],
    media: [{ diagram: 'atlas-open' }],
    purpose: 'Title, research identity, and the research map with the proposed PhD territory (three possible directions) drawn faintly.',
    cue: { sec: 40, demo: 'Let the map settle; point once along the line from left to right.', skip: 'Reading the map labels.' },
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
    media: [{ diagram: 'route', caption: 'Each stage, and what it carried forward' }],
    purpose: 'The question and the research area, then the route from making to human-AI co-design with one capability carried from each stage.',
    cue: { sec: 50, demo: 'Follow the route left to right in one gesture.', skip: 'Explaining each stage; the next steps do that.' },
    refs: ['liu-tian-2025', 'text2cad', 'aidl', 'moruzzi-chi2024'],
    notes: [
      'AI can already produce convincing spatial proposals. But a designer can only use one if they can see which rule it followed, how its performance was calculated, and what was assumed.',
      'The route that led me here runs from spatial design to environmental systems, human perception, interactive systems and computational design. I will show four research projects, then three possible directions for discussion.',
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
    lines: ['Build something, inspect how it works, test where it fails, and revise it.'],
    facts: [{ label: 'School', value: 'NODET, National Organization for Development of Exceptional Talents' }],
    media: [{ src: 'assets/photos/childhood.jpg', caption: 'Already taking things apart', alt: 'Roman as a child in a kitchen, opening a drawer to see what is inside.' }],
    purpose: 'One childhood photograph, NODET schooling, and one idea: making as a way of understanding.',
    cue: { sec: 30, demo: 'None.', skip: 'Childhood details beyond the research habit.' },
    notes: [
      'I learn by making. As a child I took things apart to see how they worked. I then studied at NODET, the national schools for exceptional talents, where mathematics and science came early. That became a research habit I still use: build something, inspect how it works, test where it fails, and revise it.',
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
    media: [{ src: 'assets/photos/tabriz-2.webp', caption: 'Tabriz Art University', credit: 'Ashkan najar · CC BY-SA 4.0', alt: 'Brick buildings and a blossoming tree on the campus.' }],
    purpose: 'Tabriz campus; the degree; why architecture.',
    cue: { sec: 28, demo: 'None.', skip: 'School history.' },
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
    cue: { sec: 35, demo: 'Point to the three angled forms.', skip: 'Floor-plan details.' },
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
    cue: { sec: 25, demo: 'Plan, then section.', skip: 'Room-by-room programme.' },
    notes: [
      'Zangar taught me to translate an abstract narrative into spatial operations: plans, sections, circulation, light and material form, so the building itself tells the history.',
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
    cue: { sec: 30, demo: 'None.', skip: 'Competition rules and juries.' },
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
      { src: 'assets/photos/tabriz-1.webp', caption: 'Tabriz Art University', credit: 'Zahra Multimedia · CC BY-SA 4.0', alt: 'A brick tower on the Tabriz Art University campus at sunset.' },
      { src: 'assets/photos/itu-2.webp', caption: 'Istanbul Technical University', credit: 'CeeGee · CC BY-SA 3.0', alt: 'The Taşkışla building of Istanbul Technical University.' },
    ],
    purpose: 'Tabriz and Istanbul side by side: the move from composing objects to reading systems.',
    cue: { sec: 30, demo: 'None.', skip: 'Course list.' },
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
    cue: { sec: 35, demo: 'Trace the water down the slope with the pointer, left image to right.', skip: 'Cistern sizing.' },
    refs: ['liu-third-simulation-2020'],
    refsSee: true,
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
    lines: ['I used Midjourney to explore landscapes and atmospheres from text prompts.', 'The images appeared quickly and looked convincing, but they did not carry a reliable site, scale, rule set, editable operation, or evidence that a designer could inspect.'],
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
    cue: { sec: 35, demo: 'None.', skip: 'Prompts and tool settings; this is not the PhD direction.' },
    refs: ['liu-planting-2024'],
    refsSee: true,
    notes: [
      'During my master’s in Istanbul I also experimented with Midjourney, generating landscapes and atmospheres from text prompts. The images appeared quickly and looked convincing, but they carried no reliable site, scale, rule set, editable operation or evidence I could inspect.',
      'Image generation is not my PhD direction. That limit is why I became interested in accountable, tool-connected human-AI co-design.',
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
    lines: ['Question: do colour and transparency change perceived depth in VR?', 'At high transparency, cool and dark colours looked nearer. How space is represented affects how space is judged.'],
    callout: { label: 'For a designer’s toolset', text: 'VR tool guidance so a landscape reads at the intended depth.' },
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
    cue: { sec: 65, demo: 'Point to the transparency levels, then the reversal.', skip: 'Statistical method unless asked.' },
    refs: ['ecaade2023'],
    notes: [
      'In the Virtual Landscape Lab with Dr. Ikhwan Kim, I studied a problem designers face in VR: depth does not always read as intended. Sixty people each made 264 depth judgments across four transparency levels and twelve colour conditions. At high transparency the usual rule reversed.',
      'The study taught me that a design interface is not neutral. Its representation can influence human judgment, so future AI-assisted tools must be evaluated not only for accuracy but also for how designers understand and use their outputs.',
    ],

  },
  {
    id: 'build-and-study',
    chapter: 'Previous research',
    scene: 'trajectory',
    layout: 'band',
    kicker: 'Previous research · SFU, iViz Lab',
    title: 'Learning to build and evaluate interactive computational systems',
    lines: ['At SFU’s iViz Lab I learned to carry a design question through Unity and C# development, data pipelines, sensing and interfaces, then experiments, user studies, analysis and publication.'],
    facts: [
      { label: 'Degree', value: 'MSc, Interactive Arts and Technology' },
      { label: 'Teaching assistant', value: 'IAT 313 · IAT 343 · IAT 102' },
    ],
    media: [
      { diagram: 'capability', caption: 'One question, carried end to end' },
      { src: 'assets/photos/sfu-2.webp', caption: 'SFU Surrey', credit: 'Canmenwalker · CC BY 4.0', alt: 'The multi-storey atrium of the Simon Fraser University Surrey campus, with a timber roof structure.' },
      { src: 'assets/photos/teach-iat343.jpg', caption: 'Teaching Maya · IAT 343', alt: 'Roman teaching 3D modeling in Maya in front of a projected screen.' },
    ],
    purpose: 'From spatial design to interactive-system research: the capability chain from question to publication, the SFU Surrey atrium and one teaching photo.',
    cue: { sec: 55, demo: 'Follow the chain from question to publication.', skip: 'Course numbers.' },
    refs: ['ecaade2023', 'iss2026'],
    notes: [
      'Midjourney showed me what a generative system could produce, but not how to build or evaluate one. At SFU, in Prof. Steve DiPaola’s iViz Lab, I learned to carry a question the whole way: interactive 3D systems in Unity and C#, data pipelines in Python and JavaScript, sensing and interfaces, then experimental design, user studies, statistical and qualitative analysis, and the paper.',
      'An AI course there deepened my interest in responsible human-AI systems. I also teach as a TA in three SIAT courses, and last week ran a Unity workshop.',
    ],

  },
  {
    id: 'hci',
    chapter: 'Previous research',
    scene: 'foundation',
    layout: 'figure',
    kicker: 'Previous research · HCI studies',
    title: 'How a representation shapes trust',
    lines: ['ISS: a teammate’s heart rate shown as a halo was read above chance and teams helped faster, but people trusted plain numbers more.', 'BioTerrarium: an environment that responds to a person’s state; results provisional.'],
    facts: [
      { label: 'Halo states recognised (chance 25%)', value: '66.3%' },
      { label: 'Faster help', value: '3.90 s', tone: 'cyan' },
      { label: 'ACM International Conference on Interactive Surfaces and Spaces', value: 'ISS 2026, Turin · accepted' },
      { label: 'BioTerrarium', value: 'Under revision', tone: 'orange' },
    ],
    caveat: 'ISS: two lab studies (36 people; 12 teams); DOI live with the proceedings, 23 to 26 November 2026. BioTerrarium: 24 people; under revision, not published.',
    media: [
      { src: 'assets/papers/iss-halos.jpg', caption: 'ISS · 16 halo states', alt: 'Sixteen halo icons combining heart rate and heart rate variability.' },
      { src: 'assets/papers/bio-zones.jpg', caption: 'BioTerrarium · four body states', alt: 'Four terrarium scenes from calm to overdrive.' },
    ],
    purpose: 'Halo states and BioTerrarium zones; the trust trade-off as the headline, statuses kept small.',
    cue: { sec: 60, demo: 'Point to what was accepted and what is under revision.', skip: 'Statistics; keep to built, measured, accepted, under revision.' },
    refs: ['iss2026'],
    notes: [
      'Two physiological-computing studies. For ISS I built a body-worn sensing interface: a remote teammate’s heart rate appeared as a halo instead of numbers. People read it above chance and teams helped each other faster, but they trusted plain numbers more. That paper is accepted.',
      'BioTerrarium explores an environment that changes with a person’s state; its results are provisional and the manuscript is under revision. Together they taught me that a representation shapes understanding, support and trust, which matters for any AI design tool.',
    ],

  },
  {
    id: 'methods',
    chapter: 'Previous research',
    scene: 'foundation',
    layout: 'columns',
    kicker: 'Previous research · Human-centred methods',
    title: 'How I study people and systems',
    lines: ['Across my research I study how people perceive, interpret and act on representations, using controlled experiments, physiological sensing, validated questionnaires and interviews.'],
    columns: [
      { head: 'eCAADe 2023 · published', title: 'Controlled VR experiment', text: '60 participants; within-subject design (4 transparency × 6 hues × 2 luminance); 264 forced-choice pairwise comparisons each; Oculus Quest 2, Unreal Engine.' },
      { head: 'ISS 2026 · accepted', title: 'Lab studies with live sensing', text: 'Recognition study (36 participants) tested against chance; team study (12 three-person teams) with live Apple Watch heart rate, comparing cue conditions on support time.' },
      { head: 'BioTerrarium · under revision', title: 'Mixed methods', text: 'Counterbalanced within-subjects study (24 participants): heart rate and HRV, PANAS, Flow Short Scale, Mindful Attention Awareness Scale, and interviews.' },
      { head: 'Computational projects', title: 'Hypotheses stated first', text: 'Research questions and falsifiable hypotheses written before running; deterministic benchmarks and unit tests; results reported even when a hypothesis was not confirmed.' },
    ],
    refs: ['ecaade2023', 'iss2026'],
    purpose: 'Four columns: the methods behind each study and project, with status kept small and honest.',
    cue: { sec: 50, demo: 'Point across the four columns, left to right.', skip: 'Statistical details unless asked.' },
    notes: [
      'Across these studies I have used a range of human-centred methods: a controlled within-subject experiment in VR with sixty participants, lab studies with live physiological sensing and teams, and a mixed-methods study combining heart rate, validated questionnaires and interviews.',
      'In my computational projects I state the research questions and hypotheses before running anything, and I report results even when a hypothesis is not confirmed. These are the methods I would bring to studying how designers work with AI.',
    ],
  },

  // ── Research projects ──────────────────────────────────────────────────────
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
    media: [{ diagram: 'zlaflow', caption: 'Keys 1 · 2: answered or not covered' }],
    purpose: 'Opens the four research projects. The retrieve, answer, verify pipeline with two cases: answered from a cited clause, and “not covered” when the bylaw is silent.',
    cue: { sec: 65, demo: 'Press 1 (answered from a clause), then 2 (not covered).', skip: 'Prompt design.' },
    notes: [
      'I built four computational-design projects to investigate how regulations, editable geometry, spatial constraints, simulations and AI agents might work together.',
      'The first is about regulation. The assistant retrieves the relevant clause, answers only from it, and verifies the answer. Asked the front setback, it quotes the clause; code computes the buildable footprint. Asked how many storeys a laneway house may have, it reports “not covered” and stops. It uses ten clauses of one zone and is not planning advice.',
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
      evidence: 'One value, the rental condition, updates every dependent part: FSR 0.70 to 1.00.',
      limit: 'A research prototype, not code-compliance software.',
      lesson: 'AI output should stay symbolic and editable.',
    },
    links: [
      { label: 'Live system', url: 'https://romanjahandideh.github.io/parametric-massing-generator/' },
      { label: 'GitHub', url: 'https://github.com/RomanJahandideh/parametric-massing-generator' },
    ],
    media: [{ diagram: 'pmgflow', caption: 'Phrase, rule, parameter, geometry · keys 1 · 2' }],
    purpose: 'The bylaw phrase, the extracted rule, the editable parameter and the geometry, linked: the rental condition moves FSR from 0.70 to 1.00 and the worked example from one floor to two.',
    cue: { sec: 65, demo: 'Press 1, then 2: FSR 0.70 to 1.00, one floor to two.', skip: 'Every setback value.' },
    refs: ['req2cad-chi2026', 'liu-tian-2025'],
    refsSee: true,
    notes: [
      'Second, geometry. The AI does not return a finished image. It extracts traceable parameters, each with its source phrase, and code builds the envelope from them.',
      'Here the rental condition moves the floor space ratio from 0.70 to 1.00, and the worked example grows from one floor to two. It is a research prototype, not code-compliance software.',
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
      built: 'Floor-by-floor clipping against the City’s open-data corridor; Rhino .3dm export.',
      evidence: '18 floors instead of 10, and 39.5% more floor area, in the documented test case.',
      limit: 'Base elevation and slope are placeholders. The Grasshopper step is written, not executed.',
      lesson: 'Methods and assumptions must travel with the result.',
    },
    links: [{ label: 'GitHub', url: 'https://github.com/RomanJahandideh/vancouver-view-corridor-massing' }],
    media: [{ diagram: 'corridor', caption: 'Flat cap against floor-by-floor trim' }],
    purpose: 'Section: the sloped view ceiling, the flat cap, then floor-by-floor trimming with live counts.',
    cue: { sec: 65, demo: 'Let the section play: sloped limit, flat cap, floor-by-floor trim.', skip: 'Geodetic processing; the rotation study unless asked.' },
    notes: [
      'Third, a spatial constraint. Protected views in Vancouver are sloped, but quick checks use a flat cap. Using the City’s open corridor data, clipping floor by floor gives 18 floors instead of 10 and 39.5 percent more floor area in the documented test case.',
      'The geometry exports to Rhino, but the base elevation and slope are placeholders, and the Grasshopper step is written but not executed. The method and its assumptions must travel with the result.',
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
      problem: 'Does directed, critique-driven search beat blind sampling?',
      built: 'Generator, critic and orchestrator agents over deterministic evaluators.',
      evidence: 'Not faster, but more reliable: directed search (NSGA-II, standing in for the agent loop) hit the target in 4/5 runs, random in 1/5.',
      limit: 'Simplified solar, benchmark carbon, a wind proxy; live LLM loop not run.',
      lesson: 'Agents interpret and critique; evaluators calculate.',
    },
    links: [{ label: 'GitHub', url: 'https://github.com/RomanJahandideh/environmental-massing-agents' }],
    media: [
      { diagram: 'agents', caption: 'Agents argue, code scores' },
      { diagram: 'seeds', caption: 'Two searches' },
    ],
    purpose: 'Agent roles around one evaluator box; search runs against the target, with “not faster” in red.',
    cue: { sec: 65, demo: 'Point from each agent to the evaluator it reads; end on the result.', skip: 'Hypervolume definition unless asked.' },
    refs: ['jin-esim2026', 'liu-tian-2025'],
    refsSee: true,
    notes: [
      'Fourth, performance critique, the project closest to this research area. A generator agent proposes massing, four critic agents interpret it, and an orchestrator directs the next round, but deterministic evaluators calculate every score.',
      'I expected directed search to be faster. It was not, but it was more reliable: four of five runs reached the target against one of five. The evaluators are simplified, carbon is a benchmark, wind is a proxy, and the live language-model loop was not run.',
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
    cue: { sec: 45, demo: 'Hover or press 1, 2, 3 on the branches; do not open them here.', skip: 'Weighing the branches against each other; they are not ranked.' },
    refs: ['liu-tian-2025', 'energyplus-mcp-2025', 'li-mcp-bem-2026', 'optimuse', 'maier-chi2026'],
    refsSee: true,
    notes: [
      'I arrived at these directions by looking across computational design, building-performance simulation and HCI. The capabilities increasingly exist, but the connection between design intention, professional tools, simulation, verified evidence and human judgment is still fragile.',
      'The principle is simple: AI suggests, simulation calculates, people decide. These are three possible ways into that one agenda, not three commitments, and their novelty would need a formal prior-art review.',
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
    cue: { sec: 70, demo: 'Press 1, 2, 3: problem, proposed system, designer decides.', skip: 'Simulation engine names.' },
    refs: ['eplus-agent', 'li-mcp-bem-2026', 'moruzzi-chi2024'],
    refsSee: true,
    notes: [
      'The first is an AI Design Red-Team. Simulations usually test the scenarios a designer already knows to try; a design can still fail under combinations nobody chose, like a heatwave during an evening event.',
      'The AI proposes plausible stress scenarios, and the simulation, not the language model, calculates what happens. If a weakness is verified, the AI proposes the smallest repair that protects what the designer marked: the trees, the view axis, the seating, the library access. The designer then accepts, revises or rejects it.',
      'I would compare it with ordinary scenario testing, through expert review and design studies.',
    ],
  },
  {
    id: 'externality',
    chapter: 'PhD directions',
    scene: 'phd',
    layout: 'band',
    kicker: 'Proposed research direction · neighbourhood',
    title: 'Neighbourhood Externality Co‑Designer',
    lines: ['Improving one parcel can move shadow, heat, glare, wind or runoff onto its neighbours. This system makes those effects visible so people can negotiate them.'],
    media: [{ diagram: 'externality', caption: 'Evaluated by parcel-only vs neighbourhood-level design · realistic sites · stakeholder workshops' }],
    purpose: 'Six illustrative parcels; effects crossing boundaries for two AI alternatives and an AI-suggested compromise; a ledger of gains and burdens; human deliberation as the last stage. Keys 1 to 3 switch alternatives; 4 to 8 toggle layers.',
    cue: { sec: 70, demo: 'Press 1, 2, 3; optionally switch a layer off with 4 to 8.', skip: 'Parcel numbers; they are illustrative.' },
    refs: ['jin-esim2026', 'liu-tian-2025'],
    refsSee: true,
    notes: [
      'The second works at the scale of the neighbourhood. Most tools evaluate one parcel at a time, but a design can move shadow, heat, glare, wind or runoff onto its neighbours.',
      'This system would simulate those effects across boundaries, show where priorities conflict, and let AI suggest alternatives, like stepped massing with a green roof. It shows trade-offs; it does not calculate fairness. People decide.',
      'I would compare parcel-only and neighbourhood-level design on realistic sites, and in workshops with designers, planners or community members.',
    ],
  },
  {
    id: 'living',
    chapter: 'PhD directions',
    scene: 'phd',
    layout: 'band',
    kicker: 'Proposed research direction · time',
    title: 'Living Environment Co‑Designer',
    lines: ['Trees grow, materials weather, use changes and climate shifts. Instead of one optimal design, the system proposes an adaptive pathway with thresholds and intervention points.'],
    media: [{ diagram: 'living', caption: 'Evaluated by static vs adaptive pathways · long-term cases · expert review · sensitivity analysis' }],
    purpose: 'An illustrative courtyard section across forty years beside an illustrative heat-stress chart: threshold, intervention point, static design vs adaptive pathway, widening uncertainty. Keys 1 to 5 move in time; 6 and 7 switch static and adaptive.',
    cue: { sec: 65, demo: 'Press 1, 3, 4, 5 through time; 6 then 7 for static versus adaptive.', skip: 'Curve values; they are illustrative.' },
    refs: ['liu-third-simulation-2020', 'liu-planting-2024'],
    refsSee: true,
    notes: [
      'The third is about time. Trees grow, materials weather, use changes and the climate shifts, so a design that works today may not in twenty years.',
      'Instead of one optimal design, the system would propose an adaptive pathway: when performance may cross a limit the designer chooses, what to monitor, and when to act. Here the threshold arrives before the canopy matures, so the pathway adds temporary shade and permeable paving. The widening band is uncertainty: it prepares for change rather than predicting it.',
      'I would compare static and adaptive design on long-term cases, with sensitivity analysis.',
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
    lines: ['My path now converges on one question: how designers and computational systems can reason through performance without hiding evidence or removing human judgment.'],
    media: [{ diagram: 'confluence', caption: 'What I bring, the shared question, what I hope to develop' }],
    purpose: 'Convergence: Roman’s starting point (design and systems; interactive systems and projects) into the shared question, then what he hopes to develop; the three directions as alternative starting positions.',
    cue: { sec: 50, demo: 'Let the three parts appear; rest on the shared question.', skip: 'Listing every skill.' },
    refs: ['gh-vr', 'optimuse', 'maier-chi2026'],
    refsSee: true,
    notes: [
      'I began by designing physical spaces, learned to understand landscape as an environmental system, studied how people perceive virtual space, learned to build and evaluate interactive systems, and then developed AI-assisted computational-design projects. These now converge in one question: how people and AI can design together while keeping evidence and judgment visible.',
      'What I hope to develop is deeper Rhino and Grasshopper work, structured AI-to-tool communication, validated performance analysis and verification methods, in one focused doctoral system.',
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
    media: [{ diagram: 'atlas-full' }],
    purpose: 'Thank you, links, and the resolved research map; the conversation is spoken, not on screen.',
    cue: { sec: 72, demo: 'Stop here and invite the conversation; listen.', skip: 'Summarising the talk again.' },
    notes: [
      'Thank you. I would value your guidance on where to begin.',
    ],

  },
  {
    id: 'references',
    chapter: 'References',
    scene: 'phd',
    layout: 'references',
    kicker: 'References',
    title: 'Works cited',
    purpose: 'Every work cited on the slides, in APA style, generated from the citations.',
    cue: { sec: 0, demo: 'Only if asked; leave the conversation slide up.', skip: 'Reading the list.' },
    notes: [],
  },
  {
    id: 'colophon',
    chapter: 'References',
    scene: 'conversation',
    layout: 'band',
    kicker: 'Behind this presentation',
    title: 'Every claim can be traced',
    lines: ['This talk follows its own argument: each number links to an evidence record and its source, and each citation to a published paper. Press S on any slide to see them; click a square to jump to that step.'],
    media: [{ diagram: 'colophon', caption: 'The talk as a traceable map · click any step' }],
    purpose: 'A closing map of the whole talk: every step as a square, with what it cites and what it lets you do, built from the presentation data itself.',
    cue: { sec: 0, demo: 'Only if there is time or interest; click a square to revisit a step.', skip: 'Explaining the code.' },
    notes: [],
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

/** Target start time of each step in seconds: the planned time per step (cue), which includes demonstrations. */
export const START_AT: readonly number[] = SLIDES.reduce<number[]>((acc, _sl, i) => {
  const prev = SLIDES[i - 1];
  acc.push(i === 0 ? 0 : acc[i - 1]! + (prev?.cue?.sec ?? (noteWords(i - 1) / PACE.midWpm) * 60 + PACE.transitionSeconds));
  return acc;
}, []);
