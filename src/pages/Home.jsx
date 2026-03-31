import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowDown, Cpu, TrendingUp, Database, MapPin, Clock, Briefcase, Heart, Users, Award, ChevronLeft, ChevronRight } from 'lucide-react'
import { Testimonials } from '../components/Testimonials'
import { jobs, pillars } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const HERO_VIDEO = 'https://assets.mixkit.co/videos/49288/49288-720.mp4'
const HERO_VIDEO_FALLBACK = 'https://assets.mixkit.co/videos/5499/5499-720.mp4'
// Man concentrating on screen in the dark — cinematic screen-glow close-up
const VIDEO_BREAK_SRC = 'https://assets.mixkit.co/videos/46078/46078-720.mp4'
// City sunrise timelapse — atmospheric backdrop for dark "Where We Excel" section
const EXCEL_VIDEO_SRC = 'https://assets.mixkit.co/videos/34980/34980-720.mp4'
// Handshake silhouette in skyscraper — cinematic CTA backdrop
const CONTACT_VIDEO_SRC = 'https://assets.mixkit.co/videos/15795/15795-720.mp4'
// Professional handshake — subtle texture behind "What We're Known For"
const KNOWN_FOR_IMG = 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80'

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
      <div className="stack-card" style={{zIndex: 2}}>
        <JobsCarousel />
      </div>

      {/* ── 3. VIDEO BREAK ── */}
      <div className="stack-card" style={{zIndex: 3}}>
        <section className="video-break" aria-label="Our people">
          <div className="video-break__media">
            <video autoPlay muted loop playsInline preload="none" className="video-break__vid">
              <source src={VIDEO_BREAK_SRC} type="video/mp4" />
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
          <div className="video-break__scroll-hint" aria-hidden>
            <ArrowDown size={18} />
          </div>
        </section>
      </div>

      {/* ── 4. MEET MATT ── */}
      <div className="stack-card" style={{zIndex: 4}}>
        <section className="meet-section">
          <div className="container meet-grid">
            <div className="meet-photo-col" data-reveal>
              <div className="meet-photo-frame">
                <img src={`${import.meta.env.BASE_URL}matt.jpg`} alt="Matt Rockell — Founder, Key Partnership Recruitment" />
              </div>
            </div>
            <div className="meet-text-col">
              <div className="section-divider" data-reveal />
              <p className="eyebrow" data-reveal>The Person Behind It</p>
              <h2 className="meet-name" data-reveal>Matt Rockell</h2>
              <p className="meet-role" data-reveal>Founder &amp; Director · Key Partnership Recruitment</p>
              <p className="meet-bio" data-reveal>
                I started Key Partnership in 2020 with one simple belief — recruitment works better when it's built on genuine relationships. Not volume, not velocity. Just doing it properly.
              </p>
              <p className="meet-bio" data-reveal>
                Five years on, that belief hasn't changed. We work with a deliberately select group of clients across Technology, Commercial, and Data &amp; AI, and we take every brief personally. You'll always speak directly to me.
              </p>
              <div className="meet-actions" data-reveal>
                <a href="mailto:info@ourkeypartnership.co.uk" className="btn btn-green">
                  Say hello <ArrowRight size={15} />
                </a>
                <a href="https://linkedin.com/in/matt-rockell" target="_blank" rel="noreferrer" className="btn btn-outline meet-linkedin">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── 5. WHAT WE'RE KNOWN FOR ── */}
      <div className="stack-card" style={{zIndex: 5}}>
        <section className="known-for-section" style={{backgroundImage: `url(${KNOWN_FOR_IMG})`}}>
          <div className="known-for-bg-overlay" aria-hidden />
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
      </div>

      {/* ── 6. WHERE WE EXCEL ── */}
      <div className="stack-card" style={{zIndex: 6}}>
        <section className="excel-section">
          <div className="excel-video-bg" aria-hidden>
            <video autoPlay muted loop playsInline preload="none" className="excel-video-bg__vid">
              <source src={EXCEL_VIDEO_SRC} type="video/mp4" />
            </video>
            <div className="excel-video-bg__overlay" />
          </div>
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
      </div>

      {/* ── 7. REVIEWS ── */}
      <div className="stack-card" style={{zIndex: 7}}>
        <Testimonials />
      </div>

      {/* ── CTA / CONTACT ── */}
      <div className="stack-card" style={{zIndex: 8}} id="contact">
        <section className="contact-strip">
          <div className="contact-video-bg" aria-hidden>
            <video autoPlay muted loop playsInline preload="none" className="contact-video-bg__vid">
              <source src={CONTACT_VIDEO_SRC} type="video/mp4" />
            </video>
            <div className="contact-video-bg__overlay" />
          </div>
          <div className="container contact-strip__grid">
            <div className="contact-strip__col">
              <p className="eyebrow contact-eyebrow">Hiring?</p>
              <h3 className="contact-col-title">Submit a vacancy</h3>
              <p className="contact-col-body">Tell us what you need. We'll respond the same day.</p>
              <a href="mailto:info@ourkeypartnership.co.uk?subject=New Vacancy" className="btn btn-cta-primary">
                Email us
              </a>
            </div>
            <div className="contact-strip__divider" aria-hidden />
            <div className="contact-strip__col">
              <p className="eyebrow contact-eyebrow">Looking for work?</p>
              <h3 className="contact-col-title">Send your CV</h3>
              <p className="contact-col-body">We'll match you when the right brief lands. No spam, ever.</p>
              <a href="mailto:info@ourkeypartnership.co.uk?subject=CV Submission" className="btn btn-cta-primary">
                Submit your CV
              </a>
            </div>
            <div className="contact-strip__divider" aria-hidden />
            <div className="contact-strip__col">
              <p className="eyebrow contact-eyebrow">Just talk</p>
              <h3 className="contact-col-title">Pick up the phone</h3>
              <p className="contact-col-body">Prefer a conversation? So do we.</p>
              <a href="tel:01327493143" className="btn btn-cta-primary">01327 493 143</a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
