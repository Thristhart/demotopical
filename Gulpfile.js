var gulp = require('gulp');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  index: "./index.js",
  html: "./index.html",
  deploy: "/srv/http/tom.shea.at/desktopical-demo/",
  windowsill_dev: "../windowsill/**/*",
  desktopical_dev: "../desktopical/**/*"
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
  gulp.watch([paths.index, paths.windowsill_dev, paths.desktopical_dev], ['deploy-js']);
  gulp.watch([paths.html], ['deploy-static']);
});

gulp.task('deploy-js', ['browserify'], function() {
  gulp.src('./build/*')
    .pipe(gulp.dest(paths.deploy));
});

gulp.task('deploy-static', function() {
  gulp.src(paths.html)
    .pipe(gulp.dest(paths.deploy));
});

gulp.task('deploy', ['deploy-js', 'deploy-static']);

gulp.task('default', ['browserify']);
