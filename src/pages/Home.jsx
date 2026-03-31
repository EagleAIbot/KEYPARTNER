import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowDown, Cpu, TrendingUp, Database, MapPin, Clock, Briefcase, Heart, Users, Award, ChevronLeft, ChevronRight } from 'lucide-react'
import { Testimonials } from '../components/Testimonials'
import { CoverageMap } from '../components/CoverageMap'
import { jobs, pillars } from '../data/content'
import { useIsMobile } from '../hooks/useIsMobile'

gsap.registerPlugin(ScrollTrigger)

const HERO_VIDEO = 'https://assets.mixkit.co/videos/49288/49288-720.mp4'
const HERO_VIDEO_FALLBACK = 'https://assets.mixkit.co/videos/5499/5499-720.mp4'
const HERO_VIDEO_MOBILE = 'https://assets.mixkit.co/videos/29949/29949-720.mp4'
const VIDEO_BREAK_SRC = 'https://assets.mixkit.co/videos/46078/46078-720.mp4'
const VIDEO_BREAK_MOBILE = 'https://assets.mixkit.co/videos/23726/23726-720.mp4'
const EXCEL_VIDEO_SRC = 'https://assets.mixkit.co/videos/11001/11001-720.mp4'
const CONTACT_VIDEO_SRC = 'https://assets.mixkit.co/videos/15795/15795-720.mp4'
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
      <span className="hero-cycle-sizer" aria-hidden>Relationships</span>
      <span className="hero-cycle-visible">
        {displayed}<span className="type-cursor" aria-hidden>|</span>
      </span>
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
            <p className="section-subtitle" data-reveal>Find your next role, updated regularly with new opportunities.</p>
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
    title: 'Relationships, Not Transactions',
    body: 'We work as partners, not suppliers. That means honest conversations, clear expectations, and a focus on long-term fit, not quick placements.',
    Icon: Heart,
  },
  {
    num: '02',
    title: 'A Select Client Portfolio',
    body: 'We intentionally keep our client base small. It allows us to properly understand your business: how you operate, how your teams work, and what "good" really looks like. We don\'t just fill roles. We represent you in the market.',
    Icon: Users,
  },
  {
    num: '03',
    title: 'Quality Over Quantity. Every Single Time.',
    body: 'We don\'t rely on job boards or inbound applicants. We proactively identify and approach the talent other recruiters simply cannot reach. Fewer CVs. Better candidates.',
    Icon: Award,
  },
]

const pillarIcons = { technology: Cpu, commercial: TrendingUp, 'data-ai': Database }

