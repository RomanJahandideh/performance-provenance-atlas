import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' keeps every asset reference relative, so the same build works on
// GitHub Pages (subpath), Netlify (root), and offline from the filesystem.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2020',
    assetsInlineLimit: 0,
  },
});
