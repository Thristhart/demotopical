var gulp = require('gulp');
var browserify = require('browserify');
var vss = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var paths = {
  index: "./demo.js",
  html: "./index.html",
  stylesheet: "./demo.css",
  images: "./*.+(png|svg)",
  apps: "./apps/*.js",

  windowsill_dev_js: "../windowsill/**/*.js",
  windowsill_dev_static: "../windowsill/**/*.css",
  desktopical_dev_js: "../desktopical/**/*.js",
  desktopical_dev_static: "../desktopical/**/*.css",
  menuine_dev_js: "../menuine/**/*.js",

  deploy: "/srv/http/tom.shea.at/desktopical-demo/"
};

function onError(err) {
  console.error(err.toString());
  this.emit('end');
}

gulp.task('browserify', function() {
  return browserify({
      entries: paths.index,
      debug: true
    }).bundle()
    .on('error', onError)
    .pipe(vss(paths.index))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
  gulp.watch([paths.index, paths.apps,
              paths.windowsill_dev_js, paths.desktopical_dev_js, paths.menuine_dev_js],
             ['deploy-js']);
  gulp.watch([paths.html, paths.stylesheet,
              paths.windowsill_dev_static, paths.desktopical_dev_static],
             ['deploy-static']);
});

gulp.task('deploy-js', ['browserify'], function() {
  gulp.src(['./build/*'])
    .pipe(gulp.dest(paths.deploy));
});

gulp.task('deploy-static', function() {
  gulp.src([paths.html, paths.images])
    .pipe(gulp.dest(paths.deploy));
  gulp.src([paths.stylesheet, paths.desktopical_dev_static, paths.windowsill_dev_static])
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.deploy));
});

gulp.task('clean', function(callback) {
  del(['./build'], callback);
});

gulp.task('deploy', ['deploy-js', 'deploy-static']);

gulp.task('default', ['browserify']);
