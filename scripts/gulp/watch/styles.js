// Watch :: Styles
'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var path = require('path');

var options = {
  interval: 500, // default 100
  debounceDelay: 1000, // default 500
  mode: 'poll'
};

gulp.task('watch-styles', function (callback) {
  gulp.watch([
    global.config.src + '/scss/**/*.scss'
  ], options, ['styles-base'])
  .on('change', function(event) {
    var file = event.path;
    gutil.log(path.basename(file) + ' was', gutil.colors.green('updated'));
  });
});
