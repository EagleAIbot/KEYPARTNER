import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'

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
                <Link to="/jobs" className={pathname === '/jobs' ? 'active' : ''}>Jobs</Link>
              </div>
              <a href="tel:01327493143" className="nav-phone" aria-label="Call Key Partnership">
                <Phone size={15} strokeWidth={2.25} />
              </a>
              <a href="mailto:info@ourkeypartnership.co.uk" className="btn btn-green nav-cta">Get In Touch</a>
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
            <Link to="/jobs" onClick={() => setOpen(false)}>Jobs</Link>
          </div>
          <a href="tel:01327493143" className="drawer-phone">
            <Phone size={16} /> 01327 493 143
          </a>
          <a href="mailto:info@ourkeypartnership.co.uk" className="btn btn-green drawer-cta">Get In Touch</a>
        </div>
      </div>
    </>
  )
}
