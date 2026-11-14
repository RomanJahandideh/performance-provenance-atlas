import { useEffect, type ReactNode } from 'react';
import type { Scene } from '../data/types';
import { advance, setIx, setState, useAppState } from '../state/store';
import { CAMPUSES, AWARDS } from '../data/trajectory';
import { ev } from '../data/evidence';
import { parcel } from '../data/projects';
import { PROVENANCE_LINKS, PHD_METHODS, PHD_SUBQUESTIONS, PHD_SYSTEM } from '../data/provenance';
import { cite } from '../data/citations';

/** Step-gated reveal. */
function R({ n, step, children, className = '' }: { n: number; step: number; children: ReactNode; className?: string }) {
  return <div className={`reveal ${step >= n ? 'is-on' : ''} ${className}`}>{children}</div>;
}

function Links({ id }: { id: string }) {
  const p = parcel(id);
  return (
    <div className="panel-links">
      {p.links.map((l) => (
        <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer">
          {l.label} ↗{l.verified ? '' : ' *'}
        </a>
      ))}
    </div>
  );
}

function StepDots({ scene, step }: { scene: Scene; step: number }) {
  return (
    <div className="step-hint">
      <span className="step-dots" aria-hidden>
        {scene.steps.map((s, i) => (
          <i key={s.id} className={i <= step ? 'on' : ''} />
        ))}
      </span>
      <span>
        {step + 1}/{scene.steps.length} · {scene.steps[Math.min(step, scene.steps.length - 1)]?.label}
      </span>
      <button className="hud-btn" onClick={() => advance()} aria-label="Next step">
        NEXT →
      </button>
    </div>
  );
}

export function PanelShell({ scene, step, children }: { scene: Scene; step: number; children: ReactNode }) {
  return (
    <div className="scene-panel" role="group" aria-label={`Scene ${scene.chapter}: ${scene.title}`}>
      <p className="panel-kicker">
        <span className="ch">{scene.chapter}</span>
        <span>{scene.kicker}</span>
      </p>
      <h2 className="panel-title">{scene.title}</h2>
      {children}
      <StepDots scene={scene} step={step} />
    </div>
  );
}

// ─── Scene panels ────────────────────────────────────────────────────────────

export function OpeningPanel({ scene, step }: { scene: Scene; step: number }) {
  return (
    <PanelShell scene={scene} step={step}>
      <p className="panel-statement">{scene.statement}</p>
      <div className="panel-body">
        <p>
          Roman Jahandideh · MA candidate, Interactive Arts and Technology, Simon Fraser University — presenting a research
          trajectory and a doctoral direction for discussion with Professor Xun Liu and the Generative Environments Lab.
        </p>
        <R n={0} step={step}>
          <p>
            This is one continuous map. <b>Left → right:</b> spatial scale, from a bylaw clause to a district. <b>Bottom → top:</b>{' '}
            computational agency, from deterministic calculation to multi-agent negotiation. Status is drawn, not badged — the
            legend (<kbd>L</kbd>) explains every line type.
          </p>
        </R>
        <R n={1} step={step}>
          <p>
            The yellow route is my path through that territory: spatial design → virtual perception → embodied interaction →
            responsive environments → generative systems → <b>performance provenance</b>.
          </p>
        </R>
        <R n={2} step={step}>
          <p className="limit-note" style={{ borderColor: 'rgba(242,207,85,.5)', color: 'var(--yellow)' }}>
            The destination is drawn as a dotted footprint on purpose: a proposed site, surveyed but not yet built — a direction
            to refine together, not a finished claim.
          </p>
        </R>
      </div>
    </PanelShell>
  );
}

