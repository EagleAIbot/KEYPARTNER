import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, CheckCircle2, Clock, Shield, TrendingUp, Phone, Mail, Upload } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const sectors = ['Hospitality, Retail & eCommerce', 'Medical Software & Supplies', 'Non-Profit & Charity', 'Software-as-a-Service (SaaS)', 'Professional Services (Insurance, Legal, Finance)']

export function Hire() {
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
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">For Employers</p>
          <h1>Hire Tech Talent,<br />Done Right</h1>
          <p>Stop being flooded with irrelevant profiles. Key Partnership presents a tailored shortlist of engaged, fully-qualified technology professionals — fast.</p>
          <div className="page-hero-actions">
            <a href="#submit" className="btn btn-primary">Submit a Vacancy <ArrowRight size={16} /></a>
            <a href="tel:01327493143" className="btn btn-secondary">Call 01327 493 143</a>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section style={{ padding: 'var(--section-pad) 0', background: 'var(--brand-white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div data-reveal>
              <div className="section-divider" />
              <p className="eyebrow">Sound familiar?</p>
              <h2 className="section-title">Struggling With These Hiring Challenges?</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 28 }}>
                {[
                  'Flooded with unqualified, irrelevant profiles',
                  'A simple hire taking weeks or months',
                  'Recruiters who don\'t understand your tech stack',
                  'Agencies chasing fees, not cultural fit',
                  'No market data to benchmark salary or availability',
                ].map((pain, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <div style={{ width: 20, height: 20, minWidth: 20, borderRadius: '50%', background: 'var(--green-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                      <CheckCircle2 size={12} style={{ color: 'var(--brand-green)' }} />
                    </div>
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{pain}</p>
                  </div>
                ))}
              </div>
            </div>
            <div data-reveal style={{ background: 'var(--green-50)', borderRadius: 20, padding: 40, border: '1px solid var(--border)' }}>
              <p className="eyebrow" style={{ marginBottom: 12 }}>The Key Partnership difference</p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 20 }}>
                We keep a <strong style={{ color: 'var(--text-primary)' }}>small, highly engaged client portfolio</strong> so we understand your business inside out — your culture, your technical requirements, your growth ambitions.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Our consultants breathe tech recruiting. Pre-built talent pools mean we respond with the right people quickly — we've filled urgent roles within 7 days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: 'var(--section-pad) 0', background: 'var(--surface-muted)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 56px' }}>
            <div className="section-divider" style={{ margin: '0 auto 24px' }} data-reveal />
            <p className="eyebrow" data-reveal>Our Process</p>
            <h2 className="section-title" data-reveal>Four Steps to Your Next Hire</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              { num: '01', title: 'Book a call', body: 'Get in touch and we\'ll schedule a conversation with our team — same day if urgent.' },
              { num: '02', title: 'Understand your needs', body: 'We dig into the role, your stack, your culture, and your growth aspirations. Not just a job description.' },
              { num: '03', title: 'Agree a strategy', body: 'We agree exactly how we\'ll find your talent, timelines, market data, and pricing — complete transparency.' },
              { num: '04', title: 'Start hiring', body: 'Sit back. We handle the search, screening, and shortlisting. You focus on choosing the right person.' },
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

      {/* Sectors */}
      <section id="sectors" style={{ padding: 'var(--section-pad) 0', background: 'var(--brand-white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <div className="section-divider" data-reveal />
              <p className="eyebrow" data-reveal>Sectors We Serve</p>
              <h2 className="section-title" data-reveal>Sector Agnostic. Technology Focused.</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.7 }} data-reveal>
                We recruit across industries. What unites our clients is a need for world-class technology talent — and an appreciation for a recruiter who genuinely understands what that means.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {sectors.map(s => (
                  <div key={s} className="sign-item" data-reveal>
                    <CheckCircle2 size={16} style={{ color: 'var(--brand-green)', marginTop: 2 }} />
                    <p>{s}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { icon: Clock, title: '7-day placements', body: 'From initial call to signed offer — we\'ve done it repeatedly.' },
                { icon: Shield, title: 'Money-back guarantee', body: 'Every placement is backed by a replacement guarantee. Quality is non-negotiable.' },
                { icon: TrendingUp, title: 'Market intelligence', body: 'We share salary benchmarks, availability data, and competitor insight — so you make the right decisions.' },
              ].map(c => (
                <div key={c.title} className="card" data-reveal style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <div style={{ width: 44, height: 44, minWidth: 44, background: 'var(--green-100)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-green)' }}>
                    <c.icon size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700, marginBottom: 6 }}>{c.title}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{c.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Submit vacancy form */}
      <section id="submit" className="form-section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 56px' }} data-reveal>
            <div className="section-divider" style={{ margin: '0 auto 24px' }} />
            <h2 className="section-title">Submit a Vacancy</h2>
            <p style={{ color: 'var(--text-muted)' }}>Tell us about the role and we'll get back to you within one business day.</p>
          </div>
          <div className="form-grid">
            <div className="form-card" data-reveal>
              <h3>Start the conversation</h3>
              <p className="form-sub">No obligation, no hard sell — just a genuine conversation about how we can help.</p>
              <form action={`mailto:info@ourkeypartnership.co.uk?subject=New%20Vacancy%20Enquiry`} method="get">
                <div className="form-row">
                  <div className="form-field">
                    <label>First name *</label>
                    <input type="text" name="firstname" placeholder="Jane" required />
                  </div>
                  <div className="form-field">
                    <label>Last name *</label>
                    <input type="text" name="lastname" placeholder="Smith" required />
                  </div>
                </div>
                <div className="form-field">
                  <label>Company *</label>
                  <input type="text" name="company" placeholder="Acme Tech Ltd" required />
                </div>
                <div className="form-field">
                  <label>Email *</label>
                  <input type="email" name="email" placeholder="jane@acme.com" required />
                </div>
                <div className="form-field">
                  <label>Phone</label>
                  <input type="tel" name="phone" placeholder="01234 567 890" />
                </div>
                <div className="form-field">
                  <label>Vacancy title *</label>
                  <input type="text" name="vacancy" placeholder="e.g. Senior .NET Developer" required />
                </div>
                <div className="form-field">
                  <label>Tell us about the role</label>
                  <textarea name="body" placeholder="Skills needed, salary range, location, culture..." />
                </div>
                <button type="submit" className="btn btn-green form-submit">
                  Send Enquiry <ArrowRight size={16} />
                </button>
              </form>
            </div>
            <div className="form-side-info" data-reveal>
              <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 8 }}>Or just pick up the phone</p>
              <p style={{ color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.7 }}>Sometimes the fastest route is a 10-minute call. Our team is here to help.</p>
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
                <p style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 8 }}>Replacement guarantee</p>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Every hire is backed by our guarantee. If something doesn't work out, we put it right — at no extra cost.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
