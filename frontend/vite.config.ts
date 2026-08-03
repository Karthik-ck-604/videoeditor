import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  const rawPort = process.env.PORT;
  const port = rawPort ? Number(rawPort) : undefined;

  // The PORT env var is only required for the local dev/preview server, which
  // actually binds to a port. Production builds (`vite build`) are static and
  // never listen on a port, so requiring PORT there breaks builds on Vercel
  // and other static-hosting platforms.
  if (command === 'serve') {
    if (!rawPort) {
      throw new Error(
        'PORT environment variable is required for the dev server but was not provided.',
      );
    }

    if (port === undefined || Number.isNaN(port) || port <= 0) {
      throw new Error(`Invalid PORT value: "${rawPort}"`);
    }
  }

  const basePath = process.env.BASE_PATH;

  if (!basePath) {
    throw new Error(
      'BASE_PATH environment variable is required but was not provided.',
    );
  }

  return {
    base: basePath,
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, 'src'),
        '@assets': path.resolve(
          import.meta.dirname,
          '..',
          '..',
          'attached_assets',
        ),
      },
      dedupe: ['react', 'react-dom'],
    },
    root: path.resolve(import.meta.dirname),
    build: {
      outDir: path.resolve(import.meta.dirname, 'dist/public'),
      emptyOutDir: true,
    },
    server: {
      port: port ?? undefined,
      strictPort: true,
      host: '0.0.0.0',
      allowedHosts: true,
      fs: {
        strict: true,
      },
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:5000',
          changeOrigin: true,
        }
      }
    },
    preview: {
      port: port ?? undefined,
      host: '0.0.0.0',
      allowedHosts: true,
    },
  };
});