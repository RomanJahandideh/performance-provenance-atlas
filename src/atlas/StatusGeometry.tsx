import { isoBoxFaces, isoRect, iso } from './iso';
import type { EvidenceStatus } from '../data/types';

/**
 * Status is drawn, not badged (docs/MAPPING_LANGUAGE.md):
 *  published/accepted → solid mass on an evidence plinth, DOI tick
 *  under-revision     → semi-transparent mass, diagonal hatch, open boundary
 *  verified-computation / implemented → white wireframe mass, control points
 *  proposed           → dotted yellow footprint, survey stakes, forming volume
 *  external-funded    → distinct double boundary on a yellow foundation
 */
export function StatusGeometry({
  status,
  w = 120,
  d = 95,
  h = 70,
  label,
}: {
  status: EvidenceStatus;
  w?: number;
  d?: number;
  h?: number;
  label?: string;
}) {
  const f = isoBoxFaces(w, d, h);
  const plinth = isoRect(w + 26, d + 26, -8);
  const plinthLow = isoRect(w + 26, d + 26, -16);

  switch (status) {
    case 'published':
    case 'accepted':
      return (
        <g>
          <polygon points={plinthLow} fill="rgba(112,215,206,0.10)" stroke="rgba(112,215,206,0.55)" strokeWidth={1.4} transform="translate(0,16)" />
          <polygon points={plinth} fill="rgba(112,215,206,0.06)" stroke="rgba(112,215,206,0.35)" strokeWidth={1} transform="translate(0,8)" />
          <polygon points={f.left} fill="rgba(237,242,247,0.16)" stroke="var(--geom)" strokeWidth={1.4} />
          <polygon points={f.right} fill="rgba(237,242,247,0.30)" stroke="var(--geom)" strokeWidth={1.4} />
          <polygon points={f.top} fill="rgba(237,242,247,0.55)" stroke="var(--geom)" strokeWidth={1.4} />
          <g transform={`translate(${f.corners.B.x + 14},${f.corners.B.y - 10})`}>
            <circle r={13} fill="var(--bg)" stroke="var(--cyan)" strokeWidth={1.4} />
            <text textAnchor="middle" dy={3.5} fontSize={9} className="map-label" fill="var(--cyan)">
              DOI
            </text>
          </g>
          {label ? <StatusLabel text={label} color="var(--cyan)" /> : null}
        </g>
      );
    case 'under-revision':
      return (
        <g>
          <polygon points={f.left} fill="url(#hatchOrange)" fillOpacity={0.5} stroke="var(--geom)" strokeOpacity={0.55} strokeWidth={1.2} />
          <polygon points={f.right} fill="url(#hatchOrange)" fillOpacity={0.7} stroke="var(--geom)" strokeOpacity={0.55} strokeWidth={1.2} />
          <polygon points={f.top} fill="rgba(237,242,247,0.14)" stroke="var(--geom)" strokeOpacity={0.7} strokeWidth={1.2} strokeDasharray="10 7" />
          <polygon points={f.base} fill="none" stroke="var(--orange)" strokeWidth={1.2} strokeDasharray="14 10" />
          <StatusLabel text={label ?? 'UNDER REVISION'} color="var(--orange)" />
        </g>
      );
    case 'verified-computation':
    case 'implemented': {
      const c = f.corners;
      return (
        <g>
          <polygon points={f.base} fill="rgba(237,242,247,0.05)" stroke="var(--geom)" strokeWidth={1.3} />
          {/* wireframe edges */}
          {[
            [c.a, c.A],
            [c.b, c.B],
            [c.c, c.C],
            [c.d, c.D],
          ].map(([p, q], i) => (
            <line key={i} x1={p!.x} y1={p!.y} x2={q!.x} y2={q!.y} stroke="var(--geom)" strokeWidth={1.1} strokeOpacity={0.85} />
          ))}
          <polygon points={f.top} fill="rgba(112,215,206,0.10)" stroke="var(--geom)" strokeWidth={1.3} />
          {/* control points */}
          {[c.A, c.B, c.C, c.D].map((p, i) => (
            <rect key={i} x={p.x - 3.4} y={p.y - 3.4} width={6.8} height={6.8} fill="var(--bg)" stroke="var(--cyan)" strokeWidth={1.2} />
          ))}
          {label ? <StatusLabel text={label} color="var(--geom)" /> : null}
        </g>
      );
    }
    case 'proposed': {
      const stakes = [iso(0, 0), iso(w, 0), iso(w, d), iso(0, d)];
      return (
        <g>
          <polygon points={f.base} fill="rgba(242,207,85,0.05)" stroke="var(--yellow)" strokeWidth={1.6} strokeDasharray="3 9" strokeLinecap="round" />
          <polygon points={f.top} fill="none" stroke="var(--yellow)" strokeOpacity={0.5} strokeWidth={1} strokeDasharray="3 9" />
          {stakes.map((p, i) => (
            <g key={i}>
              <line x1={p.x} y1={p.y + 4} x2={p.x} y2={p.y - 14} stroke="var(--yellow)" strokeWidth={1.4} />
              <circle cx={p.x} cy={p.y - 16} r={2.6} fill="var(--yellow)" />
            </g>
          ))}
          <StatusLabel text={label ?? 'PROPOSED'} color="var(--yellow)" />
        </g>
      );
    }
    case 'external-funded':
      return (
        <g>
          <polygon points={isoRect(w + 34, d + 34, -10)} fill="rgba(242,207,85,0.14)" stroke="var(--yellow)" strokeWidth={1.6} transform="translate(0,10)" />
          <polygon points={f.left} fill="rgba(152,167,184,0.12)" stroke="var(--muted)" strokeWidth={1.2} />
          <polygon points={f.right} fill="rgba(152,167,184,0.2)" stroke="var(--muted)" strokeWidth={1.2} />
          <polygon points={f.top} fill="rgba(152,167,184,0.3)" stroke="var(--muted)" strokeWidth={1.2} />
          {label ? <StatusLabel text={label} color="var(--muted)" /> : null}
        </g>
      );
    default:
      return (
        <g>
          <polygon points={f.base} fill="none" stroke="var(--muted)" strokeWidth={1.1} strokeDasharray="8 7" />
          {label ? <StatusLabel text={label} color="var(--muted)" /> : null}
        </g>
      );
  }
}

function StatusLabel({ text, color }: { text: string; color: string }) {
  return (
    <text x={0} y={46} textAnchor="middle" fontSize={12} className="map-label" fill={color} letterSpacing="0.18em">
      {text}
    </text>
  );
}
