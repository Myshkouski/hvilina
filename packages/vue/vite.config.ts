import vue from "@vitejs/plugin-vue"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import path from "node:path"

export default defineConfig({
  root: "./src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    lib: {
      entry: "./index.ts",
      formats: ["es"],
      fileName: "index",
    },
    // rollupOptions: {
    //   input: "./index.ts",
    // },
    // minify: "terser"
  },
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  }
})
