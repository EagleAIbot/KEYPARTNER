import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Users, Building2, Star, TrendingUp, Code2, Server, BarChart3, MapPin, Clock, Briefcase } from 'lucide-react'
import { Testimonials } from '../components/Testimonials'
import { jobs, specialisms } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

/** Unsplash — professional / workplace (replace with licensed brand photography when available). */
const heroImg = {
  main: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=85&auto=format&fit=crop',
  sideTop: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=85&auto=format&fit=crop',
  sideBottom: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=85&auto=format&fit=crop',
}
const editorialImg =
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=85&auto=format&fit=crop'

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
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  const specIcons = { 'software-development': Code2, 'enterprise-it': Server, 'bi-data': BarChart3 }

  return (
    <>
      <section className="hero hero--split">
        <div className="hero-bg-blob" aria-hidden />
        <div className="hero-grain hero-grain--light" aria-hidden />
        <div className="container hero-split-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-ani-1">Award-winning · People-centric · Tech recruitment</p>
            <h1 className="hero-title hero-ani-2">
              A business built on <em>relationships</em>
            </h1>
            <p className="hero-subtitle hero-ani-3">
              We connect standout technology talent with teams who hire for craft, culture, and longevity—not just a job title. Partners across the UK, grounded in the Home Counties, with a client list we keep intentionally small.
            </p>
            <div className="hero-actions hero-ani-4">
              <Link to="/hire" className="btn btn-hero-primary">
                Hire talent <ArrowRight size={16} strokeWidth={2.25} />
              </Link>
              <Link to="/jobs" className="btn btn-hero-outline">
                Find work
              </Link>
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
              <img
                src={heroImg.main}
                width={900}
                height={1100}
                alt="Team meeting around a table, collaborating on work"
                loading="eager"
                decoding="async"
              />
            </figure>
            <div className="hero-collage__side">
              <figure className="hero-collage__fig">
                <img
                  src={heroImg.sideTop}
                  width={480}
                  height={360}
                  alt="Colleagues working together in a bright office"
                  loading="eager"
                  decoding="async"
                />
              </figure>
              <figure className="hero-collage__fig hero-collage__fig--short">
                <img
                  src={heroImg.sideBottom}
                  width={480}
                  height={320}
                  alt="Two professionals reviewing work on a laptop"
                  loading="eager"
                  decoding="async"
                />
              </figure>
            </div>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line scroll-line--dark" />
          <span>Scroll</span>
        </div>
      </section>

      <section className="editorial-break" aria-label="Our footprint">
        <div className="editorial-break__media">
          <img
            src={editorialImg}
            width={1600}
            height={900}
            alt="Open-plan office with natural light and workstations"
            loading="lazy"
            decoding="async"
          />
          <div className="editorial-break__scrub" />
        </div>
        <div className="container editorial-break__caption-wrap">
          <p className="editorial-break__caption" data-reveal>
            South Northamptonshire roots. Home Counties networks. National reach when you need it.
          </p>
        </div>
      </section>

      <section className="why-section">
        <div className="container">
          <div className="section-header">
            <div className="section-divider" data-reveal />
            <p className="eyebrow" data-reveal>Why Key Partnership?</p>
            <h2 className="section-title" data-reveal>The Key Partnership Promise</h2>
            <p className="section-subtitle" data-reveal>
              Technology search led by consultants who still enjoy reading a README. Awards followed the work—not the other way around.
            </p>
          </div>
          <div className="why-grid">
            {[
              { icon: Users, title: 'Small, selective client base', body: 'We cap volume on purpose. Fewer logos on our roster means sharper recall of how you hire, how you sound, and who already thrives on your team.' },
              { icon: Building2, title: 'Consultants, not pushy salespeople', body: 'Briefing calls that feel like internal strategy, not a pitch deck. We represent your brand with the same care we expect from ours.' },
              { icon: Star, title: 'First-class candidate experience', body: 'Transparent process, interview prep that respects seniority, and momentum after every stage. Candidates earn honest counsel here.' },
              { icon: TrendingUp, title: 'Technical depth', body: 'Role-specific questions, code and infra context, and evidence-backed shortlists—so hiring managers spend time on signal, not noise.' },
              { icon: Users, title: 'Nationwide network', body: 'Deep relationships across Bucks, Beds, Northamptonshire, and Hertfordshire—plus remote-first talent wherever your stack allows.' },
              { icon: Star, title: '10-day placements', body: 'Warm pipelines and straight timelines. When the role is urgent, we trade theatre for traction.' },
            ].map((card, i) => (
              <div key={i} className={`why-card${i === 0 ? ' why-card--feature' : ''}`} data-reveal>
                {i === 0 && <p className="feature-kicker">The promise</p>}
                <div className="why-icon"><card.icon size={20} /></div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="specialisms-section">
        <div className="container">
          <div className="section-divider" data-reveal />
          <p className="eyebrow" data-reveal>Areas of expertise</p>
          <h2 className="section-title" data-reveal>Three pillars. Deep expertise.</h2>
          <p className="section-subtitle" data-reveal>
            Software engineering, enterprise IT, and BI &amp; data—from high-potential grads to technical leadership.
          </p>
          <div className="specialisms-grid">
            {specialisms.map(s => {
              const Icon = specIcons[s.slug] || Code2
              return (
                <div key={s.slug} className="spec-card" data-reveal>
                  <div className="spec-icon"><Icon size={22} /></div>
                  <h3>{s.title}</h3>
                  <p>{s.short}</p>
                  <div className="spec-tech">
                    {s.tech.slice(0, 5).map(t => <span key={t} className="spec-tag">{t}</span>)}
                    {s.tech.length > 5 && <span className="spec-tag">+{s.tech.length - 5} more</span>}
                  </div>
                  <Link to={`/specialisms/${s.slug}`} className="spec-link">
                    Learn more <ArrowRight size={14} />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="jobs-section">
        <div className="container">
          <div className="jobs-header">
            <div>
              <div className="section-divider" data-reveal />
              <p className="eyebrow" data-reveal>Latest roles</p>
              <h2 className="section-title" data-reveal>Current opportunities</h2>
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
              <p>Roles are refreshed weekly across software, enterprise IT, and data. Send your CV—we will match you when the right brief lands.</p>
              <Link to="/candidates" className="btn btn-green">Submit your CV <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="promise-section">
        <div className="container promise-grid">
          <div>
            <div className="section-divider" data-reveal />
            <p className="eyebrow" data-reveal>Our process</p>
            <h2 className="section-title" data-reveal>How we work with candidates</h2>
            <div className="promise-steps">
              {[
                { title: 'We listen', body: 'Air the wins and the blockers first. We map motivation before we touch the CV—so the search stays human.' },
                { title: 'We consult', body: 'Market reality, compensation bands, and the narratives hiring managers actually hear. Optional CV surgery included.' },
                { title: 'We prepare', body: 'Interview strategy, stakeholder styles, and technical depth—whether the role is ours or yours.' },
                { title: 'We deliver', body: 'Offer choreography, start-date clarity, and a check-in after you land. The relationship does not end at signature.' },
              ].map((s, i) => (
                <div key={i} className="promise-step" data-reveal>
                  <div className="step-num">{i + 1}</div>
                  <div className="step-body">
                    <h4>{s.title}</h4>
                    <p>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="promise-visual" data-reveal>
            <p className="eyebrow" style={{ marginBottom: 8 }}>The Key Candidate Guarantee</p>
            {[
              { title: 'Honesty & transparency', body: 'No inflated titles or phantom compensation—ever.' },
              { title: 'Communication guaranteed', body: 'Substantive feedback after every conversation. Silence is not a status update.' },
              { title: 'Technical integrity', body: 'We will not nudge you toward a scope you cannot own.' },
            ].map((g, i) => (
              <div key={i} className="guarantee-item">
                <div className="guarantee-icon"><Star size={16} /></div>
                <div>
                  <h4>{g.title}</h4>
                  <p>{g.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="cta-heading">
        <div className="container">
          <div className="cta-panel" data-reveal>
            <div className="cta-panel__sheen" aria-hidden />
            <div className="cta-panel__inner">
              <p className="cta-panel__eyebrow">Start a conversation</p>
              <h2 id="cta-heading">Ready for your next great hire?</h2>
              <p className="cta-panel__lede">One specialist or a full squad—we build shortlists you can defend in a steering meeting.</p>
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
