const sourcemaps = require("rollup-plugin-sourcemaps")
const packageJson = require("./package.json")

export default {
  input: "./dist/**/*.js",
  output: {
    file: "build/**/*.js",
    name: packageJson.name,
    format: "cjs",
    sourcemap: true,
  },
  plugins: [sourcemaps()],
}
