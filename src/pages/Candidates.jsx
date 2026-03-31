import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Star, Phone, Mail } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function Candidates() {
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
          <p className="eyebrow">For Candidates</p>
          <h1>Find Your Next<br />Tech Career</h1>
          <p>We&apos;re on your side. From first conversation to first day in the new role — and beyond. Key Partnership gives you the guidance, prep, and honest communication that most recruiters never bother with.</p>
          <div className="page-hero-actions">
            <a href="#submit" className="btn btn-primary">Submit Your CV <ArrowRight size={16} /></a>
            <Link to="/jobs" className="btn btn-secondary">Browse Jobs</Link>
          </div>
        </div>
      </section>

      {/* Opening hook */}
      <section style={{ padding: 'var(--section-pad) 0', background: 'var(--brand-white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div data-reveal>
              <div className="section-divider" />
              <p className="eyebrow">A Different Kind of Recruiter</p>
              <h2 className="section-title">Why candidates choose Key Partnership</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 20 }}>
                Type "why are recruiters so" on Google and you'll see: <em>fake, pushy, slow, vague</em>. Those searches come from real experiences.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
                We're working to change that. Our candidates are also our clients — and without you, we have no business. Expect honest advice, real feedback, and a consultant who's <strong style={{ color: 'var(--text-primary)' }}>actually on your side</strong>.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }} data-reveal>
              {[
                'Honest, transparent advice — no false expectations',
                'Detailed feedback after every interview, guaranteed',
                'Technical knowledge that matches your expertise',
                'CV workshops and tailored interview prep',
                'Support during onboarding and the first 6 months',
              ].map((g, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '14px 20px', background: 'var(--surface-muted)', borderRadius: 'var(--radius)', borderLeft: '3px solid var(--brand-green)' }}>
                  <Star size={14} style={{ color: 'var(--brand-green)', marginTop: 3, minWidth: 14 }} />
                  <p style={{ fontSize: '0.93rem', color: 'var(--text-muted)' }}>{g}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: 'var(--section-pad) 0', background: 'var(--surface-muted)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 56px' }} data-reveal>
            <div className="section-divider" style={{ margin: '0 auto 24px' }} />
            <p className="eyebrow">What to expect</p>
            <h2 className="section-title">Our Process, Step by Step</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              { num: '01', title: 'We listen', body: 'Our consultants are job counsellors. We take the time to understand your situation, motivations, and goals — not just your skill set.' },
              { num: '02', title: 'We consult', body: 'Market data on demand for your skills. CV workshops. Role alignment to clients who share your values. Real, actionable advice.' },
              { num: '03', title: 'We prepare', body: 'Interview prep for every candidate — role insight, company briefings, practice interviews, and strategy. Even if you\'re not interviewing with our client.' },
              { num: '04', title: 'We deliver', body: 'We manage the offer, guide you through onboarding, and check in throughout your first six months. Your success is our success.' },
            ].map(s => (
              <div key={s.num} className="card" data-reveal style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 700, color: 'var(--green-100)', lineHeight: 1, marginBottom: 16 }}>{s.num}</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submit CV */}
      <section id="submit" className="form-section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 56px' }} data-reveal>
            <div className="section-divider" style={{ margin: '0 auto 24px' }} />
            <h2 className="section-title">Submit Your CV</h2>
            <p style={{ color: 'var(--text-muted)' }}>Takes 60 seconds. We'll be in touch with a real conversation — no automated nonsense.</p>
          </div>
          <div className="form-grid">
            <div className="form-card" data-reveal>
              <h3>Tell us about yourself</h3>
              <p className="form-sub">We'll review your CV and reach out to discuss opportunities that genuinely fit.</p>
              <form action={`mailto:info@ourkeypartnership.co.uk?subject=CV%20Submission`} method="get">
                <div className="form-row">
                  <div className="form-field">
                    <label>First name *</label>
                    <input type="text" placeholder="John" required />
                  </div>
                  <div className="form-field">
                    <label>Last name *</label>
                    <input type="text" placeholder="Smith" required />
                  </div>
                </div>
                <div className="form-field">
                  <label>Email *</label>
                  <input type="email" placeholder="john@example.com" required />
                </div>
                <div className="form-field">
                  <label>Phone *</label>
                  <input type="tel" placeholder="07700 900 000" required />
                </div>
                <div className="form-field">
                  <label>Your specialism</label>
                  <select>
                    <option value="">Select a discipline...</option>
                    <option>Software Development</option>
                    <option>Enterprise IT</option>
                    <option>BI & Data</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>Anything else you'd like us to know?</label>
                  <textarea placeholder="Current role, what you're looking for, salary expectations..." />
                </div>
                <button type="submit" className="btn btn-green form-submit">
                  Submit CV <ArrowRight size={16} />
                </button>
              </form>
            </div>
            <div className="form-side-info" data-reveal>
              <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 8 }}>Prefer to call?</p>
              <p style={{ color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.7 }}>Happy to have an informal chat first. Reach out however works best for you.</p>
              {[
                { icon: Phone, label: 'Call us', value: '01327 493 143', href: 'tel:01327493143' },
                { icon: Mail, label: 'Email us', value: 'info@ourkeypartnership.co.uk', href: 'mailto:info@ourkeypartnership.co.uk' },
              ].map(c => (
                <div key={c.label} className="form-contact-item">
                  <div className="form-contact-icon"><c.icon size={18} /></div>
                  <div>
                    <h4>{c.label}</h4>
                    <a href={c.href}>{c.value}</a>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: 24, padding: 24, background: 'var(--brand-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                <p style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 8 }}>We cover three specialisms</p>
                {['Software Development', 'Enterprise IT', 'BI & Data'].map(s => (
                  <p key={s} style={{ fontSize: '0.88rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <Star size={12} style={{ color: 'var(--brand-green)' }} /> {s}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
