import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'handlebars',
      'jsonresume-theme-even',
      'jsonresume-theme-projects',
    ],
    exclude: [
      'resumed',
      'jsonresume-theme-short',
      'jsonresume-theme-flat',
    ],
  },
})
