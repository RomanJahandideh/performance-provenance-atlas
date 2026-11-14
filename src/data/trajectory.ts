/** Education anchors, awards, and the research route (Scene 1–3 content). */

export interface CampusAnchor {
  id: string;
  institution: string;
  degree: string;
  period: string;
  discipline: string;
  capability: string;
  image: string;
  imageAlt: string;
  imageCredit: string;
  pos: { x: number; y: number };
}

export const CAMPUSES: readonly CampusAnchor[] = [
  {
    id: 'tabriz',
    institution: 'Tabriz Islamic Art University',
    degree: 'B.Arch · Architecture',
    period: '2011 – 2016',
    discipline: 'Architecture design',
    capability: 'Spatial composition, public life, visual communication — making and defending a spatial idea through drawings and models.',
    image: 'assets/deck/campus-tabriz.jpeg',
    imageAlt: 'Historic brick courtyard building in Tabriz with an arched colonnade, ornamental brickwork, and a round fountain in front.',
    imageCredit: 'Photo: Morteza Kholghi on Unsplash (as credited in the interview deck).',
    pos: { x: 560, y: 2280 },
  },
  {
    id: 'itu',
    institution: 'Istanbul Technical University',
    degree: 'Master’s · Landscape Architecture',
    period: '2020 – 2024',
    discipline: 'Landscape architecture · Virtual Landscape Lab (Dr. Ikhwan Kim)',
    capability: 'Landscape systems and site dynamics — and the first VR experiments on how people judge depth and distance.',
    image: 'assets/deck/campus-itu.jpeg',
    imageAlt: 'Aerial view of Istanbul Technical University’s Taşkışla building: a monumental courtyard block with red-tiled roofs among trees.',
    imageCredit: 'Photo: Anıl İnşaat, ITU Taşkışla project page (as credited in the interview deck).',
    pos: { x: 480, y: 1680 },
  },
  {
    id: 'sfu',
    institution: 'Simon Fraser University',
    degree: 'MA · Interactive Arts and Technology',
    period: '2025 – present',
    discipline: 'HCI · iViz Lab (Prof. Steve DiPaola)',
    capability: 'Unity and C#, physiological computing, multiplayer systems, and user studies — building complete interactive research systems.',
    image: 'assets/deck/campus-sfu.jpeg',
    imageAlt: 'Simon Fraser University Surrey campus atrium.',
    imageCredit: 'Photo: Simon Fraser University (as credited in the interview deck).',
    pos: { x: 640, y: 1080 },
  },
] as const;

export interface Award {
  id: string;
  title: string;
  context: string;
  year: string;
  image?: string;
  imageAlt?: string;
  source: string;
  pos: { x: number; y: number };
}

export const AWARDS: readonly Award[] = [
  {
    id: 'zangar',
    title: 'Best Dissertation Award',
    context: 'Zangar Museum dissertation project, Tabriz Islamic Art University',
    year: '2016',
    image: 'assets/deck/award-zangar.jpeg',
    imageAlt: 'Zangar Museum dissertation board: white angular museum massing with a patterned screen facade, rendered on a white sheet.',
    source: 'CV + interview deck',
    pos: { x: 880, y: 2300 },
  },
  {
    id: 'landscape-2013',
    title: 'Second Prize · landscape design competition',
    context: 'National landscape design competition',
    year: '2013',
    source: 'CV + interview deck (no image in supplied materials)',
    pos: { x: 980, y: 2180 },
  },
  {
    id: 'cabin',
    title: 'Sixth Prize · Sustainable Cabin for Natural Disasters',
    context: 'Memar News competition',
    year: '2018',
    image: 'assets/deck/award-cabin.jpeg',
    imageAlt: 'Sustainable cabin competition board: plans, unfolding A-frame panel diagrams, and a render of the cabins on a coastal cliff.',
    source: 'CV + interview deck',
    pos: { x: 840, y: 2060 },
  },
  {
    id: 'photography',
    title: 'Abstract Photography Award',
    context: 'Portfolio sheet: “Abstract Photo of City” — 2018 Winner, photograph “A Tunnel To Heaven”. (The interview deck labels it “The Ghost of Playground” — discrepancy flagged for confirmation.)',
    year: '2018',
    image: 'assets/deck/award-photography.jpeg',
    imageAlt: 'Portfolio competition sheet: winner, Abstract Photo of City 2018, showing the blurred long-exposure photograph “A Tunnel To Heaven”.',
    source: 'Interview deck + portfolio sheet (not listed in the academic CV — flagged in PROJECT_EVIDENCE_AUDIT.md)',
    pos: { x: 960, y: 1940 },
  },
] as const;

/** The yellow research route, in drawing order. */
export const ROUTE_POINTS: readonly { x: number; y: number; label?: string }[] = [
  { x: 560, y: 2280 }, // Tabriz (labelled by its campus anchor)
  { x: 480, y: 1680 }, // Istanbul
  { x: 640, y: 1080 }, // SFU
  { x: 760, y: 980 }, // BioTerrarium
  { x: 700, y: 760 }, // eCAADe
  { x: 980, y: 560 }, // ISS
  { x: 1320, y: 1100 }, // grid entry
  { x: 2620, y: 1350, label: 'PMG' }, // Parametric Massing Generator
  { x: 1700, y: 1830, label: 'ZLA' }, // Zoning Literacy Assistant
  { x: 3320, y: 2020, label: 'VCM' }, // View Corridor Massing
  { x: 3960, y: 560, label: 'EMA' }, // Environmental Massing Agents
  { x: 3310, y: 1010, label: 'PROVENANCE' }, // PhD site
  { x: 4330, y: 880, label: 'GENENV →' },
] as const;
