# PhD Directions Revision (2026-11-20)

This revision replaces the three earlier directions: the verified performance contract, the calibrated climate co-designer and the embodied reasoning studio. The new set is three alternative doctoral directions within one program, Xun Liu's NSERC Discovery project, **Human-AI Co-Design Framework for Performance-Aware Constructed Environments**. One direction would become the dissertation, chosen with Xun Liu. Direction 1 is Roman's current strongest starting point, but none has been chosen permanently.

The only public facts about the grant are its title and its NSERC Discovery status (UBC Research, 7 July 2026). The deck therefore says "could contribute to", "would align with" and "I would like to investigate". It never says what the grant requires or will build.

Nothing was committed or pushed. This is waiting for Roman's review.

## Step order (26 steps)

| # | Step | Section |
|---:|---|---|
| 1 to 2 | Title; question and route | Opening |
| 3 to 10 | Making; Tabriz; Zangar (2); competitions; ITU; Büyükada; generative images | Background |
| 11 to 13 | eCAADe; SFU and iViz Lab; HCI studies | Previous research |
| 14 to 18 | Division of roles; ZLA; PMG; VCM; EMA | Research projects |
| 19 | What already exists, and the missing link (unchanged) | PhD directions |
| 20 | **New:** Between the designer's intention and the final decision (shared platform) | PhD directions |
| 21 | **New:** Direction 1, Performance EvidenceGraph Co-Designer | PhD directions |
| 22 | **New:** Direction 2, Negotiable-Agency Performance Co-Designer | PhD directions |
| 23 | **New:** Direction 3, Multi-Agent Performance Deliberation Studio | PhD directions |
| 24 | **New:** Comparing the three directions | PhD directions |
| 25 | Where my path meets GenEnv (note updated) | GenEnv |
| 26 | Thank you (first question updated) | Conversation |

Two steps were removed: "AI interprets and co-ordinates…" (the shared principle, with the `loop` diagram) and "One program, three possible directions" (the `branches` diagram). The diagram code is kept.

## Timing

Each step is timed at the stated pace plus 3 s for the transition.

