import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    open: false,
    proxy: {
      '/api': process.env.VITE_APP_API_URL || 'http://localhost:8000',
    },
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@views': path.resolve(__dirname, './src/views'),
      '@components': path.resolve(__dirname, './src/components'),
      '@libs': path.resolve(__dirname, './src/libs'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@context': path.resolve(__dirname, './src/context'),
    },
  },
  define: {
    'process.env': process.env,
  },
});
