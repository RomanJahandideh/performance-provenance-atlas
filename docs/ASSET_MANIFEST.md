# Asset Manifest

All assets ship locally (`public/assets/`); nothing loads from the network at runtime.
Images were resized/compressed for projector use (longest side ≤1400px).

| File | Shows | Origin | Credit / note |
|---|---|---|---|
| `deck/campus-tabriz.jpeg` | Historic brick courtyard building with fountain (Tabriz) | Interview deck, slide 2 | Photo: Morteza Kholghi on Unsplash (as credited in the deck) |
| `deck/campus-itu.jpeg` | ITU Taşkışla aerial | Interview deck, slide 2 | Photo: Anıl İnşaat ITU Taşkışla project page (as credited in the deck) |
| `deck/campus-sfu.jpeg` | SFU Surrey atrium | Interview deck, slide 2 | Photo: Simon Fraser University (as credited in the deck) |
| `deck/award-zangar.jpeg` | Zangar Museum dissertation board | Interview deck, slide 3 | Roman Jahandideh's own board |
| `deck/award-cabin.jpeg` | Sustainable cabin competition board | Interview deck, slide 3 | Roman Jahandideh's own board |
| `deck/award-photography.jpeg` | Photography competition sheet (“Abstract Photo of City — 2018 Winner”, photograph “A Tunnel To Heaven”) | Interview deck, slide 3 | Roman's own sheet. Deck text says “The Ghost of Playground” — discrepancy flagged in PROJECT_EVIDENCE_AUDIT.md |
| `projects/pmg-hero.webp` | Massing generator, urban block mode | Portfolio repo `assets/images/projects/` | Roman's own screenshot |
| `projects/zla-hero.webp` | Zoning Literacy Assistant UI | Portfolio repo | Roman's own screenshot |
| `projects/vcm-hero.webp` | Corridor-trimmed stepped massing | Portfolio repo | Roman's own render |
| `projects/ema-hero.webp` | EMA plan/shadow/section | Portfolio repo | Roman's own figure |
| `projects/bioterrarium-hero.webp` | BioTerrarium environment | Portfolio repo | Roman's own screenshot |
| `projects/bioterrarium-zones.webp` | Four regulation zones | Portfolio repo | Roman's own figure (currently unused spare) |
| `figures/ecaade-results.png` | eCAADe results bar graphs | Portfolio repo (`immersive-virtual-landscapes-paper/page-6-figure-1.png`, identical to deck copy) | From Roman's published paper |
| `figures/iss-teaser.png` | ISS annotated teaser (cooking game + halos) | Interview deck copy of the camera-ready teaser | From Roman's accepted manuscript |
| `favicon.svg` | Atlas mark | Drawn for this site | Original |

## Fonts (self-hosted via npm, OFL-licensed)

Inter Tight 600/700 · Inter 400/500/600 · IBM Plex Mono 400/500 (`@fontsource/*`).

## Placeholders / missing assets

- **Second Prize, landscape design competition (2013)** — no image in the supplied materials;
  the award sheet shows a clearly-labelled placeholder instead of stock imagery.
- No SFU/iViz lab-interior, ISS environment-detail, or BioTerrarium gallery images are embedded
  beyond the above; candidates exist in the portfolio repo (`bioterrarium-env-2/3/4.webp`,
  `remote-teammates-body/` figures) and can be added via `src/data/*` + this manifest.
- BioTerrarium demo video (YouTube `eQTvM0gaBxc`) is intentionally not embedded (offline rule);
  the portfolio link carries it.
