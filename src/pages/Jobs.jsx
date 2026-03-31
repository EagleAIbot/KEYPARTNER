import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, MapPin, Clock, Briefcase, Mail, Phone } from 'lucide-react'
import { jobs } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

// Top-view business meeting (overhead, visually unique)
const JOBS_HERO_VIDEO = 'https://assets.mixkit.co/videos/5537/5537-720.mp4'
// Interviewer listening to applicant — perfect for "submit your CV" CTA
const JOBS_CTA_VIDEO  = 'https://assets.mixkit.co/videos/49470/49470-720.mp4'
// Modern open-plan office — subtle texture behind listings
const JOBS_LISTINGS_IMG = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80'

export function Jobs() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set('[data-reveal]', { opacity: 1, y: 0 })
      return
    }
    const els = gsap.utils.toArray('[data-reveal]')
    els.forEach(el => {
      gsap.from(el, {
        opacity: 0, y: 32, duration: 0.8, ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none none' },
      })
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero hero--dark">
        <div className="hero-video-bg" aria-hidden>
          <video autoPlay muted loop playsInline preload="auto" className="hero-video-bg__vid">
            <source src={JOBS_HERO_VIDEO} type="video/mp4" />
          </video>
          <div className="hero-video-bg__overlay" />
        </div>
        <div className="hero-dark-grain" aria-hidden />

        <div className="container hero-dark-content">
          <p className="eyebrow hero-dark-eyebrow hero-ani-1">Current Opportunities</p>
          <h1 className="hero-dark-title hero-ani-2">
            Your Next Move<br />Starts Here.
          </h1>
          <p className="hero-dark-sub hero-ani-3">
            Technology, Commercial &amp; Data/AI roles across the UK.<br />
            No fluff, just the right opportunity at the right time.
          </p>
          <div className="hero-actions hero-ani-4">
            <a href="#listings" className="btn btn-hero-primary">
              Browse roles <ArrowRight size={16} strokeWidth={2.25} />
            </a>
            <a href="mailto:info@ourkeypartnership.co.uk?subject=CV Submission" className="btn btn-dark-outline">
              Submit your CV
            </a>
          </div>
          <ul className="hero-dark-stats hero-ani-4" aria-label="Key stats">
            <li className="hero-dark-stat">
              <span className="hero-dark-stat__num">{jobs.length}</span>
              <span className="hero-dark-stat__label">Live Roles</span>
            </li>
            <li className="hero-dark-stat">
              <span className="hero-dark-stat__num">10 Days</span>
              <span className="hero-dark-stat__label">Avg. Placement</span>
            </li>
            <li className="hero-dark-stat">
              <span className="hero-dark-stat__num">100%</span>
              <span className="hero-dark-stat__label">Client Retention</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ── JOB LISTINGS ── */}
      <section
        className="jobs-listings-section"
        id="listings"
        style={{ backgroundImage: `url(${JOBS_LISTINGS_IMG})` }}
      >
        <div className="jobs-listings-overlay" aria-hidden />
        <div className="container jobs-listings-inner">
          <div className="jobs-listings-header" data-reveal>
            <div className="section-divider" />
            <p className="eyebrow">Open Roles</p>
            <h2 className="section-title">Latest Vacancies</h2>
          </div>

          <div className="jobs-list">
            {jobs.map(j => (
              <div key={j.id} className="job-listing-card" data-reveal>
                <div className="job-listing-card__left">
                  <div className="job-listing-card__badges">
                    <span className="job-badge"><Briefcase size={11} />{j.discipline}</span>
                    <span className="job-listing-type">{j.type}</span>
                  </div>
                  <h3 className="job-listing-card__title">{j.title}</h3>
                  <div className="job-listing-card__meta">
                    <span><MapPin size={13} />{j.location}</span>
                    <span><Clock size={13} />{j.posted}</span>
                  </div>
                </div>
                <div className="job-listing-card__right">
                  <div className="job-listing-card__salary">{j.salary}</div>
                  <a
                    href={`mailto:info@ourkeypartnership.co.uk?subject=Application: ${j.title}`}
                    className="btn btn-green job-listing-card__apply"
                  >
                    Apply <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="jobs-cta-section">
        <div className="jobs-cta-video-bg" aria-hidden>
          <video autoPlay muted loop playsInline preload="none" className="jobs-cta-vid">
            <source src={JOBS_CTA_VIDEO} type="video/mp4" />
          </video>
          <div className="jobs-cta-overlay" />
        </div>
        <div className="container jobs-cta-content">
          <p className="eyebrow jobs-cta-eyebrow" data-reveal>Don't see your role?</p>
          <h2 className="jobs-cta-title" data-reveal>
            We work on exclusive briefs<br />not always advertised publicly.
          </h2>
          <p className="jobs-cta-sub" data-reveal>
            Send us your CV and we'll be in touch the moment the right brief lands. No spam, ever.
          </p>
          <div className="jobs-cta-actions" data-reveal>
            <a href="mailto:info@ourkeypartnership.co.uk?subject=CV Submission" className="btn btn-hero-primary">
              <Mail size={15} /> Submit your CV
            </a>
            <a href="tel:01327493143" className="btn btn-dark-outline">
              <Phone size={15} /> 01327 493 143
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
