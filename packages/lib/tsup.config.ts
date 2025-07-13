import { defineConfig } from "tsup"

export default defineConfig({
  entry: [
    "src/*/index.ts"
  ],
  format: [
    "esm",
    "cjs"
  ],
  dts: true,
  platform: "neutral",
  splitting: true,
  sourcemap: true,
  clean: true,
  skipNodeModulesBundle: true
})
