import type { Sheet, Step } from './types';

/**
 * Eleven presentation sheets that tell one continuous story, from making things
 * as a child to AI for spatial design at GenEnv. Each sheet is one board that is
 * always fully visible; each scroll moves to the next step, which zooms to one
 * region and changes the text in the side column. The side text is what Roman
 * says, so the speaker notes default to it.
 * Image credits: docs/ASSET_MANIFEST.md. Writing rule: plain sentences, no dashes.
 */

/** Zangar Museum pages on a board that starts at column `c` (each page is 4 columns by 3 rows). */
function zangarPanels(c: number) {
  const col = (k: number) => `${c + k * 4} / ${c + k * 4 + 4}`;
  return [
    { kind: 'image' as const, col: col(0), row: '1 / 4', label: 'Night view', src: 'assets/portfolio/p019.jpg', alt: 'Portfolio page: night aerial render of the Zangar Museum in the city.', fit: 'contain' as const },
    { kind: 'image' as const, col: col(1), row: '1 / 4', label: 'Aerial view', src: 'assets/portfolio/p030.jpg', alt: 'Portfolio page: aerial render with the plaza and patterned facade.', fit: 'contain' as const },
    { kind: 'image' as const, col: col(2), row: '1 / 4', label: 'Site plan', src: 'assets/portfolio/p022.jpg', alt: 'Portfolio page: city site plan with the museum location.', fit: 'contain' as const },
    { kind: 'image' as const, col: col(0), row: '4 / 7', label: 'Concept and history', src: 'assets/portfolio/p018.jpg', alt: 'Portfolio page: concept text and the three historical periods as three forms.', fit: 'contain' as const },
    { kind: 'image' as const, col: col(1), row: '4 / 7', label: 'Floor plans', src: 'assets/portfolio/p023.jpg', alt: 'Portfolio page: floor plans with galleries, depot, parking and amphitheater.', fit: 'contain' as const },
    { kind: 'image' as const, col: col(2), row: '4 / 7', label: 'Floor plans', src: 'assets/portfolio/p024.jpg', alt: 'Portfolio page: floor plans with art classes, galleries, entrance and restaurant.', fit: 'contain' as const },
    { kind: 'image' as const, col: col(0), row: '7 / 10', label: 'North and west elevations', src: 'assets/portfolio/p026.jpg', alt: 'Portfolio page: north and west elevations.', fit: 'contain' as const },
    { kind: 'image' as const, col: col(1), row: '7 / 10', label: 'Section', src: 'assets/portfolio/p027.jpg', alt: 'Portfolio page: section through the galleries and green yard.', fit: 'contain' as const },
    { kind: 'image' as const, col: col(2), row: '7 / 10', label: 'Interiors', src: 'assets/portfolio/p028.jpg', alt: 'Portfolio page: interior renders of the gallery entrance and temporary gallery.', fit: 'contain' as const },
  ];
}

/** Büyükada landscape pages on a board that starts at column `c`. */
function landscapePanels(c: number) {
  const col = (k: number) => `${c + k * 4} / ${c + k * 4 + 4}`;
  const page = (k: number, row: string, n: string, label: string, alt: string) => ({ kind: 'image' as const, col: col(k), row, label, src: `assets/portfolio/p${n}.jpg`, alt, fit: 'contain' as const });
  return [
    page(0, '1 / 4', '109', 'Site and slope analysis', 'Portfolio page: topography analysis and existing roads.'),
    page(1, '1 / 4', '113', 'Why rain gardens', 'Portfolio page: reasons to build rain gardens on Büyükada.'),
    page(2, '1 / 4', '114', 'Side section of the park', 'Portfolio page: section showing water moving down the slope.'),
    page(0, '4 / 7', '117', 'Where the water goes', 'Portfolio page: section with water harvesting pools and terraces.'),
    page(1, '4 / 7', '121', 'Techniques for each unit', 'Portfolio page: sketch of roof collectors, rain barrels, cisterns and rain gardens.'),
    page(2, '4 / 7', '127', 'Bioretention', 'Portfolio page: bioretention diagram with gravel bed and underdrain.'),
    page(0, '7 / 10', '122', 'Two housing units', 'Portfolio page: 3D model of two units with rain gardens and storage tanks.'),
    page(1, '7 / 10', '123', 'Top view', 'Portfolio page: top view of the two connected units.'),
    page(2, '7 / 10', '130', 'Unit 1', 'Portfolio page: Unit 1 model, plan and storm water section.'),
  ];
}

