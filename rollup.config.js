import sourcemaps from "rollup-plugin-sourcemaps"
import resolve from "@rollup/plugin-node-resolve"
import babel from "@rollup/plugin-babel"
import packageJson from "./package.json"

// const files = (dir) => {
//   return fs
//     .readdirSync(dir)
//     .filter((elem) => path.extname(elem) === ".js")
//     .map((el) => "dist/" + el)
// }

export default [
  {
    input: "./dist/utils/index.js",
    output: {
      name: packageJson.name,
      file: "./build/utils/index.js",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [sourcemaps(), resolve(), babel({ babelHelpers: "bundled" })],
  },
  {
    input: "./dist/utils/keycode-equals.js",
    output: {
      name: packageJson.name,
      file: "./build/utils/keycode-equals.js",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [sourcemaps(), resolve(), babel({ babelHelpers: "bundled" })],
  },

  {
    input: "./dist/utils/no-null-object.js",
    output: {
      name: packageJson.name,
      file: "./build/utils/no-null-object.js",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [sourcemaps(), resolve(), babel({ babelHelpers: "bundled" })],
  },
  {
    input: "./dist/utils/random-id.js",
    output: {
      name: packageJson.name,
      file: "./build/utils/random-id.js",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [sourcemaps(), resolve(), babel({ babelHelpers: "bundled" })],
  },
  {
    input: "./dist/index.js",
    output: {
      name: packageJson.name,
      file: "./build/index.js",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [sourcemaps(), resolve(), babel({ babelHelpers: "bundled" })],
  },
  {
    input: "./dist/headless-ui.js",
    output: {
      name: packageJson.name,
      file: "./build/headless-ui.js",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [sourcemaps(), resolve(), babel({ babelHelpers: "bundled" })],
  },
  {
    input: "./dist/headless-popover.js",
    output: {
      name: packageJson.name,
      file: "./build/headless-popover.js",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [sourcemaps(), resolve(), babel({ babelHelpers: "bundled" })],
  },
  {
    input: "./dist/headless-navigation.js",
    output: {
      name: packageJson.name,
      file: "./build/headless-navigation.js",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [sourcemaps(), resolve(), babel({ babelHelpers: "bundled" })],
  },
  {
    input: "./dist/headless-dropdown.js",
    output: {
      name: packageJson.name,
      file: "./build/headless-dropdown.js",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [sourcemaps(), resolve(), babel({ babelHelpers: "bundled" })],
  },
  {
    input: "./dist/headless-disclosure.js",
    output: {
      name: packageJson.name,
      file: "./build/headless-disclosure.js",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [sourcemaps(), resolve(), babel({ babelHelpers: "bundled" })],
  },
]
