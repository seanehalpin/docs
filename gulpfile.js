var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cp = require('child_process');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var minifyCSS = require('gulp-cssnano');
var minifyHTML = require('gulp-htmlmin');
var size = require('gulp-size');
var sitemap = require('gulp-sitemap');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var del = require('del');
var harvester = require('seed-harvester');
var uglify = require('gulp-uglify-es').default;
var paths = harvester();


var env = process.env.JEKYLL_ENV || 'DEV';
env = env.toUpperCase();

var buildVars = {
  minify: false,
  sourceMaps: true,
  url: 'localhost:3000'
};

switch (env) {
  case 'PROD':
    buildVars.minify = true;
    buildVars.sourceMaps = false;
    buildVars.url = 'https://seanehalpin.github.io/docs/'; // Add your production url here
    break;
}

/**
 * Remove dist on a new build to start clean
 */
gulp.task('clean', function() {
  return del(['.jekyll-metadata', '_site']);
});

/**
* Build the Jekyll Site
*/
gulp.task('jekyll-build', function (done) {
  return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
  .on('close', done);
});

/**
* Rebuild Jekyll & do page reload
*/
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
  browserSync.reload();
});

/**
* Wait for jekyll-build, then launch the Server
*/
gulp.task('sync', function() {
  browserSync({
    server: {
      baseDir: '_site'
    }
  });
});

/**
 * Let's minify our HTML
 */
gulp.task('html', function() {
  return gulp.src('_site/**/*.html')
    .pipe(minifyHTML({collapseWhitespace: true, removeComments: true, minifyJS: true}))
    .pipe(size({title: 'HTML size:'}))
    .pipe(gulp.dest('_site'));
});

/**
* Compile files from js into both _site/js (for live injecting) and site (for future jekyll builds)
*/
gulp.task('js', function () {
  return gulp.src('_js/**/*.js')
    .pipe(gulp.dest('_site/js'))
    .pipe(browserSync.reload({stream: true}))
    .pipe(gulp.dest('js'));
});

gulp.task("uglify", function () {
    return gulp.src("_js/**/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("_site/js"));
});


/**
* Compile files from _sass into both _site/css (for live injecting) and site (for future jekyll builds)
*/
gulp.task('sass', function () {
  return gulp.src('_sass/**/*.scss')
    .pipe(gulpif(buildVars.sourceMaps, sourcemaps.init()))
    .pipe(sass({
      includePaths: ['scss'],
      includePaths: paths,
      onError: browserSync.notify
    }))
    .pipe(prefix({browsers: ['last 2 versions', 'Explorer >= 10', 'Android >= 4.1', 'Safari >= 7', 'iOS >= 7']}))
    .pipe(gulpif(buildVars.minify, minifyCSS()))
    .pipe(gulpif(buildVars.sourceMaps, sourcemaps.write()))
    .pipe(gulp.dest('_site/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('css'));
});

/**
 * Compress assets only on initial build
 */
gulp.task('assets', function () {
  return gulp.src('assets/**/*')
    imagemin.gifsicle({optimizationLevel: 3}),
    imagemin.optipng({optimizationLevel: 7}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
    .pipe(gulp.dest('assets'));
});

/**
 * Let's build a sitemap for SEO!
 */
gulp.task('sitemap', function() {
  return gulp.src('_site/**/*.html')
  .pipe(sitemap({
    siteUrl: buildVars.url
  }))
  .pipe(gulp.dest('_site'));
});

/**
* Default task, running just `gulp` will compile the sass,
* compile the jekyll site, launch BrowserSync & watch files.
*/
gulp.task('build', function() {
  runSequence('clean', 'jekyll-build', ['sass', 'uglify', 'assets', 'html'], 'sitemap');
});

gulp.task('run', function() {
  runSequence('clean', 'jekyll-build', ['sass', 'js', 'assets'], 'sitemap', 'sync');

  gulp.watch('_sass/**/*.scss', ['sass']);
  gulp.watch('_js/**/*.js', ['js']);
  gulp.watch(['*.html', '_includes/**/*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});
