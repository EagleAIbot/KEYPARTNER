import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'

const base = import.meta.env.BASE_URL

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-simple">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={`${base}logo-white.webp`} alt="Key Partnership Recruitment" />
            </div>
            <p className="footer-tagline">Award-winning, people-centric tech recruiters.<br />A business built on relationships.</p>
          </div>

          <div className="footer-contact-list">
            <a href="tel:01327493143" className="footer-contact-item">
              <Phone size={14} /> 01327 493 143
            </a>
            <a href="mailto:info@ourkeypartnership.co.uk" className="footer-contact-item">
              <Mail size={14} /> info@ourkeypartnership.co.uk
            </a>
            <span className="footer-contact-item footer-contact-item--text">
              <MapPin size={14} /> Office 15, 76 High Street, Stony Stratford, MK11 1AH
            </span>
          </div>

          <div className="footer-links-col">
            <Link to="/jobs">Jobs</Link>
            <a href="#contact">Contact</a>
            <a href="https://ourkeypartnership.co.uk/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</a>
            <a href="https://linkedin.com/company/key-partnership-recruitment" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Key Partnership Recruitment Ltd · Co. No. 12733360</span>
        </div>
      </div>
    </footer>
  )
}
