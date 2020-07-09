// Base :: BrowserSync :: Default
'use strict';

var gulp = require('gulp');
var bsWatch = require('./watch');

gulp.task('browsersync', function() {
  global.browserSync.init({
    notify: false,
    port: global.config.port,
    server: {
      baseDir: global.config.dest
    }
  });

  // Watch
  bsWatch();
});
