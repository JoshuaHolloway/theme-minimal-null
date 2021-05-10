const gulp = require('gulp');
const themeKit = require('@shopify/themekit');
const sass = require('gulp-sass');
// const cleanCSS = require('gulp-clean-css');
const autoprefixer = require("gulp-autoprefixer");
const replace = require("gulp-replace");
const rename = require("gulp-rename");

// ==============================================

gulp.task('sass', function() {
  return gulp.src('./styles/custom-styles.scss')                         // -source
    // .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError)) 
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))  // -compile with sasss
    .pipe(autoprefixer())                                                // -add vendoer prefixes
    .pipe(replace('"{{', "{{"))                                          // -get rid of the double quotes inside the single quotes
    .pipe(replace('}}"', "}}"))
    // .pipe(cleanCSS({compatibility: 'ie11'}))                          // -minifiy
    .pipe(rename("custom-styles.scss.liquid"))                                   // -rename our output to a .liquid file
    .pipe(gulp.dest('./assets'));                                        // -destination
});

// ==============================================

gulp.task('watch', function() {

  gulp.watch('./styles/**/*.scss', gulp.series('sass'));
  
  // Upload all files to make sure synced (one way at least) with store
  themeKit.command('deploy', {
    allowLive: true,
    env: 'development' // env corresponds to environment from config.yml
  });

  themeKit.command('watch', {
    allowLive: true,
    env: 'development' // env corresponds to environment from config.yml
  });

});