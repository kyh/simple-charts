'use strict';

var gulp = require('gulp');
var rev = require('gulp-rev');

// Build
gulp.task('build', ['html', 'styles', 'vendor', 'browserify', 'images'], function() {
  return gulp.src(['.tmp/*.html', '.tmp/styles/*.css', '.tmp/scripts/*.js'], {base: '.tmp'})
    .pipe(gulp.dest('dist'));
});
