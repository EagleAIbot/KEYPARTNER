import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { specialisms } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export function Specialism() {
  const { slug } = useParams()
  const spec = specialisms.find(s => s.slug === slug)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('[data-reveal]', { opacity: 1, y: 0 }); return
    }
    const els = gsap.utils.toArray('[data-reveal]')
    els.forEach(el => {
      gsap.from(el, { opacity: 0, y: 32, duration: 0.8, ease: 'power3.out', immediateRender: false, scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' } })
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [slug])

  if (!spec) return <Navigate to="/specialisms" replace />

  return (
    <>
      <section className="spec-hero">
        <div className="container">
          <p className="eyebrow">Specialism</p>
          <h1>{spec.title}</h1>
          <p>{spec.short}</p>
          <div className="page-hero-actions">
            <Link to="/hire#submit" className="btn btn-primary">Hire {spec.title} Talent <ArrowRight size={16} /></Link>
            <Link to="/candidates#submit" className="btn btn-secondary">Submit Your CV</Link>
          </div>
        </div>
      </section>

      <section className="spec-detail-section">
        <div className="container spec-detail-grid">
          <div data-reveal>
            <div className="section-divider" />
            <h2 className="section-title" style={{ marginBottom: 20 }}>About this Specialism</h2>
            {spec.description.split('\n\n').map((p, i) => (
              <p key={i} style={{ color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 16, fontSize: '0.97rem' }}>{p}</p>
            ))}
            <h3 style={{ fontWeight: 700, marginTop: 40, marginBottom: 16 }}>Technologies &amp; disciplines</h3>
            <div className="tech-tags">
              {spec.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
            </div>
          </div>
          <div data-reveal>
            <div style={{ background: 'var(--green-50)', borderRadius: 20, padding: 36, border: '1px solid var(--border)', marginBottom: 32 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 20 }}>Signs you need to hire</h3>
              <div className="signs-list">
                {spec.signs.map((s, i) => (
                  <div key={i} className="sign-item">
                    <CheckCircle2 size={15} style={{ color: 'var(--brand-green)', marginTop: 2, minWidth: 15 }} />
                    <p>{s}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: 'var(--brand-green)', borderRadius: 20, padding: 36, color: 'var(--brand-white)' }}>
              <h3 style={{ fontWeight: 700, marginBottom: 12 }}>Ready to hire?</h3>
              <p style={{ opacity: 0.8, fontSize: '0.93rem', lineHeight: 1.65, marginBottom: 24 }}>Tell us about the role. We'll come back with market intelligence and a tailored approach.</p>
              <Link to="/hire#submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Submit a Vacancy <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export function SpecialismsList() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('[data-reveal]', { opacity: 1, y: 0 }); return
    }
    const els = gsap.utils.toArray('[data-reveal]')
    els.forEach(el => {
      gsap.from(el, { opacity: 0, y: 32, duration: 0.8, ease: 'power3.out', immediateRender: false, scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' } })
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Expertise</p>
          <h1>Three Pillars.<br />Deep Expertise.</h1>
          <p>Software Development, Enterprise IT, and BI & Data. We cover the full technology talent spectrum, from Graduates to C-suite, across every major technology stack.</p>
        </div>
      </section>
      <section style={{ padding: 'var(--section-pad) 0', background: 'var(--brand-white)' }}>
        <div className="container specialisms-grid">
          {specialisms.map(s => (
            <div key={s.slug} className="spec-card" data-reveal>
              <div className="spec-icon" style={{ fontSize: '1.5rem' }}>{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.short}</p>
              <div className="spec-tech">
                {s.tech.slice(0, 5).map(t => <span key={t} className="spec-tag">{t}</span>)}
              </div>
              <Link to={`/specialisms/${s.slug}`} className="spec-link">
                Learn more <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
