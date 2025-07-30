import { defineConfig } from "vite"
import dts from "unplugin-dts/vite"
// import tsconfigPaths from "vite-tsconfig-paths"
import path from "node:path"

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      dts({
        // bundleTypes: true
      }),
    ],
    build: {
      lib: {
        entry: "./src/index.ts",
        formats: [
          "iife"
        ],
        name: "hvilina",
        fileName: () => "index.js",
        cssFileName: "style"
      },
      minify: "terser"
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
  }
})
