import { defineConfig } from 'tsup'

export default defineConfig([
  // Server bundle (no client banner)
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom'],
    esbuildOptions: (options) => {
      options.jsx = 'automatic'
    }
  },
  // Client React bundle
  {
    entry: {
      react: 'src/react.ts'
    },
    format: ['esm', 'cjs'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: false,
    external: ['react', 'react-dom'],
    banner: {
      js: '"use client";'
    },
    esbuildOptions: (options) => {
      options.jsx = 'automatic'
    }
  }
])


