
'use strict';

import gulp from 'gulp';
import os   from 'os';
import pkg  from './package.json';

import autoprefixer from 'gulp-autoprefixer';
import concat       from 'gulp-concat';
import exit         from 'gulp-exit';
import plumber      from 'gulp-plumber';
import sass         from 'gulp-sass';
import rename       from 'gulp-rename';
import sourcemaps   from 'gulp-sourcemaps';
import uglify       from 'gulp-uglify';

import babelify     from 'babelify';
import browserify   from 'browserify';
import browserSync  from 'browser-sync';
import buffer       from 'vinyl-buffer';
import source       from 'vinyl-source-stream';
import vueify       from 'vueify';
import watchify     from 'watchify';

var root = {
  app: 'app/',
  src: 'src/'
};
var app = {
  css: root.app + 'assets/css/',
  gsap: root.app + 'assets/gsap/',
  js: root.app + 'assets/js/',
  tmpl: root.app + 'templates/',
  vendor: root.app + 'assets/vendor/'
};
var src = {
  gsap: root.src + 'gsap/',
  js: root.src + 'js/',
  scss: root.src + 'scss/',
  vendor: root.src + 'vendor/'
};

var options = {
  browser: os.platform() === 'linux' ? 'google-chrome' : (
    os.platform() === 'darwin' ? 'google chrome' : (
      os.platform() === 'win32' ? 'chrome' : 'firefox')),
  browsers: [
    'last 4 version',
  ],
  browserSync: {
    files: [app + '**'],
    port: 1803,
    server: {
      baseDir: root.app
    }
  },
  connect: {
    root: root.app,
    port: 1803
  },
  header: [
    '/**',
    ' * <%= pkg.title %>',
    ' * @author <%= pkg.author.name %>',
    ' * @url <%= pkg.author.url %>',
    ' * @version v<%= pkg.version %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''
  ].join('\n')
};

////

gulp.task('compile', () => {
  return compile();
});
gulp.task('concat:gsap', () => {
  return concatGSAP();
});
gulp.task('connect', () => {
  return connect();
});
gulp.task('css', () => {
  return css();
});
gulp.task('watch', () => {
  return watch();
});

////

gulp.task('default', ['concat:gsap', 'css', 'connect', 'watch']);

////

function compile(watch) {
  var bundler = watchify(browserify(`${src.js}app.js`, {
    debug: true
  }).transform(vueify, {
  // }).transform(babelify, {
    // Use all of the ES2015 spec
    presets: [
      ["es2015", {
        "targets": {
          "browsers": ["last 2 versions", "ie 10"]
        }
      }]
    ],
    sourceMaps: true
  }).transform(babelify));

  if (!watch) {
    rebundle().pipe(exit());
    return;
  }

  bundler.on('update', function () {
    console.log('-> bundling...');
    rebundle();
  });

  rebundle();

  function rebundle() {
    return bundler.bundle()
      .on('error', function (err) {
        console.error(err);
        this.emit('end');
      })
      .pipe(source('build.js'))
      .pipe(buffer())
      .pipe(rename('vd6.min.js'))
      .pipe(sourcemaps.init({
        loadMaps: true
      }))
      .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(app.js));
  }
}

/**
 * Concatenate GSAP JavaScript files, imports all .js files
 * https://github.com/contra/gulp-concat
 */
function concatGSAP() {
  return gulp.src(src.gsap + '**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('gsap.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(app.gsap));
}

/**
 * Connect port, starts a local webserver
 * https://github.com/BrowserSync/browser-sync
 */
function connect() {
  browserSync.init(options.browserSync);
}

/**
 * * Compile Sass/SCSS files
 * https://github.com/dlmanning/gulp-sass
 * Adds vendor prefixes automatically
 * https://github.com/sindresorhus/gulp-autoprefixer
 * CSS minification
 * https://github.com/chilijung/gulp-cssmin
 */
function css() {
  return gulp.src([ `${src.scss}style.scss` ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'nested'
    }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({
      browsers: [ 'last 4 version' ]
    }))
    .pipe(rename('vd6.css'))
    .pipe(gulp.dest(app.css));
}

function watch() {
  gulp.watch(root.app + '*.html').on('change', browserSync.reload);
  gulp.watch(src.js + '**/*.html').on('change', browserSync.reload);
  gulp.watch(src.js + '**/*.js').on('change', browserSync.reload);
  gulp.watch(src.js + '**/*.vue').on('change', browserSync.reload);
  gulp.watch(src.scss + '**/*.scss').on('change', css, browserSync.reload);

  return compile(true);
}
