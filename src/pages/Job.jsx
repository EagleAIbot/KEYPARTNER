import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapPin, Briefcase, Calendar, ArrowLeft, Mail, Check } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { jobs as hardcodedJobs } from '../data/content'

function parseInline(text) {
  const parts = []
  const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)/g
  let last = 0, m
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    if (m[1]) parts.push(<strong key={m.index}>{m[2]}</strong>)
    else if (m[3]) parts.push(<em key={m.index}>{m[4]}</em>)
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

function renderDesc(text) {
  if (!text) return null
  const lines = text.split('\n')
  const result = []
  let bullets = []
  const flush = (key) => {
    if (bullets.length) { result.push(<ul key={key}>{bullets}</ul>); bullets = [] }
  }
  lines.forEach((raw, i) => {
    const t = raw.trim()
    if (!t) { flush(`br${i}`); result.push(<br key={i} />); return }
    const isBullet = t.startsWith('•') || t.startsWith('-')
    const content = isBullet ? t.replace(/^[•\-]\s*/, '') : t
    const inline = parseInline(content)
    if (isBullet) bullets.push(<li key={i}>{inline}</li>)
    else { flush(`ul${i}`); result.push(<p key={i}>{inline}</p>) }
  })
  flush('last')
  return result
}

export function Job() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (supabase) {
      supabase.from('jobs').select('*').eq('id', id).eq('is_active', true).single()
        .then(({ data }) => { setJob(data || null); setLoading(false) })
    } else {
      setJob(hardcodedJobs.find(j => String(j.id) === id) || null)
      setLoading(false)
    }
  }, [id])

  if (loading) return (
    <div className="job-page-loading">Loading...</div>
  )

  if (!job) return (
    <div className="job-page-loading">
      <p style={{ marginBottom: 16, color: 'var(--text-muted)' }}>This role is no longer available.</p>
      <Link to="/jobs" className="btn btn-green">View all roles</Link>
    </div>
  )

  const applyHref = `mailto:info@ourkeypartnership.co.uk?subject=Application: ${encodeURIComponent(job.title)}&body=Hi Matt,%0D%0A%0D%0AI'd like to apply for the ${encodeURIComponent(job.title)} role.%0D%0A%0D%0APlease find my CV attached.%0D%0A%0D%0AKind regards`
  const mapQuery = encodeURIComponent(job.location || 'Milton Keynes, UK')
  const postedDate = job.posted ?? new Date(job.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <>
      {/* ── HERO ── */}
      <section className="job-page-hero">
        <div className="container">
          <Link to="/jobs" className="job-page-back">
            <ArrowLeft size={14} /> Back to all roles
          </Link>
          <div className="job-page-badges">
            <span className="job-badge"><Briefcase size={11} />{job.discipline}</span>
            <span className="job-listing-type">{job.type}</span>
          </div>
          <h1 className="job-page-title">{job.title}</h1>
          <div className="job-page-meta">
            {job.location && <span><MapPin size={14} />{job.location}</span>}
            {job.salary && <span>💰 {job.salary}</span>}
            <span><Calendar size={14} />{postedDate}</span>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <section className="job-page-body">
        <div className="container job-page-grid">

          {/* ── LEFT: description + benefits ── */}
          <div className="job-page-main">
            {job.description && (
              <div className="job-page-section">
                <h2 className="job-page-section-title">About the Role</h2>
                <div className="job-desc-rendered">
                  {renderDesc(job.description)}
                </div>
              </div>
            )}

            {job.benefits?.filter(Boolean).length > 0 && (
              <div className="job-page-section">
                <h2 className="job-page-section-title">Benefits</h2>
                <ul className="job-page-benefits-list">
                  {job.benefits.filter(Boolean).map((b, i) => (
                    <li key={i}><Check size={14} />{b}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="job-page-section job-page-section--cta">
              <p>Sound like the right fit?</p>
              <a href={applyHref} className="btn btn-green">
                <Mail size={14} /> Apply for this Role
              </a>
            </div>
          </div>

          {/* ── RIGHT: apply card + map ── */}
          <aside className="job-page-sidebar">
            <div className="job-apply-card">
              <h3>Interested in this role?</h3>
              <p>Send your CV and we'll be in touch within 24 hours.</p>
              <a href={applyHref} className="btn btn-green job-apply-card__btn">
                <Mail size={14} /> Apply Now
              </a>
              <div className="job-apply-card__details">
                {job.location && <div><span>Location</span><strong>{job.location}</strong></div>}
                {job.salary && <div><span>Salary</span><strong>{job.salary}</strong></div>}
                {job.type && <div><span>Work Type</span><strong>{job.type}</strong></div>}
                {job.discipline && <div><span>Discipline</span><strong>{job.discipline}</strong></div>}
                <div><span>Posted</span><strong>{postedDate}</strong></div>
              </div>
            </div>

            {job.location && (
              <div className="job-page-map">
                <iframe
                  title={`Map for ${job.location}`}
                  src={`https://maps.google.com/maps?q=${mapQuery}&output=embed&z=12`}
                  width="100%" height="200"
                  style={{ border: 0, display: 'block' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  )
}
