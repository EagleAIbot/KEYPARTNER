import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">
              <img src="/logo-white.webp" alt="Key Partnership Recruitment" />
            </div>
            <p className="footer-tagline">
              Award-winning, people-centric tech recruiters. A business built on relationships.
            </p>
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href="tel:01327493143" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem', color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
                <Phone size={14} style={{ color: 'var(--green-300)' }} /> 01327 493 143
              </a>
              <a href="mailto:info@ourkeypartnership.co.uk" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem', color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
                <Mail size={14} style={{ color: 'var(--green-300)' }} /> info@ourkeypartnership.co.uk
              </a>
              <span style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.88rem', color: 'rgba(255,255,255,0.65)' }}>
                <MapPin size={14} style={{ color: 'var(--green-300)', marginTop: 2 }} />
                Office 15, 76 High Street, Stony Stratford, Milton Keynes, MK11 1AH
              </span>
            </div>
          </div>

          <div className="footer-col">
            <h4>Hire Talent</h4>
            <ul>
              <li><Link to="/hire">Our Process</Link></li>
              <li><Link to="/hire#sectors">Sectors We Serve</Link></li>
              <li><Link to="/hire#faq">FAQ</Link></li>
              <li><Link to="/our-pricing">Pricing</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Find Work</h4>
            <ul>
              <li><Link to="/candidates">For Candidates</Link></li>
              <li><Link to="/jobs">Browse Jobs</Link></li>
              <li><Link to="/specialisms/software-development">Software Dev</Link></li>
              <li><Link to="/specialisms/enterprise-it">Enterprise IT</Link></li>
              <li><Link to="/specialisms/bi-data">BI & Data</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/about#team">Meet the Team</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="https://ourkeypartnership.co.uk/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</a></li>
              <li><a href="https://ourkeypartnership.co.uk/cookie-policy" target="_blank" rel="noreferrer">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Key Partnership Recruitment Ltd · Company No. 12733360</span>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem' }}>
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
