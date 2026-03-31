import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export function Contact() {
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
          <p className="eyebrow">Get In Touch</p>
          <h1>Let's Have a<br />Conversation</h1>
          <p>No hard sell. No script. Just a genuine conversation about how we can help, whether you're hiring or looking for your next role.</p>
        </div>
      </section>

      <section className="form-section">
        <div className="container">
          <div className="form-grid">
            <div className="form-card" data-reveal>
              <h3>Send us a message</h3>
              <p className="form-sub">We respond within one business day.</p>
              <form action={`mailto:info@ourkeypartnership.co.uk?subject=Website%20Enquiry`} method="get">
                <div className="form-row">
                  <div className="form-field">
                    <label>First name *</label>
                    <input type="text" placeholder="Jane" required />
                  </div>
                  <div className="form-field">
                    <label>Last name *</label>
                    <input type="text" placeholder="Smith" required />
                  </div>
                </div>
                <div className="form-field">
                  <label>Email *</label>
                  <input type="email" placeholder="jane@example.com" required />
                </div>
                <div className="form-field">
                  <label>Phone</label>
                  <input type="tel" placeholder="07700 900 000" />
                </div>
                <div className="form-field">
                  <label>I am a...</label>
                  <select>
                    <option value="">Select...</option>
                    <option>Hiring manager / employer</option>
                    <option>Candidate / job seeker</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>How can we help?</label>
                  <textarea placeholder="Tell us a bit about what you're looking for..." />
                </div>
                <button type="submit" className="btn btn-green form-submit">
                  Send Message <ArrowRight size={16} />
                </button>
              </form>
            </div>

            <div className="form-side-info" data-reveal>
              <div>
                <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 24 }}>Contact details</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {[
                    { icon: Phone, label: 'Phone', value: '01327 493 143', href: 'tel:01327493143' },
                    { icon: Mail, label: 'Email', value: 'info@ourkeypartnership.co.uk', href: 'mailto:info@ourkeypartnership.co.uk' },
                    { icon: MapPin, label: 'Office', value: 'Office 15, 76 High Street, Stony Stratford, Milton Keynes, MK11 1AH', href: null },
                  ].map(c => (
                    <div key={c.label} className="form-contact-item">
                      <div className="form-contact-icon"><c.icon size={18} /></div>
                      <div>
                        <h4>{c.label}</h4>
                        {c.href
                          ? <a href={c.href} className="form-contact-item a">{c.value}</a>
                          : <p>{c.value}</p>
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: 'var(--brand-green)', borderRadius: 'var(--radius-lg)', padding: 28, color: 'var(--brand-white)' }}>
                <p style={{ fontWeight: 700, marginBottom: 10 }}>Company registration</p>
                <p style={{ fontSize: '0.88rem', opacity: 0.75 }}>Key Partnership Recruitment Ltd<br />Company No. 12733360<br />Registered in England & Wales</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
