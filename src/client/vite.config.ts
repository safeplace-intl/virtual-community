/**
  @type {import('vite'.UserConfig)}
*/

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// const mode = process.env.NODE_ENV;
// const inputPath = (mode === "development") ? "./src/main.tsx" : false;

// eslint-disable-next-line no-console
console.log(process.env.NODE_ENV);
// https://vitejs.dev/config/

// dev config
let viteConfig = {};
if (process.env.NODE_ENV === "production ") {
  // prod config
  viteConfig = {
    plugins: [react()],
    build: {
      outDir: "../../build/client/dist",
      manifest: true,
      rollupOptions: {
        input: "index.dist.html",
      },
    },
    server: {
      origin: "http://127.0.0.1:8081",
    },
  };
} else {
  viteConfig = {
    plugins: [react()],
    build: {
      outDir: "./dist",
      manifest: true,
      rollupOptions: {
        input: "./src/main.tsx",
      },
    },
    server: {
      port: 3001,
      origin: "http://127.0.0.1:8081",
    },
  };
}

export default defineConfig(viteConfig);
