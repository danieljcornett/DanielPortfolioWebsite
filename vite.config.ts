import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // The three.js scene is one ~1.1 MB chunk (under 300 kB gzipped), loaded lazily after the page text.
    chunkSizeWarningLimit: 1200,
  },
})