export function TrajectoryPanel({ scene, step }: { scene: Scene; step: number }) {
  const c = CAMPUSES[Math.min(step, 2)]!;
  return (
    <PanelShell scene={scene} step={step}>
      <div className="panel-body">
        {step <= 2 ? (
          <div>
            <img src={c.image} alt={c.imageAlt} style={{ width: '100%', borderRadius: 3, border: '1px solid var(--panel-border)' }} />
            <p style={{ margin: '10px 0 2px' }}>
              <b>{c.institution}</b>
            </p>
            <p className="cit-meta" style={{ margin: 0 }}>
              {c.degree} · {c.period} · {c.discipline}
            </p>
            <p style={{ marginTop: 8 }}>{c.capability}</p>
            <p className="cit-verify" style={{ margin: 0 }}>
              {c.imageCredit}
            </p>
            {step === 0 && (
              <div className="ev-row" role="list" aria-label="Design and photography awards — click to open">
                {AWARDS.map((a) => (
                  <button key={a.id} className="chip" role="listitem" onClick={() => setState({ sheetAward: a.id })}>
                    {a.title.split('·')[0]!.trim()} · {a.year}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            <p className="panel-statement">{scene.statement}</p>
            <p>
              Physical space → virtual environments → interactive research systems. The question stayed constant while the
              instruments changed — and it now continues into computational urban design.
            </p>
          </div>
        )}
      </div>
    </PanelShell>
  );
}

export function FoundationPanel({ scene, step }: { scene: Scene; step: number }) {
  return (
    <PanelShell scene={scene} step={step}>
      <div className="panel-body">
        <R n={0} step={step}>
          <p>
            <b>{ev('ecaade-design').presentationLabel}.</b> {ev('ecaade-finding').claim}
          </p>
          <div className="ev-row">
            <span className="chip chip--published">PUBLISHED · eCAADe 2023</span>
            <span className="chip">4 × 6 × 2 within-subject</span>
          </div>
        </R>
        <R n={1} step={step}>
          <p style={{ marginTop: 10 }}>
            <b>Reading a Remote Teammate’s Body</b> — {ev('iss-study1').presentationLabel}; {ev('iss-study2').presentationLabel}.{' '}
            {ev('iss-tradeoff').claim}
          </p>
          <p>
            <b>BioTerrarium</b> — {ev('bio-pipeline').claim}
          </p>
          <div className="ev-row">
            <span className="chip chip--published">ACCEPTED · ISS Companion ’26</span>
            <span className="chip chip--warn">BIOTERRARIUM · UNDER REVISION</span>
            <span className="chip">n = 24 · PANAS · FSS · MAAS</span>
          </div>
          <p className="limit-note">{ev('bio-study').limitation}</p>
        </R>
        <R n={2} step={step}>
          <p className="panel-statement" style={{ marginTop: 10 }}>
            {scene.statement} The four projects that follow transfer that thinking to computational urban design.
          </p>
        </R>
      </div>
    </PanelShell>
  );
}

export function PMGPanel({ scene, step }: { scene: Scene; step: number }) {
  useEffect(() => {
    if (step === 1) setIx({ pmgActive: 0 });
    if (step === 2) setIx({ pmgActive: 3 });
  }, [step]);
  const mode = step >= 4 ? 'block' : step === 3 ? 'irregular' : 'lot';
  return (
    <PanelShell scene={scene} step={step}>
      <div className="panel-cols panel-body">
        <div>
          <p className="panel-statement">{scene.statement}</p>
          <div className="ctl-row">
            <span className="ctl-label">parcel mode</span>
            <span className="seg" role="group" aria-label="Parcel mode">
              <button aria-pressed={mode === 'lot'} onClick={() => setState({ stepIndex: 2 })}>
                SIMPLE LOT
              </button>
              <button aria-pressed={mode === 'irregular'} onClick={() => setState({ stepIndex: 3 })}>
                IRREGULAR
              </button>
              <button aria-pressed={mode === 'block'} onClick={() => setState({ stepIndex: 4 })}>
                URBAN BLOCK
              </button>
            </span>
          </div>
          <p>
            Click a constraint row on the map to light up its plane. Sourced values carry the exact supporting phrase and a
            confidence level; the envelope is computed by tested half-plane clipping — never by the model.
          </p>
          <Links id="pmg" />
        </div>
        <div>
          {step >= 5 ? (
            <div>
              <p>
                <b>Independent review + history.</b> A second, separate model call re-checks text ↔ values ↔ massing. A
                representative session: parse (8 constraints) → “make it one storey taller” (height changes, everything else
                preserved) → review pass ✓.
              </p>
            </div>
          ) : (
            <p>
              <b>{ev('pmg-eight-constraints').presentationLabel}</b> — setbacks 4.9 / 1.2 / 10.7 m, height 11.5 m · 3 storeys,
              FSR 0.70 → 1.00 under the rental condition, kept explicit rather than flattened into one number.
            </p>
          )}
          <div className="ev-row">
            <span className="chip chip--verified">deterministic geometry</span>
            <span className="chip chip--verified">source + confidence per value</span>
            <span className="chip chip--verified">independent review pass</span>
          </div>
          <p className="limit-note">{parcel('pmg').limitations[0]}</p>
        </div>
      </div>
    </PanelShell>
  );
}

export function ZLAPanel({ scene, step }: { scene: Scene; step: number }) {
  const zlaCase = useAppState((s) => s.ix.zlaCase);
  useEffect(() => {
    if (step === 1) setIx({ zlaCase: 'supported' });
    if (step === 2) setIx({ zlaCase: 'laneway' });
    if (step === 3) setIx({ zlaCase: 'site' });
  }, [step]);
  return (
    <PanelShell scene={scene} step={step}>
      <div className="panel-cols panel-body">
        <div>
          <p className="panel-statement">{scene.statement}</p>
          <div className="ctl-row">
            <span className="ctl-label">case</span>
            <span className="seg" role="group" aria-label="Demonstration case">
              <button aria-pressed={zlaCase === 'supported'} onClick={() => setIx({ zlaCase: 'supported' })}>
                SUPPORTED
              </button>
              <button aria-pressed={zlaCase === 'laneway'} onClick={() => setIx({ zlaCase: 'laneway' })}>
                NOT COVERED
              </button>
              <button aria-pressed={zlaCase === 'site'} onClick={() => setIx({ zlaCase: 'site' })}>
                SITE CHECK
              </button>
            </span>
          </div>
          <Links id="zla" />
        </div>
        <div>
          {zlaCase === 'laneway' ? (
            <p>
              <b>The deliberate failure case.</b> {ev('zla-laneway').claim} Restraint becomes observable rather than claimed.
            </p>
          ) : zlaCase === 'site' ? (
            <p>
              <b>Arithmetic stays in code.</b> {ev('zla-deterministic-example').claim}
            </p>
          ) : (
            <p>
              <b>{ev('zla-pipeline').presentationLabel}.</b> Retrieval selects from {ev('zla-ten-clauses').presentationLabel};
              synthesis sees only the retrieved text and must quote its support; verification checks the answer against its own
              evidence and looks for missed clauses.
            </p>
          )}
          <div className="ev-row">
            <span className="chip chip--verified">3 separate model calls</span>
            <span className="chip chip--verified">deterministic site arithmetic</span>
            <span className="chip chip--warn">“not covered” stops the pipeline</span>
          </div>
          <p className="limit-note">{parcel('zla').limitations[0]}</p>
        </div>
      </div>
    </PanelShell>
  );
}

export function VCMPanel({ scene, step }: { scene: Scene; step: number }) {
  const method = useAppState((s) => s.ix.vcmMethod);
  const rot = useAppState((s) => s.ix.vcmRot);
  useEffect(() => {
    if (step === 1) setIx({ vcmMethod: 1 });
  }, [step]);
  return (
    <PanelShell scene={scene} step={step}>
      <div className="panel-cols panel-body">
        <div>
          <p className="panel-statement">{scene.statement}</p>
          <div className="ctl-row">
            <span className="ctl-label">method</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={method}
              aria-label="Compliance method: 0 is flat cap, 1 is floor-by-floor trimming"
              onChange={(e) => setIx({ vcmMethod: Number(e.target.value) })}
            />
            <span className="chip">{method > 0.5 ? 'floor-by-floor' : 'flat cap'}</span>
          </div>
          <div className="ctl-row">
            <span className="ctl-label">rotation</span>
            <input
              type="range"
              min={0}
              max={6}
              step={1}
              value={rot}
              aria-label="Footprint rotation, seven tested orientations from 0 to 90 degrees"
              onChange={(e) => setIx({ vcmRot: Number(e.target.value) })}
            />
            <span className="chip">{rot * 15}° · 7 orientations</span>
          </div>
          <Links id="vcm" />
        </div>
        <div>
          <table className="keys-table" aria-label="Flat cap versus floor-by-floor comparison">
            <tbody>
              <tr>
                <td>flat cap</td>
                <td>10 floors</td>
                <td>18,360 m²</td>
              </tr>
              <tr>
                <td>floor-by-floor</td>
                <td>18 floors</td>
                <td>
                  25,608 m² <b style={{ color: 'var(--yellow)' }}>(+39.5%)</b>
                </td>
              </tr>
              <tr>
                <td>7 rotations</td>
                <td>GFA Δ 0.02%</td>
                <td>floors 18 → 17</td>
              </tr>
            </tbody>
          </table>
          <p style={{ marginTop: 8 }}>
            Under a linear ceiling, average permissible volume follows footprint area and centroid — so orientation becomes a
            free design variable, selectable for silhouette or program rather than yield.
          </p>
          <p className="limit-note">{parcel('vcm').limitations[0]}</p>
        </div>
      </div>
    </PanelShell>
  );
}

export function EMAPanel({ scene, step }: { scene: Scene; step: number }) {
  return (
    <PanelShell scene={scene} step={step}>
      <div className="panel-cols panel-body">
        <div>
          <p className="panel-statement">{scene.statement}</p>
          <p>
            <b>Six functional roles</b> — one Generator, four domain Critics (solar access · embodied carbon · pedestrian wind ·
            corridor/zoning yield), one Orchestrator — over a real MCP server. Four falsifiable hypotheses were written before
            the runs.
          </p>
          <div className="ev-row">
            <span className="chip chip--verified">1,080-design reference grid</span>
            <span className="chip chip--verified">5 + 5 seeds · 200 evaluations</span>
            <span className="chip chip--red">H1 speed: not confirmed</span>
            <span className="chip chip--verified">reliability 4/5 vs 1/5</span>
          </div>
          <Links id="ema" />
        </div>
        <div>
          {step >= 4 ? (
            <ul style={{ margin: 0, paddingLeft: 16 }}>
              <li>
                <b style={{ color: 'var(--red)' }}>H1 not confirmed</b> — random’s one success was fast (70 evaluations); the
                honest finding is reliability, not speed.
              </li>
              <li>
                <b>H2 ✓</b> mass timber weakly dominated concrete and steel — 200/200 matched geometries.
              </li>
              <li>
                <b>H3 ✓</b> closed-form floor count within ±1 floor over 19 orientations (MAE 0.16).
              </li>
              <li>
                <b>H4</b> exploratory — wind ↔ yield collapse to r = −1.000 across the 10-member Pareto set.
              </li>
            </ul>
          ) : (
            <p>
              Every number the agents argue about is computed deterministically. The agents propose, interpret, critique, and
              redirect — they cannot invent a score, and the scripted orchestration is what was executed and verified.
            </p>
          )}
          <p className="limit-note">{parcel('ema').limitations[0]}</p>
        </div>
      </div>
    </PanelShell>
  );
}

export function SynthesisPanel({ scene, step }: { scene: Scene; step: number }) {
  return (
    <PanelShell scene={scene} step={step}>
      <div className="panel-body">
        <p className="panel-statement" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
          regulation → evidence → geometry → performance → critique → human judgment
        </p>
        <R n={1} step={step}>
          <p>
            Zoning Literacy Assistant holds <b>regulation + evidence</b> · Parametric Massing Generator carries{' '}
            <b>evidence → editable geometry</b> · View Corridor Massing connects <b>geometry → verified performance</b> ·
            Environmental Massing Agents add <b>critique + multi-objective exploration</b>.
          </p>
        </R>
        <R n={2} step={step}>
          <p className="limit-note" style={{ borderColor: 'rgba(242,207,85,.5)', color: 'var(--ink-dim)' }}>
            The common contribution is not simply using AI to generate forms. It is designing an accountable path through which
            regulatory sources, geometric transformations, performance calculations, uncertainty, and human decisions remain
            connected.
          </p>
        </R>
      </div>
    </PanelShell>
  );
}

export function PhDPanel({ scene, step }: { scene: Scene; step: number }) {
  const link = useAppState((s) => s.ix.phdLink);
  const inspected = link >= 0 ? PROVENANCE_LINKS[link] : undefined;
  return (
    <PanelShell scene={scene} step={step}>
      <div className="panel-cols panel-body">
        <div>
          <p className="panel-statement">{scene.statement}</p>
          {inspected ? (
            <div>
              <p className="cit-meta" style={{ marginBottom: 4 }}>
                PROVENANCE LINK {String(link + 1).padStart(2, '0')} · {inspected.label.toUpperCase()} — {inspected.short}
              </p>
              <p>{inspected.detail}</p>
              <button className="btn" onClick={() => setIx({ phdLink: -1 })}>
                CLOSE INSPECTOR
              </button>
            </div>
          ) : (
            <p>
              <b>Central question:</b> how can co-design systems preserve traceable provenance between design intent, regulatory
              evidence, parametric geometry, environmental performance, AI critique, and human judgment — across iterations?
              Click any link of the spine on the map to inspect what the record would hold (a conceptual demonstration built
              from the real corridor study).
            </p>
          )}
          <p className="limit-note">{parcel('phd').limitations[0]}</p>
        </div>
        <div>
          {step === 1 && (
            <ul style={{ margin: 0, paddingLeft: 16 }}>
              {PHD_SUBQUESTIONS.map((q) => (
                <li key={q} style={{ marginBottom: 4 }}>
                  {q}
                </li>
              ))}
            </ul>
          )}
          {step === 2 && (
            <div>
              <p className="cit-meta">A POSSIBLE SYSTEM — GROWN FROM THE FOUR PROTOTYPES</p>
              <div className="ev-row">
                {PHD_SYSTEM.map((c) => (
                  <span key={c} className="chip chip--proposed">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
          {step >= 3 && (
            <div>
              <p className="cit-meta">A POSSIBLE MIXED PROGRAM — PROVISIONAL</p>
              <ul style={{ margin: 0, paddingLeft: 16 }}>
                {PHD_METHODS.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
          )}
          {step === 0 && (
            <p>
              Performance provenance = the visible history connecting the source regulation or intention, the structured
              constraint, the generated geometry, the computed performance, uncertainty and assumptions, AI interpretation or
              critique, and the human revision and final judgment.
            </p>
          )}
        </div>
      </div>
    </PanelShell>
  );
}

export function GenEnvPanel({ scene, step }: { scene: Scene; step: number }) {
  return (
    <PanelShell scene={scene} step={step}>
      <div className="panel-body">
        <R n={0} step={step}>
          <p>
            <b>“Human-AI Co-Design Framework for Performance-Aware Constructed Environments”</b> — NSERC Discovery, 2026,
            5-year term, Liu, Xun, UBC SALA (verified on NSERC’s funding-decisions page). GenEnv frames its work as keeping
            outcomes “editable, traceable, and open to human judgment” — the commitment my prototypes already practise.
          </p>
        </R>
        <R n={1} step={step}>
          <p className="cit-meta">WHAT I BRING</p>
          <p>
            Architecture + landscape architecture · parametric and spatial design · Rhino, Grasshopper, GIS, Unity, Three.js,
            JavaScript, C#, Python · independently built research systems · HCI experiments and user studies · academic writing
            (eCAADe, ACM) · an interest in accountable AI-assisted design.
          </p>
        </R>
        <R n={2} step={step}>
          <p className="cit-meta">WHAT I HOPE TO LEARN</p>
          <p>
            Advanced computational-design research · human–AI co-design theory and methods · performance-informed workflows ·
            agentic spatial systems · rigorous design-research framing · how to grow these prototypes into a coherent doctoral
            contribution.
          </p>
          <p>
            I would be excited to learn from Professor Liu and the GenEnv team while contributing the combination of
            spatial-design experience, interactive-system development, and human-centred evaluation that I have built across my
            previous research.
          </p>
        </R>
        <div className="panel-links">
          <a href="https://genenv.ai/human-ai-co-design" target="_blank" rel="noopener noreferrer">
            genenv.ai/human-ai-co-design ↗
          </a>
          <a href="https://sala.ubc.ca/program/ph-d-in-design-technology-and-society/" target="_blank" rel="noopener noreferrer">
            DTS PhD ↗
          </a>
        </div>
      </div>
    </PanelShell>
  );
}

export function ConversationPanel({ scene, step }: { scene: Scene; step: number }) {
  return (
    <PanelShell scene={scene} step={step}>
      <div className="panel-body">
        <p className="panel-statement">{scene.statement}</p>
        <R n={0} step={step}>
          <ol style={{ paddingLeft: 18, margin: '0 0 10px' }}>
            <li>Which part of this direction could contribute most meaningfully to GenEnv’s current research?</li>
            <li>
              Would it be stronger to develop the provenance infrastructure through an existing GenEnv case study, or to begin
              with a focused new spatial-design problem?
            </li>
            <li>Which technical and theoretical areas should I strengthen before beginning doctoral research?</li>
          </ol>
        </R>
        <R n={1} step={step}>
          <p>Thank you. I would really value your thoughts on where this direction could become most useful and rigorous within GenEnv.</p>
        </R>
        <div className="panel-links">
          <a href="https://romanjahandideh.com" target="_blank" rel="noopener noreferrer">
            romanjahandideh.com ↗
          </a>
          <a href="https://github.com/RomanJahandideh" target="_blank" rel="noopener noreferrer">
            github.com/RomanJahandideh ↗
          </a>
        </div>
      </div>
    </PanelShell>
  );
}

export function AppendixPanel({ scene, step }: { scene: Scene; step: number }) {
  return (
    <PanelShell scene={scene} step={step}>
      <div className="panel-body">
        <p className="panel-statement">{scene.statement}</p>
        <div className="panel-cols">
          {scene.citationIds.map((id) => {
            const c = cite(id);
            return (
              <p key={id} style={{ margin: '4px 0' }}>
                <a href={c.url} target="_blank" rel="noopener noreferrer">
                  {c.title.length > 64 ? `${c.title.slice(0, 61)}…` : c.title} ↗
                </a>
                <br />
                <span className="cit-meta">
                  {c.venue} · {c.year}
                </span>
              </p>
            );
          })}
        </div>
        <p className="cit-verify" style={{ marginTop: 10 }}>
          Full verification trail: docs/PROJECT_EVIDENCE_AUDIT.md and docs/CLAIM_STATUS_MATRIX.md in the repository. Open the
          source drawer (<kbd>S</kbd>) on any scene for its citations.
        </p>
      </div>
    </PanelShell>
  );
}
