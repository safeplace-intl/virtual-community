import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

let viteConfig = {};

if (process.env.NODE_ENV === "production") {
  viteConfig = {
    plugins: [preact()],
    build: {
      outDir: "../../build/client/dist",
      manifest: true,
      rollupOptions: {
        input: "index.html",
      },
    },
    server: {
      origin: "http://127.0.0.1:8081",
    },
  };
} else {
  viteConfig = {
    plugins: [preact()],
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
// https://vitejs.dev/config/
export default defineConfig(viteConfig);
