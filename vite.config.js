import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://first29.github.io/gestor_canvia/",
  plugins: [react()]
})
