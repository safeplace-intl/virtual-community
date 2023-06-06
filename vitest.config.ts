/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    includeSource: ["src/**/*.{js,ts}"],
    coverage: {
      enabled: true,
      reportsDirectory: "./test/unit/coverage",
      provider: "c8",
      clean: true,
    },
    mockReset: true,
  },
});
