import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    '@solana/web3.js',
    '@solana/wallet-adapter-react',
    '@solana/wallet-adapter-react-ui',
    '@tanstack/react-query',
    'axios',
    'zod'
  ],
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
  target: 'esnext',
});