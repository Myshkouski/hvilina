import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import tailwindcss from "@tailwindcss/vite"
import dts from "unplugin-dts/vite"
import i18n from '@intlify/unplugin-vue-i18n/vite'
import nodeExternals from "rollup-plugin-node-externals"
import postcssPlugin from "./postcssPlugin"
// import tsconfigPaths from "vite-tsconfig-paths"
import { fileURLToPath } from "node:url"

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      nodeExternals(),
      vue(), ,
      i18n({

      }),
      tailwindcss(),
      dts({
        tsconfigPath: "tsconfig.app.json",
        bundleTypes: true
      }),
      // tsconfigPaths({
      //   configNames: [
      //     "tsconfig.app.json"
      //   ]
      // })
    ],
    css: {
      postcss: {
        plugins: [
          postcssPlugin()
        ],
      },
    },
    build: {
      // outDir: "./dist",
      lib: {
        entry: "./src/index.ts",
        formats: [
          "es",
        ],
        fileName: "index",
      },
      // rollupOptions: {
      //   // make sure to externalize deps that shouldn't be bundled
      //   // into your library
      //   external: ['vue'],
      //   output: {
      //     // Provide global variables to use in the UMD build
      //     // for externalized deps
      //     globals: {
      //       vue: 'Vue',
      //     },
      //   },
      // },
    },
    resolve: {
      alias: {
        "~": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
  }
})
