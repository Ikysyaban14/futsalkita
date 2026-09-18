import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Menyesuaikan base path dengan URL GitHub Pages: https://ikysyaban14.github.io/futsalkita/
  base: '/futsalkita/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});