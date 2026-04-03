import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, CheckCircle2, Users, Search, Star, Clock, BarChart2, Handshake } from 'lucide-react'
import { Testimonials } from '../components/Testimonials'

gsap.registerPlugin(ScrollTrigger)

const HIRE_HERO_VIDEO = 'https://assets.mixkit.co/videos/49470/49470-720.mp4'

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
      {/* ── HERO ── */}
      <section className="hero hero--dark">
        <div className="hero-video-bg" aria-hidden>
          <video autoPlay muted loop playsInline preload="auto" className="hero-video-bg__vid">
            <source src={HIRE_HERO_VIDEO} type="video/mp4" />
          </video>
          <div className="hero-video-bg__overlay" />
        </div>
        <div className="hero-dark-grain" aria-hidden />
        <div className="container hero-dark-content">
          <p className="eyebrow hero-dark-eyebrow hero-ani-1">For Our Clients</p>
          <h1 className="hero-dark-title hero-ani-2">
            A more focused<br />approach to hiring
          </h1>
          <p className="hero-dark-sub hero-ani-3">
            We partner with a select group of businesses to deliver permanent and fixed-term hires across Technology, Data &amp; AI, and Commercial functions. Fewer clients, more focus, better hires.
          </p>
          <div className="hero-actions hero-ani-4">
            <a href="mailto:info@ourkeypartnership.co.uk?subject=New Vacancy Enquiry" className="btn btn-hero-primary">
              Discuss your hiring needs <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ── WHO WE WORK WITH ── */}
      <section style={{ padding: 'var(--section-pad) 0', background: 'var(--brand-white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
            <div data-reveal>
              <div className="section-divider" />
              <h2 className="section-title">Who We Work With</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 28 }}>We support hiring for:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                {['Start-ups building their first teams', 'Scale-ups in growth mode', 'Established businesses hiring at pace'].map(item => (
                  <div key={item} className="sign-item" data-reveal>
                    <CheckCircle2 size={16} style={{ color: 'var(--brand-green)', marginTop: 2, minWidth: 16 }} />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 16 }}>Across sectors including:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {['SaaS', 'Finance & FinTech', 'Hospitality & Retail', 'Healthcare'].map(item => (
                  <div key={item} className="sign-item" data-reveal>
                    <CheckCircle2 size={16} style={{ color: 'var(--brand-green)', marginTop: 2, minWidth: 16 }} />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div data-reveal style={{ background: 'var(--green-50)', borderRadius: 20, padding: 40, border: '1px solid var(--border)' }}>
              <p className="eyebrow" style={{ marginBottom: 16 }}>Our reach</p>
              <p style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: 12, lineHeight: 1.5 }}>
                Our clients are based across the UK and internationally, including the UAE, Australia and New Zealand.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                We operate from Milton Keynes, positioned within the UK's tech corridor, giving us strong access to talent and clients across the whole of the UK and into international markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ── */}
      <section style={{ padding: 'var(--section-pad) 0', background: 'var(--surface-muted)' }}>
        <div className="container">
          <div style={{ maxWidth: 720 }} data-reveal>
            <div className="section-divider" />
            <h2 className="section-title">How We Work</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 32 }}>
              We don't rely on job boards or inbound applications. Our time is spent identifying and engaging the right people directly.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: Search, text: 'Headhunting-led delivery on every role' },
                { icon: BarChart2, text: 'No reliance on advertising spend' },
                { icon: Users, text: 'Built networks across Tech, AI and Commercial markets' },
                { icon: Handshake, text: 'We represent your business properly in the market' },
              ].map(item => (
                <div key={item.text} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '16px 20px', background: 'var(--brand-white)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }} data-reveal>
                  <div style={{ width: 40, height: 40, minWidth: 40, background: 'var(--green-100)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-green)' }}>
                    <item.icon size={18} />
                  </div>
                  <p style={{ fontWeight: 600 }}>{item.text}</p>
                </div>
              ))}
            </div>
            <p style={{ marginTop: 28, color: 'var(--text-muted)', lineHeight: 1.7, fontStyle: 'italic' }}>
              We operate as an extension of your team, not an external supplier.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU CAN EXPECT ── */}
      <section style={{ padding: 'var(--section-pad) 0', background: 'var(--brand-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 56px' }} data-reveal>
            <div className="section-divider" style={{ margin: '0 auto 24px' }} />
            <h2 className="section-title">What You Can Expect</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { icon: Users, title: '3 candidates per role', body: 'Three of the best suited individuals — not a long list to filter through.' },
              { icon: Clock, title: '7-day CV delivery SLA', body: 'Qualified, engaged candidates within the first week.' },
              { icon: Star, title: 'High-quality shortlists', body: 'Less noise, more relevance.' },
              { icon: Handshake, title: 'On-site time with clients', body: 'We spend time understanding your teams, culture and environment.' },
              { icon: BarChart2, title: 'Market insight', body: 'Annual salary benchmarking to support hiring decisions.' },
            ].map(item => (
              <div key={item.title} className="card" data-reveal style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ width: 44, height: 44, background: 'var(--green-100)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-green)' }}>
                  <item.icon size={20} />
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERSHIP MODELS ── */}
      <section style={{ padding: 'var(--section-pad) 0', background: 'var(--green-50)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div data-reveal>
              <div className="section-divider" />
              <h2 className="section-title">Partnership Models</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 20 }}>
                We support clients on both contingent and retained models. For clients hiring regularly or building teams, we also offer fixed-fee retainers.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 20 }}>
                This provides a more cost-effective and consistent approach to hiring.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Last year, we saved one client over <strong style={{ color: 'var(--text-primary)' }}>£30,000 in recruitment fees</strong> compared to a traditional per-placement model.
              </p>
            </div>
            <div data-reveal>
              <div className="section-divider" />
              <h2 className="section-title">Commercially Built</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 16 }}>
                Our model is lean by design, which allows us to offer a more competitive fee structure than most agencies.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 16 }}>
                You're not paying for volume or overhead.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
                You're investing in a focused, high-quality service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CLIENTS WORK WITH US ── */}
      <section style={{ padding: 'var(--section-pad) 0', background: 'var(--brand-white)' }}>
        <div className="container">
          <div style={{ maxWidth: 640 }} data-reveal>
            <div className="section-divider" />
            <h2 className="section-title">Why Clients Work With Us</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 36, maxWidth: 640 }}>
            {[
              'Dedicated, headhunting-led approach',
              'Select client portfolio',
              'Strong networks across Tech, AI and Commercial',
              'Consistent, accountable delivery',
              'Long-term partnerships over one-off hires',
            ].map(item => (
              <div key={item} className="sign-item" data-reveal>
                <CheckCircle2 size={16} style={{ color: 'var(--brand-green)', marginTop: 2, minWidth: 16 }} />
                <p style={{ fontWeight: 500 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <Testimonials />

      {/* ── LET'S TALK ── */}
      <section style={{ padding: 'var(--section-pad) 0', background: 'var(--brand-green)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <p className="eyebrow" style={{ color: 'var(--green-300)' }} data-reveal>Let's Talk</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: 'var(--brand-white)', letterSpacing: '-0.03em', lineHeight: 1.1, margin: '16px 0 20px' }} data-reveal>
            Looking for a more focused approach to hiring?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, marginBottom: 36 }} data-reveal>
            If you're looking for a more focused, partnership-led approach to hiring, we should speak.
          </p>
          <a href="mailto:info@ourkeypartnership.co.uk?subject=New Vacancy Enquiry" className="btn btn-hero-primary" data-reveal>
            Discuss your hiring needs <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </>
  )
}
