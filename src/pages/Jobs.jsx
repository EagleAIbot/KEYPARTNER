import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, MapPin, Clock, Briefcase } from 'lucide-react'
import { jobs, specialisms } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export function Jobs() {
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
          <p className="eyebrow">Browse Opportunities</p>
          <h1>Current Vacancies</h1>
          <p>We work exclusively in technology recruitment — Software Development, Enterprise IT, and BI & Data. If you don't see your ideal role here, submit your CV and we'll find it for you.</p>
          <div className="page-hero-actions">
            <Link to="/candidates" className="btn btn-primary">Submit Your CV <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section style={{ padding: 'var(--section-pad) 0', background: 'var(--brand-white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20, maxWidth: 800, margin: '0 auto' }}>
            {jobs.map(j => (
              <div key={j.id} className="card" data-reveal style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className="job-badge"><Briefcase size={11} />{j.discipline}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{j.posted}</span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{j.title}</h3>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.85rem', color: 'var(--text-muted)' }}><MapPin size={12} />{j.location}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.85rem', color: 'var(--text-muted)' }}><Clock size={12} />{j.type}</span>
                  </div>
                  <p style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--brand-green)' }}>{j.salary}</p>
                </div>
                <a href={`mailto:info@ourkeypartnership.co.uk?subject=Application: ${j.title}`} className="btn btn-green" style={{ whiteSpace: 'nowrap' }}>
                  Apply <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>

          <div style={{ maxWidth: 800, margin: '48px auto 0' }} data-reveal>
            <div className="jobs-coming">
              <h3>More roles added weekly</h3>
              <p>These are just our featured listings. We work on exclusive mandates not always advertised publicly — submit your CV and we'll match you to something great.</p>
              <Link to="/candidates" className="btn btn-green">Submit Your CV <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
