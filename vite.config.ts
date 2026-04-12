import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import glsl from 'vite-plugin-glsl'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/project_universe/',
  plugins: [
    react(),
    glsl(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icon.svg'],
      manifest: {
        name: 'COSMOS — Space Ambient',
        short_name: 'COSMOS',
        description: 'A cinematic space ambient experience. Leave it running and encounter other souls drifting through the cosmos.',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'fullscreen',
        orientation: 'any',
        categories: ['entertainment', 'lifestyle'],
        icons: [
          {
            src: 'icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: 'icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/firebaseio\.com\/.*/i,
            handler: 'NetworkOnly',
          },
          {
            urlPattern: /^https:\/\/.*\.firebaseapp\.com\/.*/i,
            handler: 'NetworkOnly',
          },
        ],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  build: {
    target: ['es2020', 'safari14'],
  },
})
