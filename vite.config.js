import { defineConfig } from 'vite';

export default defineConfig({
  // Use 'src' as the root for source files
  root: '.',
  build: {
    outDir: 'dist',
  },
  server: {
    open: true, // auto-open browser on dev
  },
});
