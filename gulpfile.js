var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify');

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
    .pipe(minify({
        ext:{
            src:'-debug.js',
            min:'.js'
        },
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('./public/dist'))
});

gulp.task('js:watch', function () {
  gulp.watch('./public/src/JS/*.js', ['compress']);
});

gulp.task('default', ['sass', 'sass:watch', 'compress', 'js:watch']);