| Part | Words | 110 wpm | 105 wpm | 100 wpm | Brief target |
|---|---:|---:|---:|---:|---|
| Shared platform (20) | 76 | 0:44 | 0:46 | 0:49 | 0:35 to 0:45 |
| Direction 1 (21) | 121 | 1:09 | 1:12 | 1:16 | 1:05 to 1:15 |
| Direction 2 (22) | 106 | 1:01 | 1:04 | 1:07 | 0:55 to 1:05 |
| Direction 3 (23) | 126 | 1:12 | 1:15 | 1:19 | 1:05 to 1:15 |
| Comparison (24) | 68 | 0:40 | 0:42 | 0:44 | 0:35 to 0:45 |
| **Directions, 20 to 24** | **497** | **4:46** | **4:59** | **5:13** | **4:30 to 5:00** |
| State of the art (19) | 145 | 1:22 | 1:26 | 1:30 | (outside the brief's five parts) |
| **Whole talk** | **1,652** | **16:19** | **about 17:00** | **17:49** | Earlier target 12:30 to 14:00 |

The whole talk is now well over the earlier 14:00 target. The brief protected the background and research sections, so they were not cut. The cut with the most room is the step 19 notes (145 words).

## Each direction against the brief's eleven requirements

| Requirement | 1 EvidenceGraph | 2 Negotiable agency | 3 Deliberation |
|---|---|---|---|
| Built-environment problem | Early-stage courtyard or massing performance | Shading versus footprint decisions | Daylight vs energy (or solar vs outdoor comfort) |
| Working AI prototype | Intent parser, planner, verifier | Intent interpreter, critic, agency controller | Orchestrator, two specialist agents, synthesis |
| Rhino/Grasshopper via MCP | MCP bridge | MCP → Grasshopper, protected branches | MCP → Grasshopper, shared design state |
| Deterministic engine | One or two validated domains | Daylight or energy | Two validated engines |
| Structured, editable representation | JSON schema, editable parameters | Structured design state | Shared design-state representation |
| Human control | Accept, refine, roll back | Designer sets and changes permissions | Designer sets priorities, resolves trade-offs |
| Traceable records | Evidence graph (geometry, inputs, weather, tool version, settings, units, state) | Interaction history (why authority changed) | Deliberation record, evidence broker |
| Error detection and bounded recovery | Stale results flagged; failed calls rerun within permissions | Approval gate; critic; rollback | Evidence broker rejects claims without results; rollback |
| Technical evaluation | Benchmark of edit sequences | Unsupported actions, corrections, rollback success | Unsupported claims, consistency, coverage, reproducibility |
| Designer study | Chat-and-simulation vs EvidenceGraph | Fixed low vs fixed high vs negotiated agency | Single agent vs hidden multi-agent vs visible deliberation |
| Contribution beyond connecting tools | Evidence dependencies constrain AI claims | Negotiable agency grounded in geometric and evidential consequence | Visible, evidence-grounded negotiation in a professional workflow |

The platform step and each direction state that the language model plans, calls tools and explains, while validated tools calculate the numbers.

## Research questions (held in `src/data/provenance.ts`, not shown in full on slides)

**Direction 1**
1. How can performance evidence remain valid and understandable during iterative human-AI design?
2. How should an AI system detect and communicate stale, incomplete or contradictory performance evidence?
3. Does evidence-linked interaction improve designers' ability to identify errors and make informed performance decisions?
4. How does traceable evidence affect appropriate reliance on AI recommendations?

**Direction 2**
1. How should agency be distributed between human and AI during different stages of performance-aware design?
2. Can agency be adjusted using evidence quality, uncertainty, consequence and reversibility?
3. When should the AI ask, suggest, execute, critique or remain silent?
4. How do different agency arrangements affect exploration, performance outcomes, workload, authorship and appropriate reliance?

**Direction 3**
1. How can specialised AI agents deliberate over competing constructed-environment performance goals without hiding conflict?
2. How should deterministic simulation evidence be represented and exchanged among agents?
3. Does visible agent disagreement improve designers' understanding of performance trade-offs?
4. Can a human-directed deliberation system produce more diverse and defensible alternatives than a single-agent or silent optimisation workflow?

## Sources

### Re-checked on 2026-11-20 (already in the drawer)

| Source | What was checked |
|---|---|
| UBC Research, NSERC Discovery, 7 July 2026 | Lists "Liu, Xun" with the exact program title |
| genenv.ai | Lab name, Xun Liu, Human-AI Co-Design project |
| genenv.ai/openings | PhD openings for September 2027; human-AI co-design and performance-informed design |
| Liu and Tian, NeurIPS 2025 Creative AI | Title and authors on the proceedings page |

### Added, each confirmed through Crossref on 2026-11-20

| ID | Citation |
|---|---|
| `li-mcp-bem-2026` | Li, H., Zhang, L., Zhou, H., Hong, T. (2026). MCP-enabled agentic AI workflow for building energy modelling: framework and use cases. *Journal of Building Performance Simulation*, 1 to 27. doi:10.1080/19401493.2026.2653969 |
| `energyplus-mcp-2025` | Li, H., Xu, Y., Hong, T. (2025). EnergyPlus-MCP: A model-context-protocol server for AI-driven building energy modeling. *SoftwareX* 32, 102367. doi:10.1016/j.softx.2025.102367 |
| `zhang-agent-schema-2025` | Zhang, L., Fu, X., Li, Y., Chen, J. (2025). Large language model-based agent schema and library for automated building energy analysis and modeling. *Automation in Construction* 176, 106244. doi:10.1016/j.autcon.2025.106244 |
| `maier-chi2026` | Maier, S., Schneider, M., Feuerriegel, S. (2026). Partnering with Generative AI: Experimental Evaluation of Model-Led and Human-Led Interaction in Human-AI Co-Creation. *CHI 2026*, 1 to 28. doi:10.1145/3772318.3791185 |
| `req2cad-chi2026` | Jing, Q., Lu, H., Huang, S., Childs, P., Chen, L. (2026). Req2CAD: Bridging Functional Requirements and Parametric CAD Models to Support Conceptual 3D Design. *CHI 2026*, 1 to 25. doi:10.1145/3772318.3791949 |
| `optimuse` (updated) | Zhou, J., Li, R., Tang, J., Tang, T., Li, H., Cui, W., Wu, Y. (2024). Understanding Nonlinear Collaboration between Human and AI Agents: A Co-design Framework for Creative Design. *CHI 2024*, 1 to 16. doi:10.1145/3613904.3642812. Already in the deck as "OptiMuse"; DOI and authors added, not duplicated. |

All of these appear in the PhD-directions source drawer (`phd` scene).

## Attribution and overlap

- **Direction 2 overlaps existing work.** GenEnv's Grasshopper MCP already has Inspect, Tune, Coach, Execute and Author modes, and Lam's UBC M.Arch thesis is titled *Who Designs: Architectural Agency Negotiating Between Humans and Machines* (ArchSim). The slide credits both. The notes say the modes themselves are not the contribution. The proposed contribution is permissions that adjust to consequence, reversibility and evidence strength.
- **Direction 3 builds beyond ArchSim and agent role division.** The notes say that "more agents is not the point".

## Claims that could not be independently verified

- **"Fit with program" (Very strong / Strong / Very strong):** Roman's reading of the public program title, labelled "(my reading)" on the slide. No grant objectives are public.
- **"Technical risk" (Moderate / Moderate / High):** a judgment, not a measurement.
- **Whether GenEnv will provide Radiance, EnergyPlus, Honeybee or a Vancouver testbed:** not known. The slide says "possible tools, not all at once".
- **Whether the "BUILDS ON" works match what each direction would extend:** these lines name related work. They do not claim the authors endorse the directions.
- **What the iViz Lab works on:** described as "works on AI" on step 12, from earlier sessions; Roman to confirm.
- **Unchanged from earlier and still unverified:** FluX (2016) and Archi-Agent on step 19.

## Confirmations

- **The four existing projects are unchanged** (ZLA, PMG, VCM, EMA, steps 14 to 18). They are still called exploratory research projects, with their limits attached. Nothing presents them as completed PhD systems.
- **All three directions are labelled as not yet built.** Each diagram is headed "PROPOSED PHD RESEARCH · NOT YET BUILT", and each kicker says "Proposed PhD research".
- **No forbidden claims were made.** No direction promises all performance domains, an optimal design, or invented numbers, study sizes or accuracy.
- **All three directions stay within the one program.** Each sits inside "Human-AI Co-Design Framework for Performance-Aware Constructed Environments", built on one shared platform.

## Files changed

- `src/data/provenance.ts`: `PLATFORM`, `PLATFORM_TOOLS`, `PLATFORM_START`, the new `Direction` interface and `DIRECTIONS`, `COMPARISON`, and the `CONFLUENCE.note`.
- `src/sheets/framework.tsx`: `Platform`, `SystemRow`, `Feedback`, the new `DirectionView`, `Compare`, an adapted `Branches`, and the diagram ratios.
- `src/sheets/diagrams.tsx`: registers `platform` and `compare`.
- `src/data/types.ts`: adds the `platform` and `compare` diagram IDs.
- `src/data/steps.ts`: steps 20 to 24 rewritten; the PhD-directions target is now 6:15; the step 26 question and notes updated.
- `src/data/atlas.ts`: map districts renamed to Evidence, Agency, Deliberation.
- `src/data/citations.ts`: five sources added; OptiMuse updated.
- `src/data/scenes.ts`: the `phd` drawer list updated.
- `docs/PRESENTATION_SCRIPT.md`, `docs/TIMING_AUDIT.md`: regenerated.
- `docs/NSERC_THREE_PROTOTYPE_DIRECTIONS_RATIONALE.md`: marked superseded.
- This file.
