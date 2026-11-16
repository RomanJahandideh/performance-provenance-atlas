import type { Step } from './types';

/**
 * The whole presentation in exactly 20 steps. One scroll = one step.
 * Photo steps fill the screen; map steps play their drawing automatically.
 * Image sources and credits: docs/ASSET_MANIFEST.md.
 */
export const STEPS: readonly Step[] = [
  // ── 1 ─────────────────────────────────────────────────────────────────────
  {
    id: 'title',
    scene: 'opening',
    kind: 'map',
    p: [1, 1],
    camera: { x: 2400, y: 1380, w: 5000 },
    textAt: 'center',
    kicker: 'PHD INTERVIEW · GENENV LAB · UBC SALA',
    title: 'Performance Provenance',
    lines: [
      'Evidence-bearing human–AI co-design for performance-aware constructed environments.',
      'Roman Jahandideh · MA candidate, Interactive Arts and Technology, Simon Fraser University',
    ],
    notes: [
      'Thank you for meeting with me. I began by designing spaces and studying how people perceive them. My recent work asks a related question at a different level: when computational and AI systems take part in spatial design, how can their decisions stay visible, testable, and open to human revision?',
      'I will walk through where I trained, four prototypes I built, and a direction I would like to discuss with you.',
    ],
  },

  // ── 2 ─────────────────────────────────────────────────────────────────────
  {
    id: 'tabriz',
    scene: 'trajectory',
    kind: 'images',
    p: [0.15, 0.15],
    camera: { x: 620, y: 2120, w: 1700 },
    layout: 'trio',
    images: [
      { src: 'assets/photos/tabriz-2.jpg', alt: 'Brick buildings and a blossoming tree on the Tabriz Islamic Art University campus.', fit: 'cover' },
      { src: 'assets/photos/tabriz-1.jpg', alt: 'Brick tower of Tabriz Islamic Art University at sunset.', fit: 'cover' },
      { src: 'assets/photos/tabriz-3.jpg', alt: 'Brick hall and stone path on the Tabriz Islamic Art University campus.', fit: 'cover' },
    ],
    kicker: '2011 – 2016 · TABRIZ',
    title: 'Tabriz Islamic Art University',
    lines: ['B.Arch, Architecture — where I learned to make, draw, and defend a spatial idea.'],
    notes: [
      'My degrees look different, but they build one research profile. I trained as an architect at Tabriz Islamic Art University: spatial composition, public life, and visual communication.',
    ],
  },

  // ── 3 ─────────────────────────────────────────────────────────────────────
  {
    id: 'zangar',
    scene: 'trajectory',
    kind: 'images',
    p: [0.2, 0.2],
    camera: { x: 620, y: 2200, w: 1500 },
    layout: 'pair',
    images: [
      { src: 'assets/photos/zangar-night.jpg', alt: 'Night aerial render of the Zangar Museum: angular white roofs in a historic Tabriz district.', fit: 'cover' },
      { src: 'assets/photos/zangar-aerial.jpg', alt: 'Zangar Museum render: white faceted volumes with a patterned screen and stepped landscape terraces.', fit: 'cover' },
    ],
    kicker: 'BEST DISSERTATION AWARD · 2016',
    title: 'Zangar Museum',
    lines: ['My final architecture thesis — ranked first among graduating students.'],
    notes: [
      'This is my final architecture thesis, the Zangar Museum. It won the Best Dissertation Award. Projects like this taught me to argue for a spatial idea with drawings, models, and images — long before I had a codebase.',
    ],
  },

  // ── 4 ─────────────────────────────────────────────────────────────────────
  {
    id: 'competitions',
    scene: 'trajectory',
    kind: 'images',
    p: [0.22, 0.22],
    camera: { x: 620, y: 2200, w: 1500 },
    layout: 'board',
    images: [
      { src: 'assets/photos/cabin-board.jpg', alt: 'Competition board: foldable A-frame emergency cabins in a mountain valley, with structural details.', fit: 'contain', caption: 'Temporary residence against natural disasters' },
      { src: 'assets/photos/photo-ghost-of-playground.jpg', alt: 'Abstract long-exposure photograph in amber and violet, “The Ghost of Playground”.', fit: 'contain', caption: '“The Ghost of Playground”' },
      { src: 'assets/photos/photo-tunnel-to-heaven.jpg', alt: 'Abstract long-exposure photograph in gold and black, “A Tunnel To Heaven”.', fit: 'contain', caption: '“A Tunnel To Heaven”' },
    ],
    kicker: 'COMPETITIONS',
    title: 'Design and photography awards',
    stats: [
      { value: '6th', label: 'Sustainable cabin for natural disasters · 2018' },
      { value: 'Winner', label: 'Abstract Photo of City · 2018', color: 'yellow' },
      { value: '2nd', label: 'Landscape design competition' },
    ],
    notes: [
      'Competitions pushed me to communicate fast: a foldable cabin for disaster areas, which placed sixth, and a winning entry in an abstract city-photography competition. Photography taught me how framing, contrast, and ambiguity change what people see — a question that came back in my VR experiments.',
    ],
  },

  // ── 5 ─────────────────────────────────────────────────────────────────────
  {
    id: 'itu',
    scene: 'trajectory',
    kind: 'images',
    p: [0.45, 0.45],
    camera: { x: 660, y: 1620, w: 1600 },
    layout: 'trio',
    images: [
      { src: 'assets/photos/itu-2.jpg', alt: 'The Taşkışla building of Istanbul Technical University seen from the street.', fit: 'cover' },
      { src: 'assets/deck/campus-itu.jpeg', alt: 'Aerial view of ITU Taşkışla with red-tiled roofs among trees.', fit: 'cover' },
      { src: 'assets/photos/landscape-raingarden-3d.jpg', alt: 'Landscape diagram: two neighbourhood units with rain gardens, permeable paving, and storage tanks along a 4% slope.', fit: 'contain', caption: 'Landscape work: rain gardens and storm-water units' },
    ],
    kicker: '2020 – 2024 · ISTANBUL',
    title: 'Istanbul Technical University',
    lines: ['Master’s, Landscape Architecture — landscape systems, water, and site, plus my first VR perception experiments.'],
    notes: [
      'At Istanbul Technical University I studied landscape architecture: dynamic systems, water, and site conditions. It is also where I began testing perception inside virtual environments.',
    ],
  },

  // ── 6 ─────────────────────────────────────────────────────────────────────
  {
    id: 'ecaade',
    scene: 'foundation',
    kind: 'map',
    p: [0, 0.38],
    camera: { x: 494, y: 665, w: 1480 },
    textAt: 'left',
    kicker: 'PUBLISHED · ECAADE 2023',
    title: 'Transparency reverses depth',
    lines: ['In VR, at high transparency, cool and dark colours read as nearer — the familiar rule flips.'],
    stats: [
      { value: '60', label: 'participants · Quest 2' },
      { value: '264', label: 'pairwise judgments each' },
    ],
    notes: [
      'My published eCAADe study: sixty participants, two hundred sixty-four pairwise depth judgments each, across transparency, hue, and luminance in VR. Watch the spheres: at high transparency the familiar rule reverses — cool and dark colours read as nearer. Visual rules for opaque graphics do not simply transfer.',
    ],
  },

  // ── 7 ─────────────────────────────────────────────────────────────────────
  {
    id: 'sfu',
    scene: 'trajectory',
    kind: 'images',
    p: [0.8, 0.8],
    camera: { x: 800, y: 1130, w: 1650 },
    layout: 'trio',
    images: [
      { src: 'assets/photos/sfu-2.jpg', alt: 'The Grand Hall atrium of SFU Surrey under its timber roof.', fit: 'cover' },
      { src: 'assets/photos/sfu-1.jpg', alt: 'SFU Surrey campus among the towers of Surrey Central.', fit: 'cover' },
      { src: 'assets/deck/campus-sfu.jpeg', alt: 'SFU Surrey campus building at dusk.', fit: 'cover' },
    ],
    kicker: '2025 – PRESENT · VANCOUVER',
    title: 'Simon Fraser University · iViz Lab',
    lines: ['MA, Interactive Arts and Technology — building complete interactive systems and testing them with people.'],
    notes: [
      'At SFU, in the iViz Lab, I learned to build complete interactive systems — Unity, C#, physiological sensing, multiplayer networking — and to evaluate them with HCI methods.',
    ],
  },

  // ── 8 ─────────────────────────────────────────────────────────────────────
  {
    id: 'body',
    scene: 'foundation',
    kind: 'images',
    p: [0.9, 0.9],
    camera: { x: 900, y: 700, w: 1800 },
    layout: 'pair',
    images: [
      { src: 'assets/figures/iss-teaser.png', alt: 'The cooperative cooking game with one glowing heartbeat halo per remote teammate.', fit: 'contain', caption: 'Reading a Remote Teammate’s Body · ACM ISS ’26' },
      { src: 'assets/projects/bioterrarium-hero.webp', alt: 'BioTerrarium: a glass-enclosed world of glowing crystal plants, fog, and a small lighthouse.', fit: 'cover', caption: 'BioTerrarium' },
    ],
    kicker: 'ACCEPTED · ACM ISS ’26   ·   UNDER REVISION',
    title: 'Bodies in the loop',
    stats: [
      { value: '3.90 s', label: 'faster teammate support with the halo', color: 'cyan' },
      { value: '<200 ms', label: 'wearable → world in BioTerrarium', color: 'cyan' },
    ],
    caveat: 'Numbers stayed more trusted than the halo · BioTerrarium results are provisional (manuscript under revision).',
    notes: [
      'My accepted ACM ISS paper shows a remote teammate’s heart rate as one label-free halo. In live three-player teams, support came almost four seconds faster than with no cue — but plain numbers stayed more trusted. A real trade-off.',
      'BioTerrarium runs the loop the other way: an Apple Watch drives fog, light, and plants in under two hundred milliseconds. Its manuscript is under revision, so I treat the analysis as provisional. These projects taught me to treat an environment as a responsive system — and the next four move that thinking into urban design.',
    ],
  },

  // ── 9–10 · Zoning Literacy Assistant ──────────────────────────────────────
  {
    id: 'zla-1',
    scene: 'zla',
    kind: 'map',
    p: [0, 0.44],
    camera: { x: 1664, y: 1600, w: 2150 },
    textAt: 'left',
    kicker: 'PROJECT 1 OF 4 · REGULATION',
    title: 'Zoning Literacy Assistant',
    lines: ['It finds the relevant clauses, answers only from them, then checks its own answer.'],
    notes: [
      'My first project is about trustworthy regulatory knowledge. A general-purpose language model will happily answer confidently even when the information is not there. So I split the system into retrieval, answering, and independent verification: it finds the clauses, answers only from those, then checks whether the evidence really supports the answer.',
    ],
  },
  {
    id: 'zla-2',
    scene: 'zla',
    kind: 'map',
    p: [0.46, 1],
    camera: { x: 1664, y: 1600, w: 2150 },
    textAt: 'left',
    title: 'When the rule is silent, it says so',
    stats: [
      { value: 'NOT COVERED', label: '“not covered by the provided source”', color: 'orange' },
      { value: '162.6 m²', label: 'site area computed in code, not by AI', color: 'cyan' },
    ],
    caveat: 'Prototype knowledge base: ten clauses of Vancouver R1-1, not the full zoning code.',
    links: [
      { label: 'Live system', url: 'https://romanjahandideh.github.io/zoning-literacy-assistant/' },
      { label: 'GitHub', url: 'https://github.com/RomanJahandideh/zoning-literacy-assistant' },
    ],
    notes: [
      'When the source does not contain the answer — here, how many storeys a laneway house may have — it stops: “not covered by the provided source.” Refusing is designed behaviour, not a failure. Site arithmetic is done in ordinary code, so the same inputs always give the same result; the AI only explains it.',
      'Once regulation is structured and traceable, the next question is how it becomes editable geometry.',
    ],
  },

  // ── 11–12 · Parametric Massing Generator ──────────────────────────────────
  {
    id: 'pmg-1',
    scene: 'pmg',
    kind: 'map',
    p: [0, 0.56],
    camera: { x: 1891, y: 1340, w: 2450 },
    textAt: 'left',
    kicker: 'PROJECT 2 OF 4 · GEOMETRY',
    title: 'Parametric Massing Generator',
    lines: ['AI reads the bylaw into eight constraints. Code turns them into an editable building envelope.'],
    stats: [{ value: '0.70 → 1.00', label: 'floor-space ratio, rental condition → +1 storey', color: 'yellow' }],
    notes: [
      'The Massing Generator moves from regulatory language to form. AI extracts eight constraints and keeps the source phrase and a confidence level for each. Then deterministic code applies them: setbacks, footprint, floor area, and the massing. It is parametric because changing one value updates everything that depends on it — watch the rental condition add a storey.',
    ],
  },
  {
    id: 'pmg-2',
    scene: 'pmg',
    kind: 'map',
    p: [0.58, 1],
    camera: { x: 1891, y: 1340, w: 2450 },
    textAt: 'left',
    title: 'Same method, bigger sites',
    lines: ['From a simple lot to irregular parcels and whole blocks — and an independent reviewer checks each result.'],
    caveat: 'Research prototype, not code-compliance advice.',
    links: [
      { label: 'Live system', url: 'https://romanjahandideh.github.io/parametric-massing-generator/' },
      { label: 'GitHub', url: 'https://github.com/RomanJahandideh/parametric-massing-generator' },
    ],
    notes: [
      'The same clipping method scales to irregular parcels and AI-classified urban blocks, and a separate reviewer checks the interpretation. My interest is not automatic form generation — it is keeping source, parameter, geometry, and revision connected.',
      'But a compliant envelope does not tell us whether the geometry performs well, or what simplifying a rule costs.',
    ],
  },

  // ── 13–14 · Vancouver View Corridor Massing ───────────────────────────────
  {
    id: 'vcm-1',
    scene: 'vcm',
    kind: 'map',
    p: [0, 0.6],
    camera: { x: 2529, y: 1490, w: 2690 },
    textAt: 'left',
    kicker: 'PROJECT 3 OF 4 · PERFORMANCE',
    title: 'Vancouver View Corridor Massing',
    lines: ['A protected view is a sloped ceiling, not a flat height limit.'],
    stats: [
      { value: '10 → 18', label: 'floors: flat cap vs floor-by-floor', color: 'cyan' },
      { value: '+39.5%', label: 'usable floor area recovered', color: 'yellow' },
    ],
    notes: [
      'Vancouver’s protected views create sloped ceilings, not flat height limits. The usual shortcut caps the whole site at the lowest point: ten floors, about eighteen thousand square metres. Trimming floor by floor against the real slope gives eighteen floors and over twenty-five thousand — thirty-nine and a half percent more, from precision alone. Geometry proposes; evaluation provides the evidence.',
    ],
  },
  {
    id: 'vcm-2',
    scene: 'vcm',
    kind: 'map',
    p: [0.62, 1],
    camera: { x: 2529, y: 1490, w: 2690 },
    textAt: 'left',
    title: 'Orientation becomes a free choice',
    lines: ['Across seven rotations the total area changes by only 0.02% — so the form can follow program, not just yield.'],
    caveat: 'Real City corridor geometry · base elevation and slope are placeholders · one Rhino step not executed.',
    links: [{ label: 'GitHub', url: 'https://github.com/RomanJahandideh/vancouver-view-corridor-massing' }],
    notes: [
      'Rotating the footprint barely changes total area, so orientation can serve silhouette or program instead of yield. Honest flags: the corridor geometry is real, but the elevation values are placeholders.',
      'The last project extends this to several competing objectives, where no single design wins everywhere.',
    ],
  },

  // ── 15–16 · Environmental Massing Agents ──────────────────────────────────
  {
    id: 'ema-1',
    scene: 'ema',
    kind: 'map',
    p: [0, 0.42],
    camera: { x: 2984, y: 1040, w: 2190 },
    textAt: 'left',
    kicker: 'PROJECT 4 OF 4 · CRITIQUE',
    title: 'Environmental Massing Agents',
    lines: ['Six AI roles propose and critique designs. Deterministic code calculates every score.'],
    notes: [
      'Environmental Massing Agents extends the workflow to many objectives at once. A Generator proposes designs; four Critics read the solar, carbon, wind, and floor-area results; an Orchestrator picks the next direction. The key rule: the agents never calculate the scores. Ordinary code provides the evidence; the agents interpret it.',
    ],
  },
  {
    id: 'ema-2',
    scene: 'ema',
    kind: 'map',
    p: [0.44, 1],
    camera: { x: 2984, y: 1040, w: 2190 },
    textAt: 'left',
    title: 'The honest result',
    stats: [
      { value: 'NOT CONFIRMED', label: 'my guess: directed search is faster', color: 'red' },
      { value: '4 / 5 vs 1 / 5', label: 'runs reaching the target: reliability', color: 'cyan' },
    ],
    caveat: 'Wind is a heuristic, carbon a benchmark — not CFD or a full LCA · the live LLM loop was not run.',
    links: [{ label: 'GitHub', url: 'https://github.com/RomanJahandideh/environmental-massing-agents' }],
    notes: [
      'I compared a genetic optimizer, NSGA-II, with random search: five runs each, two hundred evaluations, against a full grid of one thousand eighty designs. I expected it to be faster — it was not. What it showed was reliability: four of five runs reached the target, against one of five. Reporting that difference matters: it separates what I expected from what the results support.',
    ],
  },

  // ── 17 ────────────────────────────────────────────────────────────────────
  {
    id: 'synthesis',
    scene: 'synthesis',
    kind: 'map',
    p: [0, 1],
    camera: { x: 2138, y: 1300, w: 3750 },
    textAt: 'left',
    kicker: 'FOUR PROJECTS · ONE PATH',
    title: 'Rule → geometry → performance → judgment',
    lines: ['Each project adds one link. The designer keeps the final say.'],
    notes: [
      'Together these form one direction: trustworthy regulatory knowledge, editable geometry, measurable evidence, and agents that discuss verified trade-offs — while the final judgment stays with the designer.',
    ],
  },

  // ── 18 ────────────────────────────────────────────────────────────────────
  {
    id: 'phd',
    scene: 'phd',
    kind: 'map',
    p: [0, 1],
    camera: { x: 3273, y: 995, w: 2150 },
    textAt: 'left',
    kicker: 'PROPOSED DIRECTION — FOR DISCUSSION',
    title: 'Performance Provenance',
    lines: ['A record that keeps every AI-assisted design change tied to its rule, its evidence, and the human decision.'],
    caveat: 'Conceptual demonstration built from the corridor study · scope and methods to refine with the supervisor.',
    notes: [
      'This is the direction I would like to discuss: performance provenance. As the chain lights up, each link is something the record keeps — the intent, the rule, the change, the calculation, the result and its uncertainty, the AI’s reading, and the designer’s decision.',
      'Methods would combine building the system, technical validation, controlled comparison, and interviews — deliberately left open. I want to shape this with you, not arrive with it closed.',
    ],
  },

  // ── 19 ────────────────────────────────────────────────────────────────────
  {
    id: 'genenv',
    scene: 'genenv',
    kind: 'map',
    p: [0, 1],
    camera: { x: 4017, y: 950, w: 2360 },
    textAt: 'left',
    kicker: 'GENENV RESEARCH — NOT MY PROJECTS',
    title: 'Why GenEnv',
    lines: [
      'NSERC Human-AI Co-Design Framework for Performance-Aware Constructed Environments (2026–2031): outcomes that stay editable, traceable, and open to human judgment.',
      'I bring spatial design, working prototypes, and user studies — and I want to learn to turn them into a doctoral contribution.',
    ],
    notes: [
      'This territory is drawn separately because it is not mine. GenEnv’s funded NSERC program, running 2026 to 2031, aims for AI-assisted design that stays editable, traceable, and open to human judgment.',
      'I bring spatial design, computational prototyping, and human-centred evaluation. I would be excited to learn from Professor Liu and the team how to grow these prototypes into a coherent doctoral contribution.',
    ],
  },

  // ── 20 ────────────────────────────────────────────────────────────────────
  {
    id: 'thanks',
    scene: 'conversation',
    kind: 'map',
    p: [1, 1],
    camera: { x: 2400, y: 1380, w: 5000 },
    textAt: 'center',
    kicker: 'THANK YOU',
    title: 'Three questions',
    lines: [
      'Which part of this could contribute most to GenEnv’s current work?',
      'Grow it through an existing GenEnv case, or a new focused design problem?',
      'What should I strengthen before starting?',
    ],
    links: [
      { label: 'romanjahandideh.com', url: 'https://romanjahandideh.com' },
      { label: 'github.com/RomanJahandideh', url: 'https://github.com/RomanJahandideh' },
    ],
    notes: [
      'I would rather end with questions than conclusions. Which part of this direction could contribute most to GenEnv’s current work? Would it grow best through an existing GenEnv case, or a new focused problem? And what should I strengthen before I begin?',
      'Thank you — I would really value your thoughts.',
    ],
  },
] as const;

export const STEP_COUNT = STEPS.length;
