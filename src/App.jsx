import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { LenisProvider } from './components/LenisProvider'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Hire } from './pages/Hire'
import { Candidates } from './pages/Candidates'
import { Jobs } from './pages/Jobs'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Specialism, SpecialismsList } from './pages/Specialisms'

function ScrollReset() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <LenisProvider>
      <ScrollReset />
      <Nav />
      <main>
        <Routes>
          <Route path="/"                       element={<Home />} />
          <Route path="/hire"                   element={<Hire />} />
          <Route path="/candidates"             element={<Candidates />} />
          <Route path="/jobs"                   element={<Jobs />} />
          <Route path="/about"                  element={<About />} />
          <Route path="/contact"                element={<Contact />} />
          <Route path="/specialisms"            element={<SpecialismsList />} />
          <Route path="/specialisms/:slug"      element={<Specialism />} />
          <Route path="*"                       element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </LenisProvider>
  )
}
