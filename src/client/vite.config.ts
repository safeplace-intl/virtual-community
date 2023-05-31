import preact from "@preact/preset-vite";
import path from "path";
import { defineConfig } from "vite";

let viteConfig = {};
const importAliases = {
  "@": path.resolve(__dirname, "./src"),
  "@components": path.resolve(__dirname, "./src/components"),
  "@assets": path.resolve(__dirname, "./src/assets"),
  "@features": path.resolve(__dirname, "./src/features"),
  "@services": path.resolve(__dirname, "./src/services"),
  "@pages": path.resolve(__dirname, "./src/pages"),
};

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
    resolve: {
      alias: importAliases,
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
    resolve: {
      alias: importAliases,
    },
    server: {
      port: 3001,
      origin: "http://127.0.0.1:8081",
    },
  };
}
// https://vitejs.dev/config/
export default defineConfig(viteConfig);
