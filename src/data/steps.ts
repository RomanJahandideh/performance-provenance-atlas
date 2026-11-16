import type { Sheet, Step } from './types';

/**
 * Ten presentation sheets. Each sheet is one board (a grid of panels) that is
 * always fully visible; each scroll moves to the next step, which zooms the
 * board to one region and changes the text in the side column.
 * Image credits: docs/ASSET_MANIFEST.md. Writing rule: plain sentences, no dashes.
 */
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
        label: 'Sheets in this talk',
        items: [
          { key: '02', text: 'Education' },
          { key: '03 to 05', text: 'Architecture, awards, landscape' },
          { key: '06', text: 'Publications' },
          { key: '07', text: 'Four prototypes' },
          { key: '08 to 10', text: 'Direction, fit, questions' },
        ],
      },
    ],
    steps: [
      {
        title: 'Performance Provenance',
        lines: [
          'Human and AI design together, with every decision backed by evidence you can check.',
          'This talk covers my background in architecture, landscape and interactive systems, my publications and prototypes, and a PhD direction I would like to discuss.',
        ],
        notes: [
          'Thank you for meeting with me. I started out designing buildings and landscapes, and then I began studying how people perceive space. My recent work asks a related question: when AI tools help with spatial design, how do we keep their decisions visible, testable and easy for a designer to change?',
        ],
      },
    ],
  },

  // ── 02 · Education ─────────────────────────────────────────────────────────
  {
    id: 'education',
    scene: 'trajectory',
    section: 'Sheet 02 · Education',
    title: 'Three schools, one question',
    cols: 12,
    rows: 12,
    panels: [
      { kind: 'image', col: '1 / 5', row: '1 / 7', label: 'Tabriz Islamic Art University', src: 'assets/photos/tabriz-2.jpg', alt: 'Brick buildings and a blossoming tree on the Tabriz Islamic Art University campus.', credit: 'Ashkan najar · CC BY-SA 4.0' },
      { kind: 'image', col: '5 / 7', row: '1 / 4', label: 'Tower', src: 'assets/photos/tabriz-1.jpg', alt: 'Brick tower of Tabriz Islamic Art University at sunset.', credit: 'Zahra Multimedia · CC BY-SA 4.0' },
      { kind: 'facts', col: '5 / 7', row: '4 / 7', label: 'Tabriz', facts: [{ label: 'Degree', value: 'B.Arch' }, { label: 'Years', value: '2011 to 2016' }] },

      { kind: 'image', col: '7 / 11', row: '1 / 7', label: 'Istanbul Technical University', src: 'assets/photos/itu-2.jpg', alt: 'The Taşkışla building of Istanbul Technical University.', credit: 'CeeGee · CC BY-SA 3.0' },
      { kind: 'image', col: '11 / 13', row: '1 / 4', label: 'Aerial', src: 'assets/deck/campus-itu.jpeg', alt: 'Aerial view of ITU Taşkışla with red-tiled roofs among trees.' },
      { kind: 'facts', col: '11 / 13', row: '4 / 7', label: 'Istanbul', facts: [{ label: 'Degree', value: 'Master’s' }, { label: 'Years', value: '2020 to 2024' }] },

      { kind: 'image', col: '1 / 5', row: '7 / 13', label: 'Simon Fraser University', src: 'assets/photos/sfu-2.jpg', alt: 'The Grand Hall atrium of SFU Surrey under its timber roof.', credit: 'Canmenwalker · CC BY 4.0' },
      { kind: 'image', col: '5 / 7', row: '7 / 10', label: 'Surrey', src: 'assets/photos/sfu-1.jpg', alt: 'SFU Surrey campus among the towers of Surrey Central.', credit: 'Northwest · CC BY 4.0' },
      { kind: 'facts', col: '5 / 7', row: '10 / 13', label: 'Vancouver', facts: [{ label: 'Degree', value: 'MSc' }, { label: 'Since', value: '2025' }] },

      { kind: 'card', col: '7 / 13', row: '7 / 13', label: 'The thread', title: 'How does a space communicate?', note: 'And how do people read it and act on it? I have asked this in buildings, in landscapes, in virtual worlds and now in AI design tools.' },
    ],
    steps: [
      {
        title: 'Three schools, one question',
        lines: ['Architecture in Tabriz, landscape architecture in Istanbul, and interactive systems in Vancouver.'],
        notes: ['My degrees are in different fields, but they connect. The same question runs through all of them: how does a space communicate, and how do people read it and act on it?'],
      },
      {
        focus: { col: '1 / 7', row: '1 / 7' },
        title: 'Tabriz Islamic Art University',
        lines: ['Bachelor of Architecture. I learned to develop a spatial idea, draw it and defend it.'],
        facts: [{ label: 'Years', value: '2011 to 2016' }],
        notes: ['I trained as an architect at Tabriz Islamic Art University, working on spatial composition, public space and visual communication.'],
      },
      {
        focus: { col: '7 / 13', row: '1 / 7' },
        title: 'Istanbul Technical University',
        lines: ['Master’s in Landscape Architecture. I worked with water, slope and planting, and ran my first experiments on how people perceive virtual space.'],
        facts: [{ label: 'Years', value: '2020 to 2024' }, { label: 'Lab', value: 'Virtual Landscape Lab' }],
        notes: ['At Istanbul Technical University I did my master’s in landscape architecture, and in the Virtual Landscape Lab I started testing how people perceive virtual environments.'],
      },
      {
        focus: { col: '1 / 7', row: '7 / 13' },
        title: 'Simon Fraser University',
        lines: ['Master of Science in Interactive Arts and Technology. In the iViz Lab I build complete interactive systems and test them with people.'],
        facts: [{ label: 'Since', value: '2025' }, { label: 'Lab', value: 'iViz Lab, Prof. Steve DiPaola' }],
        notes: ['At SFU I am doing my Master of Science in the iViz Lab with Professor Steve DiPaola. I build systems in Unity and C#, with sensors and networking, and I evaluate them with user studies.'],
      },
    ],
  },

  // ── 03 · Dissertation ──────────────────────────────────────────────────────
  {
    id: 'zangar',
    scene: 'trajectory',
    section: 'Sheet 03 · Architecture dissertation',
    title: 'Zangar Museum',
    cols: 12,
    rows: 9,
    panels: [
      { kind: 'image', col: '1 / 5', row: '1 / 4', label: 'Night view', src: 'assets/portfolio/p019.jpg', alt: 'Portfolio page: night aerial render of the Zangar Museum in the city.', fit: 'contain' },
      { kind: 'image', col: '5 / 9', row: '1 / 4', label: 'Aerial view', src: 'assets/portfolio/p030.jpg', alt: 'Portfolio page: aerial render of the museum with its plaza and patterned facade.', fit: 'contain' },
      { kind: 'image', col: '9 / 13', row: '1 / 4', label: 'Site plan', src: 'assets/portfolio/p022.jpg', alt: 'Portfolio page: city site plan with the museum location.', fit: 'contain' },
      { kind: 'image', col: '1 / 5', row: '4 / 7', label: 'Concept and history', src: 'assets/portfolio/p018.jpg', alt: 'Portfolio page: concept text and the three historical periods shown as three forms.', fit: 'contain' },
      { kind: 'image', col: '5 / 9', row: '4 / 7', label: 'Floor plans', src: 'assets/portfolio/p023.jpg', alt: 'Portfolio page: floor plans with galleries, depot, parking and amphitheater labelled.', fit: 'contain' },
      { kind: 'image', col: '9 / 13', row: '4 / 7', label: 'Floor plans', src: 'assets/portfolio/p024.jpg', alt: 'Portfolio page: floor plans with art classes, galleries, entrance and restaurant labelled.', fit: 'contain' },
      { kind: 'image', col: '1 / 5', row: '7 / 10', label: 'North and west elevations', src: 'assets/portfolio/p026.jpg', alt: 'Portfolio page: north and west elevations of the museum.', fit: 'contain' },
      { kind: 'image', col: '5 / 9', row: '7 / 10', label: 'Section', src: 'assets/portfolio/p027.jpg', alt: 'Portfolio page: section through the galleries and green yard.', fit: 'contain' },
      { kind: 'image', col: '9 / 13', row: '7 / 10', label: 'Interiors', src: 'assets/portfolio/p028.jpg', alt: 'Portfolio page: interior renders of the gallery entrance and temporary gallery.', fit: 'contain' },
    ],
    steps: [
      {
        title: 'Zangar Museum',
        lines: ['My final architecture thesis at Tabriz Art University, supervised by Prof. Parisa Hashempour.'],
        facts: [{ label: 'Award', value: 'Best Dissertation, 2016', tone: 'yellow' }, { label: 'Result', value: 'Ranked first in my class' }],
        notes: ['This is my final thesis, the Zangar Museum. It ranked first in my graduating class and won the Best Dissertation Award.'],
      },
      {
        focus: { col: '1 / 9', row: '1 / 4' },
        title: 'A museum about a century of history',
        lines: ['The museum shows the hardships of Tabriz people under three governments over about a hundred years. Each period became one sharp, angled form.'],
        notes: ['The museum tells the story of Tabriz people across three governments over about a century. I gave each period its own sharp-edged form, so the history is read through the building itself.'],
      },
      {
        focus: { col: '5 / 13', row: '1 / 7' },
        title: 'Site and plans',
        lines: ['Permanent and temporary galleries, art classes, an amphitheater, a library and a restaurant, organised around the three forms.'],
        notes: ['Here are the site plan and floor plans. The galleries, classrooms, amphitheater and restaurant are arranged inside and between the three forms.'],
      },
      {
        focus: { col: '1 / 9', row: '7 / 10' },
        title: 'Elevations and section',
        lines: ['A patterned screen wraps the gallery volumes. The section shows how the galleries step around a green yard.'],
        notes: ['The elevations show the patterned screen on the gallery volumes, and the section shows how the galleries step around a green yard in the middle.'],
      },
      {
        focus: { col: '9 / 13', row: '7 / 10' },
        title: 'Interiors',
        lines: ['Renders of the gallery entrance and the temporary galleries, lit from above.'],
        notes: ['These are the interior renders of the gallery entrance and temporary galleries. This project taught me how spatial decisions change the way people move through a building.'],
      },
    ],
  },

  // ── 04 · Awards ────────────────────────────────────────────────────────────
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
        lines: ['Competitions taught me to explain an idea quickly. Photography taught me how framing changes what people notice.'],
        facts: [
          { label: 'Disaster cabin, 2018', value: 'Sixth prize' },
          { label: 'Abstract Photo of City, 2018', value: 'Winner', tone: 'yellow' },
          { label: 'Landscape design, Tabriz Art University', value: 'Second prize' },
        ],
        notes: ['Alongside my studies I entered design and photography competitions.'],
      },
      {
        focus: { col: '1 / 7', row: '1 / 9' },
        title: 'A cabin that unfolds',
        lines: ['Temporary housing for people after a natural disaster. The panels fold out on hinges, and two people can lift them into place.'],
        facts: [{ label: 'Result', value: 'Sixth prize, Memar News, 2018' }],
        notes: ['This foldable cabin is temporary housing after a natural disaster. The panels hinge open and two people can set it up. It placed sixth in the Memar News competition.'],
      },
      {
        focus: { col: '7 / 13', row: '1 / 9' },
        title: 'Abstract city photography',
        lines: ['Long exposures of the city at night. The blur hides the objects and leaves only light, colour and depth.'],
        facts: [{ label: 'Result', value: 'Winner, 2018', tone: 'yellow' }],
        notes: ['These photographs won an abstract city photography competition. Working with blur and light taught me how framing and contrast change what people see, which came back later in my VR depth experiments.'],
      },
    ],
  },

  // ── 05 · Landscape ─────────────────────────────────────────────────────────
  {
    id: 'landscape',
    scene: 'trajectory',
    section: 'Sheet 05 · Landscape architecture, ITU',
    title: 'Rain gardens for Büyükada',
    cols: 12,
    rows: 9,
    panels: [
      { kind: 'image', col: '1 / 5', row: '1 / 4', label: 'Site and slope analysis', src: 'assets/portfolio/p109.jpg', alt: 'Portfolio page: topography analysis and existing roads of the site.', fit: 'contain' },
      { kind: 'image', col: '5 / 9', row: '1 / 4', label: 'Why rain gardens', src: 'assets/portfolio/p113.jpg', alt: 'Portfolio page: reasons to build rain gardens on Büyükada.', fit: 'contain' },
      { kind: 'image', col: '9 / 13', row: '1 / 4', label: 'Side section of the park', src: 'assets/portfolio/p114.jpg', alt: 'Portfolio page: side section showing how water moves down the slope.', fit: 'contain' },
      { kind: 'image', col: '1 / 5', row: '4 / 7', label: 'Where the water goes', src: 'assets/portfolio/p117.jpg', alt: 'Portfolio page: section with water harvesting pools and terraces.', fit: 'contain' },
      { kind: 'image', col: '5 / 9', row: '4 / 7', label: 'Techniques for each unit', src: 'assets/portfolio/p121.jpg', alt: 'Portfolio page: sketch of roof water collectors, rain barrels, cisterns and rain gardens.', fit: 'contain' },
      { kind: 'image', col: '9 / 13', row: '4 / 7', label: 'Bioretention', src: 'assets/portfolio/p127.jpg', alt: 'Portfolio page: bioretention diagram under a tree with gravel bed and underdrain.', fit: 'contain' },
      { kind: 'image', col: '1 / 5', row: '7 / 10', label: 'Two housing units', src: 'assets/portfolio/p122.jpg', alt: 'Portfolio page: 3D model of two units with rain gardens and storage tanks.', fit: 'contain' },
      { kind: 'image', col: '5 / 9', row: '7 / 10', label: 'Top view', src: 'assets/portfolio/p123.jpg', alt: 'Portfolio page: top view of the two connected units.', fit: 'contain' },
      { kind: 'image', col: '9 / 13', row: '7 / 10', label: 'Unit 1', src: 'assets/portfolio/p130.jpg', alt: 'Portfolio page: Unit 1 model, plan and storm water section.', fit: 'contain' },
    ],
    steps: [
      {
        title: 'Rain gardens for Büyükada',
        lines: ['A landscape project from my master’s at ITU. Rainwater from roofs and streets is slowed, cleaned and stored down a steep slope.'],
        notes: ['This is a landscape project from my master’s at Istanbul Technical University, on the island of Büyükada.'],
      },
      {
        focus: { col: '1 / 9', row: '1 / 4' },
        title: 'Reading the site',
        lines: ['I mapped the slope and the roads first. Steep streets send runoff and pollution straight down, so the design starts from water.'],
        notes: ['I started by mapping the slope and the roads. The streets are steep, so rainwater runs straight down and carries pollution with it. That made water the starting point of the design.'],
      },
      {
        focus: { col: '5 / 13', row: '1 / 7' },
        title: 'A system for water',
        lines: ['Roof collectors, rain barrels, cisterns, permeable paving and planted basins work together. Each step holds water a little longer.'],
        notes: ['The design combines roof collectors, rain barrels, cisterns, permeable paving and rain gardens. Each element slows the water a little and lets it soak in or be stored.'],
      },
      {
        focus: { col: '1 / 9', row: '7 / 10' },
        title: 'Housing units on the slope',
        lines: ['The same set of techniques is applied to each unit and connected down the hill to shared storage tanks.'],
        notes: ['Finally I applied the same techniques to each housing unit and connected them down the hill to shared storage tanks. Thinking in systems like this is something I still use in my computational work.'],
      },
    ],
  },

  // ── 06 · Publications ──────────────────────────────────────────────────────
  {
    id: 'publications',
    scene: 'foundation',
    section: 'Sheet 06 · Publications',
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
      { kind: 'image', col: '10 / 13', row: '1 / 4', label: 'The 16 halo states', src: 'assets/papers/iss-halos.jpg', alt: 'Sixteen halo icons combining four heart rate and four heart rate variability states.', fit: 'contain' },
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

      { kind: 'card', col: '7 / 13', row: '7 / 9', label: 'eCAADe → human-AI co-design', title: 'How you show a design changes how it is judged', note: 'Co-design tools need evidence about how people read what the tool shows them.' },
      { kind: 'card', col: '7 / 13', row: '9 / 11', label: 'ISS → human-AI co-design', title: 'Speed and trust can pull apart', note: 'The halo made help faster, but numbers were trusted more. Tools that show performance data face the same choice.' },
      { kind: 'card', col: '7 / 13', row: '11 / 13', label: 'BioTerrarium → performance-informed design', title: 'Measured data changing a space in real time', note: 'A small, live version of a feedback loop between performance and form.' },
    ],
    steps: [
      {
        title: 'Publications',
        lines: ['One published paper, one accepted paper, and one manuscript under revision. Together they are about how people read and react to information in space.'],
        notes: ['These are my three papers. One is published, one is accepted for November, and one is under revision.'],
      },
      {
        focus: { col: '1 / 7', row: '1 / 7' },
        title: 'Creating Immersive Virtual Landscapes',
        lines: ['In VR, when objects become very transparent, cool and dark colours look closer than warm and bright ones. That is the opposite of the usual rule.'],
        facts: [
          { label: 'Participants', value: '60' },
          { label: 'Judgments each', value: '264' },
          { label: 'Authors', value: 'R. Jahandideh, A. Jahandideh, I. Kim' },
        ],
        links: [{ label: 'DOI', url: 'https://doi.org/10.52842/conf.ecaade.2023.1.149' }],
        notes: ['My first paper was published at eCAADe 2023 at Graz University of Technology. Sixty participants each made 264 depth judgments in VR across transparency, colour and brightness. At high transparency the usual rule reversed, and cool, dark colours looked closer. So rules that work for solid objects do not always carry over.'],
      },
      {
        focus: { col: '7 / 13', row: '1 / 7' },
        title: 'Reading a Remote Teammate’s Body',
        lines: ['A teammate’s heart rate shown as a glowing halo instead of numbers. Two studies: first, can people read it; second, does it help teams.'],
        facts: [
          { label: 'Halo states recognised', value: '66.3% (chance 25%)' },
          { label: 'Faster help from teammates', value: '3.90 s', tone: 'cyan' },
          { label: 'People in the two studies', value: '36 + 36' },
        ],
        caveat: 'Players still trusted plain numbers more than the halo.',
        links: [{ label: 'DOI', url: 'https://doi.org/10.1145/3845796.3859311' }],
        notes: ['My second paper was accepted at ACM ISS 2026 in Turin, with Aran Jahandideh and Steve DiPaola. In the first study 36 people recognised the halo states well above chance. In the second, twelve teams of three played a cooperative game, and with the halo they helped each other almost four seconds faster than with no cue. But they still trusted numbers more, so it is a trade-off.'],
      },
      {
        focus: { col: '1 / 7', row: '7 / 13' },
        title: 'BioTerrarium',
        lines: ['An Apple Watch changes the fog, light and plants of a game world in under 200 milliseconds, so your body shapes the space around you.'],
        caveat: 'Submitted to SIGGRAPH 2026 and not accepted. I am revising it, so the results are not final.',
        notes: ['The third project, BioTerrarium, connects an Apple Watch to a Unity world in under 200 milliseconds, so the fog, light and plants respond to your heart. I ran a study with 24 people. The paper was not accepted at SIGGRAPH, and I am revising it, so I treat the results as preliminary.'],
      },
      {
        focus: { col: '7 / 13', row: '7 / 13' },
        title: 'Where they meet GenEnv',
        lines: ['GenEnv works on human-AI co-design and performance-informed design. My papers give evidence on how people read information in space, which is exactly what those tools depend on.'],
        notes: ['Why this matters for GenEnv: a co-design tool is only useful if designers read its information correctly and trust it the right amount. My papers measured exactly that, in VR, in games and in live data. I want to bring those methods into design tools.'],
      },
    ],
  },

  // ── 07 · Prototypes ────────────────────────────────────────────────────────
  {
    id: 'prototypes',
    scene: 'zla',
    section: 'Sheet 07 · Prototypes',
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
        lines: ['I built these on my own to test one idea: AI can help with spatial design if every number comes from code and every step can be checked.'],
        notes: ['These are four prototypes I built after reading about GenEnv’s work. Each one adds a step: rules, then form, then performance, then critique.'],
      },
      {
        focus: { col: '1 / 7', row: '1 / 7' },
        title: 'Zoning Literacy Assistant',
        lines: ['It finds the bylaw clauses that matter, answers only from them, and checks its own answer. If the bylaw is silent, it says “not covered” and stops.'],
        caveat: 'Uses ten clauses of Vancouver’s R1-1 zone, not the full bylaw.',
        links: [
          { label: 'Live system', url: 'https://romanjahandideh.github.io/zoning-literacy-assistant/' },
          { label: 'GitHub', url: 'https://github.com/RomanJahandideh/zoning-literacy-assistant' },
        ],
        notes: ['The Zoning Assistant answers zoning questions only from the clauses it finds, then checks itself. Here someone asks about laneway house storeys. The bylaw does not say, so it answers “not covered” and stops. Site areas are calculated in normal code, and the AI only explains them.'],
      },
      {
        focus: { col: '7 / 13', row: '1 / 7' },
        title: 'Parametric Massing Generator',
        lines: ['AI reads the bylaw and pulls out eight rules, each with its source sentence. Code turns the rules into a building envelope you can edit.'],
        caveat: 'A research prototype, not advice on code compliance.',
        links: [
          { label: 'Live system', url: 'https://romanjahandideh.github.io/parametric-massing-generator/' },
          { label: 'GitHub', url: 'https://github.com/RomanJahandideh/parametric-massing-generator' },
        ],
        notes: ['The Massing Generator goes from bylaw text to form. The AI extracts eight rules and keeps the original sentence for each, and code builds the envelope. Because it is parametric, changing one value updates everything. Here the rental condition adds a storey.'],
      },
      {
        focus: { col: '1 / 7', row: '7 / 13' },
        title: 'View Corridor Massing',
        lines: ['Vancouver’s protected views are a sloped limit, not a flat cap. Checking each floor against the slope gives 18 floors instead of 10.'],
        facts: [{ label: 'Floor area', value: '18,360 → 25,608 m²' }, { label: 'Turning the footprint', value: 'changes area by 0.02%' }],
        caveat: 'The corridor shape is real City data. Base height and slope are placeholders.',
        links: [{ label: 'GitHub', url: 'https://github.com/RomanJahandideh/vancouver-view-corridor-massing' }],
        notes: ['Vancouver’s protected views work like a sloped ceiling. The usual shortcut gives ten floors. Checking each floor against the real slope gives eighteen, 39.5 percent more floor area. Rotating the footprint barely changes the area, so the angle can follow the program instead.'],
      },
      {
        focus: { col: '7 / 13', row: '7 / 13' },
        title: 'Environmental Massing Agents',
        lines: ['Six AI roles suggest and critique designs for sun, carbon, wind and floor area. Code calculates every score, so the agents never make up a number.'],
        caveat: 'Wind is a rough estimate, not CFD. Carbon uses benchmarks, not a full LCA. The live AI loop has not been run yet.',
        links: [{ label: 'GitHub', url: 'https://github.com/RomanJahandideh/environmental-massing-agents' }],
        notes: ['In the last prototype, AI agents propose and critique designs, but code calculates all the scores. I expected a guided search to be faster than random search. It was not faster, but it was more reliable: four of five runs reached the target, compared with one of five. I report both what I expected and what happened.'],
      },
    ],
  },

  // ── 08 · Direction ─────────────────────────────────────────────────────────
  {
    id: 'direction',
    scene: 'phd',
    section: 'Sheet 08 · Proposed direction',
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
        lines: ['A record that links every AI-assisted design change to its rule, its evidence and the designer’s decision.'],
        caveat: 'A direction for discussion. The scope and methods would be shaped with my supervisor.',
        notes: ['This is the PhD direction I would like to discuss with you. I call it performance provenance.'],
      },
      {
        focus: { col: '1 / 13', row: '1 / 4' },
        title: 'From rule to decision',
        lines: ['Each prototype adds one link: rules, evidence, geometry, performance and critique. The designer makes the final decision.'],
        notes: ['The four prototypes together form a chain from the rule to the designer’s decision. What is missing is a record that keeps the whole chain together across many design changes.'],
      },
      {
        focus: { col: '1 / 9', row: '4 / 10' },
        title: 'What the record keeps',
        lines: ['For each change: the goal, the rule, the change itself, how it was calculated, the result, what is uncertain, what the AI said, and what the designer decided.'],
        notes: ['For each design change, the record would keep the goal, the rule, the change, the calculation, the result, what is uncertain, what the AI said, and what the designer decided. This example uses the real view corridor study.'],
      },
      {
        focus: { col: '9 / 13', row: '4 / 10' },
        title: 'How it could be studied',
        lines: ['Build it, check that it is correct, compare design with and without it, and talk to the designers who use it.'],
        notes: ['The methods could include building the system, testing it technically, comparing design with and without the record, and interviewing designers. I have left this open on purpose, because I would like to shape it with you.'],
      },
    ],
  },

  // ── 09 · Fit ───────────────────────────────────────────────────────────────
  {
    id: 'fit',
    scene: 'genenv',
    section: 'Sheet 09 · Fit',
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
        lines: ['On the left, what GenEnv says it does. On the right, the part of my work that already practises it.'],
        notes: ['GenEnv describes its work as AI that interprets complex environments, reasons through constraints, works inside professional design tools, and keeps outcomes open to human judgment. I want to show how my background lines up with each of these.'],
      },
      {
        focus: { col: '1 / 13', row: '1 / 5' },
        title: 'Reading places and their rules',
        lines: ['My design training gives me the eye for sites. My prototypes turn their rules into geometry.'],
        notes: ['Interpreting environments and reasoning through constraints is where my architecture and landscape training meets my prototypes. I have read sites as a designer, and I have turned zoning and view rules into geometry in code.'],
      },
      {
        focus: { col: '1 / 13', row: '5 / 9' },
        title: 'Tools that people can trust',
        lines: ['I build working tools, and I test how people read and trust what those tools show them.'],
        notes: ['Working inside design tools and keeping humans in charge is where my HCI side comes in. I build working systems, and I have run studies with 132 people on how they read and trust information.'],
      },
      {
        title: 'Why I can succeed here',
        lines: ['I can design, build and test a research system from start to finish, and I report what I find honestly.'],
        facts: [
          { label: 'Design training', value: 'Architecture + landscape' },
          { label: 'Peer reviewed papers', value: '2' },
          { label: 'Working prototypes', value: '4' },
          { label: 'Study participants', value: '132', tone: 'cyan' },
        ],
        notes: ['So I bring three things that rarely come together: design training, the ability to build working AI and spatial tools, and experience testing them with people. I would be excited to grow these into a PhD with Professor Liu and the lab.'],
      },
    ],
  },

  // ── 10 · Questions ─────────────────────────────────────────────────────────
  {
    id: 'questions',
    scene: 'conversation',
    section: 'Sheet 10 · Thank you',
    title: 'Questions for you',
    cols: 12,
    rows: 8,
    panels: [
      { kind: 'card', col: '1 / 13', row: '1 / 3', label: 'Question 1', title: 'Would I join a project that is already running, or would we shape a new direction for me?', note: '' },
      { kind: 'card', col: '1 / 7', row: '3 / 6', label: 'Question 2', title: 'How do you like PhD students to balance building tools with studying how designers use them?', note: '' },
      { kind: 'card', col: '7 / 13', row: '3 / 6', label: 'Question 3', title: 'When an AI suggestion and a performance result disagree, how should a tool show that to the designer?', note: '' },
      { kind: 'card', col: '1 / 7', row: '6 / 9', label: 'Question 4', title: 'Could I test tools with practising designers or planners during the PhD?', note: '' },
      { kind: 'card', col: '7 / 13', row: '6 / 9', label: 'Question 5', title: 'What should I strengthen before starting a PhD?', note: '' },
    ],
    steps: [
      {
        title: 'Thank you',
        lines: ['I would really value your thoughts.'],
        links: [
          { label: 'romanjahandideh.com', url: 'https://romanjahandideh.com' },
          { label: 'github.com/RomanJahandideh', url: 'https://github.com/RomanJahandideh' },
        ],
        notes: [
          'Thank you. I have a few questions. Would I join a project that is already running, or would we shape a new direction for me? How do you like students to balance building tools with studying how designers use them? When an AI suggestion and a performance result disagree, how should a tool show that? Could I test tools with practising designers? And what should I strengthen before starting?',
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
    notes: st.notes,
  })),
);

export const STEP_COUNT = STEPS.length;
