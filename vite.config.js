import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve('src/index.html'),
        admin: resolve('src/admin.html'),
        archive: resolve('src/archive.html'),
        cinemaxxArchiv: resolve('src/cinemaxx-archiv.html'),
        resetPassword: resolve('src/reset-password.html'),
        tl: resolve('src/tl.html'),
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true
      }
    }
  }
});
