import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// GitHub Pages project site lives at /KEYPARTNER/. If BASE_URL were ever wrong in prod,
// Router would get basename undefined and the app would render nothing at that URL.
function ghPagesBasename() {
  if (import.meta.env.DEV) return undefined
  const fromVite = (import.meta.env.BASE_URL || '').replace(/\/$/, '')
  if (fromVite && fromVite !== '/') return fromVite
  return '/KEYPARTNER'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={ghPagesBasename()}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
