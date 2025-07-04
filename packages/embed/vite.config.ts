import { defineConfig, loadEnv, type UserConfig } from "vite"
import { glob } from 'glob'
import { resolve } from "path"
import tsconfigPaths from "vite-tsconfig-paths"
import { name, version } from "./package.json"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "./")
  const projectDir = resolve("./")
  const srcDir = resolve(projectDir, "./src")
  const pagesDir = resolve(srcDir, "./pages")

  return {
    plugins: [
      tsconfigPaths()
    ],
    root: pagesDir,
    envDir: projectDir,
    publicDir: resolve(srcDir, "./public"),
    build: {
      outDir: "../../dist",
      emptyOutDir: true,
      rollupOptions: {
        input: glob.sync(resolve(pagesDir, "./*/index.html")),
      },
      minify: "terser",
    },
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: `$VITE_ELEMENT_ID_PREFIX: "${ env.VITE_ELEMENT_ID_PREFIX || ''}";\n`
        }
      }
    },
    experimental: {
      renderBuiltUrl(filename) {
        return `https://cdn.jsdelivr.net/npm/${name}@${version}/dist/${filename}`
      },
    }
  } satisfies UserConfig
})