export const SHEETS: readonly Sheet[] = [
  // ── 01 · Title ─────────────────────────────────────────────────────────────
  {
    id: 'title',
    scene: 'opening',
    section: 'PhD interview · GenEnv Lab · UBC SALA',
    title: 'Performance Provenance',
    cols: 12,
    rows: 8,
    panels: [
      { kind: 'diagram', col: '1 / 9', row: '1 / 9', label: 'Fig. 01 · The route through my work', diagram: 'site' },
      {
        kind: 'facts',
        col: '9 / 13',
        row: '1 / 5',
        label: 'Presenter',
        facts: [
          { label: 'Name', value: 'Roman Jahandideh' },
          { label: 'Program', value: 'MSc, Interactive Arts and Technology' },
          { label: 'University', value: 'Simon Fraser University' },
        ],
      },
      {
        kind: 'list',
        col: '9 / 13',
        row: '5 / 9',
        label: 'The story',
        items: [
          { key: '02', text: 'Where it started' },
          { key: '03 to 05', text: 'Architecture, awards' },
          { key: '05 to 06', text: 'Landscape, then SFU' },
          { key: '07 to 09', text: 'Papers and prototypes' },
          { key: '10 to 11', text: 'Direction and fit' },
        ],
      },
    ],
    steps: [
      {
        title: 'Performance Provenance',
        lines: [
          'Human and AI design together, with every decision backed by evidence you can check.',
          'This is the story of how I went from making things as a child to AI for spatial design, and the PhD direction I would like to discuss with you.',
        ],
      },
    ],
  },

  // ── 02 · Where it started ──────────────────────────────────────────────────
  {
    id: 'start',
    scene: 'trajectory',
    section: 'Sheet 02 · Where it started',
    title: 'Where it started',
    cols: 12,
    rows: 8,
    panels: [
      { kind: 'image', col: '1 / 10', row: '1 / 6', label: 'Me, already busy making things', src: 'assets/photos/childhood.jpg', alt: 'Childhood photo of Roman in a kitchen, opening a drawer to see what is inside.', fit: 'contain' },
      { kind: 'card', col: '10 / 13', row: '1 / 6', label: 'Always', title: 'Making new things', note: 'Building something new always made me wonder how it works and how people will use it.' },
      { kind: 'card', col: '1 / 7', row: '6 / 9', label: 'Elementary and high school', title: 'NODET', note: 'Iran’s National Organization for Development of Exceptional Talents. Entry through competitive national exams.' },
      {
        kind: 'facts',
        col: '7 / 13',
        row: '6 / 9',
        label: 'School',
        facts: [
          { label: 'Years', value: '2004 to 2011' },
          { label: 'Entry', value: 'Competitive national exams', tone: 'yellow' },
        ],
      },
    ],
    steps: [
      {
        title: 'Making things',
        lines: [
          'I have been making things since I was a child.',
          'Building something new always made me wonder how it works and how people will use it. That curiosity still drives my research.',
        ],
      },
      {
        focus: { col: '1 / 13', row: '6 / 9' },
        title: 'NODET schools',
        lines: [
          'For elementary and high school I studied at NODET, Iran’s national schools for exceptionally talented students.',
          'Getting in meant passing competitive national exams. These schools are among the highest ranked in the country.',
        ],
        facts: [{ label: 'Years', value: '2004 to 2011' }],
      },
    ],
  },

  // ── 03 · Architecture ──────────────────────────────────────────────────────
  {
    id: 'architecture',
    scene: 'trajectory',
    section: 'Sheet 03 · Architecture, Tabriz',
    title: 'From making things to designing places',
    cols: 16,
    rows: 9,
    panels: [
      { kind: 'image', col: '1 / 5', row: '1 / 6', label: 'Tabriz Islamic Art University', src: 'assets/photos/tabriz-2.jpg', alt: 'Brick buildings and a blossoming tree on the Tabriz Islamic Art University campus.', credit: 'Ashkan najar · CC BY-SA 4.0' },
      {
        kind: 'facts',
        col: '1 / 5',
        row: '6 / 10',
        label: 'Degree',
        facts: [
          { label: 'Degree', value: 'B.Arch' },
          { label: 'Years', value: '2011 to 2016' },
          { label: 'Thesis award', value: 'Best Dissertation', tone: 'yellow' },
        ],
      },
      ...zangarPanels(5),
    ],
    steps: [
      {
        title: 'From making things to designing places',
        lines: [
          'My love of making turned into architecture.',
          'At Tabriz Islamic Art University I learned to develop a spatial idea, draw it and defend it. My final project was the Zangar Museum.',
        ],
      },
      {
        focus: { col: '1 / 5', row: '1 / 10' },
        title: 'Tabriz Islamic Art University',
        lines: ['Bachelor of Architecture, 2011 to 2016.', 'I worked on spatial composition, public space and visual communication.'],
      },
      {
        focus: { col: '5 / 13', row: '1 / 4' },
        title: 'A museum about a century of history',
        lines: [
          'The Zangar Museum tells the story of Tabriz people under three governments over about a hundred years.',
          'Each period became one sharp, angled form, so visitors read the history through the building itself.',
        ],
      },
      {
        focus: { col: '9 / 17', row: '1 / 7' },
        title: 'Site and plans',
        lines: ['Galleries, art classes, an amphitheater, a library and a restaurant sit inside and between the three forms.'],
      },
      {
        focus: { col: '5 / 17', row: '7 / 10' },
        title: 'Elevations, section, interiors',
        lines: [
          'A patterned screen wraps the galleries, and the section steps around a green yard.',
          'Supervised by Prof. Parisa Hashempour, it ranked first in my class.',
        ],
        facts: [{ label: 'Award', value: 'Best Dissertation, 2016', tone: 'yellow' }],
      },
    ],
  },

  // ── 04 · Competitions ──────────────────────────────────────────────────────
  {
    id: 'awards',
    scene: 'trajectory',
    section: 'Sheet 04 · Competitions',
    title: 'Design and photography awards',
    cols: 12,
    rows: 8,
    panels: [
      { kind: 'image', col: '1 / 7', row: '1 / 5', label: 'Temporary housing after natural disasters', src: 'assets/portfolio/p101.jpg', alt: 'Portfolio page: competition board with foldable A-frame cabins in a mountain valley.', fit: 'contain' },
      { kind: 'image', col: '1 / 7', row: '5 / 9', label: 'Plans and assembly', src: 'assets/portfolio/p102.jpg', alt: 'Portfolio page: cabin plans and the stages of unfolding the panels.', fit: 'contain' },
      { kind: 'image', col: '7 / 13', row: '1 / 5', label: 'Abstract Photo of City · winner', src: 'assets/portfolio/p105.jpg', alt: 'Portfolio page: winning photograph “A Tunnel To Heaven”.', fit: 'contain' },
      { kind: 'image', col: '7 / 13', row: '5 / 9', label: 'Abstract Photo of City · winner', src: 'assets/portfolio/p106.jpg', alt: 'Portfolio page: winning photograph “The Ghost of Playground”.', fit: 'contain' },
    ],
    steps: [
      {
        title: 'Design and photography awards',
        lines: ['Competitions pushed me to explain ideas quickly and clearly.'],
        facts: [
          { label: 'Disaster cabin, 2018', value: 'Sixth prize' },
          { label: 'Abstract Photo of City, 2018', value: 'Winner', tone: 'yellow' },
          { label: 'Landscape design, Tabriz Art University', value: 'Second prize' },
        ],
      },
      {
        focus: { col: '1 / 7', row: '1 / 9' },
        title: 'A cabin that unfolds',
        lines: [
          'Temporary housing for people after a natural disaster.',
          'The panels fold out on hinges, and two people can lift them into place. It placed sixth in the Memar News competition.',
        ],
      },
      {
        focus: { col: '7 / 13', row: '1 / 9' },
        title: 'Abstract city photography',
        lines: [
          'Long exposures of the city at night. The blur hides objects and leaves only light, colour and depth.',
          'It taught me how framing changes what people see, a question I later tested in VR.',
        ],
        facts: [{ label: 'Result', value: 'Winner, 2018', tone: 'yellow' }],
      },
    ],
  },

  // ── 05 · Landscape ─────────────────────────────────────────────────────────
  {
    id: 'landscape',
    scene: 'trajectory',
    section: 'Sheet 05 · Landscape architecture, Istanbul',
    title: 'Why landscape',
    cols: 16,
    rows: 9,
    panels: [
      { kind: 'image', col: '1 / 5', row: '1 / 6', label: 'Istanbul Technical University', src: 'assets/photos/itu-2.jpg', alt: 'The Taşkışla building of Istanbul Technical University.', credit: 'CeeGee · CC BY-SA 3.0' },
      {
        kind: 'facts',
        col: '1 / 5',
        row: '6 / 10',
        label: 'Degree',
        facts: [
          { label: 'Degree', value: 'Master’s' },
          { label: 'Years', value: '2020 to 2024' },
          { label: 'Lab', value: 'Virtual Landscape Lab' },
        ],
      },
      ...landscapePanels(5),
    ],
    steps: [
      {
        title: 'Why landscape',
        lines: [
          'As an architect I designed how buildings change their surroundings.',
          'I wanted to explore the other direction too: how the environment shapes our design. That is why I chose landscape architecture.',
        ],
      },
      {
        focus: { col: '1 / 5', row: '1 / 10' },
        title: 'Istanbul Technical University',
        lines: [
          'Master’s in Landscape Architecture, 2020 to 2024.',
          'In the Virtual Landscape Lab with Dr. Ikhwan Kim I also began testing how people perceive virtual landscapes.',
        ],
      },
      {
        focus: { col: '5 / 13', row: '1 / 4' },
        title: 'Reading the site',
        lines: ['On Büyükada, steep streets send rainwater and pollution straight down the slope.', 'I mapped the slope and roads first, so the design starts from the water.'],
      },
      {
        focus: { col: '9 / 17', row: '1 / 7' },
        title: 'A system for water',
        lines: [
          'Roof collectors, rain barrels, cisterns, permeable paving and planted basins work together.',
          'Each step slows the water a little and lets it soak in or be stored.',
        ],
      },
      {
        focus: { col: '5 / 13', row: '7 / 10' },
        title: 'Housing units on the slope',
        lines: ['Every unit uses the same techniques and connects down the hill to shared storage tanks.', 'I started thinking of design as a system, not a single object.'],
      },
      {
        title: 'Why I turned to computation',
        lines: [
          'My VR experiments at ITU showed me that environments can be designed, tested and measured digitally.',
          'I wanted to build my own design systems instead of only using other people’s tools, and to learn what AI could do for design. That led me to SFU.',
        ],
      },
    ],
  },

  // ── 06 · SFU ───────────────────────────────────────────────────────────────
  {
    id: 'sfu',
    scene: 'trajectory',
    section: 'Sheet 06 · Interactive Arts and Technology, Vancouver',
    title: 'Learning to build',
    cols: 12,
    rows: 8,
    panels: [
      { kind: 'image', col: '1 / 7', row: '1 / 9', label: 'SFU Surrey · Grand Hall', src: 'assets/photos/sfu-2.jpg', alt: 'The Grand Hall atrium of SFU Surrey under its timber roof.', credit: 'Canmenwalker · CC BY 4.0' },
      { kind: 'image', col: '7 / 10', row: '1 / 5', label: 'Surrey Central', src: 'assets/photos/sfu-1.jpg', alt: 'SFU Surrey campus among the towers of Surrey Central.', credit: 'Northwest · CC BY 4.0' },
      { kind: 'image', col: '10 / 13', row: '1 / 5', label: 'SIAT at dusk', src: 'assets/deck/campus-sfu.jpeg', alt: 'SFU Surrey campus building at dusk.' },
      { kind: 'image', col: '7 / 10', row: '5 / 9', label: 'Direction 1 · body and space', src: 'assets/papers/iss-apparatus.jpg', alt: 'A study participant wearing an Apple Watch while playing the cooperative game.' },
      { kind: 'image', col: '10 / 13', row: '5 / 9', label: 'Direction 2 · AI for design', src: 'assets/projects/pmg-hero.webp', alt: 'AI-assisted massing on an urban block.', fit: 'contain' },
    ],
    steps: [
      {
        title: 'Learning to build',
        lines: [
          'In 2025 I started a Master of Science at SFU’s School of Interactive Arts and Technology.',
          'My goal was to learn to code and to gain confidence designing complete systems, not just using them.',
        ],
      },
      {
        focus: { col: '1 / 7', row: '1 / 9' },
        title: 'SIAT',
        lines: [
          'I learned to code in Unity and C#, Python and JavaScript, and to run user studies.',
          'For the first time I could build the environments I had been drawing.',
        ],
        facts: [{ label: 'Degree', value: 'MSc, since 2025' }],
      },
      {
        focus: { col: '7 / 13', row: '1 / 5' },
        title: 'iViz Lab',
        lines: ['In the iViz Lab with Prof. Steve DiPaola I studied AI, and I used it to explore my architectural ideas as working prototypes.'],
      },
      {
        focus: { col: '7 / 13', row: '5 / 9' },
        title: 'Two directions',
        lines: [
          'One direction asks how a person’s physiological state can change the environment around them.',
          'The other asks how AI can help us design space. The next sheets show each one.',
        ],
      },
    ],
  },

  // ── 07 · Publications ──────────────────────────────────────────────────────
  {
    id: 'publications',
    scene: 'foundation',
    section: 'Sheet 07 · Publications',
    title: 'Publications',
    cols: 12,
    rows: 12,
    panels: [
      {
        kind: 'facts',
        col: '1 / 4',
        row: '1 / 7',
        label: 'eCAADe 2023 · published',
        facts: [
          { label: 'Conference', value: 'eCAADe 41, Digital Design Reconsidered' },
          { label: 'Where', value: 'Graz University of Technology, Austria' },
          { label: 'When', value: '20 to 23 September 2023' },
          { label: 'Proceedings', value: 'Volume 1, pages 149 to 158' },
        ],
      },
      { kind: 'image', col: '4 / 7', row: '1 / 4', label: 'Four transparency levels', src: 'assets/papers/ecaade-spheres.jpg', alt: 'Four spheres at 10, 40, 60 and 90 percent transparency.', fit: 'contain' },
      { kind: 'image', col: '4 / 7', row: '4 / 7', label: 'Twelve colour conditions', src: 'assets/papers/ecaade-colours.jpg', alt: 'Six hues in bright and dark versions with their hex codes.', fit: 'contain' },
      {
        kind: 'facts',
        col: '7 / 10',
        row: '1 / 7',
        label: 'ACM ISS 2026 · accepted',
        facts: [
          { label: 'Conference', value: 'ACM Interactive Surfaces and Spaces' },
          { label: 'Where', value: 'Turin, Italy' },
          { label: 'When', value: '23 to 26 November 2026' },
          { label: 'Published in', value: 'ISS Companion, poster track' },
        ],
      },
      { kind: 'image', col: '10 / 13', row: '1 / 4', label: 'The 16 halo states', src: 'assets/papers/iss-halos.jpg', alt: 'Sixteen halo icons combining heart rate and heart rate variability states.', fit: 'contain' },
      { kind: 'image', col: '10 / 13', row: '4 / 7', label: 'Recognition results', src: 'assets/papers/iss-accuracy.jpg', alt: 'Charts of recognition accuracy against chance and confusion matrices.', fit: 'contain' },
      {
        kind: 'facts',
        col: '1 / 4',
        row: '7 / 13',
        label: 'BioTerrarium · under revision',
        facts: [
          { label: 'Submitted to', value: 'ACM SIGGRAPH 2026' },
          { label: 'Status', value: 'Not accepted, now being revised', tone: 'orange' },
          { label: 'Study', value: '24 people, two conditions' },
          { label: 'Built with', value: 'Apple Watch, Swift, Unity 6' },
        ],
      },
      { kind: 'image', col: '4 / 7', row: '7 / 10', label: 'Four body states, four worlds', src: 'assets/papers/bio-zones.jpg', alt: 'Four terrarium scenes from calm to overdrive, each linked to a heart rate zone.', fit: 'contain' },
      { kind: 'image', col: '4 / 7', row: '10 / 13', label: 'The terrarium', src: 'assets/projects/bioterrarium-hero.webp', alt: 'BioTerrarium: glowing crystal plants, fog and a lighthouse.' },
      { kind: 'card', col: '7 / 13', row: '7 / 9', label: 'eCAADe → human-AI co-design', title: 'How a design looks changes how it is judged', note: 'Co-design tools need evidence about how people read what they show.' },
      { kind: 'card', col: '7 / 13', row: '9 / 11', label: 'ISS → human-AI co-design', title: 'Speed and trust can pull apart', note: 'The halo made help faster, but numbers were trusted more. Tools that show performance data face the same choice.' },
      { kind: 'card', col: '7 / 13', row: '11 / 13', label: 'BioTerrarium → performance-informed design', title: 'Measured data changing a space in real time', note: 'A small, live version of a feedback loop between performance and form.' },
    ],
    steps: [
      {
        title: 'Publications',
        lines: [
          'My VR work at ITU and the body and space direction at SFU led to three papers.',
          'All three ask how people read and react to information in space.',
        ],
      },
      {
        focus: { col: '1 / 7', row: '1 / 7' },
        title: 'Creating Immersive Virtual Landscapes',
        lines: [
          'From my time at ITU. In VR, when objects become very transparent, cool and dark colours look closer than warm and bright ones. That is the opposite of the usual rule.',
        ],
        facts: [
          { label: 'Participants', value: '60' },
          { label: 'Judgments each', value: '264' },
          { label: 'Authors', value: 'R. Jahandideh, A. Jahandideh, I. Kim' },
        ],
        links: [{ label: 'DOI', url: 'https://doi.org/10.52842/conf.ecaade.2023.1.149' }],
      },
      {
        focus: { col: '7 / 13', row: '1 / 7' },
        title: 'Reading a Remote Teammate’s Body',
        lines: [
          'A teammate’s heart rate shown as a glowing halo instead of numbers. People recognised the halo states well above chance, and teams helped each other faster with it.',
        ],
        facts: [
          { label: 'Halo states recognised', value: '66.3%' },
          { label: 'Faster help from teammates', value: '3.90 s', tone: 'cyan' },
          { label: 'Authors', value: 'R. Jahandideh, A. Jahandideh, S. DiPaola' },
        ],
        caveat: 'Players still trusted plain numbers more than the halo.',
        links: [{ label: 'DOI', url: 'https://doi.org/10.1145/3845796.3859311' }],
      },
      {
        focus: { col: '1 / 7', row: '7 / 13' },
        title: 'BioTerrarium',
        lines: ['An Apple Watch changes the fog, light and plants of a game world in under 200 milliseconds, so your body shapes the space around you.'],
        caveat: 'Submitted to SIGGRAPH 2026 and not accepted. I am revising it, so the results are not final.',
      },
      {
        focus: { col: '7 / 13', row: '7 / 13' },
        title: 'Where they meet GenEnv',
        lines: [
          'A co-design tool only helps if designers read its information correctly and trust it the right amount.',
          'My papers measured exactly that, and I want to bring those methods into AI design tools.',
        ],
      },
    ],
  },

  // ── 08 · Prototypes ────────────────────────────────────────────────────────
  {
    id: 'prototypes',
    scene: 'zla',
    section: 'Sheet 08 · Prototypes',
    title: 'Four prototypes',
    cols: 12,
    rows: 12,
    panels: [
      { kind: 'diagram', col: '1 / 4', row: '1 / 7', label: '1 · Zoning Literacy Assistant', diagram: 'notcovered' },
      { kind: 'image', col: '4 / 7', row: '1 / 4', label: 'Live system', src: 'assets/projects/zla-hero.webp', alt: 'The Zoning Literacy Assistant interface.', fit: 'contain' },
      { kind: 'facts', col: '4 / 7', row: '4 / 7', label: 'Results', facts: [{ label: 'Bylaw clauses', value: '10' }, { label: 'Footprint, in code', value: '162.6 m²', tone: 'cyan' }] },
      { kind: 'diagram', col: '7 / 10', row: '1 / 7', label: '2 · Parametric Massing Generator', diagram: 'envelope' },
      { kind: 'image', col: '10 / 13', row: '1 / 4', label: 'Live system', src: 'assets/projects/pmg-hero.webp', alt: 'Massing volumes on an urban block with a plan inset.', fit: 'contain' },
      { kind: 'facts', col: '10 / 13', row: '4 / 7', label: 'Results', facts: [{ label: 'Rules extracted', value: '8' }, { label: 'Rental condition', value: '+1 storey', tone: 'yellow' }] },
      { kind: 'diagram', col: '1 / 4', row: '7 / 13', label: '3 · View Corridor Massing', diagram: 'rotation' },
      { kind: 'image', col: '4 / 7', row: '7 / 10', label: 'Trimmed massing', src: 'assets/projects/vcm-hero.webp', alt: 'Stepped massing trimmed by the protected view corridor.', fit: 'contain' },
      { kind: 'facts', col: '4 / 7', row: '10 / 13', label: 'Results', facts: [{ label: 'Floors', value: '10 → 18', tone: 'cyan' }, { label: 'Floor area gained', value: '+39.5%', tone: 'yellow' }] },
      { kind: 'diagram', col: '7 / 10', row: '7 / 13', label: '4 · Environmental Massing Agents', diagram: 'seeds' },
      { kind: 'image', col: '10 / 13', row: '7 / 10', label: 'Shadow and section', src: 'assets/projects/ema-hero.webp', alt: 'Plan with a winter shadow beside a stepped section.', fit: 'contain' },
      { kind: 'facts', col: '10 / 13', row: '10 / 13', label: 'Results', facts: [{ label: 'Faster search', value: 'Not confirmed', tone: 'red' }, { label: 'Runs that hit the target', value: '4/5 vs 1/5', tone: 'cyan' }] },
    ],
    steps: [
      {
        title: 'Four prototypes',
        lines: [
          'The second direction: AI for spatial design. I built four prototypes, each adding one step: rules, then form, then performance, then critique.',
          'The rule in all four is the same: every number comes from code, and every step can be checked.',
        ],
      },
      {
        focus: { col: '1 / 7', row: '1 / 7' },
        title: 'Zoning Literacy Assistant',
        lines: [
          'It finds the bylaw clauses that matter, answers only from them, and checks its own answer.',
          'If the bylaw is silent, it says “not covered” and stops. Site areas are calculated in code, and the AI only explains them.',
        ],
        caveat: 'Uses ten clauses of Vancouver’s R1-1 zone, not the full bylaw.',
        links: [
          { label: 'Live system', url: 'https://romanjahandideh.github.io/zoning-literacy-assistant/' },
          { label: 'GitHub', url: 'https://github.com/RomanJahandideh/zoning-literacy-assistant' },
        ],
      },
      {
        focus: { col: '7 / 13', row: '1 / 7' },
        title: 'Parametric Massing Generator',
        lines: [
          'AI reads the bylaw and pulls out eight rules, each with its source sentence. Code turns them into a building envelope you can edit.',
          'Change one value and everything that depends on it updates. Here the rental condition adds a storey.',
        ],
        caveat: 'A research prototype, not advice on code compliance.',
        links: [
          { label: 'Live system', url: 'https://romanjahandideh.github.io/parametric-massing-generator/' },
          { label: 'GitHub', url: 'https://github.com/RomanJahandideh/parametric-massing-generator' },
        ],
      },
      {
        focus: { col: '1 / 7', row: '7 / 13' },
        title: 'View Corridor Massing',
        lines: [
          'Vancouver’s protected views are a sloped limit, not a flat cap. Checking each floor against the slope gives 18 floors instead of 10.',
          'Turning the footprint barely changes the area, so its angle can follow the program instead.',
        ],
        facts: [{ label: 'Floor area', value: '18,360 → 25,608 m²' }],
        caveat: 'The corridor shape is real City data. Base height and slope are placeholders.',
        links: [{ label: 'GitHub', url: 'https://github.com/RomanJahandideh/vancouver-view-corridor-massing' }],
      },
      {
        focus: { col: '7 / 13', row: '7 / 13' },
        title: 'Environmental Massing Agents',
        lines: [
          'Six AI roles suggest and critique designs for sun, carbon, wind and floor area, but code calculates every score.',
          'I expected guided search to be faster. It was not, but it was more reliable. I report both.',
        ],
        caveat: 'Wind is a rough estimate, not CFD. Carbon uses benchmarks, not a full LCA. The live AI loop has not been run yet.',
        links: [{ label: 'GitHub', url: 'https://github.com/RomanJahandideh/environmental-massing-agents' }],
      },
    ],
  },

  // ── 09 · Direction ─────────────────────────────────────────────────────────
  {
    id: 'direction',
    scene: 'phd',
    section: 'Sheet 09 · Proposed direction',
    title: 'Performance Provenance',
    cols: 12,
    rows: 9,
    panels: [
      { kind: 'diagram', col: '1 / 13', row: '1 / 4', label: 'Fig. 08 · The chain the four prototypes build', diagram: 'chain' },
      { kind: 'diagram', col: '1 / 9', row: '4 / 10', label: 'Fig. 09 · What the record keeps for one design change', diagram: 'provenance' },
      {
        kind: 'list',
        col: '9 / 13',
        row: '4 / 10',
        label: 'Possible methods',
        items: [
          { key: 'Build', text: 'a co-design system from these prototypes' },
          { key: 'Test', text: 'that the calculations are correct', tone: 'cyan' },
          { key: 'Compare', text: 'design with and without the record' },
          { key: 'Interview', text: 'designers who use it', tone: 'coral' },
        ],
      },
    ],
    steps: [
      {
        title: 'Performance Provenance',
        lines: [
          'Put together, the prototypes show what is still missing: a record that links every AI-assisted design change to its rule, its evidence and the designer’s decision.',
        ],
        caveat: 'A direction for discussion. The scope and methods would be shaped with my supervisor.',
      },
      {
        focus: { col: '1 / 13', row: '1 / 4' },
        title: 'From rule to decision',
        lines: ['Each prototype adds one link: rules, evidence, geometry, performance and critique.', 'The designer always makes the final decision.'],
      },
      {
        focus: { col: '1 / 9', row: '4 / 10' },
        title: 'What the record keeps',
        lines: [
          'For each change: the goal, the rule, the change itself, how it was calculated, the result, what is uncertain, what the AI said, and what the designer decided.',
        ],
      },
      {
        focus: { col: '9 / 13', row: '4 / 10' },
        title: 'How it could be studied',
        lines: ['Build it, check that it is correct, compare design with and without it, and talk to the designers who use it.', 'I would like to shape this with you.'],
      },
    ],
  },

  // ── 10 · Fit ───────────────────────────────────────────────────────────────
  {
    id: 'fit',
    scene: 'genenv',
    section: 'Sheet 10 · Fit',
    title: 'Why I fit this research',
    cols: 12,
    rows: 8,
    panels: [
      { kind: 'card', col: '1 / 6', row: '1 / 3', label: 'GenEnv aims to', title: 'Interpret complex environments', note: 'Read sites, rules and climates as material for design.' },
      { kind: 'card', col: '7 / 13', row: '1 / 3', label: 'What I bring', title: 'Training in buildings and landscapes', note: 'Reading sites as a designer, from the Zangar Museum to rain gardens on a steep slope.' },
      { kind: 'card', col: '1 / 6', row: '3 / 5', label: 'GenEnv aims to', title: 'Reason through constraints', note: 'Turn zoning, views and performance into design options.' },
      { kind: 'card', col: '7 / 13', row: '3 / 5', label: 'What I bring', title: 'Rules turned into geometry', note: 'Bylaw clauses to an editable envelope, and a view corridor that returns 39.5% more floor area.' },
      { kind: 'card', col: '1 / 6', row: '5 / 7', label: 'GenEnv aims to', title: 'Work inside professional design tools', note: 'AI that operates where designers already work.' },
      { kind: 'card', col: '7 / 13', row: '5 / 7', label: 'What I bring', title: 'Working tools, not mockups', note: 'Rhino and Grasshopper studies, an MCP server for design agents, Unity, Three.js and Python.' },
      { kind: 'card', col: '1 / 6', row: '7 / 9', label: 'GenEnv aims to', title: 'Keep outcomes open to human judgment', note: 'Editable and traceable results that designers can question.' },
      { kind: 'card', col: '7 / 13', row: '7 / 9', label: 'What I bring', title: 'Studies of how people read information', note: '132 participants across two peer-reviewed studies, measuring perception, speed and trust.' },
    ],
    steps: [
      {
        title: 'Why I fit this research',
        lines: ['On the left, what GenEnv says it does. On the right, the part of my path that already practises it.'],
      },
      {
        focus: { col: '1 / 13', row: '1 / 5' },
        title: 'Reading places and their rules',
        lines: ['Architecture and landscape gave me the eye for sites.', 'My prototypes turn their rules into geometry in code.'],
      },
      {
        focus: { col: '1 / 13', row: '5 / 9' },
        title: 'Tools that people can trust',
        lines: ['SFU taught me to build working tools and to test how people read and trust what those tools show them.'],
      },
      {
        title: 'Why I can succeed here',
        lines: [
          'I can design, build and test a research system from start to finish, and I report what I find honestly.',
          'I want to continue my studies in AI and spatial design in your lab.',
        ],
        facts: [
          { label: 'Peer reviewed papers', value: '2' },
          { label: 'Working prototypes', value: '4' },
          { label: 'Study participants', value: '132', tone: 'cyan' },
        ],
      },
    ],
  },

  // ── 11 · Questions ─────────────────────────────────────────────────────────
  {
    id: 'questions',
    scene: 'conversation',
    section: 'Sheet 11 · Thank you',
    title: 'Questions for you',
    cols: 12,
    rows: 8,
    panels: [
      { kind: 'card', col: '1 / 13', row: '1 / 3', label: 'Question 1', title: 'Would I join a project that is already running, or would we shape a new direction for me?' },
      { kind: 'card', col: '1 / 7', row: '3 / 6', label: 'Question 2', title: 'How do you like PhD students to balance building tools with studying how designers use them?' },
      { kind: 'card', col: '7 / 13', row: '3 / 6', label: 'Question 3', title: 'When an AI suggestion and a performance result disagree, how should a tool show that to the designer?' },
      { kind: 'card', col: '1 / 7', row: '6 / 9', label: 'Question 4', title: 'Could I test tools with practising designers or planners during the PhD?' },
      { kind: 'card', col: '7 / 13', row: '6 / 9', label: 'Question 5', title: 'What should I strengthen before starting a PhD?' },
    ],
    steps: [
      {
        title: 'Thank you',
        lines: ['From making things as a child to AI for spatial design. I would really value your thoughts.'],
        links: [
          { label: 'romanjahandideh.com', url: 'https://romanjahandideh.com' },
          { label: 'github.com/RomanJahandideh', url: 'https://github.com/RomanJahandideh' },
        ],
      },
    ],
  },
] as const;

/** All scroll positions, in order. */
export const STEPS: readonly Step[] = SHEETS.flatMap((sh, sheetIndex) =>
  sh.steps.map((st, stepInSheet) => ({
    id: `${sh.id}-${stepInSheet + 1}`,
    sheetIndex,
    stepInSheet,
    scene: sh.scene,
    title: stepInSheet === 0 ? sh.title : st.title,
    notes: st.notes ?? [...(st.lines ?? []), ...(st.caveat ? [st.caveat] : [])],
  })),
);

export const STEP_COUNT = STEPS.length;
