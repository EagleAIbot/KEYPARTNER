import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
const MAP_VIDEO = 'https://assets.mixkit.co/videos/49878/49878-720.mp4'

const HIGHLIGHTED = new Set([
  'United Kingdom',
  'Australia',
  'New Zealand',
  'Singapore',
  'United Arab Emirates',
])

const MARKERS = [
  { name: 'UK',        coordinates: [-1.5,   52.5],  label: 'United Kingdom', anchor: 'middle', dy: -13 },
  { name: 'UAE',       coordinates: [55.3,   25.2],  label: 'UAE',            anchor: 'middle', dy: -13 },
  { name: 'Singapore', coordinates: [103.8,   1.3],  label: 'Singapore',      anchor: 'middle', dy: -13 },
  { name: 'Sydney',    coordinates: [151.2, -33.9],  label: 'Sydney',         anchor: 'middle', dy: -13 },
  { name: 'Auckland',  coordinates: [174.8, -36.9],  label: 'Auckland',       anchor: 'start',  dy: -13 },
]

const FLIGHT_PATHS = [
  { from: [-1.5,  52.5], to: [55.3,  25.2] },
  { from: [55.3,  25.2], to: [103.8,  1.3] },
  { from: [103.8,  1.3], to: [151.2, -33.9] },
  { from: [151.2, -33.9],to: [174.8, -36.9] },
]

// Plane path using actual projected SVG positions (measured from screenshot, viewBox "-95 0 960 460"):
// UK(196,112) → UAE(322,187) → SG(437,267) → SYD(524,353) → AKL(578,380)
const PLANE_PATH = 'M 196,112 C 245,148 290,178 322,187 C 375,215 415,254 437,267 C 480,307 508,342 524,353 L 578,380'

export function CoverageMap() {
  return (
    <section className="coverage-section">
      <div className="coverage-video-bg" aria-hidden>
        <video autoPlay muted loop playsInline preload="none" className="coverage-video-bg__vid">
          <source src={MAP_VIDEO} type="video/mp4" />
        </video>
        <div className="coverage-video-bg__overlay" />
      </div>

      <div className="container coverage-header">
        <div className="section-divider white" data-reveal />
        <p className="eyebrow coverage-eyebrow" data-reveal>Our Reach</p>
        <h2 className="section-title coverage-title" data-reveal>Where We Place Talent</h2>
        <p className="coverage-sub" data-reveal>
          Based in South Northamptonshire — placing across the UK, UAE, Singapore,
          Australia and New Zealand.
        </p>
      </div>

      {/* Full-bleed map — outside container on purpose */}
      <div className="coverage-map-wrap" data-reveal>
        <ComposableMap
          projection="geoNaturalEarth1"
          projectionConfig={{ scale: 148, center: [87, 5] }}
          viewBox="-95 0 960 460"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map(geo => {
                const hi = HIGHLIGHTED.has(geo.properties?.name)
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={hi ? 'rgba(52,168,101,0.85)' : 'rgba(0,40,20,0.45)'}
                    stroke={hi ? 'rgba(93,198,138,0.5)' : 'rgba(93,198,138,0.15)'}
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover:   { outline: 'none', fill: hi ? '#5dc68a' : 'rgba(0,50,25,0.55)' },
                      pressed: { outline: 'none' },
                    }}
                  />
                )
              })
            }
          </Geographies>

          {/* Dashed flight-path lines */}
          {FLIGHT_PATHS.map(({ from, to }, i) => (
            <Line
              key={i}
              from={from}
              to={to}
              stroke="rgba(93,198,138,0.55)"
              strokeWidth={1.4}
              strokeDasharray="5 4"
              strokeLinecap="round"
              className="coverage-arc"
              style={{ animationDelay: `${i * 0.4}s` }}
            />
          ))}

          {/* Hidden motion path — plane follows this */}
          <defs>
            <path id="planePath" d={PLANE_PATH} />
          </defs>

          {/* ✈ Plane flying the route */}
          <text fontSize={15} textAnchor="middle" style={{ userSelect: 'none' }}>
            ✈
            <animateMotion
              dur="9s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href="#planePath" />
            </animateMotion>
          </text>

          {/* Pulsing marker dots */}
          {MARKERS.map(({ name, coordinates, label, anchor, dy }) => (
            <Marker key={name} coordinates={coordinates}>
              <circle r={9} fill="rgba(52,168,101,0.18)" className="coverage-pulse-ring" />
              <circle r={4} fill="#34a865" stroke="#fff" strokeWidth={1.5} />
              <text
                textAnchor={anchor}
                y={dy}
                style={{
                  fontFamily: 'inherit',
                  fontSize: 9,
                  fill: 'rgba(255,255,255,0.75)',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  pointerEvents: 'none',
                }}
              >
                {label}
              </text>
            </Marker>
          ))}
        </ComposableMap>
      </div>

      <div className="container coverage-tags-row" data-reveal>
        {[
          'South Northamptonshire', 'London', 'Home Counties',
          'UK-Wide', 'UAE', 'Singapore', 'Australia', 'New Zealand',
        ].map(loc => (
          <span key={loc} className="coverage-tag">{loc}</span>
        ))}
      </div>
    </section>
  )
}
