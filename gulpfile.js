var gulp = require('gulp');

var jshint = require('gulp-jshint');
var concat = require('gulp-concat');

gulp.task('lint', function() {
    return gulp.src('*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
    return gulp.src('*.js')
        .pipe(concat('newton.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('*.js', ['lint', 'scripts']);
    gulp.watch('*.css', ['copy']);
    gulp.watch('*.glsl', ['copy']);
});

gulp.task('copy', function () {
    gulp.src('newton.css')
        .pipe(gulp.dest('dist'));

    gulp.src('*.glsl')
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['lint', 'scripts', 'copy', 'watch']);

