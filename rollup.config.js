import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import { terser } from "rollup-plugin-terser"
import pkg from "./package.json" assert { type: "json" }
import chokidar from "chokidar"

export default [
  {
    input: "dist/index.js",
    output: [
      {
        name: "vanilla-headless",
        file: pkg.browser,
        format: "umd",
      },
      {
        name: "vanilla-headless",
        file: pkg.module,
        format: "esm",
      },
      {
        name: "vanilla-headless",
        file: pkg.main,
        format: "cjs",
      },
    ],
    plugins: [
      resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      terser(),
    ],
    watch: {
      chokidar: true,
      exclude: ["node_modules"],
    },
  },
]
