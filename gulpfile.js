const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const del = require('del');
const pump = require('pump');

const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('css', function(cb) {
  pump([
    gulp.src('style.css'),
    rename('style.min.css'),
    autoprefixer({browsers: AUTOPREFIXER_BROWSERS}),
    csso(),
    gulp.dest('./')
  ], cb);
});

gulp.task('js', function(cb) {
  pump([
    gulp.src('index.js'),
    rename('index.min.js'),
    uglify(),
    gulp.dest('./')
  ], cb);
});

gulp.task('html', function(cb) {
  pump([
    gulp.src('index.html'),
    rename('index.min.html'),
    htmlmin({ collapseWhitespace: true, removeComments: true }),
    gulp.dest('./')
  ], cb);
});

gulp.task('clean', function(cb) {
  del(['*.min.*']);
  cb();
});

gulp.task('default', gulp.series(['clean'], gulp.parallel(['css', 'js', 'html'])));