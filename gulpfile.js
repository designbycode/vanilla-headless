const { series, src, dest } = require("gulp")
const sourcemaps = require("gulp-sourcemaps")
const babel = require("gulp-babel")
const concat = require("gulp-concat")
const uglify = require("gulp-uglify")
const shredder = require("gulp-clean")
const fs = require("fs")

function clean(cb) {
  if (fs.existsSync("build")) {
    src("build").pipe(shredder({ force: true }))
  }
  cb()
}
function javascript(cb) {
  src("dist/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("index.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(dest("build"))
  cb()
}

exports.default = series(clean, javascript)
