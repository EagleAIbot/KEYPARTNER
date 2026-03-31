import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function About() {
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
          <p className="eyebrow">About Us</p>
          <h1>A Business Built<br />On Relationships</h1>
          <p>Key Partnership are award-winning, people-centric recruiters with deep expertise in Software Development, Enterprise IT, and BI & Data. Headquartered in South Northamptonshire, trusted across the UK.</p>
          <div className="page-hero-actions">
            <Link to="/hire#submit" className="btn btn-primary">Work With Us <ArrowRight size={16} /></Link>
            <Link to="/contact" className="btn btn-secondary">Get in Touch</Link>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: 'var(--section-pad) 0', background: 'var(--brand-white)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div data-reveal>
            <div className="section-divider" />
            <p className="eyebrow">Our Mission</p>
            <h2 className="section-title">To help great companies find Simply Great People</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 20 }}>
              At Key Partnership, we do things differently. While our competitors scatter their attention across vast client lists, we deliberately keep our portfolio small. That means we genuinely understand your business — not just the job spec.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.75 }}>
              We cover Software Development, Enterprise IT, and BI & Data, working with everyone from household brands and Fortune 500 companies to innovative start-ups building the technologies of tomorrow.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }} data-reveal>
            {[
              { num: '100+', label: 'Placements made' },
              { num: '100%', label: 'Client retention rate' },
              { num: '5★', label: 'Candidate reviews' },
              { num: '7 days', label: 'Average time to fill' },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', gap: 20, alignItems: 'center', padding: '20px 24px', background: 'var(--surface-muted)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--brand-green)', minWidth: 100 }}>{s.num}</span>
                <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="container">
          <div className="section-divider" data-reveal />
          <p className="eyebrow" data-reveal>What drives us</p>
          <h2 className="section-title" data-reveal>Our Values</h2>
          <div className="values-grid">
            {[
              { num: '01', title: 'Positivity', body: 'Being engaged, open-minded, and facing challenges in a process-driven and focused manner. We bring energy to every interaction.' },
              { num: '02', title: 'Curiosity', body: 'Curiosity is core to Key Partnership. We are dedicated to self-learning and improvement — we won\'t stop until we get to the bottom of what you need.' },
              { num: '03', title: 'Commercial Mindset', body: 'Our team is commercially-minded and action-oriented. We aim to deliver only the best quality service — not just any candidate, the right candidate.' },
              { num: '04', title: 'Getting Things Done', body: 'We thrive on taking ownership of work and staying focused on delivering the best results. We follow our processes closely and continuously improve them.' },
            ].map(v => (
              <div key={v.num} className="value-card" data-reveal>
                <div className="value-num">{v.num}</div>
                <div className="value-body">
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="team-section">
        <div className="container">
          <div className="section-divider" data-reveal />
          <p className="eyebrow" data-reveal>The Team</p>
          <h2 className="section-title" data-reveal>Meet the People Behind Key Partnership</h2>
          <div className="team-grid" style={{ marginTop: 48 }}>
            {[
              { name: 'Matt', role: 'Senior Recruitment Consultant', bio: 'The driving force behind hundreds of successful placements. Matt\'s reputation for communication, technical understanding, and genuine care for both clients and candidates is reflected in every review on this site.', photo: `${import.meta.env.BASE_URL}matt.jpg` },
              { name: 'The Team', role: 'Key Partnership Recruitment', bio: 'We\'re a small, focused team that punches above its weight. No anonymous operators — when you work with Key Partnership, you deal with people who know your name and your requirements.', initial: 'KP' },
            ].map(m => (
              <div key={m.name} className="team-card" data-reveal>
                <div className="team-photo">
                  {m.photo
                    ? <img src={m.photo} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                    : <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--brand-green)' }}>{m.initial}</span>
                  }
                </div>
                <div className="team-info">
                  <h3>{m.name}</h3>
                  <p className="team-role">{m.role}</p>
                  <p>{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band">
        <div className="container" data-reveal>
          <h2>Ready to work together?</h2>
          <p>Whether you're hiring or looking for your next move — we'd love to have a conversation.</p>
          <div className="cta-band-actions">
            <Link to="/hire#submit" className="btn btn-primary">I'm Hiring <ArrowRight size={16} /></Link>
            <Link to="/candidates#submit" className="btn btn-secondary">I'm Looking for Work</Link>
          </div>
        </div>
      </section>
    </>
  )
}
