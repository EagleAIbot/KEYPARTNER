import { Routes, Route } from 'react-router-dom'
import { LenisProvider } from './components/LenisProvider'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Jobs } from './pages/Jobs'

export default function App() {
  return (
    <LenisProvider>
      <Nav />
      <main>
        <Routes>
          <Route path="/"      element={<Home />} />
          <Route path="/jobs"  element={<Jobs />} />
          <Route path="*"      element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </LenisProvider>
  )
}
