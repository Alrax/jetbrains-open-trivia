import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/jetbrains-open-trivia/',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }), tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          recharts: ['recharts'],
          radix: ['@radix-ui/react-select', '@radix-ui/react-tabs', '@radix-ui/react-slot'],
          react: ['react', 'react-dom']
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
