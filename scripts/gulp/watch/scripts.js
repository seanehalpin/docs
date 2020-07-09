// Watch :: Scripts
'use strict';

var gulp = require('gulp');

var options = {
  interval: 500, // default 100
  debounceDelay: 1000, // default 500
  mode: 'poll'
};

gulp.task('watch-scripts', function (callback) {
  gulp.watch([
    global.config.src + '/js/**/*.js'
  ], options, ['scripts-base']);
});
