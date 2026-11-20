# GenEnv Fit Matrix

How each piece of my evidence maps to a stated GenEnv research need, and what I still have to
learn. GenEnv needs are taken from the lab's own pages, fetched 2026-11-16:
[Human-AI Co-Design](https://genenv.ai/human-ai-co-design),
[Decoding Urban Form](https://genenv.ai/decoding-urban-form),
[Grasshopper MCP](https://genenv.ai/grasshopper-mcp),
[Computational Lexicalization](https://genenv.ai/computational-lexicalization),
[Digital Thermal Sandbox](https://genenv.ai/digital-thermal-sandbox),
[Openings](https://genenv.ai/openings). GenEnv's projects are theirs; nothing here claims them.

**Primary position:** where human-AI co-design meets performance-informed design, with the zoning
and spatial-data prototypes as the bridge to agentic AI for urban knowledge. The openings page
says applicants are not expected to work across all three areas.

| My evidence | Capability it shows | GenEnv need it speaks to | Limitation, or skill still to develop |
|---|---|---|---|
| Zoning Literacy Assistant: cited retrieval, answers only from retrieved clauses, "not covered" stop, site area in code | Evidence-bounded urban knowledge; refusing when evidence is absent | Decoding Urban Form: retrieve source clauses, keep citations and uncertainty; agentic AI for urban knowledge | Ten clauses of one zone; no conditional-rule structure, parcel geometry from real data, or multi-view rendering yet |
| Parametric Massing Generator: rules with source phrases, editable envelope, deterministic geometry, reviewer pass | Turning regulation into editable, relational geometry | Human-AI Co-Design: outputs that stay live and editable; Decoding Urban Form: rules to 3D massing | Web geometry, not Rhino/Grasshopper; not compliance software |
| Vancouver View Corridor Massing: floor-by-floor clipping against City corridor data, rotation study | Deterministic spatial constraints; showing a shortcut's error (+39.5%) | Verification methods for AI-generated proposals; regulatory feedback | Base elevation and slope are placeholders; the Grasshopper step is written but not executed |
| Environmental Massing Agents: generator, four critics, orchestrator over deterministic evaluators via MCP; NSGA-II vs random | Agent roles bounded by verified evaluators; reporting a falsified hypothesis | Human-AI Co-Design: performance feedback (energy, carbon) in early design; core agentic framework | Simplified solar, benchmark carbon (not LCA), wind proxy (not CFD); live LLM loop not run. Need real analysis engines (Ladybug/Honeybee, EnergyPlus) and structural feedback |
| eCAADe 2023 (published): 60 participants, transparency and colour in VR depth perception | Controlled perception experiment; representation changes interpretation | Interfaces that keep designers' judgment calibrated | Single background; perception, not design tasks |
| ISS 2026 (accepted): halo vs numeric cues, 36 + 12 teams | Representation, workload and trust as a measured trade-off | Calibrated trust; verification interfaces; studies with people | Companion (poster) paper; team task, not design |
| BioTerrarium (under revision): wearable to Unity under 200 ms, n = 24 | End-to-end real-time system building; within-subjects study design | Live connections between tools; studies with people | Results provisional; not the proposed topic |
| Architecture (Tabriz, Zangar Museum dissertation) and landscape architecture (ITU, Büyükada water system, GIS) | Design judgment; reading sites as systems of slope, water and infrastructure | Performance-informed design; Digital Thermal Sandbox (landscape, planting, materials) | No formal microclimate simulation experience yet |
| TA for IAT 313, IAT 343, IAT 102; Unity workshop | Explaining tools and design reasoning to others | Lab collaboration; RA documentation and testing roles | |
| Proposed: traceable agentic co-design, performance provenance, calibrated agency | A research question that grew out of the projects above | Human-AI Co-Design's current stage: the core agentic framework, connections between design and analysis tools, and verification methods (source fact; not used as visible motivation) | A proposal for discussion. Not approved; nothing built; scope to be set with a supervisor |

## Skills to develop first

1. Rhino and Grasshopper development at the plug-in level (GH_Component, RhinoCommon) and MCP
   tool design, to work inside GenEnv's Grasshopper MCP rather than beside it.
2. Validated environmental engines (Ladybug Tools, EnergyPlus or Radiance) instead of proxies.
3. Study design for professional designers: recruitment, think-aloud protocols, trust-calibration
   measures.
4. Formal provenance models (for example W3C PROV) as a starting point for the record.
