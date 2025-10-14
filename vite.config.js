import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    build: {
    outDir: '../ecommerce-backend/dist'
  },
  base: '/chatbot-project/'
})
