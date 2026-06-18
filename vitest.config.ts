import { fileURLToPath } from "node:url"

import { defineConfig } from "vitest/config"

const parcelPath = fileURLToPath(
  new URL("./node_modules/single-spa-react/lib/cjs/parcel.cjs", import.meta.url),
)

export default defineConfig({
  resolve: {
    alias: {
      "single-spa-react/parcel": parcelPath,
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
})
