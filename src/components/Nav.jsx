import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { to: '/hire', label: 'Hire Talent' },
  { to: '/candidates', label: 'Find Work' },
  { to: '/specialisms', label: 'Specialisms' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/about', label: 'About' },
]

const base = import.meta.env.BASE_URL

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onLenis = (e) => setScrolled(e.detail.scroll > 12)
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('lenis-scroll', onLenis)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('lenis-scroll', onLenis)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    setOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <header className={`nav${scrolled ? ' nav--float' : ''}`}>
        <div className="nav-shell">
          <div className="nav-inner">
            <Link to="/" className="nav-logo" aria-label="Key Partnership home">
              <img src={`${base}logo-white.webp`} alt="Key Partnership Recruitment" />
            </Link>
            <nav className="nav-links" aria-label="Primary">
              <div className="nav-rail">
                {navLinks.map(l => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={pathname === l.to || (l.to !== '/' && pathname.startsWith(l.to)) ? 'active' : ''}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
              <a href="tel:01327493143" className="nav-phone" aria-label="Call Key Partnership">
                <Phone size={15} strokeWidth={2.25} />
              </a>
              <Link to="/contact" className="btn btn-green nav-cta">Get in Touch</Link>
            </nav>
            <button type="button" className="nav-menu-btn" onClick={() => setOpen(true)} aria-label="Open menu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-drawer${open ? ' open' : ''}`} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="drawer-overlay" onClick={() => setOpen(false)} />
        <div className="drawer-panel">
          <div className="drawer-header">
            <img src={`${base}logo-white.webp`} alt="" style={{ height: 28, filter: 'brightness(0) saturate(100%) invert(21%) sepia(60%) saturate(600%) hue-rotate(110deg) brightness(80%)' }} />
            <button type="button" className="drawer-close" onClick={() => setOpen(false)} aria-label="Close menu">
              <X size={22} />
            </button>
          </div>
          <div className="drawer-links">
            {navLinks.map(l => (
              <Link key={l.to} to={l.to}>{l.label}</Link>
            ))}
          </div>
          <a href="tel:01327493143" className="drawer-phone">
            <Phone size={16} /> 01327 493 143
          </a>
          <Link to="/contact" className="btn btn-green drawer-cta">Get in Touch</Link>
        </div>
      </div>
    </>
  )
}
