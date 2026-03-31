import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Cpu, TrendingUp, Database, MapPin, Clock, Briefcase, Heart, Users, Award } from 'lucide-react'
import { Testimonials } from '../components/Testimonials'
import { jobs, pillars } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const heroImg = {
  main: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=85&auto=format&fit=crop',
  sideTop: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=85&auto=format&fit=crop',
  sideBottom: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=85&auto=format&fit=crop',
}

const VIDEO_SRC = 'https://videos.pexels.com/video-files/3253655/3253655-hd_1280_720_25fps.mp4'

function TypedText({ text, delay = 750, speed = 50 }) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let interval
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCount(c => {
          if (c >= text.length) {
            clearInterval(interval)
            setDone(true)
            return c
          }
          return c + 1
        })
      }, speed)
    }, delay)
    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [text, delay, speed])

  return (
    <>
      {text.slice(0, count)}
      {!done && <span className="type-cursor" aria-hidden>|</span>}
    </>
  )
}

const knownFor = [
  {
    num: '01',
    title: 'Values First. Always.',
    body: 'We recruit the way we would want to be recruited. Honest briefings, genuine market insight, and advice that prioritises the right fit over the fastest fee.',
    Icon: Heart,
  },
  {
    num: '02',
    title: 'A Purposely Small Client Portfolio',
    body: 'We deliberately cap the number of clients we work with. Every brief gets our full attention — we know your culture, your team, and exactly who thrives there.',
    Icon: Users,
  },
  {
    num: '03',
    title: 'Quality Over Quantity. Every Time.',
    body: 'Whether it is a candidate shortlist or a client roster, we would rather present three exceptional options than fifteen average ones. Fewer introductions. Better outcomes.',
    Icon: Award,
  },
]

const pillarIcons = { technology: Cpu, commercial: TrendingUp, 'data-ai': Database }