export function Home() {
  const isMobile = useIsMobile()

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
        <div className="hero-video-bg" aria-hidden>
          <video key={isMobile ? 'hero-mob' : 'hero-desk'} autoPlay muted loop playsInline preload="auto" className="hero-video-bg__vid">
            <source src={isMobile ? HERO_VIDEO_MOBILE : HERO_VIDEO} type="video/mp4" />
            {!isMobile && <source src={HERO_VIDEO_FALLBACK} type="video/mp4" />}
          </video>
          <div className="hero-video-bg__overlay" />
        </div>

        <div className="hero-dark-grain" aria-hidden />

        <div className="container hero-dark-content">
          <h1 className="hero-dark-title hero-ani-2">
            A Business Built On <CyclingText />
          </h1>
          <p className="hero-dark-sub hero-ani-3">
            Key Partnership Recruitment connects IT and commercial talent with high-growth businesses across the UK and Asia-Pacific.
          </p>

          <ul className="hero-dark-stats hero-ani-4" aria-label="Key results">
            <li className="hero-dark-stat">
              <span className="hero-dark-stat__num">95%</span>
              <span className="hero-dark-stat__label">Offer Acceptance Rate</span>
              <span className="hero-dark-stat__detail">Candidates aligned from the outset</span>
            </li>
            <li className="hero-dark-stat">
              <span className="hero-dark-stat__num">90%</span>
              <span className="hero-dark-stat__label">12-Month Retention</span>
              <span className="hero-dark-stat__detail">Placements that are made to last</span>
            </li>
            <li className="hero-dark-stat">
              <span className="hero-dark-stat__num">80%</span>
              <span className="hero-dark-stat__label">Repeat Client Partnerships</span>
              <span className="hero-dark-stat__detail">Long-term relationships, not one-off hires</span>
            </li>
            <li className="hero-dark-stat">
              <span className="hero-dark-stat__num">500+</span>
              <span className="hero-dark-stat__label">Roles Delivered</span>
              <span className="hero-dark-stat__detail">Across IT &amp; Commercial markets</span>
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
        <section className="video-break" aria-label="Our approach">
          <div className="video-break__media">
            <video key={isMobile ? 'vb-mob' : 'vb-desk'} autoPlay muted loop playsInline preload="none" className="video-break__vid">
              <source src={isMobile ? VIDEO_BREAK_MOBILE : VIDEO_BREAK_SRC} type="video/mp4" />
            </video>
            <div className="video-break__overlay" aria-hidden />
          </div>
          <div className="container video-break__content">
            <h2 className="video-break__heading" data-reveal>
              Recruitment done<br />the <em>right way.</em>
            </h2>
            <p className="video-break__sub" data-reveal>
              Five years of delivering the right hires, with relationships at the core.
            </p>
          </div>
          <div className="video-break__scroll-hint" aria-hidden>
            <ArrowDown size={18} />
          </div>
        </section>
      </div>

      {/* ── 4. WHAT WE'RE KNOWN FOR ── */}
      <div className="stack-card" style={{zIndex: 4}}>
        <section className="known-for-section" style={{backgroundImage: `url(${KNOWN_FOR_IMG})`}}>
          <div className="known-for-bg-overlay" aria-hidden />
          <div className="container">
            <div className="section-header">
              <div className="section-divider" data-reveal />
              <p className="eyebrow" data-reveal>Our Philosophy</p>
              <h2 className="section-title" data-reveal>What We're Known For</h2>
              <p className="section-subtitle" data-reveal>
                We don't operate like a traditional recruitment agency. No CV blasting. No shortcuts with an aim of generating a 'quick fee'. Most of our time is spent headhunting, identifying and engaging the right people, not just the available ones. It's a more deliberate approach, but it's what delivers better hires.
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

      {/* ── 5. WHERE WE EXCEL ── */}
      <div className="stack-card" style={{zIndex: 5}}>
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

      {/* ── 6. THE PERSON BEHIND IT ── */}
      <div className="stack-card" style={{zIndex: 6}}>
        <section className="meet-section">
          <div className="container meet-grid">
            <div className="meet-photo-col" data-reveal>
              <div className="meet-photo-frame">
                <img src={`${import.meta.env.BASE_URL}matt.jpg`} alt="Matt Stimpson, Founder, Key Partnership Recruitment" />
              </div>
            </div>
            <div className="meet-text-col">
              <div className="section-divider" data-reveal />
              <p className="eyebrow" data-reveal>The Person Behind It</p>
              <h2 className="meet-name" data-reveal>Matt Stimpson</h2>
              <p className="meet-role" data-reveal>Founder &amp; Managing Director</p>
              <p className="meet-bio" data-reveal>
                Matt brings close to a decade of experience recruiting and headhunting for ambitious businesses, from SMEs through to FTSE 250 and Fortune 500 organisations.
              </p>
              <p className="meet-bio" data-reveal>
                He entered the industry at 16, quickly establishing himself as one of the UK's top-performing early careers recruiters, including recognition as the UK Recruitment Apprentice of the Year by the Recruitment &amp; Employment Confederation (REC).
              </p>
              <p className="meet-bio" data-reveal>
                Matt founded Key Partnership with a clear approach. Recruitment works better when it's built on genuine relationships, not volume. That same approach underpins everything today: a selective client base, a headhunting-led model, and a focus on delivering the right hires, not just available candidates.
              </p>
              <div className="meet-actions" data-reveal>
                <a href="mailto:info@ourkeypartnership.co.uk" className="btn btn-green">
                  Say hello <ArrowRight size={15} />
                </a>
                <a href="https://www.linkedin.com/in/mattstimpson/" target="_blank" rel="noreferrer" className="btn btn-outline meet-linkedin">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── 7. COVERAGE MAP ── */}
      <div className="stack-card" style={{zIndex: 7}}>
        <CoverageMap />
      </div>

      {/* ── 8. REVIEWS ── */}
      <div className="stack-card" style={{zIndex: 8}}>
        <Testimonials />
      </div>

      {/* ── CTA / CONTACT ── */}
      <div className="stack-card" style={{zIndex: 9}} id="contact">
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
