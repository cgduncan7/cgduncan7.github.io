const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const uglifyES = require("uglify-es");
const composer = require("gulp-uglify/composer");
const htmlmin = require("gulp-htmlmin");
const rename = require("gulp-rename");
const size = require("gulp-size");
const del = require("del");
const pump = require("pump");
const uglify = composer(uglifyES, console);

const AUTOPREFIXER_BROWSERS = [
  "ie >= 10",
  "ie_mob >= 10",
  "ff >= 30",
  "chrome >= 34",
  "safari >= 7",
  "opera >= 23",
  "ios >= 7",
  "android >= 4.4",
  "bb >= 10"
];

gulp.task("css", function(cb) {
  pump([
    gulp.src("src/style.css"),
    rename("style.css"),
    autoprefixer({browsers: AUTOPREFIXER_BROWSERS}),
    csso(),
    gulp.dest("./")
  ], cb);
});

gulp.task("js", function(cb) {
  pump([
    gulp.src("src/index.js"),
    rename("index.js"),
    uglify(),
    gulp.dest("./")
  ], cb);
});

gulp.task("html", function(cb) {
  pump([
    gulp.src("src/index.html"),
    rename("index.html"),
    htmlmin({ collapseWhitespace: true, removeComments: true }),
    gulp.dest("./")
  ], cb);
});

gulp.task("size-assets", function(cb) {
  const s = size({ title: "assets" });
  pump([
    gulp.src("assets/*"),
    s,
  ], cb);
});

gulp.task("size-html", function(cb) {
  const s = size({ title: "html" });
  pump([
    gulp.src("index.html"),
    s,
  ], cb);
});

gulp.task("size-js", function(cb) {
  const s = size({ title: "js" });
  pump([
    gulp.src("index.js"),
    s
  ], cb);
});

gulp.task("size-css", function(cb) {
  const s = size({ title: "css" });
  pump([
    gulp.src("style.css"),
    s,
  ], cb);
});

gulp.task("size", gulp.parallel(["size-assets", "size-html", "size-js", "size-css"]));

gulp.task("clean", function(cb) {
  del(["style.css", "index.js", "index.html"]);
  cb();
});

gulp.task("default",
  gulp.series(
    ["clean"],
    gulp.parallel(["css", "js", "html"])
  )
);