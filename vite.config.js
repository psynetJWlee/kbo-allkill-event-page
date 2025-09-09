import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist'
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://allkillevent.psynet.co.kr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
