/** Education anchors, awards, and the research route. */

export interface CampusAnchor {
  id: string;
  institution: string;
  degree: string;
  period: string;
  pos: { x: number; y: number };
}

export const CAMPUSES: readonly CampusAnchor[] = [
  { id: 'tabriz', institution: 'Tabriz Islamic Art University', degree: 'B.Arch · Architecture', period: '2011 – 2016', pos: { x: 480, y: 2160 } },
  { id: 'itu', institution: 'Istanbul Technical University', degree: 'Master’s · Landscape Architecture', period: '2020 – 2024', pos: { x: 560, y: 1640 } },
  { id: 'sfu', institution: 'Simon Fraser University', degree: 'MSc · Interactive Arts + Technology', period: '2025 – present', pos: { x: 720, y: 1120 } },
] as const;

export interface Award {
  id: string;
  title: string;
  year: string;
  pos: { x: number; y: number };
}

/** Drawn as a clean row of board structures under Tabriz; details live in the story blocks. */
export const AWARDS: readonly Award[] = [
  { id: 'zangar', title: 'Best Dissertation', year: '2016', pos: { x: 330, y: 2330 } },
  { id: 'landscape-2013', title: 'Second Prize', year: '2013', pos: { x: 500, y: 2330 } },
  { id: 'cabin', title: 'Sixth Prize', year: '2018', pos: { x: 670, y: 2330 } },
  { id: 'photography', title: 'Photography', year: '2018', pos: { x: 840, y: 2330 } },
] as const;

/** The yellow research route, in presentation order. */
export const ROUTE_POINTS: readonly { x: number; y: number; label?: string }[] = [
  { x: 480, y: 2160 }, // Tabriz
  { x: 560, y: 1640 }, // Istanbul
  { x: 720, y: 1120 }, // SFU
  { x: 660, y: 900 }, // BioTerrarium
  { x: 900, y: 700 }, // eCAADe
  { x: 1150, y: 560 }, // ISS
  { x: 1380, y: 1180 }, // grid entry
  { x: 1800, y: 1700, label: 'ZLA' },
  { x: 2420, y: 1560, label: 'PMG' },
  { x: 3040, y: 1420, label: 'VCM' },
  { x: 3660, y: 1160, label: 'EMA' },
  { x: 4080, y: 940, label: 'PROVENANCE' },
  { x: 4360, y: 860, label: 'GENENV →' },
] as const;

/** Cumulative route fraction reached by the END of each scene (13 nodes → 12 segments). */
export const ROUTE_TARGETS: Record<string, [startFrac: number, endFrac: number]> = {
  opening: [0, 0],
  trajectory: [0, 3 / 12],
  foundation: [3 / 12, 6 / 12],
  zla: [6 / 12, 7 / 12],
  pmg: [7 / 12, 8 / 12],
  vcm: [8 / 12, 9 / 12],
  ema: [9 / 12, 10 / 12],
  synthesis: [10 / 12, 10 / 12],
  phd: [10 / 12, 11 / 12],
  genenv: [11 / 12, 1],
  conversation: [1, 1],
  'appendix-links': [1, 1],
};
