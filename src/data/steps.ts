import type { Step } from './types';

/**
 * The presentation as 20 architectural sheets. One scroll = one sheet.
 * Every sheet is a 12-column × 6-row panel grid; panels never share cells.
 * Image credits: docs/ASSET_MANIFEST.md.
 */
export const STEPS: readonly Step[] = [
  // 01 ───────────────────────────────────────────────────────────────────────
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
          'Evidence-bearing human–AI co-design for performance-aware constructed environments.',
          'From spatial design, through interactive research systems, to four computational prototypes — and a direction I would like to discuss.',
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
          { label: 'Program', value: 'MA, Interactive Arts + Technology' },
          { label: 'University', value: 'Simon Fraser University' },
        ],
      },
    ],
    notes: [
      'Thank you for meeting with me. I began by designing spaces and studying how people perceive them. My recent work asks a related question at a different level: when computational and AI systems take part in spatial design, how can their decisions stay visible, testable, and open to human revision?',
      'I will walk through where I trained, four prototypes I built, and a direction I would like to discuss with you.',
    ],
  },

  // 02 ───────────────────────────────────────────────────────────────────────
  {
    id: 'tabriz',
    scene: 'trajectory',
    title: 'Tabriz Islamic Art University',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 5',
        kicker: '01 — Education · Tabriz',
        title: 'Tabriz Islamic Art University',
        lines: ['Where I learned to make, draw, and defend a spatial idea — composition, public life, and visual communication.'],
      },
      {
        kind: 'facts',
        col: '1 / 5',
        row: '5 / 7',
        label: 'Degree',
        facts: [
          { label: 'Degree', value: 'B.Arch' },
          { label: 'Period', value: '2011 – 2016' },
          { label: 'Field', value: 'Architecture' },
        ],
      },
      { kind: 'image', col: '5 / 10', row: '1 / 7', label: 'Campus', src: 'assets/photos/tabriz-2.jpg', alt: 'Brick buildings and a blossoming tree on the Tabriz Islamic Art University campus.', credit: 'Ashkan najar · CC BY-SA 4.0' },
      { kind: 'image', col: '10 / 13', row: '1 / 4', label: 'Tower', src: 'assets/photos/tabriz-1.jpg', alt: 'Brick tower of Tabriz Islamic Art University at sunset.', credit: 'Zahra Multimedia · CC BY-SA 4.0' },
      { kind: 'image', col: '10 / 13', row: '4 / 7', label: 'Courtyard', src: 'assets/photos/tabriz-3.jpg', alt: 'Brick hall and stone path on the Tabriz Islamic Art University campus.', credit: 'Ashkan najar · CC BY-SA 4.0' },
    ],
    notes: [
      'My degrees look different, but they build one research profile. I trained as an architect at Tabriz Islamic Art University: spatial composition, public life, and visual communication.',
    ],
  },

  // 03 ───────────────────────────────────────────────────────────────────────
  {
    id: 'zangar',
    scene: 'trajectory',
    title: 'Zangar Museum',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 7',
        kicker: '02 — Thesis · Best Dissertation 2016',
        title: 'Zangar Museum',
        lines: [
          'My final architecture thesis: a museum about a century of Tabriz’s history, shaped by three sharp-edged forms.',
          'It ranked first among the graduating class.',
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
      'This is my final architecture thesis, the Zangar Museum. It won the Best Dissertation Award. Projects like this taught me to argue for a spatial idea with drawings, models, and images — long before I had a codebase.',
    ],
  },

  // 04 ───────────────────────────────────────────────────────────────────────
  {
    id: 'competitions',
    scene: 'trajectory',
    title: 'Design and photography awards',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 4',
        kicker: '03 — Competitions',
        title: 'Design + photography awards',
        lines: ['Competitions taught me to communicate fast — and photography taught me how framing changes what people see.'],
      },
      {
        kind: 'facts',
        col: '1 / 5',
        row: '4 / 7',
        label: 'Results',
        facts: [
          { label: 'Disaster cabin · 2018', value: '6th', num: true },
          { label: 'Abstract Photo of City · 2018', value: 'Winner', num: true, tone: 'yellow' },
          { label: 'Landscape design', value: '2nd', num: true },
        ],
      },
      { kind: 'image', col: '5 / 10', row: '1 / 5', label: 'Fig. 03 · Temporary residence against natural disasters', src: 'assets/photos/cabin-board.jpg', alt: 'Competition board: foldable A-frame emergency cabins in a mountain valley.', fit: 'contain' },
      { kind: 'image', col: '5 / 10', row: '5 / 7', label: 'Assembly stages', src: 'assets/photos/cabin-detail.jpg', alt: 'Cabin plans and the stages of unfolding the panels.' },
      { kind: 'image', col: '10 / 13', row: '1 / 4', label: '“The Ghost of Playground”', src: 'assets/photos/photo-ghost-of-playground.jpg', alt: 'Abstract long-exposure photograph in amber and violet.', fit: 'contain' },
      { kind: 'image', col: '10 / 13', row: '4 / 7', label: '“A Tunnel To Heaven”', src: 'assets/photos/photo-tunnel-to-heaven.jpg', alt: 'Abstract long-exposure photograph in gold and black.', fit: 'contain' },
    ],
    notes: [
      'Competitions pushed me to communicate fast: a foldable cabin for disaster areas, which placed sixth, and a winning entry in an abstract city-photography competition. Photography taught me how framing, contrast, and ambiguity change what people see — a question that came back in my VR experiments.',
    ],
  },

  // 05 ───────────────────────────────────────────────────────────────────────
  {
    id: 'itu',
    scene: 'trajectory',
    title: 'Istanbul Technical University',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 5',
        kicker: '04 — Education · Istanbul',
        title: 'Istanbul Technical University',
        lines: ['Landscape systems, water, and site — and my first experiments on how people perceive virtual space.'],
      },
      {
        kind: 'facts',
        col: '1 / 5',
        row: '5 / 7',
        label: 'Degree',
        facts: [
          { label: 'Degree', value: 'Master’s' },
          { label: 'Period', value: '2020 – 2024' },
          { label: 'Field', value: 'Landscape Architecture' },
        ],
      },
      { kind: 'image', col: '5 / 10', row: '1 / 7', label: 'Taşkışla campus', src: 'assets/photos/itu-2.jpg', alt: 'The Taşkışla building of Istanbul Technical University.', credit: 'CeeGee · CC BY-SA 3.0' },
      { kind: 'image', col: '10 / 13', row: '1 / 4', label: 'Aerial', src: 'assets/deck/campus-itu.jpeg', alt: 'Aerial view of ITU Taşkışla with red-tiled roofs among trees.' },
      { kind: 'image', col: '10 / 13', row: '4 / 7', label: 'Landscape work · rain gardens', src: 'assets/photos/landscape-raingarden-3d.jpg', alt: 'Diagram of two neighbourhood units with rain gardens, permeable paving, and storage tanks.', fit: 'contain' },
    ],
    notes: [
      'At Istanbul Technical University I studied landscape architecture: dynamic systems, water, and site conditions. It is also where I began testing perception inside virtual environments.',
    ],
  },

  // 06 ───────────────────────────────────────────────────────────────────────
  {
    id: 'ecaade',
    scene: 'foundation',
    title: 'Transparency reverses depth',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 4',
        kicker: '05 — Published · eCAADe 2023',
        title: 'Transparency reverses depth',
        lines: ['In VR, at high transparency, cool and dark colours read as nearer — the familiar rule flips.'],
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
      'My published eCAADe study: sixty participants, two hundred sixty-four pairwise depth judgments each, across transparency, hue, and luminance in VR. At high transparency the familiar rule reverses — cool and dark colours read as nearer. Visual rules for opaque graphics do not simply transfer.',
    ],
  },

  // 07 ───────────────────────────────────────────────────────────────────────
  {
    id: 'sfu',
    scene: 'trajectory',
    title: 'Simon Fraser University · iViz Lab',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 5',
        kicker: '06 — Education · Vancouver',
        title: 'Simon Fraser University',
        lines: ['In the iViz Lab I build complete interactive systems — Unity, sensing, networking — and test them with people.'],
      },
      {
        kind: 'facts',
        col: '1 / 5',
        row: '5 / 7',
        label: 'Degree',
        facts: [
          { label: 'Degree', value: 'MA' },
          { label: 'Period', value: '2025 – now' },
          { label: 'Lab', value: 'iViz Lab' },
        ],
      },
      { kind: 'image', col: '5 / 10', row: '1 / 7', label: 'SFU Surrey · Grand Hall', src: 'assets/photos/sfu-2.jpg', alt: 'The Grand Hall atrium of SFU Surrey under its timber roof.', credit: 'Canmenwalker · CC BY 4.0' },
      { kind: 'image', col: '10 / 13', row: '1 / 4', label: 'Surrey Central', src: 'assets/photos/sfu-1.jpg', alt: 'SFU Surrey campus among the towers of Surrey Central.', credit: 'Northwest · CC BY 4.0' },
      { kind: 'image', col: '10 / 13', row: '4 / 7', label: 'Campus at dusk', src: 'assets/deck/campus-sfu.jpeg', alt: 'SFU Surrey campus building at dusk.' },
    ],
    notes: [
      'At SFU, in the iViz Lab, I learned to build complete interactive systems — Unity, C#, physiological sensing, multiplayer networking — and to evaluate them with HCI methods.',
    ],
  },

  // 08 ───────────────────────────────────────────────────────────────────────
  {
    id: 'body',
    scene: 'foundation',
    title: 'Bodies in the loop',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 4',
        kicker: '07 — Accepted · ACM ISS ’26',
        title: 'Bodies in the loop',
        lines: ['A teammate’s heartbeat as a label-free halo — and a world that reacts to your body.'],
        caveat: 'Plain numbers stayed more trusted than the halo · BioTerrarium results are provisional (under revision).',
      },
      {
        kind: 'facts',
        col: '1 / 5',
        row: '4 / 7',
        label: 'Evidence',
        facts: [
          { label: 'Faster teammate support', value: '3.90 s', num: true, tone: 'cyan' },
          { label: 'Heart-rate recognition', value: '66.3%', num: true },
          { label: 'Wearable → world', value: '<200 ms', num: true, tone: 'cyan' },
        ],
      },
      { kind: 'image', col: '5 / 10', row: '1 / 7', label: 'Fig. 07 · Reading a remote teammate’s body', src: 'assets/figures/iss-teaser.png', alt: 'The cooperative cooking game with one glowing heartbeat halo per remote teammate.', fit: 'contain' },
      { kind: 'image', col: '10 / 13', row: '1 / 7', label: 'BioTerrarium · under revision', src: 'assets/projects/bioterrarium-hero.webp', alt: 'BioTerrarium: a glass-enclosed world of glowing crystal plants, fog, and a lighthouse.' },
    ],
    notes: [
      'My accepted ACM ISS paper shows a remote teammate’s heart rate as one label-free halo. In live three-player teams, support came almost four seconds faster than with no cue — but plain numbers stayed more trusted. A real trade-off.',
      'BioTerrarium runs the loop the other way: an Apple Watch drives fog, light, and plants in under two hundred milliseconds. Its manuscript is under revision, so I treat the analysis as provisional. These projects taught me to treat an environment as a responsive system — and the next four move that thinking into urban design.',
    ],
  },

  // 09 ── Zoning Literacy Assistant ──────────────────────────────────────────
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
        lines: ['It finds the relevant bylaw clauses, answers only from them, then checks its own answer.'],
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
      { kind: 'diagram', col: '5 / 13', row: '1 / 5', label: 'Fig. 09 · Retrieve → answer → verify', diagram: 'pipeline' },
      { kind: 'image', col: '5 / 9', row: '5 / 7', label: 'Live system', src: 'assets/projects/zla-hero.webp', alt: 'The Zoning Literacy Assistant interface with example questions and a lot form.' },
      {
        kind: 'list',
        col: '9 / 13',
        row: '5 / 7',
        label: 'Who does what',
        items: [
          { key: 'AI', text: 'finds clauses and explains them' },
          { key: 'Code', text: 'calculates every area and floor', tone: 'cyan' },
          { key: 'Rule', text: 'no evidence → no answer', tone: 'yellow' },
        ],
      },
    ],
    notes: [
      'My first project is about trustworthy regulatory knowledge. A general-purpose language model will happily answer confidently even when the information is not there. So I split the system into retrieval, answering, and independent verification: it finds the clauses, answers only from those, then checks whether the evidence really supports the answer.',
    ],
  },

  // 10 ───────────────────────────────────────────────────────────────────────
  {
    id: 'zla-2',
    scene: 'zla',
    title: 'When the rule is silent, it says so',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 5',
        kicker: 'Project 1 of 4 · Regulation',
        title: 'When the rule is silent, it says so',
        lines: ['Asked something the bylaw doesn’t cover, the system stops instead of guessing.'],
        caveat: 'Prototype knowledge base: ten clauses of Vancouver R1-1, not the full zoning code.',
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
          { label: 'Laneway storeys?', value: 'Not covered', num: true, tone: 'orange' },
          { label: 'Footprint, in code', value: '162.6 m²', num: true, tone: 'cyan' },
        ],
      },
      { kind: 'diagram', col: '5 / 9', row: '1 / 7', label: 'Fig. 10 · Unsupported question', diagram: 'notcovered' },
      { kind: 'diagram', col: '9 / 13', row: '1 / 7', label: 'Fig. 11 · Site check, 10 × 37 m lot', diagram: 'sitecheck' },
    ],
    notes: [
      'When the source does not contain the answer — here, how many storeys a laneway house may have — it stops: “not covered by the provided source.” Refusing is designed behaviour, not a failure. Site arithmetic is done in ordinary code, so the same inputs always give the same result; the AI only explains it.',
      'Once regulation is structured and traceable, the next question is how it becomes editable geometry.',
    ],
  },

  // 11 ── Parametric Massing Generator ───────────────────────────────────────
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
        lines: ['AI reads the bylaw into eight constraints. Code turns them into an editable building envelope.'],
      },
      {
        kind: 'facts',
        col: '1 / 5',
        row: '5 / 7',
        label: 'Rental condition',
        facts: [
          { label: 'Floor-space ratio', value: '0.70 → 1.00', num: true, tone: 'yellow' },
          { label: 'Envelope', value: '+1 storey', num: true },
        ],
      },
      { kind: 'diagram', col: '5 / 9', row: '1 / 7', label: 'Fig. 12 · Bylaw → 8 constraints', diagram: 'constraints' },
      { kind: 'diagram', col: '9 / 13', row: '1 / 7', label: 'Fig. 13 · Envelope, Vancouver R1-1', diagram: 'envelope' },
    ],
    notes: [
      'The Massing Generator moves from regulatory language to form. AI extracts eight constraints and keeps the source phrase and a confidence level for each. Then deterministic code applies them: setbacks, footprint, floor area, and the massing. It is parametric because changing one value updates everything that depends on it — watch the rental condition add a storey.',
    ],
  },

  // 12 ───────────────────────────────────────────────────────────────────────
  {
    id: 'pmg-2',
    scene: 'pmg',
    title: 'Same method, bigger sites',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 5',
        kicker: 'Project 2 of 4 · Geometry',
        title: 'Same method, bigger sites',
        lines: ['From a single lot to irregular parcels and whole blocks — and an independent reviewer checks every result.'],
        caveat: 'Research prototype, not code-compliance advice.',
        links: [
          { label: 'Live system', url: 'https://romanjahandideh.github.io/parametric-massing-generator/' },
          { label: 'GitHub', url: 'https://github.com/RomanJahandideh/parametric-massing-generator' },
        ],
      },
      {
        kind: 'list',
        col: '1 / 5',
        row: '5 / 7',
        label: 'Parametric, in one line each',
        items: [
          { key: 'Input', text: 'the parcel boundary' },
          { key: 'Rule', text: 'footprint = parcel − setbacks', tone: 'cyan' },
          { key: 'Output', text: 'an editable envelope', tone: 'yellow' },
        ],
      },
      { kind: 'image', col: '5 / 10', row: '1 / 7', label: 'Fig. 14 · Urban block mode (live system)', src: 'assets/projects/pmg-hero.webp', alt: 'A 3×3 grid of white massing volumes on an urban block with a plan inset.' },
      { kind: 'diagram', col: '10 / 13', row: '1 / 5', label: 'AI-classified block', diagram: 'block' },
      {
        kind: 'list',
        col: '10 / 13',
        row: '5 / 7',
        label: 'Every result',
        items: [
          { key: '✓', text: 'source phrase kept' },
          { key: '✓', text: 'reviewed by a 2nd AI call' },
          { key: '✓', text: 'revision history saved' },
        ],
      },
    ],
    notes: [
      'The same clipping method scales to irregular parcels and AI-classified urban blocks, and a separate reviewer checks the interpretation. My interest is not automatic form generation — it is keeping source, parameter, geometry, and revision connected.',
      'But a compliant envelope does not tell us whether the geometry performs well, or what simplifying a rule costs.',
    ],
  },

  // 13 ── Vancouver View Corridor Massing ────────────────────────────────────
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
        lines: ['A protected view is a sloped ceiling, not a flat height limit. Modelling it precisely recovers real floor area.'],
      },
      {
        kind: 'facts',
        col: '1 / 5',
        row: '4 / 7',
        label: 'Flat cap → floor by floor',
        facts: [
          { label: 'Floors', value: '10 → 18', num: true, tone: 'cyan' },
          { label: 'Floor area, m²', value: '18,360 → 25,608', num: true },
          { label: 'Area recovered', value: '+39.5%', num: true, tone: 'yellow' },
        ],
      },
      { kind: 'diagram', col: '5 / 13', row: '1 / 7', label: 'Fig. 15 · Section — Creekside Park view J1 (City open data)', diagram: 'corridor' },
    ],
    notes: [
      'Vancouver’s protected views create sloped ceilings, not flat height limits. The usual shortcut caps the whole site at the lowest point: ten floors, about eighteen thousand square metres. Trimming floor by floor against the real slope gives eighteen floors and over twenty-five thousand — thirty-nine and a half percent more, from precision alone. Geometry proposes; evaluation provides the evidence.',
    ],
  },

  // 14 ───────────────────────────────────────────────────────────────────────
  {
    id: 'vcm-2',
    scene: 'vcm',
    title: 'Orientation becomes a free choice',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 5',
        kicker: 'Project 3 of 4 · Performance',
        title: 'Orientation becomes a free choice',
        lines: ['Turning the footprint barely changes total area — so the form can follow program, not just yield.'],
        links: [{ label: 'GitHub', url: 'https://github.com/RomanJahandideh/vancouver-view-corridor-massing' }],
      },
      {
        kind: 'facts',
        col: '1 / 5',
        row: '5 / 7',
        label: 'Rotation study',
        facts: [
          { label: 'Rotations tested', value: '7', num: true },
          { label: 'Area change', value: '0.02%', num: true, tone: 'cyan' },
          { label: 'Floors', value: '18 → 17', num: true },
        ],
      },
      { kind: 'diagram', col: '5 / 9', row: '1 / 7', label: 'Fig. 16 · Footprint 0° → 90°', diagram: 'rotation' },
      { kind: 'image', col: '9 / 13', row: '1 / 4', label: 'Trimmed massing', src: 'assets/projects/vcm-hero.webp', alt: 'Stepped massing trimmed diagonally by the protected view corridor’s sloped ceiling.' },
      {
        kind: 'list',
        col: '9 / 13',
        row: '4 / 7',
        label: 'What is real',
        items: [
          { key: 'Real', text: 'City corridor geometry', tone: 'ink' },
          { key: 'Tested', text: 'clipping + floor maths', tone: 'cyan' },
          { key: 'Placeholder', text: 'base elevation + slope', tone: 'orange' },
          { key: 'Not run', text: 'one Rhino-only step', tone: 'orange' },
        ],
      },
    ],
    notes: [
      'Rotating the footprint barely changes total area, so orientation can serve silhouette or program instead of yield. Honest flags: the corridor geometry is real, but the elevation values are placeholders.',
      'The last project extends this to several competing objectives, where no single design wins everywhere.',
    ],
  },

  // 15 ── Environmental Massing Agents ───────────────────────────────────────
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
        lines: ['Six AI roles propose and critique designs. Ordinary code calculates every score — the agents never invent a number.'],
      },
      {
        kind: 'list',
        col: '1 / 5',
        row: '5 / 7',
        label: 'Who does what',
        items: [
          { key: 'AI', text: 'proposes, critiques, redirects' },
          { key: 'Code', text: 'calculates solar, carbon, wind, area', tone: 'cyan' },
          { key: 'Designer', text: 'decides', tone: 'coral' },
        ],
      },
      { kind: 'diagram', col: '5 / 10', row: '1 / 7', label: 'Fig. 17 · Six roles over shared evaluators', diagram: 'agents' },
      { kind: 'image', col: '10 / 13', row: '1 / 4', label: 'Shadow + section', src: 'assets/projects/ema-hero.webp', alt: 'Plan with a trimmed footprint and its winter shadow, beside a stepped section.', fit: 'contain' },
      {
        kind: 'facts',
        col: '10 / 13',
        row: '4 / 7',
        label: 'Experiment',
        facts: [
          { label: 'Reference grid', value: '1,080', num: true },
          { label: 'Budget per run', value: '200', num: true },
        ],
      },
    ],
    notes: [
      'Environmental Massing Agents extends the workflow to many objectives at once. A Generator proposes designs; four Critics read the solar, carbon, wind, and floor-area results; an Orchestrator picks the next direction. The key rule: the agents never calculate the scores. Ordinary code provides the evidence; the agents interpret it.',
    ],
  },

  // 16 ───────────────────────────────────────────────────────────────────────
  {
    id: 'ema-2',
    scene: 'ema',
    title: 'The honest result',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 4',
        kicker: 'Project 4 of 4 · Critique',
        title: 'The honest result',
        lines: ['I expected directed search to be faster. It wasn’t — it was more reliable.'],
        links: [{ label: 'GitHub', url: 'https://github.com/RomanJahandideh/environmental-massing-agents' }],
      },
      {
        kind: 'facts',
        col: '1 / 5',
        row: '4 / 7',
        label: 'Hypotheses',
        facts: [
          { label: 'Faster search', value: 'Not confirmed', num: true, tone: 'red' },
          { label: 'Runs reaching target', value: '4/5 vs 1/5', num: true, tone: 'cyan' },
          { label: 'Timber dominates', value: '200/200', num: true },
        ],
      },
      { kind: 'diagram', col: '5 / 9', row: '1 / 7', label: 'Fig. 18 · NSGA-II vs random, 5 runs each', diagram: 'seeds' },
      { kind: 'diagram', col: '9 / 13', row: '1 / 4', label: 'Fig. 19 · Wind ↔ floor-area trade-off', diagram: 'pareto' },
      {
        kind: 'list',
        col: '9 / 13',
        row: '4 / 7',
        label: 'Limits',
        items: [
          { key: 'Wind', text: 'a heuristic, not CFD', tone: 'orange' },
          { key: 'Carbon', text: 'benchmarks, not a full LCA', tone: 'orange' },
          { key: 'LLM', text: 'live unscripted loop not run', tone: 'orange' },
        ],
      },
    ],
    notes: [
      'I compared a genetic optimizer, NSGA-II, with random search: five runs each, two hundred evaluations, against a full grid of one thousand eighty designs. I expected it to be faster — it was not. What it showed was reliability: four of five runs reached the target, against one of five. Reporting that difference matters: it separates what I expected from what the results support.',
    ],
  },

  // 17 ───────────────────────────────────────────────────────────────────────
  {
    id: 'synthesis',
    scene: 'synthesis',
    title: 'One connected path',
    panels: [
      {
        kind: 'text',
        col: '1 / 13',
        row: '1 / 3',
        kicker: 'Four projects · one path',
        title: 'Rule → geometry → performance → judgment',
        lines: ['Each project adds one link. The designer keeps the final say.'],
      },
      { kind: 'diagram', col: '1 / 13', row: '3 / 7', label: 'Fig. 20 · The chain the four projects build', diagram: 'chain' },
    ],
    notes: [
      'Together these form one direction: trustworthy regulatory knowledge, editable geometry, measurable evidence, and agents that discuss verified trade-offs — while the final judgment stays with the designer.',
    ],
  },

  // 18 ───────────────────────────────────────────────────────────────────────
  {
    id: 'phd',
    scene: 'phd',
    title: 'Performance Provenance — proposed direction',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 5',
        kicker: 'Proposed direction — for discussion',
        title: 'Performance Provenance',
        lines: ['A record that keeps every AI-assisted design change tied to its rule, its evidence, and the human decision.'],
        caveat: 'Example built from the real corridor study · scope and methods to refine with the supervisor.',
      },
      {
        kind: 'list',
        col: '1 / 5',
        row: '5 / 7',
        label: 'Possible methods',
        items: [
          { key: 'Build', text: 'the system from these prototypes' },
          { key: 'Test', text: 'with and without provenance' },
          { key: 'Ask', text: 'designers, in interviews', tone: 'coral' },
        ],
      },
      { kind: 'diagram', col: '5 / 13', row: '1 / 7', label: 'Fig. 21 · What the record keeps for one design change', diagram: 'provenance' },
    ],
    notes: [
      'This is the direction I would like to discuss: performance provenance. As the chain lights up, each link is something the record keeps — the intent, the rule, the change, the calculation, the result and its uncertainty, the AI’s reading, and the designer’s decision.',
      'Methods would combine building the system, technical validation, controlled comparison, and interviews — deliberately left open. I want to shape this with you, not arrive with it closed.',
    ],
  },

  // 19 ───────────────────────────────────────────────────────────────────────
  {
    id: 'genenv',
    scene: 'genenv',
    title: 'Why GenEnv',
    panels: [
      {
        kind: 'text',
        col: '1 / 5',
        row: '1 / 5',
        kicker: 'GenEnv research — not my projects',
        title: 'Why GenEnv',
        lines: [
          'GenEnv builds AI-assisted design that stays editable, traceable, and open to human judgment.',
          'I bring spatial design, working prototypes, and user studies — and I want to learn to grow them into a doctoral contribution.',
        ],
      },
      {
        kind: 'facts',
        col: '1 / 5',
        row: '5 / 7',
        label: 'Funded program',
        facts: [
          { label: 'Funder', value: 'NSERC Discovery' },
          { label: 'Term', value: '2026 – 2031' },
          { label: 'PI', value: 'Xun Liu' },
        ],
      },
      { kind: 'card', col: '5 / 9', row: '1 / 4', label: 'GenEnv · NSERC', title: 'Human-AI Co-Design', note: 'Performance-aware, editable design proposals — the program this interview is for.' },
      { kind: 'card', col: '9 / 13', row: '1 / 4', label: 'GenEnv · SSHRC', title: 'Decoding Urban Form', note: 'Agentic AI that turns Vancouver zoning into traceable 3D massing.' },
      { kind: 'card', col: '5 / 9', row: '4 / 7', label: 'GenEnv · open tool', title: 'Grasshopper MCP v2', note: 'Language models that drive Rhino / Grasshopper through MCP.' },
      { kind: 'card', col: '9 / 13', row: '4 / 7', label: 'LACF · Yuhao Lu (PI) with GenEnv', title: 'Digital Thermal Sandbox', note: 'Testing planting and materials against urban heat.' },
    ],
    notes: [
      'These four are GenEnv’s projects, not mine. The funded NSERC program, running 2026 to 2031, aims for AI-assisted design that stays editable, traceable, and open to human judgment — and my prototypes sit closest to Decoding Urban Form and the Grasshopper MCP work.',
      'I bring spatial design, computational prototyping, and human-centred evaluation. I would be excited to learn from Professor Liu and the team how to grow these prototypes into a coherent doctoral contribution.',
    ],
  },

  // 20 ───────────────────────────────────────────────────────────────────────
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
          '1 — Which part of this could contribute most to GenEnv’s current work?',
          '2 — Grow it through an existing GenEnv case, or a new focused design problem?',
          '3 — What should I strengthen before starting?',
        ],
        links: [
          { label: 'romanjahandideh.com', url: 'https://romanjahandideh.com' },
          { label: 'github.com/RomanJahandideh', url: 'https://github.com/RomanJahandideh' },
        ],
      },
      { kind: 'diagram', col: '8 / 13', row: '1 / 7', label: 'Fig. 22 · The route, complete', diagram: 'site' },
    ],
    notes: [
      'I would rather end with questions than conclusions. Which part of this direction could contribute most to GenEnv’s current work? Would it grow best through an existing GenEnv case, or a new focused problem? And what should I strengthen before I begin?',
      'Thank you — I would really value your thoughts.',
    ],
  },
] as const;

export const STEP_COUNT = STEPS.length;
