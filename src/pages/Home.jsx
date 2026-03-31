import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Cpu, TrendingUp, Database, MapPin, Clock, Briefcase, Heart, Users, Award, ChevronLeft, ChevronRight } from 'lucide-react'
import { Testimonials } from '../components/Testimonials'
import { jobs, pillars } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const heroImg = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=85&auto=format&fit=crop'
const HERO_VIDEO = 'https://assets.mixkit.co/videos/49288/49288-720.mp4'
const HERO_VIDEO_FALLBACK = 'https://assets.mixkit.co/videos/5499/5499-720.mp4'
const VIDEO_SRC = 'https://videos.pexels.com/video-files/3253655/3253655-hd_1280_720_25fps.mp4'

const CYCLE_WORDS = ['Relationships', 'Trust', 'Experience', 'Success']

function CyclingText() {
  const [wordIdx, setWordIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    const word = CYCLE_WORDS[wordIdx]
    let t
    if (phase === 'typing') {
      if (displayed.length < word.length) {
        t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80)
      } else {
        t = setTimeout(() => setPhase('deleting'), 1800)
      }
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 48)
      } else {
        setWordIdx(i => (i + 1) % CYCLE_WORDS.length)
        setPhase('typing')
      }
    }
    return () => clearTimeout(t)
  }, [displayed, phase, wordIdx])

  return (
    <span className="hero-cycle-word">
      {displayed}<span className="type-cursor" aria-hidden>|</span>
    </span>
  )
}

function JobsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start', dragFree: true })

  return (
    <section className="jobs-carousel-section">
      <div className="container">
        <div className="jobs-carousel-header">
          <div>
            <div className="section-divider" data-reveal />
            <p className="eyebrow" data-reveal>Opportunities</p>
            <h2 className="section-title" data-reveal>Latest Vacancies</h2>
          </div>
          <div className="jobs-carousel-controls">
            <button className="carousel-btn" onClick={() => emblaApi?.scrollPrev()} aria-label="Previous">
              <ChevronLeft size={20} />
            </button>
            <button className="carousel-btn" onClick={() => emblaApi?.scrollNext()} aria-label="Next">
              <ChevronRight size={20} />
            </button>
            <Link to="/jobs" className="btn btn-outline" data-reveal>View all</Link>
          </div>
        </div>
        <div className="embla embla--jobs" ref={emblaRef} data-reveal>
          <div className="embla__container">
            {jobs.map(j => (
              <div key={j.id} className="embla__slide embla__slide--job">
                <div className="job-card">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const knownFor = [
  {
    num: '01',
    title: 'Relationships First.',
    body: 'We recruit talent the way we would want to be recruited. Honest briefings, expert market insight, and always a focus on identifying the right candidate for your business. Fit over fast-fee, always.',
    Icon: Heart,
  },
  {
    num: '02',
    title: 'A Purposely Select Client Portfolio.',
    body: 'Unlike the majority of competition, we deliberately network with a select Client portfolio. Every requirement gets our full attention. We get to know our Clients\u2019 culture and team inside out, and almost become an extension of your business.',
    Icon: Users,
  },
  {
    num: '03',
    title: 'Quality Over Quantity. Every Single Time.',
    body: 'We only present several exceptional candidates for each vacancy we represent. Fewer introductions, more time saved, better outcomes.',
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
      <section className="hero hero--dark">
        {/* Video background */}
        <div className="hero-video-bg" aria-hidden>
          <video autoPlay muted loop playsInline preload="auto" className="hero-video-bg__vid">
            <source src={HERO_VIDEO} type="video/mp4" />
            <source src={HERO_VIDEO_FALLBACK} type="video/mp4" />
          </video>
          <div className="hero-video-bg__overlay" />
        </div>

        <div className="hero-dark-grain" aria-hidden />

        <div className="container hero-dark-content">
          <p className="eyebrow hero-dark-eyebrow hero-ani-1">
            Award-Winning · UK · Asia-Pacific
          </p>
          <h1 className="hero-dark-title hero-ani-2">
            A Business<br />Built On<br />
            <CyclingText />
          </h1>
          <p className="hero-dark-sub hero-ani-3">
            Key Partnership Recruitment is an Award-Winning Recruitment Business. We connect standout Talent with partners across the UK and into Asia-Pacific.
          </p>
          <div className="hero-actions hero-ani-4">
            <Link to="/hire" className="btn btn-hero-primary">
              Hire talent <ArrowRight size={16} strokeWidth={2.25} />
            </Link>
            <Link to="/jobs" className="btn btn-dark-outline">Find work</Link>
          </div>

          <ul className="hero-dark-stats hero-ani-4" aria-label="Key results">
            <li className="hero-dark-stat">
              <span className="hero-dark-stat__num">5★</span>
              <span className="hero-dark-stat__label">Reviews</span>
            </li>
            <li className="hero-dark-stat">
              <span className="hero-dark-stat__num">100%</span>
              <span className="hero-dark-stat__label">Client Retention</span>
            </li>
            <li className="hero-dark-stat">
              <span className="hero-dark-stat__num">10 Days</span>
              <span className="hero-dark-stat__label">Avg. Placement</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ── 2. LATEST VACANCIES CAROUSEL ── */}
      <JobsCarousel />

      {/* ── 3. VIDEO BREAK ── */}
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
            Five years of doing things properly — relationships first, placements second.
          </p>
        </div>
      </section>

      {/* ── 4. WHAT WE'RE KNOWN FOR ── */}
      <section className="known-for-section">
        <div className="container">
          <div className="section-header">
            <div className="section-divider" data-reveal />
            <p className="eyebrow" data-reveal>Our Philosophy</p>
            <h2 className="section-title" data-reveal>What We're Known For</h2>
            <p className="section-subtitle" data-reveal>
              Our reputation has been built over 5 successful years of business, where we have developed a truly unique reputation within the industry.
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

      {/* ── 5. WHERE WE EXCEL ── */}
      <section className="excel-section">
        <div className="container">
          <div className="section-divider white" data-reveal />
          <p className="eyebrow excel-eyebrow" data-reveal>Specialisms</p>
          <h2 className="section-title excel-title" data-reveal>Where We Excel</h2>
          <p className="section-subtitle excel-sub" data-reveal>
            Three core areas, with networks of highly-engaged candidates in each.
          </p>
          <div className="excel-grid">
            {pillars.map(p => {
              const Icon = pillarIcons[p.slug] || Cpu
              return (
                <div key={p.slug} className="excel-card" data-reveal>
                  <div className="excel-card__icon"><Icon size={28} /></div>
                  <h3 className="excel-card__title">{p.title}</h3>
                  <p className="excel-card__body">{p.short}</p>
                  {p.tags && p.tags.length > 0 && (
                    <div className="excel-card__tags">
                      {p.tags.map(t => <span key={t} className="excel-tag">{t}</span>)}
                    </div>
                  )}
                  <Link to="/contact" className="spec-link excel-link">
                    Get in touch <ArrowRight size={14} />
                  </Link>
                </div>
              )
            })}
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
