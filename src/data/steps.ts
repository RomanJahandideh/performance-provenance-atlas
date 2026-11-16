import type { Step } from './types';

/**
 * The presentation as 20 sheets. One scroll = one sheet.
 * Every sheet is a 12-column × 6-row panel grid; panels never share cells.
 * Image credits: docs/ASSET_MANIFEST.md.
 * Writing rule: plain sentences, no dashes.
 */
export const STEPS: readonly Step[] = [
  // 01
  {
    id: 'title',
    scene: 'opening',
    title: 'Performance Provenance',
    panels: [
      {
        kind: 'text',
        col: '1 / 8',
        row: '1 / 7',
        kicker: 'PhD interview · GenEnv Lab · UBC SALA',
        title: 'Performance Provenance',
        lines: [
          'Human and AI design together, with every decision backed by evidence you can check.',
          'This talk covers my background in architecture, landscape and interactive systems, four computational prototypes, and a PhD direction I would like to discuss.',
        ],
      },
      { kind: 'diagram', col: '8 / 13', row: '1 / 5', label: 'Fig. 01 · Research site plan', diagram: 'site' },
      {
        kind: 'facts',
        col: '8 / 13',
        row: '5 / 7',
        label: 'Presenter',
        facts: [
          { label: 'Name', value: 'Roman Jahandideh' },
          { label: 'Program', value: 'MSc, Interactive Arts + Technology' },
          { label: 'University', value: 'Simon Fraser University' },
        ],
      },
    ],
    notes: [
      'Thank you for meeting with me. I started out designing buildings and landscapes, and then I began studying how people perceive space. My recent work asks a related question: when AI tools help with spatial design, how do we keep their decisions visible, testable and easy for a designer to change?',
      'I will go through where I studied, four prototypes I built, and a PhD direction I would like to talk about with you.',
    ],
  },

  // 02
  {
    id: 'tabriz',
    scene: 'trajectory',
    title: 'Tabriz Islamic Art University',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 5',
        kicker: '01 · Education · Tabriz',
        title: 'Tabriz Islamic Art University',
        lines: ['I studied architecture here. I learned to develop a spatial idea, draw it, and explain it to others.'],
      },
      {
        kind: 'facts',
        col: '1 / 5',
        row: '5 / 7',
        label: 'Degree',
        facts: [
          { label: 'Degree', value: 'B.Arch' },
          { label: 'Years', value: '2011 to 2016' },
          { label: 'Field', value: 'Architecture' },
        ],
      },
      { kind: 'image', col: '5 / 10', row: '1 / 7', label: 'Campus', src: 'assets/photos/tabriz-2.jpg', alt: 'Brick buildings and a blossoming tree on the Tabriz Islamic Art University campus.', credit: 'Ashkan najar · CC BY-SA 4.0' },
      { kind: 'image', col: '10 / 13', row: '1 / 4', label: 'Tower', src: 'assets/photos/tabriz-1.jpg', alt: 'Brick tower of Tabriz Islamic Art University at sunset.', credit: 'Zahra Multimedia · CC BY-SA 4.0' },
      { kind: 'image', col: '10 / 13', row: '4 / 7', label: 'Courtyard', src: 'assets/photos/tabriz-3.jpg', alt: 'Brick hall and stone path on the Tabriz Islamic Art University campus.', credit: 'Ashkan najar · CC BY-SA 4.0' },
    ],
    notes: [
      'My degrees are in different fields, but they connect. I trained as an architect at Tabriz Islamic Art University, where I worked on spatial composition, public space and visual communication.',
    ],
  },

  // 03
  {
    id: 'zangar',
    scene: 'trajectory',
    title: 'Zangar Museum',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 7',
        kicker: '02 · Thesis · Best Dissertation 2016',
        title: 'Zangar Museum',
        lines: [
          'My final architecture thesis. It is a museum about a hundred years of Tabriz history, built from three sharp, angled forms.',
          'It was ranked first in my graduating class.',
        ],
      },
      { kind: 'image', col: '5 / 13', row: '1 / 5', label: 'Fig. 02 · Aerial view', src: 'assets/photos/zangar-aerial.jpg', alt: 'Zangar Museum render: white faceted volumes, a patterned screen façade, and stepped landscape terraces.' },
      { kind: 'image', col: '5 / 9', row: '5 / 7', label: 'Night view', src: 'assets/photos/zangar-night.jpg', alt: 'Night aerial render of the Zangar Museum among historic buildings.' },
      {
        kind: 'facts',
        col: '9 / 13',
        row: '5 / 7',
        label: 'Award',
        facts: [
          { label: 'Award', value: 'Best Dissertation', tone: 'yellow' },
          { label: 'Year', value: '2016' },
        ],
      },
    ],
    notes: [
      'This is my final thesis project, the Zangar Museum, which won the Best Dissertation Award. Projects like this taught me how to argue for a design with drawings, models and images, years before I started writing code.',
    ],
  },

  // 04
  {
    id: 'competitions',
    scene: 'trajectory',
    title: 'Design and photography awards',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 4',
        kicker: '03 · Competitions',
        title: 'Design and photography awards',
        lines: ['Competitions taught me to explain an idea quickly. Photography taught me how framing changes what people notice.'],
      },
      {
        kind: 'facts',
        col: '1 / 5',
        row: '4 / 7',
        label: 'Results',
        facts: [
          { label: 'Disaster cabin, 2018', value: '6th', num: true },
          { label: 'Abstract Photo of City, 2018', value: 'Winner', num: true, tone: 'yellow' },
          { label: 'Landscape design', value: '2nd', num: true },
        ],
      },
      { kind: 'image', col: '5 / 10', row: '1 / 5', label: 'Fig. 03 · Temporary housing after natural disasters', src: 'assets/photos/cabin-board.jpg', alt: 'Competition board: foldable A-frame emergency cabins in a mountain valley.', fit: 'contain' },
      { kind: 'image', col: '5 / 10', row: '5 / 7', label: 'Assembly stages', src: 'assets/photos/cabin-detail.jpg', alt: 'Cabin plans and the stages of unfolding the panels.' },
      { kind: 'image', col: '10 / 13', row: '1 / 4', label: '“The Ghost of Playground”', src: 'assets/photos/photo-ghost-of-playground.jpg', alt: 'Abstract long-exposure photograph in amber and violet.', fit: 'contain' },
      { kind: 'image', col: '10 / 13', row: '4 / 7', label: '“A Tunnel To Heaven”', src: 'assets/photos/photo-tunnel-to-heaven.jpg', alt: 'Abstract long-exposure photograph in gold and black.', fit: 'contain' },
    ],
    notes: [
      'I also took part in competitions. This foldable cabin for disaster areas placed sixth, and my photographs won an abstract city photography competition. Photography taught me how framing, contrast and blur change what people see, which became important later in my VR experiments.',
    ],
  },

  // 05
  {
    id: 'itu',
    scene: 'trajectory',
    title: 'Istanbul Technical University',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 4',
        kicker: '04 · Education · Istanbul · 2020 to 2024',
        title: 'Istanbul Technical University',
        lines: ['Master’s in Landscape Architecture. I designed with water, slope and planting, and ran my first experiments on how people perceive virtual space.'],
      },
      { kind: 'image', col: '1 / 5', row: '4 / 7', label: 'Taşkışla campus', src: 'assets/photos/itu-2.jpg', alt: 'The Taşkışla building of Istanbul Technical University.', credit: 'CeeGee · CC BY-SA 3.0' },
      { kind: 'image', col: '5 / 9', row: '1 / 4', label: 'Fig. 04 · Rain garden units, Büyükada', src: 'assets/photos/landscape-raingarden-3d.jpg', alt: 'Diagram of two neighbourhood units with rain gardens, permeable paving and storage tanks on a 4% slope.', fit: 'contain' },
      { kind: 'image', col: '9 / 13', row: '1 / 4', label: 'Top view of two connected units', src: 'assets/photos/landscape-topview.jpg', alt: 'Top view of two housing units with rain gardens and connected storage tanks.', fit: 'contain' },
      { kind: 'image', col: '5 / 9', row: '4 / 7', label: 'Unit 1 · plan and section', src: 'assets/photos/landscape-unit1.jpg', alt: 'Unit 1 board: model, plan, and a section showing rain gardens, rooftop water storage and permeable paving.', fit: 'contain' },
      { kind: 'image', col: '9 / 13', row: '4 / 7', label: 'Bioretention sketch', src: 'assets/photos/landscape-bioretention.jpg', alt: 'Hand sketch of a bioretention basin under a tree, showing water flow, gravel bed and underdrain pipe.', fit: 'contain' },
    ],
    notes: [
      'At Istanbul Technical University I did my master’s in landscape architecture. This project on Büyükada collects rainwater from roofs and streets into rain gardens and storage tanks down the slope. It is also where I started testing how people perceive virtual environments.',
    ],
  },

  // 06
  {
    id: 'ecaade',
    scene: 'foundation',
    title: 'Transparency changes perceived depth',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 4',
        kicker: '05 · Published · eCAADe 2023',
        title: 'Transparency changes depth',
        lines: ['In VR, when objects become very transparent, cool and dark colours look closer than warm and bright ones. That is the opposite of the usual rule.'],
      },
      {
        kind: 'facts',
        col: '1 / 5',
        row: '4 / 7',
        label: 'Study',
        facts: [
          { label: 'Participants', value: '60', num: true },
          { label: 'Judgments each', value: '264', num: true },
          { label: 'Design', value: '4 × 6 × 2', num: true },
        ],
      },
      { kind: 'diagram', col: '5 / 10', row: '1 / 7', label: 'Fig. 05 · Transparency sweep', diagram: 'depth' },
      { kind: 'image', col: '10 / 13', row: '1 / 7', label: 'Published results', src: 'assets/figures/ecaade-results.png', alt: 'Results figure from the eCAADe 2023 paper: colour scores at each transparency level.', fit: 'contain' },
    ],
    notes: [
      'This is my published eCAADe study. Sixty participants each made 264 depth judgments in VR, comparing transparency, colour and brightness. At high transparency the usual rule reversed, and cool, dark colours looked closer. So rules that work for solid objects do not always carry over to transparent ones.',
    ],
  },

  // 07
  {
    id: 'sfu',
    scene: 'trajectory',
    title: 'Simon Fraser University',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 5',
        kicker: '06 · Education · Vancouver',
        title: 'Simon Fraser University',
        lines: ['In the iViz Lab I build full interactive systems with Unity, sensors and networking, and I test them with people.'],
      },
      {
        kind: 'facts',
        col: '1 / 5',
        row: '5 / 7',
        label: 'Degree',
        facts: [
          { label: 'Degree', value: 'MSc' },
          { label: 'Since', value: '2025' },
          { label: 'Lab', value: 'iViz Lab' },
        ],
      },
      { kind: 'image', col: '5 / 10', row: '1 / 7', label: 'SFU Surrey · Grand Hall', src: 'assets/photos/sfu-2.jpg', alt: 'The Grand Hall atrium of SFU Surrey under its timber roof.', credit: 'Canmenwalker · CC BY 4.0' },
      { kind: 'image', col: '10 / 13', row: '1 / 4', label: 'Surrey Central', src: 'assets/photos/sfu-1.jpg', alt: 'SFU Surrey campus among the towers of Surrey Central.', credit: 'Northwest · CC BY 4.0' },
      { kind: 'image', col: '10 / 13', row: '4 / 7', label: 'Campus at dusk', src: 'assets/deck/campus-sfu.jpeg', alt: 'SFU Surrey campus building at dusk.' },
    ],
    notes: [
      'At SFU I am doing my Master of Science in the iViz Lab. There I learned to build complete interactive systems in Unity and C#, with physiological sensors and multiplayer networking, and to evaluate them with user studies.',
    ],
  },

  // 08
  {
    id: 'body',
    scene: 'foundation',
    title: 'Reading the body',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 4',
        kicker: '07 · Accepted · ACM ISS 2026',
        title: 'Reading the body',
        lines: ['A teammate’s heart rate shown as a glowing halo instead of numbers, and a game world that changes with your own body.'],
        caveat: 'Players still trusted plain numbers more than the halo. The BioTerrarium paper is under revision, so its results are not final.',
      },
      {
        kind: 'facts',
        col: '1 / 5',
        row: '4 / 7',
        label: 'Evidence',
        facts: [
          { label: 'Faster help from teammates', value: '3.90 s', num: true, tone: 'cyan' },
          { label: 'Heart rate recognised', value: '66.3%', num: true },
          { label: 'Watch to game world', value: '<200 ms', num: true, tone: 'cyan' },
        ],
      },
      { kind: 'image', col: '5 / 10', row: '1 / 7', label: 'Fig. 07 · Reading a remote teammate’s body', src: 'assets/figures/iss-teaser.png', alt: 'The cooperative cooking game with one glowing heartbeat halo per remote teammate.', fit: 'contain' },
      { kind: 'image', col: '10 / 13', row: '1 / 7', label: 'BioTerrarium · under revision', src: 'assets/projects/bioterrarium-hero.webp', alt: 'BioTerrarium: a glass-enclosed world of glowing crystal plants, fog, and a lighthouse.' },
    ],
    notes: [
      'My paper accepted at ACM ISS shows a remote teammate’s heart rate as a glowing halo instead of a number. In live three-player games, teammates helped each other almost four seconds faster than with no cue. But players still trusted plain numbers more, so it is a trade-off.',
      'BioTerrarium goes the other direction. An Apple Watch changes the fog, light and plants of a game world in under 200 milliseconds. That paper is under revision, so I treat its results as preliminary. These projects taught me to think of an environment as something that responds, and the next four projects bring that idea into urban design.',
    ],
  },

  // 09 · Zoning Literacy Assistant
  {
    id: 'zla-1',
    scene: 'zla',
    title: 'Zoning Literacy Assistant',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 5',
        kicker: 'Project 1 of 4 · Regulation',
        title: 'Zoning Literacy Assistant',
        lines: ['It finds the bylaw clauses that matter, answers only from those clauses, and then checks its own answer.'],
      },
      {
        kind: 'facts',
        col: '1 / 5',
        row: '5 / 7',
        label: 'System',
        facts: [
          { label: 'Clauses', value: '10', num: true },
          { label: 'Separate AI calls', value: '3', num: true },
          { label: 'Status', value: 'Prototype' },
        ],
      },
      { kind: 'diagram', col: '5 / 13', row: '1 / 5', label: 'Fig. 09 · Find, answer, check', diagram: 'pipeline' },
      { kind: 'image', col: '5 / 9', row: '5 / 7', label: 'Live system', src: 'assets/projects/zla-hero.webp', alt: 'The Zoning Literacy Assistant interface with example questions and a lot form.' },
      {
        kind: 'list',
        col: '9 / 13',
        row: '5 / 7',
        label: 'Who does what',
        items: [
          { key: 'AI', text: 'finds clauses and explains them' },
          { key: 'Code', text: 'calculates every area and floor', tone: 'cyan' },
          { key: 'Rule', text: 'no evidence means no answer', tone: 'yellow' },
        ],
      },
    ],
    notes: [
      'My first project is about reliable zoning answers. A general AI chatbot will often give a confident answer even when the bylaw does not say anything. So I split the system into three steps: it finds the relevant clauses, answers using only those, and then checks whether the clauses really support the answer.',
    ],
  },

  // 10
  {
    id: 'zla-2',
    scene: 'zla',
    title: 'Saying “not covered”',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 5',
        kicker: 'Project 1 of 4 · Regulation',
        title: 'Saying “not covered”',
        lines: ['If the bylaw does not answer a question, the system says so and stops.'],
        caveat: 'The prototype uses ten clauses of Vancouver’s R1-1 zone, not the full zoning bylaw.',
        links: [
          { label: 'Live system', url: 'https://romanjahandideh.github.io/zoning-literacy-assistant/' },
          { label: 'GitHub', url: 'https://github.com/RomanJahandideh/zoning-literacy-assistant' },
        ],
      },
      {
        kind: 'facts',
        col: '1 / 5',
        row: '5 / 7',
        label: 'Results',
        facts: [
          { label: 'Laneway house storeys?', value: 'Not covered', num: true, tone: 'orange' },
          { label: 'Footprint, in code', value: '162.6 m²', num: true, tone: 'cyan' },
        ],
      },
      { kind: 'diagram', col: '5 / 9', row: '1 / 7', label: 'Fig. 10 · A question the bylaw cannot answer', diagram: 'notcovered' },
      { kind: 'diagram', col: '9 / 13', row: '1 / 7', label: 'Fig. 11 · Site check, 10 × 37 m lot', diagram: 'sitecheck' },
    ],
    notes: [
      'Here someone asks how many storeys a laneway house can have. The bylaw allows laneway houses but never gives a storey limit, so the system answers “not covered by the provided source” and stops. That refusal is on purpose. The site calculations are done in normal code, so the same lot always gives the same numbers, and the AI only explains them.',
      'Once the rules are clear and traceable, the next question is how to turn them into building form.',
    ],
  },

  // 11 · Parametric Massing Generator
  {
    id: 'pmg-1',
    scene: 'pmg',
    title: 'Parametric Massing Generator',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 5',
        kicker: 'Project 2 of 4 · Geometry',
        title: 'Parametric Massing Generator',
        lines: ['AI reads the bylaw and pulls out eight rules. Code turns those rules into a building envelope you can edit.'],
      },
      {
        kind: 'facts',
        col: '1 / 5',
        row: '5 / 7',
        label: 'Rental condition',
        facts: [
          { label: 'Floor space ratio', value: '0.70 → 1.00', num: true, tone: 'yellow' },
          { label: 'Envelope', value: '+1 storey', num: true },
        ],
      },
      { kind: 'diagram', col: '5 / 9', row: '1 / 7', label: 'Fig. 12 · Bylaw to eight rules', diagram: 'constraints' },
      { kind: 'diagram', col: '9 / 13', row: '1 / 7', label: 'Fig. 13 · Envelope, Vancouver R1-1', diagram: 'envelope' },
    ],
    notes: [
      'The Massing Generator goes from bylaw text to building form. The AI pulls out eight rules, like setbacks and height, and keeps the original sentence and a confidence level for each one. Then normal code applies those rules to the lot and builds the massing. Because it is parametric, changing one value updates everything that depends on it. Here, the rental condition raises the floor space ratio and adds a storey.',
    ],
  },

  // 12
  {
    id: 'pmg-2',
    scene: 'pmg',
    title: 'From one lot to a whole block',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 5',
        kicker: 'Project 2 of 4 · Geometry',
        title: 'From one lot to a whole block',
        lines: ['The same method works on irregular lots and full city blocks. A second AI call checks every result.'],
        caveat: 'This is a research prototype and not advice on code compliance.',
        links: [
          { label: 'Live system', url: 'https://romanjahandideh.github.io/parametric-massing-generator/' },
          { label: 'GitHub', url: 'https://github.com/RomanJahandideh/parametric-massing-generator' },
        ],
      },
      {
        kind: 'list',
        col: '1 / 5',
        row: '5 / 7',
        label: 'How parametric works here',
        items: [
          { key: 'Input', text: 'the lot boundary' },
          { key: 'Rule', text: 'footprint = lot minus setbacks', tone: 'cyan' },
          { key: 'Output', text: 'an editable envelope', tone: 'yellow' },
        ],
      },
      { kind: 'image', col: '5 / 10', row: '1 / 7', label: 'Fig. 14 · Urban block mode (live system)', src: 'assets/projects/pmg-hero.webp', alt: 'A 3×3 grid of white massing volumes on an urban block with a plan inset.' },
      { kind: 'diagram', col: '10 / 13', row: '1 / 5', label: 'Block uses, sorted by AI', diagram: 'block' },
      {
        kind: 'list',
        col: '10 / 13',
        row: '5 / 7',
        label: 'Every result',
        items: [
          { key: '✓', text: 'keeps its source sentence' },
          { key: '✓', text: 'is checked by a 2nd AI call' },
          { key: '✓', text: 'is saved in the history' },
        ],
      },
    ],
    notes: [
      'The same method works for irregular lots and for whole city blocks, where the AI sorts each parcel by use. A separate AI call reviews the result. What interests me most is not generating forms automatically. It is keeping the source, the rule, the geometry and every change connected.',
      'But a building that meets the rules may still not perform well. The next project looks at that.',
    ],
  },

  // 13 · Vancouver View Corridor Massing
  {
    id: 'vcm-1',
    scene: 'vcm',
    title: 'Vancouver View Corridor Massing',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 4',
        kicker: 'Project 3 of 4 · Performance',
        title: 'View Corridor Massing',
        lines: ['A protected view in Vancouver is a sloped limit, not a flat height cap. Measuring it floor by floor gives back real floor area.'],
      },
      {
        kind: 'facts',
        col: '1 / 5',
        row: '4 / 7',
        label: 'Flat cap vs floor by floor',
        facts: [
          { label: 'Floors', value: '10 → 18', num: true, tone: 'cyan' },
          { label: 'Floor area, m²', value: '18,360 → 25,608', num: true },
          { label: 'Area gained', value: '+39.5%', num: true, tone: 'yellow' },
        ],
      },
      { kind: 'diagram', col: '5 / 13', row: '1 / 7', label: 'Fig. 15 · Section through Creekside Park view J1 (City open data)', diagram: 'corridor' },
    ],
    notes: [
      'Vancouver’s protected views work like a sloped ceiling over the city, not a flat height limit. The usual shortcut caps the whole building at the lowest point, which gives ten floors and about 18,000 square metres. Checking each floor against the real slope gives eighteen floors and about 25,600 square metres, which is 39.5 percent more. The geometry proposes a design, and the calculation tells us what it achieves.',
    ],
  },

  // 14
  {
    id: 'vcm-2',
    scene: 'vcm',
    title: 'Orientation is a free choice',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 5',
        kicker: 'Project 3 of 4 · Performance',
        title: 'Orientation is a free choice',
        lines: ['Turning the footprint barely changes the total floor area, so the angle can be chosen for the program or the view.'],
        links: [{ label: 'GitHub', url: 'https://github.com/RomanJahandideh/vancouver-view-corridor-massing' }],
      },
      {
        kind: 'facts',
        col: '1 / 5',
        row: '5 / 7',
        label: 'Rotation study',
        facts: [
          { label: 'Angles tested', value: '7', num: true },
          { label: 'Area change', value: '0.02%', num: true, tone: 'cyan' },
          { label: 'Floors', value: '18 → 17', num: true },
        ],
      },
      { kind: 'diagram', col: '5 / 9', row: '1 / 7', label: 'Fig. 16 · Footprint turned from 0° to 90°', diagram: 'rotation' },
      { kind: 'image', col: '9 / 13', row: '1 / 4', label: 'Trimmed massing', src: 'assets/projects/vcm-hero.webp', alt: 'Stepped massing trimmed diagonally by the protected view corridor’s sloped ceiling.' },
      {
        kind: 'list',
        col: '9 / 13',
        row: '4 / 7',
        label: 'What is real',
        items: [
          { key: 'Real', text: 'City view corridor shape', tone: 'ink' },
          { key: 'Tested', text: 'clipping and floor maths', tone: 'cyan' },
          { key: 'Placeholder', text: 'base height and slope', tone: 'orange' },
          { key: 'Not run', text: 'one step that needs Rhino', tone: 'orange' },
        ],
      },
    ],
    notes: [
      'When I rotate the building footprint, the total floor area hardly changes, so the angle can be chosen for the program or the skyline instead. To be clear about the data, the corridor shape is real, but the base height and slope values are placeholders.',
      'The last project looks at several goals at once, where no single design is best at everything.',
    ],
  },

  // 15 · Environmental Massing Agents
  {
    id: 'ema-1',
    scene: 'ema',
    title: 'Environmental Massing Agents',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 5',
        kicker: 'Project 4 of 4 · Critique',
        title: 'Environmental Massing Agents',
        lines: ['Six AI roles suggest and critique designs. Normal code calculates every score, so the agents never make up a number.'],
      },
      {
        kind: 'list',
        col: '1 / 5',
        row: '5 / 7',
        label: 'Who does what',
        items: [
          { key: 'AI', text: 'suggests, critiques, redirects' },
          { key: 'Code', text: 'calculates sun, carbon, wind, area', tone: 'cyan' },
          { key: 'Designer', text: 'decides', tone: 'coral' },
        ],
      },
      { kind: 'diagram', col: '5 / 10', row: '1 / 7', label: 'Fig. 17 · Six roles around shared calculators', diagram: 'agents' },
      { kind: 'image', col: '10 / 13', row: '1 / 4', label: 'Shadow and section', src: 'assets/projects/ema-hero.webp', alt: 'Plan with a trimmed footprint and its winter shadow, beside a stepped section.', fit: 'contain' },
      {
        kind: 'facts',
        col: '10 / 13',
        row: '4 / 7',
        label: 'Experiment',
        facts: [
          { label: 'Designs in full grid', value: '1,080', num: true },
          { label: 'Tries per run', value: '200', num: true },
        ],
      },
    ],
    notes: [
      'Environmental Massing Agents looks at several goals at once. One AI agent proposes designs, four agents review sunlight, carbon, wind and floor area, and one coordinates the next step. The important rule is that the agents never calculate the scores themselves. Normal code calculates them, and the agents interpret them.',
    ],
  },

  // 16
  {
    id: 'ema-2',
    scene: 'ema',
    title: 'What the test showed',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 4',
        kicker: 'Project 4 of 4 · Critique',
        title: 'What the test showed',
        lines: ['I expected the guided search to be faster than random search. It was not faster, but it was more reliable.'],
        links: [{ label: 'GitHub', url: 'https://github.com/RomanJahandideh/environmental-massing-agents' }],
      },
      {
        kind: 'facts',
        col: '1 / 5',
        row: '4 / 7',
        label: 'Hypotheses',
        facts: [
          { label: 'Faster search', value: 'Not confirmed', num: true, tone: 'red' },
          { label: 'Runs that hit the target', value: '4/5 vs 1/5', num: true, tone: 'cyan' },
          { label: 'Timber came out ahead', value: '200/200', num: true },
        ],
      },
      { kind: 'diagram', col: '5 / 9', row: '1 / 7', label: 'Fig. 18 · Guided vs random search, 5 runs each', diagram: 'seeds' },
      { kind: 'diagram', col: '9 / 13', row: '1 / 4', label: 'Fig. 19 · Wind vs floor area', diagram: 'pareto' },
      {
        kind: 'list',
        col: '9 / 13',
        row: '4 / 7',
        label: 'Limits',
        items: [
          { key: 'Wind', text: 'a rough estimate, not CFD', tone: 'orange' },
          { key: 'Carbon', text: 'benchmarks, not a full LCA', tone: 'orange' },
          { key: 'LLM', text: 'live AI loop not yet run', tone: 'orange' },
        ],
      },
    ],
    notes: [
      'I compared a guided search method, NSGA-II, with random search. Each ran five times with 200 tries, checked against a full grid of 1,080 designs. I expected the guided search to be faster, and it was not. It was more reliable, though: four out of five runs reached the target, compared with one out of five for random search. I think it is important to report what I expected and what actually happened.',
    ],
  },

  // 17
  {
    id: 'synthesis',
    scene: 'synthesis',
    title: 'How the four projects connect',
    panels: [
      {
        kind: 'text',
        col: '1 / 13',
        row: '1 / 3',
        kicker: 'Four projects · one path',
        title: 'Rule → geometry → performance → decision',
        lines: ['Each project adds one link. The designer always makes the final decision.'],
      },
      { kind: 'diagram', col: '1 / 13', row: '3 / 7', label: 'Fig. 20 · The chain the four projects build', diagram: 'chain' },
    ],
    notes: [
      'Together these projects build one chain. The Zoning Assistant gives reliable rules, the Massing Generator turns them into editable form, the View Corridor project measures what that form achieves, and the agents discuss the trade-offs. The designer makes the final decision.',
    ],
  },

  // 18
  {
    id: 'phd',
    scene: 'phd',
    title: 'Performance Provenance',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 5',
        kicker: 'Proposed direction · for discussion',
        title: 'Performance Provenance',
        lines: ['A record that links every AI-assisted design change to its rule, its evidence and the designer’s decision.'],
        caveat: 'This example uses the corridor study. The scope and methods would be shaped with my supervisor.',
      },
      {
        kind: 'list',
        col: '1 / 5',
        row: '5 / 7',
        label: 'Possible methods',
        items: [
          { key: 'Build', text: 'a system from these prototypes' },
          { key: 'Compare', text: 'design with and without the record' },
          { key: 'Interview', text: 'designers who use it', tone: 'coral' },
        ],
      },
      { kind: 'diagram', col: '5 / 13', row: '1 / 7', label: 'Fig. 21 · What the record keeps for one design change', diagram: 'provenance' },
    ],
    notes: [
      'This is the direction I would like to discuss: performance provenance. Each line here is something the record would keep for one design change: the goal, the rule, the change, the calculation, the result, what is uncertain, what the AI said, and what the designer decided.',
      'The methods could include building the system, testing it technically, comparing design with and without it, and interviewing designers. I have left this open on purpose, because I would like to shape it with you.',
    ],
  },

  // 19
  {
    id: 'genenv',
    scene: 'genenv',
    title: 'Why GenEnv',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 5',
        kicker: 'GenEnv research · not my projects',
        title: 'Why GenEnv',
        lines: [
          'GenEnv builds AI design tools that stay editable, traceable and open to human judgment.',
          'I bring design training, working prototypes and user studies, and I want to learn how to grow them into a PhD.',
        ],
      },
      {
        kind: 'facts',
        col: '1 / 5',
        row: '5 / 7',
        label: 'Funded program',
        facts: [
          { label: 'Funder', value: 'NSERC Discovery' },
          { label: 'Years', value: '2026 to 2031' },
          { label: 'PI', value: 'Xun Liu' },
        ],
      },
      { kind: 'card', col: '5 / 9', row: '1 / 4', label: 'GenEnv · NSERC', title: 'Human-AI Co-Design', note: 'Editable design proposals that account for performance. This is the program the position belongs to.' },
      { kind: 'card', col: '9 / 13', row: '1 / 4', label: 'GenEnv · SSHRC', title: 'Decoding Urban Form', note: 'AI agents that turn Vancouver zoning into traceable 3D massing.' },
      { kind: 'card', col: '5 / 9', row: '4 / 7', label: 'GenEnv · open tool', title: 'Grasshopper MCP v2', note: 'Language models that control Rhino and Grasshopper through MCP.' },
      { kind: 'card', col: '9 / 13', row: '4 / 7', label: 'LACF · Yuhao Lu (PI) with GenEnv', title: 'Digital Thermal Sandbox', note: 'Testing planting and materials against urban heat.' },
    ],
    notes: [
      'These four are GenEnv’s projects, not mine. The NSERC program runs from 2026 to 2031 and aims for AI design tools that stay editable, traceable and open to human judgment. My prototypes are closest to Decoding Urban Form and the Grasshopper MCP work.',
      'I bring design training, computational prototyping and user studies. I would really like to learn from Professor Liu and the team how to grow these prototypes into a PhD.',
    ],
  },

  // 20
  {
    id: 'thanks',
    scene: 'conversation',
    title: 'Three questions',
    panels: [
      {
        kind: 'text',
        col: '1 / 8',
        row: '1 / 7',
        kicker: 'Thank you',
        title: 'Three questions',
        lines: [
          '1. Which part of this could help GenEnv’s current work the most?',
          '2. Should it start from an existing GenEnv case or a new design problem?',
          '3. What should I strengthen before starting a PhD?',
        ],
        links: [
          { label: 'romanjahandideh.com', url: 'https://romanjahandideh.com' },
          { label: 'github.com/RomanJahandideh', url: 'https://github.com/RomanJahandideh' },
        ],
      },
      { kind: 'diagram', col: '8 / 13', row: '1 / 7', label: 'Fig. 22 · The full route', diagram: 'site' },
    ],
    notes: [
      'I would like to end with questions. Which part of this could help GenEnv’s current work the most? Should it start from an existing GenEnv case or a new design problem? And what should I strengthen before I start?',
      'Thank you. I would really value your thoughts.',
    ],
  },
] as const;

export const STEP_COUNT = STEPS.length;
