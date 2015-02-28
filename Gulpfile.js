var gulp = require('gulp');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  index: "./demo.js",
  html: "./index.html",
  images: "./*.png",
  apps: "./apps/*.js",

  windowsill_dev_js: "../windowsill/**/*.js",
  windowsill_dev_static: "../windowsill/**/*.css",
  desktopical_dev_js: "../desktopical/**/*.js",
  desktopical_dev_static: "../desktopical/**/*.css",

  deploy: "/srv/http/tom.shea.at/desktopical-demo/"
};

function onError(err) {
  console.error(err.toString());
  this.emit('end');
}

gulp.task('browserify', function() {
  var browserifyTransform = transform(function(filename) {
    var b = browserify({entries: filename, debug:true});
    return b.bundle();
  });

  return gulp.src(paths.index)
    .pipe(browserifyTransform)
    .on('error', onError)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', function() {
  gulp.watch([paths.index, paths.apps, paths.windowsill_dev_js, paths.desktopical_dev_js], ['deploy-js']);
  gulp.watch([paths.html, paths.windowsill_dev_static, paths.desktopical_dev_static], ['deploy-static']);
});

gulp.task('deploy-js', ['browserify'], function() {
  gulp.src('./build/*')
    .pipe(gulp.dest(paths.deploy));
});

gulp.task('deploy-static', function() {
  gulp.src([paths.html, paths.images, paths.desktopical_dev_static, paths.windowsill_dev_static])
    .pipe(gulp.dest(paths.deploy));
});

gulp.task('deploy', ['deploy-js', 'deploy-static']);

gulp.task('default', ['browserify']);
