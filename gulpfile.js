const { src, dest } = require("gulp")
const sourcemaps = require("gulp-sourcemaps")
const uglify = require("gulp-uglify")

function javascript(callback) {
  src("./build/index.js").pipe(uglify()).pipe(dest("./build"))
  callback()
}

exports.default = javascript