export function Home() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.set('[data-reveal]', { opacity: 1, y: 0 })
      return
    }
    const reveals = gsap.utils.toArray('[data-reveal]')
    reveals.forEach((el) => {
      gsap.from(el, {
        opacity: 0,
        y: 36,
        duration: 0.8,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      })
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <>
      {/* ── 1. HERO ── */}
      <section className="hero hero--split">
        <div className="hero-bg-blob" aria-hidden />
        <div className="hero-grain hero-grain--light" aria-hidden />
        <div className="container hero-split-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-ani-1">Award-winning · People-centric · Tech recruitment</p>
            <h1 className="hero-title hero-ani-2">
              <TypedText text="A Business Built On Relationships" />
            </h1>
            <p className="hero-subtitle hero-ani-3">
              We connect standout technology talent with teams who hire for craft, culture, and longevity — not just a job title. Partners across the UK, grounded in the Home Counties.
            </p>
            <div className="hero-actions hero-ani-4">
              <Link to="/hire" className="btn btn-hero-primary">
                Hire talent <ArrowRight size={16} strokeWidth={2.25} />
              </Link>
              <Link to="/jobs" className="btn btn-hero-outline">Find work</Link>
            </div>
            <ul className="hero-stats-row hero-ani-4" aria-label="Key results">
              <li className="hero-stat-pill">
                <span className="hero-stat-pill__num">100%</span>
                <span className="hero-stat-pill__label">Client retention</span>
              </li>
              <li className="hero-stat-pill">
                <span className="hero-stat-pill__num">10 days</span>
                <span className="hero-stat-pill__label">Avg. time to placement</span>
              </li>
              <li className="hero-stat-pill">
                <span className="hero-stat-pill__num">5★</span>
                <span className="hero-stat-pill__label">Candidate reviews</span>
              </li>
            </ul>
          </div>

          <div className="hero-collage hero-ani-5">
            <figure className="hero-collage__main">
              <img src={heroImg.main} width={900} height={1100} alt="Team collaborating in a meeting" loading="eager" decoding="async" />
            </figure>
            <div className="hero-collage__side">
              <figure className="hero-collage__fig">
                <img src={heroImg.sideTop} width={480} height={360} alt="Colleagues working together" loading="eager" decoding="async" />
              </figure>
              <figure className="hero-collage__fig hero-collage__fig--short">
                <img src={heroImg.sideBottom} width={480} height={320} alt="Professional reviewing work" loading="eager" decoding="async" />
              </figure>
            </div>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line scroll-line--dark" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── 2. VIDEO BREAK ── */}
      <section className="video-break" aria-label="Our people">
        <div className="video-break__media">
          <video autoPlay muted loop playsInline preload="none" className="video-break__vid">
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
          <div className="video-break__overlay" aria-hidden />
        </div>
        <div className="container video-break__content">
          <p className="video-break__eyebrow" data-reveal>South Northamptonshire · Home Counties · Nationwide</p>
          <h2 className="video-break__heading" data-reveal>
            Recruitment done<br />the <em>right way.</em>
          </h2>
          <p className="video-break__sub" data-reveal>
            A business built on doing things properly — relationships first, placements second.
          </p>
        </div>
      </section>

      {/* ── 3. WHAT WE'RE KNOWN FOR ── */}
      <section className="known-for-section">
        <div className="container">
          <div className="section-header">
            <div className="section-divider" data-reveal />
            <p className="eyebrow" data-reveal>Our Philosophy</p>
            <h2 className="section-title" data-reveal>What We're Known For</h2>
            <p className="section-subtitle" data-reveal>
              A value-led approach to recruitment. A purposely select portfolio of clients we know inside out. Quality over quantity — always — whether we're representing a candidate or briefing a vacancy.
            </p>
          </div>
          <div className="known-for-grid">
            {knownFor.map((item, i) => (
              <div key={i} className="known-for-card" data-reveal>
                <div className="kf-num">{item.num}</div>
                <div className="kf-icon-wrap"><item.Icon size={22} /></div>
                <h3 className="kf-title">{item.title}</h3>
                <p className="kf-body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHERE WE EXCEL ── */}
      <section className="excel-section">
        <div className="container">
          <div className="section-divider white" data-reveal />
          <p className="eyebrow excel-eyebrow" data-reveal>Specialisms</p>
          <h2 className="section-title excel-title" data-reveal>Where We Excel</h2>
          <p className="section-subtitle excel-sub" data-reveal>
            Three disciplines. Deep networks. The same uncompromising commitment to quality across every vertical.
          </p>
          <div className="excel-grid">
            {pillars.map(p => {
              const Icon = pillarIcons[p.slug] || Cpu
              return (
                <div key={p.slug} className="excel-card" data-reveal>
                  <div className="excel-card__icon"><Icon size={28} /></div>
                  <h3 className="excel-card__title">{p.title}</h3>
                  <p className="excel-card__body">{p.short}</p>
                  <div className="excel-card__tags">
                    {p.tech.slice(0, 5).map(t => <span key={t} className="excel-tag">{t}</span>)}
                    {p.tech.length > 5 && <span className="excel-tag">+{p.tech.length - 5} more</span>}
                  </div>
                  <Link to="/contact" className="spec-link excel-link">
                    Get in touch <ArrowRight size={14} />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 5. LATEST VACANCIES ── */}
      <section className="jobs-section">
        <div className="container">
          <div className="jobs-header">
            <div>
              <div className="section-divider" data-reveal />
              <p className="eyebrow" data-reveal>Opportunities</p>
              <h2 className="section-title" data-reveal>Latest Vacancies</h2>
            </div>
            <Link to="/jobs" className="btn btn-outline" data-reveal>View all jobs</Link>
          </div>
          <div className="jobs-grid">
            {jobs.map(j => (
              <div key={j.id} className="job-card" data-reveal>
                <div className="job-badge"><Briefcase size={11} />{j.discipline}</div>
                <div className="job-title">{j.title}</div>
                <div className="job-meta">
                  <span><MapPin size={12} />{j.location}</span>
                  <span><Clock size={12} />{j.posted}</span>
                  <span>{j.type}</span>
                </div>
                <div className="job-salary">{j.salary}</div>
                <Link to="/jobs" className="job-cta">Apply now <ArrowRight size={14} /></Link>
              </div>
            ))}
          </div>
          <div className="jobs-bottom" data-reveal>
            <div className="jobs-coming">
              <h3>Full jobs board — coming soon</h3>
              <p>Roles are refreshed weekly across technology, commercial, and data. Send your CV — we will match you when the right brief lands.</p>
              <Link to="/candidates" className="btn btn-green">Submit your CV <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. REVIEWS ── */}
      <Testimonials />

      {/* ── CTA BAND ── */}
      <section className="cta-band" aria-labelledby="cta-heading">
        <div className="container">
          <div className="cta-panel" data-reveal>
            <div className="cta-panel__sheen" aria-hidden />
            <div className="cta-panel__inner">
              <p className="cta-panel__eyebrow">Start a conversation</p>
              <h2 id="cta-heading">Ready for your next great hire?</h2>
              <p className="cta-panel__lede">One specialist or a full squad — we build shortlists you can defend in a steering meeting.</p>
              <div className="cta-panel__actions">
                <Link to="/hire" className="btn btn-cta-primary">Start hiring <ArrowRight size={17} strokeWidth={2.25} /></Link>
                <Link to="/contact" className="btn btn-cta-secondary">Talk to the team</Link>
              </div>
              <a href="tel:01327493143" className="cta-panel__tel">Prefer the phone? <strong>01327 493 143</strong></a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
