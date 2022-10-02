const sourcemaps = require("rollup-plugin-sourcemaps")
const packageJson = require("./package.json")

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
      format: "es",
      sourcemap: true,
    },
    plugins: [sourcemaps()],
  },
  {
    input: "./dist/utils/keycode-equals.js",
    output: {
      name: packageJson.name,
      file: "./build/utils/keycode-equals.js",
      format: "es",
      sourcemap: true,
    },
    plugins: [sourcemaps()],
  },

  {
    input: "./dist/utils/no-null-object.js",
    output: {
      name: packageJson.name,
      file: "./build/utils/no-null-object.js",
      format: "es",
      sourcemap: true,
    },
    plugins: [sourcemaps()],
  },
  {
    input: "./dist/utils/random-id.js",
    output: {
      name: packageJson.name,
      file: "./build/utils/random-id.js",
      format: "es",
      sourcemap: true,
    },
    plugins: [sourcemaps()],
  },
  {
    input: "./dist/index.js",
    output: {
      name: packageJson.name,
      file: "./build/index.js",
      format: "es",
      sourcemap: true,
    },
    plugins: [sourcemaps()],
  },
  {
    input: "./dist/headless-ui.js",
    output: {
      name: packageJson.name,
      file: "./build/headless-ui.js",
      format: "es",
      sourcemap: true,
    },
    plugins: [sourcemaps()],
  },
  {
    input: "./dist/headless-popover.js",
    output: {
      name: packageJson.name,
      file: "./build/headless-popover.js",
      format: "es",
      sourcemap: true,
    },
    plugins: [sourcemaps()],
  },
  {
    input: "./dist/headless-navigation.js",
    output: {
      name: packageJson.name,
      file: "./build/headless-navigation.js",
      format: "es",
      sourcemap: true,
    },
    plugins: [sourcemaps()],
  },
  {
    input: "./dist/headless-dropdown.js",
    output: {
      name: packageJson.name,
      file: "./build/headless-dropdown.js",
      format: "es",
      sourcemap: true,
    },
    plugins: [sourcemaps()],
  },
  {
    input: "./dist/headless-disclosure.js",
    output: {
      name: packageJson.name,
      file: "./build/headless-disclosure.js",
      format: "es",
      sourcemap: true,
    },
    plugins: [sourcemaps()],
  },
]
