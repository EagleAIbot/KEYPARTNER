import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Production build targets GitHub Pages project site: /KEYPARTNER/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/KEYPARTNER/' : '/',
}))
