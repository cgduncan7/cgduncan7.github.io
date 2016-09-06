// dependencies
var gulp = require('gulp');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var prefix = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var jshint = require('gulp-jshint');
var mochaPhantomjs = require('gulp-mocha-phantomjs');

gulp.task('lint-source', function() {
  return gulp.src('./source/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('lint-test', function() {
  return gulp.src('./test/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('browserify-client', ['lint-client'], function() {
  return gulp.src('source/main.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(rename('main.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('browserify-test', ['lint-test'], function() {
  return gulp.src('test/main.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(rename('test.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('styles', function() {
  return gulp.src('source/main.less')
    .pipe(less())
    .pipe(prefix({ cascade: true }))
    .pipe(rename('main.css'))
    .pipe(gulp.dest('build'));
});

gulp.task('minify', ['styles'], function() {
  return gulp.src('build/main.css')
    .pipe(cleanCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('build'));
});

gulp.task('uglify', ['browserify-client'], function() {
  return gulp.src('build/main.js')
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('build', ['uglify', 'minify']);

gulp.task('test', ['lint-test', 'browserify-test'], function() {
  return gulp.src('test/index.html')
    .pipe(mochaPhantomjs());
});

gulp.task('watch', function() {
  gulp.watch('source/*.js', ['browserify-client', 'test']);
  gulp.watch('test/*.js', ['test']);
});
