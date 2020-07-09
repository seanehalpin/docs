// Copy :: Scripts
'use strict';

var gulp = require('gulp');

gulp.task('copy-scripts', function(callback) {
  return gulp.src([
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      global.config.src + '/js/**/*.js'
    ])
    .pipe(gulp.dest(global.config.dest + '/js'))
    .pipe(global.browserSyncReload({ stream: true }))
    .on('close', callback);
});
