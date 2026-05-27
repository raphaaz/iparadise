import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- LÍNEA NUEVA 1

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- LÍNEA NUEVA 2
  ],
  server: {
    allowedHosts: 'all'
  }
})