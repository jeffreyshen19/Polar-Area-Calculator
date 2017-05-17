var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify');
var pug = require('gulp-pug');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');

gulp.task('webserver', function() {
  gulp.src('.')
  .pipe(webserver({
    livereload: true,
    open: true
  }));
});

gulp.task('views', function buildHTML() {
  return gulp.src('./public/src/PUG/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('.'));
});

gulp.task('sass', function () {
  return gulp.src('./public/src/SCSS/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/dist/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./public/src/SCSS/*.scss', ['sass']);
});

gulp.task('compress', function() {
  gulp.src('./public/src/JS/*.js')
    .pipe(concat('index.js'))
    .pipe(minify({
        ext:{
            min:'.min.js'
        },
        noSource: true
    }))
    .pipe(gulp.dest('./public/dist/'));
});

gulp.task('js:watch', function () {
  gulp.watch('./public/src/JS/*.js', ['compress']);
});

gulp.task('pug:watch', function () {
  gulp.watch('./public/src/PUG/*.pug', ['views']);
});

gulp.task('default', ['sass', 'sass:watch', 'compress', 'js:watch', 'views', 'pug:watch', 'webserver']);
