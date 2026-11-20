import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages(https://sweet8413-spec.github.io/art_website/) 배포용 base 경로
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/art_website/' : '/',
}))
