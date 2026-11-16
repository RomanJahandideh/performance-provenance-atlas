import type { Slide, Step } from './types';

/**
 * The talk as one story, told toward the Generative Environments Lab: from
 * making things as a child, through architecture, landscape and SFU, to the
 * research Roman is doing now and the direction he would continue at GenEnv.
 * One scroll = one slide. The slide text is the script.
 * Writing rules: plain sentences, no dashes, MSc (not MA).
 * Image credits: docs/ASSET_MANIFEST.md.
 */
export const SLIDES: readonly Slide[] = [
  // ── Opening ────────────────────────────────────────────────────────────────
  {
    id: 'opening',
    chapter: 'GenEnv',
    scene: 'opening',
    layout: 'title',
    kicker: 'PhD interview · Generative Environments Lab · UBC SALA',
    title: 'Designing environments with people and AI',
    lines: ['How I came to the question GenEnv is asking: how people and AI can design constructed environments together, with performance in view.'],
  },

  // ── Making ─────────────────────────────────────────────────────────────────
  {
    id: 'childhood',
    chapter: 'Making',
    scene: 'trajectory',
    layout: 'cantilever',
    title: 'It started with making things',
    lines: [
      'I have been making things since I was a child.',
      'Building something new always made me wonder how it works and how people will use it. That question is still at the center of my work.',
    ],
    media: [{ src: 'assets/photos/childhood.jpg', caption: 'Already taking things apart', alt: 'Roman as a child in a kitchen, opening a drawer to see what is inside.' }],
  },
  {
    id: 'nodet',
    chapter: 'Making',
    scene: 'trajectory',
    layout: 'statement',
    title: 'NODET schools',
    lines: [
      'For elementary and high school I studied at NODET, Iran’s national schools for exceptionally talented students. Getting in meant passing competitive national exams.',
      'This is where I started learning hard algebra, physics, chemistry and differential calculus, from elementary school on.',
    ],
    facts: [
      { label: 'Years', value: '2004 to 2011' },
      { label: 'Level', value: 'Elementary and high school' },
      { label: 'Entry', value: 'Competitive national exams', tone: 'yellow' },
    ],
  },

  // ── Designing places ───────────────────────────────────────────────────────
  {
    id: 'tabriz',
    chapter: 'Designing places',
    scene: 'trajectory',
    layout: 'cantilever',
    title: 'From making things to designing places',
    lines: [
      'I love creating things that are completely new, so I chose architecture. It gave me the agency to make new things that have new effects on society.',
      'At Tabriz Art University I won several interschool design competitions.',
    ],
    facts: [
      { label: 'Degree', value: 'B.Arch' },
      { label: 'Years', value: '2011 to 2016' },
      { label: 'Thesis', value: 'Best Dissertation award', tone: 'yellow' },
    ],
    media: [{ src: 'assets/photos/tabriz-2.jpg', caption: 'Tabriz Art University', credit: 'Ashkan najar · CC BY-SA 4.0', alt: 'Brick buildings and a blossoming tree on the campus.' }],
  },
  {
    id: 'zangar',
    chapter: 'Designing places',
    scene: 'trajectory',
    layout: 'band',
    kicker: 'Designing places · Final project',
    title: 'Zangar Museum',
    lines: [
      'A museum about the people of Tabriz under three governments over about a hundred years.',
      'Each period became one sharp, angled form, so visitors read the history through the building itself.',
    ],
    media: [
      { src: 'assets/portfolio/p019.jpg', caption: 'Night view', alt: 'Portfolio page: night aerial render of the museum in the city.' },
      { src: 'assets/portfolio/p030.jpg', caption: 'Aerial view', alt: 'Portfolio page: aerial render with the plaza and patterned facade.' },
    ],
  },
  {
    id: 'zangar-plans',
    chapter: 'Designing places',
    scene: 'trajectory',
    layout: 'gallery',
    kicker: 'Zangar Museum',
    title: 'Concept, site and plans',
    lines: ['Galleries, art classes, an amphitheater, a library and a restaurant sit inside and between the three forms.'],
    media: [
      { src: 'assets/portfolio/p018.jpg', caption: 'Three periods, three forms', alt: 'Portfolio page: concept text and the three historical periods as three forms.' },
      { src: 'assets/portfolio/p023.jpg', caption: 'Floor plans', alt: 'Portfolio page: floor plans with galleries, depot, parking and amphitheater.' },
    ],
  },
  {
    id: 'zangar-sections',
    chapter: 'Designing places',
    scene: 'trajectory',
    layout: 'band',
    kicker: 'Zangar Museum',
    title: 'Elevations, section and interiors',
    lines: [
      'A patterned screen wraps the galleries, and the section steps around a green yard.',
      'Supervised by Prof. Parisa Hashempour, it was named the best dissertation of my class.',
    ],
    facts: [{ label: 'Award', value: 'Best Dissertation, 2016', tone: 'yellow' }],
    media: [
      { src: 'assets/portfolio/p026.jpg', caption: 'Elevations', alt: 'Portfolio page: north and west elevations.' },
      { src: 'assets/portfolio/p027.jpg', caption: 'Section', alt: 'Portfolio page: section through the galleries and green yard.' },
      { src: 'assets/portfolio/p028.jpg', caption: 'Interiors', alt: 'Portfolio page: interior renders of the galleries.' },
    ],
  },
  {
    id: 'cabin',
    chapter: 'Designing places',
    scene: 'trajectory',
    layout: 'figure',
    kicker: 'Designing places · Competition',
    title: 'A cabin that unfolds',
    lines: [
      'After graduating I entered architecture and design competitions. This one asked for temporary housing for people after a natural disaster.',
      'The panels fold out on hinges, and two people can lift them into place.',
    ],
    facts: [{ label: 'Memar News competition, 2018', value: 'Sixth prize' }],
    media: [
      { src: 'assets/portfolio/p101.jpg', caption: 'Cabins in the valley', alt: 'Portfolio page: foldable A-frame cabins in a mountain valley.' },
      { src: 'assets/portfolio/p102.jpg', caption: 'Plans and assembly', alt: 'Portfolio page: cabin plans and the stages of unfolding.' },
    ],
  },
  {
    id: 'photography',
    chapter: 'Designing places',
    scene: 'trajectory',
    layout: 'gallery',
    kicker: 'Designing places · Competition',
    title: 'How framing changes what we see',
    lines: [
      'Long exposures of the city at night. The blur hides objects and leaves only light, colour and depth.',
      'Competitions like these kept me focused on form and aesthetics.',
    ],
    facts: [
      { label: 'Abstract Photo of City, 2018', value: 'Winner', tone: 'yellow' },
      { label: 'Landscape design, Tabriz Art University, 2015', value: 'Second prize' },
    ],
    media: [
      { src: 'assets/portfolio/p105.jpg', caption: 'A Tunnel To Heaven', alt: 'Portfolio page: winning photograph “A Tunnel To Heaven”.' },
      { src: 'assets/portfolio/p106.jpg', caption: 'The Ghost of Playground', alt: 'Portfolio page: winning photograph “The Ghost of Playground”.' },
    ],
  },

  // ── Reading environments ───────────────────────────────────────────────────
  {
    id: 'why-landscape',
    chapter: 'Reading environments',
    scene: 'trajectory',
    layout: 'cantilever',
    title: 'Why landscape architecture',
    lines: [
      'In Tabriz I was so into form and aesthetic theory that I had forgotten how society and nature shape design.',
      'That is why I chose landscape architecture at Istanbul Technical University, where our focus was developing systems that help architects and landscape designers design with more effective tools.',
    ],
    facts: [
      { label: 'Degree', value: 'Master’s, Landscape Architecture' },
      { label: 'Years', value: '2020 to 2024' },
    ],
    media: [
      { src: 'assets/photos/tabriz-1.jpg', caption: 'Tabriz Art University', credit: 'Zahra Multimedia · CC BY-SA 4.0', alt: 'A brick tower on the Tabriz Art University campus at sunset.' },
      { src: 'assets/photos/itu-2.jpg', caption: 'Istanbul Technical University', credit: 'CeeGee · CC BY-SA 3.0', alt: 'The Taşkışla building of Istanbul Technical University.' },
    ],
  },
  {
    id: 'buyukada',
    chapter: 'Reading environments',
    scene: 'trajectory',
    layout: 'band',
    kicker: 'Reading environments · Büyükada',
    title: 'Designing with water',
    lines: [
      'At ITU I started using GIS to analyze environments and their data.',
      'On Büyükada, steep streets send rainwater and pollution straight down the slope, so the design starts from an analysis of the slope, the roads and the water.',
    ],
    media: [
      { src: 'assets/portfolio/p109.jpg', caption: 'Slope and roads', alt: 'Portfolio page: topography analysis and existing roads.' },
      { src: 'assets/portfolio/p117.jpg', caption: 'Where the water goes', alt: 'Portfolio page: section with water harvesting pools and terraces.' },
    ],
  },
  {
    id: 'water-system',
    chapter: 'Reading environments',
    scene: 'trajectory',
    layout: 'gallery',
    kicker: 'Reading environments · Büyükada',
    title: 'A system, not an object',
    lines: [
      'Roof collectors, rain barrels, cisterns, permeable paving and planted basins work together.',
      'Every housing unit uses the same techniques and connects down the hill to shared storage. I began to think of design as a system.',
    ],
    media: [
      { src: 'assets/portfolio/p121.jpg', caption: 'Techniques for each unit', alt: 'Portfolio page: roof collectors, rain barrels, cisterns and rain gardens.' },
      { src: 'assets/portfolio/p122.jpg', caption: 'Two connected units', alt: 'Portfolio page: two housing units with rain gardens and storage tanks.' },
    ],
  },
  {
    id: 'ecaade',
    chapter: 'Reading environments',
    scene: 'foundation',
    layout: 'figure-left',
    kicker: 'Reading environments · First paper',
    title: 'Seeing depth in virtual landscapes',
    lines: [
      'In the Virtual Landscape Lab with Dr. Ikhwan Kim, I tested how people judge depth in VR.',
      'When objects became very transparent, cool and dark colours looked closer than warm and bright ones. That is the opposite of the usual rule.',
    ],
    use: 'A VR design tool that knows this can help designers choose colour and transparency so a landscape reads the way they intend.',
    facts: [
      { label: 'Participants', value: '60' },
      { label: 'Judgments each', value: '264' },
      { label: 'Education and Research in Computer Aided Architectural Design in Europe', value: 'eCAADe 41, Graz, 2023', tone: 'cyan' },
    ],
    links: [{ label: 'DOI', url: 'https://doi.org/10.52842/conf.ecaade.2023.1.149' }],
    media: [
      { diagram: 'spheres', caption: 'Four transparency levels' },
      { diagram: 'colours', caption: 'Twelve colour conditions' },
    ],
  },
  {
    id: 'to-computation',
    chapter: 'Reading environments',
    scene: 'trajectory',
    layout: 'band',
    kicker: 'From Istanbul to Vancouver',
    title: 'Why I turned to computation',
    lines: [
      'GIS and VR showed me that environments can be analyzed, tested and measured as data.',
      'I felt a deep need to learn coding and how to develop systems myself before continuing my research in design and architecture. That led me to SFU.',
    ],
    media: [
      { src: 'assets/photos/itu-1.jpg', caption: 'Taşkışla, Istanbul', credit: 'SALT Online', alt: 'The Taşkışla building of Istanbul Technical University.' },
      { src: 'assets/photos/sfu-1.jpg', caption: 'SFU Surrey', credit: 'Northwest · CC BY 4.0', alt: 'SFU Surrey campus among the towers of Surrey Central.' },
    ],
  },

  // ── Building systems ───────────────────────────────────────────────────────
  {
    id: 'sfu',
    chapter: 'Building systems',
    scene: 'trajectory',
    layout: 'band',
    kicker: 'Building systems · SFU',
    title: 'Learning to build',
    lines: [
      'In 2025 I started a Master of Science at SFU’s School of Interactive Arts and Technology. I studied AI systems and learned to build prototypes and complete systems with Python, JavaScript, Unity and C#, and parametric tools with Grasshopper and Ladybug.',
      'I also teach. As a teaching assistant for IAT 313 Narrative and New Media, IAT 343 Animation and IAT 102 Graphic Design, I teach interactive environments, 3D modeling and animation. Last week I ran a workshop on Unity.',
    ],
    facts: [
      { label: 'Degree', value: 'MSc, Interactive Arts and Technology' },
      { label: 'Teaching assistant', value: 'Three courses', tone: 'yellow' },
      { label: 'Workshop', value: 'Unity, November 2026' },
    ],
    media: [
      { src: 'assets/photos/teach-iat343.jpg', caption: 'Teaching Maya · IAT 343', alt: 'Roman teaching 3D modeling in Maya in front of a projected screen.' },
      { src: 'assets/photos/teach-iat313.jpg', caption: 'Lab session · IAT 313', alt: 'Roman working with students at their laptops in a lab session.' },
    ],
  },
  {
    id: 'iviz',
    chapter: 'Building systems',
    scene: 'trajectory',
    layout: 'band',
    kicker: 'Building systems · iViz Lab',
    title: 'Two research areas',
    lines: [
      'In the iViz Lab with Prof. Steve DiPaola I worked on AI projects. Many of them were inspired by GenEnv’s work; I was following your lab closely at that time.',
      'They grew into the two areas I am researching now: how people read information in space, and how AI can help design within real constraints.',
    ],
    media: [
      { src: 'assets/papers/iss-apparatus.jpg', caption: 'People, bodies and information', alt: 'A study participant wearing an Apple Watch while playing.' },
      { src: 'assets/projects/vcm-hero.webp', caption: 'AI for design under constraints', alt: 'Stepped massing trimmed by a protected view corridor.' },
    ],
  },

  // ── Current research: people and information ──────────────────────────────
  {
    id: 'iss',
    chapter: 'Current research',
    scene: 'foundation',
    layout: 'figure',
    kicker: 'Current research · People and information',
    title: 'Reading a remote teammate’s body',
    lines: [
      'A teammate’s heart rate shown as a glowing halo instead of numbers.',
      'People recognised the halo states well above chance, and teams helped each other faster with it.',
    ],
    use: 'Design tools face the same question: how to show performance data so designers read it quickly and still trust it.',
    facts: [
      { label: 'Halo states recognised', value: '66.3%' },
      { label: 'Faster help', value: '3.90 s', tone: 'cyan' },
      { label: 'ACM International Conference on Interactive Surfaces and Spaces', value: 'ISS 2026, Turin', tone: 'cyan' },
    ],
    caveat: 'Players still trusted plain numbers more than the halo.',
    links: [{ label: 'DOI', url: 'https://doi.org/10.1145/3845796.3859311' }],
    media: [
      { src: 'assets/papers/iss-halos.jpg', caption: 'The 16 halo states', alt: 'Sixteen halo icons combining heart rate and heart rate variability.' },
    ],
  },
  {
    id: 'bioterrarium',
    chapter: 'Current research',
    scene: 'foundation',
    layout: 'gallery',
    kicker: 'Current research · People and information',
    title: 'When the body shapes the space',
    lines: [
      'In BioTerrarium an Apple Watch changes the fog, light and plants of a game world in under 200 milliseconds.',
      'The player’s physiological state becomes a force that shapes the environment around them.',
    ],
    use: 'It gives designers a way to test environments that respond to the people inside them.',
    facts: [
      { label: 'Study', value: '24 people, two conditions' },
      { label: 'Status', value: 'Under revision', tone: 'orange' },
    ],
    caveat: 'Submitted to SIGGRAPH 2026 and not accepted. I am revising it, so the results are not final.',
    media: [
      { src: 'assets/papers/bio-zones.jpg', caption: 'Four body states, four worlds', alt: 'Four terrarium scenes from calm to overdrive.' },
    ],
  },

  // ── Current research: AI for design under constraints ─────────────────────
  {
    id: 'constraints',
    chapter: 'Current research',
    scene: 'zla',
    layout: 'band',
    kicker: 'Current research · AI for design under constraints',
    title: 'AI that works within rules and performance',
    lines: [
      'My ongoing projects ask how AI can work with designers on real constraints: zoning, protected views and environmental performance.',
      'In each one, AI reads and suggests, code calculates, and the designer decides.',
    ],
    use: 'I find this the most useful kind of tool: it makes design easier by taking over the searching and checking, so designers can spend their time on design decisions.',
    media: [{ diagram: 'chain', caption: 'From rule to decision' }],
  },
  {
    id: 'zla',
    chapter: 'Current research',
    scene: 'zla',
    layout: 'figure-left',
    kicker: 'AI for design under constraints · Zoning',
    title: 'Reading zoning rules',
    lines: [
      'The Zoning Literacy Assistant finds the bylaw clauses that matter, answers only from them and checks its own answer.',
      'If the bylaw is silent, it says “not covered” and stops. Site areas are calculated in code, and the AI only explains them.',
    ],
    use: 'Designers get the rules that apply to their site without reading the whole bylaw, and never an invented one.',
    facts: [
      { label: 'Bylaw clauses', value: '10' },
      { label: 'Footprint, in code', value: '162.6 m²', tone: 'cyan' },
    ],
    caveat: 'Uses ten clauses of Vancouver’s R1-1 zone, not the full bylaw.',
    links: [
      { label: 'Live system', url: 'https://romanjahandideh.github.io/zoning-literacy-assistant/' },
      { label: 'GitHub', url: 'https://github.com/RomanJahandideh/zoning-literacy-assistant' },
    ],
    media: [{ diagram: 'notcovered', caption: 'Silence is reported, not guessed' }],
  },
  {
    id: 'pmg',
    chapter: 'Current research',
    scene: 'pmg',
    layout: 'figure',
    kicker: 'AI for design under constraints · Form',
    title: 'From rules to form',
    lines: [
      'In the Parametric Massing Generator, AI reads the bylaw and pulls out eight rules, each with its source sentence.',
      'Code turns them into a building envelope the designer can edit. Change one value and everything that depends on it updates.',
    ],
    use: 'Designers start from the legal envelope instead of drawing it by hand, and can see which rule shapes each face.',
    facts: [
      { label: 'Rules extracted', value: '8' },
      { label: 'Rental condition', value: '+1 storey', tone: 'yellow' },
    ],
    caveat: 'A research prototype, not advice on code compliance.',
    links: [
      { label: 'Live system', url: 'https://romanjahandideh.github.io/parametric-massing-generator/' },
      { label: 'GitHub', url: 'https://github.com/RomanJahandideh/parametric-massing-generator' },
    ],
    media: [
      { diagram: 'envelope', caption: 'Envelope from extracted rules' },
      { src: 'assets/projects/pmg-hero.webp', caption: 'Live system', alt: 'Massing volumes on an urban block with a plan inset.' },
    ],
  },
  {
    id: 'vcm',
    chapter: 'Current research',
    scene: 'vcm',
    layout: 'figure-left',
    kicker: 'AI for design under constraints · Views',
    title: 'Protected views as a design constraint',
    lines: [
      'Vancouver’s protected views are a sloped limit, not a flat cap. Checking each floor against the slope gives 18 floors instead of 10.',
      'Turning the footprint barely changes the area, so its angle can follow the program instead.',
    ],
    use: 'Designers see early how much they can build under a protected view, before the form is fixed.',
    facts: [
      { label: 'Floors', value: '10 → 18', tone: 'cyan' },
      { label: 'Floor area gained', value: '+39.5%', tone: 'yellow' },
    ],
    caveat: 'The corridor shape is real City data. Base height and slope are placeholders.',
    links: [{ label: 'GitHub', url: 'https://github.com/RomanJahandideh/vancouver-view-corridor-massing' }],
    media: [
      { diagram: 'rotation', caption: 'Rotation barely changes the area' },
      { src: 'assets/projects/vcm-hero.webp', caption: 'Massing trimmed by the corridor', alt: 'Stepped massing trimmed by the protected view corridor.' },
    ],
  },
  {
    id: 'ema',
    chapter: 'Current research',
    scene: 'ema',
    layout: 'figure',
    kicker: 'AI for design under constraints · Performance',
    title: 'Agents that critique performance',
    lines: [
      'Six AI roles suggest and critique designs for sun, carbon, wind and floor area, but code calculates every score.',
      'I expected guided search to be faster. It was not, but it was more reliable. I report both.',
    ],
    use: 'Designers get performance feedback while the massing is still open to change.',
    facts: [
      { label: 'Faster search', value: 'Not confirmed', tone: 'red' },
      { label: 'Runs that hit the target', value: '4/5 vs 1/5', tone: 'cyan' },
    ],
    caveat: 'Wind is a rough estimate, not CFD. Carbon uses benchmarks, not a full LCA. The live AI loop has not been run yet.',
    links: [{ label: 'GitHub', url: 'https://github.com/RomanJahandideh/environmental-massing-agents' }],
    media: [
      { diagram: 'seeds', caption: 'Two searches' },
      { src: 'assets/projects/ema-hero.webp', caption: 'Winter shadow and section', alt: 'Plan with a winter shadow beside a stepped section.' },
    ],
  },

  // ── Toward GenEnv ──────────────────────────────────────────────────────────
  {
    id: 'provenance',
    chapter: 'Toward GenEnv',
    scene: 'phd',
    layout: 'figure-left',
    kicker: 'Toward GenEnv · Proposed direction',
    title: 'Performance Provenance',
    lines: [
      'Together, my projects point to what is still missing: a record that links each AI-assisted design change to its rule, its evidence and the designer’s decision.',
      'This is the direction I would like to develop at GenEnv.',
    ],
    caveat: 'A direction for discussion. The scope and methods would be shaped with my supervisor.',
    media: [{ diagram: 'provenance', caption: 'What the record keeps for one design change' }],
  },
  {
    id: 'methods',
    chapter: 'Toward GenEnv',
    scene: 'phd',
    layout: 'columns',
    kicker: 'Toward GenEnv · Proposed direction',
    title: 'How it could be studied',
    lines: ['Four steps, each building on work I have already started.'],
    columns: [
      { head: 'Build', title: 'A co-design system', text: 'Join my current projects into one tool where every AI suggestion carries its record.' },
      { head: 'Test', title: 'Correct calculations', text: 'Check every computed value against known cases before anyone relies on it.' },
      { head: 'Compare', title: 'With and without', text: 'Study how designers work when the record is visible and when it is not.' },
      { head: 'Interview', title: 'Designers who use it', text: 'Learn where the record helps judgment and where it gets in the way.' },
    ],
  },
  {
    id: 'meets-genenv',
    chapter: 'Toward GenEnv',
    scene: 'genenv',
    layout: 'columns',
    kicker: 'Toward GenEnv',
    title: 'Where my path meets GenEnv',
    lines: ['GenEnv works on human and AI co-design for performance-aware constructed environments. Three parts of my path lead there.'],
    columns: [
      { head: 'Constructed environments', title: 'Reading sites as a designer', text: 'Architecture in Tabriz and landscape architecture in Istanbul, from a museum to a water system on a steep slope.', media: { src: 'assets/portfolio/p122.jpg', alt: 'Housing units with rain gardens on Büyükada.' } },
      { head: 'Performance', title: 'Constraints computed in code', text: 'Zoning, protected views, sun, carbon and wind turned into geometry and scores that can be checked.', media: { src: 'assets/projects/vcm-hero.webp', alt: 'Massing trimmed by a protected view corridor.' } },
      { head: 'Human and AI co-design', title: 'How people read and trust information', text: '132 participants across two peer-reviewed studies of perception, speed and trust.', media: { src: 'assets/papers/iss-apparatus.jpg', alt: 'A study participant wearing an Apple Watch.' } },
    ],
  },
  {
    id: 'closing',
    chapter: 'Toward GenEnv',
    scene: 'genenv',
    layout: 'cover',
    kicker: 'Toward GenEnv',
    title: 'Why I want to join GenEnv',
    lines: [
      'From making things as a child to AI for spatial design, one question has stayed with me: how people, nature and the things we design shape each other.',
      'I see several projects running in your lab that are exactly the work I mean, and the researcher I want to become. I would really like to join you.',
    ],
    media: [{ diagram: 'journey' }],
  },

  // ── Conversation ───────────────────────────────────────────────────────────
  {
    id: 'questions',
    chapter: 'Questions',
    scene: 'conversation',
    layout: 'questions',
    title: 'Thank you',
    lines: ['I would really value your thoughts.'],
    links: [
      { label: 'romanjahandideh.com', url: 'https://romanjahandideh.com' },
      { label: 'github.com/RomanJahandideh', url: 'https://github.com/RomanJahandideh' },
    ],
    questions: [
      'Would I join a project that is already running, or would we shape a new direction for me?',
      'How do you like PhD students to balance building tools with studying how designers use them?',
      'When an AI suggestion and a performance result disagree, how should a tool show that to the designer?',
      'Could I test tools with practising designers or planners during the PhD?',
      'What should I strengthen before starting a PhD?',
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
  notes: s.notes ?? [...(s.lines ?? []), ...(s.use ? [s.use] : []), ...(s.caveat ? [s.caveat] : [])],
}));

export const STEP_COUNT = STEPS.length;
