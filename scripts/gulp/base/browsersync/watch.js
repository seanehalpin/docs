// Base :: BrowserSync :: Watcj
'use strict';

module.exports = function() {
  // Watch
  var bs = global.browserSync;
  bs.watch(global.config.dest + '/css/**/*.css').on('change', bs.reload);
};
