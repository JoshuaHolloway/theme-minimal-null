const gulp = require('gulp');
const themeKit = require('@shopify/themekit');
const sass = require('gulp-sass');
// const cleanCSS = require('gulp-clean-css');
const autoprefixer = require("gulp-autoprefixer");
const replace = require("gulp-replace");
const rename = require("gulp-rename");
// const run = require('gulp-run-command').default;
// import run from 'gulp-run-command';

// ==============================================

gulp.task('sass', function() {
  return gulp.src('./src/scss/main.scss')                         // -source
    // .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError)) 
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))  // -compile with sasss
    .pipe(autoprefixer())                                                // -add vendoer prefixes
    .pipe(replace('"{{', "{{"))                                          // -get rid of the double quotes inside the single quotes
    .pipe(replace('}}"', "}}"))
    .pipe(replace('/*', ""))
    .pipe(replace('*/', ""))
    // .pipe(cleanCSS({compatibility: 'ie11'}))                          // -minifiy
    .pipe(rename("main.css.liquid"))                                   // -rename our output to a .liquid file
    .pipe(gulp.dest('./assets'));                                        // -destination
});

// ==============================================

gulp.task('watch', function() {
  // Upload all files to make sure synced (one way at least) with store
  themeKit.command('deploy', {
    allowLive: true,
    env: 'development' // env corresponds to environment from config.yml
  });
  
  // compile js modules
  // gulp.series(run('webpack --watch'));

  // compile scss ( -> css.liquid )
  gulp.watch('./src/scss/**/*.scss', gulp.series('sass'));
  
  // Watch for file changes to upload to store
  themeKit.command('watch', {
    allowLive: true,
    env: 'development' // env corresponds to environment from config.yml
  });

});

// Adapted from: https://adambohannon.me/shopify-development-using-liquid-syntax-in-sass-and-compiling-with-gulp