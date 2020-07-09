// Copy :: Fonts
'use strict';

var gulp = require('gulp');

gulp.task('copy-fonts', function() {
  return gulp.src([
      global.config.src + '/_assets/vendors/hs-icons/dist/app/fonts/*',
      global.config.src + '/_assets/vendors/hs-icons/dist/custom-app/fonts/*',
      global.config.src + '/fonts/fonts/**/*'
    ])
    .pipe(gulp.dest(global.config.dest + '/fonts/'));
});
