# Project Evidence Audit

Every claim shown in the presentation, its source, verification status, and the limitation that
must stay attached to it. Verification date for all live checks: **2026-11-13**. Machine-readable
counterpart: `src/data/evidence.ts` (the UI reads only from there).

## Source hierarchy used

1. Interview deck + speaker notes (narrative) — `Roman_Jahandideh_GenEnv_PhD_Interview_Research_Deck.pptx`
2. Manuscripts (methods, Ns, findings, status) — eCAADe 2023 paper (read in full), ACM ISS Companion ’26 camera-ready LaTeX (read in full), BioTerrarium/SIGGRAPH manuscript (read in part)
3. CV + portfolio (biography, education, awards, skills) — `Roman_Jahandideh_Academic_CV.pdf`, romanjahandideh.github.io source
4. GitHub READMEs (prototype functionality + results) — all four fetched and quoted
5. Official external pages (GenEnv, NSERC, SALA, LACF, NeurIPS, DOIs) — fetched

## Publications

| Claim | Source | Status |
|---|---|---|
| eCAADe 2023: 60 participants, 4×6×2 within-subject, 264 pairwise judgments each, Quest 2 / UE 4.27 | Paper, Methodology | **Verified** (paper read; DOI resolves to CumInCAD) |
| Reversal at 60%/90% transparency: cool + dark perceived nearer | Paper, Results/Conclusion | **Verified** |
| ISS ’26 accepted; Study 1 N=36: HR 66.3%, HRV 58.2%, joint 44.6% vs 6.25% chance | Camera-ready abstract + Results | **Verified** (manuscript); **DOI 10.1145/3845796.3859311 registered but not yet active** (proceedings Nov 23–26 2026) — labelled in the drawer |
| Study 2: 12 three-player teams; Icon 3.90 s faster than No Cue (15.3→11.4 s; t(11)=−5.05); workload 3.55 vs 3.85; invasiveness 3.19 vs 4.39; Numeric higher usefulness 5.50/trust 5.55 | Camera-ready, Study 2 | **Verified** (manuscript) |
| BioTerrarium: <200 ms end-to-end; n=24 counterbalanced; PANAS/FSS/MAAS + interviews; four regulation zones | Manuscript system/study sections; portfolio page | **Verified as design facts**; outcome analysis **under revision** — not presented as established results |
| BioTerrarium status | CV: “Reviewed and revised for ACM SIGGRAPH 2026, not accepted; being reworked”; portfolio Current Status agrees | **UNDER REVISION** label everywhere |

## Four prototypes (GitHub READMEs fetched 2026-11-13)

| Claim | Status | Note |
|---|---|---|
| PMG: source phrase + confidence per value; independent review pass; 3 modes; R1-1 preset 4.9/1.2/10.7 m, 11.5 m·3 st, FSR 0.70→1.00; half-plane clipping | **Verified** (README) | |
| PMG: “eight structured constraints” | **Reported** | Portfolio page enumerates the 8 fields; README says “each parameter” without a count. Shown with source note in evidence record. |
| ZLA: 10 addressable clauses; retrieve→answer→verify as 3 separate calls; “not covered” stop; deterministic site arithmetic | **Verified** (README) | |
| ZLA example: 10×37 m lot → 162.6 m²; FSR 0.70→1.00 → 1→2 floors | **Verified + re-derived**: (10−2×1.2)×(37−4.9−10.7)=7.6×21.4=162.64 | |
| VCM: flat cap 10 floors/18,360 m² vs floor-by-floor 18 floors/25,608 m² = +39.5% | **Verified** (README; ratio re-checked: 25,608/18,360=1.395) | |
| VCM rotation study: **7 orientations**, GFA Δ0.02%, floors 18→17 | **Verified** | The deck note that said “19 orientations” conflated this with EMA’s H3 — corrected here. |
| VCM: Creekside Park view J1; City Open Data + offline copy; Rhino 3DM output | **Verified** | |
| VCM: BASE_ELEV_M + SLOPE placeholders; GH final step written but unexecuted | **Verified limitation** — drawn orange-hatch / grey-dash | |
| EMA: 6 functional roles (Generator + 4 Critics + Orchestrator) over a real MCP server | **Verified**; README’s “five Claude agents” counts Generator+Critics — the Orchestrator is described explicitly per the correction rule | |
| EMA: 1,080-design grid; 5+5 seeds; 200-evaluation budget | **Verified** | |
| EMA H1: strict speed hypothesis NOT confirmed (random’s one success at 70 evaluations); reliability 4/5 vs 1/5 | **Verified** — kept red on the map | |
| EMA H2: timber weakly dominated concrete and steel 200/200 | **Verified** — stated as dominance across objectives, not carbon-only | |
| EMA H3: floor formula ±1 floor over 19 orientations, MAE 0.16 | **Verified** | |
| EMA H4: wind↔yield r=−1.000 over 10-member Pareto set | **Verified** (exploratory) | |
| EMA limitations: simplified solar; benchmark carbon (not LCA); wind proxy (not CFD); placeholder elevations; live unscripted LLM loop not executed without API key | **Verified limitation** — shown in panel | |

