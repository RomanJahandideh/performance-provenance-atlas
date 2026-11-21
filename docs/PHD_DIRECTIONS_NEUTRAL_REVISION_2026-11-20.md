# Field-Level Revision of the Research-Direction Section (2026-11-20)

The slides now present the research agenda in field-level terms. The steps were changed in four ways:

- **No names or institutions on slides.** No slide, navigation label, caption, legend or table names a professor, lab, university, grant or funded program. The fit appears only through the research questions, the system architecture, the methods and the contributions.
- **Sources unchanged.** Full citations, with every author (Liu and Tian included), DOIs and verification notes, stay in `citations.ts` and the source drawer (S).
- **Speaker notes cite works, not people.** They name works, not people, and use no alignment phrases.
- **Navigation.** "GenEnv" is now **Research fit**. The internal scene id `genenv` is unchanged.

Nothing was committed, pushed or deployed. This is waiting for Roman's review.

## Visible-text audit (rendered, 2026-11-20)

The audit searched the rendered text of all 26 steps (HTML and SVG), the navigation, the legend (L) and the presenter window for steps 19 to 26. The search terms were Xun, Liu, GenEnv, UBC, NSERC, "funded program", "the lab", "lab's", "fit with program" and "why GenEnv". **There were no matches.**

Matches remain only in the source drawer, all as source records with full authorship:

- **Step 19 drawer:** Liu and Tian (NeurIPS 2025); Liu (JoDLA 2020); Liu, Yang and Tian (JoDLA 2024); Jin et al. with Liu and Tian (eSim 2026); GenEnv Grasshopper MCP v2; Lam, ArchSim (UBC M.Arch thesis).
- **Steps 20 to 24 drawer:** the UBC NSERC announcement; the GenEnv home, openings and Human-AI Co-Design pages; GenEnv Grasshopper MCP v2; Liu and Tian; Jin et al.; plus the "Inspect · Tune · Coach · Execute · Author" record on Grasshopper MCP modes.
- **Step 25 drawer:** the NSERC award records; the GenEnv project pages (Decoding Urban Form, Grasshopper MCP, Computational Lexicalization, Digital Thermal Sandbox, openings); the SALA faculty and program pages; and the record quoting GenEnv's "editable, traceable, open to human judgment".
- **Step 25 drawer, removed:** the "GenEnv is recruiting a PhD student" claim (`genenv-phd-priority`). The record still exists in `evidence.ts`.
- **Not rendered by any step:** the unused `journey` diagram in `diagrams.tsx` and code comments.

## Other changes

- **Step 1 kicker:** now "PhD interview · Design, Technology and Society · Fall 2027".
- **Step 2:** the fact is now "Research area: Human-AI co-design for performance-aware constructed environments", and the notes no longer name the program.
- **Title and closing maps:** the attributed GenEnv projects box is now "Related field · selected precedents, not my work".
- **Legend:** "GenEnv work" is now "Field precedents".
- **Step 19:**
  - The rows are grouped by capability and name works by title and venue.
  - No row is coloured by institution.
  - Yellow marks only the least-resolved capability and the open research problem.
  - FluX is no longer shown: it is unverified, and it is also removed from the drawer.
- **Directions:** the "Builds on" lines are now "Research foundation" lines describing fields. Each "Proposed contribution" box is yellow, and the proposed systems keep the proposal blue from the legend.
- **Comparison:** the row is now "Coherence with the shared research problem", and the footer refers to supervised doctoral research.
- **Step 26:** the questions no longer mention the lab.
- **`phd-provisional` evidence record:** updated to the current three directions, and "Not approved by Prof. Liu" is now "Not approved by any supervisor".

Steps 3 to 18 (the background, previous research and the four research projects) match the last commit exactly.
