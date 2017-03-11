/**
 * Dependencies
 */
var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var spacingClasses = require('spacing-classes');

var del = require('del');
var connect = require('connect');
var serveStatic = require('serve-static');

var http = require('http');
var path = require('path');

/**
 * Config
 */
var config = require('./gulpconfig');

Object.keys(config.paths).forEach(function (key) {
  if (['input', 'output'].indexOf(key) < 0) {
    config.paths[key] = {
      input: path.join(config.paths.input, config.paths[key].input),
      output: path.join(config.paths.output, config.paths[key].output)
    };
  }
});

/**
 * Clean
 */
gulp.task('clean:js', function () {
  return del.sync(config.paths.js.output);
});

gulp.task('clean:css', function () {
  return del.sync(config.paths.sass.output);
});

gulp.task('clean:html', function () {
  return del.sync(config.paths.html.output);
});

gulp.task('clean', ['clean:js', 'clean:css', 'clean:html'], function () {
  return del.sync(config.paths.output);
});

/**
 * Build
 */
gulp.task('build:js', function () {
  return gulp.src(config.paths.js.input)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.paths.js.output));
});

gulp.task('build:sass', function () {
  return gulp.src(config.paths.sass.input)
    .pipe(sourcemaps.init())
    .pipe(sass(config.sass).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.paths.sass.output));
});

gulp.task('build:html', function () {
  return gulp.src(config.paths.html.input)
    .pipe(htmlmin(config.htmlmin))
    .pipe(gulp.dest(config.paths.html.output));
});

gulp.task('build', ['build:js', 'build:sass', 'build:html']);

/**
 * Watch
 */
gulp.task('watch:js', function () {
  gulp.watch(config.paths.js.input, ['build:js']);
});

gulp.task('watch:sass', function () {
  gulp.watch(config.paths.sass.input, ['build:sass']);
});

gulp.task('watch:html', function () {
  gulp.watch(config.paths.html.input, ['build:html']);
});

gulp.task('watch', ['watch:js', 'watch:sass', 'watch:html']);

/**
 * Default Task
 */
gulp.task('default', ['clean', 'build', 'watch'], function () {
  spacingClasses.compile(config.spacingClasses);
});

/**
 * Server
 */
gulp.task('serve', ['default'], function () {
  var app = connect();
  // var port = process.env.PORT || config.server.port;
  app.use(serveStatic(config.server.root));
  http.createServer(app).listen(config.server.port, function () {
    console.log(`Server listening on port ${config.server.port}.`);
  });
});
