import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

// Names as they appear in world-atlas properties
const HIGHLIGHTED = new Set([
  'United Kingdom',
  'Australia',
  'New Zealand',
  'Singapore',
  'Hong Kong',
])

const MARKERS = [
  { name: 'UK',          coordinates: [-1.5,   52.5],  label: 'United Kingdom',  anchor: 'end',   dy: -12 },
  { name: 'Sydney',      coordinates: [151.2, -33.9],  label: 'Sydney',          anchor: 'middle', dy: -12 },
  { name: 'Auckland',    coordinates: [174.8, -36.9],  label: 'Auckland',        anchor: 'start',  dy: -12 },
  { name: 'Singapore',   coordinates: [103.8,   1.3],  label: 'Singapore',       anchor: 'middle', dy: -12 },
]

// Approximate SVG arc from UK → Singapore → Australia
// viewBox "0 0 800 420", Natural Earth centered at [60,10] scale 155
// These are rough bezier waypoints that look right for this projection
const ARC_D = 'M 258,148 C 340,90 430,140 490,185 C 560,230 580,240 598,245'

export function CoverageMap() {
  return (
    <section className="coverage-section">
      <div className="container coverage-header">
        <div className="section-divider white" data-reveal />
        <p className="eyebrow coverage-eyebrow" data-reveal>Our Reach</p>
        <h2 className="section-title coverage-title" data-reveal>Where We Place Talent</h2>
        <p className="coverage-sub" data-reveal>
          Based in South Northamptonshire — we place across the UK and into Asia-Pacific,
          including Australia and New Zealand.
        </p>
      </div>

      <div className="coverage-map-wrap" data-reveal>
        <ComposableMap
          projection="geoNaturalEarth1"
          projectionConfig={{ scale: 155, center: [60, 10] }}
          viewBox="0 0 800 420"
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
                    fill={hi ? 'rgba(52,168,101,0.82)' : 'rgba(93,198,138,0.07)'}
                    stroke={hi ? 'rgba(93,198,138,0.5)' : 'rgba(93,198,138,0.18)'}
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover:   { outline: 'none', fill: hi ? '#5dc68a' : 'rgba(93,198,138,0.13)' },
                      pressed: { outline: 'none' },
                    }}
                  />
                )
              })
            }
          </Geographies>

          {/* Animated flight-path arc */}
          <path
            d={ARC_D}
            fill="none"
            stroke="rgba(93,198,138,0.55)"
            strokeWidth={1.5}
            strokeDasharray="6 4"
            strokeLinecap="round"
            className="coverage-arc"
          />

          {/* Pulsing marker dots */}
          {MARKERS.map(({ name, coordinates, label, anchor, dy }) => (
            <Marker key={name} coordinates={coordinates}>
              {/* outer pulse ring */}
              <circle r={9} fill="rgba(52,168,101,0.18)" className="coverage-pulse-ring" />
              {/* inner dot */}
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
          'South Northamptonshire',
          'London',
          'Home Counties',
          'UK-Wide',
          'Singapore',
          'Australia',
          'New Zealand',
        ].map(loc => (
          <span key={loc} className="coverage-tag">{loc}</span>
        ))}
      </div>
    </section>
  )
}
