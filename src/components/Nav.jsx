import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const base = import.meta.env.BASE_URL

const smoothScrollTo = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const start = window.scrollY
  const end = el.getBoundingClientRect().top + window.scrollY
  const duration = 1800
  const startTime = performance.now()
  const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1)
    window.scrollTo(0, start + (end - start) * ease(progress))
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

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
                <Link to="/hire" className={pathname === '/hire' ? 'active' : ''}>Work With Us</Link>
              </div>
              <a href="/#contact" className="btn btn-green nav-cta" onClick={e => {
                if (pathname === '/') {
                  e.preventDefault()
                  smoothScrollTo('contact')
                }
              }}>Get In Touch</a>
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
            <Link to="/hire" onClick={() => setOpen(false)}>Work With Us</Link>
          </div>
          <a href="/#contact" className="btn btn-green drawer-cta" onClick={e => {
            setOpen(false)
            if (pathname === '/') {
              e.preventDefault()
              smoothScrollTo('contact')
            }
          }}>Get In Touch</a>
        </div>
      </div>
    </>
  )
}
