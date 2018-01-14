const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const sourceMaps = require('gulp-sourcemaps');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const argv = require('yargs').argv;
const util = require('gulp-util');

let watch_argv = !!argv.watch;

gulp.task('less', () => {
  gulp.src(['static/less/**/*.less'])
    .pipe(plumber())
    .pipe(sourceMaps.init())
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(sourceMaps.write('.', {
      'includeContent': true,
      'sourceRoot': '.'
    }))
    .pipe(plumber.stop())
    .pipe(gulp.dest('www/assets/css'));
});

gulp.task('default', () => {
  gulp.start(['less']);

  if (watch_argv) {
    gulp.watch('static/less/**/*.less', ['less']);
    util.log(util.colors.bgGreen('Watching for changes...'));
  }
});