## Education, awards, context

| Claim | Source | Status |
|---|---|---|
| Tabriz Islamic Art University B.Arch 2011–2016; ITU Master’s Landscape Architecture 2020–2024; SFU MSc IAT 2025–present (Master of Science, confirmed by Roman 2026-11-15) | CV + deck | **Verified** (CV shorthand “Tabriz Art University”) |
| Best Dissertation (Zangar Museum) 2016; Second Prize landscape 2013; Sixth Prize Sustainable Cabin (Memar News) 2018 | CV + deck + board images | **Verified** |
| Abstract Photography Award 2018 | Deck + portfolio sheet; **not in the academic CV** | **Discrepancy flagged**: the portfolio board says “Abstract Photo of City — 2018 Winner”, photograph “A Tunnel To Heaven”; the deck says “The Ghost of Playground”. The UI shows the board’s wording and notes the deck label. **Needs Roman’s confirmation.** |
| TCPS 2: CORE 2022 certificate | Deck (not re-verified against certificate file) | Reported; not displayed prominently |
| NSERC: “Human-AI Co-Design Framework for Performance-Aware Constructed Environments”, Liu Xun, UBC, RGPIN 2026, 5-year term | NSERC funding-decisions result/939, row read verbatim | **Verified** (page uses a plain hyphen in “Human-AI”) |
| GenEnv program 2026–2031, work in progress, recruiting; “editable, traceable, and open to human judgment” | genenv.ai + /human-ai-co-design | **Verified** (quoted fragment) |
| Digital Thermal Sandbox attribution: Yuhao Lu (PI), LACF grant #207 | genenv.ai + lacf.ca | **Verified** |

## Link verification (2026-11-13)

Working: eCAADe DOI → CumInCAD · romanjahandideh.com + all five project pages · both live demos
(parametric-massing-generator, zoning-literacy-assistant on github.io) · all four GitHub repos ·
genenv.ai (6 pages) · SALA (Liu profile = Assistant Professor; DTS PhD page) · NSERC result/939 ·
LACF grant page · NeurIPS 2025 Liu & Tian page (title confirmed).

Flagged:
- **ISS DOI 10.1145/3845796.3859311** — 404 until the ISS Companion ’26 proceedings publish (conference Nov 23–26 2026). Kept on screen with an “activates with proceedings” note.
- **CHI/MDPI citations** (10.1145/3706598.3713649, 10.1145/3706598.3713401, 10.1145/3772318.3791643, 10.3390/en18225921) — DOIs resolve; publishers returned HTTP 403 to automated fetches, so titles are **as cited in the application materials**, marked in the source drawer.
- **UBC Applied Science funding news page** — returned an empty body; **omitted** from the interface.
- **biofeedbackexperiment.netlify.app** (named in the CV as the BioTerrarium prototype) actually serves the *Simulated Biofeedback Icon Validation Study* page — **not used** as a BioTerrarium link; the portfolio page + repo are used instead.
- GitHub repo `embedding-physiological-environments` and the ISS portfolio page links are taken from Roman’s own site but were not individually fetched — marked `*` (unverified) in the project sheet.

## Items that require Roman’s confirmation

1. Photography award naming (above).
2. “Eight constraints” presentation (portfolio-sourced count vs README wording).
3. The speaking script trims the deck’s per-scene timings to fit 17:30 — review pacing.

## 2026-11-15 project-section revision

- Project order is now ZLA → PMG → VCM → EMA (narration and map route both follow it).
- New in-section wording checked against the READMEs: the ZLA refusal is shown as "Not covered by the provided source." (the README's behaviour is a "not covered" stop); the PMG FSR 0.70 → 1.00 moment is drawn as +1 storey on the representative R1-1 envelope, consistent with the ZLA checker's 1 → 2 floors at 10 × 37 m. Treat it as illustrative, not a site-specific result.
- Concept lines added inside sections (parametric relationships, performance-informed design, generative vs optimization, Pareto, deterministic vs stochastic vs heuristic). These are definitions, not claims about the projects.
- All 4 portfolio pages, 4 GitHub repos, and 2 live demos returned HTTP 200 on 2026-11-15.
- Still needs Roman's confirmation: whether "procedural / parametric / generative" is the framing he wants for PMG, and the ten-clause wording ("simplified ten-clause R1-1 knowledge base").
