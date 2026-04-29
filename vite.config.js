import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom domain — site lives at root /
export default defineConfig({
  plugins: [react()],
  base: '/',
})
