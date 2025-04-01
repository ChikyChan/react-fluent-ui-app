import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { mockDevServerPlugin } from 'vite-plugin-mock-dev-server'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), mode === 'mock' && mockDevServerPlugin()],
  server: {
    proxy: {
      '^/api': {
        target: 'http://localhost:5074',
        changeOrigin: true,
        rewrite: (path) => {
          const newPath = path.replace(/^\/api/, '')
          console.log({ path, newPath })
          return newPath
        },
      },
    },
  },
}))
