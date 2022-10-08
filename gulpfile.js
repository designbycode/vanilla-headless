const { series, src, dest } = require("gulp")
const uglify = require("gulp-uglify")

function javascript(callback) {
  src("./build/index.js").pipe(uglify()).pipe(dest("./build"))
  callback()
}

exports.default = javascript