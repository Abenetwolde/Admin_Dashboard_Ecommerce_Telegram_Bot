// vite.config.ts
import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker'; 

dotenv.config();

export default defineConfig({
  plugins: [tsconfigPaths(),   checker({ typescript: false }), react()],
  build: {
    target: 'esnext',
  },
  define: {
    'process.env': process.env,
  },
  mode: process.env.NODE_ENV,
});
