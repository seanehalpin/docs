// Base :: Styles :: Base
'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var harvester = require('seed-harvester');
var packer = require('seed-packer');

// Initialize packer
packer(global.config.src + '/scss/plugins/_seed-packs.scss');

// Setup harvester
var includePaths = harvester(
  global.config.src + '/scss'
);

gulp.task('styles-base', function(callback) {
  return gulp.src(global.config.src + '/scss/*.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(
    sass({
      // Include harvester in node-sass's includePaths
      includePaths: includePaths
    })
    .on('error', sass.logError)
  )
  .pipe(sourcemaps.write('maps'))
  .pipe(gulp.dest(global.config.dest + '/css'))
  // .pipe(global.browserSyncReload({ stream: true }))
  .on('close', callback);
});
